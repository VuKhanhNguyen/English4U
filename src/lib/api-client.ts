const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  _isRetry?: boolean;
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

async function customFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    ...options,
    credentials: "include", // Ensure HTTP-Only cookies are sent
    headers: isFormData
      ? { ...options.headers }
      : {
          "Content-Type": "application/json",
          ...options.headers,
        },
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401 && !options._isRetry) {
      const isAuthEndpoint =
        endpoint.includes("/auth/login") ||
        endpoint.includes("/auth/register") ||
        endpoint.includes("/auth/refresh") ||
        endpoint.includes("/auth/forgot-password") ||
        endpoint.includes("/auth/verify-otp") ||
        endpoint.includes("/auth/reset-password");

      if (isAuthEndpoint) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.message || "Authentication failed",
          errorData
        );
      }

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve: () => resolve(), reject });
        }).then(() => {
          return customFetch<T>(endpoint, { ...options, _isRetry: true });
        });
      }

      options._isRetry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!refreshResponse.ok) {
          throw new Error("Token refresh failed");
        }

        processQueue(null);
        isRefreshing = false;

        // Retry original request
        return await customFetch<T>(endpoint, options);
      } catch (refreshError) {
        processQueue(refreshError instanceof Error ? refreshError : new Error(String(refreshError)));
        isRefreshing = false;

        // Broadcast logout event so AuthContext can clean up user state
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:unauthorized"));
        }

        throw new ApiError(401, "Session expired. Please log in again.");
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `Request failed with status ${response.status}`,
        errorData
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error instanceof Error ? error.message : "Network error");
  }
}

const formatRequestBody = (body?: unknown) => {
  if (!body) return undefined;
  if (body instanceof FormData) return body;
  return JSON.stringify(body);
};

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    customFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    customFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: formatRequestBody(body),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    customFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: formatRequestBody(body),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    customFetch<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    customFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: formatRequestBody(body),
    }),
};

export { ApiError };

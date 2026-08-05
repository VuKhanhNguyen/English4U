export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  avatarUrl?: string;
  coverUrl?: string;
  enabled: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export type User = UserResponse;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  message: string;
  user: UserResponse;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface AuthContextType {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (data: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  confirmLogout: () => void;
  triggerSessionExpired: () => void;
  refreshProfile: () => Promise<void>;
}

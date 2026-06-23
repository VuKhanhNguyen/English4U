"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function LoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isLoading) {
      setIsImageLoaded(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading && imgRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, [isLoading]);

  useEffect(() => {
    // Hide loader when route changes
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      // Auto-hide loader after 8 seconds as a safety fallback to prevent getting stuck
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 8000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        const targetAttr = anchor.getAttribute("target");

        if (!href) return;

        // Extract the clean target pathname by stripping hash fragments and query strings
        // e.g., "/#about" -> "/"
        // e.g., "/destination/b1?q=1#top" -> "/destination/b1"
        const targetPathname = href.split("?")[0].split("#")[0];

        // Check if it's an internal route navigation
        const isInternal =
          href.startsWith("/") &&
          targetAttr !== "_blank";

        // Show loading only when the destination page is different from the current page
        const isDifferentRoute = targetPathname !== pathname;

        if (isInternal && isDifferentRoute) {
          // Defer mounting the loader to the next event tick. This allows Next.js's Link handler
          // to fully intercept the click, call preventDefault(), and handle the routing cleanly,
          // avoiding double-navigation conflicts that cause duplicate hashes (e.g., #about#about).
          setTimeout(() => {
            setIsLoading(true);
          }, 0);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Fixed aspect ratio wrapper to prevent visual shifting */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          <img
            ref={imgRef}
            src="/imgs/dogStudy.gif"
            alt="Loading..."
            className={`w-[120px] h-auto object-contain transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0 absolute"}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-pale-stone dark:text-zinc-400 font-mono text-xs animate-pulse">
              Loading GIF...
            </div>
          )}
        </div>
        <div className="loader" />
      </div>
    </div>
  );
}

export default function PageTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}

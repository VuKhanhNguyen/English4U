"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "@/components/ui/toast";

interface AnimationContextType {
  animationEnabled: boolean;
  setAnimationEnabled: (enabled: boolean) => void;
  toggleAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationEnabled, setAnimationEnabledState] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("english4u-animation-enabled");
    if (saved !== null) {
      setAnimationEnabledState(saved === "true");
    } else {
      setAnimationEnabledState(false);
    }
  }, []);

  const setAnimationEnabled = (enabled: boolean) => {
    setAnimationEnabledState(enabled);
    localStorage.setItem("english4u-animation-enabled", String(enabled));

    showToast({
      title: "Animation Settings",
      message: enabled ? "Animations enabled." : "Animations disabled to save resources.",
      variant: "success",
      position: "top-right",
    });
  };

  const toggleAnimation = () => {
    setAnimationEnabled(!animationEnabled);
  };

  return (
    <AnimationContext.Provider
      value={{
        animationEnabled: isMounted ? animationEnabled : false,
        setAnimationEnabled,
        toggleAnimation,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}

"use client";

import * as React from "react";
import "./GlitchText.css";

export interface GlitchTextProps {
  children: React.ReactNode;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function extractText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (typeof node === "object" && node !== null && "props" in node) {
    const props = (node as { props?: { children?: React.ReactNode } }).props;
    if (props && props.children) {
      return extractText(props.children);
    }
  }
  return "";
}

export default function GlitchText({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = "",
  style = {},
}: GlitchTextProps) {
  const textContent = extractText(children);

  const inlineStyles: React.CSSProperties = {
    ...style,
    ["--after-duration" as string]: `${speed * 3}s`,
    ["--before-duration" as string]: `${speed * 2}s`,
    ["--after-shadow" as string]: enableShadows ? "-3px 0 rgba(239, 68, 68, 0.8)" : "none",
    ["--before-shadow" as string]: enableShadows ? "3px 0 rgba(14, 165, 233, 0.8)" : "none",
  } as React.CSSProperties;

  const hoverClass = enableOnHover ? "enable-on-hover" : "";

  return (
    <span
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles}
      data-text={textContent}
    >
      {children}
    </span>
  );
}

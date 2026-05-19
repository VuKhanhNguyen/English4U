import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import TargetCursor from "@/components/ui/target-cursor";
import GradualBlur from "@/components/ui/gradual-blur";
import SplashCursor from "@/components/ui/splash-cursor";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// We use Inter as a temporary fallback if Satoshi is not available.
// In globals.css, Satoshi is prioritized in the font stack.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "English4U - Master English Grammar & Vocabulary",
  description: "Learn Destination B1, B2, C1 & C2 with structured grammar tables, vocabulary systems, word formation, collocations, and phrasal verbs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} antialiased min-h-screen bg-canvas-white text-midnight-ink flex flex-col`}>
        <SplashCursor />
        <TargetCursor />
        <GradualBlur preset="page-header" zIndex={40} />
        {children}
      </body>
    </html>
  );
}

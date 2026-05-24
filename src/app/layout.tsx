import type { Metadata } from "next";
import { IBM_Plex_Mono, Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import TargetCursor from "@/components/ui/target-cursor";
import GradualBlur from "@/components/ui/gradual-blur";
import SplashCursor from "@/components/ui/splash-cursor";
import DotField from "@/components/DotField";
import PageTransitionLoader from "@/components/ui/page-transition-loader";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import { cn } from "@/lib/utils";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-abc-diatype-mono",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-untitled-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-untitled-sans",
});

export const metadata: Metadata = {
  title: "English4U - Master English Grammar & Vocabulary",
  description: "Learn Destination B1, B2, C1 & C2 with structured grammar tables, vocabulary systems, word formation, collocations, and phrasal verbs.",
  icons: {
    icon: "/imgs/logo2.ico",
    apple: "/imgs/logo2.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(ibmPlexMono.variable, notoSerif.variable, inter.variable)}>
      <body className="antialiased min-h-screen bg-paper-canvas text-ink flex flex-col font-abc-diatype-mono">
        <SmoothScrollProvider>
          <PageTransitionLoader />
          <SplashCursor />
          {/* <TargetCursor /> */}
          <GradualBlur preset="page-header" zIndex={40} />
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <DotField />
          </div>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

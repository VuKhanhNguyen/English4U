import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { BookSelectionSection } from "@/components/sections/book-selection"
import { InteractivePlaypen } from "@/components/sections/interactive-playpen"
import { BentoFeatures } from "@/components/sections/bento-features"
import { VisualHierarchy } from "@/components/sections/visual-hierarchy"
import { AudienceShowcase } from "@/components/sections/audience-showcase"
import LiquidShaderBackground from "@/components/ui/LiquidShaderBackground"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-paper-canvas dark:bg-black relative overflow-hidden">
        <LiquidShaderBackground src="/imgs/backgroundLiquid.png" className="opacity-50 dark:opacity-30 pointer-events-none z-0" />
        <HeroSection />
        <BookSelectionSection />
        <InteractivePlaypen />
        <BentoFeatures />
        <VisualHierarchy />
        <AudienceShowcase />
      </main>
      <Footer />
    </>
  )
}

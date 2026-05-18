import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { BookSelectionSection } from "@/components/sections/book-selection"
import { InteractivePlaypen } from "@/components/sections/interactive-playpen"
import { BentoFeatures } from "@/components/sections/bento-features"
import { VisualHierarchy } from "@/components/sections/visual-hierarchy"
import { AudienceShowcase } from "@/components/sections/audience-showcase"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
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

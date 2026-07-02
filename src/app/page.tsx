import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { BookSelectionSection } from "@/components/sections/book-selection"
import { InteractivePlaypen } from "@/components/sections/interactive-playpen"
import { ThreeDWorkspace } from "@/components/sections/ThreeDWorkspace"
import { BentoFeatures } from "@/components/sections/bento-features"
import { VisualHierarchy } from "@/components/sections/visual-hierarchy"
import { AudienceShowcase } from "@/components/sections/audience-showcase"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        {/* <div className="relative z-0 w-full overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 dark:opacity-20 dark:brightness-[0.35] pointer-events-none -z-10"
            style={{ backgroundImage: "url('/imgs/bg12.png')" }}
          /> */}
        <BookSelectionSection />
        {/* </div> */}
        {/* Above Slider: Shared Background Image bg6.png */}
        <div className="relative z-0 w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 dark:opacity-20 dark:brightness-[0.35] pointer-events-none -z-10"
            style={{ backgroundImage: "url('/imgs/bg16.png')" }}
          />
 
          <InteractivePlaypen />
          {/* <ThreeDWorkspace /> */}
          <BentoFeatures />
        </div>

        {/* Below Slider: Shared Background Image bg7.png */}
        <div className="relative z-0 w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 dark:opacity-25 dark:brightness-[0.35] pointer-events-none -z-10"
            style={{ backgroundImage: "url('/imgs/bg17.png')" }}
          />
          <VisualHierarchy />
          <AudienceShowcase />
        </div>
      </main>
      <Footer />
    </>
  )
}

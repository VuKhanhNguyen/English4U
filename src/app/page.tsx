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
        {/* Shared background video for Hero and Book Selection */}
        <div className="relative z-0 w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-20 dark:brightness-[0.35] pointer-events-none -z-10"
          >
            <source
              src="/video.mp4"
              type="video/mp4"
            />
          </video>
          <HeroSection />
          <BookSelectionSection />
        </div>
        {/* Above Slider: Shared Background Image bg6.png */}
        <div className="relative z-0 w-full overflow-hidden">
         <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-20 dark:brightness-[0.35] pointer-events-none -z-10"
  >
    <source
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_101827_abebfeec-f243-466b-b494-7f6814c0fbbf.mp4"
      type="video/mp4"
    />
  </video>
 
          <InteractivePlaypen />
          {/* <ThreeDWorkspace /> */}
          <BentoFeatures />
        </div>

        {/* Below Slider: Shared Background Image bg7.png */}
        <div className="relative z-0 w-full overflow-hidden">
          <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-20 dark:brightness-[0.35] pointer-events-none -z-10"
  >
    <source
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_191657_800d4e1f-7ab3-41af-90b6-9bd3039eb294.mp4"
      type="video/mp4"
    />
  </video>
          <VisualHierarchy />
          <AudienceShowcase />
        </div>
      </main>
      <Footer />
    </>
  )
}

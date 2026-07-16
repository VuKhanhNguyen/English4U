import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { LearningExplorerSection } from "@/components/sections/learning-explorer";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { notFound } from "next/navigation";

interface DestinationPageProps {
  params: Promise<{
    level: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { level: "b1" },
    { level: "b2" },
    { level: "c1-c2" },
  ];
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const resolvedParams = await params;
  const levelParam = resolvedParams?.level || "";
  const level = decodeURIComponent(levelParam).toLowerCase();

  // Validate path parameter
  if (level !== "b1" && level !== "b2" && level !== "c1-c2") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-paper-canvas dark:bg-black relative overflow-x-clip">
        <InteractiveBackground />
        <HeroSection
          hideButtons={true}
          title1="Learning Explorer"
          title2=""
          subtitle="Dive deep into the structured content. Expand a unit, select a category, use the search to quickly find specific rules or vocabulary."
        />
        <LearningExplorerSection
          bookLevel={level as "b1" | "b2" | "c1-c2"}
          hideHeader={true}
          className="bg-transparent"
        />
      </main>
      <Footer />
    </>
  );
}


import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { LearningExplorerSection } from "@/components/sections/learning-explorer";
import FloatingLines from "@/components/FloatingLines";
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
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Base background color */}
      <div className="fixed inset-0 bg-pale-ash -z-20" />
      {/* FloatingLines animation layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <FloatingLines />
      </div>
      <Navbar />
      <main className="flex-grow relative z-10">
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
    </div>
  );
}

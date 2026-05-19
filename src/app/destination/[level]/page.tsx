import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { LearningExplorerSection } from "@/components/sections/learning-explorer";
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
    <div className="flex flex-col min-h-screen bg-pale-ash">
      <Navbar />
      <main className="flex-grow">
        <HeroSection
          hideButtons={true}
          title1="Learning Explorer"
          title2=""
          subtitle="Dive deep into the structured content. Expand a unit, select a category, and use the search to quickly find specific rules or vocabulary."
        />
        <LearningExplorerSection
          bookLevel={level as "b1" | "b2" | "c1-c2"}
          hideHeader={true}
        />
      </main>
      <Footer />
    </div>
  );
}

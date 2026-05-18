import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LearningExplorerSection } from "@/components/sections/learning-explorer";
import { notFound } from "next/navigation";

interface DestinationPageProps {
  params: Promise<{
    level: string;
  }>;
}

export function generateStaticParams() {
  return [
    { level: "b1" },
    { level: "b2" },
    { level: "c1-c2" },
  ];
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const resolvedParams = await params;
  const { level } = resolvedParams;

  // Validate path parameter
  if (level !== "b1" && level !== "b2" && level !== "c1-c2") {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-pale-ash">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <LearningExplorerSection bookLevel={level as "b1" | "b2" | "c1-c2"} />
      </main>
      <Footer />
    </div>
  );
}

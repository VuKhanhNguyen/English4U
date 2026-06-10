"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Layers, Bookmark, ArrowRight, Zap, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Link } from "lucide-react";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import FloatingLines from "@/components/FloatingLines";
import { useLanguage } from "@/components/providers/language-provider";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/data-table";

// Import all B1 units
import unit1 from "@/data/b1/unit1.json";
import unit2 from "@/data/b1/unit2.json";
import unit3 from "@/data/b1/unit3.json";
import unit4 from "@/data/b1/unit4.json";
import unit5 from "@/data/b1/unit5.json";
import unit6 from "@/data/b1/unit6.json";
import unit7 from "@/data/b1/unit7.json";
import unit8 from "@/data/b1/unit8.json";
import unit9 from "@/data/b1/unit9.json";
import unit10_11 from "@/data/b1/unit10_11.json";
import unit12 from "@/data/b1/unit12.json";
import unit13 from "@/data/b1/unit13.json";
import unit14 from "@/data/b1/unit14.json";
import unit15 from "@/data/b1/unit15.json";
import unit16 from "@/data/b1/unit16.json";
import unit17 from "@/data/b1/unit17.json";
import unit18 from "@/data/b1/unit18.json";
import unit19 from "@/data/b1/unit19.json";
import unit20 from "@/data/b1/unit20.json";
import unit21 from "@/data/b1/unit21.json";
import unit22 from "@/data/b1/unit22.json";
import unit23 from "@/data/b1/unit23.json";
import unit24 from "@/data/b1/unit24.json";
import unit25 from "@/data/b1/unit25.json";
import unit26 from "@/data/b1/unit26.json";
import unit27 from "@/data/b1/unit27.json";
import unit28_29 from "@/data/b1/unit28_29.json";
import unit30 from "@/data/b1/unit30.json";
import unit31 from "@/data/b1/unit31.json";
import unit32 from "@/data/b1/unit32.json";
import unit33 from "@/data/b1/unit33.json";
import unit34 from "@/data/b1/unit34.json";
import unit35 from "@/data/b1/unit35.json";
import unit36 from "@/data/b1/unit36.json";
import unit37 from "@/data/b1/unit37.json";
import unit38 from "@/data/b1/unit38.json";
import unit39 from "@/data/b1/unit39.json";
import unit40 from "@/data/b1/unit40.json";
import unit41 from "@/data/b1/unit41.json";
import unit42 from "@/data/b1/unit42.json";

// Import all B2 units
import b2unit1 from "@/data/b2/unit1.json";
import b2unit2 from "@/data/b2/unit2.json";
import b2unit3 from "@/data/b2/unit3.json";
import b2unit4 from "@/data/b2/unit4.json";
import b2unit5 from "@/data/b2/unit5.json";
import b2unit6 from "@/data/b2/unit6.json";
import b2unit7 from "@/data/b2/unit7.json";
import b2unit8 from "@/data/b2/unit8.json";
import b2unit9 from "@/data/b2/unit9.json";
import b2unit10 from "@/data/b2/unit10.json";
import b2unit11 from "@/data/b2/unit11.json";
import b2unit12 from "@/data/b2/unit12.json";

// Collect all B1 units
const b1Units = [
  { unit: 1, data: unit1 },
  { unit: 2, data: unit2 },
  { unit: 3, data: unit3 },
  { unit: 4, data: unit4 },
  { unit: 5, data: unit5 },
  { unit: 6, data: unit6 },
  { unit: 7, data: unit7 },
  { unit: 8, data: unit8 },
  { unit: 9, data: unit9 },
  { unit: 10, data: unit10_11 },
  { unit: 12, data: unit12 },
  { unit: 13, data: unit13 },
  { unit: 14, data: unit14 },
  { unit: 15, data: unit15 },
  { unit: 16, data: unit16 },
  { unit: 17, data: unit17 },
  { unit: 18, data: unit18 },
  { unit: 19, data: unit19 },
  { unit: 20, data: unit20 },
  { unit: 21, data: unit21 },
  { unit: 22, data: unit22 },
  { unit: 23, data: unit23 },
  { unit: 24, data: unit24 },
  { unit: 25, data: unit25 },
  { unit: 26, data: unit26 },
  { unit: 27, data: unit27 },
  { unit: 28, data: unit28_29 },
  { unit: 30, data: unit30 },
  { unit: 31, data: unit31 },
  { unit: 32, data: unit32 },
  { unit: 33, data: unit33 },
  { unit: 34, data: unit34 },
  { unit: 35, data: unit35 },
  { unit: 36, data: unit36 },
  { unit: 37, data: unit37 },
  { unit: 38, data: unit38 },
  { unit: 39, data: unit39 },
  { unit: 40, data: unit40 },
  { unit: 41, data: unit41 },
  { unit: 42, data: unit42 },
];

// Collect all B2 units
const b2Units = [
  { unit: 1, data: b2unit1 },
  { unit: 2, data: b2unit2 },
  { unit: 3, data: b2unit3 },
  { unit: 4, data: b2unit4 },
  { unit: 5, data: b2unit5 },
  { unit: 6, data: b2unit6 },
  { unit: 7, data: b2unit7 },
  { unit: 8, data: b2unit8 },
  { unit: 9, data: b2unit9 },
  { unit: 10, data: b2unit10 },
  { unit: 11, data: b2unit11 },
  { unit: 12, data: b2unit12 },
];

// Combine all units from all levels
const allUnits = [...b1Units, ...b2Units];

// Helper to extract base word from prepositional phrases
// e.g. "by heart" -> "heart", "in the beginning" -> "beginning"
function extractBaseWord(phrase: string): string {
  let cleaned = phrase.toLowerCase().trim();
  const preps = /^(by|in|on|at|for|under|out of|with|about|of|to)\s+/;
  cleaned = cleaned.replace(preps, "");
  cleaned = cleaned.replace(/^(the|a|an)\s+/, "");
  cleaned = cleaned.replace(/\s*(\(of\)|\(to\)|of|to)\s*$/, "");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1) || phrase;
}

// Helper to extract base word from word patterns
// e.g. "capable of" -> "capable", "an opinion about/of" -> "opinion"
function extractPatternBaseWord(verbStr: string): string {
  let cleaned = verbStr.trim();
  cleaned = cleaned.replace(/^(a|an)\s+/i, "");
  const parts = cleaned.split(/\s+/);
  let base = parts[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

// Helper to abbreviate grammatical types/patterns (e.g. "verb" -> "v")
function abbreviateType(typeStr: string): string {
  if (!typeStr) return "";
  return typeStr
    .toLowerCase()
    .split("/")
    .map(slashPart => {
      return slashPart
        .split(",")
        .map(commaPart => {
          const trimmed = commaPart.trim();
          switch (trimmed) {
            case "verb": return "v";
            case "noun": return "n";
            case "adjective": return "adj";
            case "adverb": return "adv";
            case "preposition": return "prep";
            case "pronoun": return "pron";
            case "phrase": return "phr";
            case "noun phrase": return "n phr";
            case "verb phrase": return "v phr";
            case "conjunction": return "conj";
            case "determiner": return "det";
            default: return trimmed;
          }
        })
        .join(", ");
    })
    .join("/");
}


// Helper to format source label, e.g. "Unit 11" + "b1-unit-11" -> "unit 11 - B1"
function formatSource(unitTitle: string, unitId: string): string {
  if (!unitTitle) return "";
  const unitName = unitTitle.split(":")[0].trim().toLowerCase(); // e.g. "unit 1" or "unit 10 & 11"
  if (!unitId) return unitName;
  
  const levelPart = unitId.split("-")[0].toUpperCase(); // e.g. "B1", "B2", "C1"
  let level = levelPart;
  if (levelPart === "C1" || levelPart === "C2") {
    level = "C1-C2";
  }
  return `${unitName} - ${level}`;
}


// Interface for word family items in Word Formation
interface WordFamilyItem {
  forms: string[];
  meaning: string;
}

// Helper to parse word formation meanings into discrete forms and sub-meanings
function parseWordFormationMeaning(meaning: string): WordFamilyItem[] {
  const parts = meaning.split(/\s+\/\s+/);
  const items: WordFamilyItem[] = [];
  let pendingForms: string[] = [];
  
  for (const part of parts) {
    if (part.includes(":")) {
      const [formStr, ...meaningParts] = part.split(":");
      const formMeaning = meaningParts.join(":").trim();
      const currentForms = formStr.split("/").map(f => f.trim());
      items.push({
        forms: [...pendingForms, ...currentForms],
        meaning: formMeaning
      });
      pendingForms = [];
    } else {
      pendingForms.push(part.trim());
    }
  }
  
  if (items.length === 0) {
    items.push({
      forms: [meaning],
      meaning: ""
    });
  }
  
  return items;
}

export default function ResourcesPage() {
  const { translate } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("vocabulary");

  // Aggregate all resources
  const vocabulary = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.vocabulary || []).map((item: any) => ({
        ...item,
        word: item.word || "",
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => (a.word || '').localeCompare(b.word || ''));
  }, []);

  const phrasalVerbs = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.phrasalVerbs || []).map((item: any) => ({
        ...item,
        phrasalVerb: item.phrasalVerb || item.word || "",
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => (a.phrasalVerb || '').localeCompare(b.phrasalVerb || ''));
  }, []);

  const prepositionalPhrases = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.prepositionalPhrases || []).map((item: any) => ({
        ...item,
        phrase: item.phrase || item.word || "",
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => (a.phrase || '').localeCompare(b.phrase || ''));
  }, []);

  const wordFormation = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.wordFormation || []).map((item: any) => ({
        ...item,
        word: item.word || "",
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => (a.word || '').localeCompare(b.word || ''));
  }, []);

  const wordPatterns = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.wordPatterns || []).map((item: any) => ({
        ...item,
        verb: item.verb || item.word || "",
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => (a.verb || '').localeCompare(b.verb || ''));
  }, []);

  const collocations = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.collocations || []).map((item: any) => ({
        ...item,
        word: item.word || "",
        collocation: item.collocation || "",
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => (a.word || '').localeCompare(b.word || ''));
  }, []);

  // Filter based on search query
  const query = searchQuery.trim().toLowerCase();

  const filteredVocabulary = React.useMemo(() => {
    if (!query) return vocabulary;
    return vocabulary.filter(item => (item.word || "").toLowerCase().includes(query));
  }, [vocabulary, query]);

  const filteredPhrasal = React.useMemo(() => {
    if (!query) return phrasalVerbs;
    return phrasalVerbs.filter(item => (item.phrasalVerb || "").toLowerCase().includes(query));
  }, [phrasalVerbs, query]);

  const filteredPrep = React.useMemo(() => {
    if (!query) return prepositionalPhrases;
    return prepositionalPhrases.filter(item => (item.phrase || "").toLowerCase().includes(query));
  }, [prepositionalPhrases, query]);

  const filteredForm = React.useMemo(() => {
    if (!query) return wordFormation;
    return wordFormation.filter(item => {
      const inWord = (item.word || "").toLowerCase().includes(query);
      const parsed = parseWordFormationMeaning(item.meaning || "");
      const inFamily = parsed.some(fam => 
        (fam.forms || []).some(f => (f || "").toLowerCase().includes(query))
      );
      return inWord || inFamily;
    });
  }, [wordFormation, query]);

  const filteredPattern = React.useMemo(() => {
    if (!query) return wordPatterns;
    return wordPatterns.filter(item => (item.verb || "").toLowerCase().includes(query));
  }, [wordPatterns, query]);

  const filteredCollocation = React.useMemo(() => {
    if (!query) return collocations;
    return collocations.filter(item =>
      (item.word || "").toLowerCase().includes(query) ||
      (item.collocation || "").toLowerCase().includes(query)
    );
  }, [collocations, query]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 20;

  // Reset page number on tab or search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const currentItems = React.useMemo(() => {
    switch (activeTab) {
      case "vocabulary": return filteredVocabulary;
      case "phrasalVerbs": return filteredPhrasal;
      case "prepositionalPhrases": return filteredPrep;
      case "wordFormation": return filteredForm;
      case "wordPatterns": return filteredPattern;
      case "collocations": return filteredCollocation;
      default: return [];
    }
  }, [activeTab, filteredVocabulary, filteredPhrasal, filteredPrep, filteredForm, filteredPattern, filteredCollocation]);

  const totalPages = Math.ceil(currentItems.length / itemsPerPage) || 1;

  const paginatedItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return currentItems.slice(startIndex, startIndex + itemsPerPage);
  }, [currentItems, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const stats = React.useMemo(() => [
    {
      key: "vocabulary",
      label: "Vocabulary",
      count: vocabulary.length,
      unit: "words",
      textColor: "text-ink",
      borderColor: "border-l-ink/40 hover:border-l-ink hover:bg-ink/5",
      activeStyle: "bg-ink/5 border-l-ink border-off-black/20",
      gridClasses: "col-span-1 lg:col-span-4",
    },
    {
      key: "phrasalVerbs",
      label: "Phrasal Verbs",
      count: phrasalVerbs.length,
      unit: "items",
      textColor: "text-orange-600 dark:text-orange-500",
      borderColor: "border-l-orange-500/40 hover:border-l-orange-500 hover:bg-orange-500/5",
      activeStyle: "bg-orange-500/5 border-l-orange-500 border-orange-500/20",
      gridClasses: "col-span-1 lg:col-span-4",
    },
    {
      key: "prepositionalPhrases",
      label: "Prepositional Phrases",
      count: prepositionalPhrases.length,
      unit: "phrases",
      textColor: "text-indigo-600 dark:text-indigo-400",
      borderColor: "border-l-indigo-600/40 hover:border-l-indigo-600 hover:bg-indigo-600/5",
      activeStyle: "bg-indigo-600/5 border-l-indigo-600 border-indigo-600/20",
      gridClasses: "col-span-1 lg:col-span-4",
    },
    {
      key: "wordFormation",
      label: "Word Formation",
      count: wordFormation.length,
      unit: "forms",
      textColor: "text-teal-600 dark:text-teal-400",
      borderColor: "border-l-teal-600/40 hover:border-l-teal-600 hover:bg-teal-600/5",
      activeStyle: "bg-teal-600/5 border-l-teal-600 border-teal-600/20",
      gridClasses: "col-span-1 lg:col-span-4",
    },
    {
      key: "wordPatterns",
      label: "Word Patterns",
      count: wordPatterns.length,
      unit: "patterns",
      textColor: "text-red-600 dark:text-red-400",
      borderColor: "border-l-red-600/40 hover:border-l-red-600 hover:bg-red-600/5",
      activeStyle: "bg-red-600/5 border-l-red-600 border-red-600/20",
      gridClasses: "col-span-1 lg:col-span-4",
    },
    {
      key: "collocations",
      label: "Collocations",
      count: collocations.length,
      unit: "items",
      textColor: "text-violet-600 dark:text-violet-400",
      borderColor: "border-l-violet-600/40 hover:border-l-violet-600 hover:bg-violet-600/5",
      activeStyle: "bg-violet-600/5 border-l-violet-600 border-violet-600/20",
      gridClasses: "col-span-1 lg:col-span-4",
    },
  ], [vocabulary.length, phrasalVerbs.length, prepositionalPhrases.length, wordFormation.length, wordPatterns.length, collocations.length]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Base background color */}
      <div className="fixed inset-0 bg-pale-ash -z-20" />
      {/* FloatingLines animation layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <FloatingLines />
      </div>

      <Navbar />

      <main className="flex-grow relative z-10 pt-[140px] pb-24">
        {/* Soft background washes */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-sky-mint-gradient opacity-15 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-sunset-violet-gradient opacity-15 blur-[120px] pointer-events-none -z-10" />

        <div className="container mx-auto px-6 max-w-[1432px]">
          {/* Header Title Card */}
          <Card variant="content" className="mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between !p-8 md:!p-12 relative overflow-hidden bg-paper-canvas/80 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-atmosphere-wash/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 max-w-2xl mb-8 lg:mb-0">
              <div className="flex flex-wrap gap-2">
                <span className="inline-block text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3.5 py-1.5 rounded-full border border-off-black font-semibold">
                  B1
                </span>
                <span className="inline-block text-caption font-mono uppercase tracking-wider text-ink bg-orange-100 dark:bg-orange-900/30 px-3.5 py-1.5 rounded-full border border-orange-400/50 font-semibold">
                  B2
                </span>
                <span className="inline-block text-caption font-mono uppercase tracking-wider text-pale-stone bg-transparent px-3.5 py-1.5 rounded-full border border-off-black/20 font-semibold">
                  C1 · C2
                </span>
              </div>
              <h1 className="text-heading-lg font-heading font-bold text-ink leading-tight">
                All-in-One Destination Synthesis
              </h1>
              <p className="text-body font-mono text-pale-stone">
                A unified compilation of all vocabulary, phrasal verbs, prepositional phrases, word formations, word patterns, and collocations across Destination B1, B2, C1 & C2. Search the entire database instantly.
              </p>
            </div>

            <div className="mt-8 lg:mt-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-y-5 gap-x-4 lg:gap-x-2 w-full lg:w-[650px] shrink-0 font-mono border-t lg:border-t-0 lg:border-l border-off-black/10 pt-6 lg:pt-0 lg:pl-8">
              {stats.map((stat) => {
                const isActive = activeTab === stat.key;
                return (
                  <div
                    key={stat.key}
                    onClick={() => setActiveTab(stat.key)}
                    className={cn(
                      "flex flex-col justify-between p-3.5 rounded-xl border border-off-black/10 dark:border-white/10 transition-all duration-300 cursor-pointer select-none border-l-4 hover:scale-[1.02] active:scale-[0.98]",
                      stat.borderColor,
                      stat.gridClasses,
                      isActive ? stat.activeStyle : "bg-transparent"
                    )}
                  >
                    <p className="text-[10px] sm:text-caption text-pale-stone uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className={cn("text-body sm:text-subheading font-bold leading-none mt-1 whitespace-nowrap", stat.textColor)}>
                      {stat.count} <span className="text-xs sm:text-caption font-normal text-pale-stone">{stat.unit}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Interactive Search and Tab Dashboard */}
          <Card variant="content" className="p-6 md:p-10 bg-paper-canvas/80 backdrop-blur-md shadow-subtle border border-off-black/85 relative">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-off-black/15 pb-6">
              
              {/* Tab Selector Buttons */}
              <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="flex flex-row p-1 rounded-full w-max h-auto">
                    <TabsTrigger value="vocabulary" className="rounded-full px-5 py-2.5">
                      Vocabulary
                    </TabsTrigger>
                    <TabsTrigger value="phrasalVerbs" className="rounded-full px-5 py-2.5">
                      Phrasal Verbs
                    </TabsTrigger>
                    <TabsTrigger value="prepositionalPhrases" className="rounded-full px-5 py-2.5">
                      Prepositional Phrases
                    </TabsTrigger>
                    <TabsTrigger value="wordFormation" className="rounded-full px-5 py-2.5">
                      Word Formation
                    </TabsTrigger>
                    <TabsTrigger value="wordPatterns" className="rounded-full px-5 py-2.5">
                      Word Patterns
                    </TabsTrigger>
                    <TabsTrigger value="collocations" className="rounded-full px-5 py-2.5">
                      Collocations
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Advanced Search Input Bar */}
              <div className="w-full lg:w-[300px] relative z-10">
                <Input
                  placeholder="Type keyword to filter data..."
                  className="pl-11 pr-4 py-3 bg-paper-canvas/90 backdrop-blur-md border border-off-black rounded-full text-ink placeholder:text-pale-stone text-sm shadow-sm hover:border-off-black/70 focus:border-off-black transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img 
                  src="/imgs/magnifyingGlass.png" 
                  alt="Search" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] object-contain pointer-events-none z-20" 
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-caption text-pale-stone hover:text-ink font-mono font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Resources Content Display Panel */}
            <div className="relative overflow-hidden min-h-[400px]">
              
              {/* Tab Content: Vocabulary */}
              {activeTab === "vocabulary" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>Displaying {Math.min(currentPage * itemsPerPage, filteredVocabulary.length)} out of {filteredVocabulary.length} vocabulary {searchQuery && `(matched for "${searchQuery}")`}</span>
                  </div>
                  <Table>
                    <TableHeader className="bg-atmosphere-wash/30 border-b border-off-black">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px] font-mono text-ink text-center">STT</TableHead>
                        <TableHead className="w-[180px] font-mono text-ink">Word</TableHead>
                        <TableHead className="w-[100px] font-mono text-ink">Type</TableHead>
                        <TableHead className="font-mono text-ink">Meaning</TableHead>
                        <TableHead className="font-mono text-ink">Example</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((row: any, idx) => (
                        <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                          <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                          <TableCell className="font-mono font-bold text-ink text-sm">{row.word}</TableCell>
                          <TableCell>
                            <span className="inline-block text-[11px] font-mono font-medium text-off-black bg-transparent border border-off-black px-2.5 py-0.5 rounded-full">
                              {row.type}
                            </span>
                          </TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words">{translate(row.meaning)}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[320px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2 py-0.5 text-[10px] whitespace-nowrap inline-block">
                              {formatSource(row.unitTitle, row.unitId)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredVocabulary.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                            No results found for the search keyword.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Tab Content: Phrasal Verbs */}
              {activeTab === "phrasalVerbs" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>Displaying {Math.min(currentPage * itemsPerPage, filteredPhrasal.length)} out of {filteredPhrasal.length} phrasal verbs {searchQuery && `(matched for "${searchQuery}")`}</span>
                  </div>
                  <Table>
                    <TableHeader className="bg-atmosphere-wash/30 border-b border-off-black">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px] font-mono text-ink text-center">STT</TableHead>
                        <TableHead className="w-[200px] font-mono text-ink">Phrasal Verb</TableHead>
                        <TableHead className="font-mono text-ink">Meaning</TableHead>
                        <TableHead className="font-mono text-ink">Example</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((row: any, idx) => (
                        <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                          <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                          <TableCell className="font-mono font-bold text-orange-600 dark:text-orange-400 text-sm">{row.phrasalVerb}</TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words">{translate(row.meaning)}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[350px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2 py-0.5 text-[10px] whitespace-nowrap inline-block">
                              {formatSource(row.unitTitle, row.unitId)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredPhrasal.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-16 font-mono text-pale-stone">
                            No results found for the search keyword.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Tab Content: Prepositional Phrases */}
              {activeTab === "prepositionalPhrases" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>Displaying {Math.min(currentPage * itemsPerPage, filteredPrep.length)} out of {filteredPrep.length} prepositional phrases {searchQuery && `(matched for "${searchQuery}")`}</span>
                  </div>
                  <Table>
                    <TableHeader className="bg-atmosphere-wash/30 border-b border-off-black">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px] font-mono text-ink text-center">STT</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Base Word</TableHead>
                        <TableHead className="w-[220px] font-mono text-ink font-semibold">Prepositional Phrase</TableHead>
                        <TableHead className="font-mono text-ink">Meaning</TableHead>
                        <TableHead className="font-mono text-ink">Example</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((row: any, idx) => (
                        <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                          <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                          <TableCell className="font-mono font-medium text-ink text-sm bg-atmosphere-wash/5 font-semibold text-center">{extractBaseWord(row.phrase)}</TableCell>
                          <TableCell className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">{row.phrase}</TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[250px] break-words">{translate(row.meaning)}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[300px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2 py-0.5 text-[10px] whitespace-nowrap inline-block">
                              {formatSource(row.unitTitle, row.unitId)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredPrep.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                            No results found for the search keyword.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Tab Content: Word Formation */}
              {activeTab === "wordFormation" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>Displaying {Math.min(currentPage * itemsPerPage, filteredForm.length)} out of {filteredForm.length} word formations {searchQuery && `(matched for "${searchQuery}")`}</span>
                  </div>
                  <Table>
                    <TableHeader className="bg-atmosphere-wash/30 border-b border-off-black">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px] font-mono text-ink text-center">STT</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Base Word</TableHead>
                        <TableHead className="w-[200px] font-mono text-ink">Word Family</TableHead>
                        <TableHead className="font-mono text-ink">Meaning</TableHead>
                        <TableHead className="font-mono text-ink">Example</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((row: any, idx) => {
                        const parsedFamily = parseWordFormationMeaning(row.meaning);
                        return (
                          <React.Fragment key={idx}>
                            {parsedFamily.map((fam, fIdx) => {
                              const formsStr = fam.forms.join(" / ");
                              const isMatched = query && (
                                row.word.toLowerCase().includes(query) || 
                                fam.forms.some(f => f.toLowerCase().includes(query))
                              );
                              
                              // Extract examples for this specific form
                              const filteredExamples = row.example ? row.example.split("\n").filter((exLine: string) => {
                                const containsForm = fam.forms.some(f => {
                                  const stem = f.replace(/\(([^)]+)\)/g, '$1').toLowerCase();
                                  return exLine.toLowerCase().includes(stem);
                                });
                                return containsForm || parsedFamily.length === 1;
                              }).join("\n") : "";

                              return (
                                <TableRow 
                                  key={fIdx} 
                                  className={cn(
                                    "hover:bg-atmosphere-wash/10 transition-colors align-top",
                                    isMatched ? "bg-amber-glow-gradient/5" : ""
                                  )}
                                >
                                  {fIdx === 0 && (
                                    <>
                                      <TableCell rowSpan={parsedFamily.length} className="font-mono text-ink text-center text-xs font-semibold pt-5 border-r border-off-black/5">
                                        {(currentPage - 1) * itemsPerPage + idx + 1}
                                      </TableCell>
                                      <TableCell rowSpan={parsedFamily.length} className="font-mono font-bold text-ink text-sm pt-5 border-r border-off-black/5">
                                        {row.word}
                                        <span className="block text-[10px] text-pale-stone font-normal mt-0.5">({abbreviateType(row.type)})</span>
                                      </TableCell>
                                    </>
                                  )}
                                  
                                  <TableCell className="font-mono font-bold text-teal-600 dark:text-teal-400 text-sm pt-5">
                                    {formsStr}
                                  </TableCell>
                                  
                                  <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words pt-5">
                                    {translate(fam.meaning)}
                                  </TableCell>
                                  
                                  <TableCell className="font-mono italic text-pale-stone text-xs max-w-[350px] whitespace-pre-line pt-5">
                                    {filteredExamples}
                                  </TableCell>
                                  
                                  {fIdx === 0 && (
                                    <TableCell rowSpan={parsedFamily.length} className="font-mono text-xs text-pale-stone pt-5 border-l border-off-black/5">
                                      <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2 py-0.5 text-[10px] whitespace-nowrap inline-block">
                                        {formatSource(row.unitTitle, row.unitId)}
                                      </span>
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                      {filteredForm.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                            No results found for the search keyword.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Tab Content: Word Patterns */}
              {activeTab === "wordPatterns" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>Displaying {Math.min(currentPage * itemsPerPage, filteredPattern.length)} out of {filteredPattern.length} word patterns {searchQuery && `(matched for "${searchQuery}")`}</span>
                  </div>
                  <Table>
                    <TableHeader className="bg-atmosphere-wash/30 border-b border-off-black">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px] font-mono text-ink text-center">STT</TableHead>
                        <TableHead className="w-[160px] font-mono text-ink">Base Word</TableHead>
                        <TableHead className="w-[240px] font-mono text-ink font-semibold">Word Pattern</TableHead>
                        <TableHead className="font-mono text-ink">Meaning</TableHead>
                        <TableHead className="font-mono text-ink">Example</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((row: any, idx) => (
                        <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                          <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                          <TableCell className="font-mono font-medium text-ink text-sm bg-atmosphere-wash/5 font-semibold text-center">{extractPatternBaseWord(row.verb)}</TableCell>
                          <TableCell className="font-mono font-bold text-red-600 dark:text-red-400 text-sm">{row.verb} <span className="text-[10px] text-pale-stone font-normal italic">({abbreviateType(row.pattern)})</span></TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[250px] break-words">{translate(row.meaning)}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[320px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2 py-0.5 text-[10px] whitespace-nowrap inline-block">
                              {formatSource(row.unitTitle, row.unitId)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredPattern.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                            No results found for the search keyword.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Tab Content: Collocations */}
              {activeTab === "collocations" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>Displaying {Math.min(currentPage * itemsPerPage, filteredCollocation.length)} out of {filteredCollocation.length} collocations {searchQuery && `(matched for "${searchQuery}")`}</span>
                  </div>
                  <Table>
                    <TableHeader className="bg-atmosphere-wash/30 border-b border-off-black">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px] font-mono text-ink text-center">STT</TableHead>
                        <TableHead className="w-[160px] font-mono text-ink">Base Word</TableHead>
                        <TableHead className="w-[280px] font-mono text-ink font-semibold">Collocation</TableHead>
                        <TableHead className="font-mono text-ink">Meaning</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((row: any, idx) => (
                        <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                          <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                          <TableCell className="font-mono font-medium text-ink text-sm bg-atmosphere-wash/5 font-semibold text-center">{row.word}</TableCell>
                          <TableCell className="font-mono font-bold text-violet-600 dark:text-violet-400 text-sm">
                            <span className="inline-flex items-center gap-1.5">
                              <Link className="w-3 h-3 text-violet-400 shrink-0" />
                              {row.collocation}
                            </span>
                          </TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[300px] break-words">{translate(row.meaning)}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2 py-0.5 text-[10px] whitespace-nowrap inline-block">
                              {formatSource(row.unitTitle, row.unitId)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredCollocation.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-16 font-mono text-pale-stone">
                            No results found for the search keyword.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-off-black/15 font-mono text-sm text-ink">
                <div className="text-xs text-pale-stone">
                  Showing <span className="font-bold text-ink">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-bold text-ink">
                    {Math.min(currentPage * itemsPerPage, currentItems.length)}
                  </span>{" "}
                  of <span className="font-bold text-ink">{currentItems.length}</span> entries
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* First Page */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="w-[36px] h-[36px] rounded-full border border-off-black hover:bg-atmosphere-wash/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center text-ink"
                  >
                    <ChevronsLeft className="w-[16px] h-[16px]" />
                  </button>
                  
                  {/* Prev Page */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-[36px] px-3 rounded-full border border-off-black hover:bg-atmosphere-wash/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center gap-1 text-ink"
                  >
                    <ChevronLeft className="w-[14px] h-[14px]" /> Prev
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNum, idx) => {
                    if (pageNum === '...') {
                      return (
                        <span key={`dots-${idx}`} className="text-xs text-pale-stone select-none font-bold">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={`page-${pageNum}`}
                        onClick={() => setCurrentPage(Number(pageNum))}
                        className={cn(
                          "w-[36px] h-[36px] rounded-full border text-xs transition-all cursor-pointer font-bold select-none",
                          currentPage === pageNum
                            ? "bg-off-black text-paper-canvas border-transparent"
                            : "border-off-black hover:bg-atmosphere-wash/20 text-ink"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Page */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-[36px] px-3 rounded-full border border-off-black hover:bg-atmosphere-wash/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center gap-1 text-ink"
                  >
                    Next <ChevronRight className="w-[14px] h-[14px]" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-[36px] h-[36px] rounded-full border border-off-black hover:bg-atmosphere-wash/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center text-ink"
                  >
                    <ChevronsRight className="w-[16px] h-[16px]" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

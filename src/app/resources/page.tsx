"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Layers, Bookmark, ArrowRight, Zap, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Link, Home } from "lucide-react";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import LiquidShaderBackground from "@/components/ui/LiquidShaderBackground";
import { useLanguage } from "@/components/providers/language-provider";
import NextLink from "next/link";
import GlitchText from "@/components/GlitchText";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
import b2unit13 from "@/data/b2/unit13.json";
import b2unit14 from "@/data/b2/unit14.json";
import b2unit15 from "@/data/b2/unit15.json";
import b2unit16 from "@/data/b2/unit16.json";
import b2unit17 from "@/data/b2/unit17.json";
import b2unit18 from "@/data/b2/unit18.json";
import b2unit19 from "@/data/b2/unit19.json";
import b2unit20 from "@/data/b2/unit20.json";
import b2unit21 from "@/data/b2/unit21.json";
import b2unit22 from "@/data/b2/unit22.json";
import b2unit23 from "@/data/b2/unit23.json";
import b2unit24 from "@/data/b2/unit24.json";
import b2unit25 from "@/data/b2/unit25.json";
import b2unit26 from "@/data/b2/unit26.json";
import b2unit27 from "@/data/b2/unit27.json";
import b2unit28 from "@/data/b2/unit28.json";

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
  { unit: 13, data: b2unit13 },
  { unit: 14, data: b2unit14 },
  { unit: 15, data: b2unit15 },
  { unit: 16, data: b2unit16 },
  { unit: 17, data: b2unit17 },
  { unit: 18, data: b2unit18 },
  { unit: 19, data: b2unit19 },
  { unit: 20, data: b2unit20 },
  { unit: 21, data: b2unit21 },
  { unit: 22, data: b2unit22 },
  { unit: 23, data: b2unit23 },
  { unit: 24, data: b2unit24 },
  { unit: 25, data: b2unit25 },
  { unit: 26, data: b2unit26 },
  { unit: 27, data: b2unit27 },
  { unit: 28, data: b2unit28 },
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

// Helper to get translated word formation meaning from the translated whole row meaning
function getWordFormationMeaning(
  rowMeaning: string,
  famMeaning: string,
  fIdx: number,
  translateFn: (text: string, options?: any) => string,
  options?: any
): string {
  const translatedWhole = translateFn(rowMeaning, options);
  if (translatedWhole && translatedWhole !== rowMeaning) {
    const transParts = translatedWhole.split(/\s+\/\s+/);
    if (transParts[fIdx]) {
      const part = transParts[fIdx];
      if (part.includes(":")) {
        const colonIndex = part.indexOf(":");
        return part.substring(colonIndex + 1).trim();
      }
      return part.trim();
    }
  }
  return translateFn(famMeaning, options);
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
      textColor: "text-emerald-600 dark:text-emerald-400",
      accentBg: "bg-emerald-500",
      borderColor: "hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:hover:bg-emerald-950/20",
      activeStyle: "bg-emerald-500/10 border-emerald-500 dark:bg-emerald-500/15 shadow-sm ring-1 ring-emerald-500/30",
    },
    {
      key: "phrasalVerbs",
      label: "Phrasal Verbs",
      count: phrasalVerbs.length,
      unit: "items",
      textColor: "text-orange-600 dark:text-orange-400",
      accentBg: "bg-orange-500",
      borderColor: "hover:border-orange-500/50 hover:bg-orange-500/5 dark:hover:bg-orange-950/20",
      activeStyle: "bg-orange-500/10 border-orange-500 dark:bg-orange-500/15 shadow-sm ring-1 ring-orange-500/30",
    },
    {
      key: "prepositionalPhrases",
      label: "Prepositional Phrases",
      count: prepositionalPhrases.length,
      unit: "phrases",
      textColor: "text-sky-600 dark:text-sky-400",
      accentBg: "bg-sky-500",
      borderColor: "hover:border-sky-500/50 hover:bg-sky-500/5 dark:hover:bg-sky-950/20",
      activeStyle: "bg-sky-500/10 border-sky-500 dark:bg-sky-500/15 shadow-sm ring-1 ring-sky-500/30",
    },
    {
      key: "wordFormation",
      label: "Word Formation",
      count: wordFormation.length,
      unit: "forms",
      textColor: "text-teal-600 dark:text-teal-400",
      accentBg: "bg-teal-500",
      borderColor: "hover:border-teal-500/50 hover:bg-teal-500/5 dark:hover:bg-teal-950/20",
      activeStyle: "bg-teal-500/10 border-teal-500 dark:bg-teal-500/15 shadow-sm ring-1 ring-teal-500/30",
    },
    {
      key: "wordPatterns",
      label: "Word Patterns",
      count: wordPatterns.length,
      unit: "patterns",
      textColor: "text-rose-600 dark:text-rose-400",
      accentBg: "bg-rose-500",
      borderColor: "hover:border-rose-500/50 hover:bg-rose-500/5 dark:hover:bg-rose-950/20",
      activeStyle: "bg-rose-500/10 border-rose-500 dark:bg-rose-500/15 shadow-sm ring-1 ring-rose-500/30",
    },
    {
      key: "collocations",
      label: "Collocations",
      count: collocations.length,
      unit: "items",
      textColor: "text-amber-600 dark:text-amber-400",
      accentBg: "bg-amber-500",
      borderColor: "hover:border-amber-500/50 hover:bg-amber-500/5 dark:hover:bg-amber-950/20",
      activeStyle: "bg-amber-500/10 border-amber-500 dark:bg-amber-500/15 shadow-sm ring-1 ring-amber-500/30",
    },
  ], [vocabulary.length, phrasalVerbs.length, prepositionalPhrases.length, wordFormation.length, wordPatterns.length, collocations.length]);

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-paper-canvas dark:bg-black relative overflow-x-clip pt-[140px] pb-24">
        <LiquidShaderBackground src="/imgs/backgroundLiquid.png" className="opacity-50 dark:opacity-30 pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 max-w-[1432px]">
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
            className="w-max mt-2.5 mb-5"
          >
            <Breadcrumb className="px-4 py-2 rounded-full bg-paper-canvas/50 dark:bg-zinc-950/30 backdrop-blur-md border border-off-black/10 dark:border-white/10 shadow-sm text-xs select-none font-mono">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" asChild>
                    <NextLink href="/" className="group inline-flex items-center gap-1.5 hover:text-ink transition-all duration-200 hover:bg-atmosphere-wash/50 dark:hover:bg-white/10 px-2.5 py-0.5 rounded-full -mx-1">
                      <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                      {translate("Home")}
                    </NextLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-pale-stone font-medium inline-flex items-center gap-1.5 px-2.5 py-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-pale-stone" />
                    {translate("Resources")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>
          {/* Header Title Card */}
          <Card variant="content" className="mb-12 !p-6 sm:!p-10 md:!p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs border border-sky-500/20 font-mono font-bold uppercase tracking-wider">
                    B1
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-bold uppercase tracking-wider">
                    B2
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs border border-amber-500/20 font-mono font-bold uppercase tracking-wider">
                    C1 · C2
                  </span>
                </div>

                <span className="text-[11px] font-mono font-semibold text-pale-stone flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-canvas/60 dark:bg-zinc-900/60 border border-off-black/10 dark:border-white/10 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  3,500+ {translate("Records")}
                </span>
              </div>

              {/* Main Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Heading & Description */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-4 pb-1">
                    <GlitchText className="text-gradient-heading" enableOnHover={false}>
                      {translate("All-in-One Destination Synthesis")}
                    </GlitchText>
                  </h1>

                  <p className="text-sm sm:text-base font-mono text-pale-stone leading-relaxed">
                    {translate("A unified compilation of all vocabulary, phrasal verbs, prepositional phrases, word formations, word patterns, and collocations across Destination B1, B2, C1 & C2. Search the entire database instantly.")}
                  </p>
                </div>

                {/* Right Column: 6 Interactive Stat Cards Grid */}
                <div className="lg:col-span-6 w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 font-mono">
                    {stats.map((stat) => {
                      const isActive = activeTab === stat.key;
                      return (
                        <div
                          key={stat.key}
                          onClick={() => setActiveTab(stat.key)}
                          className={cn(
                            "flex flex-col justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer select-none relative overflow-hidden group hover:scale-[1.03] active:scale-[0.98]",
                            isActive 
                              ? stat.activeStyle 
                              : cn("bg-paper-canvas/40 dark:bg-zinc-900/40 border-off-black/10 dark:border-white/10", stat.borderColor)
                          )}
                        >
                          {/* Top Accent Dot & Label */}
                          <div className="flex items-center justify-between mb-3">
                            <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", stat.accentBg)} />
                            <span className="text-[10px] sm:text-caption font-bold text-pale-stone uppercase tracking-wider text-right">
                              {translate(stat.label)}
                            </span>
                          </div>

                          {/* Count & Unit */}
                          <div>
                            <p className={cn("text-lg sm:text-2xl font-bold leading-tight", stat.textColor)}>
                              {stat.count}
                            </p>
                            <p className="text-[11px] font-normal text-pale-stone mt-0.5">
                              {translate(stat.unit)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Search and Tab Dashboard */}
          <Card variant="content" className="p-3 sm:p-6 md:p-10 relative">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-off-black/15 pb-6">
              
              {/* Tab Selector Buttons */}
              <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="flex flex-row p-1 rounded-full w-max h-auto">
                    <TabsTrigger value="vocabulary" className="rounded-full px-5 py-2.5">
                      {translate("Vocabulary")}
                    </TabsTrigger>
                    <TabsTrigger value="phrasalVerbs" className="rounded-full px-5 py-2.5">
                      {translate("Phrasal Verbs")}
                    </TabsTrigger>
                    <TabsTrigger value="prepositionalPhrases" className="rounded-full px-5 py-2.5">
                      {translate("Prepositional Phrases")}
                    </TabsTrigger>
                    <TabsTrigger value="wordFormation" className="rounded-full px-5 py-2.5">
                      {translate("Word Formation")}
                    </TabsTrigger>
                    <TabsTrigger value="wordPatterns" className="rounded-full px-5 py-2.5">
                      {translate("Word Patterns")}
                    </TabsTrigger>
                    <TabsTrigger value="collocations" className="rounded-full px-5 py-2.5">
                      {translate("Collocations")}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Advanced Search Input Bar */}
              <div className="w-full lg:w-[300px] relative z-10">
                <Input
                  placeholder={translate("Type keyword to filter data...")}
                  className="pl-11 pr-4 py-3 bg-white/5 dark:bg-black/20 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800 rounded-full text-ink placeholder:text-pale-stone text-sm shadow-sm hover:border-zinc-300 dark:hover:border-zinc-750 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img 
                  src="/imgs/magnifyingGlass.png" 
                  alt={translate("Search")} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] object-contain pointer-events-none z-20" 
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-caption text-pale-stone hover:text-ink font-mono font-bold"
                  >
                    {translate("Clear")}
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
                    <span>{translate("Displaying")} {Math.min(currentPage * itemsPerPage, filteredVocabulary.length)} {translate("out of")} {filteredVocabulary.length} {translate("vocabulary")}{searchQuery && ` (${translate("matched for")} "${searchQuery}")`}</span>
                  </div>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-emerald-500/10 border-b border-emerald-500/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[80px] font-mono text-emerald-700 dark:text-emerald-300 font-bold text-center">{translate("No.")}</TableHead>
                          <TableHead className="w-[180px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Word")}</TableHead>
                          <TableHead className="w-[100px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Type")}</TableHead>
                          <TableHead className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Meaning")}</TableHead>
                          <TableHead className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Example")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Source")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedItems.map((row: any, idx) => (
                          <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                            <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                            <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-sm">{row.word}</TableCell>
                            <TableCell>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-medium">
                                {row.type}
                              </span>
                            </TableCell>
                            <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words">{translate(row.meaning, { lookupOnly: true })}</TableCell>
                            <TableCell className="font-mono italic text-pale-stone text-xs max-w-[320px] whitespace-pre-line">{row.example}</TableCell>
                            <TableCell className="font-mono text-xs text-pale-stone">
                              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                                {formatSource(row.unitTitle, row.unitId)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredVocabulary.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                              {translate("No results found for the search keyword.")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {paginatedItems.map((row: any, idx) => (
                      <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-lg bg-paper-canvas/30 space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                          <span className="text-[10px] font-bold text-pale-stone">#{ (currentPage - 1) * itemsPerPage + idx + 1 }</span>
                          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                             {formatSource(row.unitTitle, row.unitId)}
                           </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.word}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-medium">
                              {row.type}
                            </span>
                          </div>
                          <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning, { lookupOnly: true })}</p>
                          {row.example && (
                            <p className="italic text-pale-stone leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> "{row.example}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredVocabulary.length === 0 && (
                      <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                        {translate("No results found for the search keyword.")}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content: Phrasal Verbs */}
              {activeTab === "phrasalVerbs" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>{translate("Displaying")} {Math.min(currentPage * itemsPerPage, filteredPhrasal.length)} {translate("out of")} {filteredPhrasal.length} {translate("phrasal verbs")}{searchQuery && ` (${translate("matched for")} "${searchQuery}")`}</span>
                  </div>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-orange-500/10 border-b border-orange-500/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[80px] font-mono text-orange-700 dark:text-orange-300 font-bold text-center">{translate("STT")}</TableHead>
                          <TableHead className="w-[200px] font-mono text-orange-700 dark:text-orange-300 font-bold">{translate("Phrasal Verb")}</TableHead>
                          <TableHead className="font-mono text-orange-700 dark:text-orange-300 font-bold">{translate("Meaning")}</TableHead>
                          <TableHead className="font-mono text-orange-700 dark:text-orange-300 font-bold">{translate("Example")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-orange-700 dark:text-orange-300 font-bold">{translate("Source")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedItems.map((row: any, idx) => (
                          <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                            <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                            <TableCell className="font-mono font-bold text-orange-600 dark:text-orange-400 text-sm">{row.phrasalVerb}</TableCell>
                            <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words">{translate(row.meaning, { lookupOnly: true })}</TableCell>
                            <TableCell className="font-mono italic text-pale-stone text-xs max-w-[350px] whitespace-pre-line">{row.example}</TableCell>
                            <TableCell className="font-mono text-xs text-pale-stone">
                              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                                {formatSource(row.unitTitle, row.unitId)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredPhrasal.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-16 font-mono text-pale-stone">
                              {translate("No results found for the search keyword.")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {paginatedItems.map((row: any, idx) => (
                      <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-lg bg-paper-canvas/30 space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                          <span className="text-[10px] font-bold text-pale-stone">#{ (currentPage - 1) * itemsPerPage + idx + 1 }</span>
                           <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                             {formatSource(row.unitTitle, row.unitId)}
                           </span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{row.phrasalVerb}</span>
                          <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning, { lookupOnly: true })}</p>
                          {row.example && (
                            <p className="italic text-pale-stone leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> "{row.example}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredPhrasal.length === 0 && (
                      <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                        {translate("No results found for the search keyword.")}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content: Prepositional Phrases */}
              {activeTab === "prepositionalPhrases" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>{translate("Displaying")} {Math.min(currentPage * itemsPerPage, filteredPrep.length)} {translate("out of")} {filteredPrep.length} {translate("prepositional phrases")}{searchQuery && ` (${translate("matched for")} "${searchQuery}")`}</span>
                  </div>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-sky-500/10 border-b border-sky-500/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[80px] font-mono text-sky-700 dark:text-sky-300 font-bold text-center">{translate("STT")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Base Word")}</TableHead>
                          <TableHead className="w-[220px] font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Prepositional Phrase")}</TableHead>
                          <TableHead className="font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Meaning")}</TableHead>
                          <TableHead className="font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Example")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Source")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedItems.map((row: any, idx) => (
                          <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                            <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                            <TableCell className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-semibold text-center">{extractBaseWord(row.phrase)}</TableCell>
                            <TableCell className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">{row.phrase}</TableCell>
                            <TableCell className="font-mono text-off-black text-sm max-w-[250px] break-words">{translate(row.meaning, { lookupOnly: true })}</TableCell>
                            <TableCell className="font-mono italic text-pale-stone text-xs max-w-[300px] whitespace-pre-line">{row.example}</TableCell>
                            <TableCell className="font-mono text-xs text-pale-stone">
                              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                                {formatSource(row.unitTitle, row.unitId)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredPrep.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                              {translate("No results found for the search keyword.")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {paginatedItems.map((row: any, idx) => (
                      <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-lg bg-paper-canvas/30 space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                          <span className="text-[10px] font-bold text-pale-stone">#{ (currentPage - 1) * itemsPerPage + idx + 1 }</span>
                           <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                             {formatSource(row.unitTitle, row.unitId)}
                           </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm font-bold text-sky-600 dark:text-sky-400">{row.phrase}</span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">({translate("Base Word")}: {extractBaseWord(row.phrase)})</span>
                          </div> 
                          <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning, { lookupOnly: true })}</p>
                          {row.example && (
                            <p className="italic text-pale-stone leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> "{row.example}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredPrep.length === 0 && (
                      <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                        {translate("No results found for the search keyword.")}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content: Word Formation */}
              {activeTab === "wordFormation" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>{translate("Displaying")} {Math.min(currentPage * itemsPerPage, filteredForm.length)} {translate("out of")} {filteredForm.length} {translate("word formations")}{searchQuery && ` (${translate("matched for")} "${searchQuery}")`}</span>
                  </div>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-teal-500/10 border-b border-teal-500/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[80px] font-mono text-teal-700 dark:text-teal-300 font-bold text-center">{translate("STT")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Base Word")}</TableHead>
                          <TableHead className="w-[200px] font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Word Family")}</TableHead>
                          <TableHead className="font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Meaning")}</TableHead>
                          <TableHead className="font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Example")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Source")}</TableHead>
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
                                        <TableCell rowSpan={parsedFamily.length} className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-sm pt-5 border-r border-off-black/5">
                                          {row.word}
                                          <span className="block mt-1 w-max px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
                                            {abbreviateType(row.type)}
                                          </span>
                                        </TableCell>
                                      </>
                                    )}
                                    
                                    <TableCell className="font-mono pt-5">
                                      <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs border border-teal-500/20 font-bold">
                                        {formsStr}
                                      </span>
                                    </TableCell>
                                    
                                    <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words pt-5">
                                      {getWordFormationMeaning(row.meaning, fam.meaning, fIdx, translate, { lookupOnly: true })}
                                    </TableCell>
                                    
                                    <TableCell className="font-mono italic text-pale-stone text-xs max-w-[350px] whitespace-pre-line pt-5">
                                      {filteredExamples}
                                    </TableCell>
                                    
                                    {fIdx === 0 && (
                                      <TableCell rowSpan={parsedFamily.length} className="font-mono text-xs text-pale-stone pt-5 border-l border-off-black/5">
                                        <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
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
                              {translate("No results found for the search keyword.")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {paginatedItems.map((row: any, idx) => {
                      const parsedFamily = parseWordFormationMeaning(row.meaning);
                      return (
                        <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-lg bg-paper-canvas/30 space-y-3 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                            <span className="text-[10px] font-bold text-pale-stone">#{ (currentPage - 1) * itemsPerPage + idx + 1 }</span>
                            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                               {formatSource(row.unitTitle, row.unitId)}
                             </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.word}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
                                {abbreviateType(row.type)}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-4 pt-1">
                            {parsedFamily.map((fam, fIdx) => {
                              const formsStr = fam.forms.join(" / ");
                              const filteredExamples = row.example ? row.example.split("\n").filter((exLine: string) => {
                                const containsForm = fam.forms.some(f => {
                                  const stem = f.replace(/\(([^)]+)\)/g, '$1').toLowerCase();
                                  return exLine.toLowerCase().includes(stem);
                                });
                                return containsForm || parsedFamily.length === 1;
                              }).join("\n") : "";

                              return (
                                <div key={fIdx} className="space-y-2 border-b border-off-black/5 dark:border-white/5 last:border-b-0 pb-3 last:pb-0">
                                  <p className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs border border-teal-500/20 font-bold w-max">
                                    {formsStr}
                                  </p>
                                  <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {getWordFormationMeaning(row.meaning, fam.meaning, fIdx, translate, { lookupOnly: true })}</p>
                                  {filteredExamples && (
                                    <p className="italic text-pale-stone leading-relaxed whitespace-pre-line"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> {filteredExamples}</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    {filteredForm.length === 0 && (
                      <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                        {translate("No results found for the search keyword.")}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content: Word Patterns */}
              {activeTab === "wordPatterns" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>{translate("Displaying")} {Math.min(currentPage * itemsPerPage, filteredPattern.length)} {translate("out of")} {filteredPattern.length} {translate("word patterns")}{searchQuery && ` (${translate("matched for")} "${searchQuery}")`}</span>
                  </div>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-rose-500/10 border-b border-rose-500/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[80px] font-mono text-rose-700 dark:text-rose-300 font-bold text-center">{translate("STT")}</TableHead>
                          <TableHead className="w-[160px] font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Base Word")}</TableHead>
                          <TableHead className="w-[240px] font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Word Pattern")}</TableHead>
                          <TableHead className="font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Meaning")}</TableHead>
                          <TableHead className="font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Example")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Source")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedItems.map((row: any, idx) => (
                          <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                            <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                            <TableCell className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-semibold text-center">{extractPatternBaseWord(row.verb)}</TableCell>
                            <TableCell className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                              {row.verb}{" "}
                              <span className="inline-block px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] border border-rose-500/20 font-mono font-medium ml-1">
                                {abbreviateType(row.pattern)}
                              </span>
                            </TableCell>
                            <TableCell className="font-mono text-off-black text-sm max-w-[250px] break-words">{translate(row.meaning, { lookupOnly: true })}</TableCell>
                            <TableCell className="font-mono italic text-pale-stone text-xs max-w-[320px] whitespace-pre-line">{row.example}</TableCell>
                            <TableCell className="font-mono text-xs text-pale-stone">
                              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                                {formatSource(row.unitTitle, row.unitId)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredPattern.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                              {translate("No results found for the search keyword.")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {paginatedItems.map((row: any, idx) => (
                      <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-lg bg-paper-canvas/30 space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                          <span className="text-[10px] font-bold text-pale-stone">#{ (currentPage - 1) * itemsPerPage + idx + 1 }</span>
                           <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                             {formatSource(row.unitTitle, row.unitId)}
                           </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{row.verb}</span>
                            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] border border-rose-500/20 font-medium">
                              {abbreviateType(row.pattern)}
                            </span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">({translate("Base Word")}: {extractPatternBaseWord(row.verb)})</span>
                          </div> 
                          <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning, { lookupOnly: true })}</p>
                          {row.example && (
                            <p className="italic text-pale-stone leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> "{row.example}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredPattern.length === 0 && (
                      <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                        {translate("No results found for the search keyword.")}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content: Collocations */}
              {activeTab === "collocations" && (
                <div className="animate-in fade-in duration-200">
                  <div className="mb-4 text-xs font-mono text-pale-stone flex items-center justify-between">
                    <span>{translate("Displaying")} {Math.min(currentPage * itemsPerPage, filteredCollocation.length)} {translate("out of")} {filteredCollocation.length} {translate("collocations")}{searchQuery && ` (${translate("matched for")} "${searchQuery}")`}</span>
                  </div>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-amber-500/10 border-b border-amber-500/20">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[80px] font-mono text-amber-700 dark:text-amber-300 font-bold text-center">{translate("STT")}</TableHead>
                          <TableHead className="w-[160px] font-mono text-amber-700 dark:text-amber-300 font-bold">{translate("Base Word")}</TableHead>
                          <TableHead className="w-[280px] font-mono text-amber-700 dark:text-amber-300 font-bold">{translate("Collocation")}</TableHead>
                          <TableHead className="font-mono text-amber-700 dark:text-amber-300 font-bold">{translate("Meaning")}</TableHead>
                          <TableHead className="w-[150px] font-mono text-amber-700 dark:text-amber-300 font-bold">{translate("Source")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedItems.map((row: any, idx) => (
                          <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors">
                            <TableCell className="font-mono text-ink text-center text-xs font-semibold">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                            <TableCell className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-semibold text-center">{row.word}</TableCell>
                            <TableCell className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                              <span className="inline-flex items-center gap-1.5">
                                <Link className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
                                {row.collocation}
                              </span>
                            </TableCell>
                            <TableCell className="font-mono text-off-black text-sm max-w-[300px] break-words">{translate(row.meaning, { lookupOnly: true })}</TableCell>
                            <TableCell className="font-mono text-xs text-pale-stone">
                              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                                {formatSource(row.unitTitle, row.unitId)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredCollocation.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-16 font-mono text-pale-stone">
                              {translate("No results found for the search keyword.")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {paginatedItems.map((row: any, idx) => (
                      <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-lg bg-paper-canvas/30 space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                          <span className="text-[10px] font-bold text-pale-stone">#{ (currentPage - 1) * itemsPerPage + idx + 1 }</span>
                           <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] border border-sky-500/20 whitespace-nowrap inline-block font-semibold">
                             {formatSource(row.unitTitle, row.unitId)}
                           </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{row.collocation}</span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">({translate("Base Word")}: {row.word})</span>
                          </div> 
                          <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning, { lookupOnly: true })}</p>
                          {row.example && (
                            <p className="italic text-pale-stone leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> "{row.example}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredCollocation.length === 0 && (
                      <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                        {translate("No results found for the search keyword.")}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/80 font-mono text-sm text-ink">
                <div className="text-xs text-pale-stone">
                  {translate("Showing")} <span className="font-bold text-ink">{(currentPage - 1) * itemsPerPage + 1}</span> {translate("to")}{" "}
                  <span className="font-bold text-ink">
                    {Math.min(currentPage * itemsPerPage, currentItems.length)}
                  </span>{" "}
                  {translate("of")} <span className="font-bold text-ink">{currentItems.length}</span> {translate("entries")}
                </div>
                
                <div className="flex items-center gap-1.5 max-w-full overflow-x-auto scrollbar-none py-1.5 px-2 justify-center sm:justify-end">
                  {/* First Page */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="w-[36px] h-[36px] shrink-0 rounded-full border border-zinc-200/50 dark:border-zinc-800 hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center text-ink"
                  >
                    <ChevronsLeft className="w-[16px] h-[16px]" />
                  </button>
                  
                  {/* Prev Page */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-[36px] px-3 shrink-0 rounded-full border border-zinc-200/50 dark:border-zinc-800 hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center gap-1 text-ink"
                  >
                    <ChevronLeft className="w-[14px] h-[14px]" /> {translate("Prev")}
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNum, idx) => {
                    if (pageNum === '...') {
                      return (
                        <span key={`dots-${idx}`} className="text-xs text-pale-stone select-none font-bold px-1 shrink-0">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={`page-${pageNum}`}
                        onClick={() => setCurrentPage(Number(pageNum))}
                        className={cn(
                          "w-[36px] h-[36px] shrink-0 rounded-full border text-xs transition-all cursor-pointer font-bold select-none",
                          currentPage === pageNum
                            ? "bg-blue-600 text-white border-transparent"
                            : "border-zinc-200/50 dark:border-zinc-800 hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-400 text-ink"
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
                    className="h-[36px] px-3 shrink-0 rounded-full border border-zinc-200/50 dark:border-zinc-800 hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center gap-1 text-ink"
                  >
                    {translate("Next")} <ChevronRight className="w-[14px] h-[14px]" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-[36px] h-[36px] shrink-0 rounded-full border border-zinc-200/50 dark:border-zinc-800 hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer select-none font-bold text-xs flex items-center justify-center text-ink"
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
    </>
  );
}

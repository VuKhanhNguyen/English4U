"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Layers, Bookmark, ArrowRight, Zap, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import FloatingLines from "@/components/FloatingLines";

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

// Collect all units in one array
const allUnits = [
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
];

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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("vocabulary");

  // Aggregate all resources
  const vocabulary = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.vocabulary || []).map((item: any) => ({
        ...item,
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => a.word.localeCompare(b.word));
  }, []);

  const phrasalVerbs = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.phrasalVerbs || []).map((item: any) => ({
        ...item,
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => a.phrasalVerb.localeCompare(b.phrasalVerb));
  }, []);

  const prepositionalPhrases = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.prepositionalPhrases || []).map((item: any) => ({
        ...item,
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => a.phrase.localeCompare(b.phrase));
  }, []);

  const wordFormation = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.wordFormation || []).map((item: any) => ({
        ...item,
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => a.word.localeCompare(b.word));
  }, []);

  const wordPatterns = React.useMemo(() => {
    return allUnits.flatMap(u => {
      const data = u.data as any;
      return (data.wordPatterns || []).map((item: any) => ({
        ...item,
        unitTitle: data.title,
        unitId: data.id,
      }));
    }).sort((a, b) => a.verb.localeCompare(b.verb));
  }, []);

  // Filter based on search query
  const query = searchQuery.trim().toLowerCase();

  const filteredVocabulary = React.useMemo(() => {
    if (!query) return vocabulary;
    return vocabulary.filter(item => item.word.toLowerCase().includes(query));
  }, [vocabulary, query]);

  const filteredPhrasal = React.useMemo(() => {
    if (!query) return phrasalVerbs;
    return phrasalVerbs.filter(item => item.phrasalVerb.toLowerCase().includes(query));
  }, [phrasalVerbs, query]);

  const filteredPrep = React.useMemo(() => {
    if (!query) return prepositionalPhrases;
    return prepositionalPhrases.filter(item => item.phrase.toLowerCase().includes(query));
  }, [prepositionalPhrases, query]);

  const filteredForm = React.useMemo(() => {
    if (!query) return wordFormation;
    return wordFormation.filter(item => {
      const inWord = item.word.toLowerCase().includes(query);
      const parsed = parseWordFormationMeaning(item.meaning);
      const inFamily = parsed.some(fam => 
        fam.forms.some(f => f.toLowerCase().includes(query))
      );
      return inWord || inFamily;
    });
  }, [wordFormation, query]);

  const filteredPattern = React.useMemo(() => {
    if (!query) return wordPatterns;
    return wordPatterns.filter(item => item.verb.toLowerCase().includes(query));
  }, [wordPatterns, query]);

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
      default: return [];
    }
  }, [activeTab, filteredVocabulary, filteredPhrasal, filteredPrep, filteredForm, filteredPattern]);

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
          <Card variant="content" className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between !p-8 md:!p-12 relative overflow-hidden bg-paper-canvas/80 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-atmosphere-wash/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 max-w-2xl">
              <span className="inline-block text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3.5 py-1.5 rounded-full border border-off-black font-semibold">
                B1 Resources Hub
              </span>
              <h1 className="text-heading-lg font-heading font-bold text-ink leading-tight">
                All-in-One Destination B1 Synthesis
              </h1>
              <p className="text-body font-mono text-pale-stone">
                An aggregated compilation of all vocabulary, phrasal verbs, prepositional phrases, word formations, and patterns from Units 1 to 12. Search across the entire B1 database instantly.
              </p>
            </div>

            <div className="mt-6 md:mt-0 flex gap-6 md:gap-8 font-mono border-t md:border-t-0 md:border-l border-off-black/10 pt-6 md:pt-0 md:pl-8 w-full md:w-auto shrink-0">
              <div className="flex-1 md:flex-none">
                <p className="text-caption text-pale-stone uppercase tracking-wider mb-1">
                  Vocabulary
                </p>
                <p className="text-heading font-bold text-ink leading-none">
                  {vocabulary.length} words
                </p>
              </div>
              <div className="flex-1 md:flex-none">
                <p className="text-caption text-pale-stone uppercase tracking-wider mb-1">
                  Phrasal Verbs
                </p>
                <p className="text-heading font-bold text-ink leading-none">
                  {phrasalVerbs.length} items
                </p>
              </div>
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
                  </TabsList>
                </Tabs>
              </div>

              {/* Advanced Search Input Bar */}
              <div className="w-full lg:w-[350px] relative z-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pale-stone w-[18px] h-[18px]" />
                <Input
                  placeholder="Type keyword to filter data..."
                  className="pl-11 pr-4 py-3 bg-paper-canvas/90 backdrop-blur-md border border-off-black rounded-full text-ink placeholder:text-pale-stone text-sm shadow-sm hover:border-off-black/70 focus:border-off-black transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                          <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words">{row.meaning}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[320px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2.5 py-1">
                              {row.unitTitle.split(":")[0]}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredVocabulary.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                            Không tìm thấy kết quả phù hợp cho từ khóa tìm kiếm.
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
                          <TableCell className="font-mono font-bold text-ink text-sm text-[#ea580c]">{row.phrasalVerb}</TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[280px] break-words">{row.meaning}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[350px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2.5 py-1">
                              {row.unitTitle.split(":")[0]}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredPhrasal.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-16 font-mono text-pale-stone">
                            Không tìm thấy kết quả phù hợp cho từ khóa tìm kiếm.
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
                        <TableHead className="w-[150px] font-mono text-ink">Từ (Base Word)</TableHead>
                        <TableHead className="w-[220px] font-mono text-ink font-semibold">Cụm giới từ</TableHead>
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
                          <TableCell className="font-mono font-bold text-indigo-600 text-sm">{row.phrase}</TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[250px] break-words">{row.meaning}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[300px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2.5 py-1">
                              {row.unitTitle.split(":")[0]}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredPrep.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                            Không tìm thấy kết quả phù hợp cho từ khóa tìm kiếm.
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
                        <TableHead className="w-[180px] font-mono text-ink">Từ gốc (Base Word)</TableHead>
                        <TableHead className="font-mono text-ink">Gia đình từ & Ý nghĩa (Word Family & Meanings)</TableHead>
                        <TableHead className="w-[150px] font-mono text-ink">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedItems.map((row: any, idx) => {
                        const parsedFamily = parseWordFormationMeaning(row.meaning);
                        return (
                          <TableRow key={idx} className="hover:bg-atmosphere-wash/10 transition-colors align-top">
                            <TableCell className="font-mono text-ink text-center text-xs font-semibold pt-5">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                            <TableCell className="font-mono font-bold text-ink text-sm pt-5">
                              {row.word}
                              <span className="block text-[10px] text-pale-stone font-normal mt-0.5">({row.type})</span>
                            </TableCell>
                            <TableCell className="p-2">
                              <div className="divide-y divide-off-black/5 font-mono">
                                {parsedFamily.map((fam, fIdx) => {
                                  const formsStr = fam.forms.join(" / ");
                                  const isMatched = query && (
                                    row.word.toLowerCase().includes(query) || 
                                    fam.forms.some(f => f.toLowerCase().includes(query))
                                  );
                                  return (
                                    <div key={fIdx} className={cn("py-3 px-2 flex flex-col md:flex-row gap-2 md:gap-6 justify-between items-start", isMatched ? "bg-amber-glow-gradient/5 rounded-md border-l-4 border-amber-glow-gradient/50 pl-2.5" : "")}>
                                      <div className="md:w-[250px] shrink-0">
                                        <span className="font-bold text-ink text-sm text-[#0f766e]">
                                          {formsStr}
                                        </span>
                                      </div>
                                      <div className="flex-1 space-y-1">
                                        <p className="text-off-black text-sm leading-relaxed">{fam.meaning}</p>
                                        {row.example && (
                                          <div className="text-xs text-pale-stone italic mt-1 font-mono">
                                            {row.example.split("\n").map((exLine: string, exIdx: number) => {
                                              const containsForm = fam.forms.some(f => {
                                                const stem = f.replace(/\(([^)]+)\)/g, '$1').toLowerCase();
                                                return exLine.toLowerCase().includes(stem);
                                              });
                                              if (containsForm || parsedFamily.length === 1) {
                                                return (
                                                  <div key={exIdx} className="opacity-80">
                                                    {exLine}
                                                  </div>
                                                );
                                              }
                                              return null;
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs text-pale-stone pt-5">
                              <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2.5 py-1">
                                {row.unitTitle.split(":")[0]}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {filteredForm.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-16 font-mono text-pale-stone">
                            Không tìm thấy kết quả phù hợp cho từ khóa tìm kiếm.
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
                        <TableHead className="w-[160px] font-mono text-ink">Từ (Base Word)</TableHead>
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
                          <TableCell className="font-mono font-bold text-[#b91c1c] text-sm">{row.verb} <span className="text-[10px] text-pale-stone font-normal italic">({row.pattern})</span></TableCell>
                          <TableCell className="font-mono text-off-black text-sm max-w-[250px] break-words">{row.meaning}</TableCell>
                          <TableCell className="font-mono italic text-pale-stone text-xs max-w-[320px] whitespace-pre-line">{row.example}</TableCell>
                          <TableCell className="font-mono text-xs text-pale-stone">
                            <span className="bg-atmosphere-wash/20 border border-off-black/10 rounded-full px-2.5 py-1">
                              {row.unitTitle.split(":")[0]}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredPattern.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 font-mono text-pale-stone">
                            Không tìm thấy kết quả phù hợp cho từ khóa tìm kiếm.
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

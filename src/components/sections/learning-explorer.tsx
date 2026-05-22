"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

import b1Data from "@/data/destination-b1.json";
import b2Data from "@/data/destination-b2.json";
import c1c2Data from "@/data/destination-c1-c2.json";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/data-table";

const books = [b1Data, b2Data, c1c2Data];

interface LearningExplorerSectionProps {
  bookLevel?: "b1" | "b2" | "c1-c2";
  hideHeader?: boolean;
  className?: string;
}

export function LearningExplorerSection({
  bookLevel,
  hideHeader = false,
  className,
}: LearningExplorerSectionProps = {}) {
  const levelMap = {
    b1: 0,
    b2: 1,
    "c1-c2": 2,
  };

  const initialIndex = bookLevel ? levelMap[bookLevel] : 0;
  const [selectedBookIndex, setSelectedBookIndex] =
    React.useState(initialIndex);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    if (bookLevel) {
      setSelectedBookIndex(levelMap[bookLevel]);
    }
  }, [bookLevel]);

  const activeBook = books[selectedBookIndex];

  // A basic filtering function for the tables based on the search query
  const filterData = (data: any[], keysToSearch: string[]) => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((item) =>
      keysToSearch.some((key) => item[key]?.toLowerCase().includes(query)),
    );
  };

  return (
    <section className={cn("py-16 md:py-24 bg-paper-canvas border-t border-off-black relative overflow-hidden", className)}>
      {/* Subtle background gradient wash */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-mint-gradient opacity-20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-sunset-violet-gradient opacity-15 blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-[1432px] relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-end gap-4 ${hideHeader ? 'mb-4' : 'mb-12'}`}>
          {!hideHeader && (
            <div>
              <h2 className="text-heading-lg font-heading text-ink mb-4">
                Learning Explorer
              </h2>
              <p className="text-body font-mono text-pale-stone max-w-xl">
                Dive deep into the structured content. Expand a unit, select a
                category, use the search to quickly find specific rules or
                vocabulary.
              </p>
            </div>
          )}

          <div className="w-full md:w-[280px] relative ml-auto z-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pale-stone w-[16px] h-[16px]" />
            <Input
              placeholder="Search grammar, vocabulary..."
              className="pl-9 bg-paper-canvas/70 backdrop-blur-md border-off-black rounded-full text-ink placeholder:text-pale-stone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Book Tabs - Hide if a specific level is requested */}
        {!bookLevel ? (
          <div className="mb-8">
            <Tabs
              value={selectedBookIndex.toString()}
              onValueChange={(v) => setSelectedBookIndex(parseInt(v))}
            >
              <TabsList className="mb-4">
                {books.map((book, idx) => (
                  <TabsTrigger key={book.book} value={idx.toString()}>
                    {book.book}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        ) : (
          <Card variant="content" className="mb-6 flex flex-row items-center justify-between !p-6 md:!p-10">
            <div>
              <span className="text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3 py-1 rounded-full border border-off-black">
                {activeBook.book}
              </span>
              <h1 className="text-heading font-heading text-ink mt-3 mb-0">
                Structured Syllabus Explorer
              </h1>
            </div>
            <div className="text-right hidden sm:block font-mono shrink-0 ml-6">
              <p className="text-caption text-pale-stone uppercase tracking-wider mb-1">
                Total Syllabus
              </p>
              <p className="text-heading-lg font-bold text-ink leading-none">
                {activeBook.units.length} Units
              </p>
            </div>
          </Card>
        )}

        {/* Units Accordion */}
        <Card variant="content" className="p-4 md:p-8">
          <Accordion
            type="single"
            collapsible
            defaultValue={activeBook.units[0]?.id}
            className="w-full"
          >
            {activeBook.units.map((unit) => (
              <AccordionItem key={unit.id} value={unit.id} className="border-b border-pale-stone">
                <AccordionTrigger className="text-subheading font-mono font-medium hover:no-underline py-5 text-ink">
                  {unit.title}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <Tabs defaultValue="grammar" className="w-full mt-4">
                    <TabsList className="mb-6 flex-wrap h-auto p-1 rounded-[24px]">
                      <TabsTrigger value="grammar" className="rounded-full">Grammar</TabsTrigger>
                      <TabsTrigger value="vocabulary" className="rounded-full">Vocabulary</TabsTrigger>
                      <TabsTrigger value="wordFormation" className="rounded-full">
                        Word Formation
                      </TabsTrigger>
                      <TabsTrigger value="wordPatterns" className="rounded-full">
                        Word Patterns
                      </TabsTrigger>
                      <TabsTrigger value="phrasalVerbs" className="rounded-full">
                        Phrasal Verbs
                      </TabsTrigger>
                      <TabsTrigger value="collocations" className="rounded-full">
                        Collocations
                      </TabsTrigger>
                    </TabsList>

                    {/* Grammar Tab */}
                    <TabsContent
                      value="grammar"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px] font-mono text-ink">
                              Structure
                            </TableHead>
                            <TableHead className="font-mono text-ink">Usage</TableHead>
                            <TableHead className="font-mono text-ink">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.grammar, [
                            "structure",
                            "usage",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink">
                                {row.structure}
                              </TableCell>
                              <TableCell className="font-mono text-off-black">{row.usage}</TableCell>
                              <TableCell className="font-mono italic text-pale-stone">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.grammar, [
                            "structure",
                            "usage",
                            "example",
                          ]).length === 0 && (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center py-8 font-mono text-pale-stone"
                              >
                                No data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    {/* Vocabulary Tab */}
                    <TabsContent
                      value="vocabulary"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px] font-mono text-ink">Word</TableHead>
                            <TableHead className="w-[100px] font-mono text-ink">Type</TableHead>
                            <TableHead className="font-mono text-ink">Meaning</TableHead>
                            <TableHead className="font-mono text-ink">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.vocabulary, [
                            "word",
                            "type",
                            "meaning",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink">
                                {row.word}
                              </TableCell>
                              <TableCell>
                                <span className="inline-block text-caption font-mono text-off-black bg-transparent border border-off-black px-2.5 py-0.5 rounded-full">
                                  {row.type}
                                </span>
                              </TableCell>
                              <TableCell className="font-mono text-off-black">{row.meaning}</TableCell>
                              <TableCell className="font-mono italic text-pale-stone">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.vocabulary, ["word"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="text-center py-8 font-mono text-pale-stone"
                              >
                                No data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    {/* Word Formation Tab */}
                    <TabsContent
                      value="wordFormation"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px] font-mono text-ink">Word</TableHead>
                            <TableHead className="w-[100px] font-mono text-ink">Type</TableHead>
                            <TableHead className="font-mono text-ink">Meaning</TableHead>
                            <TableHead className="font-mono text-ink">Forms / Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.wordFormation, [
                            "word",
                            "type",
                            "meaning",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink">
                                {row.word}
                              </TableCell>
                              <TableCell>
                                <span className="inline-block text-caption font-mono text-off-black bg-transparent border border-off-black px-2.5 py-0.5 rounded-full">
                                  {row.type}
                                </span>
                              </TableCell>
                              <TableCell className="font-mono text-off-black">{row.meaning}</TableCell>
                              <TableCell className="font-mono italic text-pale-stone">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.wordFormation, ["word"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="text-center py-8 font-mono text-pale-stone"
                              >
                                No data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    {/* Word Patterns Tab */}
                    <TabsContent
                      value="wordPatterns"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px] font-mono text-ink">
                              Verb / Noun
                            </TableHead>
                            <TableHead className="font-mono text-ink">Pattern</TableHead>
                            <TableHead className="font-mono text-ink">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.wordPatterns, [
                            "verb",
                            "pattern",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink">
                                {row.verb}
                              </TableCell>
                              <TableCell className="font-mono text-off-black">{row.pattern}</TableCell>
                              <TableCell className="font-mono italic text-pale-stone">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.wordPatterns, ["verb"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center py-8 font-mono text-pale-stone"
                              >
                                No data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    {/* Phrasal Verbs Tab */}
                    <TabsContent
                      value="phrasalVerbs"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px] font-mono text-ink">
                              Phrasal Verb
                            </TableHead>
                            <TableHead className="font-mono text-ink">Meaning</TableHead>
                            <TableHead className="font-mono text-ink">Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.phrasalVerbs, [
                            "phrasalVerb",
                            "meaning",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink">
                                {row.phrasalVerb}
                              </TableCell>
                              <TableCell className="font-mono text-off-black">{row.meaning}</TableCell>
                              <TableCell className="font-mono italic text-pale-stone">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.phrasalVerbs, ["phrasalVerb"])
                            .length === 0 && (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center py-8 font-mono text-pale-stone"
                              >
                                No data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    {/* Collocations Tab */}
                    <TabsContent
                      value="collocations"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px] font-mono text-ink">
                              Base Word
                            </TableHead>
                            <TableHead className="font-mono text-ink">Collocation</TableHead>
                            <TableHead className="font-mono text-ink">Meaning</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.collocations, [
                            "word",
                            "collocation",
                            "meaning",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink">
                                {row.word}
                              </TableCell>
                              <TableCell className="font-mono text-off-black font-medium">{row.collocation}</TableCell>
                              <TableCell className="font-mono text-pale-stone">{row.meaning}</TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.collocations, ["word"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center py-8 font-mono text-pale-stone"
                              >
                                No data found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
}

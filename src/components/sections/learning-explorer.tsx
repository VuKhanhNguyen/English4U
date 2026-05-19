"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

import b1Data from "@/data/destination-b1.json";
import b2Data from "@/data/destination-b2.json";
import c1c2Data from "@/data/destination-c1-c2.json";

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
}

export function LearningExplorerSection({
  bookLevel,
  hideHeader = false,
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
    <section className="py-16 md:py-24 bg-pale-ash">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          {!hideHeader && (
            <div>
              <h2 className="text-display-sm font-bold tracking-tight text-midnight-ink mb-4">
                Learning Explorer
              </h2>
              <p className="text-body text-[#737373] max-w-xl">
                Dive deep into the structured content. Expand a unit, select a
                category, and use the search to quickly find specific rules or
                vocabulary.
              </p>
            </div>
          )}

          <div className="w-full md:w-[300px] relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] w-[16px] h-[16px]" />
            <Input
              placeholder="Search grammar, vocabulary..."
              className="pl-9 bg-canvas-white"
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
          <div className="mb-8 p-6 bg-canvas-white border border-charcoal-border rounded-lg shadow-subtle flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
                {activeBook.book}
              </span>
              <h1 className="text-heading font-black text-midnight-ink mt-2">
                Structured Syllabus Explorer
              </h1>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-midnight-ink/50">
                Total Syllabus
              </p>
              <p className="text-heading font-black text-midnight-ink">
                {activeBook.units.length} Units
              </p>
            </div>
          </div>
        )}

        {/* Units Accordion */}
        <div className="bg-canvas-white border border-charcoal-border rounded-lg shadow-subtle p-2 md:p-6">
          <Accordion
            type="single"
            collapsible
            defaultValue={activeBook.units[0]?.id}
          >
            {activeBook.units.map((unit) => (
              <AccordionItem key={unit.id} value={unit.id}>
                <AccordionTrigger className="text-heading-sm">
                  {unit.title}
                </AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue="grammar" className="w-full mt-4">
                    <TabsList className="mb-6 flex-wrap h-auto p-1">
                      <TabsTrigger value="grammar">Grammar</TabsTrigger>
                      <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                      <TabsTrigger value="wordFormation">
                        Word Formation
                      </TabsTrigger>
                      <TabsTrigger value="wordPatterns">
                        Word Patterns
                      </TabsTrigger>
                      <TabsTrigger value="phrasalVerbs">
                        Phrasal Verbs
                      </TabsTrigger>
                      <TabsTrigger value="collocations">
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
                            <TableHead className="w-[200px]">
                              Structure
                            </TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.grammar, [
                            "structure",
                            "usage",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-bold">
                                {row.structure}
                              </TableCell>
                              <TableCell>{row.usage}</TableCell>
                              <TableCell className="italic text-[#444]">
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
                                className="text-center py-8 text-[#737373]"
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
                            <TableHead className="w-[150px]">Word</TableHead>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Meaning</TableHead>
                            <TableHead>Example</TableHead>
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
                              <TableCell className="font-bold">
                                {row.word}
                              </TableCell>
                              <TableCell>
                                <span className="text-xs bg-pale-ash px-2 py-1 rounded border border-charcoal-border">
                                  {row.type}
                                </span>
                              </TableCell>
                              <TableCell>{row.meaning}</TableCell>
                              <TableCell className="italic text-[#444]">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.vocabulary, ["word"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="text-center py-8 text-[#737373]"
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
                            <TableHead className="w-[150px]">Word</TableHead>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Meaning</TableHead>
                            <TableHead>Forms / Example</TableHead>
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
                              <TableCell className="font-bold">
                                {row.word}
                              </TableCell>
                              <TableCell>
                                <span className="text-xs bg-pale-ash px-2 py-1 rounded border border-charcoal-border">
                                  {row.type}
                                </span>
                              </TableCell>
                              <TableCell>{row.meaning}</TableCell>
                              <TableCell className="italic text-[#444]">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.wordFormation, ["word"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="text-center py-8 text-[#737373]"
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
                            <TableHead className="w-[150px]">
                              Verb / Noun
                            </TableHead>
                            <TableHead>Pattern</TableHead>
                            <TableHead>Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.wordPatterns, [
                            "verb",
                            "pattern",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-bold">
                                {row.verb}
                              </TableCell>
                              <TableCell>{row.pattern}</TableCell>
                              <TableCell className="italic text-[#444]">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.wordPatterns, ["verb"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center py-8 text-[#737373]"
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
                            <TableHead className="w-[200px]">
                              Phrasal Verb
                            </TableHead>
                            <TableHead>Meaning</TableHead>
                            <TableHead>Example</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.phrasalVerbs, [
                            "phrasalVerb",
                            "meaning",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-bold">
                                {row.phrasalVerb}
                              </TableCell>
                              <TableCell>{row.meaning}</TableCell>
                              <TableCell className="italic text-[#444]">
                                {row.example}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.phrasalVerbs, ["phrasalVerb"])
                            .length === 0 && (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center py-8 text-[#737373]"
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
                            <TableHead className="w-[150px]">
                              Base Word
                            </TableHead>
                            <TableHead>Collocation</TableHead>
                            <TableHead>Meaning</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.collocations, [
                            "word",
                            "collocation",
                            "meaning",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-bold">
                                {row.word}
                              </TableCell>
                              <TableCell>{row.collocation}</TableCell>
                              <TableCell>{row.meaning}</TableCell>
                            </TableRow>
                          ))}
                          {filterData(unit.collocations, ["word"]).length ===
                            0 && (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center py-8 text-[#737373]"
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
        </div>
      </div>
    </section>
  );
}

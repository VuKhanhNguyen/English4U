"use client";

import * as React from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Search, X, List, ChevronUp, ChevronDown, Menu, Home, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";
import { showToast } from "@/components/ui/toast";
import Link from "next/link";
import GradualBlur from "@/components/ui/gradual-blur";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
import b2Unit1 from "@/data/b2/unit1.json";
import b2Unit2 from "@/data/b2/unit2.json";
import b2Unit3 from "@/data/b2/unit3.json";
import b2Unit4 from "@/data/b2/unit4.json";
import b2Unit5 from "@/data/b2/unit5.json";
import b2Unit6 from "@/data/b2/unit6.json";
import b2Unit7 from "@/data/b2/unit7.json";
import b2Unit8 from "@/data/b2/unit8.json";
import b2Unit9 from "@/data/b2/unit9.json";
import b2Unit10 from "@/data/b2/unit10.json";
import b2Unit11 from "@/data/b2/unit11.json";
import b2Unit12 from "@/data/b2/unit12.json";
import b2Unit13 from "@/data/b2/unit13.json";
import b2Unit14 from "@/data/b2/unit14.json";
import b2Unit15 from "@/data/b2/unit15.json";
import b2Unit16 from "@/data/b2/unit16.json";
import b2Unit17 from "@/data/b2/unit17.json";
import b2Unit18 from "@/data/b2/unit18.json";
import b2Unit19 from "@/data/b2/unit19.json";
import b2Unit20 from "@/data/b2/unit20.json";

import b2Unit21 from "@/data/b2/unit21.json";
import b2Unit22 from "@/data/b2/unit22.json";
import b2Unit23 from "@/data/b2/unit23.json";
import b2Unit24 from "@/data/b2/unit24.json";
import b2Unit25 from "@/data/b2/unit25.json";
import b2Unit26 from "@/data/b2/unit26.json";
import b2Unit27 from "@/data/b2/unit27.json";
import b2Unit28 from "@/data/b2/unit28.json";

import c1c2Data from "@/data/destination-c1-c2.json";

const b1Data = {
  book: "Destination B1",
  units: [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10_11, unit12, unit13, unit14, unit15, unit16, unit17, unit18, unit19, unit20, unit21, unit22, unit23, unit24, unit25, unit26, unit27, unit28_29, unit30, unit31, unit32, unit33, unit34, unit35, unit36, unit37, unit38, unit39, unit40, unit41, unit42],
};

const b2Data = {
  book: "Destination B2",
  units: [b2Unit1, b2Unit2, b2Unit3, b2Unit4, b2Unit5, b2Unit6, b2Unit7, b2Unit8, b2Unit9, b2Unit10, b2Unit11, b2Unit12, b2Unit13, b2Unit14, b2Unit15, b2Unit16, b2Unit17, b2Unit18, b2Unit19, b2Unit20, b2Unit21, b2Unit22, b2Unit23, b2Unit24, b2Unit25, b2Unit26, b2Unit27, b2Unit28],
};

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

function injectFlags(text: string): React.ReactNode[] {
  if (!text) return [];
  const flagRegex = /\b(US|UK)\b/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = flagRegex.exec(text)) !== null) {
    const [fullMatch, country] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    if (country === "US") {
      parts.push(
        <span key={`flag-us-${matchIndex}`} className="inline-flex items-center gap-1 font-semibold text-amber-500">
          <img
            src="/us.svg"
            alt="US"
            className="inline-block h-3.5 w-5 object-cover rounded-sm align-middle border border-off-black/10"
          />
          <span>US</span>
        </span>
      );
    } else if (country === "UK") {
      parts.push(
        <span key={`flag-uk-${matchIndex}`} className="inline-flex items-center gap-1 font-semibold text-indigo-500">
          <img
            src="/english.png"
            alt="UK"
            className="inline-block h-3.5 w-5 object-cover rounded-sm align-middle border border-off-black/10"
          />
          <span>UK</span>
        </span>
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function parseBoldAndItalic(text: string, baseKey: string): React.ReactNode[] {
  if (!text) return [];
  const regex = /\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, boldText] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(...injectFlags(text.substring(lastIndex, matchIndex)));
    }

    parts.push(
      <strong key={`${baseKey}-bold-${matchIndex}`} className="font-bold italic text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1 py-0.5 rounded border border-teal-500/20">
        {boldText}
      </strong>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(...injectFlags(text.substring(lastIndex)));
  }

  return parts.length > 0 ? parts : [text];
}

function renderSingleLineText(text: string, lineKey: string) {
  if (!text) return null;

  // Custom parser for Ex: prefixes with examples and notes
  const exMatch = text.match(/^((?:(?:US|UK):\s*)?Ex\d*:\s*)(.*?)(?:\s*(\((?:Note|note):.*?\)))?$/i);
  if (exMatch) {
    const prefix = exMatch[1];
    const exampleText = exMatch[2];
    const noteText = exMatch[3];

    return (
      <span key={lineKey} className="inline-flex flex-wrap items-center gap-1.5 py-0.5">
        <span className="text-pale-stone font-mono text-xs not-italic">{injectFlags(prefix)}</span>
        <span className="font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20 not-italic">
          {parseBoldAndItalic(exampleText, `${lineKey}-ex`)}
        </span>
        {noteText && (
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 not-italic">
            {noteText}
          </span>
        )}
      </span>
    );
  }

  // Regex to match markdown links: [link text](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, linkText, url] = match;
    const matchIndex = match.index;

    // Add text before the match
    if (matchIndex > lastIndex) {
      const textBefore = text.substring(lastIndex, matchIndex);
      parts.push(...parseBoldAndItalic(textBefore, `${lineKey}-before-${matchIndex}`));
    }

    // Add the link element
    parts.push(
      <a
        key={`${lineKey}-${url}-${matchIndex}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 font-bold"
      >
        {linkText}
      </a>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const textRemaining = text.substring(lastIndex);
    parts.push(...parseBoldAndItalic(textRemaining, `${lineKey}-after-${lastIndex}`));
  }

  if (parts.length === 0) {
    const boldParsed = parseBoldAndItalic(text, `${lineKey}-only`);
    if (boldParsed.length === 1 && typeof boldParsed[0] === "string") {
      return boldParsed[0];
    }
    return boldParsed.map((part, idx) => {
      if (typeof part === "string") {
        return <span key={`${lineKey}-text-${idx}`}>{part}</span>;
      }
      return part;
    });
  }

  return parts.map((part, idx) => {
    if (typeof part === "string") {
      return <span key={`${lineKey}-text-${idx}`}>{part}</span>;
    }
    return part;
  });
}

function renderTextWithLinks(text: string) {
  if (!text) return null;

  const lines = text.split("\n");
  const renderedLines = lines.map((line, lineIdx) => {
    const hasTick = line.includes("✓");
    const hasCross = line.includes("✗");
    const hasEx = /^\s*(EX\d*|EX)\s*:/i.test(line) || line.includes("→") || line.trim().startsWith("→");
    const hasNote = line.includes("*");

    let lineClass = "";
    if (hasTick && !hasCross && !hasEx) {
      lineClass = "text-emerald-600 dark:text-emerald-400 font-medium";
    } else if (hasCross && !hasTick && !hasEx) {
      lineClass = "text-rose-600 dark:text-rose-400 font-medium";
    } else if (hasEx) {
      lineClass = "text-pale-stone italic";
    } else if (hasNote) {
      lineClass = "text-amber-600 dark:text-amber-400 font-medium";
    }

    const parsedLine = renderSingleLineText(line, `line-${lineIdx}`);

    return (
      <span key={lineIdx} className={lineClass || undefined}>
        {parsedLine}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });

  return <>{renderedLines}</>;
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

function RichGrammarRenderer({ richGrammar }: { richGrammar: any[] }) {
  const { translate } = useLanguage();
  
  return (
    <div className="space-y-10">
      {(richGrammar || []).map((section: any, sIdx: number) => (
        <div
          key={sIdx}
          className="border border-off-black/20 rounded-md p-4 sm:p-6 md:p-8 bg-paper-canvas shadow-subtle relative overflow-hidden"
        >
          {/* Subtle design element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-atmosphere-wash/10 rounded-full blur-xl pointer-events-none" />
          
          <h3 className="text-subheading font-heading font-bold text-ink mb-6 pb-2 border-b border-off-black/10 flex items-center justify-between">
            {translate(section.title)}
          </h3>
          <div className="space-y-8">
            {(section.blocks || []).map((block: any, bIdx: number) => {
              if (block.type === "title") {
                return (
                  <h4
                    key={bIdx}
                    className="text-body font-bold text-ink font-mono mt-6 mb-3 border-l-4 border-off-black pl-3"
                  >
                    {translate(block.content)}
                  </h4>
                );
              }
              if (block.type === "table") {
                // Group rows by "type" for the mobile view
                const mobileGroups: { type: string; items: any[] }[] = [];
                let currentGroup: { type: string; items: any[] } | null = null;
                (block.rows || []).forEach((row: any) => {
                  if (row.type) {
                    currentGroup = { type: row.type, items: [] };
                    mobileGroups.push(currentGroup);
                  }
                  if (currentGroup) {
                    currentGroup.items.push(row);
                  }
                });

                return (
                  <div key={bIdx} className="space-y-4">
                    {block.tableName && (
                      <h5 className="text-body-sm font-bold text-whisper-gray font-mono">
                        {translate(block.tableName)}
                      </h5>
                    )}
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto border border-off-black rounded-lg bg-paper-canvas">
                      <table className="w-full text-sm border-collapse text-left min-w-[500px]">
                        <thead>
                          <tr className="bg-atmosphere-wash border-b border-off-black font-mono text-ink">
                            {(block.headers || []).map((h: string, hIdx: number) => (
                              <th
                                key={hIdx}
                                className="p-3 border-r border-off-black last:border-r-0 font-bold whitespace-nowrap"
                              >
                                {translate(h)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(block.rows || []).map((row: any, rIdx: number) => (
                            <tr
                              key={rIdx}
                              className="border-b border-off-black last:border-b-0 font-mono hover:bg-atmosphere-wash/15 dark:hover:bg-white/5 transition-all duration-200 cursor-default"
                            >
                              {row.type && (
                                <td
                                  className="p-3 border-r border-off-black font-bold bg-atmosphere-wash/20 align-middle text-ink"
                                  rowSpan={row.rowspan}
                                >
                                  {translate(row.type)}
                                </td>
                              )}
                              {row.subject && (
                                <td className="p-3 border-r border-off-black text-ink whitespace-pre-line align-middle">
                                  {row.subject}
                                </td>
                              )}
                              {row.form !== undefined && (
                                <td className="p-3 border-r border-off-black text-ink font-semibold whitespace-pre-line align-middle">
                                  {row.form}
                                </td>
                              )}
                              {row.example && (
                                <td className="p-3 text-pale-stone whitespace-pre-line italic align-middle">
                                  {row.example}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block md:hidden space-y-4">
                      {mobileGroups.map((group, gIdx) => (
                        <div
                          key={gIdx}
                          className="border border-off-black/15 dark:border-white/10 rounded-xl overflow-hidden bg-paper-canvas/30"
                        >
                          <div className="bg-atmosphere-wash/40 dark:bg-atmosphere-wash/10 px-4 py-2.5 border-b border-off-black/15 dark:border-white/10">
                            <span className="font-bold text-ink text-xs font-mono">
                              {translate(group.type)}
                            </span>
                          </div>
                          <div className="p-3 sm:p-4 space-y-3 divide-y divide-off-black/5 dark:divide-white/5 font-mono">
                            {group.items.map((item, iIdx) => (
                              <div key={iIdx} className={cn("space-y-1.5", iIdx > 0 && "pt-3")}>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-500/10 border border-zinc-500/20 px-2 py-0.5 rounded">
                                    {item.subject}
                                  </span>
                                  {item.form !== undefined && (
                                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs border border-sky-500/20 font-bold">
                                      {item.form}
                                    </span>
                                  )}
                                </div>
                                {item.example && (
                                  <p className="text-xs text-pale-stone italic leading-relaxed pl-1">
                                    {item.example}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              if (block.type === "generic-table") {
                return (
                  <div key={bIdx} className="space-y-4">
                    {block.tableName && (
                      <h5 className="text-body-sm font-bold text-whisper-gray font-mono">
                        {translate(block.tableName)}
                      </h5>
                    )}
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto border border-off-black rounded-lg bg-paper-canvas">
                      <table className="w-full text-sm border-collapse text-left min-w-[600px]">
                        <thead>
                          <tr className="bg-atmosphere-wash border-b border-off-black font-mono text-ink">
                            {(block.headers || []).map((h: string, hIdx: number) => (
                              <th
                                key={hIdx}
                                className="p-3 border-r border-off-black last:border-r-0 font-bold whitespace-nowrap"
                              >
                                {translate(h)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(block.rows || []).map((row: string[], rIdx: number) => (
                            <tr
                              key={rIdx}
                              className="border-b border-off-black last:border-b-0 font-mono hover:bg-atmosphere-wash/15 dark:hover:bg-white/5 transition-all duration-200 cursor-default"
                            >
                              {(row || []).map((cell: string, cIdx: number) => {
                                 const header = block.headers?.[cIdx];
                                 const skipTranslation = 
                                   header === "Stative Verb" || 
                                   header === "Active Example" || 
                                   header === "Passive Form & Example" || 
                                   header === "Active Verb" || 
                                   header === "Passive Participle" ||
                                   header === "Verb" ||
                                   header === "Sentence & Question tag" ||
                                   header === "Formula & Example" ||
                                   header === "Example" ||
                                   header === "Example Indirect Question" ||
                                   header === "Introductory Polite Phrase";
                                 return (
                                   <td
                                     key={cIdx}
                                     className="p-3 border-r border-off-black last:border-r-0 text-ink whitespace-pre-line align-top"
                                   >
                                     {renderTextWithLinks(skipTranslation ? cell : translate(cell))}
                                   </td>
                                 );
                               })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Stacked Card View */}
                    <div className="block md:hidden space-y-4">
                      {(block.rows || []).map((row: string[], rIdx: number) => (
                        <div
                          key={rIdx}
                          className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-xl bg-paper-canvas/30 space-y-3 font-mono text-xs"
                        >
                          {(row || []).map((cell: string, cIdx: number) => {
                            const header = block.headers?.[cIdx];
                            const skipTranslation = 
                              header === "Stative Verb" || 
                              header === "Active Example" || 
                              header === "Passive Form & Example" || 
                              header === "Active Verb" || 
                              header === "Passive Participle" ||
                              header === "Verb" ||
                              header === "Sentence & Question tag" ||
                              header === "Formula & Example" ||
                              header === "Example" ||
                              header === "Example Indirect Question" ||
                              header === "Introductory Polite Phrase";
                            
                            return (
                              <div key={cIdx} className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-pale-stone/75 uppercase tracking-wider">
                                  {translate(header)}
                                </span>
                                <div className="text-ink leading-relaxed">
                                  {renderTextWithLinks(skipTranslation ? cell : translate(cell))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              if (block.type === "list") {
                return (
                  <div key={bIdx} className="font-mono text-sm text-ink space-y-4">
                    {block.intro && (
                      <p className="text-body-sm leading-relaxed whitespace-pre-line text-off-black">
                        {renderTextWithLinks(translate(block.intro))}
                      </p>
                    )}
                    {block.items ? (
                      <div className="space-y-4">
                        {(block.items || []).map((item: any, iIdx: number) => (
                          <div key={iIdx} className="space-y-2 border border-off-black/10 rounded-lg p-3 sm:p-4 bg-paper-canvas/50">
                            <p className="font-bold text-ink flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#ffa773]" />
                              {translate(item.label)}
                            </p>
                            <ul className="list-none pl-4 space-y-2 text-off-black">
                              {(item.bullets || []).map((b: string, bulIdx: number) => (
                                <li key={bulIdx} className="flex gap-2 items-start whitespace-pre-line text-body-sm">
                                  <span className="text-off-black font-bold">✓</span>
                                  <span>{renderTextWithLinks(translate(b))}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="list-none pl-2 space-y-2.5">
                        {(block.bullets || []).map((b: string, bulIdx: number) => (
                          <li key={bulIdx} className="flex gap-2 items-start whitespace-pre-line text-body-sm text-off-black leading-relaxed">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{renderTextWithLinks(translate(b))}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }
              if (block.type === "pronunciation") {
                return (
                  <div key={bIdx} className="font-mono text-sm text-ink space-y-4">
                    {block.table && (
                      <>
                        {/* Desktop View */}
                        <div className="hidden md:block overflow-x-auto border border-off-black rounded-lg">
                          <table className="w-full text-sm border-collapse text-left min-w-[450px]">
                            <thead>
                              <tr className="bg-atmosphere-wash border-b border-off-black font-mono text-ink">
                                <th className="p-3 border-r border-off-black font-bold w-[100px]">
                                  {translate("Pronunciation")}
                                </th>
                                <th className="p-3 font-bold">
                                  {translate("Pronunciation rules")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {(block.table || []).map((row: any, rIdx: number) => (
                                <tr key={rIdx} className="border-b border-off-black last:border-b-0 hover:bg-atmosphere-wash/15 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                  <td className="p-3 border-r border-off-black font-bold text-sky-600 dark:text-sky-400 bg-sky-500/5 align-middle text-center">{row[0]}</td>
                                  <td className="p-3 whitespace-pre-line text-off-black align-middle">
                                    {renderTextWithLinks(translate(row[1]))}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile View */}
                        <div className="block md:hidden space-y-3">
                          {(block.table || []).map((row: any, rIdx: number) => (
                            <div key={rIdx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-xl bg-paper-canvas/30 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs border border-sky-500/20 font-bold font-mono">
                                  {row[0]}
                                </span>
                                <span className="text-[10px] font-bold text-pale-stone/75 uppercase tracking-wider">
                                  {translate("Pronunciation")}
                                </span>
                              </div>
                              <p className="text-xs text-off-black leading-relaxed font-mono">
                                {renderTextWithLinks(translate(row[1]))}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
 
                    {block.blackboard && (
                      <div className="bg-[#1b261a] text-[#f4eedb] border-[6px] border-[#3e2e1d] rounded-lg p-6 shadow-md relative overflow-hidden font-sans">
                        {/* Chalk dust effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[12px_12px] pointer-events-none" />
                        <h5 className="font-heading font-bold text-center text-[#fffbdf] text-base mb-4 underline decoration-sunset-violet-gradient decoration-wavy underline-offset-4">
                          {translate(block.blackboard.title)}
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                          {(block.blackboard.items || []).map((item: string, itIdx: number) => {
                            const [word, phonetic] = item.split(": ");
                            return (
                              <div key={itIdx} className="p-2 border border-[#f4eedb]/20 bg-[#253224] rounded flex flex-col justify-center min-h-[64px]">
                                <span className="font-bold text-[#fffbdf] text-sm">{word}</span>
                                <span className="text-[#a5d29a] text-xs mt-1 font-semibold">{phonetic}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
 
                    {block.note && (
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg text-ink italic text-body-sm flex gap-3 items-center">
                        <span className="text-xl">💡</span>
                        <span>{renderTextWithLinks(translate(block.note))}</span>
                      </div>
                    )}
                  </div>
                );
              }
              if (block.type === "stative-verbs") {
                return (
                  <div key={bIdx} className="font-mono text-sm text-ink space-y-4">
                    <p className="whitespace-pre-line leading-relaxed text-off-black text-body-sm">
                      {renderTextWithLinks(translate(block.description))}
                    </p>
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto border border-off-black rounded-lg bg-paper-canvas">
                      <table className="w-full text-sm border-collapse text-left min-w-[550px]">
                        <thead>
                          <tr className="bg-atmosphere-wash border-b border-off-black font-mono text-ink">
                            <th className="p-3 border-r border-off-black font-bold">
                              {translate("Stative Verb")}
                            </th>
                            <th className="p-3 border-r border-off-black font-bold">
                              {translate("Meaning")}
                            </th>
                            <th className="p-3 border-r border-off-black font-bold">
                              {translate("Stative Verb")}
                            </th>
                            <th className="p-3 font-bold">
                              {translate("Meaning")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(block.table || []).map((row: any, rIdx: number) => (
                            <tr key={rIdx} className="border-b border-off-black last:border-b-0 hover:bg-atmosphere-wash/15 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                              <td className="p-3 border-r border-off-black font-bold text-ink align-middle">{row[0]}</td>
                              <td className="p-3 border-r border-off-black text-pale-stone align-middle">{translate(row[1])}</td>
                              <td className="p-3 border-r border-off-black font-bold text-ink align-middle">{row[2]}</td>
                              <td className="p-3 text-pale-stone align-middle">{translate(row[3])}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Grid/List View */}
                    <div className="block md:hidden grid grid-cols-1 gap-2.5">
                      {(block.table || []).map((row: any, rIdx: number) => (
                        <React.Fragment key={rIdx}>
                          {row[0] && (
                            <div className="p-3 border border-off-black/10 dark:border-white/10 rounded-xl bg-paper-canvas/30 flex justify-between items-center gap-4 text-xs">
                              <span className="font-bold text-ink">{row[0]}</span>
                              <span className="text-pale-stone text-right">{translate(row[1])}</span>
                            </div>
                          )}
                          {row[2] && (
                            <div className="p-3 border border-off-black/10 dark:border-white/10 rounded-xl bg-paper-canvas/30 flex justify-between items-center gap-4 text-xs">
                              <span className="font-bold text-ink">{row[2]}</span>
                              <span className="text-pale-stone text-right">{translate(row[3])}</span>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {block.note && (
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg text-ink font-semibold text-body-sm flex gap-3 items-center">
                        <span className="text-xl">⚠️</span>
                        <span>{renderTextWithLinks(translate(block.note))}</span>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

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
  const { translate } = useLanguage();
  const levelMap = {
    b1: 0,
    b2: 1,
    "c1-c2": 2,
  };

  const initialIndex = bookLevel ? levelMap[bookLevel] : 0;
  const [selectedBookIndex, setSelectedBookIndex] =
    React.useState(initialIndex);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [scrollActiveButton, setScrollActiveButton] = React.useState<"up" | "down" | null>(null);

  const controls = useAnimation();
  const isDraggingRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollTop = window.scrollY;
    let lastTime = Date.now();
    let hideTimeout: NodeJS.Timeout;
    let currentDir: "up" | "down" | null = null;
    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;

        const currentScrollTop = window.scrollY;
        const currentTime = Date.now();
        const timeDiff = currentTime - lastTime;

        if (timeDiff > 0) {
          const distDiff = Math.abs(currentScrollTop - lastScrollTop);
          const speed = distDiff / timeDiff; // px per ms

          // If scroll speed exceeds threshold (e.g. 0.8px/ms)
          if (speed > 0.8) {
            const direction = currentScrollTop < lastScrollTop ? "up" : "down";
            
            if (currentDir !== direction) {
              currentDir = direction;
              setScrollActiveButton(direction);
            }

            // Clear previous timeout and set a new one to hide after 2.5 seconds
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
              currentDir = null;
              setScrollActiveButton(null);
            }, 2500);
          }
        }

        lastScrollTop = currentScrollTop;
        lastTime = currentTime;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimeout);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  React.useEffect(() => {
    if (bookLevel) {
      setSelectedBookIndex(levelMap[bookLevel]);
      if (bookLevel === "c1-c2") {
        showToast({
          title: "Under Development",
          message: "Destination C1 & C2 is currently under development. Stay tuned!",
          variant: "warning",
          position: "top-right",
        });
      }
    }
  }, [bookLevel]);

  const activeBook = books[selectedBookIndex];

  const [expandedUnitId, setExpandedUnitId] = React.useState<string | undefined>(undefined);
  const [activeUnitId, setActiveUnitId] = React.useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    if (activeBook?.units?.[0]?.id) {
      setExpandedUnitId(activeBook.units[0].id);
      setActiveUnitId(activeBook.units[0].id);
    } else {
      setExpandedUnitId(undefined);
      setActiveUnitId(null);
    }
  }, [selectedBookIndex, activeBook]);

  // Scrollspy effect using IntersectionObserver
  React.useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (!activeBook?.units) return;

    // Avoid unnecessary scrollspy calculations and re-renders on mobile when index drawer is closed
    const isMobile = window.innerWidth <= 768;
    if (isMobile && !isMobileDrawerOpen) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (visibleEntry) {
        const unitId = visibleEntry.target.id.replace("scroll-unit-", "");
        setActiveUnitId(unitId);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    activeBook.units.forEach((unit: any) => {
      const el = document.getElementById(`scroll-unit-${unit.id}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeBook, selectedBookIndex, isMobileDrawerOpen]);

  const sidebarScrollContainerRef = React.useRef<HTMLDivElement>(null);
  const mobileScrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll desktop sidebar container to active unit item
  React.useEffect(() => {
    if (!activeUnitId || !sidebarScrollContainerRef.current) return;

    const container = sidebarScrollContainerRef.current;
    const activeElement = container.querySelector(
      `[data-unit-id="${activeUnitId}"]`
    ) as HTMLElement;

    if (activeElement) {
      const containerHeight = container.clientHeight;
      const elemTop = activeElement.offsetTop;
      const elemHeight = activeElement.clientHeight;

      container.scrollTo({
        top: elemTop - containerHeight / 2 + elemHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeUnitId]);

  // Auto-scroll mobile drawer to active item when opened
  React.useEffect(() => {
    if (!isMobileDrawerOpen || !activeUnitId) return;

    const timer = setTimeout(() => {
      if (!mobileScrollContainerRef.current) return;
      const container = mobileScrollContainerRef.current;
      const activeElement = container.querySelector(
        `[data-unit-id="${activeUnitId}"]`
      ) as HTMLElement;

      if (activeElement) {
        const containerHeight = container.clientHeight;
        const elemTop = activeElement.offsetTop;
        const elemHeight = activeElement.clientHeight;

        container.scrollTo({
          top: elemTop - containerHeight / 2 + elemHeight / 2,
          behavior: "instant" as ScrollBehavior,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobileDrawerOpen, activeUnitId]);

  const handleUnitClick = (unitId: string) => {
    setExpandedUnitId(unitId);
    setActiveUnitId(unitId);
    setIsMobileDrawerOpen(false);

    // Smooth scroll with native scrollIntoView
    setTimeout(() => {
      const element = document.getElementById(`scroll-unit-${unitId}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const splitTitle = (title: string) => {
    if (!title) return { prefix: "", main: "" };
    const colonIndex = title.indexOf(":");
    if (colonIndex === -1) return { prefix: "", main: title };
    return {
      prefix: title.substring(0, colonIndex).trim(),
      main: title.substring(colonIndex + 1).trim(),
    };
  };

  const totalUnitsCount = React.useMemo(() => {
    if (!activeBook || !activeBook.units) return 0;
    return activeBook.units.reduce((acc: number, unit: any) => {
      if (!unit.id) return acc + 1;
      const match = unit.id.match(/unit-(\d+)[-_](\d+)/) || unit.id.match(/unit-(\d+)-(\d+)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = parseInt(match[2], 10);
        return acc + (end - start + 1);
      }
      return acc + 1;
    }, 0);
  }, [activeBook]);

  // A basic filtering function for the tables based on the search query
  const filterData = (data: any[] | undefined, keysToSearch: string[]) => {
    const safeData = data || [];
    if (!searchQuery) return safeData;
    const query = searchQuery.toLowerCase();
    return safeData.filter((item) =>
      keysToSearch.some((key) => item[key]?.toLowerCase().includes(query)),
    );
  };

  return (
    <section className={cn("py-16 md:py-24 bg-transparent border-t border-off-black/15 dark:border-white/10 relative overflow-x-clip z-0", className)}>

      <div className="container mx-auto px-4 sm:px-6 max-w-[1432px] relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-end gap-4 ${hideHeader ? 'mb-4' : 'mb-12'}`}>
          {!hideHeader && (
            <div>
                 <h2 className="text-heading-lg font-heading text-gradient-heading mb-4 pb-1">
                {translate("Learning Explorer")}
              </h2>
              <br />
              <p className="text-body font-mono max-w-xl bg-gradient-to-r from-pale-stone via-pale-stone/90 to-pale-stone/85 dark:from-[#eae6df] dark:via-[#eae6df]/90 dark:to-[#8c94a6] bg-clip-text text-transparent inline-block">
                {translate("Dive deep into the structured content. Expand a unit, select a category, use the search to quickly find specific rules or vocabulary.")}
              </p>
            </div>
          )}

              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
                className="w-max ml-5 mt-5"
              >
                <Breadcrumb className="px-4 py-2 rounded-full bg-paper-canvas/50 dark:bg-zinc-950/30 backdrop-blur-md border border-off-black/10 dark:border-white/10 shadow-sm text-xs select-none font-mono">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" asChild>
                        <Link href="/" className="group inline-flex items-center gap-1.5 hover:text-ink transition-all duration-200 hover:bg-atmosphere-wash/50 dark:hover:bg-white/10 px-2.5 py-0.5 rounded-full -mx-1">
                          <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                          {translate("Home")}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-pale-stone font-medium inline-flex items-center gap-1.5 px-2.5 py-0.5">
                        <BookOpen className="w-3.5 h-3.5 text-pale-stone" />
                        {activeBook.book}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>

          {/* <div className="w-full md:w-[280px] relative ml-auto z-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pale-stone w-[16px] h-[16px]" />
            <Input
              placeholder={translate("Search grammar, vocabulary...")}
              className="pl-9 bg-paper-canvas/70 backdrop-blur-md border-off-black rounded-full text-ink placeholder:text-pale-stone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}
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
              <span className="px-3 py-1 mr-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-bold uppercase tracking-wider">
                {activeBook.book}
              </span>
              <br/>
              <h1 className="text-heading font-heading text-gradient-heading mt-3 mb-0">
                {translate("Structured Syllabus Explorer")}
              </h1>
             
            </div>
            <div className="text-right hidden sm:block font-mono shrink-0 ml-6">
              <p className="text-caption text-pale-stone uppercase tracking-wider mb-1">
                {translate("Total Syllabus")}
              </p>
              <p className="text-heading-lg font-bold text-ink leading-none">
                {totalUnitsCount} {translate("Units")}
              </p>
            </div>
          </Card>
        )}

        {/* Units Accordion Layout (with Left Sidebar on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
          {/* Desktop Left Sidebar */}
          <aside data-lenis-prevent className="hidden md:flex rounded-[24px] md:col-span-4 lg:col-span-3 sticky top-[110px] h-[calc(100vh-150px)] flex-col bg-paper-canvas/30 backdrop-blur-lg dark:bg-zinc-900/20 p-5 border-2 border-off-black/15 shadow-3d-card select-none overflow-hidden overscroll-y-auto">
            <div className="mb-4 shrink-0 pb-3 border-b border-off-black/5 dark:border-white/5">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-pale-stone mb-1">
                {translate("Units Index")}
              </h3>
              <p className="text-[11px] font-mono text-pale-stone/70">
                {activeBook.book}
              </p>
            </div>
            <div ref={sidebarScrollContainerRef} className="flex-1 overflow-y-auto relative pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-off-black/10 dark:scrollbar-thumb-white/10">
              {activeBook?.units?.map((unit: any) => {
                const { prefix, main } = splitTitle(unit.title);
                const isActive = activeUnitId === unit.id || expandedUnitId === unit.id;
                return (
                  <motion.button
                    key={unit.id}
                    data-unit-id={unit.id}
                    onClick={() => handleUnitClick(unit.id)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-[24px] transition-all duration-200 font-mono text-xs border-2 flex flex-col gap-1 items-start cursor-pointer outline-none relative overflow-hidden",
                      isActive
                        ? "bg-atmosphere-wash/50 dark:bg-atmosphere-wash/20 border-off-black text-ink font-bold shadow-[2px_2px_6px_0px_var(--shadow-3d-color)] translate-x-[1px] translate-y-[1px]"
                        : "bg-paper-canvas/20 border-transparent text-pale-stone hover:bg-atmosphere-wash/30 dark:hover:bg-atmosphere-wash/10 hover:text-ink hover:border-off-black/20 hover:shadow-[1px_1px_3px_0px_var(--shadow-3d-color)]"
                    )}
                  >
                    {/* Active left indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-ink dark:bg-white"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {prefix && (
                      <span className={cn(
                        "text-[10px] uppercase font-bold tracking-wider",
                        isActive ? "text-ink" : "text-pale-stone/70"
                      )}>
                        {prefix}
                      </span>
                    )}
                    <span className="line-clamp-2 text-left leading-normal">{main}</span>
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* Main Content Accordion Card */}
          <div className="md:col-span-8 lg:col-span-9 min-w-0 w-full">
            <Card variant="content" className="p-3 sm:p-6 md:p-8">
              <Accordion
                type="single"
                collapsible
                value={expandedUnitId}
                onValueChange={setExpandedUnitId}
                className="w-full"
              >
                {(activeBook?.units || []).map((unit: any) => (
                  <AccordionItem
                    key={unit.id}
                    value={unit.id}
                    id={`scroll-unit-${unit.id}`}
                    className="border-b border-pale-stone scroll-mt-[110px] mx-1 sm:mx-6"
                  >
                <AccordionTrigger className="text-subheading font-mono font-medium hover:no-underline py-5 px-2 sm:px-4 text-left text-ink hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
                  {unit.title}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <Tabs
                    defaultValue={
                      unit.richGrammar || (unit.grammar && unit.grammar.length > 0)
                        ? "grammar"
                        : "vocabulary"
                    }
                    className="w-full mt-4"
                  >
                    <TabsList className="mb-6 flex-wrap h-auto p-1 rounded-lg">
                      {(unit.richGrammar || (unit.grammar && unit.grammar.length > 0)) && (
                        <TabsTrigger value="grammar" className="rounded-md">{translate("Grammar")}</TabsTrigger>
                      )}
                      {unit.vocabulary && unit.vocabulary.length > 0 && (
                        <TabsTrigger value="vocabulary" className="rounded-md">{translate("Vocabulary")}</TabsTrigger>
                      )}
                      {unit.wordFormation && unit.wordFormation.length > 0 && (
                        <TabsTrigger value="wordFormation" className="rounded-md">
                          {translate("Word Formation")}
                        </TabsTrigger>
                      )}
                      {unit.wordPatterns && unit.wordPatterns.length > 0 && (
                        <TabsTrigger value="wordPatterns" className="rounded-full">
                          {translate("Word Patterns")}
                        </TabsTrigger>
                      )}
                      {unit.phrasalVerbs && unit.phrasalVerbs.length > 0 && (
                        <TabsTrigger value="phrasalVerbs" className="rounded-full">
                          {translate("Phrasal Verbs")}
                        </TabsTrigger>
                      )}
                      {unit.prepositionalPhrases && unit.prepositionalPhrases.length > 0 && (
                        <TabsTrigger value="prepositionalPhrases" className="rounded-full">
                          {translate("Prepositional Phrases")}
                        </TabsTrigger>
                      )}
                      {unit.collocations && unit.collocations.length > 0 && (
                        <TabsTrigger value="collocations" className="rounded-full">
                          {translate("Collocations")}
                        </TabsTrigger>
                      )}
                    </TabsList>

                    {/* Grammar Tab */}
                    <TabsContent
                      value="grammar"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      {unit.richGrammar && !searchQuery ? (
                        <RichGrammarRenderer richGrammar={unit.richGrammar} />
                      ) : (
                        <>
                          {/* Desktop Table View */}
                          <div className="hidden md:block">
                            <Table>
                              <TableHeader className="bg-sky-500/10 border-b border-sky-500/20">
                                <TableRow className="hover:bg-transparent">
                                  <TableHead className="w-[200px] font-mono text-sky-700 dark:text-sky-300 font-bold">
                                    {translate("Structure")}
                                  </TableHead>
                                  <TableHead className="font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Usage")}</TableHead>
                                  <TableHead className="font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Example")}</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filterData(unit.grammar, [
                                  "structure",
                                  "usage",
                                  "example",
                                ]).map((row, idx) => (
                                  <TableRow key={idx} className="hover:bg-atmosphere-wash/10 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                    <TableCell className="font-mono">
                                      <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs border border-sky-500/20 font-medium">
                                        {row.structure}
                                      </span>
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
                                      {translate("No data found.")}
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>

                          {/* Mobile Card View */}
                          <div className="block md:hidden space-y-4">
                            {filterData(unit.grammar, ["structure", "usage", "example"]).map((row, idx) => (
                              <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-2xl bg-paper-canvas/30 space-y-3 font-mono text-xs">
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-off-black/5 dark:border-white/5 pb-2">
                                  <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs border border-sky-500/20 font-bold">
                                    {row.structure}
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Usage")}:</span> {row.usage}</p>
                                  <p className="italic text-pale-stone leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> "{row.example}"</p>
                                </div>
                              </div>
                            ))}
                            {filterData(unit.grammar, ["structure", "usage", "example"]).length === 0 && (
                              <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                                {translate("No data found.")}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </TabsContent>

                    {/* Vocabulary Tab */}
                    <TabsContent
                      value="vocabulary"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      {/* Desktop Table View */}
                      <div className="hidden md:block">
                        <Table>
                          <TableHeader className="bg-emerald-500/10 border-b border-emerald-500/20">
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="w-[150px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Word")}</TableHead>
                              <TableHead className="w-[100px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Type")}</TableHead>
                              <TableHead className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Meaning")}</TableHead>
                              <TableHead className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">{translate("Example")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterData(unit.vocabulary, [
                              "word",
                              "type",
                              "meaning",
                              "example",
                            ]).map((row, idx) => (
                              <TableRow key={idx} className="hover:bg-atmosphere-wash/10 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                <TableCell className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                                  {row.word}
                                </TableCell>
                                <TableCell>
                                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wide border border-emerald-200/50 dark:border-emerald-800/50">
                                    {row.type}
                                  </span>
                                </TableCell>
                                <TableCell className="font-mono text-off-black">{translate(row.meaning)}</TableCell>
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
                                  {translate("No data found.")}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="block md:hidden space-y-4">
                        {filterData(unit.vocabulary, ["word", "type", "meaning", "example"]).map((row, idx) => (
                          <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-2xl bg-paper-canvas/30 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.word}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-medium">
                                {row.type}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning)}</p>
                              <p className="italic text-pale-stone leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> "{row.example}"</p>
                            </div>
                          </div>
                        ))}
                        {filterData(unit.vocabulary, ["word"]).length === 0 && (
                          <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                            {translate("No data found.")}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Word Formation Tab */}
                    <TabsContent
                      value="wordFormation"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      {/* Desktop Table View */}
                      <div className="hidden md:block">
                        <Table>
                          <TableHeader className="bg-teal-500/10 border-b border-teal-500/20">
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="w-[150px] font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Word")}</TableHead>
                              <TableHead className="w-[100px] font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Type")}</TableHead>
                              <TableHead className="font-mono text-teal-700 dark:text-teal-300 font-bold">{translate("Word Family & Meanings")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterData(unit.wordFormation, [
                              "word",
                              "type",
                              "meaning",
                              "example",
                            ]).map((row, idx) => {
                              const parsedFamily = parseWordFormationMeaning(row.meaning);
                              return (
                                <TableRow key={idx} className="align-top hover:bg-atmosphere-wash/10 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                  <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 pt-4">
                                    {row.word}
                                  </TableCell>
                                  <TableCell className="pt-4">
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-medium">
                                      {abbreviateType(row.type)}
                                    </span>
                                  </TableCell>
                                  <TableCell className="p-2">
                                    <div className="divide-y divide-off-black/5 font-mono">
                                      {parsedFamily.map((fam, fIdx) => {
                                        const formsStr = fam.forms.join(" / ");
                                        return (
                                          <div key={fIdx} className="py-2.5 px-2 flex flex-col md:flex-row gap-2 md:gap-6 justify-between items-start">
                                            <div className="md:w-[200px] shrink-0">
                                              <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs border border-teal-500/20 font-mono font-semibold">
                                                {formsStr}
                                              </span>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                              <p className="text-off-black text-sm leading-relaxed">{getWordFormationMeaning(row.meaning, fam.meaning, fIdx, translate)}</p>
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
                                </TableRow>
                              );
                            })}
                            {filterData(unit.wordFormation, ["word"]).length ===
                              0 && (
                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  className="text-center py-8 font-mono text-pale-stone"
                                >
                                  {translate("No data found.")}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="block md:hidden space-y-4">
                        {filterData(unit.wordFormation, ["word", "type", "meaning", "example"]).map((row, idx) => {
                          const parsedFamily = parseWordFormationMeaning(row.meaning);
                          return (
                            <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-2xl bg-paper-canvas/30 space-y-3 font-mono text-xs">
                              <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.word}</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-medium">
                                  {abbreviateType(row.type)}
                                </span>
                              </div>
                              <div className="space-y-4 pt-1">
                                {parsedFamily.map((fam, fIdx) => {
                                  const formsStr = fam.forms.join(" / ");
                                  return (
                                    <div key={fIdx} className="space-y-2 border-b border-off-black/5 dark:border-white/5 last:border-b-0 pb-3 last:pb-0">
                                      <p className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs border border-teal-500/20 font-mono font-bold w-max">
                                        {formsStr}
                                      </p>
                                       <p className="text-off-black text-xs leading-relaxed">{getWordFormationMeaning(row.meaning, fam.meaning, fIdx, translate)}</p>
                                      {row.example && (
                                        <div className="text-[11px] text-pale-stone italic font-mono space-y-1">
                                          {row.example.split("\n").map((exLine: string, exIdx: number) => {
                                            const containsForm = fam.forms.some(f => {
                                              const stem = f.replace(/\(([^)]+)\)/g, '$1').toLowerCase();
                                              return exLine.toLowerCase().includes(stem);
                                            });
                                            if (containsForm || parsedFamily.length === 1) {
                                              return (
                                                <div key={exIdx} className="opacity-85">
                                                  {exLine}
                                                </div>
                                              );
                                            }
                                            return null;
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                        {filterData(unit.wordFormation, ["word"]).length === 0 && (
                          <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                            {translate("No data found.")}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Word Patterns Tab */}
                    <TabsContent
                      value="wordPatterns"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      {/* Desktop Table View */}
                      <div className="hidden md:block">
                        <Table>
                          <TableHeader className="bg-rose-500/10 border-b border-rose-500/20">
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="w-[200px] font-mono text-rose-700 dark:text-rose-300 font-bold">
                                {translate("Word")}
                              </TableHead>
                              <TableHead className="w-[100px] font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Type")}</TableHead>
                              <TableHead className="font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Meaning")}</TableHead>
                              <TableHead className="font-mono text-rose-700 dark:text-rose-300 font-bold">{translate("Pattern & Example")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterData(unit.wordPatterns, [
                              "verb",
                              "pattern",
                              "meaning",
                              "example",
                            ]).map((row, idx) => (
                              <TableRow key={idx} className="hover:bg-atmosphere-wash/10 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                                  {row.verb}
                                </TableCell>
                                <TableCell>
                                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-medium">
                                    {abbreviateType(row.pattern)}
                                  </span>
                                </TableCell>
                                <TableCell className="font-mono text-off-black whitespace-pre-line">
                                  {translate(row.meaning)}
                                </TableCell>
                                <TableCell className="font-mono text-pale-stone whitespace-pre-line">
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
                                  {translate("No data found.")}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="block md:hidden space-y-4">
                        {filterData(unit.wordPatterns, ["verb", "pattern", "meaning", "example"]).map((row, idx) => (
                          <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-2xl bg-paper-canvas/30 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.verb}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20 font-mono font-medium">
                                {abbreviateType(row.pattern)}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning)}</p>
                              <p className="text-pale-stone italic leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Pattern & Example")}:</span> {row.example}</p>
                            </div>
                          </div>
                        ))}
                        {filterData(unit.wordPatterns, ["verb"]).length === 0 && (
                          <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                            {translate("No data found.")}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Phrasal Verbs Tab */}
                    <TabsContent
                      value="phrasalVerbs"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      {/* Desktop Table View */}
                      <div className="hidden md:block">
                        <Table>
                          <TableHeader className="bg-orange-500/10 border-b border-orange-500/20">
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="w-[200px] font-mono text-orange-700 dark:text-orange-300 font-bold">
                                {translate("Phrasal Verbs")}
                              </TableHead>
                              <TableHead className="font-mono text-orange-700 dark:text-orange-300 font-bold">{translate("Meaning")}</TableHead>
                              <TableHead className="font-mono text-orange-700 dark:text-orange-300 font-bold">{translate("Example")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterData(unit.phrasalVerbs, [
                              "phrasalVerb",
                              "meaning",
                              "example",
                            ]).map((row, idx) => (
                              <TableRow key={idx} className="hover:bg-atmosphere-wash/10 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                                  {row.phrasalVerb}
                                </TableCell>
                                <TableCell className="font-mono text-off-black whitespace-pre-line">{translate(row.meaning)}</TableCell>
                                <TableCell className="font-mono italic text-pale-stone whitespace-pre-line">
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
                                  {translate("No data found.")}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="block md:hidden space-y-4">
                        {filterData(unit.phrasalVerbs, ["phrasalVerb", "meaning", "example"]).map((row, idx) => (
                          <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-2xl bg-paper-canvas/30 space-y-3 font-mono text-xs">
                            <div className="border-b border-off-black/5 dark:border-white/5 pb-2">
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.phrasalVerb}</span>
                            </div>
                            <div className="space-y-2">
                              <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning)}</p>
                              <p className="text-pale-stone italic leading-relaxed"><span className="font-bold text-ink not-italic">{translate("Example")}:</span> {row.example}</p>
                            </div>
                          </div>
                        ))}
                        {filterData(unit.phrasalVerbs, ["phrasalVerb"]).length === 0 && (
                          <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                            {translate("No data found.")}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Prepositional Phrases Tab */}
                    <TabsContent
                      value="prepositionalPhrases"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      {/* Desktop Table View */}
                      <div className="hidden md:block">
                        <Table>
                          <TableHeader className="bg-sky-500/10 border-b border-sky-500/20">
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="w-[250px] font-mono text-sky-700 dark:text-sky-300 font-bold">
                                {translate("Prepositional Phrase")}
                              </TableHead>
                              <TableHead className="font-mono text-sky-700 dark:text-sky-300 font-bold">{translate("Meaning")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterData(unit.prepositionalPhrases, [
                              "phrase",
                              "meaning",
                            ]).map((row, idx) => (
                              <TableRow key={idx} className="hover:bg-atmosphere-wash/10 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                                  {row.phrase}
                                </TableCell>
                                <TableCell className="font-mono text-off-black whitespace-pre-line">{translate(row.meaning)}</TableCell>
                              </TableRow>
                            ))}
                            {filterData(unit.prepositionalPhrases, ["phrase"]).length === 0 && (
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  className="text-center py-8 font-mono text-pale-stone"
                                >
                                  {translate("No data found.")}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="block md:hidden space-y-4">
                        {filterData(unit.prepositionalPhrases, ["phrase", "meaning"]).map((row, idx) => (
                          <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-2xl bg-paper-canvas/30 space-y-3 font-mono text-xs">
                            <div className="border-b border-off-black/5 dark:border-white/5 pb-2">
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.phrase}</span>
                            </div>
                            <p className="text-off-black/75 pt-1"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning)}</p>
                          </div>
                        ))}
                        {filterData(unit.prepositionalPhrases, ["phrase"]).length === 0 && (
                          <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                            {translate("No data found.")}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Collocations Tab */}
                    <TabsContent
                      value="collocations"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      {/* Desktop Table View */}
                      <div className="hidden md:block">
                        <Table>
                          <TableHeader className="bg-amber-500/10 border-b border-amber-500/20">
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="w-[150px] font-mono text-amber-700 dark:text-amber-300 font-bold">
                                {translate("Base Word")}
                              </TableHead>
                              <TableHead className="font-mono text-amber-700 dark:text-amber-300 font-bold">{translate("Collocation")}</TableHead>
                              <TableHead className="font-mono text-amber-700 dark:text-amber-300 font-bold">{translate("Meaning")}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterData(unit.collocations, [
                              "word",
                              "collocation",
                              "meaning",
                            ]).map((row, idx) => (
                              <TableRow key={idx} className="hover:bg-atmosphere-wash/10 dark:hover:bg-white/5 transition-all duration-200 cursor-default">
                                <TableCell className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                                  {row.word}
                                </TableCell>
                                <TableCell className="font-mono font-semibold text-teal-600 dark:text-teal-400">{row.collocation}</TableCell>
                                <TableCell className="font-mono text-pale-stone">{translate(row.meaning)}</TableCell>
                              </TableRow>
                            ))}
                            {filterData(unit.collocations, ["word"]).length ===
                              0 && (
                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  className="text-center py-8 font-mono text-pale-stone"
                                >
                                  {translate("No data found.")}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="block md:hidden space-y-4">
                        {filterData(unit.collocations, ["word", "collocation", "meaning"]).map((row, idx) => (
                          <div key={idx} className="p-3 sm:p-4 border border-off-black/10 dark:border-white/10 rounded-2xl bg-paper-canvas/30 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between border-b border-off-black/5 dark:border-white/5 pb-2">
                              <span className="text-[10px] font-bold text-off-black/55 uppercase">{translate("Base Word")}: {row.word}</span>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-bold text-teal-600 dark:text-teal-400">{row.collocation}</p>
                              <p className="text-off-black/75"><span className="font-bold text-ink">{translate("Meaning")}:</span> {translate(row.meaning)}</p>
                            </div>
                          </div>
                        ))}
                        {filterData(unit.collocations, ["word"]).length === 0 && (
                          <div className="text-center py-8 font-mono text-xs text-pale-stone border border-dashed border-off-black/20 rounded-2xl bg-paper-canvas/10">
                            {translate("No data found.")}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>

    {/* Mobile FAB and Bottom Sheet Drawer */}
    <div className="md:hidden">
      {/* Floating Action Button (Draggable Bubble) */}
      <motion.button
        drag
        dragElastic={0.1}
        dragMomentum={false}
        animate={controls}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={(event, info) => {
          if (typeof window === "undefined") return;
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          const x = info.point.x;
          
          let targetX = 0;
          if (x < screenWidth / 2) {
            // Snap to left edge (16px padding from left)
            targetX = 88 - screenWidth;
          } else {
            // Snap to right edge (16px padding from right)
            targetX = 8;
          }

          // Constrain Y within safe vertical boundaries
          let targetY = info.offset.y;
          const initialY = screenHeight - 144; // Approx top position based on bottom-24
          const currentY = initialY + targetY;
          
          if (currentY < 80) {
            targetY = 224 - screenHeight;
          } else if (currentY > screenHeight - 80) {
            targetY = 64;
          }

          controls.start({
            x: targetX,
            y: targetY,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          });
          
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 50);
        }}
        onClick={() => {
          if (isDraggingRef.current) return;
          setIsMobileDrawerOpen(true);
        }}
        className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full shadow-xl flex items-center justify-center border border-off-black/15 dark:border-white/15 text-ink cursor-pointer overflow-hidden bg-paper-canvas/80 dark:bg-zinc-950/80 backdrop-blur-md md:backdrop-blur-none"
        style={{ touchAction: "none" }}
      >
        {/* Gradual Blur Background */}
        <GradualBlur
          preset="smooth"
          strength={15}
          zIndex={0}
          height="100%"
          width="100%"
          className="absolute inset-0 rounded-full overflow-hidden"
          refractive={true}
        />
        <Menu className="w-5 h-5 relative z-10 text-ink" />
      </motion.button>

      {/* Drawer Overlay & Bottom Sheet */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 pointer-events-auto"
            />

            {/* Slide-up bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-h-[80vh] bg-paper-canvas/80 dark:bg-zinc-950/80 backdrop-blur-md rounded-t-[32px] border-t-2 border-x-2 border-off-black shadow-[0_-12px_24px_0px_var(--shadow-3d-color)] z-50 p-6 flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Drag handle indicator */}
              <div className="w-12 h-1.5 bg-off-black/10 dark:bg-white/10 rounded-full mx-auto mb-6 shrink-0" />

              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h3 className="font-heading font-bold text-base text-ink">
                    {translate("Units Index")}
                  </h3>
                  <p className="text-xs font-mono text-pale-stone mt-1">
                    {activeBook.book}
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-atmosphere-wash/50 text-ink cursor-pointer outline-none border-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer list */}
              <div ref={mobileScrollContainerRef} className="flex-1 overflow-y-auto relative space-y-2 pb-8 pr-1 scrollbar-thin">
                {activeBook?.units?.map((unit: any) => {
                  const { prefix, main } = splitTitle(unit.title);
                  const isActive = activeUnitId === unit.id || expandedUnitId === unit.id;
                  return (
                    <button
                      key={unit.id}
                      data-unit-id={unit.id}
                      onClick={() => handleUnitClick(unit.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-mono text-xs border-2 flex flex-col gap-1 items-start cursor-pointer outline-none relative overflow-hidden",
                        isActive
                          ? "bg-atmosphere-wash/50 dark:bg-atmosphere-wash/20 border-off-black text-ink font-bold shadow-[2px_2px_6px_0px_var(--shadow-3d-color)] translate-x-[1px] translate-y-[1px]"
                          : "bg-paper-canvas/20 border-transparent text-pale-stone hover:bg-atmosphere-wash/30 dark:hover:bg-atmosphere-wash/10 hover:text-ink hover:border-off-black/20 hover:shadow-[1px_1px_3px_0px_var(--shadow-3d-color)]"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-ink dark:bg-white" />
                      )}
                      {prefix && (
                        <span className={cn(
                          "text-[10px] uppercase font-bold tracking-wider",
                          isActive ? "text-ink" : "text-pale-stone/70"
                        )}>
                          {prefix}
                        </span>
                      )}
                      <span className="leading-normal text-left">{main}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>

    {/* Mobile speed-sensitive floating scroll-up/scroll-down buttons */}
    <AnimatePresence>
      {scrollActiveButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-auto"
        >
          {scrollActiveButton === "up" ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-paper-canvas/90 dark:bg-zinc-950/90 backdrop-blur-md border border-off-black/15 dark:border-white/15 text-ink shadow-lg cursor-pointer hover:bg-atmosphere-wash/45 dark:hover:bg-atmosphere-wash/25 transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-paper-canvas/90 dark:bg-zinc-950/90 backdrop-blur-md border border-off-black/15 dark:border-white/15 text-ink shadow-lg cursor-pointer hover:bg-atmosphere-wash/45 dark:hover:bg-atmosphere-wash/25 transition-colors"
              aria-label="Scroll to bottom"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </div>

</section>
  );
}

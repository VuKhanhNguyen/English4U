"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";
import { showToast } from "@/components/ui/toast";
import Link from "next/link";
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
import c1c2Data from "@/data/destination-c1-c2.json";

const b1Data = {
  book: "Destination B1",
  units: [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10_11, unit12, unit13, unit14, unit15, unit16, unit17, unit18, unit19, unit20, unit21, unit22, unit23, unit24, unit25, unit26, unit27, unit28_29, unit30, unit31, unit32, unit33, unit34, unit35, unit36, unit37, unit38, unit39, unit40, unit41, unit42],
};

const b2Data = {
  book: "Destination B2",
  units: [b2Unit1, b2Unit2, b2Unit3, b2Unit4, b2Unit5, b2Unit6, b2Unit7, b2Unit8, b2Unit9, b2Unit10, b2Unit11, b2Unit12, b2Unit13, b2Unit14, b2Unit15, b2Unit16, b2Unit17, b2Unit18, b2Unit19, b2Unit20],
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
      <strong key={`${baseKey}-bold-${matchIndex}`} className="font-bold italic text-indigo-600 bg-indigo-600/10 px-1 py-0.5 rounded">
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
        <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-1.5 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/30 not-italic">
          {parseBoldAndItalic(exampleText, `${lineKey}-ex`)}
        </span>
        {noteText && (
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/30 not-italic">
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
        className="underline text-indigo-600 hover:text-indigo-800 font-bold"
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
      lineClass = "text-teal-600 dark:text-teal-400 font-medium";
    } else if (hasCross && !hasTick && !hasEx) {
      lineClass = "text-red-600 dark:text-red-400 font-medium";
    } else if (hasEx) {
      lineClass = "text-pale-stone italic";
    } else if (hasNote) {
      lineClass = "text-amber-400 font-medium";
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
          className="border border-off-black/20 rounded-[16px] p-6 md:p-8 bg-paper-canvas shadow-subtle relative overflow-hidden"
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
                return (
                  <div key={bIdx} className="space-y-2">
                    {block.tableName && (
                      <h5 className="text-body-sm font-bold text-whisper-gray font-mono">
                        {translate(block.tableName)}
                      </h5>
                    )}
                    <div className="overflow-x-auto border border-off-black rounded-lg bg-paper-canvas">
                      <table className="w-full text-sm border-collapse text-left">
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
                              className="border-b border-off-black last:border-b-0 font-mono hover:bg-atmosphere-wash/10 transition-colors"
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
                  </div>
                );
              }
              if (block.type === "generic-table") {
                return (
                  <div key={bIdx} className="space-y-2">
                    {block.tableName && (
                      <h5 className="text-body-sm font-bold text-whisper-gray font-mono">
                        {translate(block.tableName)}
                      </h5>
                    )}
                    <div className="overflow-x-auto border border-off-black rounded-lg bg-paper-canvas">
                      <table className="w-full text-sm border-collapse text-left">
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
                              className="border-b border-off-black last:border-b-0 font-mono hover:bg-atmosphere-wash/10 transition-colors"
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
                          <div key={iIdx} className="space-y-2 border border-off-black/10 rounded-lg p-4 bg-paper-canvas/50">
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
                      <div className="overflow-x-auto border border-off-black rounded-lg">
                        <table className="w-full text-sm border-collapse text-left">
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
                              <tr key={rIdx} className="border-b border-off-black last:border-b-0 hover:bg-atmosphere-wash/10 transition-colors">
                                <td className="p-3 border-r border-off-black font-bold text-indigo-600 bg-atmosphere-wash/10 align-middle text-center">{row[0]}</td>
                                <td className="p-3 whitespace-pre-line text-off-black align-middle">
                                  {renderTextWithLinks(translate(row[1]))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                      <div className="p-4 bg-honey-dew-gradient/10 border border-off-black/20 rounded-lg text-ink italic text-body-sm flex gap-3 items-center">
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
                    <div className="overflow-x-auto border border-off-black rounded-lg bg-paper-canvas">
                      <table className="w-full text-sm border-collapse text-left">
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
                            <tr key={rIdx} className="border-b border-off-black last:border-b-0 hover:bg-atmosphere-wash/10 transition-colors">
                              <td className="p-3 border-r border-off-black font-bold text-ink align-middle">{row[0]}</td>
                              <td className="p-3 border-r border-off-black text-pale-stone align-middle">{translate(row[1])}</td>
                              <td className="p-3 border-r border-off-black font-bold text-ink align-middle">{row[2]}</td>
                              <td className="p-3 text-pale-stone align-middle">{translate(row[3])}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {block.note && (
                      <div className="p-4 bg-atmosphere-wash/30 border border-off-black/20 rounded-lg text-ink font-semibold text-body-sm flex gap-3 items-center">
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
    <section className={cn("py-16 md:py-24 bg-paper-canvas border-t border-off-black relative overflow-hidden", className)}>
      
      {/* Subtle background gradient wash */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-mint-gradient opacity-20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-sunset-violet-gradient opacity-15 blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-[1432px] relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-end gap-4 ${hideHeader ? 'mb-4' : 'mb-12'}`}>
          {!hideHeader && (
            <div>
              <h2 className="text-heading-lg font-heading text-ink mb-4">
                {translate("Learning Explorer")}
              </h2>
              <p className="text-body font-mono text-pale-stone max-w-xl">
                {translate("Dive deep into the structured content. Expand a unit, select a category, use the search to quickly find specific rules or vocabulary.")}
              </p>
            </div>
          )}

 <Breadcrumb className="ml-5 mt-5 text-xs">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" asChild>
                      <Link href="/">{translate("Home")}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-pale-stone font-medium">{activeBook.book}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

          <div className="w-full md:w-[280px] relative ml-auto z-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pale-stone w-[16px] h-[16px]" />
            <Input
              placeholder={translate("Search grammar, vocabulary...")}
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

        {/* Units Accordion */}
        <Card variant="content" className="p-4 md:p-8">
          <Accordion
            type="single"
            collapsible
            defaultValue={activeBook?.units?.[0]?.id}
            className="w-full"
          >
            {(activeBook?.units || []).map((unit: any) => (
              <AccordionItem key={unit.id} value={unit.id} className="border-b border-pale-stone">
                <AccordionTrigger className="text-subheading font-mono font-medium hover:no-underline py-5 text-ink">
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
                    <TabsList className="mb-6 flex-wrap h-auto p-1 rounded-[24px]">
                      {(unit.richGrammar || (unit.grammar && unit.grammar.length > 0)) && (
                        <TabsTrigger value="grammar" className="rounded-full">{translate("Grammar")}</TabsTrigger>
                      )}
                      {unit.vocabulary && unit.vocabulary.length > 0 && (
                        <TabsTrigger value="vocabulary" className="rounded-full">{translate("Vocabulary")}</TabsTrigger>
                      )}
                      {unit.wordFormation && unit.wordFormation.length > 0 && (
                        <TabsTrigger value="wordFormation" className="rounded-full">
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
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px] font-mono text-ink">
                                {translate("Structure")}
                              </TableHead>
                              <TableHead className="font-mono text-ink">{translate("Usage")}</TableHead>
                              <TableHead className="font-mono text-ink">{translate("Example")}</TableHead>
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
                                  {translate("No data found.")}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      )}
                    </TabsContent>

                    {/* Vocabulary Tab */}
                    <TabsContent
                      value="vocabulary"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader className="bg-atmosphere-wash">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[150px] font-mono text-ink">{translate("Word")}</TableHead>
                            <TableHead className="w-[100px] font-mono text-ink">{translate("Type")}</TableHead>
                            <TableHead className="font-mono text-ink">{translate("Meaning")}</TableHead>
                            <TableHead className="font-mono text-ink">{translate("Example")}</TableHead>
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
                    </TabsContent>

                    {/* Word Formation Tab */}
                    <TabsContent
                      value="wordFormation"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader className="bg-atmosphere-wash">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[150px] font-mono text-ink">{translate("Word")}</TableHead>
                            <TableHead className="w-[100px] font-mono text-ink">{translate("Type")}</TableHead>
                            <TableHead className="font-mono text-ink">{translate("Word Family & Meanings")}</TableHead>
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
                              <TableRow key={idx} className="align-top">
                                <TableCell className="font-mono font-medium text-ink font-semibold pt-4">
                                  {row.word}
                                </TableCell>
                                <TableCell className="pt-4">
                                  <span className="inline-block text-caption font-mono text-off-black bg-transparent border border-off-black px-2.5 py-0.5 rounded-full">
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
                                            <span className="font-bold text-ink text-sm text-[#0f766e]">
                                              {formsStr}
                                            </span>
                                          </div>
                                          <div className="flex-1 space-y-1">
                                            <p className="text-off-black text-sm leading-relaxed">{translate(fam.meaning)}</p>
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
                    </TabsContent>

                    {/* Word Patterns Tab */}
                    <TabsContent
                      value="wordPatterns"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader className="bg-atmosphere-wash">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[200px] font-mono text-ink">
                              {translate("Word")}
                            </TableHead>
                            <TableHead className="w-[100px] font-mono text-ink">{translate("Type")}</TableHead>
                            <TableHead className="font-mono text-ink">{translate("Meaning")}</TableHead>
                            <TableHead className="font-mono text-ink">{translate("Pattern & Example")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.wordPatterns, [
                            "verb",
                            "pattern",
                            "meaning",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink font-semibold">
                                {row.verb}
                              </TableCell>
                              <TableCell>
                                <span className="inline-block text-caption font-mono text-off-black bg-transparent border border-off-black px-2.5 py-0.5 rounded-full">
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
                    </TabsContent>

                    {/* Phrasal Verbs Tab */}
                    <TabsContent
                      value="phrasalVerbs"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader className="bg-atmosphere-wash">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[200px] font-mono text-ink">
                              {translate("Phrasal Verbs")}
                            </TableHead>
                            <TableHead className="font-mono text-ink">{translate("Meaning")}</TableHead>
                            <TableHead className="font-mono text-ink">{translate("Example")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.phrasalVerbs, [
                            "phrasalVerb",
                            "meaning",
                            "example",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink font-semibold">
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
                    </TabsContent>

                    {/* Prepositional Phrases Tab */}
                    <TabsContent
                      value="prepositionalPhrases"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader className="bg-atmosphere-wash">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[250px] font-mono text-ink">
                              {translate("Prepositional Phrase")}
                            </TableHead>
                            <TableHead className="font-mono text-ink">{translate("Meaning")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filterData(unit.prepositionalPhrases, [
                            "phrase",
                            "meaning",
                          ]).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono font-medium text-ink font-semibold">
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
                    </TabsContent>

                    {/* Collocations Tab */}
                    <TabsContent
                      value="collocations"
                      className="animate-in fade-in slide-in-from-bottom-2"
                    >
                      <Table>
                        <TableHeader className="bg-atmosphere-wash">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[150px] font-mono text-ink">
                              {translate("Base Word")}
                            </TableHead>
                            <TableHead className="font-mono text-ink">{translate("Collocation")}</TableHead>
                            <TableHead className="font-mono text-ink">{translate("Meaning")}</TableHead>
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

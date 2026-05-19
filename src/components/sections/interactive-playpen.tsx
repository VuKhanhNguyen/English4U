"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, BookOpen, Layers, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const tabs = [
  { id: "grammar", label: "Grammar Rules", icon: BookOpen },
  { id: "vocab", label: "Topic Vocabulary", icon: Layers },
  { id: "formation", label: "Word Formations", icon: Sparkles },
];

const grammarData = [
  {
    structure: "Subject + wish + Past Simple",
    usage: "Express a regret about a present situation",
    example: "I wish I knew the answer to this question.",
  },
  {
    structure: "Subject + wish + Past Perfect",
    usage: "Express a regret about a past situation",
    example: "She wishes she had studied harder for the exam.",
  },
];

const vocabData = [
  {
    word: "Organized",
    type: "adj",
    meaning: "Arranged in a systematic way; orderly",
    example: "Our study paths are highly organized.",
  },
  {
    word: "Cognitive",
    type: "adj",
    meaning: "Relating to conscious intellectual activity",
    example: "Visual layouts aid cognitive retention.",
  },
];

const formationData = [
  {
    root: "Structure",
    noun: "Structuring",
    verb: "Structure",
    adj: "Structural",
    adv: "Structurally",
  },
  {
    root: "Nation",
    noun: "Nationality",
    verb: "Nationalize",
    adj: "National",
    adv: "Nationally",
  },
];

export function InteractivePlaypen() {
  const [activeTab, setActiveTab] = React.useState("grammar");
  const [simulatedSearch, setSimulatedSearch] = React.useState("");

  return (
    <section className="py-24 bg-pale-ash border-t border-charcoal-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Info and Action */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
              Interactive Preview
            </span>
            <h2 className="text-display-sm font-bold tracking-tight text-midnight-ink mt-4 mb-6 leading-tight">
              Experience the Power of Clean Structures
            </h2>
            <p className="text-body text-[#525252] mb-8 leading-relaxed">
              Don't just take our word for it. Click the tabs and search inside
              this interactive playpen to see how English4U transforms complex
              lessons into instant cognitive clarity.
            </p>

            <div className="flex flex-col gap-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSimulatedSearch("");
                    }}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all duration-200 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-canvas-white/70 backdrop-blur-md border-midnight-ink shadow-subtle text-midnight-ink translate-x-2"
                        : "bg-transparent border-transparent hover:border-charcoal-border/30 text-midnight-ink/60 hover:text-midnight-ink"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md border border-charcoal-border ${activeTab === tab.id ? "bg-accent-green" : "bg-canvas-white/60 backdrop-blur-sm"}`}
                      >
                        <Icon className="w-16px h-16px text-midnight-ink" />
                      </div>
                      <span className="font-bold text-sm">{tab.label}</span>
                    </div>
                    <ArrowRight
                      className={`w-14px h-14px transition-transform duration-200 ${activeTab === tab.id ? "translate-x-1 opacity-100" : "opacity-0"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Live Playground Widget */}
          <div className="lg:col-span-7">
            <Card
              variant="content"
              className="bg-canvas-white/70 backdrop-blur-xl border-2 border-midnight-ink rounded-lg shadow-subtle p-6 md:p-8 relative overflow-hidden"
            >
              {/* Simulated Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-charcoal-border gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-midnight-ink bg-pale-ash px-2 py-0.5 rounded border border-charcoal-border">
                    Live Playground
                  </span>
                  <h3 className="text-heading font-black text-midnight-ink mt-1.5">
                    Destination Unit Preview
                  </h3>
                </div>

                {/* Search Bar Mock */}
                <div className="relative w-full sm:w-[220px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-ink/40 w-14px h-14px" />
                  <Input
                    placeholder="Type to filter..."
                    value={simulatedSearch}
                    onChange={(e) => setSimulatedSearch(e.target.value)}
                    className="pl-9 bg-pale-ash border border-charcoal-border text-xs rounded-md h-32px w-full"
                  />
                </div>
              </div>

              {/* Render Selected Panel */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "grammar" && (
                      <div className="flex flex-col gap-4">
                        {grammarData
                          .filter(
                            (item) =>
                              !simulatedSearch ||
                              item.structure
                                .toLowerCase()
                                .includes(simulatedSearch.toLowerCase()) ||
                              item.usage
                                .toLowerCase()
                                .includes(simulatedSearch.toLowerCase()),
                          )
                          .map((row, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-pale-ash rounded border border-charcoal-border shadow-subtle-3"
                            >
                              <p className="text-xs font-bold text-accent-green bg-midnight-ink px-2 py-0.5 rounded border border-charcoal-border inline-block mb-2">
                                {row.structure}
                              </p>
                              <p className="text-xs font-bold text-midnight-ink/60 mb-1">
                                Usage:{" "}
                                <span className="text-midnight-ink font-medium">
                                  {row.usage}
                                </span>
                              </p>
                              <p className="text-xs italic font-bold text-midnight-ink/50">
                                Example:{" "}
                                <span className="text-midnight-ink not-italic font-bold text-[#b45309]">
                                  "{row.example}"
                                </span>
                              </p>
                            </div>
                          ))}
                        {grammarData.filter(
                          (item) =>
                            !simulatedSearch ||
                            item.structure
                              .toLowerCase()
                              .includes(simulatedSearch.toLowerCase()),
                        ).length === 0 && (
                          <div className="text-center py-12 text-xs text-midnight-ink/50">
                            No matching structures found.
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "vocab" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vocabData
                          .filter(
                            (item) =>
                              !simulatedSearch ||
                              item.word
                                .toLowerCase()
                                .includes(simulatedSearch.toLowerCase()) ||
                              item.meaning
                                .toLowerCase()
                                .includes(simulatedSearch.toLowerCase()),
                          )
                          .map((row, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-pale-ash rounded border border-charcoal-border shadow-subtle-3 flex flex-col justify-between h-120px"
                            >
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="text-sm font-black text-midnight-ink">
                                    {row.word}
                                  </h4>
                                  <Badge className="border-charcoal-border text-[9px] font-bold">
                                    {row.type}
                                  </Badge>
                                </div>
                                <p className="text-[11px] text-midnight-ink/70 line-clamp-2 leading-relaxed">
                                  {row.meaning}
                                </p>
                              </div>
                              <p className="text-[10px] italic font-bold text-midnight-ink/40 truncate">
                                "{row.example}"
                              </p>
                            </div>
                          ))}
                        {vocabData.filter(
                          (item) =>
                            !simulatedSearch ||
                            item.word
                              .toLowerCase()
                              .includes(simulatedSearch.toLowerCase()),
                        ).length === 0 && (
                          <div className="col-span-2 text-center py-12 text-xs text-midnight-ink/50">
                            No matching vocabulary found.
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "formation" && (
                      <div className="flex flex-col gap-4">
                        {formationData
                          .filter(
                            (item) =>
                              !simulatedSearch ||
                              item.root
                                .toLowerCase()
                                .includes(simulatedSearch.toLowerCase()),
                          )
                          .map((row, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-pale-ash rounded border border-charcoal-border shadow-subtle-3 overflow-x-auto"
                            >
                              <h4 className="text-xs font-bold uppercase tracking-wider text-midnight-ink bg-accent-green px-2 py-0.5 rounded border border-charcoal-border inline-block mb-3">
                                Root: {row.root}
                              </h4>
                              <div className="grid grid-cols-4 gap-2 text-center min-w-[400px]">
                                <div className="p-2 bg-canvas-white/60 backdrop-blur-sm border border-charcoal-border rounded">
                                  <p className="text-[9px] font-bold text-midnight-ink/40 uppercase">
                                    Noun
                                  </p>
                                  <p className="text-xs font-bold text-midnight-ink">
                                    {row.noun}
                                  </p>
                                </div>
                                <div className="p-2 bg-canvas-white/60 backdrop-blur-sm border border-charcoal-border rounded">
                                  <p className="text-[9px] font-bold text-midnight-ink/40 uppercase">
                                    Verb
                                  </p>
                                  <p className="text-xs font-bold text-midnight-ink">
                                    {row.verb}
                                  </p>
                                </div>
                                <div className="p-2 bg-canvas-white/60 backdrop-blur-sm border border-charcoal-border rounded">
                                  <p className="text-[9px] font-bold text-midnight-ink/40 uppercase">
                                    Adj
                                  </p>
                                  <p className="text-xs font-bold text-[#0d9488]">
                                    {row.adj}
                                  </p>
                                </div>
                                <div className="p-2 bg-canvas-white/60 backdrop-blur-sm border border-charcoal-border rounded">
                                  <p className="text-[9px] font-bold text-midnight-ink/40 uppercase">
                                    Adv
                                  </p>
                                  <p className="text-xs font-bold text-midnight-ink">
                                    {row.adv}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        {formationData.filter(
                          (item) =>
                            !simulatedSearch ||
                            item.root
                              .toLowerCase()
                              .includes(simulatedSearch.toLowerCase()),
                        ).length === 0 && (
                          <div className="text-center py-12 text-xs text-midnight-ink/50">
                            No matching root words found.
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

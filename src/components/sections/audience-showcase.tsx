"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Calendar,
  Activity,
  Search,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

const studyLogs = [
  {
    time: "09:30 AM",
    action: "Completed Unit 1 Grammar table",
    level: "B1",
    icon: Check,
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    time: "11:15 AM",
    action: "Filtered 12 Phrasal Verbs in Search",
    level: "B2",
    icon: Search,
    color: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30",
  },
  {
    time: "02:40 PM",
    action: "Reviewed Word Formation tree for 'Structure'",
    level: "C1 & C2",
    icon: Sparkles,
    color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
  {
    time: "05:10 PM",
    action: "Tested collocations for verb 'make'",
    level: "B2",
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30",
    active: true,
  },
];

export function AudienceShowcase() {
  const { translate } = useLanguage();

  return (
    <section className="py-24 bg-section-audience border-t border-zinc-200/50 dark:border-zinc-800/50 font-sans relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1432px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto px-2 sm:px-6 md:px-12 lg:px-16">
          {/* Column 1: Info and Badges */}
          <div className="lg:col-span-5">
            <span className="section-badge">
              <span className="text-gradient-badge">
                {translate("Ideal Learners")}
              </span>
            </span>
            <h2 className="text-heading-lg font-heading text-gradient-heading mt-4 mb-6 leading-tight">
              {translate("Engineered For High-Goal Achievers")}
            </h2>
            <p className="text-body text-pale-stone mb-8 leading-relaxed font-sans">
              {translate("Whether you are preparing for international certifications (IELTS, Cambridge, TOEFL), self-studying English at home, or revising school lessons, English4U provides a beautifully structured, structured repository that respects your time.")}
            </p>

            <div className="flex flex-col gap-4 font-sans">
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Check className="w-[12px] h-[12px] text-blue-600 dark:text-blue-400 font-bold" />
                </div>
                <span className="text-body-sm font-medium text-ink">
                  {translate("Self-Guided Exam Revision")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Check className="w-[12px] h-[12px] text-blue-600 dark:text-blue-400 font-bold" />
                </div>
                <span className="text-body-sm font-medium text-ink">
                  {translate("Commute & Mobile Friendly Tables")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Check className="w-[12px] h-[12px] text-blue-600 dark:text-blue-400 font-bold" />
                </div>
                <span className="text-body-sm font-medium text-ink">
                  {translate("100% Client-Side Search Efficiency")}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Visual Study Log Timeline */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <Card
              variant="content"
              className="w-full max-w-[520px] p-6 sm:p-8 relative overflow-hidden font-sans"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-zinc-200/50 dark:border-zinc-800/50 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Activity className="w-[18px] h-[18px] text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {translate("Self-Study Dashboard")}
                    </h3>
                    <p className="text-xs text-pale-stone font-sans mt-0.5">
                      {translate("Live progress log visualization")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 text-xs font-mono">
                  <Calendar className="w-[12px] h-[12px]" />
                  <span>{translate("Today")}</span>
                </div>
              </div>

              {/* Progress Tree Timeline */}
              <div className="flex flex-col font-sans">
                {studyLogs.map((log, index) => {
                  const Icon = log.icon;
                  return (
                    <div key={index} className="flex gap-3 sm:gap-4 items-start relative group">
                      {/* Time Column (single line) */}
                      <span className="text-xs text-pale-stone w-[70px] sm:w-[78px] pt-2.5 text-right shrink-0 font-mono font-medium whitespace-nowrap">
                        {log.time}
                      </span>

                      {/* Node Circle & Tree Vertical Stem */}
                      <div className="flex flex-col items-center shrink-0 self-stretch">
                        <div
                          className={`w-[30px] h-[30px] rounded-full border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 z-10 ${log.color} ${
                            log.active ? "ring-4 ring-blue-500/15 animate-pulse" : ""
                          }`}
                        >
                          <Icon className="w-[13px] h-[13px]" />
                        </div>
                        {index < studyLogs.length - 1 && (
                          <div className="w-[2px] flex-grow bg-zinc-200 dark:bg-zinc-800 my-1.5 rounded-full group-hover:bg-blue-400/40 transition-colors" />
                        )}
                      </div>

                      {/* Log Card - rounded-xl (rounded-[12px]) */}
                      <div className="flex-grow p-3.5 sm:p-4 bg-zinc-50/60 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/60 rounded-xl mb-4 last:mb-0 transition-all group-hover:border-blue-500/30 dark:group-hover:border-blue-500/30 group-hover:shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed">
                            {translate(log.action)}
                          </p>
                          <span className="px-2.5 py-1 text-xs font-semibold font-mono rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                            {log.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Activity, GraduationCap } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

const studyLogs = [
  {
    time: "09:30 AM",
    action: "Completed Unit 1 Grammar table",
    level: "B1",
    status: "success",
  },
  {
    time: "11:15 AM",
    action: "Filtered 12 Phrasal Verbs in Search",
    level: "B2",
    status: "search",
  },
  {
    time: "02:40 PM",
    action: "Reviewed Word Formation tree for 'Structure'",
    level: "C1 & C2",
    status: "success",
  },
  {
    time: "05:10 PM",
    action: "Tested collocations for verb 'make'",
    level: "B2",
    status: "active",
  },
];

export function AudienceShowcase() {
  const { translate } = useLanguage();

  return (
    <section className="py-24 bg-section-audience border-t border-zinc-200/50 dark:border-zinc-800/50 font-sans">
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
              className="w-full max-w-[480px] p-4 sm:p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50 mb-6 font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-[28px] h-[28px] rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Activity className="w-[14px] h-[14px] text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-ink">
                      {translate("Self-Study Dashboard")}
                    </h3>
                    <p className="text-caption text-pale-stone font-sans">
                      {translate("Live progress log visualization")}
                    </p>
                  </div>
                </div>

                <Badge className="border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-caption font-mono rounded-full flex items-center gap-1 px-3 py-0.5">
                  <Calendar className="w-[10px] h-[10px]" /> {translate("Today")}
                </Badge>
              </div>

              {/* Study Timeline Events */}
              <div className="flex flex-col relative font-sans">
                {studyLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex gap-2 sm:gap-4 items-stretch relative"
                  >
                    <span className="text-caption text-pale-stone w-[50px] sm:w-[55px] pt-1 text-right shrink-0 font-mono">
                      {log.time}
                    </span>

                    {/* Timeline bar and indicator column */}
                    <div className="flex flex-col items-center shrink-0 relative pb-6">
                      <div
                        className={`w-[26px] h-[26px] rounded-full border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center shrink-0 relative z-10 ${
                          log.status === "active" ? "bg-blue-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400 animate-pulse" : "bg-zinc-50 dark:bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        <GraduationCap className="w-[12px] h-[12px]" />
                      </div>
                      {index < studyLogs.length - 1 && (
                        <div className="w-px flex-grow bg-zinc-200/60 dark:bg-zinc-800 my-1 absolute top-7 bottom-0 left-1/2 -translate-x-1/2 z-0" />
                      )}
                    </div>

                    {/* Log Details */}
                    <div className="p-3 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-800/60 rounded-2xl flex-grow mb-6 last:mb-0 shadow-sm">
                      <div className="flex justify-between items-center mb-1 gap-2 flex-wrap">
                        <p className="text-body-sm font-semibold text-ink leading-relaxed">
                          {translate(log.action)}
                        </p>
                        <Badge className="text-[9px] px-2 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-mono shrink-0">
                          {log.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

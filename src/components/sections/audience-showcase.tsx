"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
    <section className="py-24 bg-paper-canvas border-t border-off-black">
      <div className="container mx-auto px-6 max-w-[1432px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Column 1: Info and Badges */}
          <div className="lg:col-span-5">
            <span className="text-caption font-mono uppercase tracking-wider text-ink bg-atmosphere-wash px-3 py-1 rounded-full border border-off-black">
              {translate("Ideal Learners")}
            </span>
            <h2 className="text-heading-lg font-heading text-ink mt-4 mb-6 leading-tight">
              {translate("Engineered For High-Goal Achievers")}
            </h2>
            <p className="text-body text-pale-stone mb-8 leading-relaxed font-mono">
              {translate("Whether you are preparing for international certifications (IELTS, Cambridge, TOEFL), self-studying English at home, or revising school lessons, English4U provides a beautifully structured, structured repository that respects your time.")}
            </p>

            <div className="flex flex-col gap-4 font-mono">
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-atmosphere-wash border border-off-black flex items-center justify-center">
                  <Check className="w-[12px] h-[12px] text-ink" />
                </div>
                <span className="text-body-sm font-medium text-ink">
                  {translate("Self-Guided Exam Revision")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-atmosphere-wash border border-off-black flex items-center justify-center">
                  <Check className="w-[12px] h-[12px] text-ink" />
                </div>
                <span className="text-body-sm font-medium text-ink">
                  {translate("Commute & Mobile Friendly Tables")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-atmosphere-wash border border-off-black flex items-center justify-center">
                  <Check className="w-[12px] h-[12px] text-ink" />
                </div>
                <span className="text-body-sm font-medium text-ink">
                  {translate("100% Client-Side Search Efficiency")}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Visual Study Log Timeline */}
          <div className="lg:col-span-7 flex justify-center">
            <Card
              variant="content"
              className="w-full max-w-[480px] p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-off-black mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-[28px] h-[28px] rounded-full bg-paper-canvas border border-off-black flex items-center justify-center">
                    <Activity className="w-[14px] h-[14px] text-ink" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-medium text-ink">
                      {translate("Self-Study Dashboard")}
                    </h3>
                    <p className="text-caption text-pale-stone font-mono">
                      {translate("Live progress log visualization")}
                    </p>
                  </div>
                </div>

                <Badge className="border-off-black bg-transparent text-ink text-caption font-mono rounded-full flex items-center gap-1">
                  <Calendar className="w-[10px] h-[10px]" /> {translate("Today")}
                </Badge>
              </div>

              {/* Study Timeline Events */}
              <div className="flex flex-col gap-6 relative font-mono">
                {/* Timeline vertical bar */}
                <div className="absolute left-[39px] top-2 bottom-2 w-px bg-off-black/20" />

                {studyLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start relative z-10"
                  >
                    <span className="text-caption text-pale-stone w-[55px] pt-1 text-right shrink-0">
                      {log.time}
                    </span>

                    {/* Circle Indicator */}
                    <div
                      className={`w-[24px] h-[24px] rounded-full border border-off-black flex items-center justify-center shrink-0 ${
                        log.status === "active" ? "bg-atmosphere-wash animate-pulse" : "bg-paper-canvas"
                      }`}
                    >
                      <GraduationCap className="w-[12px] h-[12px] text-ink" />
                    </div>

                    {/* Log Details */}
                    <div className="p-3 bg-paper-canvas border border-off-black rounded-[40px] flex-grow">
                      <div className="flex justify-between items-center mb-1 gap-2 flex-wrap">
                        <p className="text-body-sm font-medium text-ink leading-relaxed">
                          {translate(log.action)}
                        </p>
                        <Badge className="text-[10px] px-2 py-0.5 rounded-full border border-off-black font-mono text-ink bg-atmosphere-wash shrink-0">
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


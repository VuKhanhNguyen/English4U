"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Calendar, Activity, GraduationCap } from "lucide-react"

const studyLogs = [
  { time: "09:30 AM", action: "Completed Unit 1 Grammar table", level: "B1", status: "success" },
  { time: "11:15 AM", action: "Filtered 12 Phrasal Verbs in Search", level: "B2", status: "search" },
  { time: "02:40 PM", action: "Reviewed Word Formation tree for 'Structure'", level: "C1 & C2", status: "success" },
  { time: "05:10 PM", action: "Tested collocations for verb 'make'", level: "B2", status: "active" }
]

export function AudienceShowcase() {
  return (
    <section className="py-24 bg-canvas-white border-t border-charcoal-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Info and Badges */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-green bg-midnight-ink px-3 py-1 rounded-full border border-charcoal-border">
              Ideal Learners
            </span>
            <h2 className="text-display-sm font-bold tracking-tight text-midnight-ink mt-4 mb-6 leading-tight">
              Engineered For High-Goal Achievers
            </h2>
            <p className="text-body text-[#525252] mb-8 leading-relaxed">
              Whether you are preparing for international certifications (IELTS, Cambridge, TOEFL), self-studying English at home, or revising school lessons, English4U provides a beautifully structured, structured repository that respects your time.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-accent-green border border-charcoal-border flex items-center justify-center shadow-subtle-3">
                  <Check className="w-[12px] h-[12px] text-midnight-ink font-bold" />
                </div>
                <span className="text-sm font-bold text-midnight-ink">Self-Guided Exam Revision</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-accent-green border border-charcoal-border flex items-center justify-center shadow-subtle-3">
                  <Check className="w-[12px] h-[12px] text-midnight-ink font-bold" />
                </div>
                <span className="text-sm font-bold text-midnight-ink">Commute & Mobile Friendly Tables</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-accent-green border border-charcoal-border flex items-center justify-center shadow-subtle-3">
                  <Check className="w-[12px] h-[12px] text-midnight-ink font-bold" />
                </div>
                <span className="text-sm font-bold text-midnight-ink">100% Client-Side Search Efficiency</span>
              </div>
            </div>
          </div>

          {/* Column 2: Visual Study Log Timeline */}
          <div className="lg:col-span-7 flex justify-center">
            <Card variant="content" className="w-full max-w-[480px] bg-canvas-white border-2 border-midnight-ink rounded-lg shadow-subtle p-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-charcoal-border mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-[28px] h-[28px] rounded-full bg-pale-ash border border-charcoal-border flex items-center justify-center">
                    <Activity className="w-[14px] h-[14px] text-midnight-ink" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-midnight-ink">Self-Study Dashboard</h3>
                    <p className="text-[9px] text-[#737373]">Live progress log visualization</p>
                  </div>
                </div>
                
                <Badge className="border-charcoal-border font-bold text-[9px] flex items-center gap-1">
                  <Calendar className="w-[10px] h-[10px]" /> Today
                </Badge>
              </div>

              {/* Study Timeline Events */}
              <div className="flex flex-col gap-6 relative">
                {/* Timeline vertical bar */}
                <div className="absolute left-[39px] top-2 bottom-2 w-0.5 bg-charcoal-border/20" />

                {studyLogs.map((log, index) => (
                  <div key={index} className="flex gap-4 items-start relative z-10">
                    <span className="text-[10px] font-bold text-midnight-ink/40 w-[55px] pt-1 text-right shrink-0">
                      {log.time}
                    </span>
                    
                    {/* Circle Indicator */}
                    <div className={`w-[24px] h-[24px] rounded-full border border-charcoal-border flex items-center justify-center shrink-0 ${
                      log.status === "success" ? "bg-accent-green" : log.status === "search" ? "bg-card-saffron" : "bg-card-mint animate-pulse"
                    } shadow-subtle-3`}>
                      <GraduationCap className="w-[12px] h-[12px] text-midnight-ink" />
                    </div>

                    {/* Log Details */}
                    <div className="p-3 bg-pale-ash border border-charcoal-border rounded-lg shadow-subtle-3 flex-grow">
                      <div className="flex justify-between items-center mb-1 gap-2 flex-wrap">
                        <p className="text-xs font-bold text-midnight-ink leading-relaxed">
                          {log.action}
                        </p>
                        <Badge className={`text-[8px] px-1.5 py-0.2 rounded border border-charcoal-border font-black text-midnight-ink shrink-0 ${
                          log.level === "B1" ? "bg-card-saffron" : log.level === "B2" ? "bg-card-mint" : "bg-card-lavender"
                        }`}>
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
  )
}

"use client";

import React from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { WellnessAgentChat } from "@/components/agent/wellness-agent-chat";
import { Bot, ShieldCheck, Sparkles, HeartPulse, Brain, Smartphone } from "lucide-react";

export default function WellnessAgentPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <div className="flex items-center gap-2">
            <DimensionPill dimension="unified" />
            <span className="text-xs font-mono text-[#3E4542]">Intelligence Companion</span>
          </div>
          <h1 className="text-3xl font-light text-[#183C32] tracking-tight mt-1">
            Personal Wellness Agent
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Your consented wellbeing companion uniting Physical, Mental, and Digital rhythms into actionable daily harmony.
          </p>
        </div>

        {/* Dimension Sync Indicators */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-[#183C32] border border-[#183C32]/10 font-mono">
            <HeartPulse className="w-3.5 h-3.5 text-[#183C32]" />
            <span>82%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-[#183C32] border border-[#183C32]/10 font-mono">
            <Brain className="w-3.5 h-3.5 text-[#B9A5DF]" />
            <span>78%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-[#183C32] border border-[#183C32]/10 font-mono">
            <Smartphone className="w-3.5 h-3.5 text-[#46C5B0]" />
            <span>88%</span>
          </div>
        </div>
      </div>

      {/* Main Agent Chat Interface */}
      <WellnessAgentChat />

      {/* Architectural Disclosures & Operational Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#183C32]">
            <ShieldCheck className="w-4 h-4 text-[#1A8A7A]" />
            <span>Encrypted Journal Protection</span>
          </div>
          <p className="text-xs text-[#3E4542] leading-relaxed">
            The agent never reads or indexes private journal text without explicit, per-session opt-in consent.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#183C32]">
            <Sparkles className="w-4 h-4 text-[#46C5B0]" />
            <span>No Unilateral Decisions</span>
          </div>
          <p className="text-xs text-[#3E4542] leading-relaxed">
            All reminders, routine plans, and facility bookings require your review and explicit permission.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#183C32]">
            <Bot className="w-4 h-4 text-[#ED805A]" />
            <span>Deterministic Fallback</span>
          </div>
          <p className="text-xs text-[#3E4542] leading-relaxed">
            Operates reliably offline or without external cloud LLM connections using explainable pattern-matching rules.
          </p>
        </div>
      </div>
    </div>
  );
}

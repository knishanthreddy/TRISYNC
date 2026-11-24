"use client";

import React from "react";
import {
  Activity,
  Cpu,
  ShieldAlert,
  Compass,
  Trophy,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { DimensionPill } from "@/components/ui/dimension-pill";

interface Feature {
  id: string;
  dimension: "physical" | "mental" | "digital" | "unified";
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  highlightMetric: string;
  accentColor: string;
}

const FEATURES: Feature[] = [
  {
    id: "fitness-digital-twin",
    dimension: "physical",
    icon: Activity,
    title: "Fitness Digital Twin",
    tagline: "Biometric simulation & recovery forecasting",
    description:
      "A dynamic, privacy-conscious model of your physical vitality. Simulates how varying exertion, sleep deficits, and active recovery calibrate your stamina for upcoming days.",
    highlightMetric: "Real-time Circadian Load Projection",
    accentColor: "#183C32",
  },
  {
    id: "intelligence-engine",
    dimension: "unified",
    icon: Cpu,
    title: "TRISYNC Intelligence Engine",
    tagline: "Cross-dimensional neural synthesis",
    description:
      "Analyzes the delicate feedback loops connecting physical movement, cognitive clarity, and screen consumption. Uncovers invisible ripple effects across your day.",
    highlightMetric: "Tri-Directional Pattern Matching",
    accentColor: "#183C32",
  },
  {
    id: "smart-distraction-prediction",
    dimension: "digital",
    icon: ShieldAlert,
    title: "Smart Distraction Prediction",
    tagline: "Proactive cognitive vulnerability safeguards",
    description:
      "Anticipates moments of mental fatigue when compulsive doomscrolling and digital fragmentation typically strike, placing gentle ambient boundaries before friction escalates.",
    highlightMetric: "Identifies Pre-Fatigue Screen Traps",
    accentColor: "#46C5B0",
  },
  {
    id: "context-aware-recommendations",
    dimension: "mental",
    icon: Compass,
    title: "Context-Aware Recommendations",
    tagline: "Adaptive micro-rituals for your exact headspace",
    description:
      "Never delivers robotic alerts. Nudges adapt seamlessly to whether you are in a professional focus block, transitioning between meetings, or winding down for sleep.",
    highlightMetric: "Dynamic Headspace Contexting",
    accentColor: "#7B59BA",
  },
  {
    id: "daily-wellness-missions",
    dimension: "unified",
    icon: Target,
    title: "Daily Wellness Missions",
    tagline: "Bite-sized, synchronized micro-actions",
    description:
      "Daily 5-to-15 minute holistic missions designed to synchronize your body, mind, and device habits in a single purposeful flow.",
    highlightMetric: "Tri-Sync Mission Cadence",
    accentColor: "#183C32",
  },
  {
    id: "games-and-rewards",
    dimension: "digital",
    icon: Trophy,
    title: "Games & Resonance Rewards",
    tagline: "Playful equilibrium without addiction mechanics",
    description:
      "Earn Resonance Points, unlock digital equilibrium badges, and level up your personal ecosystem through steady, sustainable harmony rather than excessive screen engagement.",
    highlightMetric: "Sustainable Equilibrium Streaks",
    accentColor: "#ED805A",
  },
];

export const SignatureFeatures: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183C32]/8 text-xs font-medium text-[#183C32]">
          <Sparkles className="w-3.5 h-3.5 text-[#46C5B0]" />
          <span>Intelligent Ecosystem Capabilities</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-light text-[#183C32] tracking-tight">
          Engineered for Balance. <span className="italic font-normal">Designed for You.</span>
        </h3>
        <p className="text-sm sm:text-base text-[#3E4542]/85 leading-relaxed">
          Six signature intelligence capabilities crafted with organic futurism, rigorous data consent,
          and a deep commitment to human flourishing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="rounded-2xl p-7 bg-[#FAF8F4] border border-[#183C32]/10 hover:border-[#183C32]/25 hover:shadow-soft transition-all duration-200 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-center text-[#183C32] shadow-subtle group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <DimensionPill dimension={feat.dimension} size="sm" subtle />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-[#222624] tracking-tight">
                    {feat.title}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#3E4542] opacity-80">
                    {feat.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#3E4542] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#183C32]/10 flex items-center justify-between text-xs text-[#183C32] font-medium">
                <span className="font-mono text-[11px] text-[#3E4542]">
                  {feat.highlightMetric}
                </span>
                <Link
                  href="/app/overview"
                  className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

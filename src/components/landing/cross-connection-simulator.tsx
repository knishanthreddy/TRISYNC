"use client";

import React, { useState } from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Moon,
  Zap,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from "lucide-react";

interface Scenario {
  id: string;
  triggerDimension: "digital" | "physical" | "mental";
  title: string;
  triggerEvent: string;
  firstOrderImpact: {
    dimension: "physical" | "mental" | "digital";
    effect: string;
    metric: string;
  };
  secondOrderImpact: {
    dimension: "physical" | "mental" | "digital";
    effect: string;
    metric: string;
  };
  suggestedAction: string;
  correlationConfidence: number; // e.g. 88%
  sampleSize: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "late-night-screens",
    triggerDimension: "digital",
    title: "Late-Night Screen Exposure & Sleep Architecture",
    triggerEvent: "High blue-spectrum phone interaction after 10:45 PM",
    firstOrderImpact: {
      dimension: "physical",
      effect: "38-minute delay in deep REM onset; elevated resting nocturnal HR",
      metric: "-22% Deep Rest",
    },
    secondOrderImpact: {
      dimension: "mental",
      effect: "Lower morning focus reserves & higher subjective afternoon irritability",
      metric: "-35% Cognitive Stamina",
    },
    suggestedAction:
      "Institute an automated 10:15 PM 'Twilight Screen Boundary' paired with 5 minutes of restorative physiological sighs.",
    correlationConfidence: 91,
    sampleSize: "18 recorded nights",
  },
  {
    id: "midday-sedentary-trap",
    triggerDimension: "physical",
    title: "Sedentary Lockout & Cognitive Fatigue",
    triggerEvent: "4.5 consecutive hours without postural change or step movement",
    firstOrderImpact: {
      dimension: "mental",
      effect: "Subtle escalation of cognitive friction and decision fatigue",
      metric: "+40% Mental Friction",
    },
    secondOrderImpact: {
      dimension: "digital",
      effect: "Compulsive tab-switching and doomscrolling during work tasks",
      metric: "+48m Unplanned Screentime",
    },
    suggestedAction:
      "Schedule a 4-minute micro-movement circuit every 90 minutes to restore prefrontal blood flow.",
    correlationConfidence: 86,
    sampleSize: "14 recorded sessions",
  },
  {
    id: "acute-work-stress",
    triggerDimension: "mental",
    title: "Elevated Cognitive Load & Evening Habits",
    triggerEvent: "Back-to-back high-intensity meetings without recovery pauses",
    firstOrderImpact: {
      dimension: "digital",
      effect: "Vulnerable to 'revenge bedtime procrastination' on streaming media",
      metric: "+1h 15m Late Screen Flow",
    },
    secondOrderImpact: {
      dimension: "physical",
      effect: "Higher next-morning cortisol, skipped workout, and sluggish recovery",
      metric: "-18% Recovery Index",
    },
    suggestedAction:
      "Trigger a 3-minute guided neural reset between high-stakes calls to bleed off cognitive pressure.",
    correlationConfidence: 84,
    sampleSize: "22 recorded days",
  },
];

export const CrossConnectionSimulator: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("late-night-screens");

  const current = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  return (
    <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-6 sm:p-10 lg:p-12 shadow-soft space-y-10">
      {/* Header & Principle Explanation */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183C32]/8 text-xs font-medium text-[#183C32]">
            <Sparkles className="w-3.5 h-3.5 text-[#46C5B0]" />
            <span>Interactive Multi-Dimensional Pattern Simulator</span>
          </div>

          <Badge variant="warning" size="sm">
            Observed Correlation &middot; Not Automatic Causation
          </Badge>
        </div>

        <h3 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
          How One Habit Echoes Across All Three Spheres
        </h3>

        <p className="text-sm sm:text-base text-[#3E4542]/85 max-w-3xl leading-relaxed">
          TRISYNC continuously observes the temporal resonance between your physical movement,
          cognitive headspace, and digital environment. Click each recorded pattern below to see
          how habits ripple.
        </p>
      </div>

      {/* Scenario Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`text-left p-4 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                isSelected
                  ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32] shadow-subtle"
                  : "bg-white text-[#222624] border-[#183C32]/10 hover:border-[#183C32]/25"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-mono text-[10px] uppercase opacity-75">
                  Pattern {sc.triggerDimension}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#46C5B0]" />}
              </div>
              <span className="font-medium text-sm leading-snug">{sc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Resonance Flow Pipeline */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F1E8] border border-[#183C32]/10 space-y-8">
        <div className="flex items-center justify-between text-xs font-mono text-[#3E4542] pb-2 border-b border-[#183C32]/10">
          <span>INTERACTION PIPELINE</span>
          <span className="text-[#183C32] font-semibold">
            Empirical Match: {current.correlationConfidence}% ({current.sampleSize})
          </span>
        </div>

        {/* 3-Stage Ripple */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Stage 1: The Trigger */}
          <div className="p-5 rounded-xl bg-white border border-[#183C32]/10 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <DimensionPill dimension={current.triggerDimension} size="sm" />
                <span className="text-[10px] font-mono text-[#3E4542]">Step 1: Input</span>
              </div>
              <h5 className="text-sm font-semibold text-[#222624]">Observed Habit</h5>
              <p className="text-xs text-[#3E4542] leading-relaxed">{current.triggerEvent}</p>
            </div>
            <div className="pt-2 text-[11px] font-medium text-[#183C32] flex items-center gap-1">
              <span>Ripples outward</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stage 2: First-Order Biological/Mental Effect */}
          <div className="p-5 rounded-xl bg-white border border-[#183C32]/10 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <DimensionPill dimension={current.firstOrderImpact.dimension} size="sm" />
                <span className="text-[10px] font-mono text-[#ED805A] font-semibold">
                  {current.firstOrderImpact.metric}
                </span>
              </div>
              <h5 className="text-sm font-semibold text-[#222624]">First-Order Resonance</h5>
              <p className="text-xs text-[#3E4542] leading-relaxed">
                {current.firstOrderImpact.effect}
              </p>
            </div>
            <div className="pt-2 text-[11px] font-medium text-[#7B59BA] flex items-center gap-1">
              <span>Compounding shift</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stage 3: Second-Order Downstream Shift */}
          <div className="p-5 rounded-xl bg-white border border-[#183C32]/10 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <DimensionPill dimension={current.secondOrderImpact.dimension} size="sm" />
                <span className="text-[10px] font-mono text-[#ED805A] font-semibold">
                  {current.secondOrderImpact.metric}
                </span>
              </div>
              <h5 className="text-sm font-semibold text-[#222624]">Downstream Shift</h5>
              <p className="text-xs text-[#3E4542] leading-relaxed">
                {current.secondOrderImpact.effect}
              </p>
            </div>
            <div className="pt-2 text-[11px] font-medium text-[#1A8A7A] flex items-center gap-1">
              <span>Harmonic opportunity</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* TRISYNC Suggested Harmonic Action */}
        <div className="p-5 rounded-xl bg-[#183C32] text-[#F5F1E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#46C5B0]" />
              <span className="text-xs uppercase font-mono tracking-wider text-[#A9B9A4]">
                TRISYNC Unified Prescription
              </span>
            </div>
            <p className="text-sm text-[#F5F1E8]/95 leading-relaxed">{current.suggestedAction}</p>
          </div>

          <div className="shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => alert(`Activated test routine for: ${current.title}`)}
            >
              Simulate Action
            </Button>
          </div>
        </div>

        {/* Transparent Causal Disclaimer */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FAF8F4] border border-[#183C32]/10 text-xs text-[#3E4542]">
          <Info className="w-4 h-4 text-[#183C32] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important Scientific Principle:</strong> TRISYNC measures correlated statistical patterns
            derived from your consented input data. We never confuse temporal coincidence with definitive medical
            causation. Recommendations are non-judgmental habits to experiment with, not clinical diagnoses.
          </p>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { MuscleRegion, TwinVisualLayer } from "./types";
import { REGION_TELEMETRY, HISTORICAL_MEASUREMENTS } from "./twin-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Ruler,
  Utensils,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  Info,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface TwinContextPanelProps {
  selectedRegion: MuscleRegion;
  activeLayer: TwinVisualLayer;
  onSelectRegion: (region: MuscleRegion) => void;
  onSelectLayer: (layer: TwinVisualLayer) => void;
  onActionTrigger?: (actionName: string) => void;
}

export const TwinContextPanel: React.FC<TwinContextPanelProps> = ({
  selectedRegion,
  activeLayer,
  onSelectRegion,
  onSelectLayer,
  onActionTrigger,
}) => {
  const currentTelemetry = REGION_TELEMETRY[selectedRegion] || REGION_TELEMETRY.all;

  const LAYER_CONFIG = [
    { id: "activity", label: "Activity", icon: Activity, desc: "Trained groups & volume" },
    { id: "measurements", label: "Measurements", icon: Ruler, desc: "Circumference & weight" },
    { id: "nutrition", label: "Nutrition", icon: Utensils, desc: "Macronutrients & fuel" },
    { id: "recovery", label: "Recovery", icon: HeartPulse, desc: "Rest & readiness score" },
    { id: "transformation", label: "Transformation", icon: Sparkles, desc: "Milestones & progress" },
  ] as const;

  const MUSCLE_REGIONS: { id: MuscleRegion; label: string }[] = [
    { id: "all", label: "Full Body" },
    { id: "chest", label: "Chest" },
    { id: "back", label: "Back" },
    { id: "shoulders", label: "Shoulders" },
    { id: "arms", label: "Arms" },
    { id: "core", label: "Core" },
    { id: "legs", label: "Legs" },
  ];

  return (
    <div className="space-y-6">
      {/* Visual Layer Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-[#3E4542]">
            Visual Layer
          </label>
          <span className="text-[11px] font-mono text-[#183C32] capitalize font-medium">
            Active: {activeLayer}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 rounded-2xl bg-white border border-[#183C32]/12 shadow-subtle">
          {LAYER_CONFIG.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => onSelectLayer(layer.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all text-center ${
                  isActive
                    ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                    : "text-[#3E4542] hover:text-[#183C32] hover:bg-[#FAF8F4]"
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isActive ? "text-[#46C5B0]" : "text-[#3E4542]"}`} />
                <span className="text-xs font-medium">{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Muscle Region Pills */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-[#3E4542]">
          Target Kinetic Region
        </label>
        <div className="flex flex-wrap gap-1.5">
          {MUSCLE_REGIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectRegion(m.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all capitalize ${
                selectedRegion === m.id
                  ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32] shadow-subtle"
                  : "bg-white text-[#222624] border-[#183C32]/15 hover:border-[#183C32]/35"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Telemetry & Contextual Display */}
      <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/15 space-y-5 shadow-soft">
        {/* Header with Title and Classification Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#183C32]/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#46C5B0] font-semibold">
                {selectedRegion === "all" ? "Systemic Overview" : "Regional Telemetry"}
              </span>
              <Badge variant="success" size="sm">
                {currentTelemetry.recoveryStatus}
              </Badge>
            </div>
            <h3 className="text-xl font-medium text-[#183C32] mt-0.5">
              {currentTelemetry.displayName}
            </h3>
          </div>

          {/* Scientific Transparency Badge */}
          <div className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#183C32]/5 text-[#183C32] border border-[#183C32]/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#183C32]" />
            <span>
              {activeLayer === "measurements"
                ? "Actual User Record"
                : activeLayer === "nutrition"
                ? "Calculated Estimate"
                : "Illustrative Sensor Model"}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#3E4542] leading-relaxed">
          {currentTelemetry.anatomicalNote}
        </p>

        {/* LAYER-SPECIFIC CONTENT BLOCKS */}

        {/* 1. ACTIVITY LAYER */}
        {activeLayer === "activity" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#183C32]/10">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Weekly Volume</div>
                <div className="text-xl font-light text-[#183C32] mt-0.5">
                  {currentTelemetry.weeklySets}{" "}
                  <span className="text-xs text-[#3E4542]">/ {currentTelemetry.targetWeeklySets} sets</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#183C32]/10 mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#183C32] rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (currentTelemetry.weeklySets / currentTelemetry.targetWeeklySets) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#183C32]/10">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Last Session</div>
                <div className="text-xs font-medium text-[#183C32] mt-1.5 leading-snug">
                  {currentTelemetry.lastTrained}
                </div>
                <div className="text-[10px] text-[#3E4542] mt-1 font-mono">Verified in Gym Log</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#183C32]">Recorded Exercises:</div>
              <div className="flex flex-wrap gap-1.5">
                {currentTelemetry.primaryExercises.map((ex, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-xl bg-white border border-[#183C32]/12 text-[#222624]"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Next Recommended Workout */}
            <div className="p-4 rounded-2xl bg-[#EEF3ED] border border-[#183C32]/15 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#183C32] font-semibold">
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>RECOMMENDED NEXT WORKOUT</span>
              </div>
              <p className="text-xs text-[#183C32]/90 leading-relaxed">
                {currentTelemetry.suggestedNextWorkout}
              </p>
            </div>
          </div>
        )}

        {/* 2. BODY MEASUREMENTS LAYER */}
        {activeLayer === "measurements" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#183C32]/10">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Current Measurement</div>
                <div className="text-lg font-light text-[#183C32] mt-0.5">
                  {currentTelemetry.recordedCircumference}
                </div>
                <div className="text-[10px] text-[#3E4542] mt-1 font-mono">Consented Tape Record</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#183C32]/10">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Progress Shift</div>
                <div className="text-lg font-medium text-[#1A8A7A] mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{currentTelemetry.deltaMeasurement}</span>
                </div>
                <div className="text-[10px] text-[#3E4542] mt-1 font-mono">Baseline: {currentTelemetry.baselineCircumference}</div>
              </div>
            </div>

            {/* Historical Measurement Mini Log */}
            <div className="p-4 rounded-2xl bg-white border border-[#183C32]/10 space-y-2.5">
              <div className="text-xs font-semibold text-[#183C32] flex items-center justify-between">
                <span>Consented Measurement Log</span>
                <span className="text-[10px] font-mono text-[#3E4542]">5 checkpoints</span>
              </div>
              <div className="space-y-1.5">
                {HISTORICAL_MEASUREMENTS.slice(-3).map((rec, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-[#183C32]/5 last:border-none">
                    <span className="font-mono text-[#3E4542]">{rec.date}</span>
                    <span className="font-medium text-[#183C32]">Weight: {rec.weightKg} kg</span>
                    <span className="text-[#3E4542]">Waist: {rec.waistCm} cm</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. NUTRITION LAYER */}
        {activeLayer === "nutrition" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#183C32]/10">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Protein Support Allocation</div>
                <div className="text-xl font-light text-[#183C32] mt-0.5">
                  {currentTelemetry.proteinAllocatedGrams}g{" "}
                  <span className="text-xs text-[#3E4542]">/ {currentTelemetry.targetProteinGrams}g target</span>
                </div>
                <div className="text-[10px] text-[#3E4542] mt-1 font-mono">Sufficient for MPS stimulus</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#183C32]/10">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Glycogen Saturation</div>
                <div className="text-base font-medium text-[#183C32] capitalize mt-1">
                  {currentTelemetry.glycogenStatus}
                </div>
                <div className="text-[10px] text-[#3E4542] mt-1 font-mono">Fuelled by complex carbs</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#183C32]/10 text-xs text-[#3E4542] leading-relaxed">
              <strong>Indian Nutrition Contribution:</strong> Today&apos;s logged Paneer Bhurji (18.4g protein) and Moong Dal Tadka (12.8g protein) contributed to post-workout recovery.
            </div>
          </div>
        )}

        {/* 4. RECOVERY LAYER */}
        {activeLayer === "recovery" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-white border border-[#183C32]/10 text-center">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Readiness</div>
                <div className="text-xl font-medium text-[#183C32] mt-0.5">
                  {currentTelemetry.recoveryScore}%
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-[#183C32]/10 text-center">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Soreness</div>
                <div className="text-xl font-light text-[#183C32] mt-0.5">
                  {currentTelemetry.sorenessScore} <span className="text-xs text-[#3E4542]">/ 10</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-[#183C32]/10 text-center">
                <div className="text-[10px] font-mono uppercase text-[#3E4542]">Rest Days</div>
                <div className="text-xl font-light text-[#183C32] mt-0.5">
                  {currentTelemetry.restDaysSinceTrained}d
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#183C32]/10 text-xs text-[#3E4542] leading-relaxed">
              <strong>Circadian Rest Link:</strong> Supported by 7 hrs 42 mins of restorative sleep recorded last night. Central nervous system ready for moderate to high loading.
            </div>
          </div>
        )}

        {/* 5. TRANSFORMATION LAYER */}
        {activeLayer === "transformation" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-[#183C32]/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#183C32]">
                <span>{currentTelemetry.milestoneTitle}</span>
                <span className="font-mono">{currentTelemetry.milestoneProgressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#183C32]/10 overflow-hidden">
                <div
                  className="h-full bg-[#183C32] rounded-full"
                  style={{ width: `${currentTelemetry.milestoneProgressPercent}%` }}
                />
              </div>
              <p className="text-xs text-[#3E4542] pt-1">
                {currentTelemetry.milestoneNotes}
              </p>
            </div>
          </div>
        )}

        {/* Interactive Action Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            rightIcon={<ChevronRight className="w-4 h-4" />}
            onClick={() => {
              if (onActionTrigger) {
                onActionTrigger(`Schedule workout for ${currentTelemetry.displayName}`);
              }
            }}
          >
            Add Next Routine to Schedule
          </Button>
        </div>

        {/* Medical / Scientific Truthfulness Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-[#F5F1E8] border border-[#183C32]/10 flex items-start gap-2.5 text-[11px] text-[#3E4542] leading-relaxed">
          <Info className="w-4 h-4 text-[#183C32] shrink-0 mt-0.5" />
          <span>
            <strong>No Anatomical Faking:</strong> TRISYNC distinguishes verified measurements from calculated estimates and illustrative visualizations. Workouts and single meals do not immediately alter physical tissue.
          </span>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LineChart as LineChartIcon,
  Sparkles,
  Zap,
  Info,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const trendData = [
  { day: "Mon", physical: 78, mental: 82, digital: 72 },
  { day: "Tue", physical: 84, mental: 80, digital: 68 },
  { day: "Wed", physical: 68, mental: 64, digital: 50 },
  { day: "Thu", physical: 88, mental: 89, digital: 84 },
  { day: "Fri", physical: 92, mental: 86, digital: 80 },
  { day: "Sat", physical: 94, mental: 94, digital: 90 },
  { day: "Sun", physical: 88, mental: 90, digital: 86 },
];

export default function InsightsPage() {
  const [activeDimensionFilter, setActiveDimensionFilter] = useState<"all" | "physical" | "mental" | "digital">("all");

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
            Pattern Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight mt-1">
            Cross-Dimensional Insights
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Discovering subtle interactions between movement, cognitive fatigue, and screen time boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" size="sm">
            Empirical Patterns &middot; Not Medical Proof
          </Badge>
        </div>
      </div>

      {/* Main Longitudinal Trend Stream Chart */}
      <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-[#183C32]">7-Day Tri-Sync Resonance Stream</h3>
            <p className="text-xs text-[#3E4542]/80 mt-0.5">
              Comparative alignment between Physical Vitality, Mental Clarity, and Digital Flow.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveDimensionFilter("all")}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                activeDimensionFilter === "all"
                  ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]"
                  : "bg-white text-[#222624] border-[#183C32]/15"
              }`}
            >
              Unified Stream
            </button>
            <button
              onClick={() => setActiveDimensionFilter("physical")}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                activeDimensionFilter === "physical"
                  ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]"
                  : "bg-white text-[#222624] border-[#183C32]/15"
              }`}
            >
              Physical Only
            </button>
            <button
              onClick={() => setActiveDimensionFilter("mental")}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                activeDimensionFilter === "mental"
                  ? "bg-[#7B59BA] text-white border-[#7B59BA]"
                  : "bg-white text-[#222624] border-[#183C32]/15"
              }`}
            >
              Mental Only
            </button>
            <button
              onClick={() => setActiveDimensionFilter("digital")}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                activeDimensionFilter === "digital"
                  ? "bg-[#1A8A7A] text-white border-[#1A8A7A]"
                  : "bg-white text-[#222624] border-[#183C32]/15"
              }`}
            >
              Digital Only
            </button>
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="streamPhysical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#183C32" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#183C32" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="streamMental" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B9A5DF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#B9A5DF" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="streamDigital" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#46C5B0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#46C5B0" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#3E4542" fontSize={12} tickLine={false} />
              <YAxis dataKey="physical" stroke="#3E4542" fontSize={12} tickLine={false} domain={[40, 100]} />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "#FAF8F4",
                  borderColor: "rgba(24, 60, 50, 0.15)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              {(activeDimensionFilter === "all" || activeDimensionFilter === "physical") && (
                <Area
                  type="monotone"
                  dataKey="physical"
                  stroke="#183C32"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#streamPhysical)"
                />
              )}
              {(activeDimensionFilter === "all" || activeDimensionFilter === "mental") && (
                <Area
                  type="monotone"
                  dataKey="mental"
                  stroke="#7B59BA"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#streamMental)"
                />
              )}
              {(activeDimensionFilter === "all" || activeDimensionFilter === "digital") && (
                <Area
                  type="monotone"
                  dataKey="digital"
                  stroke="#1A8A7A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#streamDigital)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Observed Statistical Pattern Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
          Current Detected Correlations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Correlation Card 1 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <DimensionPill dimension="digital" size="sm" />
                  <span className="text-xs text-[#3E4542]">&rarr;</span>
                  <DimensionPill dimension="physical" size="sm" />
                </div>
                <span className="text-[11px] font-mono font-medium text-[#ED805A]">
                  91% Correlation
                </span>
              </div>

              <h4 className="text-base font-medium text-[#222624]">
                Late Screen Exposure vs. REM Sleep Onset
              </h4>

              <p className="text-xs text-[#3E4542] leading-relaxed">
                When blue-spectrum devices remain active after 10:45 PM, deep restorative REM onset is
                delayed by an average of 38 minutes, elevating nocturnal resting heart rate by 4 bpm.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#183C32]/10 text-xs text-[#183C32] space-y-1">
              <span className="font-semibold">Suggested Evening Micro-Action:</span>
              <p className="text-[11px] text-[#183C32]/85">
                Enable Twilight Screen Shift at 10:15 PM and transition to 5 minutes of physical stretching.
              </p>
            </div>
          </div>

          {/* Correlation Card 2 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <DimensionPill dimension="physical" size="sm" />
                  <span className="text-xs text-[#3E4542]">&rarr;</span>
                  <DimensionPill dimension="mental" size="sm" />
                </div>
                <span className="text-[11px] font-mono font-medium text-[#1A8A7A]">
                  86% Correlation
                </span>
              </div>

              <h4 className="text-base font-medium text-[#222624]">
                Sedentary Posture vs. Afternoon Mental Friction
              </h4>

              <p className="text-xs text-[#3E4542] leading-relaxed">
                Sessions exceeding 4 continuous hours of desk sitting show a 40% rise in compulsive tab-switching
                and reported cognitive fatigue between 2:00 PM and 4:30 PM.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F0FA] border border-[#B9A5DF]/35 text-xs text-[#603E99] space-y-1">
              <span className="font-semibold">Suggested Midday Micro-Action:</span>
              <p className="text-[11px] text-[#603E99]/85">
                Insert a 4-minute somatic movement circuit between focus blocks to refresh cerebral blood flow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Disclaimer Callout */}
      <div className="p-4 rounded-xl bg-[#FDF1EC]/60 border border-[#ED805A]/25 flex items-start gap-3 text-xs text-[#3E4542]">
        <Info className="w-4 h-4 text-[#ED805A] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Scientific Principle:</strong> These interactions represent empirical associations observed
          across your personal time-series data. TRISYNC presents patterns as supportive self-knowledge rather
          than deterministic clinical proof.
        </p>
      </div>
    </div>
  );
}

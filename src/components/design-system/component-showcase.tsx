"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Tooltip } from "@/components/ui/tooltip";
import { LoadingState, EmptyState, ErrorState, SuccessState } from "@/components/ui/states";
import {
  Sparkles,
  Search,
  Lock,
  ArrowRight,
  Sliders,
  Check,
  Eye,
  Info,
  Calendar,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

// Sample calibration data for the multi-dimensional chart
const sampleSyncData = [
  { day: "Mon", physical: 78, mental: 84, digital: 70 },
  { day: "Tue", physical: 82, mental: 79, digital: 65 },
  { day: "Wed", physical: 65, mental: 62, digital: 48 },
  { day: "Thu", physical: 88, mental: 91, digital: 82 },
  { day: "Fri", physical: 90, mental: 86, digital: 79 },
  { day: "Sat", physical: 94, mental: 95, digital: 91 },
  { day: "Sun", physical: 89, mental: 92, digital: 88 },
];

export const ComponentShowcase: React.FC = () => {
  // Interactive state handlers
  const [btnLoading, setBtnLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStateTab, setActiveStateTab] = useState<"loading" | "empty" | "error" | "success">("loading");
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleTestValidate = (val: string) => {
    setInputValue(val);
    if (val.length > 0 && val.length < 4) {
      setInputError("Minimum 4 characters required for metric label.");
    } else {
      setInputError("");
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. BUTTON SYSTEM */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#183C32]/10">
          <div>
            <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
              1. Button Architecture
            </h3>
            <p className="text-xs text-[#3E4542]/80">
              Primary, secondary, outline, ghost, and dimension-themed buttons with loading & icon slots.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBtnLoading(true);
              setTimeout(() => setBtnLoading(false), 2000);
            }}
          >
            {btnLoading ? "Resetting..." : "Simulate Loading State"}
          </Button>
        </div>

        {/* Button Variants */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" isLoading={btnLoading}>
            Primary Forest
          </Button>
          <Button variant="secondary">Secondary Ivory</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost Action</Button>
          <Button variant="physical" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Physical Sync
          </Button>
          <Button variant="mental" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Mental Focus
          </Button>
          <Button variant="digital" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Digital Balance
          </Button>
        </div>

        {/* Button Sizes */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button size="sm" variant="secondary">
            Small (36px)
          </Button>
          <Button size="md" variant="secondary">
            Medium Default (44px)
          </Button>
          <Button size="lg" variant="secondary">
            Large (52px)
          </Button>
          <Button size="md" variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
            With Left Icon
          </Button>
          <Button size="md" variant="primary" disabled>
            Disabled State
          </Button>
        </div>
      </section>

      {/* 2. DIMENSION IDENTITIES & PILLS */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[#183C32]/10">
          <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
            2. Dimensional Color Identities & Semantic Badges
          </h3>
          <p className="text-xs text-[#3E4542]/80">
            Physical (Forest & Sage), Mental (Lavender & Soft Neutrals), Digital (Electric Teal & Terracotta), and Unified Tri-Sync.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#EEF3ED] border border-[#183C32]/15 space-y-2">
            <DimensionPill dimension="physical" />
            <h5 className="text-sm font-medium text-[#183C32] pt-1">Physical Wellbeing</h5>
            <p className="text-xs text-[#183C32]/80 leading-relaxed">
              Anchor: Forest Green (#183C32) & Muted Sage (#A9B9A4).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F0FA] border border-[#B9A5DF]/35 space-y-2">
            <DimensionPill dimension="mental" />
            <h5 className="text-sm font-medium text-[#603E99] pt-1">Mental Wellbeing</h5>
            <p className="text-xs text-[#603E99]/80 leading-relaxed">
              Anchor: Soft Lavender (#B9A5DF) & soft meditative tones.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#E3FAF5] border border-[#46C5B0]/30 space-y-2">
            <DimensionPill dimension="digital" />
            <h5 className="text-sm font-medium text-[#0F685B] pt-1">Digital Wellbeing</h5>
            <p className="text-xs text-[#0F685B]/80 leading-relaxed">
              Anchor: Electric Teal (#46C5B0) & Terracotta (#ED805A).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#183C32]/20 space-y-2">
            <DimensionPill dimension="unified" />
            <h5 className="text-sm font-medium text-[#222624] pt-1">Unified Intelligence</h5>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              Three spheres synchronized into one personal health narrative.
            </p>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Badge variant="success">Optimal Alignment</Badge>
          <Badge variant="warning">Needs Calibration</Badge>
          <Badge variant="info">Correlated Pattern</Badge>
          <Badge variant="neutral">Passive Baseline</Badge>
        </div>
      </section>

      {/* 3. INPUTS & FORM CONTROLS */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[#183C32]/10">
          <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
            3. Form Controls & Validation
          </h3>
          <p className="text-xs text-[#3E4542]/80">
            Clean inputs with left/right icons, password visibility toggling, error messages, and success feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Metric Label"
            placeholder="e.g. Deep Sleep Recovery"
            value={inputValue}
            onChange={(e) => handleTestValidate(e.target.value)}
            helperText="Type fewer than 4 chars to test dynamic error state."
            error={inputError}
            leftIcon={<Search className="w-4 h-4" />}
          />

          <Input
            label="Consented Secure Key"
            type="password"
            defaultValue="sample_health_credential"
            helperText="Click eye icon to toggle secure display."
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Input
            label="Calibrated Target"
            defaultValue="7.5 hours / night"
            success
            helperText="Validated against personal rhythm baseline."
          />
        </div>
      </section>

      {/* 4. CARDS & VISUAL HIERARCHY */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[#183C32]/10">
          <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
            4. Cards, Depth & Whitespace Hierarchy
          </h3>
          <p className="text-xs text-[#3E4542]/80">
            Minimal surfaces avoiding generic dashboard clutter: Standard, Elevated, and Interactive cards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center justify-between">
                <DimensionPill dimension="physical" size="sm" subtle />
                <Badge variant="success" size="sm">Optimal</Badge>
              </div>
              <CardTitle className="mt-3">Circadian Activity Score</CardTitle>
              <CardDescription>
                Consolidated daily movement and recovery cycles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-[#183C32]">88</span>
                <span className="text-xs text-[#3E4542] font-mono">/ 100</span>
              </div>
              <p className="text-xs text-[#3E4542]/75 mt-2">
                +4% above baseline following consistent evening wind-down.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" onClick={() => setModalOpen(true)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <DimensionPill dimension="mental" size="sm" subtle />
                <Badge variant="info" size="sm">Interactive</Badge>
              </div>
              <CardTitle className="mt-3">Cognitive Friction Index</CardTitle>
              <CardDescription>
                Click this card to trigger the modal dialog demonstration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-[#7B59BA]">24</span>
                <span className="text-xs text-[#3E4542] font-mono">low friction</span>
              </div>
              <p className="text-xs text-[#7B59BA] mt-2 font-medium flex items-center gap-1">
                <span>Open calibration dialog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <DimensionPill dimension="digital" size="sm" subtle />
                <Badge variant="warning" size="sm">Attention</Badge>
              </div>
              <CardTitle className="mt-3">Late Screen Exposure</CardTitle>
              <CardDescription>
                Blue spectrum device interaction after 10:30 PM.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-[#ED805A]">42m</span>
                <span className="text-xs text-[#3E4542] font-mono">threshold 20m</span>
              </div>
              <p className="text-xs text-[#3E4542]/75 mt-2">
                Correlates directly with a 28-minute delay in deep REM onset.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. TOOLTIPS & MICRO-INTERACTIONS */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[#183C32]/10">
          <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
            5. Tooltips & Micro-interactions
          </h3>
          <p className="text-xs text-[#3E4542]/80">
            Hover or focus over indicators to view contextual intelligence without visual noise.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10">
          <Tooltip content="Deep Forest indicates physical biological grounding" position="top">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#183C32]/10 text-xs font-medium text-[#183C32] cursor-help">
              <Info className="w-3.5 h-3.5" />
              Hover for Top Tooltip
            </span>
          </Tooltip>

          <Tooltip content="Soft Lavender represents cognitive calm & focus" position="bottom">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B9A5DF]/25 text-xs font-medium text-[#603E99] cursor-help">
              <Info className="w-3.5 h-3.5" />
              Hover for Bottom Tooltip
            </span>
          </Tooltip>

          <Tooltip content="Electric Teal marks active digital flow & boundaries" position="right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#46C5B0]/20 text-xs font-medium text-[#1A8A7A] cursor-help">
              <Info className="w-3.5 h-3.5" />
              Hover for Right Tooltip
            </span>
          </Tooltip>
        </div>
      </section>

      {/* 6. DATA VISUALIZATION SPECIMEN */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-[#183C32]/10">
          <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
            6. Multi-Dimensional Data Visualization Style
          </h3>
          <p className="text-xs text-[#3E4542]/80">
            Harmonious multi-dimensional trend charts over Warm Ivory canvas. Physical (Forest), Mental (Lavender), Digital (Teal).
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
            <div>
              <h4 className="text-base font-medium text-[#222624]">
                Weekly Tri-Sync Correlation Stream
              </h4>
              <p className="text-xs text-[#3E4542]/70 mt-0.5">
                Sample weekly synthesis showing synchronized recovery and cognitive clarity.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#183C32]" />
                <span className="text-[#222624] font-medium">Physical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#B9A5DF]" />
                <span className="text-[#222624] font-medium">Mental</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#46C5B0]" />
                <span className="text-[#222624] font-medium">Digital</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleSyncData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPhysical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#183C32" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#183C32" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradMental" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B9A5DF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B9A5DF" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradDigital" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#46C5B0" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#46C5B0" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#3E4542"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(24, 60, 50, 0.12)" }}
                />
                <YAxis
                  stroke="#3E4542"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(24, 60, 50, 0.12)" }}
                  domain={[40, 100]}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#FAF8F4",
                    borderColor: "rgba(24, 60, 50, 0.15)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(24, 60, 50, 0.08)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="physical"
                  stroke="#183C32"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradPhysical)"
                />
                <Area
                  type="monotone"
                  dataKey="mental"
                  stroke="#7B59BA"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradMental)"
                />
                <Area
                  type="monotone"
                  dataKey="digital"
                  stroke="#1A8A7A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gradDigital)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 7. REUSABLE APPLICATION STATES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#183C32]/10">
          <div>
            <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
              7. Reusable Operational States
            </h3>
            <p className="text-xs text-[#3E4542]/80">
              Loading, empty, error, and success states crafted to maintain calm and predictability.
            </p>
          </div>

          {/* State Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F4] border border-[#183C32]/10 text-xs">
            {(["loading", "empty", "error", "success"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveStateTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                  activeStateTab === tab
                    ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                    : "text-[#3E4542] hover:text-[#183C32]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* State Preview */}
        <div className="transition-all duration-200">
          {activeStateTab === "loading" && (
            <LoadingState
              title="Calibrating Tri-Sync Intelligence Engine"
              description="Synthesizing biometric rhythms, mindfulness logs, and screen time boundaries into one correlation graph."
            />
          )}

          {activeStateTab === "empty" && (
            <EmptyState
              title="No Consented Data Sources Connected"
              description="To discover correlations between physical, mental, and digital wellbeing, connect an authorized data source or input a daily check-in."
              actionLabel="Connect Consented Source"
              onAction={() => alert("Consent authorization flow initialized.")}
            />
          )}

          {activeStateTab === "error" && (
            <ErrorState
              title="Biometric Stream Interrupted"
              description="Unable to reach the secure synchronization endpoint. Your offline baseline remains safely stored."
              onRetry={() => alert("Re-establishing encrypted handshake...")}
            />
          )}

          {activeStateTab === "success" && (
            <SuccessState
              title="Tri-Sync Equilibrium Established"
              description="Your physical, mental, and digital patterns for today are calibrated. No conflicting stressors detected."
              actionLabel="View Synthesis Report"
              onAction={() => alert("Navigating to daily synthesis...")}
            />
          )}
        </div>
      </section>

      {/* Interactive Modal Demonstrator */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Cross-Dimensional Insight Calibration"
        description="Verify how your digital downtime directly impacted REM sleep quality last night."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setModalOpen(false);
                alert("Calibration setting saved.");
              }}
            >
              Apply to Baseline
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#183C32]/10 text-xs text-[#183C32] flex items-center justify-between">
            <span className="font-medium">Observed Correlation:</span>
            <span>+38 min restorative sleep when screens darken by 10:00 PM</span>
          </div>
          <p className="text-xs text-[#3E4542] leading-relaxed">
            TRISYNC uses non-judgmental pattern recognition. Rather than restricting device access,
            we present the measured trade-off between late evening notifications and your morning cognitive stamina.
          </p>
        </div>
      </Modal>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroThreeScene } from "@/components/canvas/hero-three-scene";
import {
  Activity,
  Brain,
  Sparkles,
  Sliders,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function MyUniversePage() {
  const { user } = useAuth();
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<"physical" | "mental" | "digital">("physical");
  const [wearableConnected, setWearableConnected] = useState(true);
  const [screenLoggerActive, setScreenLoggerActive] = useState(true);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
            Tri-Dimensional Space
          </span>
          <h1 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight mt-1">
            My Personal Universe
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            An interactive multi-dimensional representation of your bodily vitality, mental headspace, and digital boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" size="md">
            Harmonic Resonance: {user?.syncScore || 86}%
          </Badge>
        </div>
      </div>

      {/* Main 3D Universe Visualizer Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Universe Orbit Visual */}
        <div className="lg:col-span-7">
          <div className="relative w-full aspect-square max-w-[580px] mx-auto rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 shadow-elevated p-6 flex flex-col justify-between overflow-hidden">
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#3E4542]">
              <span className="px-3 py-1 rounded-md bg-white/90 border border-[#183C32]/10">
                UNIVERSE TOPOLOGY &middot; 3D ENGINE
              </span>
              <span className="px-3 py-1 rounded-md bg-white/90 border border-[#183C32]/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#46C5B0] animate-pulse" />
                Live Orbit Sync
              </span>
            </div>

            <div className="absolute inset-0 z-0">
              <HeroThreeScene />
            </div>

            <div className="relative z-10 bg-white/90 backdrop-blur-md border border-[#183C32]/12 rounded-2xl p-4 text-xs text-[#222624] space-y-2">
              <div className="flex items-center justify-between font-medium">
                <span className="text-[#183C32]">Tri-Sync Resonant State</span>
                <span className="text-[#1A8A7A]">3 Spheres in Dynamic Resonance</span>
              </div>
              <p className="text-[11px] text-[#3E4542]/80 leading-relaxed">
                Click the telemetry cards on the right to simulate incoming signals from your consented sources.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Telemetry Controls & Orbit Inspection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-1 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 grid grid-cols-3 text-xs">
            {(["physical", "mental", "digital"] as const).map((dim) => (
              <button
                key={dim}
                onClick={() => setActiveTelemetryTab(dim)}
                className={`py-2 px-3 rounded-xl capitalize font-medium transition-all ${
                  activeTelemetryTab === dim
                    ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                    : "text-[#3E4542] hover:text-[#183C32]"
                }`}
              >
                {dim} Orbit
              </button>
            ))}
          </div>

          {/* Orbit Telemetry Detail */}
          {activeTelemetryTab === "physical" && (
            <div className="rounded-2xl p-6 bg-[#EEF3ED] border border-[#183C32]/15 space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <DimensionPill dimension="physical" />
                <Activity className="w-5 h-5 text-[#183C32]" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#183C32]">Physical Vitality Orbit</h3>
                <p className="text-xs text-[#183C32]/80 mt-1 leading-relaxed">
                  Reflects cardiovascular equilibrium, sleep latency, and circadian motion.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-[#183C32]/10">
                  <div className="text-[10px] font-mono text-[#3E4542]">RESTING HR</div>
                  <div className="text-lg font-light text-[#183C32]">58 bpm</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#183C32]/10">
                  <div className="text-[10px] font-mono text-[#3E4542]">CIRCADIAN SLEEP</div>
                  <div className="text-lg font-light text-[#183C32]">7h 24m</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#183C32] pt-2">
                <span>Wearable Handshake</span>
                <button
                  onClick={() => setWearableConnected(!wearableConnected)}
                  className="font-medium underline"
                >
                  {wearableConnected ? "Connected (Consented)" : "Disconnected"}
                </button>
              </div>
            </div>
          )}

          {activeTelemetryTab === "mental" && (
            <div className="rounded-2xl p-6 bg-[#F4F0FA] border border-[#B9A5DF]/40 space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <DimensionPill dimension="mental" />
                <Brain className="w-5 h-5 text-[#7B59BA]" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#603E99]">Mental Clarity Orbit</h3>
                <p className="text-xs text-[#603E99]/80 mt-1 leading-relaxed">
                  Monitors cognitive endurance, task focus blocks, and mindfulness resets.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-[#B9A5DF]/30">
                  <div className="text-[10px] font-mono text-[#3E4542]">COGNITIVE FRICTION</div>
                  <div className="text-lg font-light text-[#603E99]">22% (Low)</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#B9A5DF]/30">
                  <div className="text-[10px] font-mono text-[#3E4542]">MINDFULNESS PULSE</div>
                  <div className="text-lg font-light text-[#603E99]">12 min</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#603E99] pt-2">
                <span>Daily Subjective Check</span>
                <span className="font-medium">Logged & Validated</span>
              </div>
            </div>
          )}

          {activeTelemetryTab === "digital" && (
            <div className="rounded-2xl p-6 bg-[#E3FAF5] border border-[#46C5B0]/35 space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <DimensionPill dimension="digital" />
                <Sparkles className="w-5 h-5 text-[#1A8A7A]" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#0F685B]">Digital Habits Orbit</h3>
                <p className="text-xs text-[#0F685B]/80 mt-1 leading-relaxed">
                  Measures intentionality in device screentime, notification discipline, and twilight rest.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-[#46C5B0]/25">
                  <div className="text-[10px] font-mono text-[#3E4542]">ACTIVE SCREEN FLOW</div>
                  <div className="text-lg font-light text-[#0F685B]">1h 48m</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#46C5B0]/25">
                  <div className="text-[10px] font-mono text-[#3E4542]">TWILIGHT BOUNDARY</div>
                  <div className="text-lg font-light text-[#0F685B]">10:20 PM</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#0F685B] pt-2">
                <span>Boundary Logger</span>
                <button
                  onClick={() => setScreenLoggerActive(!screenLoggerActive)}
                  className="font-medium underline"
                >
                  {screenLoggerActive ? "Active (Consented)" : "Paused"}
                </button>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF8F4] border border-[#183C32]/10 text-xs text-[#3E4542]">
            <ShieldCheck className="w-4 h-4 text-[#183C32] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Consented Telemetry Only:</strong> Your universe reflects only inputs you have explicitly granted.
              Disconnecting a source immediately halts local processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  Heart,
  ShieldCheck,
} from "lucide-react";

interface RewardMission {
  id: string;
  title: string;
  desc: string;
  points: number;
  duration: string;
  dimension: "physical" | "mental" | "digital" | "unified";
  completed: boolean;
}

const INITIAL_MISSIONS: RewardMission[] = [
  {
    id: "m-walk",
    title: "Circadian Sunlight Walking Circuit",
    desc: "15 minutes of outdoor light within 60 minutes of waking.",
    points: 50,
    duration: "15 min",
    dimension: "physical",
    completed: true,
  },
  {
    id: "m-breathe",
    title: "Physiological Sigh Headspace Pause",
    desc: "3 double-inhale breathing resets during peak focus.",
    points: 35,
    duration: "4 min",
    dimension: "mental",
    completed: true,
  },
  {
    id: "m-screen",
    title: "Twilight Screen Shift Before 10:15 PM",
    desc: "Dim displays to warm spectrum 45m before target sleep.",
    points: 60,
    duration: "Evening",
    dimension: "digital",
    completed: false,
  },
  {
    id: "m-posture",
    title: "Midday Somatic Mobility Reset",
    desc: "Gentle spinal decompressive posture sequence.",
    points: 40,
    duration: "5 min",
    dimension: "physical",
    completed: false,
  },
];

const BADGES = [
  {
    id: "b-circadian",
    title: "Circadian Guardian",
    desc: "Maintained 7 consecutive sleep onset windows within 20m of baseline.",
    dimension: "physical" as const,
    unlocked: true,
  },
  {
    id: "b-twilight",
    title: "Twilight Screen Master",
    desc: "5 consecutive nights with screen dark mode active before 10:15 PM.",
    dimension: "digital" as const,
    unlocked: true,
  },
  {
    id: "b-somatic",
    title: "Somatic Reset Pioneer",
    desc: "Logged 10 daytime mobility breaks between deep focus sprints.",
    dimension: "physical" as const,
    unlocked: true,
  },
  {
    id: "b-tri",
    title: "Tri-Sync Equilibrium",
    desc: "Sustained all three dimensions above 80% resonance for 14 days.",
    dimension: "unified" as const,
    unlocked: true,
  },
  {
    id: "b-monk",
    title: "Digital Boundary Monk",
    desc: "Completed an uninterrupted 4-hour weekend offline immersion.",
    dimension: "digital" as const,
    unlocked: false,
  },
  {
    id: "b-clarity",
    title: "Cognitive Stillness",
    desc: "Logged 20 mindfulness pulses across a calendar month.",
    dimension: "mental" as const,
    unlocked: false,
  },
];

export default function PlayAndRewardsPage() {
  const { user } = useAuth();
  const [missions, setMissions] = useState<RewardMission[]>(INITIAL_MISSIONS);
  const [totalPoints, setTotalPoints] = useState(1420);

  const toggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextState = !m.completed;
          setTotalPoints((pts) => pts + (nextState ? m.points : -m.points));
          return { ...m, completed: nextState };
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
            Playful Equilibrium
          </span>
          <h1 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight mt-1">
            Play & Resonance Rewards
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Rewarding sustainable life balance through meaningful micro-missions, not addictive screen time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F4] border border-[#183C32]/10 text-xs">
            <Flame className="w-4 h-4 text-[#ED805A]" />
            <span className="font-semibold text-[#183C32]">{user?.streakDays || 14}-Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183C32] text-[#F5F1E8] text-xs">
            <Trophy className="w-4 h-4 text-[#46C5B0]" />
            <span className="font-mono font-medium">{totalPoints} RP</span>
          </div>
        </div>
      </div>

      {/* Philosophy Banner */}
      <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#46C5B0]" />
            <span className="text-xs font-semibold text-[#183C32] uppercase tracking-wider">
              Ethical Gamification Philosophy
            </span>
          </div>
          <p className="text-xs text-[#3E4542] leading-relaxed">
            Unlike social apps designed to trap you on screen, TRISYNC rewards you for closing the app,
            moving your body, relaxing your mind, and respecting evening twilight boundaries.
          </p>
        </div>
        <Badge variant="success" size="sm">
          Healthy Engagement Guaranteed
        </Badge>
      </div>

      {/* Daily Wellness Missions */}
      <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-[#183C32]">Daily Synchronization Missions</h3>
            <p className="text-xs text-[#3E4542]/80 mt-0.5">
              Click a mission to record completion and earn Resonance Points.
            </p>
          </div>
          <span className="text-xs font-mono text-[#183C32] font-semibold">
            {missions.filter((m) => m.completed).length} / {missions.length} Accomplished
          </span>
        </div>

        <div className="space-y-3">
          {missions.map((m) => (
            <div
              key={m.id}
              onClick={() => toggleMission(m.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                m.completed
                  ? "bg-[#FAF8F4] border-[#183C32]/10 opacity-70"
                  : "bg-white border-[#183C32]/15 hover:border-[#183C32]/30 shadow-subtle"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                    m.completed
                      ? "bg-[#183C32] border-[#183C32] text-[#F5F1E8]"
                      : "border-[#183C32]/25 bg-transparent"
                  }`}
                >
                  {m.completed && <CheckCircle2 className="w-4 h-4 text-[#46C5B0]" />}
                </div>

                <div>
                  <div
                    className={`text-sm font-medium ${
                      m.completed ? "line-through text-[#3E4542]" : "text-[#222624]"
                    }`}
                  >
                    {m.title}
                  </div>
                  <div className="text-xs text-[#3E4542] mt-0.5">{m.desc}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-medium text-[#1A8A7A]">+{m.points} RP</span>
                <DimensionPill dimension={m.dimension} size="sm" subtle />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collectible Resonance Badges */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
          Equilibrium Badges & Milestones
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                b.unlocked
                  ? "bg-[#FAF8F4] border-[#183C32]/15 shadow-subtle"
                  : "bg-[#FAF8F4]/50 border-dashed border-[#183C32]/10 opacity-50"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      b.unlocked
                        ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                        : "bg-[#ECE6D8] text-[#3E4542]"
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <DimensionPill dimension={b.dimension} size="sm" subtle />
                </div>

                <h4 className="text-sm font-semibold text-[#222624] pt-1">{b.title}</h4>
                <p className="text-xs text-[#3E4542] leading-relaxed">{b.desc}</p>
              </div>

              <div className="pt-2 border-t border-[#183C32]/10 text-[11px] font-mono">
                {b.unlocked ? (
                  <span className="text-[#1A8A7A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked & Calibrated
                  </span>
                ) : (
                  <span className="text-[#3E4542]">Milestone in Progress</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

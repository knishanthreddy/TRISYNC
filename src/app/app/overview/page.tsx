"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Info,
  Calendar,
  Dumbbell,
  Smile,
  Utensils,
  Timer,
  Moon,
  HelpCircle,
  Play,
  RotateCcw,
  Check,
  ShieldCheck,
  Plus,
  Watch,
} from "lucide-react";

export default function OverviewPage() {
  const { user } = useAuth();

  // 1. Coordinated Tri-Sync Daily Mission State
  const [missionItems, setMissionItems] = useState([
    {
      id: "m-phys",
      dimension: "physical" as const,
      task: "Take a 20-minute restorative outdoor walk",
      completed: true,
      reward: 40,
    },
    {
      id: "m-ment",
      dimension: "mental" as const,
      task: "Complete 5 minutes of somatic breathwork",
      completed: true,
      reward: 35,
    },
    {
      id: "m-digi",
      dimension: "digital" as const,
      task: "Spend 30 minutes away from screens before bed",
      completed: false,
      reward: 45,
    },
  ]);

  // 2. Score Calculation Explainer Modal
  const [scoreModalOpen, setScoreModalOpen] = useState(false);

  // 3. Quick Action Modals
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);

  // Quick Action Form States
  const [workoutType, setWorkoutType] = useState("Strength Training");
  const [workoutDuration, setWorkoutDuration] = useState("45");
  const [moodRating, setMoodRating] = useState("Calm & Grounded");
  const [stressLevel, setStressLevel] = useState("Low (2/10)");
  const [mealName, setMealName] = useState("Moong Dal Khichdi + Curd");
  const [mealCalories, setMealCalories] = useState("380");
  const [focusTimerSeconds, setFocusTimerSeconds] = useState(1500); // 25 min
  const [focusTimerActive, setFocusTimerActive] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Derived mission progress
  const completedCount = missionItems.filter((m) => m.completed).length;
  const missionProgress = Math.round((completedCount / missionItems.length) * 100);

  const toggleMissionItem = (id: string) => {
    setMissionItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleActionSubmit = (label: string) => {
    setActionSuccessMsg(`${label} recorded successfully. Calibrating your personal equilibrium.`);
    setTimeout(() => {
      setActionSuccessMsg(null);
      setActiveQuickAction(null);
    }, 1200);
  };

  return (
    <div className="space-y-10 sm:space-y-12 max-w-5xl mx-auto pb-12">
      {/* 1. PERSONAL GREETING & WEARABLES STATUS */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#3E4542]">
            <Calendar className="w-3.5 h-3.5 text-[#183C32]" />
            <span>
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-[#3E4542]/40">&middot;</span>
            <span className="text-[#1A8A7A] font-medium">Equilibrium Cadence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#183C32]">
            Good morning, {user?.name || "Alex"}.
          </h1>
          <p className="text-base sm:text-lg text-[#3E4542] italic font-serif">
            &ldquo;Let&apos;s bring your day into balance.&rdquo;
          </p>
        </div>

        {/* Wearables Quick Sync Pill */}
        <Link
          href="/app/devices"
          className="p-3 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 hover:border-[#183C32]/30 transition-all flex items-center gap-3 shadow-subtle group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#183C32] text-[#46C5B0] flex items-center justify-center shrink-0">
            <Watch className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#183C32]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#46C5B0] animate-pulse" />
              <span>4 Sensors Connected</span>
            </div>
            <p className="text-[11px] text-[#3E4542] group-hover:text-[#183C32] transition-colors">
              Apple Watch &middot; Pixel &middot; Whoop &middot; Withings
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#3E4542] group-hover:text-[#183C32] group-hover:translate-x-0.5 transition-all ml-1" />
        </Link>
      </section>

      {/* 2. HOLISTIC WELLNESS OVERVIEW WITH TRANSPARENT SCORING */}
      <section className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-7 sm:p-9 shadow-soft space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#3E4542]">
                Ecosystem Metric
              </span>
              <button
                type="button"
                onClick={() => setScoreModalOpen(true)}
                className="text-[11px] text-[#183C32] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#46C5B0]" />
                <span>How is this calculated?</span>
              </button>
            </div>
            <h2 className="text-2xl font-light text-[#183C32] tracking-tight mt-1">
              Holistic Wellness Score
            </h2>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-light tracking-tight text-[#183C32]">
              {user?.syncScore || 86}
            </span>
            <span className="text-xs font-mono text-[#3E4542]">/ 100</span>
            <Badge variant="success" size="sm" className="ml-2">
              Balanced Resonance
            </Badge>
          </div>
        </div>

        {/* 3 Interconnected Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Physical Indicator */}
          <Link
            href="/app/physical"
            className="p-5 rounded-2xl bg-[#EEF3ED] border border-[#183C32]/15 hover:border-[#183C32]/30 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <DimensionPill dimension="physical" size="sm" />
                <Activity className="w-4 h-4 text-[#183C32]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-light text-[#183C32]">88</span>
                  <span className="text-xs font-mono text-[#3E4542]">/ 100</span>
                </div>
                <div className="text-xs font-medium text-[#183C32]">Physical Vitality</div>
              </div>
              <p className="text-xs text-[#183C32]/85 leading-relaxed">
                45m workout logged &middot; 7h 24m sleep recovery.
              </p>
            </div>
            <div className="text-[11px] font-medium text-[#183C32] pt-2 border-t border-[#183C32]/10 flex items-center justify-between">
              <span>View Physical Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Mental Indicator */}
          <Link
            href="/app/mental"
            className="p-5 rounded-2xl bg-[#F4F0FA] border border-[#B9A5DF]/40 hover:border-[#B9A5DF]/60 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <DimensionPill dimension="mental" size="sm" />
                <Brain className="w-4 h-4 text-[#7B59BA]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-light text-[#603E99]">84</span>
                  <span className="text-xs font-mono text-[#3E4542]">/ 100</span>
                </div>
                <div className="text-xs font-medium text-[#603E99]">Mental Clarity</div>
              </div>
              <p className="text-xs text-[#603E99]/85 leading-relaxed">
                Low friction (22%) &middot; 12m mindfulness pause.
              </p>
            </div>
            <div className="text-[11px] font-medium text-[#603E99] pt-2 border-t border-[#B9A5DF]/30 flex items-center justify-between">
              <span>View Mental Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Digital Indicator */}
          <div className="p-5 rounded-2xl bg-[#E3FAF5] border border-[#46C5B0]/35 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <DimensionPill dimension="digital" size="sm" />
                <Sparkles className="w-4 h-4 text-[#1A8A7A]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-light text-[#0F685B]">86</span>
                  <span className="text-xs font-mono text-[#3E4542]">/ 100</span>
                </div>
                <div className="text-xs font-medium text-[#0F685B]">Digital Habits</div>
              </div>
              <p className="text-xs text-[#0F685B]/85 leading-relaxed">
                1h 48m intentional screentime &middot; Twilight boundary on track.
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#0F685B] pt-2 border-t border-[#46C5B0]/25">
              Consented Active Logging
            </div>
          </div>
        </div>

        {/* Explainability Callout */}
        <div className="p-3.5 rounded-xl bg-white border border-[#183C32]/10 text-xs text-[#3E4542] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#183C32] shrink-0" />
            <span>
              <strong>Equilibrium Safeguard:</strong> Calculated via weighted harmonic convergence. A strong score in one dimension can never mask a critical deficit in another.
            </span>
          </div>
        </div>
      </section>

      {/* 3. TODAY'S WELLNESS SUMMARY */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-[#183C32] tracking-tight">
          Today&apos;s Wellness Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#3E4542]">
              <span>Physical Activity</span>
              <Activity className="w-3.5 h-3.5 text-[#183C32]" />
            </div>
            <div className="text-xl font-light text-[#222624]">7,420 steps</div>
            <p className="text-[11px] text-[#3E4542]/80">45m Strength Session logged</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#3E4542]">
              <span>Mood & Stress</span>
              <Brain className="w-3.5 h-3.5 text-[#7B59BA]" />
            </div>
            <div className="text-xl font-light text-[#222624]">Calm & Focused</div>
            <p className="text-[11px] text-[#3E4542]/80">Friction index 22% (Low stress)</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#3E4542]">
              <span>Restorative Sleep</span>
              <Moon className="w-3.5 h-3.5 text-[#183C32]" />
            </div>
            <div className="text-xl font-light text-[#222624]">7h 24m</div>
            <p className="text-[11px] text-[#3E4542]/80">86% Sleep Quality (Self-Reported)</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#3E4542]">
              <span>Digital Usage</span>
              <Sparkles className="w-3.5 h-3.5 text-[#1A8A7A]" />
            </div>
            <div className="text-xl font-light text-[#222624]">1h 48m</div>
            <p className="text-[11px] text-[#3E4542]/80">Twilight boundary preserved</p>
          </div>
        </div>
      </section>

      {/* 4. TRISYNC COORDINATED DAILY MISSION */}
      <section className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#46C5B0] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#183C32]">
                Coordinated Tri-Sync Mission
              </span>
            </div>
            <h3 className="text-xl font-light text-[#183C32] tracking-tight mt-1">
              One Mission. Three Interconnected Dimensions.
            </h3>
            <p className="text-xs text-[#3E4542]/80 mt-0.5">
              Designed to harmonize body, mind, and screen intentionality in one synchronized cadence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#1A8A7A]">
              +120 Resonance Points
            </span>
            <div className="px-3 py-1 rounded-full bg-[#183C32]/10 text-xs font-semibold text-[#183C32]">
              {missionProgress}% Completed
            </div>
          </div>
        </div>

        {/* Mission Checklist */}
        <div className="space-y-3">
          {missionItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMissionItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                item.completed
                  ? "bg-[#FAF8F4] border-[#183C32]/10 opacity-75"
                  : "bg-white border-[#183C32]/15 hover:border-[#183C32]/30 shadow-subtle"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                    item.completed
                      ? "bg-[#183C32] border-[#183C32] text-[#F5F1E8]"
                      : "border-[#183C32]/25 bg-transparent"
                  }`}
                >
                  {item.completed && <Check className="w-4 h-4 text-[#46C5B0]" />}
                </div>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      item.completed ? "line-through text-[#3E4542]" : "text-[#222624]"
                    }`}
                  >
                    {item.task}
                  </span>
                  <div className="text-[11px] text-[#3E4542] mt-0.5">
                    Reward: +{item.reward} RP
                  </div>
                </div>
              </div>

              <DimensionPill dimension={item.dimension} size="sm" subtle />
            </div>
          ))}
        </div>
      </section>

      {/* 5. PERSONALIZED INSIGHT (NON-CAUSAL EMPIRICAL EVIDENCE) */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#183C32] text-[#F5F1E8] space-y-4 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#46C5B0]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#A9B9A4]">
                Personalized Resonance Insight
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#A9B9A4]">
              Empirical Observation
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-light text-[#F5F1E8] leading-snug">
            &ldquo;On days when you record a short evening walk, you also tend to report significantly better next-morning mood.&rdquo;
          </h4>

          <div className="p-3 rounded-xl bg-[#FAF8F4]/10 text-xs text-[#F5F1E8]/85 space-y-1">
            <span className="font-semibold text-[#A9B9A4]">Observed Data Basis:</span>
            <p className="text-[11px] leading-relaxed">
              Derived from 12 out of 14 logged evenings with &gt;15m outdoor walking. Next-morning mood rated &ldquo;Optimal&rdquo; 85% of the time, compared to 54% on non-walking evenings.
            </p>
          </div>

          <p className="text-[11px] text-[#A9B9A4]/80 italic pt-1">
            Note: This reflects an observed statistical pattern across your consented logs and is not presented as automatic medical causation.
          </p>
        </div>
      </section>

      {/* 6. RECOMMENDED NEXT ACTION (MAX 2 ACTIONS) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-[#183C32] tracking-tight">
            Recommended Next Action
          </h3>
          <span className="text-xs text-[#3E4542]">Prioritizing 1 meaningful focus</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#183C32]" />
              <span className="text-xs font-semibold text-[#183C32] uppercase">
                Circadian Micro-Ritual
              </span>
            </div>
            <h4 className="text-base font-medium text-[#222624]">
              Take a 5-minute somatic neck & spine reset before your afternoon sprint
            </h4>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              Buffers against the predicted 3:00 PM cognitive friction slump observed during continuous desk work.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveQuickAction("meditation")}
          >
            Start 5-Min Reset
          </Button>
        </div>
      </section>

      {/* 7. QUICK ACTIONS (ALL 6 FUNCTIONAL MODALS) */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-[#183C32] tracking-tight">
          Quick Everyday Actions
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            type="button"
            onClick={() => setActiveQuickAction("workout")}
            className="p-4 rounded-xl bg-[#FAF8F4] border border-[#183C32]/12 hover:border-[#183C32]/30 hover:bg-[#EEF3ED] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Dumbbell className="w-5 h-5 text-[#183C32] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#222624]">Log Workout</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuickAction("mood")}
            className="p-4 rounded-xl bg-[#FAF8F4] border border-[#183C32]/12 hover:border-[#183C32]/30 hover:bg-[#F4F0FA] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Smile className="w-5 h-5 text-[#7B59BA] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#222624]">Record Mood</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuickAction("meal")}
            className="p-4 rounded-xl bg-[#FAF8F4] border border-[#183C32]/12 hover:border-[#183C32]/30 hover:bg-[#EEF3ED] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Utensils className="w-5 h-5 text-[#183C32] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#222624]">Log Meal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuickAction("focus")}
            className="p-4 rounded-xl bg-[#FAF8F4] border border-[#183C32]/12 hover:border-[#183C32]/30 hover:bg-[#E3FAF5] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Timer className="w-5 h-5 text-[#1A8A7A] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#222624]">Focus Sprint</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuickAction("meditation")}
            className="p-4 rounded-xl bg-[#FAF8F4] border border-[#183C32]/12 hover:border-[#183C32]/30 hover:bg-[#F4F0FA] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Sparkles className="w-5 h-5 text-[#7B59BA] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#222624]">Meditation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuickAction("habits")}
            className="p-4 rounded-xl bg-[#FAF8F4] border border-[#183C32]/12 hover:border-[#183C32]/30 hover:bg-[#E3FAF5] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
          >
            <Moon className="w-5 h-5 text-[#1A8A7A] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-[#222624]">Digital Habits</span>
          </button>
        </div>
      </section>

      {/* MODAL 1: SCORING METHODOLOGY EXPLAINER */}
      <Modal
        isOpen={scoreModalOpen}
        onClose={() => setScoreModalOpen(false)}
        title="Holistic Wellness Score Methodology"
        description="Transparent, non-judgmental explainability principles."
        footer={
          <Button variant="primary" size="sm" onClick={() => setScoreModalOpen(false)}>
            Understood
          </Button>
        }
      >
        <div className="space-y-4 text-xs text-[#3E4542] leading-relaxed">
          <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#183C32]/15 text-[#183C32] space-y-1">
            <span className="font-semibold">Weighted Harmonic Convergence:</span>
            <p className="text-[11px]">
              Unlike simple arithmetic averages that allow high scores to mask deficits, TRISYNC penalizes severe imbalances across body, mind, and digital habits.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-[#222624]">Key Ethical Principles:</h5>
            <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
              <li><strong>Not a Diagnosis:</strong> This is a personal rhythm companion, never a medical or psychological evaluation.</li>
              <li><strong>Zero Penalty for Privacy:</strong> Choosing not to share optional data (such as screen logs) does not penalize your score; active metrics are dynamically normalized.</li>
              <li><strong>Insufficient Data Clarity:</strong> Missing inputs are clearly marked rather than guessed.</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* QUICK ACTION MODALS */}
      {/* Log Workout Modal */}
      <Modal
        isOpen={activeQuickAction === "workout"}
        onClose={() => setActiveQuickAction(null)}
        title="Log Physical Workout"
        description="Record physical motion to calibrate your circadian load."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setActiveQuickAction(null)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => handleActionSubmit("Workout")}>Save Workout</Button>
          </>
        }
      >
        <div className="space-y-4">
          {actionSuccessMsg ? (
            <div className="p-4 rounded-xl bg-[#E3FAF5] text-[#1A8A7A] text-xs text-center font-medium">
              {actionSuccessMsg}
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-[#3E4542]">Exercise Type</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["Strength Training", "Zone 2 Cardio", "Yoga & Mobility", "HIIT Sprint"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setWorkoutType(t)}
                      className={`p-2 rounded-lg border text-left font-medium ${
                        workoutType === t ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]" : "bg-white text-[#222624] border-[#183C32]/15"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Input
                label="Duration (Minutes)"
                type="number"
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
              />
            </>
          )}
        </div>
      </Modal>

      {/* Record Mood Modal */}
      <Modal
        isOpen={activeQuickAction === "mood"}
        onClose={() => setActiveQuickAction(null)}
        title="Record Mental Reflection"
        description="Log your cognitive headspace and perceived stress."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setActiveQuickAction(null)}>Cancel</Button>
            <Button variant="mental" size="sm" onClick={() => handleActionSubmit("Mental state")}>Save Reflection</Button>
          </>
        }
      >
        <div className="space-y-4">
          {actionSuccessMsg ? (
            <div className="p-4 rounded-xl bg-[#F4F0FA] text-[#603E99] text-xs text-center font-medium">
              {actionSuccessMsg}
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-[#3E4542]">Current Mood</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["Calm & Grounded", "Creative Flow", "Slight Friction", "Cognitive Fatigue"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMoodRating(m)}
                      className={`p-2 rounded-lg border text-left font-medium ${
                        moodRating === m ? "bg-[#7B59BA] text-white border-[#7B59BA]" : "bg-white text-[#222624] border-[#183C32]/15"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-[#3E4542]">Perceived Stress</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {["Low (2/10)", "Moderate (5/10)", "Elevated (8/10)"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStressLevel(s)}
                      className={`p-2 rounded-lg border text-center font-medium ${
                        stressLevel === s ? "bg-[#7B59BA] text-white border-[#7B59BA]" : "bg-white text-[#222624] border-[#183C32]/15"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Log Meal Modal (Indian Diet Ready) */}
      <Modal
        isOpen={activeQuickAction === "meal"}
        onClose={() => setActiveQuickAction(null)}
        title="Log Nutrition (Indian Diet Tracker)"
        description="Quickly record home meals or healthy snacks."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setActiveQuickAction(null)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => handleActionSubmit("Meal")}>Log Meal</Button>
          </>
        }
      >
        <div className="space-y-4">
          {actionSuccessMsg ? (
            <div className="p-4 rounded-xl bg-[#E3FAF5] text-[#1A8A7A] text-xs text-center font-medium">
              {actionSuccessMsg}
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-[#3E4542]">Common Dishes</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {["2 Dosa + Sambar", "3 Chapati + Paneer", "Moong Dal Khichdi + Curd", "Idli (3) + Coconut Chutney"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMealName(item)}
                      className={`p-2 rounded-lg border text-left text-xs font-medium truncate ${
                        mealName === item ? "bg-[#183C32] text-white border-[#183C32]" : "bg-white text-[#222624] border-[#183C32]/15"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <Input
                label="Selected Meal"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
              <Input
                label="Estimated Calories (kcal)"
                value={mealCalories}
                onChange={(e) => setMealCalories(e.target.value)}
                helperText="Estimated standard serving from IFCT / NIN database."
              />
            </>
          )}
        </div>
      </Modal>

      {/* Focus Session Modal */}
      <Modal
        isOpen={activeQuickAction === "focus"}
        onClose={() => setActiveQuickAction(null)}
        title="Focus Sprint Timer"
        description="A quiet 25-minute block to protect attention from tab fragmentation."
        footer={
          <Button variant="digital" size="sm" onClick={() => setFocusTimerActive(!focusTimerActive)}>
            {focusTimerActive ? "Pause Focus" : "Begin 25m Focus"}
          </Button>
        }
      >
        <div className="p-8 rounded-2xl bg-[#E3FAF5] border border-[#46C5B0]/30 text-center space-y-3">
          <div className="text-4xl font-mono text-[#0F685B]">
            {Math.floor(focusTimerSeconds / 60)}:{(focusTimerSeconds % 60).toString().padStart(2, "0")}
          </div>
          <p className="text-xs text-[#0F685B]/85">
            {focusTimerActive ? "Focus stream active. Notifications minimized." : "Ready for uninterrupted work."}
          </p>
        </div>
      </Modal>

      {/* Meditation Modal */}
      <Modal
        isOpen={activeQuickAction === "meditation"}
        onClose={() => setActiveQuickAction(null)}
        title="Somatic Reset & Breathwork"
        description="A gentle 3-minute physiological sigh reset."
        footer={
          <Button variant="mental" size="sm" onClick={() => handleActionSubmit("Mindfulness reset")}>
            Complete Reset (+35 RP)
          </Button>
        }
      >
        <div className="p-8 rounded-2xl bg-[#F4F0FA] border border-[#B9A5DF]/40 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#7B59BA]/20 text-[#603E99] flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold text-[#603E99]">Inhale deeply &middot; Sip air &middot; Long exhale</h5>
            <p className="text-xs text-[#3E4542]">Activates parasympathetic tone to immediately reduce cognitive friction.</p>
          </div>
        </div>
      </Modal>

      {/* Digital Habits Modal */}
      <Modal
        isOpen={activeQuickAction === "habits"}
        onClose={() => setActiveQuickAction(null)}
        title="Digital Boundaries & Twilight Shift"
        description="Monitor today's screen flow and schedule evening downtime."
        footer={
          <Button variant="primary" size="sm" onClick={() => setActiveQuickAction(null)}>
            Close
          </Button>
        }
      >
        <div className="space-y-3 text-xs text-[#3E4542]">
          <div className="p-3.5 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
            <span>Today&apos;s Active Screen Time:</span>
            <span className="font-mono font-semibold text-[#183C32]">1h 48m</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
            <span>Scheduled Twilight Screen Shift:</span>
            <span className="font-mono font-semibold text-[#1A8A7A]">10:15 PM</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#E3FAF5] border border-[#46C5B0]/25 text-[#0F685B]">
            Preserving 38m of restorative deep sleep by avoiding late night blue-spectrum screens.
          </div>
        </div>
      </Modal>
    </div>
  );
}

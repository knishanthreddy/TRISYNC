"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DimensionPill } from "@/components/ui/dimension-pill";
import {
  Activity,
  Brain,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Clock,
  Briefcase,
  GraduationCap,
  Compass,
  AlertCircle,
  Lock,
} from "lucide-react";

const GOAL_OPTIONS = [
  { id: "fitness", label: "Improve fitness", dimension: "physical" as const },
  { id: "routine", label: "Build a consistent workout routine", dimension: "physical" as const },
  { id: "nutrition", label: "Improve nutrition & hydration", dimension: "physical" as const },
  { id: "stress", label: "Manage stress & reduce burnout", dimension: "mental" as const },
  { id: "sleep", label: "Improve sleep habits & REM depth", dimension: "physical" as const },
  { id: "concentration", label: "Improve concentration & deep focus", dimension: "mental" as const },
  { id: "screen-time", label: "Reduce unnecessary screen time", dimension: "digital" as const },
  { id: "balanced-day", label: "Build a balanced daily routine", dimension: "unified" as const },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [displayName, setDisplayName] = useState(user?.name || "Alex");
  const [ageRange, setAgeRange] = useState(user?.ageRange || "26-34");
  const [mode, setMode] = useState<"professional" | "student" | "hybrid">(user?.mode || "professional");
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "moderate" | "active" | "athlete">(
    user?.activityLevel || "moderate"
  );
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    user?.goals && user.goals.length > 0
      ? user.goals
      : ["Improve sleep habits", "Reduce unnecessary screen time", "Manage stress"]
  );
  const [wakeTime, setWakeTime] = useState(user?.schedule?.wakeTime || "06:45");
  const [sleepTime, setSleepTime] = useState(user?.schedule?.sleepTime || "22:45");
  const [workStart, setWorkStart] = useState(user?.schedule?.workStart || "09:00");
  const [workEnd, setWorkEnd] = useState(user?.schedule?.workEnd || "18:00");
  const [reminderTimes, setReminderTimes] = useState<string[]>(["08:30", "13:00", "21:30"]);

  // Consented Permissions
  const [permissions, setPermissions] = useState({
    screenTimeConsented: user?.permissions?.screenTimeConsented ?? true,
    healthSensorsConsented: user?.permissions?.healthSensorsConsented ?? true,
    locationContextConsented: user?.permissions?.locationContextConsented ?? false,
    anonymizedAnalyticsConsented: user?.permissions?.anonymizedAnalyticsConsented ?? true,
  });

  const toggleGoal = (goalLabel: string) => {
    if (selectedGoals.includes(goalLabel)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goalLabel));
    } else {
      setSelectedGoals([...selectedGoals, goalLabel]);
    }
  };

  const toggleReminder = (time: string) => {
    if (reminderTimes.includes(time)) {
      setReminderTimes(reminderTimes.filter((t) => t !== time));
    } else {
      setReminderTimes([...reminderTimes, time]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      name: displayName,
      ageRange,
      mode,
      activityLevel,
      goals: selectedGoals,
      schedule: {
        wakeTime,
        sleepTime,
        workStart,
        workEnd,
      },
      reminderTimes,
      permissions,
      syncScore: 84,
    });
    router.push("/app/overview");
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#222624] py-8 sm:py-12 flex flex-col justify-between">
      <Container size="md">
        {/* Top Progress Bar */}
        <div className="space-y-4 mb-8 sm:mb-12">
          <div className="flex items-center justify-between text-xs text-[#3E4542]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#183C32] flex items-center justify-center text-[10px] font-semibold text-[#F5F1E8]">
                TRI
              </div>
              <span className="font-semibold text-[#183C32]">TRISYNC Onboarding Calibration</span>
            </div>
            <span className="font-mono">Step {currentStep} of 4</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#183C32]/10 overflow-hidden">
            <div
              className="h-full bg-[#183C32] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: IDENTITY & SCHEDULE PROFILE */}
        {currentStep === 1 && (
          <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-8 sm:p-10 shadow-soft space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
                Personal Baseline
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
                Tell us about your daily rhythm
              </h2>
              <p className="text-xs sm:text-sm text-[#3E4542]/80">
                TRISYNC uses your baseline schedule to calibrate gentle boundary recommendations.
              </p>
            </div>

            <div className="space-y-6">
              <Input
                label="Preferred Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How should TRISYNC address you?"
              />

              {/* Age Range */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#222624] tracking-wide uppercase opacity-85">
                  Age Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["18-25", "26-34", "35-49", "50+"].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setAgeRange(range)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                        ageRange === range
                          ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]"
                          : "bg-white text-[#222624] border-[#183C32]/15 hover:border-[#183C32]/30"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode: Professional vs Student vs Hybrid */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#222624] tracking-wide uppercase opacity-85">
                  Primary Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: "professional", label: "Professional", icon: Briefcase, desc: "Office / remote career load" },
                    { key: "student", label: "Student", icon: GraduationCap, desc: "Academic study & exam cycles" },
                    { key: "hybrid", label: "Hybrid / Creative", icon: Compass, desc: "Variable non-linear schedule" },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSel = mode === m.key;
                    return (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setMode(m.key as any)}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-28 ${
                          isSel
                            ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32] shadow-subtle"
                            : "bg-white text-[#222624] border-[#183C32]/15 hover:border-[#183C32]/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className="w-5 h-5" />
                          {isSel && <Check className="w-4 h-4 text-[#46C5B0]" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{m.label}</div>
                          <div className={`text-[10px] mt-0.5 ${isSel ? "text-[#F5F1E8]/75" : "text-[#3E4542]/70"}`}>
                            {m.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#222624] tracking-wide uppercase opacity-85">
                  Typical Activity Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: "sedentary", label: "Desk / Sedentary" },
                    { key: "moderate", label: "Moderate (3x/wk)" },
                    { key: "active", label: "Active (5x/wk)" },
                    { key: "athlete", label: "High Performance" },
                  ].map((lvl) => (
                    <button
                      key={lvl.key}
                      type="button"
                      onClick={() => setActivityLevel(lvl.key as any)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                        activityLevel === lvl.key
                          ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]"
                          : "bg-white text-[#222624] border-[#183C32]/15 hover:border-[#183C32]/30"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#183C32]/10">
              <span className="text-xs text-[#3E4542]/70">Optional fields can be modified in settings.</span>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(2)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next: Wellbeing Goals
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: USER GOALS SELECTION */}
        {currentStep === 2 && (
          <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-8 sm:p-10 shadow-soft space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
                Intentional Focus
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
                Select your primary goals
              </h2>
              <p className="text-xs sm:text-sm text-[#3E4542]/80">
                Choose the areas where you wish to harmonize physical motion, cognitive calm, and digital flow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = selectedGoals.includes(g.label);
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => toggleGoal(g.label)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32] shadow-subtle"
                        : "bg-white text-[#222624] border-[#183C32]/12 hover:border-[#183C32]/25"
                    }`}
                  >
                    <div className="space-y-1">
                      <DimensionPill dimension={g.dimension} size="sm" subtle={!isSelected} />
                      <div className="text-xs font-medium pt-1">{g.label}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-3 ${
                        isSelected
                          ? "bg-[#46C5B0] border-[#46C5B0] text-[#183C32]"
                          : "border-[#183C32]/20 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#183C32]/10">
              <Button variant="ghost" onClick={() => setCurrentStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(3)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                disabled={selectedGoals.length === 0}
              >
                Next: Circadian Times
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: CIRCADIAN SCHEDULE & REMINDERS */}
        {currentStep === 3 && (
          <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-8 sm:p-10 shadow-soft space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
                Temporal Windows
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
                Circadian rhythm & reminders
              </h2>
              <p className="text-xs sm:text-sm text-[#3E4542]/80">
                Helps TRISYNC schedule non-intrusive wind-down rituals and deep work pauses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Typical Wake Time"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                leftIcon={<Clock className="w-4 h-4" />}
              />

              <Input
                label="Target Sleep Time"
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                leftIcon={<Clock className="w-4 h-4" />}
              />

              <Input
                label="Focus Work Starts"
                type="time"
                value={workStart}
                onChange={(e) => setWorkStart(e.target.value)}
                leftIcon={<Briefcase className="w-4 h-4" />}
              />

              <Input
                label="Focus Work Ends"
                type="time"
                value={workEnd}
                onChange={(e) => setWorkEnd(e.target.value)}
                leftIcon={<Briefcase className="w-4 h-4" />}
              />
            </div>

            {/* Reminder Times */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-medium text-[#222624] tracking-wide uppercase opacity-85">
                Preferred Ambient Reminder Times
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { time: "08:30", label: "Morning Intentionality" },
                  { time: "13:00", label: "Midday Somatic Reset" },
                  { time: "21:30", label: "Twilight Screen Wind-Down" },
                ].map((r) => {
                  const isChecked = reminderTimes.includes(r.time);
                  return (
                    <button
                      key={r.time}
                      type="button"
                      onClick={() => toggleReminder(r.time)}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]"
                          : "bg-white text-[#222624] border-[#183C32]/15 hover:border-[#183C32]/30"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{r.label}</div>
                        <div className="font-mono text-[10px] opacity-80">{r.time}</div>
                      </div>
                      {isChecked && <Check className="w-4 h-4 text-[#46C5B0]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#183C32]/10">
              <Button variant="ghost" onClick={() => setCurrentStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(4)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next: Privacy & Consent
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: PRIVACY, PERMISSIONS & CONSENT */}
        {currentStep === 4 && (
          <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-8 sm:p-10 shadow-soft space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
                Data Sovereignty
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
                Privacy, Permissions & Consent Settings
              </h2>
              <p className="text-xs sm:text-sm text-[#3E4542]/80">
                You possess absolute control over what telemetry is analyzed. Toggle granular consent below.
              </p>
            </div>

            {/* Platform Limitation Transparency Notice */}
            <div className="p-4 rounded-xl bg-[#EEF3ED] border border-[#183C32]/15 flex items-start gap-3 text-xs text-[#183C32]">
              <ShieldCheck className="w-5 h-5 text-[#46C5B0] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold">Honest Technical Boundary:</span>
                <p className="leading-relaxed text-[#183C32]/90">
                  TRISYNC does not claim automated access to device notifications, phone screen locks, or
                  wearable sensors without your verified platform connection and manual authorization.
                  You can revoke consent or delete your entire record anytime.
                </p>
              </div>
            </div>

            {/* Granular Permission Switches */}
            <div className="space-y-4">
              {/* Screen Time & Habits */}
              <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#222624]">
                      Screen Time & Digital Habit Telemetry
                    </span>
                    <DimensionPill dimension="digital" size="sm" subtle />
                  </div>
                  <p className="text-[11px] text-[#3E4542] leading-normal">
                    Allows logging evening device wind-down times to compute correlations with REM onset.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={permissions.screenTimeConsented}
                  onChange={(e) =>
                    setPermissions({ ...permissions, screenTimeConsented: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
                />
              </div>

              {/* Health & Movement Sensors */}
              <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#222624]">
                      Health, Sleep & Movement Records
                    </span>
                    <DimensionPill dimension="physical" size="sm" subtle />
                  </div>
                  <p className="text-[11px] text-[#3E4542] leading-normal">
                    Consents to synchronizing workout exertion and sleep quality scores for recovery calculations.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={permissions.healthSensorsConsented}
                  onChange={(e) =>
                    setPermissions({ ...permissions, healthSensorsConsented: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
                />
              </div>

              {/* Location Context */}
              <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#222624]">
                      Location & Time Zone Context
                    </span>
                    <DimensionPill dimension="mental" size="sm" subtle />
                  </div>
                  <p className="text-[11px] text-[#3E4542] leading-normal">
                    Used strictly to align circadian daylight rhythms and sunrise prompts.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={permissions.locationContextConsented}
                  onChange={(e) =>
                    setPermissions({ ...permissions, locationContextConsented: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
                />
              </div>

              {/* Anonymized Analytics */}
              <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
                <div className="space-y-1 max-w-md">
                  <span className="text-xs font-semibold text-[#222624]">
                    Anonymized Cross-Dimensional Analytics
                  </span>
                  <p className="text-[11px] text-[#3E4542] leading-normal">
                    Assists in refining aggregate circadian algorithms. Stripped of all personal identifiers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={permissions.anonymizedAnalyticsConsented}
                  onChange={(e) =>
                    setPermissions({ ...permissions, anonymizedAnalyticsConsented: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#183C32]/10">
              <Button variant="ghost" onClick={() => setCurrentStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleFinish}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Complete Calibration & Launch App
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Sparkles,
  Smartphone,
  Timer,
  Bell,
  BellOff,
  ShieldAlert,
  Compass,
  Trophy,
  GraduationCap,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ArrowRight,
  Info,
  Lock,
  Plus,
  Flame,
} from "lucide-react";

export default function DigitalWellbeingPage() {
  const [activeTab, setActiveTab] = useState<
    "tracker" | "focus" | "notifications" | "detox" | "prediction" | "intentional" | "student"
  >("tracker");

  // Focus Timer State
  const [focusDuration, setFocusDuration] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusModeType, setFocusModeType] = useState<"work" | "study">("study");
  const [completedSessions, setCompletedSessions] = useState(3);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setCompletedSessions((s) => s + 1);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Screen Time Tracker State
  const [screenLimitMinutes, setScreenLimitMinutes] = useState(210); // 3h 30m
  const [todayScreenMinutes, setTodayScreenMinutes] = useState(132); // 2h 12m
  const [manualLogModal, setManualLogModal] = useState(false);
  const [logAppInput, setLogAppInput] = useState("Research Reading");
  const [logMinutesInput, setLogMinutesInput] = useState("30");

  // Intentional App Opening Reflection State
  const [intentionalApp, setIntentionalApp] = useState("Instagram");
  const [reflectionReason, setReflectionReason] = useState<string | null>(null);
  const [intentionalModalOpen, setIntentionalModalOpen] = useState(false);
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Digital Detox State
  const [activeDetoxChallenge, setActiveDetoxChallenge] = useState("Twilight Screen Shift (10:15 PM)");
  const [detoxCompletedDays, setDetoxCompletedDays] = useState(5);

  const resetTimer = (mins: number) => {
    setIsTimerRunning(false);
    setFocusDuration(mins);
    setTimeLeft(mins * 60);
  };

  const handleSaveManualScreenTime = () => {
    const mins = parseInt(logMinutesInput) || 30;
    setTodayScreenMinutes((prev) => prev + mins);
    setManualLogModal(false);
  };

  const handleConfirmIntentional = (reason: string) => {
    setReflectionReason(reason);
    setReflectionSaved(true);
    setTimeout(() => {
      setReflectionSaved(false);
      setIntentionalModalOpen(false);
      setReflectionReason(null);
    }, 1200);
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <div className="flex items-center gap-2">
            <DimensionPill dimension="digital" />
            <span className="text-xs font-mono text-[#3E4542]">Module 03</span>
          </div>
          <h1 className="text-3xl font-light text-[#0F685B] tracking-tight mt-1">
            Digital Balance & Intentionality
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Screen-time tracking, proactive distraction prediction, and distraction-free focus sprints.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#FAF8F4] border border-[#46C5B0]/30 text-xs">
          {[
            { id: "tracker", label: "Screen Time" },
            { id: "focus", label: "Focus Mode" },
            { id: "prediction", label: "Distraction AI" },
            { id: "detox", label: "Detox Planner" },
            { id: "intentional", label: "Intentional Flow" },
            { id: "notifications", label: "Notifications" },
            { id: "student", label: "Student Mode" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#1A8A7A] text-white shadow-subtle"
                  : "text-[#3E4542] hover:text-[#0F685B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURE 1: SCREEN-TIME TRACKER */}
      {activeTab === "tracker" && (
        <section className="space-y-8">
          {/* Main Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/30 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Today&apos;s Screen Time</span>
              <div className="text-3xl font-light text-[#0F685B]">
                {Math.floor(todayScreenMinutes / 60)}h {todayScreenMinutes % 60}m
              </div>
              <p className="text-xs text-[#1A8A7A]">
                Within target limit &middot; {Math.floor(screenLimitMinutes / 60)}h {screenLimitMinutes % 60}m allowance
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/30 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Daily Limit Progress</span>
              <div className="text-3xl font-light text-[#222624]">
                {Math.round((todayScreenMinutes / screenLimitMinutes) * 100)}%
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#183C32]/10 overflow-hidden">
                <div
                  className="h-full bg-[#46C5B0] rounded-full"
                  style={{ width: `${Math.min(100, (todayScreenMinutes / screenLimitMinutes) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/30 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Twilight Screen Boundary</span>
              <div className="text-3xl font-light text-[#ED805A]">10:15 PM</div>
              <p className="text-xs text-[#3E4542]">Shift displays to warm tone 45m before sleep</p>
            </div>
          </div>

          {/* App / Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/25 p-7 space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-[#0F685B]">Category Usage Breakdown</h4>
                <Button variant="outline" size="sm" onClick={() => setManualLogModal(true)}>
                  + Log Screen Time
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Productivity & Development", time: "1h 15m", pct: 55, color: "bg-[#1A8A7A]" },
                  { name: "Learning & Research", time: "35m", pct: 25, color: "bg-[#46C5B0]" },
                  { name: "Communication & Messaging", time: "22m", pct: 15, color: "bg-[#7B59BA]" },
                  { name: "Entertainment & Feeds", time: "10m", pct: 5, color: "bg-[#ED805A]" },
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#222624]">{cat.name}</span>
                      <span className="font-mono text-[#3E4542]">{cat.time}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#183C32]/10 overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[#3E4542]/80 leading-normal pt-2">
                <em>Data Source: Consented manual logging + browser session telemetry. Clearly separated from device-level statistics.</em>
              </div>
            </div>

            {/* Weekly Trajectory */}
            <div className="lg:col-span-5 rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/25 p-7 space-y-4">
              <h4 className="text-base font-medium text-[#0F685B]">Weekly Screen Time Balance</h4>
              <p className="text-xs text-[#3E4542]">Comparing active vs offline downtime across the week.</p>

              <div className="space-y-2 pt-2">
                {[
                  { day: "Mon", hrs: "2h 45m", status: "Optimal" },
                  { day: "Tue", hrs: "3h 10m", status: "Balanced" },
                  { day: "Wed", hrs: "4h 05m", status: "Elevated" },
                  { day: "Thu", hrs: "2h 15m", status: "Optimal" },
                  { day: "Fri", hrs: "2h 50m", status: "Optimal" },
                  { day: "Sat", hrs: "1h 45m", status: "Detox Day" },
                  { day: "Today", hrs: "2h 12m", status: "On Track" },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#46C5B0]/15 flex items-center justify-between text-xs">
                    <span className="font-medium text-[#222624]">{item.day}</span>
                    <span className="font-mono text-[#3E4542]">{item.hrs}</span>
                    <span className="text-[10px] font-mono text-[#1A8A7A]">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FEATURE 2: FOCUS MODE */}
      {activeTab === "focus" && (
        <section className="rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/30 p-8 sm:p-12 text-center space-y-8">
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setFocusModeType("study")}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  focusModeType === "study" ? "bg-[#1A8A7A] text-white" : "bg-white text-[#3E4542] border"
                }`}
              >
                Study Mode
              </button>
              <button
                onClick={() => setFocusModeType("work")}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  focusModeType === "work" ? "bg-[#1A8A7A] text-white" : "bg-white text-[#3E4542] border"
                }`}
              >
                Work Sprint
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-light text-[#0F685B]">
              Uninterrupted Attention Stream
            </h3>
            <p className="text-xs text-[#3E4542]">
              Select session duration and commit to uninterrupted single-tasking.
            </p>
          </div>

          {/* Large Countdown Display */}
          <div className="relative w-56 h-56 mx-auto rounded-full bg-[#E3FAF5] border-2 border-[#46C5B0]/40 flex flex-col items-center justify-center shadow-soft">
            <span className="text-5xl font-mono text-[#0F685B] font-light">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
            <span className="text-xs font-mono uppercase text-[#1A8A7A] mt-1">
              {isTimerRunning ? "Flow State Active" : "Paused"}
            </span>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="digital"
              size="lg"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              leftIcon={isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            >
              {isTimerRunning ? "Pause Focus" : "Begin Focus Sprint"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => resetTimer(focusDuration)}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset
            </Button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex justify-center gap-3 pt-2">
            {[15, 25, 50, 90].map((mins) => (
              <button
                key={mins}
                onClick={() => resetTimer(mins)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium ${
                  focusDuration === mins
                    ? "bg-[#1A8A7A] text-white border-[#1A8A7A]"
                    : "bg-white text-[#3E4542] border-[#46C5B0]/30"
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#46C5B0]/20 flex items-center justify-between text-xs text-[#3E4542] max-w-md mx-auto">
            <span>Sessions Completed Today: <strong>{completedSessions}</strong></span>
            <span>Focus Streak: <strong>14 Days</strong></span>
          </div>
        </section>
      )}

      {/* FEATURE 5: SMART DISTRACTION PREDICTION (SIGNATURE FEATURE) */}
      {activeTab === "prediction" && (
        <section className="space-y-6">
          <div className="p-7 rounded-3xl bg-[#183C32] text-[#F5F1E8] space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#46C5B0]" />
                <span className="text-xs font-mono uppercase text-[#A9B9A4] font-semibold">
                  Signature AI Distraction Forecast
                </span>
              </div>
              <Badge variant="warning" size="sm">Empirical Estimate</Badge>
            </div>

            <h3 className="text-2xl font-light text-[#F5F1E8]">
              &ldquo;You frequently open social media feeds during your 3:00 PM study sessions after 3 continuous hours at your desk.&rdquo;
            </h3>

            <p className="text-xs sm:text-sm text-[#F5F1E8]/85 leading-relaxed">
              Based on 14 recorded afternoon logs, cognitive stamina naturally wanes around 3:15 PM. Rather than waiting for compulsive tab-switching, TRISYNC offers an automated protective boundary.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActiveTab("focus");
                  resetTimer(25);
                  setIsTimerRunning(true);
                }}
              >
                Start 25-Min Protected Sprint
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[#F5F1E8] border-[#F5F1E8]/30 hover:bg-[#F5F1E8]/10"
                onClick={() => alert("Scheduled 5-minute somatic standing break.")}
              >
                Schedule Standing Break
              </Button>
            </div>

            <div className="pt-2 text-[11px] text-[#A9B9A4]/80 italic">
              Scientific Truthfulness: We do not claim to read real-time brainwaves. Predictions represent statistical time-series correlations from your logged check-ins.
            </div>
          </div>
        </section>
      )}

      {/* FEATURE 4: DIGITAL DETOX PLANNER */}
      {activeTab === "detox" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Phone-Free Bedroom", cadence: "Every Night (10:15 PM - 7:00 AM)", points: "+50 RP/day", active: true },
              { title: "Screen-Free Dining", cadence: "Breakfast & Dinner", points: "+30 RP/day", active: true },
              { title: "Weekend Digital Sabbath", cadence: "Sundays (9:00 AM - 1:00 PM)", points: "+100 RP", active: false },
            ].map((d, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#46C5B0]/25 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant={d.active ? "success" : "neutral"} size="sm">
                      {d.active ? "Active Challenge" : "Optional"}
                    </Badge>
                    <span className="font-mono text-[#1A8A7A]">{d.points}</span>
                  </div>
                  <h4 className="text-base font-semibold text-[#222624]">{d.title}</h4>
                  <p className="text-xs text-[#3E4542]">{d.cadence}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert(`Toggled challenge: ${d.title}`)}>
                  {d.active ? "Pause Challenge" : "Activate Challenge"}
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURE 7: INTENTIONAL APP OPENING */}
      {activeTab === "intentional" && (
        <section className="rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/30 p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-[#0F685B]">Intentional App Opening Reflection Flow</h3>
            <p className="text-xs text-[#3E4542]">
              A conscious 5-second pause to reflect before diving into potentially distracting platforms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#46C5B0]/20 space-y-4 max-w-lg">
            <div className="text-xs font-mono text-[#3E4542] uppercase">Interactive Simulator</div>
            <h4 className="text-base font-medium text-[#222624]">
              Opening Instagram / YouTube / Feeds...
            </h4>
            <p className="text-xs text-[#3E4542] italic">
              &ldquo;What is your primary intention for opening this application right now?&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                "Specific Work / Learning Task",
                "Replying to a Friend",
                "Habitual Boredom / Escape",
                "Scheduled Leisure (15m)",
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleConfirmIntentional(reason)}
                  className="p-2.5 rounded-lg border border-[#46C5B0]/20 hover:bg-[#E3FAF5] text-left text-xs transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>

            {reflectionSaved && (
              <div className="p-3 rounded-lg bg-[#E3FAF5] text-xs text-[#1A8A7A] font-medium text-center">
                Reflection noted: &ldquo;{reflectionReason}&rdquo;. Proceeding with intention.
              </div>
            )}
          </div>

          <div className="text-[11px] text-[#3E4542] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#1A8A7A]" />
            <span>
              Web Architecture Note: A browser cannot intercept native phone app clicks without an OS-level companion app.
            </span>
          </div>
        </section>
      )}

      {/* FEATURE 3: SMART NOTIFICATION MANAGEMENT */}
      {activeTab === "notifications" && (
        <section className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/25 space-y-4">
            <h3 className="text-lg font-medium text-[#0F685B]">Ambient Notification Schedules</h3>
            <p className="text-xs text-[#3E4542]">Configure when TRISYNC delivers reflection nudges and reminders.</p>

            <div className="space-y-3 pt-2">
              {[
                { title: "Morning Awakening Intention", time: "08:30 AM", active: true },
                { title: "Midday Somatic Reset Nudge", time: "01:30 PM", active: true },
                { title: "Twilight Screen Wind-Down Alert", time: "10:15 PM", active: true },
              ].map((notif, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-[#46C5B0]/15 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#222624]">{notif.title}</span>
                    <div className="text-[10px] font-mono text-[#3E4542]">{notif.time}</div>
                  </div>
                  <input type="checkbox" defaultChecked={notif.active} className="w-4 h-4 rounded text-[#1A8A7A]" />
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#E3FAF5] text-xs text-[#0F685B]">
              <strong>Transparent System Disclaimer:</strong> TRISYNC manages in-app schedule reminders. It does not claim to intercept or block third-party OS system notifications from a website.
            </div>
          </div>
        </section>
      )}

      {/* FEATURE 9: STUDENT MODE */}
      {activeTab === "student" && (
        <section className="space-y-6">
          <div className="p-7 rounded-3xl bg-[#FAF8F4] border border-[#46C5B0]/30 space-y-5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#1A8A7A]" />
              <h3 className="text-xl font-medium text-[#0F685B]">Student Mode: Exam Cadence & Focus Protection</h3>
            </div>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              Designed for exam preparation, study sprints, and preventing social media tab-hopping during revisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#46C5B0]/20 space-y-1 text-xs">
                <span className="font-semibold text-[#222624]">50/10 Study Cadence</span>
                <p className="text-[11px] text-[#3E4542]">50m focused reading followed by 10m physical movement break resets cognitive consolidation.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#46C5B0]/20 space-y-1 text-xs">
                <span className="font-semibold text-[#222624]">Distraction Shielding</span>
                <p className="text-[11px] text-[#3E4542]">Replaces tab hopping with a clean 25m countdown timer to finish the current textbook chapter.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#46C5B0]/20 space-y-1 text-xs">
                <span className="font-semibold text-[#222624]">Exam Day Sleep Window</span>
                <p className="text-[11px] text-[#3E4542]">Guarantees at least 6.5 hours of sleep to synthesize factual memory before morning exams.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MANUAL SCREEN-TIME LOG MODAL */}
      <Modal
        isOpen={manualLogModal}
        onClose={() => setManualLogModal(false)}
        title="Log Screen Time Manually"
        description="Add manual screen sessions or study reading blocks."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setManualLogModal(false)}>Cancel</Button>
            <Button variant="digital" size="sm" onClick={handleSaveManualScreenTime}>Save Session</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="App or Activity Name" value={logAppInput} onChange={(e) => setLogAppInput(e.target.value)} />
          <Input label="Duration (Minutes)" type="number" value={logMinutesInput} onChange={(e) => setLogMinutesInput(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}

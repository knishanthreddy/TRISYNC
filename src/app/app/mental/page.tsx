"use client";

import React, { useState } from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Brain,
  Sparkles,
  Smile,
  BookOpen,
  Moon,
  Mic,
  MicOff,
  Wind,
  PhoneCall,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  Lock,
  Search,
  Plus,
  Play,
  RotateCcw,
  Zap,
  Info,
} from "lucide-react";

export default function MentalWellbeingPage() {
  const [activeTab, setActiveTab] = useState<
    "mood" | "meditation" | "journal" | "sleep" | "voice" | "calm" | "support" | "student"
  >("mood");

  // Mood Tracker State
  const [selectedMood, setSelectedMood] = useState("Calm & Grounded");
  const [stressLevel, setStressLevel] = useState(3);
  const [emotionTags, setEmotionTags] = useState<string[]>(["Peaceful", "Focused"]);
  const [moodNote, setMoodNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([
    { date: "Today, 8:30 AM", mood: "Calm & Grounded", stress: 2, note: "Slept 7h 24m. Feeling centered." },
    { date: "Yesterday, 6:00 PM", mood: "Creative Flow", stress: 4, note: "Good progress on architecture." },
    { date: "2 days ago, 9:00 PM", mood: "Slight Friction", stress: 6, note: "Meeting overflow delayed dinner." },
  ]);

  // Breathing / Meditation Timer
  const [breathingPhase, setBreathingPhase] = useState<"Inhale (4s)" | "Hold (4s)" | "Exhale (4s)">("Inhale (4s)");
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Journal State
  const [journalSearch, setJournalSearch] = useState("");
  const [journalEntries, setJournalEntries] = useState([
    {
      id: "j1",
      date: "Today",
      prompt: "Where did I experience unexpected peace today?",
      body: "During the 15-minute morning walk, leaving my phone in my pocket let my eyes adapt naturally to the sunlight.",
    },
    {
      id: "j2",
      date: "Nov 22",
      prompt: "What boundary served me well?",
      body: "Closing my laptop strictly at 6:30 PM prevented the usual evening anxiety loop.",
    },
  ]);
  const [newJournalBody, setNewJournalBody] = useState("");
  const [journalAiOptIn, setJournalAiOptIn] = useState(false);

  // Sleep State
  const [bedtime, setBedtime] = useState("22:45");
  const [wakeTime, setWakeTime] = useState("06:45");
  const [sleepQuality, setSleepQuality] = useState("Deep & Restorative");

  // Voice Reflection State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState(
    "I felt a little rushed around 2 PM because of back-to-back discussions, but stepping outside for 5 minutes broke the tension."
  );
  const [voiceSummary, setVoiceSummary] = useState<string | null>(null);

  const toggleEmotionTag = (tag: string) => {
    if (emotionTags.includes(tag)) {
      setEmotionTags(emotionTags.filter((t) => t !== tag));
    } else {
      setEmotionTags([...emotionTags, tag]);
    }
  };

  const handleLogMood = () => {
    const newEntry = {
      date: "Just now",
      mood: selectedMood,
      stress: stressLevel,
      note: moodNote || "Mindful check-in recorded.",
    };
    setMoodHistory([newEntry, ...moodHistory]);
    setMoodNote("");
  };

  const handleSaveJournal = () => {
    if (!newJournalBody.trim()) return;
    setJournalEntries([
      {
        id: "j_" + Date.now(),
        date: "Today",
        prompt: "Evening reflection",
        body: newJournalBody,
      },
      ...journalEntries,
    ]);
    setNewJournalBody("");
  };

  const handleAnalyzeVoice = () => {
    setVoiceSummary(
      "Theme Identified: Midday meeting compression relieved by physical movement. Suggestion: Protect a 10-minute buffer after high-stakes meetings."
    );
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <div className="flex items-center gap-2">
            <DimensionPill dimension="mental" />
            <span className="text-xs font-mono text-[#3E4542]">Module 02</span>
          </div>
          <h1 className="text-3xl font-light text-[#603E99] tracking-tight mt-1">
            Mental Serenity & Headspace
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Non-judgmental emotional tracking, private guided reflection, and instant somatic calm.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#FAF8F4] border border-[#B9A5DF]/30 text-xs">
          {[
            { id: "mood", label: "Mood Tracker" },
            { id: "meditation", label: "Meditation" },
            { id: "journal", label: "Journal" },
            { id: "sleep", label: "Sleep" },
            { id: "voice", label: "Voice Reflection" },
            { id: "calm", label: "Instant Calm" },
            { id: "support", label: "Support" },
            { id: "student", label: "Student Mode" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#7B59BA] text-white shadow-subtle"
                  : "text-[#3E4542] hover:text-[#603E99]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURE 1: DAILY MOOD TRACKER */}
      {activeTab === "mood" && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Record Form */}
            <div className="lg:col-span-7 rounded-3xl bg-[#FAF8F4] border border-[#B9A5DF]/35 p-7 shadow-soft space-y-6">
              <h3 className="text-xl font-medium text-[#603E99]">How does your headspace feel right now?</h3>

              {/* Mood Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-[#3E4542]">Primary Mood State</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {["Calm & Grounded", "Creative Flow", "Reflective", "Slight Friction", "Overwhelmed", "Joyful"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMood(m)}
                      className={`p-3 rounded-xl border text-left font-medium transition-all ${
                        selectedMood === m
                          ? "bg-[#7B59BA] text-white border-[#7B59BA] shadow-subtle"
                          : "bg-white text-[#222624] border-[#B9A5DF]/30 hover:border-[#7B59BA]/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emotion Tags */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-[#3E4542]">Subtle Nuances</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Peaceful", "Anxious", "Focused", "Fatigued", "Grateful", "Restless", "Hopeful"].map((t) => {
                    const isSel = emotionTags.includes(t);
                    return (
                      <button
                        key={t}
                        onClick={() => toggleEmotionTag(t)}
                        className={`px-3 py-1.5 rounded-full border transition-all ${
                          isSel
                            ? "bg-[#B9A5DF]/40 text-[#603E99] border-[#B9A5DF] font-semibold"
                            : "bg-white text-[#3E4542] border-[#B9A5DF]/30"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stress Level Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#3E4542]">
                  <span className="uppercase">Perceived Stress / Friction</span>
                  <span className="font-mono text-[#603E99]">{stressLevel} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(parseInt(e.target.value))}
                  className="w-full accent-[#7B59BA]"
                />
                <div className="flex justify-between text-[10px] text-[#3E4542]">
                  <span>1 (Zero Stress)</span>
                  <span>5 (Moderate)</span>
                  <span>10 (High Tension)</span>
                </div>
              </div>

              <Input
                label="Optional Private Note"
                placeholder="What influenced your headspace today?"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
              />

              <Button variant="mental" size="md" onClick={handleLogMood}>
                Record Mindful Pulse
              </Button>
            </div>

            {/* History & Personal Patterns */}
            <div className="lg:col-span-5 rounded-3xl bg-[#FAF8F4] border border-[#B9A5DF]/35 p-7 space-y-5">
              <h4 className="text-base font-medium text-[#603E99]">Recent Headspace Logs</h4>
              <div className="space-y-3">
                {moodHistory.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-[#B9A5DF]/25 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#222624]">{h.mood}</span>
                      <span className="text-[10px] font-mono text-[#3E4542]">{h.date}</span>
                    </div>
                    <p className="text-[11px] text-[#3E4542] leading-snug">{h.note}</p>
                    <div className="text-[10px] text-[#7B59BA] font-medium pt-1">
                      Stress Level: {h.stress}/10
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FEATURE 2: MEDITATION AND MINDFULNESS */}
      {activeTab === "meditation" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Morning Sunlight Clarity", duration: "10 min", desc: "Awaken prefrontal alertness and orient to the day." },
              { title: "Midday Somatic Decompression", duration: "5 min", desc: "Release neck, shoulder, and facial tension." },
              { title: "Twilight Sleep Transition", duration: "15 min", desc: "Slow alpha waves to encourage natural melatonin release." },
            ].map((med, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#B9A5DF]/30 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#603E99]">
                    <span>GUIDED SESSION</span>
                    <span>{med.duration}</span>
                  </div>
                  <h4 className="text-base font-medium text-[#222624]">{med.title}</h4>
                  <p className="text-xs text-[#3E4542] leading-relaxed">{med.desc}</p>
                </div>
                <Button variant="mental" size="sm" onClick={() => setActiveTab("calm")} leftIcon={<Play className="w-3.5 h-3.5" />}>
                  Begin Session
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURE 3: DIGITAL JOURNAL (STRICT PRIVACY) */}
      {activeTab === "journal" && (
        <section className="space-y-6">
          <div className="p-4 rounded-xl bg-[#F4F0FA] border border-[#B9A5DF]/40 flex items-center justify-between text-xs text-[#603E99]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#7B59BA]" />
              <span className="font-medium">Private by Default:</span>
              <span>Your journal entries are encrypted on your device. Never shared or sent to AI without consent.</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-[#3E4542]">AI Opt-In:</label>
              <input
                type="checkbox"
                checked={journalAiOptIn}
                onChange={(e) => setJournalAiOptIn(e.target.checked)}
                className="w-4 h-4 rounded text-[#7B59BA]"
              />
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-[#FAF8F4] border border-[#B9A5DF]/35 space-y-4">
            <h4 className="text-base font-medium text-[#603E99]">Today&apos;s Guided Reflection Prompt</h4>
            <p className="text-sm font-serif italic text-[#3E4542]">
              &ldquo;What digital or physical boundary provided you the greatest relief today?&rdquo;
            </p>
            <textarea
              rows={4}
              value={newJournalBody}
              onChange={(e) => setNewJournalBody(e.target.value)}
              placeholder="Reflect freely in your private sanctuary..."
              className="w-full p-4 rounded-xl border border-[#B9A5DF]/30 bg-white text-sm text-[#222624] outline-none focus:border-[#7B59BA]"
            />
            <Button variant="mental" size="sm" onClick={handleSaveJournal}>
              Save Private Journal Entry
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#3E4542] uppercase tracking-wider">Past Entries</h4>
            {journalEntries.map((j) => (
              <div key={j.id} className="p-4 rounded-xl bg-[#FAF8F4] border border-[#B9A5DF]/20 space-y-1 text-xs">
                <div className="flex items-center justify-between text-[#3E4542] font-mono text-[10px]">
                  <span>{j.prompt}</span>
                  <span>{j.date}</span>
                </div>
                <p className="text-xs text-[#222624] leading-relaxed pt-1">{j.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURE 4: SLEEP AND RELAXATION */}
      {activeTab === "sleep" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#B9A5DF]/35 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Target Bedtime</span>
              <div className="text-3xl font-light text-[#603E99]">{bedtime}</div>
              <p className="text-xs text-[#1A8A7A]">Circadian sleep onset window</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#B9A5DF]/35 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Wake-Up Target</span>
              <div className="text-3xl font-light text-[#603E99]">{wakeTime}</div>
              <p className="text-xs text-[#3E4542]">8h 00m sleep opportunity</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#B9A5DF]/35 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Last Reported Quality</span>
              <div className="text-xl font-medium text-[#603E99]">{sleepQuality}</div>
              <p className="text-xs text-[#1A8A7A]">Zero blue light after 10:20 PM</p>
            </div>
          </div>
        </section>
      )}

      {/* FEATURE 5: AI VOICE REFLECTION */}
      {activeTab === "voice" && (
        <section className="rounded-3xl bg-[#FAF8F4] border border-[#B9A5DF]/35 p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-medium text-[#603E99]">Reflective Voice Journal</h3>
            <p className="text-xs text-[#3E4542]">Speak your thoughts freely. The system transcribes your words and acts as a reflective mirror.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-4 rounded-full flex items-center justify-center transition-all ${
                isRecording ? "bg-[#ED805A] text-white animate-pulse" : "bg-[#7B59BA] text-white"
              }`}
            >
              {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <span className="text-xs font-medium text-[#3E4542]">
              {isRecording ? "Listening to your reflection..." : "Click microphone to dictate or edit transcript below"}
            </span>
          </div>

          <textarea
            rows={3}
            value={voiceTranscript}
            onChange={(e) => setVoiceTranscript(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#B9A5DF]/30 bg-white text-xs text-[#222624]"
          />

          <Button variant="mental" size="sm" onClick={handleAnalyzeVoice}>
            Reflect on Themes
          </Button>

          {voiceSummary && (
            <div className="p-4 rounded-xl bg-[#F4F0FA] border border-[#B9A5DF]/40 space-y-2 text-xs">
              <span className="font-semibold text-[#603E99]">Reflective Summary:</span>
              <p className="text-[#222624]">{voiceSummary}</p>
            </div>
          )}

          <div className="p-3 rounded-xl bg-white border border-[#B9A5DF]/20 text-[11px] text-[#3E4542] leading-normal flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#7B59BA] shrink-0 mt-0.5" />
            <span>
              <strong>Scientific Principle:</strong> Voice tone does not reliably detect genuine psychiatric states. This tool offers reflective prompts, not affective diagnosis.
            </span>
          </div>
        </section>
      )}

      {/* FEATURE 6: INSTANT CALM MODE */}
      {activeTab === "calm" && (
        <section className="rounded-3xl bg-[#FAF8F4] border border-[#B9A5DF]/35 p-10 text-center space-y-8">
          <div className="max-w-md mx-auto space-y-2">
            <Badge variant="info" size="sm">Instant Calm Sanctuary</Badge>
            <h3 className="text-2xl font-light text-[#603E99]">5-4-3-2-1 Sensory Grounding</h3>
            <p className="text-xs text-[#3E4542]">
              Follow the expanding and contracting rhythm. Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.
            </p>
          </div>

          {/* Animated Breathing Orb */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#B9A5DF]/30 animate-ping opacity-30" />
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#7B59BA] to-[#B9A5DF] flex items-center justify-center text-white text-xs font-semibold shadow-floating transition-transform duration-1000 scale-105">
              <Wind className="w-8 h-8" />
            </div>
          </div>

          <div className="text-sm font-medium text-[#603E99]">
            Inhale calm &middot; Exhale cognitive tension
          </div>

          <Button variant="secondary" size="sm" onClick={() => alert("Somatic calm reset completed.")}>
            I Feel Grounded
          </Button>
        </section>
      )}

      {/* FEATURE 7: PROFESSIONAL SUPPORT & TRUSTED RESOURCES */}
      {activeTab === "support" && (
        <section className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#EEF3ED] border border-[#183C32]/15 space-y-3">
            <div className="flex items-center gap-2 text-[#183C32]">
              <HeartHandshake className="w-5 h-5 text-[#183C32]" />
              <h4 className="text-base font-semibold">Important Clinical Boundary</h4>
            </div>
            <p className="text-xs text-[#183C32]/90 leading-relaxed">
              TRISYNC is a holistic lifestyle companion designed for self-discovery and balance.
              It is never a substitute for qualified psychological or psychiatric care. If you are
              feeling acute distress, please reach out to trusted professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "KIRAN National Mental Health Helpline", contact: "1800-599-0019", detail: "24/7 toll-free support by Govt. of India." },
              { name: "Vandrevala Foundation Helpline", contact: "+91 9999 666 555", detail: "Free, confidential 24/7 counseling support." },
              { name: "NIMHANS Psychosocial Support", contact: "080-46110007", detail: "National Institute of Mental Health and Neurosciences." },
              { name: "AASRA Crisis Line", contact: "+91 98204 66726", detail: "24/7 confidential emotional support." },
            ].map((res, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#B9A5DF]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-[#222624]">{res.name}</h5>
                  <PhoneCall className="w-4 h-4 text-[#7B59BA]" />
                </div>
                <div className="text-xs font-mono font-medium text-[#603E99]">{res.contact}</div>
                <p className="text-[11px] text-[#3E4542]">{res.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURE 8: STUDENT STRESS SUPPORT */}
      {activeTab === "student" && (
        <section className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#B9A5DF]/35 space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#7B59BA]" />
              <h3 className="text-lg font-medium text-[#603E99]">Student Stress & Exam Headspace</h3>
            </div>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              Designed specifically for exam cycles, thesis deadlines, and study burnout prevention.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#B9A5DF]/20 space-y-1">
                <span className="text-xs font-semibold text-[#222624]">Cognitive Reset Breaks</span>
                <p className="text-[11px] text-[#3E4542]">5-minute physical walk every 50 minutes of studying resets memory consolidation.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#B9A5DF]/20 space-y-1">
                <span className="text-xs font-semibold text-[#222624]">Exam Day Grounding</span>
                <p className="text-[11px] text-[#3E4542]">Physiological sigh resets pre-exam sympathetic tremors in under 60 seconds.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#B9A5DF]/20 space-y-1">
                <span className="text-xs font-semibold text-[#222624]">Sleep Preservation</span>
                <p className="text-[11px] text-[#3E4542]">All-nighters degrade recall by 40%. A 6-hour sleep cycle protects memory synthesis.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

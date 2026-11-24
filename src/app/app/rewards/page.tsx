"use client";

import React, { useState } from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  Users,
  Gamepad2,
  Gift,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Zap,
  Target,
  ArrowRight,
  Info,
  Heart,
  Music,
} from "lucide-react";

export default function PlayAndRewardsPage() {
  const [activeTab, setActiveTab] = useState<"solo" | "cultural" | "wallet" | "community">("solo");
  const [resonancePoints, setResonancePoints] = useState(1420);
  const [streakDays, setStreakDays] = useState(14);

  // 1. PLAYABLE SOLO GAME: MEMORY MATCH
  const [memoryCards, setMemoryCards] = useState([
    { id: 1, symbol: "🌿", flipped: false, matched: false },
    { id: 2, symbol: "🧠", flipped: false, matched: false },
    { id: 3, symbol: "⚡", flipped: false, matched: false },
    { id: 4, symbol: "🌿", flipped: false, matched: false },
    { id: 5, symbol: "🧠", flipped: false, matched: false },
    { id: 6, symbol: "⚡", flipped: false, matched: false },
  ]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);

  // 2. PLAYABLE REACTION TEST
  const [reactionState, setReactionState] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [reactionStartTime, setReactionStartTime] = useState(0);
  const [reactionTimeMs, setReactionTimeMs] = useState<number | null>(null);

  // 3. Cultural Game Simulator Modal
  const [selectedCulturalGame, setSelectedCulturalGame] = useState<any>(null);

  // 4. Rewards Wallet Redemption State
  const [redeemedOffers, setRedeemedOffers] = useState<string[]>([]);
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);

  // Memory Game Logic
  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryCards[index].flipped || memoryCards[index].matched) return;

    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (newCards[first].symbol === newCards[second].symbol) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setMemoryCards(newCards);
        setFlippedIndices([]);
        setMemoryScore((s) => s + 1);
        setResonancePoints((pts) => pts + 25);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setMemoryCards(newCards);
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  const resetMemoryGame = () => {
    setMemoryCards([
      { id: 1, symbol: "🌿", flipped: false, matched: false },
      { id: 2, symbol: "🧠", flipped: false, matched: false },
      { id: 3, symbol: "⚡", flipped: false, matched: false },
      { id: 4, symbol: "🌿", flipped: false, matched: false },
      { id: 5, symbol: "🧠", flipped: false, matched: false },
      { id: 6, symbol: "⚡", flipped: false, matched: false },
    ]);
    setFlippedIndices([]);
    setMemoryScore(0);
  };

  // Reaction Test Logic
  const startReactionTest = () => {
    setReactionState("waiting");
    setReactionTimeMs(null);
    const delay = 1500 + Math.random() * 2500;
    setTimeout(() => {
      setReactionStartTime(Date.now());
      setReactionState("ready");
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionState === "waiting") {
      alert("Too early! Wait for the screen to turn Electric Teal.");
      setReactionState("idle");
    } else if (reactionState === "ready") {
      const elapsed = Date.now() - reactionStartTime;
      setReactionTimeMs(elapsed);
      setReactionState("result");
      setResonancePoints((pts) => pts + 20);
    }
  };

  const handleRedeem = (offerId: string, cost: number) => {
    if (resonancePoints < cost) {
      alert("Insufficient Resonance Points. Continue your daily balance streak to earn more!");
      return;
    }
    setResonancePoints((pts) => pts - cost);
    setRedeemedOffers([...redeemedOffers, offerId]);
    setRedeemSuccessMsg("Offer voucher unlocked! Check your email or wallet tab.");
    setTimeout(() => setRedeemSuccessMsg(null), 2500);
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
            Playful Balance
          </span>
          <h1 className="text-3xl font-light text-[#183C32] tracking-tight mt-1">
            Play & Resonance Rewards
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Rewarding sustainable life balance, cultural team games, and cognitive fitness.
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F4] border border-[#183C32]/10 text-xs">
            <Flame className="w-4 h-4 text-[#ED805A]" />
            <span className="font-semibold text-[#183C32]">{streakDays}-Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183C32] text-[#F5F1E8] text-xs">
            <Trophy className="w-4 h-4 text-[#46C5B0]" />
            <span className="font-mono font-medium">{resonancePoints} RP</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 text-xs">
        {[
          { id: "solo", label: "Solo Brain Games" },
          { id: "cultural", label: "Cultural & Group Games" },
          { id: "wallet", label: "Rewards Wallet" },
          { id: "community", label: "Social & Community" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                : "text-[#3E4542] hover:text-[#183C32]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTEXT-AWARE GAME RECOMMENDATION CALLOUT */}
      <div className="p-5 rounded-2xl bg-[#EEF3ED] border border-[#183C32]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#46C5B0]" />
            <span className="text-xs font-semibold text-[#183C32] uppercase">
              Context-Aware Game Recommendation
            </span>
          </div>
          <p className="text-xs text-[#183C32] leading-relaxed">
            &ldquo;After 2 hours of analytical work, your prefrontal cortex thrives on pattern recognition rather than passive video scrolling. Try the 60-second Memory Match below.&rdquo;
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setActiveTab("solo")}>
          Play Recommended Game
        </Button>
      </div>

      {/* CATEGORY 1: SOLO GAMES */}
      {activeTab === "solo" && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Playable Memory Match */}
            <div className="p-7 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-[#222624]">Cognitive Memory Match</h4>
                  <p className="text-xs text-[#3E4542]">Flip cards to match the three TRISYNC dimensions.</p>
                </div>
                <div className="text-xs font-mono font-medium text-[#1A8A7A]">
                  Pairs: {memoryScore} / 3 (+{memoryScore * 25} RP)
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {memoryCards.map((card, idx) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(idx)}
                    className={`h-24 rounded-2xl border text-3xl flex items-center justify-center transition-all ${
                      card.flipped || card.matched
                        ? "bg-[#183C32] border-[#183C32] text-white shadow-soft"
                        : "bg-white border-[#183C32]/15 hover:border-[#183C32]/30"
                    }`}
                  >
                    {card.flipped || card.matched ? card.symbol : "TRI"}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-[#3E4542]">Strengthens working memory without screen fatigue.</span>
                <Button variant="outline" size="sm" onClick={resetMemoryGame} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Playable Reaction Test */}
            <div className="p-7 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-5 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-semibold text-[#222624]">Circadian Reaction Reflex</h4>
                <p className="text-xs text-[#3E4542]">Measures neuromuscular readiness after physical rest.</p>
              </div>

              <div
                onClick={handleReactionClick}
                className={`h-44 rounded-2xl border flex flex-col items-center justify-center text-center p-6 transition-colors cursor-pointer select-none ${
                  reactionState === "idle" && "bg-white border-[#183C32]/15"
                } ${reactionState === "waiting" && "bg-[#ED805A] text-white border-[#ED805A]"} ${
                  reactionState === "ready" && "bg-[#46C5B0] text-[#112C25] border-[#46C5B0]"
                } ${reactionState === "result" && "bg-[#EEF3ED] text-[#183C32] border-[#183C32]/20"}`}
              >
                {reactionState === "idle" && (
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-[#183C32]">Click to Start Reaction Test</span>
                    <p className="text-xs text-[#3E4542]">When the box turns Teal, click as fast as possible!</p>
                  </div>
                )}
                {reactionState === "waiting" && (
                  <span className="text-lg font-medium">Wait for Teal...</span>
                )}
                {reactionState === "ready" && (
                  <span className="text-2xl font-bold uppercase tracking-wider">CLICK NOW!</span>
                )}
                {reactionState === "result" && (
                  <div className="space-y-1">
                    <span className="text-3xl font-mono font-light">{reactionTimeMs} ms</span>
                    <p className="text-xs font-medium text-[#1A8A7A]">Optimal Neuromuscular Tone (+20 RP)</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-[#3E4542]">Average benchmark: 220ms - 280ms.</span>
                <Button variant="secondary" size="sm" onClick={startReactionTest}>
                  {reactionState === "idle" ? "Start Test" : "Try Again"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY 2: GROUP & CULTURAL GAMES */}
      {activeTab === "cultural" && (
        <section className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-[#183C32]">Cultural & Group Wellbeing Games</h3>
            <p className="text-xs text-[#3E4542]">
              Digital adaptations and offline team challenges inspired by rich traditional Indian and community games.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "lagori",
                title: "Lagori (Seven Stones) Aim Challenge",
                heritage: "Traditional Indian Team Sport",
                focus: "Physical Agility & Hand-Eye Coordination",
                desc: "Team coordinate challenge: 7 physical outdoor target throws and sprint reset.",
                reward: "+80 RP",
              },
              {
                id: "kho-kho",
                title: "Kho-Kho Tactical Sprint Challenge",
                heritage: "Traditional Tag & Pursuit",
                focus: "Interval Cardio & Lateral Agility",
                desc: "Interval sprint session: 5 fast directional pivots and tag cadence.",
                reward: "+100 RP",
              },
              {
                id: "antakshari",
                title: "Antakshari Musical Recall",
                heritage: "Community Lyric Challenge",
                focus: "Social Connection & Memory Recall",
                desc: "Group melodic trivia: connect the last consonant to recall songs and elevate mood.",
                reward: "+60 RP",
              },
              {
                id: "kabaddi",
                title: "Kabaddi Breath & Raid Interval",
                heritage: "Breath-Control Combat Sport",
                focus: "Somatic Lung Capacity & Sprint",
                desc: "Hold continuous exhalation during a 30-second somatic raid sequence.",
                reward: "+75 RP",
              },
              {
                id: "gilli-danda",
                title: "Gilli-Danda Precision Challenge",
                heritage: "Traditional Stick & Strike",
                focus: "Depth Perception & Focus",
                desc: "Aim, pivot, and strike challenge testing spatial depth calibration.",
                reward: "+50 RP",
              },
              {
                id: "trivia",
                title: "Multiplayer Wellbeing Trivia",
                heritage: "Group Knowledge Circuit",
                focus: "Holistic Health Literacy",
                desc: "Compete with friends on nutrition, circadian rhythms, and focus science.",
                reward: "+65 RP",
              },
            ].map((game) => (
              <div
                key={game.id}
                className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#1A8A7A]">
                    <span>{game.heritage}</span>
                    <span className="font-semibold">{game.reward}</span>
                  </div>
                  <h4 className="text-base font-semibold text-[#222624]">{game.title}</h4>
                  <p className="text-xs text-[#3E4542] leading-relaxed">{game.desc}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCulturalGame(game)}
                >
                  Inspect & Play Adaptation
                </Button>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#EEF3ED] text-xs text-[#183C32] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#183C32] shrink-0" />
            <span>
              <strong>Authentic Physical Participation:</strong> Physical games are structured as real-world group mission prompts and playable digital challenges. We do not fake physical sports as passive video games.
            </span>
          </div>
        </section>
      )}

      {/* CATEGORY 3: REWARDS WALLET */}
      {activeTab === "wallet" && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#183C32] text-[#F5F1E8]">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-[#A9B9A4]">Your Available Balance</span>
              <div className="text-4xl font-light text-[#F5F1E8]">{resonancePoints} <span className="text-sm font-mono text-[#46C5B0]">RP</span></div>
              <p className="text-xs text-[#F5F1E8]/75">Earned strictly through sustainable daily life balance.</p>
            </div>
            <div className="text-xs text-[#A9B9A4] max-w-xs leading-relaxed">
              <strong>Transparent Policy:</strong> Daily reward limit is 250 RP. We will never encourage excessive screen time or gaming bingeing to earn points.
            </div>
          </div>

          {redeemSuccessMsg && (
            <div className="p-4 rounded-xl bg-[#E3FAF5] border border-[#46C5B0]/30 text-xs text-[#1A8A7A] font-medium text-center">
              {redeemSuccessMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "rw-1", title: "Organic Cold-Pressed Juices", provider: "FreshGreen Farms", cost: 350, desc: "20% off pure organic fruit & vegetable elixirs." },
              { id: "rw-2", title: "Ergonomic Desk Mat & Wrist Support", provider: "ErgoFlow", cost: 500, desc: "25% discount on cervical posture accessories." },
              { id: "rw-3", title: "1-Month Headspace Meditation Pass", provider: "Mindful Serenity", cost: 400, desc: "Complimentary access to audio sleep soundscapes." },
              { id: "rw-4", title: "Athletic Resistance Band Set", provider: "Vitality Gear", cost: 300, desc: "Set of 5 progressive resistance bands for home mobility." },
              { id: "rw-5", title: "Blue-Spectrum Twilight Glasses", provider: "Lumina Optics", cost: 600, desc: "30% voucher for evening melatonin-protective lenses." },
              { id: "rw-6", title: "Curated Herbal Sleep Tea Kit", provider: "Vedic Botanicals", cost: 250, desc: "Chamomile, Ashwagandha, and Brahmi nighttime blend." },
            ].map((item) => {
              const isRedeemed = redeemedOffers.includes(item.id);
              return (
                <div key={item.id} className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#183C32] font-semibold">{item.cost} RP</span>
                      <span className="text-[10px] text-[#3E4542]">{item.provider}</span>
                    </div>
                    <h4 className="text-base font-semibold text-[#222624]">{item.title}</h4>
                    <p className="text-xs text-[#3E4542]">{item.desc}</p>
                  </div>
                  <Button
                    variant={isRedeemed ? "secondary" : "primary"}
                    size="sm"
                    disabled={isRedeemed}
                    onClick={() => handleRedeem(item.id, item.cost)}
                  >
                    {isRedeemed ? "Voucher Unlocked" : `Redeem Voucher (${item.cost} RP)`}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-[#3E4542]/70 text-center">
            Sample reward partners displayed for demonstration. Real coupon systems integrate through verified wellness API gateways.
          </div>
        </section>
      )}

      {/* CATEGORY 4: COMMUNITY & PRIVACY-PRESERVED LEADERBOARDS */}
      {activeTab === "community" && (
        <section className="space-y-6">
          <div className="p-7 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-[#183C32]">Community Equilibrium Circle</h3>
                <p className="text-xs text-[#3E4542]">
                  Connect with fellow members pursuing life harmony. Privacy protected by design.
                </p>
              </div>
              <Badge variant="success" size="sm">Strict Privacy Guard</Badge>
            </div>

            <div className="p-4 rounded-xl bg-[#EEF3ED] border border-[#183C32]/15 text-xs text-[#183C32] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#183C32] shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Boundary:</strong> Leaderboards rank balance consistency (streaks & resonance), never exposing private medical data, body weight, or confidential journal entries.
              </span>
            </div>

            {/* Privacy-Preserved Leaderboard */}
            <div className="space-y-2">
              {[
                { rank: 1, name: "Jordan M.", streak: "28 Days", score: "94% Resonance", badge: "Tri-Sync Master" },
                { rank: 2, name: "Priya S.", streak: "21 Days", score: "91% Resonance", badge: "Circadian Guardian" },
                { rank: 3, name: "Alex V. (You)", streak: "14 Days", score: "86% Resonance", badge: "Equilibrium Pioneer" },
                { rank: 4, name: "Kiran R.", streak: "12 Days", score: "84% Resonance", badge: "Focus Architect" },
                { rank: 5, name: "Devin K.", streak: "9 Days", score: "82% Resonance", badge: "Twilight Screen Master" },
              ].map((member) => (
                <div
                  key={member.rank}
                  className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                    member.rank === 3
                      ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]"
                      : "bg-white text-[#222624] border-[#183C32]/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold w-5">{member.rank}</span>
                    <span className="font-medium">{member.name}</span>
                    <Badge variant={member.rank === 3 ? "default" : "neutral"} size="sm">
                      {member.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 font-mono">
                    <span>{member.streak}</span>
                    <span className="font-semibold">{member.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CULTURAL GAME SIMULATOR MODAL */}
      {selectedCulturalGame && (
        <Modal
          isOpen={!!selectedCulturalGame}
          onClose={() => setSelectedCulturalGame(null)}
          title={selectedCulturalGame.title}
          description={selectedCulturalGame.heritage}
          footer={
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setResonancePoints((pts) => pts + 50);
                alert(`Challenge accomplished! +50 Resonance Points added for ${selectedCulturalGame.title}`);
                setSelectedCulturalGame(null);
              }}
            >
              Mark Challenge Completed (+50 RP)
            </Button>
          }
        >
          <div className="space-y-4 text-xs text-[#3E4542]">
            <div className="p-3.5 rounded-xl bg-[#EEF3ED] text-[#183C32] space-y-1">
              <span className="font-semibold">Wellbeing Focus:</span>
              <p>{selectedCulturalGame.focus}</p>
            </div>
            <p className="leading-relaxed text-[#222624]">{selectedCulturalGame.desc}</p>
            <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#183C32]/10 leading-normal">
              <strong>Offline Group Prompt:</strong> Gather 2 or more friends or family members outdoors. Complete this traditional coordination challenge to reset mental clarity and physical circulation.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { HeroThreeScene } from "@/components/canvas/hero-three-scene";
import { CrossConnectionSimulator } from "@/components/landing/cross-connection-simulator";
import { SignatureFeatures } from "@/components/landing/signature-features";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Activity,
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HeartPulse,
  Workflow,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1E8] text-[#222624]">
      {/* 1. MINIMAL & RESPONSIVE NAVIGATION */}
      <Navbar />

      {/* MAIN CONTENT STREAM */}
      <main className="flex-1 space-y-24 sm:space-y-36 pb-24">
        {/* 2. HERO SECTION */}
        <section className="relative pt-8 sm:pt-16 lg:pt-20 overflow-hidden">
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Vision & CTAs */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F4] border border-[#183C32]/12 text-xs font-medium text-[#183C32]">
                  <span className="w-2 h-2 rounded-full bg-[#46C5B0] animate-pulse" />
                  <span className="tracking-wide uppercase font-semibold">TRISYNC Ecosystem</span>
                  <span className="text-[#3E4542]/60">&middot;</span>
                  <span className="text-[#3E4542]">Three Dimensions. One You.</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-[#183C32] leading-[1.08]">
                    Your Life. <br />
                    <span className="font-normal italic">In Sync.</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-[#3E4542] max-w-xl font-normal leading-relaxed">
                    One intelligent space connecting your physical health, mental wellbeing and digital habits.
                  </p>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/auth/signup">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Start Your Journey
                    </Button>
                  </Link>
                  <a href="#dimensions">
                    <Button variant="secondary" size="lg">
                      Explore TRISYNC
                    </Button>
                  </a>
                </div>

                {/* Dimension Badges Row */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <DimensionPill dimension="physical" />
                  <DimensionPill dimension="mental" />
                  <DimensionPill dimension="digital" />
                  <DimensionPill dimension="unified" />
                </div>
              </div>

              {/* Right Column: 3D Interconnected Tri-Dimension Core */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-[500px] rounded-3xl bg-[#FAF8F4]/85 border border-[#183C32]/12 shadow-elevated p-4 flex flex-col justify-between overflow-hidden">
                  {/* Subtle Background Radial */}
                  <div className="absolute inset-0 bg-radial-gradient from-white/60 to-transparent pointer-events-none" />

                  {/* 3D WebGL Canvas */}
                  <div className="absolute inset-0 z-0">
                    <HeroThreeScene />
                  </div>

                  {/* Overlaid Micro-Badges */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#3E4542]">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F4]/90 backdrop-blur-sm border border-[#183C32]/10">
                      INTERCONNECTED TRI-CORE
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F4]/90 backdrop-blur-sm border border-[#183C32]/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#46C5B0] animate-ping" />
                      Live Resonance
                    </span>
                  </div>

                  {/* Dimension Annotations Card */}
                  <div className="relative z-10 bg-[#FAF8F4]/95 backdrop-blur-md border border-[#183C32]/12 rounded-xl p-3.5 text-xs text-[#222624]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#183C32]">Tri-Sync Tri-Orbit</span>
                      <span className="text-[10px] uppercase font-mono text-[#46C5B0] font-medium">
                        Harmonic Resonance
                      </span>
                    </div>
                    <p className="text-[11px] text-[#3E4542]/85 mt-1 leading-snug">
                      Physical kinetic ribbons, mental synaptic clouds, and digital data pathways revolving in unified resonance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. THREE DIMENSIONS SECTION: MOVE BETTER, FEEL BETTER, LIVE SMARTER */}
        <section id="dimensions" className="scroll-mt-24">
          <Container size="xl">
            <div className="space-y-16">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183C32]/8 text-xs font-medium text-[#183C32]">
                  <Workflow className="w-3.5 h-3.5 text-[#46C5B0]" />
                  <span>The Tri-Sync Architecture</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-[#183C32] tracking-tight leading-tight">
                  Three dimensions. <br />
                  <span className="italic font-normal">Working as one organism.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#3E4542]/85 leading-relaxed">
                  These three spheres are not separate apps with separate databases. They are three lenses
                  examining the same human experience.
                </p>
              </div>

              {/* Three Dimensions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Physical Wellbeing */}
                <div className="rounded-3xl p-8 sm:p-9 bg-[#EEF3ED] border border-[#183C32]/15 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#183C32] text-[#F5F1E8] flex items-center justify-center shadow-subtle">
                      <Activity className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <DimensionPill dimension="physical" size="sm" />
                      <h3 className="text-2xl sm:text-3xl font-medium text-[#183C32] pt-1">
                        Physical Wellbeing
                      </h3>
                      <p className="text-sm font-serif italic text-[#183C32]/80">
                        Move better.
                      </p>
                    </div>

                    <p className="text-sm text-[#183C32]/85 leading-relaxed">
                      Tracks biological motion, circadian rest, muscular recovery, and cardiovascular stamina.
                      Connects workout loads directly to next-day mental focus capacity.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#183C32]/15 text-xs text-[#183C32]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#183C32]" />
                        <span>Circadian sleep architecture & HRV</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#183C32]" />
                        <span>Active exertion & recovery forecasting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#183C32]" />
                        <span>Micro-movement somatic resets</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#183C32]/15 flex items-center justify-between text-xs font-medium text-[#183C32]">
                    <span className="font-mono">#183C32 &middot; #A9B9A4</span>
                    <Link href="/auth/signup" className="hover:underline flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Mental Wellbeing */}
                <div className="rounded-3xl p-8 sm:p-9 bg-[#F4F0FA] border border-[#B9A5DF]/40 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#7B59BA] text-white flex items-center justify-center shadow-subtle">
                      <Brain className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <DimensionPill dimension="mental" size="sm" />
                      <h3 className="text-2xl sm:text-3xl font-medium text-[#603E99] pt-1">
                        Mental Wellbeing
                      </h3>
                      <p className="text-sm font-serif italic text-[#603E99]/80">
                        Feel better.
                      </p>
                    </div>

                    <p className="text-sm text-[#603E99]/85 leading-relaxed">
                      Monitors cognitive friction, subjective mood currents, and mental endurance.
                      Reveals how late-night digital stimulus elevates morning anxiety spikes.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#B9A5DF]/40 text-xs text-[#603E99]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7B59BA]" />
                        <span>Cognitive friction & focus endurance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7B59BA]" />
                        <span>Mindfulness resonance logs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7B59BA]" />
                        <span>Stress decompression micro-rituals</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#B9A5DF]/40 flex items-center justify-between text-xs font-medium text-[#603E99]">
                    <span className="font-mono">#B9A5DF &middot; #7B59BA</span>
                    <Link href="/auth/signup" className="hover:underline flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Digital Wellbeing */}
                <div className="rounded-3xl p-8 sm:p-9 bg-[#E3FAF5] border border-[#46C5B0]/35 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1A8A7A] text-white flex items-center justify-center shadow-subtle">
                      <Sparkles className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <DimensionPill dimension="digital" size="sm" />
                      <h3 className="text-2xl sm:text-3xl font-medium text-[#0F685B] pt-1">
                        Digital Wellbeing
                      </h3>
                      <p className="text-sm font-serif italic text-[#0F685B]/80">
                        Live smarter.
                      </p>
                    </div>

                    <p className="text-sm text-[#0F685B]/85 leading-relaxed">
                      Measures intentionality in device connection, notification fatigue, and screen boundaries.
                      Protects restorative sleep cycles from evening blue-spectrum traps.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#46C5B0]/35 text-xs text-[#0F685B]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1A8A7A]" />
                        <span>Late-evening twilight screen boundaries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1A8A7A]" />
                        <span>Compulsive tab & distraction prediction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1A8A7A]" />
                        <span>Digital downtime & presence scoring</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#46C5B0]/35 flex items-center justify-between text-xs font-medium text-[#0F685B]">
                    <span className="font-mono">#46C5B0 &middot; #ED805A</span>
                    <Link href="/auth/signup" className="hover:underline flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. HOW TRISYNC CONNECTS YOU: INTERACTIVE PATTERN SIMULATOR */}
        <section id="how-it-works" className="scroll-mt-24">
          <Container size="xl">
            <CrossConnectionSimulator />
          </Container>
        </section>

        {/* 5. SIGNATURE FEATURES SECTION */}
        <section id="features" className="scroll-mt-24">
          <Container size="xl">
            <SignatureFeatures />
          </Container>
        </section>

        {/* 6. ETHICAL DATA & PRIVACY COMMITMENT (ABOUT SECTION) */}
        <section id="about" className="scroll-mt-24">
          <Container size="xl">
            <div className="rounded-3xl bg-[#183C32] text-[#F5F1E8] p-8 sm:p-14 lg:p-16 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#46C5B0]/15 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F4]/10 border border-[#F5F1E8]/15 text-xs text-[#A9B9A4]">
                  <Lock className="w-3.5 h-3.5 text-[#46C5B0]" />
                  <span className="uppercase tracking-wider font-medium">
                    Privacy by Design & Human Agency
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#F5F1E8] leading-tight">
                  No stealth trackers. <br />
                  <span className="font-medium italic">No unconsented surveillance.</span>
                </h3>

                <p className="text-base sm:text-lg text-[#F5F1E8]/80 leading-relaxed font-normal">
                  TRISYNC operates under a non-negotiable architectural rule: we never claim automated access
                  to device hardware, phone records, or sensor telemetry without explicit, user-granted consent.
                  You hold complete ownership to revoke permissions or delete your personal universe at any moment.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-sm text-[#A9B9A4]">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#46C5B0]" /> Local data encryption
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#46C5B0]" /> Granular consent switches
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#46C5B0]" /> 1-Click data purge
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 7. FINAL CALL TO ACTION */}
        <section className="relative">
          <Container size="xl">
            <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/15 p-10 sm:p-16 lg:p-20 text-center shadow-soft relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183C32]/8 text-xs font-medium text-[#183C32]">
                  <Sparkles className="w-3.5 h-3.5 text-[#46C5B0]" />
                  <span>Begin Today</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-light text-[#183C32] tracking-tight">
                  Start Building a Life in Sync.
                </h2>

                <p className="text-base sm:text-lg text-[#3E4542]/85 leading-relaxed font-normal">
                  Experience personal wellbeing as one unified, intelligent ecosystem.
                  Calibrate your physical vitality, mental clarity, and digital rhythm in minutes.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/auth/signup">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="w-full sm:w-auto"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
}

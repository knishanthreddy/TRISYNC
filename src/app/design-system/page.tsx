"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "@/components/design-system/color-swatch";
import { TypographySpecimen } from "@/components/design-system/typography-specimen";
import { ComponentShowcase } from "@/components/design-system/component-showcase";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function DesignSystemPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1E8] text-[#222624]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 space-y-16">
        <Container size="xl">
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#183C32] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to TRISYNC Landing</span>
            </Link>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183C32]/8 text-xs font-medium text-[#183C32]">
                <Sparkles className="w-3.5 h-3.5 text-[#46C5B0]" />
                <span>TRISYNC Living Design System</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-light text-[#183C32] tracking-tight">
                Design System Specification & Component Lab
              </h1>
              <p className="text-base text-[#3E4542]/85 max-w-2xl leading-relaxed">
                The comprehensive reusable token and component suite governing all TRISYNC public
                and authenticated user experiences.
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-20">
            {/* Color Tokens */}
            <section className="space-y-6">
              <div className="border-b border-[#183C32]/10 pb-4">
                <h2 className="text-2xl font-light text-[#183C32]">1. Organic Color System</h2>
                <p className="text-xs text-[#3E4542]">
                  Warm Ivory (#F5F1E8), Deep Forest (#183C32), Electric Teal (#46C5B0), Terracotta (#ED805A), Lavender (#B9A5DF).
                </p>
              </div>
              <ColorSwatch />
            </section>

            {/* Typography */}
            <section className="space-y-6">
              <div className="border-b border-[#183C32]/10 pb-4">
                <h2 className="text-2xl font-light text-[#183C32]">2. Editorial Typography Scale</h2>
                <p className="text-xs text-[#3E4542]">
                  Display, Headline, Body, and Telemetry microcopy tokens.
                </p>
              </div>
              <TypographySpecimen />
            </section>

            {/* Interactive Components */}
            <section className="space-y-6">
              <div className="border-b border-[#183C32]/10 pb-4">
                <h2 className="text-2xl font-light text-[#183C32]">3. Interactive Component Suite</h2>
                <p className="text-xs text-[#3E4542]">
                  Buttons, form controls, modals, tooltips, dimension badges, and multi-dimensional trend charts.
                </p>
              </div>
              <ComponentShowcase />
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Lock, Mail, User, Sparkles, ShieldCheck } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || name.trim().length < 2) {
      setError("Please enter your display name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consentAccepted) {
      setError("Please acknowledge the privacy principles before continuing.");
      return;
    }

    setIsLoading(true);
    const result = await signUp(name, email, password);
    setIsLoading(false);

    if (result.success) {
      // Directs to Onboarding Flow to select goals and permissions!
      router.push("/onboarding");
    } else {
      setError(result.error || "Failed to create account.");
    }
  };

  const handleQuickTest = async () => {
    setIsLoading(true);
    await signUp("Morgan Reed", "morgan.reed@example.com");
    setIsLoading(false);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#183C32] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#183C32] flex items-center justify-center text-[10px] font-semibold text-[#F5F1E8]">
            TRI
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#183C32]">TRISYNC</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md mx-auto my-10">
        <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-8 sm:p-10 shadow-soft space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
              Begin Your Journey
            </h1>
            <p className="text-xs sm:text-sm text-[#3E4542]/80">
              Create your account to calibrate physical, mental and digital balance.
            </p>
          </div>

          {/* Quick Demo Pre-Fill */}
          <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#183C32]/10 flex items-center justify-between text-xs text-[#183C32]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#46C5B0]" />
              <span className="font-medium">Fast-Track Setup:</span>
            </div>
            <button
              type="button"
              onClick={handleQuickTest}
              disabled={isLoading}
              className="font-semibold underline hover:text-[#112C25] transition-colors"
            >
              Pre-Fill & Start Onboarding &rarr;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Preferred Name"
              type="text"
              placeholder="e.g. Jordan Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="jordan@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Choose Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              helperText="Minimum 8 characters with numbers and letters."
            />

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-[#3E4542] cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
                />
                <span className="leading-relaxed">
                  I agree to TRISYNC&apos;s privacy boundary: telemetry is analyzed strictly
                  for my personal wellbeing and never monetized.
                </span>
              </label>
            </div>

            {error && (
              <p className="text-xs text-[#ED805A] font-medium p-2.5 rounded-lg bg-[#FDF1EC]">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Onboarding
            </Button>
          </form>

          <div className="pt-4 border-t border-[#183C32]/10 text-center text-xs text-[#3E4542]">
            <span>Already have a TRISYNC account? </span>
            <Link href="/auth/signin" className="text-[#183C32] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="w-full max-w-md mx-auto text-center text-[11px] text-[#3E4542]/70 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#183C32]" />
        <span>Strict zero-knowledge telemetry encryption architecture.</span>
      </div>
    </div>
  );
}

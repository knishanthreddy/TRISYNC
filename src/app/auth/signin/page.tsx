"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Lock, Mail, Sparkles, Check } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsLoading(true);
    const result = await signIn(email, password);
    setIsLoading(false);
    if (result.success) {
      router.push("/app/overview");
    } else {
      setError(result.error || "Failed to sign in.");
    }
  };

  const handleQuickDemo = async () => {
    setIsLoading(true);
    await signIn("alex@trisync.io");
    setIsLoading(false);
    router.push("/app/overview");
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
      <div className="w-full max-w-md mx-auto my-12">
        <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-8 sm:p-10 shadow-soft space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[#3E4542]/80">
              Access your personal cross-dimensional universe.
            </p>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#183C32]/10 flex items-center justify-between text-xs text-[#183C32]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#46C5B0]" />
              <span className="font-medium">Instant Evaluation:</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              disabled={isLoading}
              className="font-semibold underline hover:text-[#112C25] transition-colors"
            >
              1-Click Demo Login &rarr;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#3E4542] cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
                />
                <span>Keep in sync on this device</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-[#183C32] hover:underline font-medium"
              >
                Forgot password?
              </Link>
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
              Sign In to TRISYNC
            </Button>
          </form>

          <div className="pt-4 border-t border-[#183C32]/10 text-center text-xs text-[#3E4542]">
            <span>Don&apos;t have an account? </span>
            <Link href="/auth/signup" className="text-[#183C32] font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="w-full max-w-md mx-auto text-center text-[11px] text-[#3E4542]/70">
        TRISYNC protects your personal biometric and screen telemetry with zero third-party monetization.
      </div>
    </div>
  );
}

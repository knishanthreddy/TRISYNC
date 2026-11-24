"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    const res = await resetPassword(email);
    setIsLoading(false);
    setMessage(res.message);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#183C32] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#183C32] flex items-center justify-center text-[10px] font-semibold text-[#F5F1E8]">
            TRI
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#183C32]">TRISYNC</span>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto my-12">
        <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-8 sm:p-10 shadow-soft space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight">
              Password Recovery
            </h1>
            <p className="text-xs sm:text-sm text-[#3E4542]/80">
              Enter your account email to receive cryptographic reset instructions.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#E3FAF5] border border-[#46C5B0]/30 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#46C5B0]/20 text-[#1A8A7A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-medium text-[#1A8A7A]">Reset Link Dispatched</h4>
              <p className="text-xs text-[#3E4542] leading-relaxed">{message}</p>
              <div className="pt-2">
                <Link href="/auth/signin">
                  <Button variant="secondary" size="sm">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Send Recovery Instructions
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-[#183C32]/10 text-center text-xs text-[#3E4542]">
            <Link href="/auth/signin" className="text-[#183C32] font-semibold hover:underline">
              &larr; Back to Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto text-center text-[11px] text-[#3E4542]/70">
        TRISYNC accounts use end-to-end tokenized auth.
      </div>
    </div>
  );
}

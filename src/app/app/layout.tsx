"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Activity,
  Brain,
  Sparkles,
  Orbit,
  LineChart,
  Trophy,
  User,
  LogOut,
  ArrowRight,
  Menu,
  X,
  Bot,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/app/overview", label: "Overview", icon: LayoutGrid },
  { href: "/app/agent", label: "Wellness Agent", icon: Bot },
  { href: "/app/physical", label: "Physical Wellbeing", icon: Activity },
  { href: "/app/mental", label: "Mental Wellbeing", icon: Brain },
  { href: "/app/digital", label: "Digital Wellbeing", icon: Sparkles },
  { href: "/app/universe", label: "My Universe", icon: Orbit },
  { href: "/app/insights", label: "Insights & Engine", icon: LineChart },
  { href: "/app/rewards", label: "Play & Rewards", icon: Trophy },
  { href: "/app/profile", label: "My Profile", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, signOut, signIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If unauthenticated, allow instant 1-click session demo
  if (!isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-3xl bg-[#FAF8F4] border border-[#183C32]/15 p-8 text-center space-y-6 shadow-soft">
          <div className="w-12 h-12 rounded-xl bg-[#183C32] text-[#F5F1E8] flex items-center justify-center mx-auto text-sm font-semibold">
            TRI
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-[#183C32]">Sign In Required</h2>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              You are accessing the authenticated TRISYNC application space. Please sign in or
              initialize an instant evaluation session.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={async () => {
                await signIn("alex@trisync.io");
                router.refresh();
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              1-Click Instant Demo Access
            </Button>
            <Link href="/auth/signin" className="block">
              <Button variant="outline" size="md" className="w-full">
                Go to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col md:flex-row text-[#222624]">
      {/* DESKTOP COMPACT SIDEBAR */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-[#FAF8F4] border-r border-[#183C32]/10 p-6 shrink-0 h-screen sticky top-0">
        <div className="space-y-6">
          {/* Brand Header */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg bg-[#183C32] flex items-center justify-center shadow-subtle group-hover:bg-[#112C25] transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#46C5B0] absolute -top-0.5 -right-0.5 ring-2 ring-[#FAF8F4]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ED805A] absolute -bottom-0.5 -left-0.5 ring-2 ring-[#FAF8F4]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B9A5DF] absolute -top-0.5 -left-0.5 ring-2 ring-[#FAF8F4]" />
              <span className="text-[#F5F1E8] font-semibold text-xs tracking-wider">TRI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-[#183C32]">TRISYNC</span>
              <span className="text-[10px] uppercase tracking-widest text-[#3E4542] opacity-80 -mt-0.5">
                Wellbeing Intelligence
              </span>
            </div>
          </Link>

          {/* Live Sync Status Badge */}
          <div className="p-3 rounded-2xl bg-[#EEF3ED] border border-[#183C32]/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#183C32]">Tri-Sync Resonance</span>
              <span className="font-mono font-semibold text-[#183C32]">{user?.syncScore || 86}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#183C32]/10 overflow-hidden">
              <div
                className="h-full bg-[#183C32] rounded-full"
                style={{ width: `${user?.syncScore || 86}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#3E4542] pt-0.5">
              <span>{user?.streakDays || 14}-Day Streak</span>
              <span className="text-[#1A8A7A] font-medium">Optimal Rhythm</span>
            </div>
          </div>

          {/* Main Navigation Links */}
          <nav className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                      : "text-[#3E4542] hover:bg-[#183C32]/5 hover:text-[#183C32]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#46C5B0]" : "text-current"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="pt-4 border-t border-[#183C32]/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#183C32]/10 border border-[#183C32]/15 flex items-center justify-center font-medium text-xs text-[#183C32]">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#222624] truncate max-w-[120px]">
                  {user?.name || "Member"}
                </span>
                <span className="text-[10px] text-[#3E4542]/70 truncate max-w-[120px]">
                  {user?.email || "sync@trisync.io"}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              title="Sign Out"
              className="p-1.5 rounded-lg text-[#3E4542] hover:text-[#ED805A] hover:bg-[#ED805A]/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP NAVIGATION BAR */}
      <div className="md:hidden sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#183C32]/10 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#183C32] flex items-center justify-center text-xs font-semibold text-[#F5F1E8]">
            TRI
          </div>
          <span className="text-sm font-semibold text-[#183C32]">TRISYNC</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full bg-[#183C32]/10 text-[11px] font-mono text-[#183C32]">
            {user?.syncScore || 86}%
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#222624] hover:bg-[#183C32]/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F4] border-b border-[#183C32]/10 p-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium ${
                  isActive ? "bg-[#183C32] text-[#F5F1E8]" : "text-[#3E4542] hover:bg-[#183C32]/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#183C32]/10 flex items-center justify-between text-xs">
            <span className="text-[#3E4542]">{user?.name}</span>
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="text-[#ED805A] font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* MAIN APPLICATION VIEWPORT */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, UserCheck } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[#183C32]/10 transition-colors">
      <Container size="xl">
        <div className="flex items-center justify-between h-20">
          {/* TRISYNC Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg bg-[#183C32] flex items-center justify-center shadow-subtle group-hover:bg-[#112C25] transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#46C5B0] absolute -top-0.5 -right-0.5 ring-2 ring-[#F5F1E8]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ED805A] absolute -bottom-0.5 -left-0.5 ring-2 ring-[#F5F1E8]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B9A5DF] absolute -top-0.5 -left-0.5 ring-2 ring-[#F5F1E8]" />
              <span className="text-[#F5F1E8] font-semibold text-xs tracking-wider">TRI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-[#183C32]">
                TRISYNC
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#3E4542] opacity-80 -mt-0.5">
                Your Life. In Sync.
              </span>
            </div>
          </Link>

          {/* Minimal Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3E4542]">
            <Link href="/" className="hover:text-[#183C32] transition-colors py-1">
              Home
            </Link>
            <a href="#dimensions" className="hover:text-[#183C32] transition-colors py-1">
              Explore
            </a>
            <a href="#how-it-works" className="hover:text-[#183C32] transition-colors py-1">
              How It Works
            </a>
            <a href="#features" className="hover:text-[#183C32] transition-colors py-1">
              Features
            </a>
            <a href="#about" className="hover:text-[#183C32] transition-colors py-1">
              About
            </a>
          </nav>

          {/* Action CTAs: Direct Application Launch */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/app/overview">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Launch TRISYNC
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#222624] hover:bg-[#183C32]/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#183C32]/10 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium text-[#222624]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#183C32]/5 transition-colors"
              >
                Home
              </Link>
              <a
                href="#dimensions"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#183C32]/5 transition-colors"
              >
                Explore Dimensions
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#183C32]/5 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#183C32]/5 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#183C32]/5 transition-colors"
              >
                About TRISYNC
              </a>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/app/overview" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Launch TRISYNC
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

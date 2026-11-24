import React from "react";
import Link from "next/link";
import { Container } from "./container";
import { BRAND } from "@/lib/constants";
import { ShieldCheck, HeartHandshake, Eye, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#183C32] text-[#F5F1E8] pt-16 pb-12 border-t border-[#183C32]/40">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#F5F1E8]/10">
          {/* Brand Vision Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F4] flex items-center justify-center text-[#183C32] font-semibold text-xs tracking-wider">
                TRI
              </div>
              <span className="text-xl font-semibold tracking-tight text-[#F5F1E8]">
                {BRAND.name}
              </span>
            </Link>
            <p className="text-sm text-[#F5F1E8]/80 leading-relaxed max-w-md">
              {BRAND.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#A9B9A4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#46C5B0]" />
              <span>{BRAND.slogan}</span>
            </div>
          </div>

          {/* Product & Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#A9B9A4]">
              Navigation
            </h5>
            <ul className="space-y-2 text-sm text-[#F5F1E8]/75">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#dimensions" className="hover:text-white transition-colors">
                  Dimensions
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Signature Features
                </a>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-white transition-colors flex items-center gap-1 text-[#46C5B0]">
                  <span>Design System Lab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Application Portal */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#A9B9A4]">
              Application
            </h5>
            <ul className="space-y-2 text-sm text-[#F5F1E8]/75">
              <li>
                <Link href="/app/overview" className="hover:text-white transition-colors">
                  Overview Dashboard
                </Link>
              </li>
              <li>
                <Link href="/app/devices" className="hover:text-white transition-colors">
                  Connected Wearables & Sync
                </Link>
              </li>
              <li>
                <Link href="/app/overview" className="hover:text-white transition-colors">
                  Personal Universe
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-white transition-colors">
                  Calibration Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Governance Notice */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#A9B9A4] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#46C5B0]" />
              <span>Ethical Data Boundary</span>
            </h5>
            <p className="text-xs text-[#F5F1E8]/70 leading-relaxed">
              TRISYNC operates exclusively on user-consented telemetry. No unauthorized device
              monitoring or sensor reading is assumed. Full ownership and data deletion at any time.
            </p>
            <div className="pt-2 flex flex-col gap-1 text-xs text-[#A9B9A4]">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Transparent Logic
              </span>
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5" /> Zero Ad Monetization
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1E8]/60">
          <div>
            &copy; {new Date().getFullYear()} TRISYNC Ecosystem. Organic Futurism &times; Digital Intelligence.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/#about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              Terms of Consent
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              Contact & Support
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

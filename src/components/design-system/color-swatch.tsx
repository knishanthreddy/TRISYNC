"use client";

import React, { useState } from "react";
import { COLOR_TOKENS } from "@/lib/constants";
import { Check, Copy } from "lucide-react";

export const ColorSwatch: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(COLOR_TOKENS).map(([key, token]) => {
          const isCopied = copiedHex === token.hex;
          const isLight =
            token.hex === "#F5F1E8" ||
            token.hex === "#FFFFFF" ||
            token.hex === "#A9B9A4" ||
            token.hex === "#B9A5DF" ||
            token.hex === "#46C5B0";

          return (
            <div
              key={key}
              onClick={() => handleCopy(token.hex)}
              className="group relative rounded-2xl p-5 border border-[#183C32]/10 bg-[#FAF8F4] hover:shadow-soft transition-all duration-200 cursor-pointer flex flex-col justify-between h-44"
            >
              {/* Color Visual Block */}
              <div
                className="w-full h-16 rounded-xl border border-black/5 shadow-innerGlow transition-transform duration-200 group-hover:scale-[1.02] flex items-center justify-end p-2.5"
                style={{ backgroundColor: token.hex }}
              >
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm ${
                    isLight ? "bg-black/15 text-[#222624]" : "bg-white/20 text-white"
                  }`}
                >
                  {token.hex}
                </span>
              </div>

              {/* Token Info */}
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#222624] tracking-tight">
                    {token.name}
                  </span>
                  <span className="text-xs text-[#3E4542] opacity-70 group-hover:opacity-100 transition-opacity">
                    {isCopied ? (
                      <span className="inline-flex items-center gap-1 text-[#183C32] font-medium">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </span>
                </div>
                <p className="text-xs text-[#3E4542]/75 mt-0.5 leading-snug">
                  {token.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

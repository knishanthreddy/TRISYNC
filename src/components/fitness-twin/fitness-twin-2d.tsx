"use client";

import React, { useState } from "react";
import { MuscleRegion, TwinVisualLayer } from "./types";
import { REGION_TELEMETRY } from "./twin-data";
import { FlipHorizontal } from "lucide-react";

interface FitnessTwin2DProps {
  selectedRegion: MuscleRegion;
  activeLayer: TwinVisualLayer;
  onSelectRegion: (region: MuscleRegion) => void;
  className?: string;
}

export const FitnessTwin2D: React.FC<FitnessTwin2DProps> = ({
  selectedRegion,
  activeLayer,
  onSelectRegion,
  className = "",
}) => {
  const [isFrontView, setIsFrontView] = useState(true);

  const getRegionFill = (region: MuscleRegion) => {
    const isSelected = selectedRegion === region || selectedRegion === "all";
    const data = REGION_TELEMETRY[region];

    if (isSelected) {
      if (activeLayer === "recovery") return data.readinessColor;
      if (activeLayer === "nutrition") return "#ED805A";
      if (activeLayer === "measurements") return "#46C5B0";
      if (activeLayer === "transformation") return "#B9A5DF";
      return "#46C5B0";
    }

    // Default layer tones
    switch (activeLayer) {
      case "recovery":
        return data.readinessColor;
      case "activity":
        return data.weeklySets >= data.targetWeeklySets ? "#183C32" : "#A9B9A4";
      case "nutrition":
        return "#2E5C50";
      case "transformation":
        return "#7B968B";
      default:
        return "#183C32";
    }
  };

  return (
    <div className={`relative w-full h-[400px] sm:h-[480px] flex flex-col items-center justify-center p-4 ${className}`}>
      {/* Front / Back Toggle */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsFrontView(!isFrontView)}
          className="px-3 py-1.5 rounded-xl bg-white border border-[#183C32]/15 text-xs font-medium text-[#183C32] hover:bg-[#FAF8F4] transition-all flex items-center gap-1.5 shadow-subtle"
        >
          <FlipHorizontal className="w-3.5 h-3.5 text-[#46C5B0]" />
          <span>{isFrontView ? "Switch to Back View" : "Switch to Front View"}</span>
        </button>
      </div>

      {/* SVG Anatomical Silhouette */}
      <svg
        viewBox="0 0 280 440"
        className="w-full max-w-[260px] h-full drop-shadow-md select-none"
        aria-label={`2D Anatomical Map (${isFrontView ? "Anterior" : "Posterior"} view). Click to select muscle group.`}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Head & Neck */}
        <ellipse cx="140" cy="40" rx="24" ry="30" fill="#222624" opacity="0.8" />
        <rect x="133" y="68" width="14" height="18" rx="4" fill="#222624" opacity="0.8" />

        {/* ANTERIOR (FRONT) VIEW */}
        {isFrontView ? (
          <g>
            {/* Shoulders / Deltoids */}
            <path
              d="M 92 88 C 76 92, 70 110, 80 128 C 90 120, 98 102, 92 88 Z"
              fill={getRegionFill("shoulders")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("shoulders")}
            />
            <path
              d="M 188 88 C 204 92, 210 110, 200 128 C 190 120, 182 102, 188 88 Z"
              fill={getRegionFill("shoulders")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("shoulders")}
            />

            {/* Chest (Pectoralis) */}
            <path
              d="M 96 90 Q 140 94 184 90 Q 182 136 140 138 Q 98 136 96 90 Z"
              fill={getRegionFill("chest")}
              stroke="#F5F1E8"
              strokeWidth="2"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("chest")}
            />

            {/* Arms (Biceps & Forearms) */}
            <rect
              x="62"
              y="126"
              width="20"
              height="58"
              rx="9"
              fill={getRegionFill("arms")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("arms")}
            />
            <rect
              x="198"
              y="126"
              width="20"
              height="58"
              rx="9"
              fill={getRegionFill("arms")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("arms")}
            />

            {/* Core / Abdomen */}
            <path
              d="M 104 140 Q 140 142 176 140 Q 170 200 140 202 Q 110 200 104 140 Z"
              fill={getRegionFill("core")}
              stroke="#F5F1E8"
              strokeWidth="2"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("core")}
            />

            {/* Legs (Quadriceps & Calves) */}
            <path
              d="M 108 206 C 104 260, 96 300, 102 334 C 114 334, 134 330, 134 260 L 134 206 Z"
              fill={getRegionFill("legs")}
              stroke="#F5F1E8"
              strokeWidth="2"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("legs")}
            />
            <path
              d="M 172 206 C 176 260, 184 300, 178 334 C 166 334, 146 330, 146 260 L 146 206 Z"
              fill={getRegionFill("legs")}
              stroke="#F5F1E8"
              strokeWidth="2"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("legs")}
            />

            {/* Calves */}
            <rect
              x="100"
              y="338"
              width="26"
              height="72"
              rx="10"
              fill={getRegionFill("legs")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("legs")}
            />
            <rect
              x="154"
              y="338"
              width="26"
              height="72"
              rx="10"
              fill={getRegionFill("legs")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("legs")}
            />
          </g>
        ) : (
          /* POSTERIOR (BACK) VIEW */
          <g>
            {/* Traps & Upper / Lower Back */}
            <path
              d="M 94 88 Q 140 76 186 88 L 176 195 Q 140 200 104 195 Z"
              fill={getRegionFill("back")}
              stroke="#F5F1E8"
              strokeWidth="2"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("back")}
            />

            {/* Rear Deltoids */}
            <path
              d="M 90 92 C 74 96, 68 114, 78 132 C 88 124, 94 106, 90 92 Z"
              fill={getRegionFill("shoulders")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("shoulders")}
            />
            <path
              d="M 190 92 C 206 96, 212 114, 202 132 C 192 124, 186 106, 190 92 Z"
              fill={getRegionFill("shoulders")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("shoulders")}
            />

            {/* Triceps */}
            <rect
              x="62"
              y="126"
              width="20"
              height="58"
              rx="9"
              fill={getRegionFill("arms")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("arms")}
            />
            <rect
              x="198"
              y="126"
              width="20"
              height="58"
              rx="9"
              fill={getRegionFill("arms")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("arms")}
            />

            {/* Glutes & Hamstrings */}
            <path
              d="M 104 198 Q 140 204 176 198 L 178 334 Q 140 338 102 334 Z"
              fill={getRegionFill("legs")}
              stroke="#F5F1E8"
              strokeWidth="2"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("legs")}
            />

            {/* Calves / Achilles */}
            <rect
              x="100"
              y="338"
              width="26"
              height="72"
              rx="10"
              fill={getRegionFill("legs")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("legs")}
            />
            <rect
              x="154"
              y="338"
              width="26"
              height="72"
              rx="10"
              fill={getRegionFill("legs")}
              stroke="#F5F1E8"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200 hover:opacity-90"
              onClick={() => onSelectRegion("legs")}
            />
          </g>
        )}
      </svg>

      <div className="text-[11px] font-mono text-[#3E4542] mt-2">
        Click any region to inspect telemetry
      </div>
    </div>
  );
};

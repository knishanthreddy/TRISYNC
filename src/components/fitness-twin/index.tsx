"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MuscleRegion, TwinVisualLayer } from "./types";
import { TwinContextPanel } from "./twin-context-panel";
import { FitnessTwin2D } from "./fitness-twin-2d";
import { Sparkles, Layers, Box, Map } from "lucide-react";

// Lazy-load the Three.js 3D canvas for performance and bundle optimization
const FitnessTwin3D = dynamic(
  () => import("./fitness-twin-3d").then((mod) => mod.FitnessTwin3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[480px] flex flex-col items-center justify-center space-y-3 bg-[#FAF8F4] rounded-3xl border border-[#183C32]/10">
        <div className="w-8 h-8 rounded-full border-2 border-[#183C32] border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-[#3E4542]">Initializing 3D Kinetic Twin...</span>
      </div>
    ),
  }
);

interface FitnessDigitalTwinProps {
  initialRegion?: MuscleRegion;
  initialLayer?: TwinVisualLayer;
  className?: string;
  onActionTrigger?: (actionName: string) => void;
}

export const AdvancedFitnessDigitalTwin: React.FC<FitnessDigitalTwinProps> = ({
  initialRegion = "chest",
  initialLayer = "activity",
  className = "",
  onActionTrigger,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<MuscleRegion>(initialRegion);
  const [activeLayer, setActiveLayer] = useState<TwinVisualLayer>(initialLayer);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/10 shadow-subtle">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#183C32] text-[#46C5B0] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#183C32]">TRISYNC Kinetic Digital Twin</h4>
            <p className="text-[11px] text-[#3E4542]">Interactive musculoskeletal wellness model</p>
          </div>
        </div>

        {/* 3D vs 2D Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white border border-[#183C32]/15 text-xs">
          <button
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              viewMode === "3d"
                ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                : "text-[#3E4542] hover:text-[#183C32]"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Model</span>
          </button>
          <button
            onClick={() => setViewMode("2d")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              viewMode === "2d"
                ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                : "text-[#3E4542] hover:text-[#183C32]"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>2D Anatomical Map</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Viewport on Left, Rich Context Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Viewport */}
        <div className="lg:col-span-6 xl:col-span-7 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/15 p-6 shadow-soft relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          <div className="flex items-center justify-between text-xs font-mono text-[#3E4542] pb-2 border-b border-[#183C32]/10">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#46C5B0]" />
              <span className="uppercase">{viewMode === "3d" ? "3D Spatial Mesh" : "2D Vector Diagram"}</span>
            </span>
            <span className="text-[11px] text-[#183C32] font-semibold">
              {viewMode === "3d" ? "Drag to rotate &middot; Pinch to zoom" : "Click to select region"}
            </span>
          </div>

          {/* Model Viewport */}
          <div className="relative my-2">
            {viewMode === "3d" ? (
              <FitnessTwin3D
                selectedRegion={selectedRegion}
                activeLayer={activeLayer}
                onSelectRegion={(reg) => setSelectedRegion(reg)}
              />
            ) : (
              <FitnessTwin2D
                selectedRegion={selectedRegion}
                activeLayer={activeLayer}
                onSelectRegion={(reg) => setSelectedRegion(reg)}
              />
            )}
          </div>

          {/* Bottom Active Status Bar */}
          <div className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#183C32]/10 text-xs flex items-center justify-between shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#46C5B0] animate-pulse" />
              <span className="text-[#3E4542]">Active Focus:</span>
              <span className="font-semibold text-[#183C32] capitalize">{selectedRegion}</span>
            </div>
            <div className="text-[11px] font-mono text-[#3E4542]">
              Layer: <span className="text-[#183C32] font-semibold capitalize">{activeLayer}</span>
            </div>
          </div>
        </div>

        {/* Right: Rich Context Panel */}
        <div className="lg:col-span-6 xl:col-span-5">
          <TwinContextPanel
            selectedRegion={selectedRegion}
            activeLayer={activeLayer}
            onSelectRegion={(reg) => setSelectedRegion(reg)}
            onSelectLayer={(layer) => setActiveLayer(layer)}
            onActionTrigger={onActionTrigger}
          />
        </div>
      </div>
    </div>
  );
};

export * from "./types";
export * from "./twin-data";

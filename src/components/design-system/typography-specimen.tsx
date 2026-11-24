import React from "react";

export const TypographySpecimen: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Editorial Overview */}
      <div className="space-y-8 border-b border-[#183C32]/10 pb-10">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#3E4542]">
            Display Large &middot; 48px / Line Height 1.15
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#183C32] leading-tight">
            Your Life. <span className="font-normal italic">In Sync.</span>
          </h1>
        </div>

        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#3E4542]">
            Headline 1 &middot; 32px / Line Height 1.25
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-medium tracking-tight text-[#222624]">
            Three dimensions working together through one unified intelligence.
          </h2>
        </div>

        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#3E4542]">
            Headline 2 &middot; 24px / Line Height 1.3
          </span>
          <h3 className="mt-1 text-xl sm:text-2xl font-normal text-[#222624]">
            Organic Futurism meets disciplined digital intelligence.
          </h3>
        </div>

        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#3E4542]">
            Headline 3 &middot; 18px / Line Height 1.4
          </span>
          <h4 className="mt-1 text-lg font-medium text-[#183C32]">
            Physical vitality, mental serenity, and digital harmony.
          </h4>
        </div>
      </div>

      {/* Body & Microcopy Scale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#3E4542]">
            Body Large &middot; 16px / Regular
          </span>
          <p className="text-base text-[#222624]/90 leading-relaxed">
            TRISYNC connects the subtle dots between how physical exertion affects
            cognitive endurance, and how late-night digital screentime fractures
            subsequent restorative sleep cycles.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#3E4542]">
            Body Default &middot; 14px / Regular
          </span>
          <p className="text-sm text-[#3E4542] leading-relaxed">
            Instead of presenting three fragmented apps, every metric is evaluated
            cross-dimensionally. Actions are proposed only when supported by clear
            correlations across all three spheres of life.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#3E4542]">
            Caption & Microcopy &middot; 12px / Medium
          </span>
          <p className="text-xs text-[#3E4542]/80 leading-normal">
            Calibrated against personal baseline &middot; Verified consent boundaries &middot;
            Sample metrics strictly isolated from operational inference.
          </p>
          <div className="pt-2">
            <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#183C32]/15 text-[#183C32]">
              TIMESTAMP_UTC_2026_CALIBRATION
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

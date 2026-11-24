export const BRAND = {
  name: "TRISYNC",
  tagline: "Your Life. In Sync.",
  slogan: "Three dimensions. One you.",
  description:
    "A unified personal wellbeing intelligence ecosystem connecting physical vitality, mental clarity, and digital balance.",
};

export const COLOR_TOKENS = {
  warmIvory: {
    hex: "#F5F1E8",
    name: "Warm Ivory",
    role: "Primary Canvas Background",
    textClass: "text-[#F5F1E8]",
    bgClass: "bg-[#F5F1E8]",
  },
  deepForest: {
    hex: "#183C32",
    name: "Deep Forest",
    role: "Primary Contrast & Physical Anchor",
    textClass: "text-[#183C32]",
    bgClass: "bg-[#183C32]",
  },
  electricTeal: {
    hex: "#46C5B0",
    name: "Electric Teal",
    role: "Digital Intelligence & Active Metric Accent",
    textClass: "text-[#46C5B0]",
    bgClass: "bg-[#46C5B0]",
  },
  terracotta: {
    hex: "#ED805A",
    name: "Terracotta",
    role: "Digital Alert, Boundary & Energy Accent",
    textClass: "text-[#ED805A]",
    bgClass: "bg-[#ED805A]",
  },
  softLavender: {
    hex: "#B9A5DF",
    name: "Soft Lavender",
    role: "Mental Serenity & Mindfulness Accent",
    textClass: "text-[#B9A5DF]",
    bgClass: "bg-[#B9A5DF]",
  },
  charcoal: {
    hex: "#222624",
    name: "Charcoal",
    role: "Primary Typographic Element & Base Depth",
    textClass: "text-[#222624]",
    bgClass: "bg-[#222624]",
  },
  mutedSage: {
    hex: "#A9B9A4",
    name: "Muted Sage",
    role: "Physical Equilibrium & Soft Surface Accent",
    textClass: "text-[#A9B9A4]",
    bgClass: "bg-[#A9B9A4]",
  },
  white: {
    hex: "#FFFFFF",
    name: "Pure White",
    role: "Elevated Surface & Refined Highlight",
    textClass: "text-white",
    bgClass: "bg-white",
  },
} as const;

export type DimensionKey = "physical" | "mental" | "digital" | "unified";

export interface DimensionMeta {
  key: DimensionKey;
  label: string;
  sublabel: string;
  themeColor: string;
  accentColor: string;
  surfaceColor: string;
  borderColor: string;
  pillClasses: string;
  iconName: string;
  essence: string;
}

export const DIMENSIONS: Record<DimensionKey, DimensionMeta> = {
  physical: {
    key: "physical",
    label: "Physical Wellbeing",
    sublabel: "Vitality, Sleep, Motion & Recovery",
    themeColor: "#183C32",
    accentColor: "#A9B9A4",
    surfaceColor: "#EEF3ED",
    borderColor: "rgba(24, 60, 50, 0.16)",
    pillClasses: "bg-[#EEF3ED] text-[#183C32] border border-[#A9B9A4]/40",
    iconName: "Activity",
    essence: "Rooted vitality and natural recovery rhythms.",
  },
  mental: {
    key: "mental",
    label: "Mental Wellbeing",
    sublabel: "Clarity, Stress, Cognitive Load & Focus",
    themeColor: "#7B59BA",
    accentColor: "#B9A5DF",
    surfaceColor: "#F4F0FA",
    borderColor: "rgba(185, 165, 223, 0.35)",
    pillClasses: "bg-[#F4F0FA] text-[#6948A8] border border-[#B9A5DF]/40",
    iconName: "Brain",
    essence: "Cognitive serenity and emotional equilibrium.",
  },
  digital: {
    key: "digital",
    label: "Digital Wellbeing",
    sublabel: "Intentionality, Screen Flow & Screen Boundaries",
    themeColor: "#1A8A7A",
    accentColor: "#46C5B0",
    surfaceColor: "#E3FAF5",
    borderColor: "rgba(70, 197, 176, 0.3)",
    pillClasses: "bg-[#E3FAF5] text-[#1A8A7A] border border-[#46C5B0]/40",
    iconName: "Sparkles",
    essence: "Disciplined digital rhythm and intentional screen connection.",
  },
  unified: {
    key: "unified",
    label: "Unified Tri-Sync",
    sublabel: "Cross-dimensional synthesis & intelligence",
    themeColor: "#183C32",
    accentColor: "#46C5B0",
    surfaceColor: "#F5F1E8",
    borderColor: "rgba(24, 60, 50, 0.12)",
    pillClasses: "bg-[#FAF8F4] text-[#222624] border border-[#183C32]/20",
    iconName: "Compass",
    essence: "Three dimensions interacting as one harmonious organism.",
  },
};

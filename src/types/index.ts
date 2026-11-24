export type DimensionType = "physical" | "mental" | "digital" | "unified";

export type ComponentState = "idle" | "loading" | "empty" | "error" | "success";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "physical"
  | "mental"
  | "digital";
export type ButtonSize = "sm" | "md" | "lg";

export interface UserPermissions {
  screenTimeConsented: boolean;
  healthSensorsConsented: boolean;
  locationContextConsented: boolean;
  anonymizedAnalyticsConsented: boolean;
}

export interface UserSchedule {
  wakeTime: string;
  sleepTime: string;
  workStart: string;
  workEnd: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnboarded: boolean;
  ageRange?: string;
  mode?: "professional" | "student" | "hybrid";
  activityLevel?: "sedentary" | "moderate" | "active" | "athlete";
  schedule?: UserSchedule;
  reminderTimes?: string[];
  goals: string[];
  permissions: UserPermissions;
  syncScore: number;
  streakDays: number;
  createdAt: string;
}

export interface SyncMetric {
  id: string;
  dimension: DimensionType;
  label: string;
  value: number | string;
  unit?: string;
  target?: number | string;
  status: "optimal" | "balanced" | "needs-attention";
  delta?: string;
}

export interface SyncPattern {
  id: string;
  title: string;
  insight: string;
  dimensionsInvolved: DimensionType[];
  impactScore: number; // 0 - 100
  suggestedAction: string;
  timestamp: string;
  evidence: string;
  causalDisclaimer: string;
}

export interface WellnessMission {
  id: string;
  dimension: DimensionType;
  title: string;
  description: string;
  rewardPoints: number;
  durationMinutes: number;
  completed: boolean;
  category: string;
}

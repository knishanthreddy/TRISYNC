export type MuscleRegion =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "core"
  | "legs"
  | "all";

export type TwinVisualLayer =
  | "activity"
  | "measurements"
  | "nutrition"
  | "recovery"
  | "transformation";

export interface RegionTelemetry {
  region: MuscleRegion;
  displayName: string;
  anatomicalNote: string;
  // Activity layer
  weeklySets: number;
  targetWeeklySets: number;
  lastTrained: string;
  primaryExercises: string[];
  suggestedNextWorkout: string;
  // Measurements layer
  recordedCircumference?: string;
  baselineCircumference?: string;
  deltaMeasurement?: string;
  // Nutrition layer
  proteinAllocatedGrams: number;
  targetProteinGrams: number;
  glycogenStatus: "depleted" | "optimal" | "supercompensated";
  // Recovery layer
  recoveryScore: number; // 0 - 100%
  recoveryStatus: "Fully Recovered" | "Optimal Readiness" | "Moderate Fatigue" | "High Strain";
  readinessColor: string; // hex
  sorenessScore: number; // 1 - 10
  restDaysSinceTrained: number;
  // Transformation layer
  milestoneTitle: string;
  milestoneProgressPercent: number;
  milestoneNotes: string;
}

export interface BodyMeasurementRecord {
  date: string;
  weightKg: number;
  chestCm: number;
  waistCm: number;
  armCm: number;
  thighCm: number;
  isRealRecorded: boolean;
}

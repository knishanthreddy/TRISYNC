import { DimensionType } from "./index";

export interface AgentRecommendation {
  id: string;
  title: string;
  description: string;
  targetDimension: DimensionType;
  reasoning: string;
  urgency: "immediate" | "morning" | "afternoon" | "evening" | "night";
  status: "pending" | "accepted" | "modified" | "dismissed";
  userActionLabel?: string;
  reminderSuggested?: boolean;
  reminderScheduled?: boolean;
}

export interface DailyRoutineSlot {
  period: "morning" | "afternoon" | "evening" | "night";
  timeRange: string;
  primaryAction: string;
  dimension: DimensionType;
  rationale: string;
  isCompleted?: boolean;
}

export interface DailyRoutinePlan {
  id: string;
  date: string;
  title: string;
  focusTheme: string;
  slots: DailyRoutineSlot[];
}

export interface SportsFacility {
  id: string;
  name: string;
  sportType: "badminton" | "swimming" | "gym" | "tennis" | "cricket" | "yoga";
  distanceKm: number;
  locationArea: string;
  pricingEstimate: string;
  rating: number;
  availableSlot: string;
  requiresConfirmation: boolean;
}

export interface AgentChatMessage {
  id: string;
  sender: "user" | "agent";
  timestamp: string;
  text: string;
  recommendations?: AgentRecommendation[];
  routinePlan?: DailyRoutinePlan;
  facilityOptions?: SportsFacility[];
  requiresReminderConfirmation?: {
    reminderTitle: string;
    proposedTime: string;
  };
  disclaimer?: string;
}

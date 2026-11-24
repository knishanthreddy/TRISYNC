import { AgentChatMessage, AgentRecommendation, DailyRoutinePlan, SportsFacility } from "@/types/agent";

export const SAMPLE_FACILITIES: SportsFacility[] = [
  {
    id: "fac_1",
    name: "SmashZone Badminton Arena",
    sportType: "badminton",
    distanceKm: 1.8,
    locationArea: "Indiranagar Hub",
    pricingEstimate: "₹450 / hr (wooden court)",
    rating: 4.8,
    availableSlot: "Today, 06:00 PM – 07:00 PM",
    requiresConfirmation: true,
  },
  {
    id: "fac_2",
    name: "AquaVitality Olympic Pool",
    sportType: "swimming",
    distanceKm: 2.4,
    locationArea: "Koramangala Sports Complex",
    pricingEstimate: "₹350 / 90 min session",
    rating: 4.7,
    availableSlot: "Tomorrow, 07:00 AM – 08:30 AM",
    requiresConfirmation: true,
  },
  {
    id: "fac_3",
    name: "UrbanClimb & Movement Studio",
    sportType: "yoga",
    distanceKm: 3.1,
    locationArea: "HSR Layout",
    pricingEstimate: "₹500 / drop-in session",
    rating: 4.9,
    availableSlot: "Today, 07:30 PM (Vinyasa Flow)",
    requiresConfirmation: true,
  },
];

export function generateDailyRoutine(theme: string = "Balanced Performance"): DailyRoutinePlan {
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return {
    id: "routine_" + Math.random().toString(36).substring(2, 7),
    date: today,
    title: `Coordinated Rhythm Plan (${theme})`,
    focusTheme: theme,
    slots: [
      {
        period: "morning",
        timeRange: "07:00 AM – 08:30 AM",
        primaryAction: "Check sleep quality & 15-min Sun Salutation (Surya Namaskar) or brisk mobility walk",
        dimension: "physical",
        rationale: "Natural morning photons and mobility activate biological circadian rhythms without taxing nervous energy.",
      },
      {
        period: "afternoon",
        timeRange: "01:30 PM – 03:00 PM",
        primaryAction: "25-minute Pomodoro focus block followed by a 5-minute somatic standing break and hydration",
        dimension: "digital",
        rationale: "Counters the observed post-lunch dip and prevents involuntary tab distraction.",
      },
      {
        period: "evening",
        timeRange: "06:00 PM – 07:15 PM",
        primaryAction: "Physical workout (Chest/Core or Outdoor Sports) + quick 10-minute cultural play/Antakshari with friends",
        dimension: "physical",
        rationale: "Discharges mental cognitive fatigue accumulated during daytime academic or work blocks.",
      },
      {
        period: "night",
        timeRange: "09:45 PM – 10:30 PM",
        primaryAction: "5-minute physiological sigh breathwork + activate Twilight Screen Mode (no social feeds)",
        dimension: "mental",
        rationale: "Reduces sympathetic arousal and protects deep slow-wave sleep onset.",
      },
    ],
  };
}

export function processAgentQuery(query: string, userContext?: any): AgentChatMessage {
  const q = query.toLowerCase();
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // SCENARIO 1: Exams / Academic Stress / Difficulty Concentrating
  if (q.includes("exam") || q.includes("concentrate") || q.includes("focus") || q.includes("study")) {
    const routine = generateDailyRoutine("Exam Focus & Stress Buffering");
    return {
      id: "msg_" + Math.random().toString(36).substring(2, 8),
      sender: "agent",
      timestamp,
      text: "I hear you, Alex. Preparing for exams while managing mental fatigue is challenging. Rather than forcing marathon study sessions that lead to burnout, let's balance your focus blocks with restorative physical breaks.",
      recommendations: [
        {
          id: "rec_study_sprint",
          title: "Start a 25-Minute Structured Study Sprint",
          description: "Focus on one high-yield subject topic with digital notification limits enabled.",
          targetDimension: "digital",
          reasoning: "Prevents cognitive overload and creates a clear mental finish line.",
          urgency: "immediate",
          status: "pending",
          userActionLabel: "Start Focus Sprint",
          reminderSuggested: true,
        },
        {
          id: "rec_somatic_walk",
          title: "Take a 10-Minute Outdoor Sensory Walk",
          description: "Step away from books and screens; observe natural depth of field to relax optic nerves.",
          targetDimension: "physical",
          reasoning: "Walking increases cerebral blood flow by 15%, significantly enhancing information retention.",
          urgency: "afternoon",
          status: "pending",
          userActionLabel: "Log 10-min Walk",
        },
        {
          id: "rec_memory_game",
          title: "Play Cognitive Memory Match",
          description: "Quick 2-minute visual recall exercise to warm up working memory.",
          targetDimension: "mental",
          reasoning: "Activates prefrontal cortex memory pathways before deep study blocks.",
          urgency: "immediate",
          status: "pending",
          userActionLabel: "Play Memory Game",
        },
      ],
      routinePlan: routine,
      requiresReminderConfirmation: {
        reminderTitle: "Exam Focus Sprint Break",
        proposedTime: "In 25 minutes",
      },
      disclaimer: "Wellness guidance based on your authorized study goals. Not medical advice for anxiety.",
    };
  }

  // SCENARIO 2: Sports Facilities / Booking Research
  if (q.includes("sport") || q.includes("facility") || q.includes("court") || q.includes("book") || q.includes("badminton") || q.includes("pool")) {
    return {
      id: "msg_" + Math.random().toString(36).substring(2, 8),
      sender: "agent",
      timestamp,
      text: "I researched authorized sports venues near your area based on your activity preferences. Here are verified facilities with open recreational slots today and tomorrow:",
      facilityOptions: SAMPLE_FACILITIES,
      recommendations: [
        {
          id: "rec_badminton_group",
          title: "Reserve Recreational Badminton Slot",
          description: "High-energy aerobic movement with social interaction.",
          targetDimension: "physical",
          reasoning: "Provides cardiovascular training while disconnecting completely from work screens.",
          urgency: "evening",
          status: "pending",
          userActionLabel: "Request Booking Confirmation",
        },
      ],
      disclaimer: "TRISYNC never books or charges payment automatically. Every booking requires your explicit review and confirmation.",
    };
  }

  // SCENARIO 3: Games / Play Recommendation
  if (q.includes("game") || q.includes("play") || q.includes("fun") || q.includes("refresh")) {
    return {
      id: "msg_" + Math.random().toString(36).substring(2, 8),
      sender: "agent",
      timestamp,
      text: "Games are an essential pillar of holistic wellbeing in TRISYNC! Depending on whether you want solo cognitive sharpening or social interaction with friends:",
      recommendations: [
        {
          id: "rec_reflex_test",
          title: "Play Reaction Reflex Test",
          description: "Test neurological response time against random auditory and visual stimuli.",
          targetDimension: "mental",
          reasoning: "Sharpens sensory-motor coordination after sedentary screen work.",
          urgency: "immediate",
          status: "pending",
          userActionLabel: "Play Reflex Test",
        },
        {
          id: "rec_lagori_play",
          title: "Organize Traditional Lagori (Pithu) Game",
          description: "Classic 7-stone team sport requiring agility, target precision and team coordination.",
          targetDimension: "physical",
          reasoning: "Delivers full-body interval conditioning with rich cultural social bonding.",
          urgency: "evening",
          status: "pending",
          userActionLabel: "View Lagori Guide",
        },
        {
          id: "rec_antakshari",
          title: "Evening Antakshari Session",
          description: "Casual music and lyric recall with family or friends.",
          targetDimension: "mental",
          reasoning: "Music triggers dopamine release and decreases social isolation.",
          urgency: "evening",
          status: "pending",
          userActionLabel: "View Rules",
        },
      ],
      disclaimer: "Interactive play activities calibrated for physical and social balance.",
    };
  }

  // SCENARIO 4: Sleep / Fatigue / Low Energy
  if (q.includes("sleep") || q.includes("tired") || q.includes("fatigue") || q.includes("energy")) {
    return {
      id: "msg_" + Math.random().toString(36).substring(2, 8),
      sender: "agent",
      timestamp,
      text: "I checked your recent authorized records: you logged 7.5 hours of sleep last night, but your evening screen time extended to 11:15 PM. This often explains morning sluggishness despite adequate total hours.",
      recommendations: [
        {
          id: "rec_twilight_routine",
          title: "Initiate Twilight Screen Boundary at 10:15 PM",
          description: "Place your phone on the bedside charging dock 45 minutes before sleep.",
          targetDimension: "digital",
          reasoning: "Allows natural melatonin secretion to trigger deeper restorative slow-wave sleep.",
          urgency: "night",
          status: "pending",
          userActionLabel: "Set Twilight Schedule",
          reminderSuggested: true,
        },
        {
          id: "rec_instant_calm",
          title: "5-4-3-2-1 Sensory Grounding",
          description: "A 3-minute physiological reset to disengage mental loop thoughts.",
          targetDimension: "mental",
          reasoning: "Calms sympathetic hyper-arousal before sleep onset.",
          urgency: "night",
          status: "pending",
          userActionLabel: "Open Instant Calm",
        },
      ],
      requiresReminderConfirmation: {
        reminderTitle: "Evening Phone-Free Wind-down",
        proposedTime: "10:15 PM tonight",
      },
      disclaimer: "Observed behavioral pattern. Not a clinical diagnosis for insomnia.",
    };
  }

  // DEFAULT / GENERAL ASSISTANT RESPONSE
  const defaultRoutine = generateDailyRoutine("Holistic Tri-Sync Rhythms");
  return {
    id: "msg_" + Math.random().toString(36).substring(2, 8),
    sender: "agent",
    timestamp,
    text: `I'm analyzing your authorized TRISYNC profile (Physical: 82%, Mental: 78%, Digital: 88%). You are maintaining a solid 14-day streak! Here is an integrated daily plan designed to keep your three dimensions in sync:`,
    routinePlan: defaultRoutine,
    recommendations: [
      {
        id: "rec_default_walk",
        title: "Log a 20-Minute Evening Outdoor Walk",
        description: "Maintain physical consistency without overtraining.",
        targetDimension: "physical",
        reasoning: "Directly correlates with higher recorded next-day mental calm.",
        urgency: "evening",
        status: "pending",
        userActionLabel: "Log Walk",
      },
      {
        id: "rec_default_detox",
        title: "Evening Digital Detox Check-in",
        description: "Log 30 minutes away from social feeds before dinner.",
        targetDimension: "digital",
        reasoning: "Creates mental transition space between work and relaxation.",
        urgency: "evening",
        status: "pending",
        userActionLabel: "Start Detox",
      },
    ],
    disclaimer: "All recommendations are optional and explainable. You can accept, modify, or dismiss any suggestion.",
  };
}

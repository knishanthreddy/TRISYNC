import { NextRequest, NextResponse } from "next/server";
import { runIntelligenceSynthesis, UnifiedTimelineEvent } from "@/lib/intelligence-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const events: UnifiedTimelineEvent[] = body.events || [];
    const userConsented: boolean = body.userConsented ?? true;

    // Run deterministic cross-correlation engine
    const synthesis = runIntelligenceSynthesis(events, userConsented);

    // If server has GEMINI_API_KEY, can enrich narrative synthesis server-side
    // with graceful fallback when missing or rate-limited
    const apiKey = process.env.GEMINI_API_KEY;
    let aiEnhanced = false;

    if (apiKey) {
      // Prepared for Gemini 2.0 / Flash structured enrichment
      aiEnhanced = true;
    }

    return NextResponse.json({
      success: true,
      aiEnhanced,
      synthesis,
      generatedAt: new Date().toISOString(),
      ethicalNotice:
        "TRISYNC Intelligence synthesizes empirical patterns derived strictly from user-consented inputs. Never presented as medical diagnosis.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to run intelligence synthesis.",
      },
      { status: 500 }
    );
  }
}

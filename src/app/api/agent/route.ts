import { NextRequest, NextResponse } from "next/server";
import { processAgentQuery } from "@/lib/agent-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, userContext } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query string is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        // Live Gemini API integration branch
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are the TRISYNC Personal Wellness Agent. TRISYNC is a holistic wellbeing ecosystem uniting Physical, Mental, and Digital health.
Rules:
1. Never assume how the user feels.
2. Never diagnose medical conditions or give clinical psychiatry advice.
3. Never schedule reminders without user permission.
4. Explain all recommendations with transparent rationale.
5. Emphasize balance across Physical, Mental, and Digital dimensions.
User Query: "${query}"`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const aiText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            const fallback = processAgentQuery(query, userContext);
            return NextResponse.json({
              id: "msg_" + Math.random().toString(36).substring(2, 8),
              sender: "agent",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              text: aiText,
              recommendations: fallback.recommendations,
              routinePlan: fallback.routinePlan,
              disclaimer: "Synthesized via Gemini AI with TRISYNC ethical wellbeing guardrails.",
            });
          }
        }
      } catch {
        // Fall through to deterministic engine on network failure
      }
    }

    // High-performance deterministic fallback
    const result = processAgentQuery(query, userContext);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal agent engine error" },
      { status: 500 }
    );
  }
}

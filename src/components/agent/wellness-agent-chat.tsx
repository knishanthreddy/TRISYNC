"use client";

import React, { useState, useRef, useEffect } from "react";
import { AgentChatMessage, AgentRecommendation, DailyRoutinePlan, SportsFacility } from "@/types/agent";
import { processAgentQuery } from "@/lib/agent-engine";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Sparkles,
  Send,
  ShieldCheck,
  CheckCircle2,
  X,
  Bell,
  Calendar,
  Clock,
  MapPin,
  Star,
  Lock,
  ChevronRight,
  Info,
  HelpCircle,
  Dumbbell,
  Brain,
  Smartphone,
} from "lucide-react";

export const WellnessAgentChat: React.FC = () => {
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: "msg_initial",
      sender: "agent",
      timestamp: "Just now",
      text: "Hello Alex. I'm your TRISYNC Personal Wellness Agent. I continuously review your consented physical workouts, mental check-ins and digital rhythms to help you live a balanced life in sync.",
      disclaimer: "I never make unilateral decisions, schedule unapproved reminders, or access encrypted journal records.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Booking Modal State
  const [bookingModalFacility, setBookingModalFacility] = useState<SportsFacility | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  // Modify Recommendation Modal
  const [modifyingRec, setModifyingRec] = useState<AgentRecommendation | null>(null);
  const [modifiedText, setModifiedText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: AgentChatMessage = {
      id: "usr_" + Math.random().toString(36).substring(2, 7),
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulated natural assistant deliberation delay
    setTimeout(() => {
      const response = processAgentQuery(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const handleRecommendationAction = (
    msgId: string,
    recId: string,
    action: "accept" | "modify" | "dismiss"
  ) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId || !msg.recommendations) return msg;
        return {
          ...msg,
          recommendations: msg.recommendations.map((rec) => {
            if (rec.id !== recId) return rec;
            if (action === "accept") return { ...rec, status: "accepted" };
            if (action === "dismiss") return { ...rec, status: "dismissed" };
            return rec;
          }),
        };
      })
    );
  };

  const handleScheduleReminder = (msgId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg;
        return {
          ...msg,
          requiresReminderConfirmation: undefined,
          text: msg.text + "\n\n✓ Reminder permission granted and registered to your device calendar.",
        };
      })
    );
  };

  const QUICK_PROMPTS = [
    "I have exams this week and need to concentrate",
    "Generate a balanced 4-part daily routine",
    "Suggest a cultural or cognitive game",
    "I feel sluggish despite 7.5 hours of sleep",
    "Find nearby sports facilities for badminton",
  ];

  return (
    <div className="flex flex-col h-[750px] max-w-5xl mx-auto rounded-3xl bg-[#FAF8F4] border border-[#183C32]/15 shadow-soft overflow-hidden">
      {/* Agent Top Header */}
      <div className="p-4 sm:p-5 bg-white border-b border-[#183C32]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#183C32] text-[#46C5B0] flex items-center justify-center shadow-subtle relative">
            <Sparkles className="w-5 h-5" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#46C5B0] border-2 border-white absolute -top-0.5 -right-0.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[#183C32]">TRISYNC Personal Wellness Agent</h2>
              <Badge variant="success" size="sm">Active Sync</Badge>
            </div>
            <p className="text-xs text-[#3E4542]">Authorized companion across Physical, Mental & Digital life</p>
          </div>
        </div>

        {/* Privacy Shield Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#183C32] px-3 py-1.5 rounded-xl bg-[#EEF3ED] border border-[#183C32]/10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1A8A7A]" />
          <span>Zero Journal Access &middot; Consented Data Only</span>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            {/* Sender and Time Label */}
            <div className="text-[10px] font-mono text-[#3E4542] mb-1 px-1">
              {msg.sender === "user" ? "You" : "TRISYNC Agent"} &middot; {msg.timestamp}
            </div>

            {/* Bubble Container */}
            <div
              className={`max-w-2xl rounded-3xl p-4 sm:p-5 space-y-3.5 text-sm leading-relaxed shadow-subtle ${
                msg.sender === "user"
                  ? "bg-[#183C32] text-[#F5F1E8] rounded-tr-sm"
                  : "bg-white text-[#222624] border border-[#183C32]/12 rounded-tl-sm"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* EMBEDDED RECOMMENDATION CARDS */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#3E4542] font-semibold">
                    Personalized Action Recommendations:
                  </div>
                  {msg.recommendations.map((rec) => {
                    const isAccepted = rec.status === "accepted";
                    const isDismissed = rec.status === "dismissed";

                    if (isDismissed) return null;

                    return (
                      <div
                        key={rec.id}
                        className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                          isAccepted
                            ? "bg-[#EEF3ED] border-[#183C32]/25"
                            : "bg-[#FAF8F4] border-[#183C32]/12"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <DimensionPill dimension={rec.targetDimension} />
                            <span className="font-medium text-[#183C32] text-xs sm:text-sm">
                              {rec.title}
                            </span>
                          </div>
                          {isAccepted ? (
                            <span className="flex items-center gap-1 text-xs font-mono text-[#1A8A7A]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-[#3E4542] uppercase">
                              {rec.urgency}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#3E4542] leading-relaxed">
                          {rec.description}
                        </p>

                        {/* Explainable Reasoning */}
                        <div className="p-2.5 rounded-xl bg-white/80 border border-[#183C32]/8 text-[11px] text-[#3E4542] flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-[#183C32] shrink-0 mt-0.5" />
                          <span>
                            <strong>Why recommended:</strong> {rec.reasoning}
                          </span>
                        </div>

                        {/* Action Buttons: Accept / Modify / Dismiss */}
                        {!isAccepted && (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => handleRecommendationAction(msg.id, rec.id, "accept")}
                              className="px-3 py-1.5 rounded-xl bg-[#183C32] text-[#F5F1E8] text-xs font-medium hover:bg-[#112C25] transition-all flex items-center gap-1 shadow-subtle"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#46C5B0]" />
                              <span>Accept Action</span>
                            </button>
                            <button
                              onClick={() => {
                                setModifyingRec(rec);
                                setModifiedText(rec.description);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white border border-[#183C32]/15 text-xs text-[#3E4542] hover:text-[#183C32] transition-all"
                            >
                              Modify
                            </button>
                            <button
                              onClick={() => handleRecommendationAction(msg.id, rec.id, "dismiss")}
                              className="px-2.5 py-1.5 rounded-xl hover:bg-[#183C32]/5 text-xs text-[#3E4542] transition-all"
                              title="Dismiss suggestion"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* EMBEDDED BALANCED DAILY ROUTINE PLAN */}
              {msg.routinePlan && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/15 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#183C32]/10">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#183C32]" />
                      <span className="font-medium text-xs sm:text-sm text-[#183C32]">
                        {msg.routinePlan.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#3E4542]">
                      {msg.routinePlan.date}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {msg.routinePlan.slots.map((slot, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-[#183C32]/10 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-semibold text-[#183C32] capitalize">
                            <Clock className="w-3.5 h-3.5 text-[#46C5B0]" />
                            <span>{slot.period} ({slot.timeRange})</span>
                          </div>
                          <DimensionPill dimension={slot.dimension} />
                        </div>
                        <p className="text-[#222624] font-medium pt-0.5">{slot.primaryAction}</p>
                        <p className="text-[11px] text-[#3E4542] opacity-90">{slot.rationale}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      alert("Daily Rhythm Plan registered to your Tri-Sync Overview dashboard.");
                    }}
                  >
                    Save Plan to Today&apos;s Missions
                  </Button>
                </div>
              )}

              {/* EMBEDDED SPORTS FACILITY BOOKING CARDS */}
              {msg.facilityOptions && msg.facilityOptions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#3E4542] font-semibold flex items-center justify-between">
                    <span>Nearby Recreational Venues:</span>
                    <span className="text-[10px] text-[#1A8A7A]">Explicit Confirmation Required</span>
                  </div>
                  <div className="space-y-2.5">
                    {msg.facilityOptions.map((fac) => (
                      <div
                        key={fac.id}
                        className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-[#183C32] text-sm">{fac.name}</h4>
                          <span className="flex items-center gap-1 text-[11px] font-mono text-[#183C32]">
                            <Star className="w-3 h-3 text-[#ED805A] fill-current" /> {fac.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-[#3E4542]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#183C32]" /> {fac.locationArea} ({fac.distanceKm} km)
                          </span>
                          <span className="font-semibold text-[#183C32]">{fac.pricingEstimate}</span>
                        </div>
                        <div className="text-[11px] text-[#3E4542]">
                          Open Slot: <span className="font-mono text-[#183C32]">{fac.availableSlot}</span>
                        </div>
                        <div className="pt-1">
                          <button
                            onClick={() => setBookingModalFacility(fac)}
                            className="w-full py-1.5 px-3 rounded-xl bg-white border border-[#183C32]/20 hover:border-[#183C32] text-xs font-medium text-[#183C32] transition-colors flex items-center justify-center gap-1.5 shadow-subtle"
                          >
                            <span>Review & Request Booking Confirmation</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EMBEDDED REMINDER PERMISSION CARD */}
              {msg.requiresReminderConfirmation && (
                <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ED805A]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#ED805A]">
                    <Bell className="w-4 h-4" />
                    <span>User Permission Required: Schedule Reminder</span>
                  </div>
                  <p className="text-xs text-[#3E4542]">
                    Would you like TRISYNC to schedule a notification for:{" "}
                    <strong>{msg.requiresReminderConfirmation.reminderTitle}</strong> (
                    {msg.requiresReminderConfirmation.proposedTime})?
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleScheduleReminder(msg.id)}
                      className="px-3 py-1 rounded-xl bg-[#183C32] text-[#F5F1E8] text-xs font-medium hover:bg-[#112C25] transition-all"
                    >
                      Allow Reminder
                    </button>
                    <button
                      onClick={() => {
                        setMessages((prev) =>
                          prev.map((m) => (m.id === msg.id ? { ...m, requiresReminderConfirmation: undefined } : m))
                        );
                      }}
                      className="px-3 py-1 rounded-xl bg-white border border-[#183C32]/15 text-xs text-[#3E4542] hover:text-[#183C32]"
                    >
                      Don&apos;t Schedule
                    </button>
                  </div>
                </div>
              )}

              {/* Ethical Disclaimer */}
              {msg.disclaimer && (
                <div className="text-[10px] text-[#3E4542] italic pt-1 border-t border-[#183C32]/8 flex items-center gap-1">
                  <Lock className="w-3 h-3 shrink-0 text-[#183C32]" />
                  <span>{msg.disclaimer}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#3E4542] p-2">
            <div className="w-2 h-2 rounded-full bg-[#183C32] animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-[#46C5B0] animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-[#ED805A] animate-bounce [animation-delay:0.4s]" />
            <span>Agent synthesizing cross-dimensional recommendations...</span>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 bg-[#F5F1E8] border-t border-[#183C32]/10 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-[10px] font-mono uppercase text-[#3E4542] shrink-0">Try Asking:</span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-xl bg-white border border-[#183C32]/12 text-xs text-[#183C32] hover:bg-[#183C32] hover:text-[#F5F1E8] transition-all whitespace-nowrap shadow-subtle shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-[#183C32]/10 flex items-center gap-2">
        <Input
          placeholder="Ask your Personal Wellness Agent anything about your physical, mental or digital rhythms..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 bg-[#FAF8F4]"
        />
        <Button
          variant="primary"
          size="md"
          onClick={() => handleSend()}
          disabled={!inputValue.trim()}
          leftIcon={<Send className="w-4 h-4" />}
        >
          Send
        </Button>
      </div>

      {/* EXPLICIT BOOKING CONFIRMATION MODAL */}
      <Modal
        isOpen={!!bookingModalFacility}
        onClose={() => setBookingModalFacility(null)}
        title="Explicit Facility Booking Confirmation"
      >
        {bookingModalFacility && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-2 text-xs">
              <div className="font-semibold text-sm text-[#183C32]">{bookingModalFacility.name}</div>
              <p className="text-[#3E4542]">
                Location: {bookingModalFacility.locationArea} &middot; {bookingModalFacility.distanceKm} km away
              </p>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#183C32]/10">
                <span>Selected Slot:</span>
                <span className="font-mono font-semibold text-[#183C32]">{bookingModalFacility.availableSlot}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Estimated Cost:</span>
                <span className="font-semibold text-[#183C32]">{bookingModalFacility.pricingEstimate}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#183C32]/15 text-xs text-[#183C32] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1A8A7A] shrink-0 mt-0.5" />
              <span>
                <strong>Zero Automatic Spending Guarantee:</strong> TRISYNC requires your direct confirmation before any booking or payment request is transmitted to partner facilities.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setBookingModalFacility(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const facilityName = bookingModalFacility.name;
                  setBookingModalFacility(null);
                  alert(`Reservation request confirmed for ${facilityName}. A confirmation has been sent to your registered email alex@trisync.io.`);
                }}
              >
                Confirm Reservation
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODIFY RECOMMENDATION MODAL */}
      <Modal
        isOpen={!!modifyingRec}
        onClose={() => setModifyingRec(null)}
        title="Customize Recommended Action"
      >
        {modifyingRec && (
          <div className="space-y-4">
            <p className="text-xs text-[#3E4542]">
              Adjust this recommendation so it fits your personal schedule and current energy:
            </p>
            <Input
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              label="Action Description"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="md" onClick={() => setModifyingRec(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMessages((prev) =>
                    prev.map((msg) => ({
                      ...msg,
                      recommendations: msg.recommendations?.map((r) =>
                        r.id === modifyingRec.id ? { ...r, description: modifiedText, status: "modified" } : r
                      ),
                    }))
                  );
                  setModifyingRec(null);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  User,
  Shield,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  AlertTriangle,
  Plus,
  X,
} from "lucide-react";

const ALL_GOALS = [
  "Improve fitness",
  "Build a consistent workout routine",
  "Improve nutrition & hydration",
  "Manage stress & reduce burnout",
  "Improve sleep habits & REM depth",
  "Improve concentration & deep focus",
  "Reduce unnecessary screen time",
  "Build a balanced daily routine",
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateProfile, updatePermissions, deleteAccount } = useAuth();

  const [name, setName] = useState(user?.name || "Alex V.");
  const [wakeTime, setWakeTime] = useState(user?.schedule?.wakeTime || "06:45");
  const [sleepTime, setSleepTime] = useState(user?.schedule?.sleepTime || "22:45");
  const [goals, setGoals] = useState<string[]>(
    user?.goals || ["Improve sleep habits", "Reduce unnecessary screen time", "Manage stress"]
  );

  const [permissions, setPermissions] = useState({
    screenTimeConsented: user?.permissions?.screenTimeConsented ?? true,
    healthSensorsConsented: user?.permissions?.healthSensorsConsented ?? true,
    locationContextConsented: user?.permissions?.locationContextConsented ?? false,
    anonymizedAnalyticsConsented: user?.permissions?.anonymizedAnalyticsConsented ?? true,
  });

  const [savedFeedback, setSavedFeedback] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      goals,
      schedule: {
        wakeTime,
        sleepTime,
        workStart: user?.schedule?.workStart || "09:00",
        workEnd: user?.schedule?.workEnd || "18:00",
      },
    });
    updatePermissions(permissions);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleToggleGoal = (g: string) => {
    if (goals.includes(g)) {
      setGoals(goals.filter((item) => item !== g));
    } else {
      setGoals([...goals, g]);
    }
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(
          {
            exportDate: new Date().toISOString(),
            profile: user,
            telemetrySummary: {
              syncScore: user?.syncScore || 86,
              streakDays: user?.streakDays || 14,
            },
            privacyNotice: "User-owned, consented export. No third-party tracking included.",
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `trisync-data-export-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleConfirmDelete = () => {
    deleteAccount();
    setDeleteModalOpen(false);
    router.push("/");
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#3E4542]">
            Preferences & Sovereignty
          </span>
          <h1 className="text-2xl sm:text-3xl font-light text-[#183C32] tracking-tight mt-1">
            My Profile & Privacy Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Manage your personal baseline, active goals, and consented privacy boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedFeedback && (
            <span className="inline-flex items-center gap-1 text-xs text-[#1A8A7A] font-medium animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Preferences Saved
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* Profile Demographics Card */}
        <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#183C32] text-[#F5F1E8] flex items-center justify-center font-semibold text-sm">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-medium text-[#222624]">Personal Identity & Rhythm</h3>
              <p className="text-xs text-[#3E4542]">Account: {user?.email || "alex@trisync.io"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Wake Time"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              leftIcon={<Clock className="w-4 h-4" />}
            />
            <Input
              label="Target Sleep Time"
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              leftIcon={<Clock className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Goals Management Card */}
        <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-[#222624]">Active Wellbeing Goals</h3>
              <p className="text-xs text-[#3E4542]">Select or remove goals to fine-tune your recommendations.</p>
            </div>
            <span className="text-xs font-mono text-[#183C32] font-semibold">{goals.length} Selected</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ALL_GOALS.map((g) => {
              const isSelected = goals.includes(g);
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleToggleGoal(g)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32]"
                      : "bg-white text-[#222624] border-[#183C32]/15 hover:border-[#183C32]/30"
                  }`}
                >
                  <span>{g}</span>
                  {isSelected ? (
                    <X className="w-4 h-4 text-[#46C5B0] shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#3E4542] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear Permission and Privacy Settings */}
        <div className="rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#46C5B0]" />
                <h3 className="text-base font-medium text-[#222624]">Consented Privacy Settings</h3>
              </div>
              <p className="text-xs text-[#3E4542]">
                Explain what data is collected and why. Modify permissions at any time.
              </p>
            </div>
            <Badge variant="success" size="sm">
              Zero Ad Sharing
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-[#EEF3ED] border border-[#183C32]/15 text-xs text-[#183C32] leading-relaxed">
            <strong>Honest Technical Principle:</strong> TRISYNC will never simulate automated access to
            phone sensors, device notifications, or health records without explicit system integration and
            your consent.
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
              <div className="space-y-1 max-w-lg">
                <span className="text-xs font-semibold text-[#222624]">
                  Screen Time & Digital Habit Telemetry
                </span>
                <p className="text-[11px] text-[#3E4542]">
                  Used solely to model evening device wind-down times against sleep latency.
                </p>
              </div>
              <input
                type="checkbox"
                checked={permissions.screenTimeConsented}
                onChange={(e) =>
                  setPermissions({ ...permissions, screenTimeConsented: e.target.checked })
                }
                className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
              />
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
              <div className="space-y-1 max-w-lg">
                <span className="text-xs font-semibold text-[#222624]">
                  Health & Movement Records
                </span>
                <p className="text-[11px] text-[#3E4542]">
                  Used to calculate daily circadian load and muscular recovery.
                </p>
              </div>
              <input
                type="checkbox"
                checked={permissions.healthSensorsConsented}
                onChange={(e) =>
                  setPermissions({ ...permissions, healthSensorsConsented: e.target.checked })
                }
                className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
              />
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
              <div className="space-y-1 max-w-lg">
                <span className="text-xs font-semibold text-[#222624]">
                  Location & Sunlight Context
                </span>
                <p className="text-[11px] text-[#3E4542]">
                  Used to calculate local sunrise light prompts. Never shared or mapped.
                </p>
              </div>
              <input
                type="checkbox"
                checked={permissions.locationContextConsented}
                onChange={(e) =>
                  setPermissions({ ...permissions, locationContextConsented: e.target.checked })
                }
                className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
              />
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between">
              <div className="space-y-1 max-w-lg">
                <span className="text-xs font-semibold text-[#222624]">
                  Anonymized Cross-Dimensional Analytics
                </span>
                <p className="text-[11px] text-[#3E4542]">
                  Aids aggregate model tuning. Disconnected from your email and identity.
                </p>
              </div>
              <input
                type="checkbox"
                checked={permissions.anonymizedAnalyticsConsented}
                onChange={(e) =>
                  setPermissions({ ...permissions, anonymizedAnalyticsConsented: e.target.checked })
                }
                className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32] focus:ring-[#183C32]"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md">
              Save Profile & Permissions
            </Button>
          </div>
        </div>
      </form>

      {/* Data Export & Account Deletion Controls */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-[#222624]">Data Sovereignty & Purge</h4>
          <p className="text-xs text-[#3E4542]">
            Export a full JSON copy of your personal universe or permanently delete all records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportData}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Data (.JSON)
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-[#ED805A]" />}
            className="text-[#ED805A] hover:bg-[#ED805A]/10"
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Data & Account Purge"
        description="This action will permanently erase your personal universe, streak records, and telemetry."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleConfirmDelete}
              className="border-[#ED805A] text-[#ED805A] hover:bg-[#ED805A]/10"
            >
              Permanently Purge & Sign Out
            </Button>
          </>
        }
      >
        <div className="p-4 rounded-xl bg-[#FDF1EC] border border-[#ED805A]/30 text-xs text-[#3E4542] space-y-2">
          <div className="flex items-center gap-2 text-[#ED805A] font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>Permanent Deletion</span>
          </div>
          <p className="leading-relaxed">
            All stored telemetry, goals, and resonance metrics will be immediately purged from your
            browser session. You can re-register anytime with a clean baseline.
          </p>
        </div>
      </Modal>
    </div>
  );
}

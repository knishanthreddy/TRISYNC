"use client";

import React, { useState } from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Watch,
  Smartphone,
  Activity,
  HeartPulse,
  Sparkles,
  RefreshCw,
  Plus,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Info,
  Sliders,
  Power,
  Layers,
  TrendingUp,
  Clock,
  Radio,
  Lock,
} from "lucide-react";

interface DeviceItem {
  id: string;
  name: string;
  category: "wearable" | "smartphone" | "biometric";
  brand: string;
  model: string;
  status: "connected" | "disconnected" | "syncing";
  lastSync: string;
  batteryLevel?: number;
  dataPointsToday: number;
  activeStreams: string[];
  protocol: "Apple HealthKit" | "Google Health Connect" | "Bluetooth LE" | "Direct Cloud API";
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceItem[]>([
    {
      id: "dev_apple_watch",
      name: "Alex's Apple Watch Ultra 2",
      category: "wearable",
      brand: "Apple",
      model: "Watch Ultra 2 (watchOS 11)",
      status: "connected",
      lastSync: "3 mins ago",
      batteryLevel: 88,
      dataPointsToday: 1840,
      activeStreams: ["Continuous Optical Heart Rate", "ECG & HRV Index", "Wrist Skin Temperature", "Active Energy (kcal)"],
      protocol: "Apple HealthKit",
    },
    {
      id: "dev_pixel_phone",
      name: "Google Pixel 8 Pro",
      category: "smartphone",
      brand: "Google",
      model: "Pixel 8 Pro (Android 15)",
      status: "connected",
      lastSync: "6 mins ago",
      batteryLevel: 74,
      dataPointsToday: 420,
      activeStreams: ["Screen Time & App Categorization", "Screen Pickup Counts", "Ambient Noise Level (dB)", "Focus Mode Synchronization"],
      protocol: "Google Health Connect",
    },
    {
      id: "dev_whoop",
      name: "Whoop 4.0 Strap",
      category: "wearable",
      brand: "Whoop",
      model: "4.0 Bicep Band",
      status: "connected",
      lastSync: "12 mins ago",
      batteryLevel: 62,
      dataPointsToday: 2480,
      activeStreams: ["Daily Cardiovascular Strain", "Recovery Percentage", "Deep / REM Sleep Staging", "Respiratory Rate"],
      protocol: "Bluetooth LE",
    },
    {
      id: "dev_oura",
      name: "Oura Ring Gen 3",
      category: "wearable",
      brand: "Oura",
      model: "Horizon Stealth (Size 10)",
      status: "disconnected",
      lastSync: "Yesterday at 11:30 PM",
      batteryLevel: 45,
      dataPointsToday: 0,
      activeStreams: ["Circadian Readiness Score", "Nighttime Body Temp Deviation", "Sleep Latency"],
      protocol: "Bluetooth LE",
    },
    {
      id: "dev_withings",
      name: "Withings Body+ Smart Scale",
      category: "biometric",
      brand: "Withings",
      model: "Body+ Composition Analyzer",
      status: "connected",
      lastSync: "Today at 07:15 AM",
      batteryLevel: 92,
      dataPointsToday: 6,
      activeStreams: ["Body Weight (kg)", "Body Fat Percentage", "Total Muscle Mass", "Hydration Balance"],
      protocol: "Direct Cloud API",
    },
  ]);

  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [permissionsModalDevice, setPermissionsModalDevice] = useState<DeviceItem | null>(null);
  const [selectedBrand, setSelectedBrand] = useState("Garmin");

  // Ingestion Simulation Trigger
  const handleSyncDevice = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setDevices((prev) =>
        prev.map((dev) =>
          dev.id === id
            ? {
                ...dev,
                lastSync: "Just now",
                dataPointsToday: dev.dataPointsToday + 45,
                status: "connected",
              }
            : dev
        )
      );
      setSyncingId(null);
    }, 1200);
  };

  const handleToggleConnection = (id: string) => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id !== id) return dev;
        const newStatus = dev.status === "connected" ? "disconnected" : "connected";
        return { ...dev, status: newStatus };
      })
    );
  };

  const handleAddNewDevice = () => {
    const newDev: DeviceItem = {
      id: "dev_" + Math.random().toString(36).substring(2, 7),
      name: `${selectedBrand} Smart Sensor`,
      category: selectedBrand === "Garmin" ? "wearable" : "smartphone",
      brand: selectedBrand,
      model: `${selectedBrand} Connected Hub v2`,
      status: "connected",
      lastSync: "Just now",
      batteryLevel: 100,
      dataPointsToday: 120,
      activeStreams: ["Cardiovascular Telemetry", "Step Cadence", "Recovery Reserve"],
      protocol: "Bluetooth LE",
    };
    setDevices((prev) => [...prev, newDev]);
    setConnectModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 text-[#222624]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <div className="flex items-center gap-2">
            <DimensionPill dimension="unified" />
            <span className="text-xs font-mono text-[#3E4542]">Hardware Telemetry & Integrations</span>
          </div>
          <h1 className="text-3xl font-light text-[#183C32] tracking-tight mt-1">
            Connected Devices & Smartphones
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Synchronize smartwatches, fitness trackers, smartphones, and biometric sensors into your unified TRISYNC intelligence stream.
          </p>
        </div>

        {/* Global Connection Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setConnectModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Connect New Device
          </Button>
        </div>
      </div>

      {/* SECTION 1: LIVE MULTI-DIMENSIONAL DEVICE INSIGHTS FEED */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#46C5B0]" />
            <h3 className="text-base font-medium text-[#183C32]">Live Telemetry Insights</h3>
          </div>
          <span className="text-xs font-mono text-[#3E4542]">
            {devices.filter((d) => d.status === "connected").length} devices actively streaming
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Insight 1: HRV & Recovery */}
          <div className="p-5 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 shadow-soft space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#183C32]">
                <span className="flex items-center gap-1 font-semibold">
                  <HeartPulse className="w-3.5 h-3.5 text-[#46C5B0]" />
                  <span>AUTONOMIC RECOVERY</span>
                </span>
                <span className="text-[10px] text-[#3E4542]">Apple Watch</span>
              </div>
              <div className="text-2xl font-light text-[#183C32] pt-1">
                68 <span className="text-xs font-mono text-[#3E4542]">ms HRV</span>
              </div>
            </div>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              +14% above your 30-day baseline. High parasympathetic tone indicating optimal neurological readiness for physical loading.
            </p>
            <div className="text-[10px] font-mono text-[#1A8A7A] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified 4 mins ago</span>
            </div>
          </div>

          {/* Insight 2: Screen Pickups */}
          <div className="p-5 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 shadow-soft space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#183C32]">
                <span className="flex items-center gap-1 font-semibold">
                  <Smartphone className="w-3.5 h-3.5 text-[#ED805A]" />
                  <span>SCREEN PICKUPS</span>
                </span>
                <span className="text-[10px] text-[#3E4542]">Pixel 8 Pro</span>
              </div>
              <div className="text-2xl font-light text-[#183C32] pt-1">
                48 <span className="text-xs font-mono text-[#3E4542]">pickups</span>
              </div>
            </div>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              Zero pickups detected past 10:15 PM last night. Directly correlated with a 32-minute reduction in your sleep onset latency.
            </p>
            <div className="text-[10px] font-mono text-[#1A8A7A] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Health Connect Active</span>
            </div>
          </div>

          {/* Insight 3: Restorative Sleep */}
          <div className="p-5 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 shadow-soft space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#183C32]">
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#B9A5DF]" />
                  <span>SLEEP ARCHITECTURE</span>
                </span>
                <span className="text-[10px] text-[#3E4542]">Whoop 4.0</span>
              </div>
              <div className="text-2xl font-light text-[#183C32] pt-1">
                7h 48m <span className="text-xs font-mono text-[#3E4542]">(88% eff)</span>
              </div>
            </div>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              1h 44m Deep Sleep (22%) and 1h 52m REM. High slow-wave sleep confirms substantial cellular tissue and muscle repair.
            </p>
            <div className="text-[10px] font-mono text-[#1A8A7A] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Whoop BLE Connected</span>
            </div>
          </div>

          {/* Insight 4: Scale Body Composition */}
          <div className="p-5 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 shadow-soft space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#183C32]">
                <span className="flex items-center gap-1 font-semibold">
                  <Activity className="w-3.5 h-3.5 text-[#183C32]" />
                  <span>BODY MASS & RECOMP</span>
                </span>
                <span className="text-[10px] text-[#3E4542]">Withings Body+</span>
              </div>
              <div className="text-2xl font-light text-[#183C32] pt-1">
                74.2 <span className="text-xs font-mono text-[#3E4542]">kg (-3.3kg)</span>
              </div>
            </div>
            <p className="text-xs text-[#3E4542] leading-relaxed">
              Lean mass preserved at 61.4 kg with progressive body recomposition supported by your Indian IFCT high-protein diet.
            </p>
            <div className="text-[10px] font-mono text-[#1A8A7A] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Logged at 07:15 AM</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONNECTED DEVICE REGISTRY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-[#183C32]">Active Hardware & Synchronized Devices</h3>
          <span className="text-xs text-[#3E4542]">Click &apos;Sync Now&apos; to force immediate data refresh</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((dev) => {
            const isConnected = dev.status === "connected";
            const isSyncing = syncingId === dev.id;

            return (
              <div
                key={dev.id}
                className={`p-6 rounded-3xl bg-[#FAF8F4] border transition-all duration-200 shadow-soft flex flex-col justify-between space-y-5 ${
                  isConnected ? "border-[#183C32]/15" : "border-[#183C32]/8 opacity-75"
                }`}
              >
                {/* Device Title & Brand Icon */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-[#183C32]/10 flex items-center justify-center text-[#183C32] shadow-subtle">
                        {dev.category === "wearable" ? (
                          <Watch className="w-5 h-5 text-[#183C32]" />
                        ) : dev.category === "smartphone" ? (
                          <Smartphone className="w-5 h-5 text-[#46C5B0]" />
                        ) : (
                          <Activity className="w-5 h-5 text-[#ED805A]" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-[#183C32]">{dev.name}</h4>
                        <span className="text-[11px] text-[#3E4542]">{dev.model}</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isConnected ? "bg-[#46C5B0] animate-pulse" : "bg-gray-400"
                        }`}
                      />
                      <span className="text-[11px] font-mono text-[#3E4542] capitalize">
                        {isSyncing ? "Syncing..." : dev.status}
                      </span>
                    </div>
                  </div>

                  {/* Telemetry Stats Row */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white border border-[#183C32]/8 text-xs">
                    <div>
                      <div className="text-[10px] font-mono text-[#3E4542]">LAST SYNCED</div>
                      <div className="font-medium text-[#183C32] mt-0.5">{dev.lastSync}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#3E4542]">DATA INGESTED</div>
                      <div className="font-medium text-[#183C32] mt-0.5">
                        {dev.dataPointsToday.toLocaleString()} pts
                      </div>
                    </div>
                  </div>

                  {/* Active Streams */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-[#3E4542]">Active Streams:</div>
                    <div className="flex flex-wrap gap-1">
                      {dev.activeStreams.slice(0, 3).map((stream, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-[#183C32]/5 text-[#183C32]"
                        >
                          {stream}
                        </span>
                      ))}
                      {dev.activeStreams.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-[#183C32]/5 text-[#3E4542]">
                          +{dev.activeStreams.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-[#183C32]/10 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSyncDevice(dev.id)}
                    disabled={isSyncing || !isConnected}
                    leftIcon={
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#46C5B0]" : ""}`}
                      />
                    }
                  >
                    {isSyncing ? "Syncing..." : "Sync Now"}
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPermissionsModalDevice(dev)}
                      className="p-2 rounded-xl hover:bg-white text-[#3E4542] hover:text-[#183C32] transition-colors border border-transparent hover:border-[#183C32]/10"
                      title="Manage Data Permissions"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleConnection(dev.id)}
                      className={`p-2 rounded-xl transition-colors border ${
                        isConnected
                          ? "hover:bg-red-50 text-red-600 border-red-200/50"
                          : "hover:bg-green-50 text-green-700 border-green-200"
                      }`}
                      title={isConnected ? "Disconnect Device" : "Connect Device"}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: PRIVACY, ENCRYPTION & DATA SOVEREIGNTY GUARANTEE */}
      <section className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/15 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#183C32]" />
          <h3 className="text-base font-semibold text-[#183C32]">
            Hardware Telemetry Privacy Architecture
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#3E4542] leading-relaxed">
          <div className="p-4 rounded-2xl bg-white border border-[#183C32]/10 space-y-1">
            <strong className="text-[#183C32] block">Local On-Device Filtering:</strong>
            Raw accelerometer and GPS coordinates are parsed locally. Only aggregated metrics (e.g. total steps, sleep onset latency) are stored in your TRISYNC timeline.
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#183C32]/10 space-y-1">
            <strong className="text-[#183C32] block">No Third-Party Advertising:</strong>
            TRISYNC will never monetize, sell, or license your resting heart rate, sleep duration, or smartphone screen unlocks to insurance or marketing entities.
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#183C32]/10 space-y-1">
            <strong className="text-[#183C32] block">Instant Revocation:</strong>
            Clicking disconnect immediately closes the sync bridge and purges buffered hardware packets from your active session.
          </div>
        </div>
      </section>

      {/* CONNECT NEW DEVICE MODAL */}
      <Modal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        title="Pair New Smart Sensor or Device"
      >
        <div className="space-y-5 text-xs text-[#222624]">
          <p className="text-[#3E4542]">
            Select your hardware ecosystem to establish an encrypted local sync bridge:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "Garmin",
              "Apple Watch",
              "Samsung Galaxy",
              "Fitbit",
              "Whoop",
              "Oura Ring",
              "Noise / boAt",
              "Withings Scale",
              "Dexcom CGM",
            ].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  selectedBrand === brand
                    ? "bg-[#183C32] text-[#F5F1E8] border-[#183C32] shadow-subtle"
                    : "bg-white text-[#222624] border-[#183C32]/15 hover:border-[#183C32]"
                }`}
              >
                <span className="font-medium text-xs">{brand}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#EEF3ED] border border-[#183C32]/15 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-[#183C32]">
              <Radio className="w-4 h-4 text-[#1A8A7A]" />
              <span>Supported Sync Protocols for {selectedBrand}</span>
            </div>
            <p className="text-[11px] text-[#3E4542]">
              Connects via Web Bluetooth LE or encrypted Cloud API bridge with zero advertising trackers.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="md" onClick={() => setConnectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleAddNewDevice}>
              Pair & Authorize {selectedBrand}
            </Button>
          </div>
        </div>
      </Modal>

      {/* PERMISSIONS MODAL */}
      <Modal
        isOpen={!!permissionsModalDevice}
        onClose={() => setPermissionsModalDevice(null)}
        title={`Permissions: ${permissionsModalDevice?.name || "Device"}`}
      >
        {permissionsModalDevice && (
          <div className="space-y-4 text-xs">
            <p className="text-[#3E4542]">
              Configure which biometric data streams TRISYNC is authorized to receive from this device:
            </p>

            <div className="space-y-2">
              {permissionsModalDevice.activeStreams.map((stream, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white border border-[#183C32]/10 flex items-center justify-between"
                >
                  <span className="font-medium text-[#183C32]">{stream}</span>
                  <span className="text-[11px] font-mono text-[#1A8A7A] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Consented
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setPermissionsModalDevice(null)}
              >
                Save Permissions
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

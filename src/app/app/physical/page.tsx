"use client";

import React, { useState } from "react";
import { DimensionPill } from "@/components/ui/dimension-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { AdvancedFitnessDigitalTwin, MuscleRegion } from "@/components/fitness-twin";
import {
  Activity,
  Dumbbell,
  Utensils,
  TrendingUp,
  Camera,
  ShieldCheck,
  Plus,
  Search,
  CheckCircle2,
  Zap,
  Info,
  Calendar,
  Layers,
  Sparkles,
  Flame,
} from "lucide-react";

interface IndianFoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  category: "staple" | "curry" | "protein" | "snack";
}

const INDIAN_FOODS_DATABASE: IndianFoodItem[] = [
  { id: "f1", name: "Idli", portion: "2 pcs (100g)", calories: 120, protein: 4, carbs: 24, fats: 0.4, category: "staple" },
  { id: "f2", name: "Plain Dosa", portion: "1 medium (120g)", calories: 165, protein: 3.8, carbs: 28, fats: 4.2, category: "staple" },
  { id: "f3", name: "Whole Wheat Chapati", portion: "2 chapatis (80g)", calories: 208, protein: 6.2, carbs: 36, fats: 5, category: "staple" },
  { id: "f4", name: "Steamed White/Brown Rice", portion: "1 katori (150g)", calories: 195, protein: 4.1, carbs: 44, fats: 0.5, category: "staple" },
  { id: "f5", name: "Yellow Moong/Toor Dal", portion: "1 katori (150g)", calories: 154, protein: 9.4, carbs: 22, fats: 3.5, category: "curry" },
  { id: "f6", name: "Vegetable Sambar", portion: "1 katori (150g)", calories: 110, protein: 4.2, carbs: 18, fats: 2.4, category: "curry" },
  { id: "f7", name: "Paneer (Fresh Cottage Cheese)", portion: "100g raw/cooked", calories: 265, protein: 18.3, carbs: 3.4, fats: 20.8, category: "protein" },
  { id: "f8", name: "Boiled Eggs", portion: "2 whole eggs", calories: 140, protein: 12.6, carbs: 1.1, fats: 9.8, category: "protein" },
  { id: "f9", name: "Plain Curd / Dahi", portion: "1 katori (100g)", calories: 60, protein: 3.5, carbs: 4.5, fats: 3.1, category: "staple" },
  { id: "f10", name: "Kanda Poha with Peanuts", portion: "1 medium bowl (150g)", calories: 250, protein: 6.2, carbs: 42, fats: 7.1, category: "snack" },
  { id: "f11", name: "Sprouted Moong Salad", portion: "1 cup (120g)", calories: 120, protein: 8.5, carbs: 20, fats: 1.1, category: "snack" },
  { id: "f12", name: "Roasted Chana", portion: "50g handful", calories: 180, protein: 10.2, carbs: 28, fats: 3.2, category: "snack" },
];

export default function PhysicalWellbeingPage() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleRegion>("chest");
  const [activeTab, setActiveTab] = useState<"twin" | "workouts" | "diet" | "body">("twin");

  // Diet Tracker State
  const [foodSearch, setFoodSearch] = useState("");
  const [loggedMeals, setLoggedMeals] = useState<IndianFoodItem[]>([
    INDIAN_FOODS_DATABASE[0], // Idli
    INDIAN_FOODS_DATABASE[5], // Sambar
    INDIAN_FOODS_DATABASE[6], // Paneer
  ]);
  const [customFoodModal, setCustomFoodModal] = useState(false);
  const [customFoodName, setCustomFoodName] = useState("");
  const [customFoodCal, setCustomFoodCal] = useState("");
  const [customFoodProt, setCustomFoodProt] = useState("");

  // Workout Planner State
  const [customWorkoutModal, setCustomWorkoutModal] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutDuration, setNewWorkoutDuration] = useState("45");

  // Photo Consent State
  const [photosConsented, setPhotosConsented] = useState(false);

  // Muscle region metadata for the Digital Twin
  const muscleData: Record<string, { title: string; setsLogged: number; recoveryStatus: string; exercise: string }> = {
    chest: { title: "Pectoralis Major & Minor", setsLogged: 12, recoveryStatus: "Recovered (94%)", exercise: "Incline DB Press & Pushups" },
    back: { title: "Latissimus Dorsi & Trapezius", setsLogged: 14, recoveryStatus: "Recovering (72%)", exercise: "Pull-ups & Cable Rows" },
    shoulders: { title: "Anterior, Lateral & Posterior Deltoids", setsLogged: 8, recoveryStatus: "Fully Recovered (100%)", exercise: "Overhead Dumbbell Press" },
    arms: { title: "Biceps Brachii & Triceps", setsLogged: 10, recoveryStatus: "Recovered (88%)", exercise: "Dips & Incline Curls" },
    core: { title: "Rectus Abdominis & Obliques", setsLogged: 6, recoveryStatus: "Optimal (92%)", exercise: "Hanging Knee Raises & Planks" },
    legs: { title: "Quadriceps, Hamstrings & Calves", setsLogged: 16, recoveryStatus: "Recovering (65%)", exercise: "Barbell Squats & Romanian Deadlifts" },
  };

  const currentMuscleInfo = muscleData[selectedMuscle] || muscleData.chest;

  // Calculate Daily Nutrition Totals
  const totalCalories = loggedMeals.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = loggedMeals.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarbs = loggedMeals.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalFats = loggedMeals.reduce((acc, curr) => acc + curr.fats, 0);

  const filteredFoods = INDIAN_FOODS_DATABASE.filter((f) =>
    f.name.toLowerCase().includes(foodSearch.toLowerCase())
  );

  const handleAddMeal = (food: IndianFoodItem) => {
    setLoggedMeals([...loggedMeals, food]);
  };

  const handleCreateCustomFood = () => {
    if (!customFoodName || !customFoodCal) return;
    const newItem: IndianFoodItem = {
      id: "cf_" + Math.random().toString(36).substring(2, 6),
      name: customFoodName,
      portion: "1 standard serving",
      calories: parseInt(customFoodCal) || 150,
      protein: parseFloat(customFoodProt) || 5,
      carbs: 20,
      fats: 4,
      category: "protein",
    };
    setLoggedMeals([...loggedMeals, newItem]);
    setCustomFoodModal(false);
    setCustomFoodName("");
    setCustomFoodCal("");
    setCustomFoodProt("");
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#183C32]/10">
        <div>
          <div className="flex items-center gap-2">
            <DimensionPill dimension="physical" />
            <span className="text-xs font-mono text-[#3E4542]">Module 01</span>
          </div>
          <h1 className="text-3xl font-light text-[#183C32] tracking-tight mt-1">
            Physical Vitality & Recovery
          </h1>
          <p className="text-xs sm:text-sm text-[#3E4542]/80 mt-0.5">
            Holistic movement planning, authentic Indian household nutrition tracking, and your 3D Fitness Digital Twin.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/10 text-xs">
          {[
            { id: "twin", label: "Digital Twin" },
            { id: "workouts", label: "Workouts" },
            { id: "diet", label: "Indian Diet" },
            { id: "body", label: "Transformation" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#183C32] text-[#F5F1E8] shadow-subtle"
                  : "text-[#3E4542] hover:text-[#183C32]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURE 4: FITNESS DIGITAL TWIN (SIGNATURE 3D FEATURE) */}
      {activeTab === "twin" && (
        <section className="space-y-6">
          <AdvancedFitnessDigitalTwin
            initialRegion={selectedMuscle}
            initialLayer="activity"
            onActionTrigger={(action) => {
              alert(`${action} — added to your physical rhythm calendar.`);
            }}
          />
        </section>
      )}

      {/* FEATURE 1: WORKOUT PLANNER */}
      {activeTab === "workouts" && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-[#183C32]">Workout Planner & Library</h3>
              <p className="text-xs text-[#3E4542]/80 mt-0.5">Structured plans calibrated with circadian recovery windows.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setCustomWorkoutModal(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Create Custom Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Hypertrophy Push / Pull / Legs",
                focus: "Chest, Back, Delts, Quads",
                duration: "50 min",
                intensity: "Moderate-High",
                sessions: "4x per week",
              },
              {
                title: "Circadian Cardio & Mobility",
                focus: "Zone 2 aerobic base & hip mobility",
                duration: "35 min",
                intensity: "Low-Impact",
                sessions: "3x per week",
              },
              {
                title: "Morning Somatic Energizer",
                focus: "Core, thoracic spine & breath",
                duration: "20 min",
                intensity: "Restorative",
                sessions: "Daily",
              },
            ].map((plan, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="default" size="sm">{plan.intensity}</Badge>
                    <span className="text-xs font-mono text-[#3E4542]">{plan.duration}</span>
                  </div>
                  <h4 className="text-base font-medium text-[#222624]">{plan.title}</h4>
                  <p className="text-xs text-[#3E4542]">{plan.focus}</p>
                </div>
                <div className="pt-3 border-t border-[#183C32]/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-[#183C32]">{plan.sessions}</span>
                  <Button variant="outline" size="sm" onClick={() => alert(`Activated workout: ${plan.title}`)}>
                    Start Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURE 2: INDIAN DIET TRACKER */}
      {activeTab === "diet" && (
        <section className="space-y-8">
          {/* Nutrition Summary Bar */}
          <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#3E4542] uppercase">Calories Logged</span>
              <div className="text-2xl font-light text-[#183C32]">{totalCalories} <span className="text-xs font-mono">kcal</span></div>
              <div className="text-[10px] text-[#3E4542]/70">Target: 2,100 kcal</div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#3E4542] uppercase">Protein</span>
              <div className="text-2xl font-light text-[#183C32]">{totalProtein.toFixed(1)} <span className="text-xs font-mono">g</span></div>
              <div className="text-[10px] text-[#3E4542]/70">Target: 130g</div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#3E4542] uppercase">Carbohydrates</span>
              <div className="text-2xl font-light text-[#183C32]">{totalCarbs.toFixed(1)} <span className="text-xs font-mono">g</span></div>
              <div className="text-[10px] text-[#3E4542]/70">Target: 240g</div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#3E4542] uppercase">Fats</span>
              <div className="text-2xl font-light text-[#183C32]">{totalFats.toFixed(1)} <span className="text-xs font-mono">g</span></div>
              <div className="text-[10px] text-[#3E4542]/70">Target: 60g</div>
            </div>
          </div>

          {/* Food Search & Common Indian Dishes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Food Selector */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-[#183C32]">Indian Household Food Database</h4>
                <Button variant="outline" size="sm" onClick={() => setCustomFoodModal(true)}>
                  + Add Custom Dish
                </Button>
              </div>

              <Input
                placeholder="Search Indian foods (e.g. Idli, Chapati, Paneer, Dal)..."
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {filteredFoods.map((f) => (
                  <div key={f.id} className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#183C32]/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[#222624]">{f.name}</div>
                      <div className="text-[11px] text-[#3E4542]">{f.portion} &middot; {f.calories} kcal &middot; P: {f.protein}g | C: {f.carbs}g | F: {f.fats}g</div>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => handleAddMeal(f)}>
                      + Log
                    </Button>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[#3E4542]/80 leading-normal pt-2">
                <em>Source Citation: Estimated values derived from Indian Food Composition Tables (IFCT), National Institute of Nutrition (ICMR-NIN).</em>
              </div>
            </div>

            {/* Today's Logged Meals */}
            <div className="lg:col-span-5 rounded-2xl p-6 bg-[#FAF8F4] border border-[#183C32]/12 space-y-4">
              <h4 className="text-base font-medium text-[#183C32]">Today&apos;s Logged Meals ({loggedMeals.length})</h4>
              <div className="space-y-2">
                {loggedMeals.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-[#183C32]/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-medium text-[#222624]">{m.name}</span>
                      <div className="text-[10px] text-[#3E4542]">{m.calories} kcal &middot; {m.protein}g protein</div>
                    </div>
                    <button
                      onClick={() => setLoggedMeals(loggedMeals.filter((_, i) => i !== idx))}
                      className="text-[#ED805A] text-[11px] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FEATURE 3: BODY TRANSFORMATION TRACKER */}
      {activeTab === "body" && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Current Weight</span>
              <div className="text-3xl font-light text-[#183C32]">72.4 kg</div>
              <p className="text-xs text-[#1A8A7A]">-2.4 kg since baseline &middot; On Track</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Waist Circumference</span>
              <div className="text-3xl font-light text-[#183C32]">81.0 cm</div>
              <p className="text-xs text-[#1A8A7A]">-3.5 cm reduction</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-2">
              <span className="text-xs font-mono uppercase text-[#3E4542]">Milestone Progress</span>
              <div className="text-3xl font-light text-[#183C32]">84%</div>
              <p className="text-xs text-[#3E4542]">Target: 71.5 kg by Year-End</p>
            </div>
          </div>

          {/* Privacy-Gated Progress Photos */}
          <div className="p-7 rounded-3xl bg-[#FAF8F4] border border-[#183C32]/12 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#183C32]" />
                  <h4 className="text-base font-semibold text-[#222624]">Private Visual Progress Tracker</h4>
                </div>
                <p className="text-xs text-[#3E4542]">
                  Photos are only stored locally on this device with strict consent. Never transmitted to third parties.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-[#222624]">Enable Photo Tracking:</label>
                <input
                  type="checkbox"
                  checked={photosConsented}
                  onChange={(e) => setPhotosConsented(e.target.checked)}
                  className="w-5 h-5 rounded border-[#183C32]/20 text-[#183C32]"
                />
              </div>
            </div>

            {photosConsented ? (
              <div className="p-6 rounded-2xl bg-white border border-dashed border-[#183C32]/20 text-center space-y-3">
                <Camera className="w-8 h-8 text-[#183C32]/50 mx-auto" />
                <p className="text-xs text-[#3E4542]">Drag and drop an encrypted progress photo or take a photo.</p>
                <Button variant="secondary" size="sm">Select Photo</Button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#EEF3ED] text-xs text-[#183C32]">
                Photo tracking is currently disabled. Toggle the consent switch above to activate private visual logging.
              </div>
            )}
          </div>
        </section>
      )}

      {/* CROSS-DIMENSION CONNECTIONS SUMMARY */}
      <section className="p-6 sm:p-7 rounded-2xl bg-[#EEF3ED] border border-[#183C32]/15 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#183C32]" />
            <span className="text-xs font-semibold text-[#183C32] uppercase">
              Cross-Dimension Correlation
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#183C32]">Data-Supported Correlation</span>
        </div>

        <p className="text-sm text-[#183C32] leading-relaxed">
          &ldquo;Consistently logging post-workout protein intake (&gt;25g) within 90 minutes coincides with a 35% reduction in 10:00 PM late-night snacking cravings and +22 minutes of restorative deep REM sleep.&rdquo;
        </p>
      </section>

      {/* CUSTOM FOOD MODAL */}
      <Modal
        isOpen={customFoodModal}
        onClose={() => setCustomFoodModal(false)}
        title="Add Custom Indian Dish"
        description="Save your family recipe to your personal nutrition database."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setCustomFoodModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleCreateCustomFood}>Save Dish</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Dish Name" placeholder="e.g. Palak Paneer with Ghee" value={customFoodName} onChange={(e) => setCustomFoodName(e.target.value)} />
          <Input label="Estimated Calories (kcal)" type="number" placeholder="e.g. 280" value={customFoodCal} onChange={(e) => setCustomFoodCal(e.target.value)} />
          <Input label="Estimated Protein (g)" type="number" placeholder="e.g. 14" value={customFoodProt} onChange={(e) => setCustomFoodProt(e.target.value)} />
        </div>
      </Modal>

      {/* CUSTOM WORKOUT MODAL */}
      <Modal
        isOpen={customWorkoutModal}
        onClose={() => setCustomWorkoutModal(false)}
        title="Create Custom Workout Routine"
        description="Tailor a routine matching your schedule and equipment."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setCustomWorkoutModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => setCustomWorkoutModal(false)}>Save Routine</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Routine Name" placeholder="e.g. Core & Posterior Chain" value={newWorkoutName} onChange={(e) => setNewWorkoutName(e.target.value)} />
          <Input label="Target Duration (Minutes)" type="number" value={newWorkoutDuration} onChange={(e) => setNewWorkoutDuration(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}

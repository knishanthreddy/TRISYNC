"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { MuscleRegion, TwinVisualLayer } from "./types";
import { REGION_TELEMETRY } from "./twin-data";
import { RotateCcw, ZoomIn, ZoomOut, Compass, FlipHorizontal, Eye } from "lucide-react";

interface FitnessTwin3DProps {
  selectedRegion: MuscleRegion;
  activeLayer: TwinVisualLayer;
  onSelectRegion: (region: MuscleRegion) => void;
  className?: string;
}

// Procedural texture generator for authentic biological muscle striations & micro-surface
function createMuscleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Base background
  ctx.fillStyle = "#183C32";
  ctx.fillRect(0, 0, 512, 512);

  // Subtle biological striated muscle grain
  ctx.fillStyle = "rgba(70, 197, 176, 0.08)";
  for (let i = 0; i < 512; i += 3) {
    ctx.fillRect(0, i, 512, 1.2);
  }

  // Vertical micro-fibers
  ctx.fillStyle = "rgba(245, 241, 232, 0.04)";
  for (let x = 0; x < 512; x += 5) {
    const offset = Math.sin(x * 0.05) * 4;
    ctx.fillRect(x + offset, 0, 1.5, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export const FitnessTwin3D: React.FC<FitnessTwin3DProps> = ({
  selectedRegion,
  activeLayer,
  onSelectRegion,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFrontView, setIsFrontView] = useState(true);

  // References to 3D scene elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const humanGroupRef = useRef<THREE.Group | null>(null);
  const scanRingRef = useRef<THREE.Mesh | null>(null);
  const meshMapRef = useRef<Record<string, THREE.Mesh[]>>({});
  const initialCamPos = new THREE.Vector3(0, 0.35, 5.2);

  // Helper to color meshes according to the active layer and selection
  const updateMaterials = useCallback(() => {
    const meshes = meshMapRef.current;
    if (!meshes) return;

    Object.entries(meshes).forEach(([regionKey, meshArray]) => {
      const isSelected = selectedRegion === regionKey || selectedRegion === "all";
      const regionData = REGION_TELEMETRY[regionKey as MuscleRegion] || REGION_TELEMETRY.all;

      let baseColor = 0x183c32; // Default Deep Forest
      let emissiveColor = 0x000000;
      let emissiveIntensity = 0.0;
      let opacity = 0.92;

      switch (activeLayer) {
        case "activity": {
          const ratio = Math.min(1, regionData.weeklySets / Math.max(1, regionData.targetWeeklySets));
          baseColor = ratio >= 1 ? 0x183c32 : ratio >= 0.7 ? 0x2e6b5a : 0xed805a;
          if (isSelected) {
            emissiveColor = 0x46c5b0;
            emissiveIntensity = 0.75;
          }
          break;
        }
        case "measurements": {
          baseColor = 0x1f2723;
          if (isSelected) {
            baseColor = 0x46c5b0;
            emissiveColor = 0x183c32;
            emissiveIntensity = 0.85;
          }
          break;
        }
        case "nutrition": {
          baseColor = 0x183c32;
          if (regionData.glycogenStatus === "supercompensated") {
            baseColor = 0x46c5b0;
          } else if (regionData.glycogenStatus === "optimal") {
            baseColor = 0x224d40;
          }
          if (isSelected) {
            emissiveColor = 0xed805a;
            emissiveIntensity = 0.65;
          }
          break;
        }
        case "recovery": {
          if (regionData.recoveryScore >= 90) {
            baseColor = 0x183c32; // Fully recovered deep green
          } else if (regionData.recoveryScore >= 70) {
            baseColor = 0x3aa897; // Optimal teal
          } else {
            baseColor = 0xed805a; // Sore / fatigue warm terracotta
          }
          if (isSelected) {
            emissiveColor = 0xf5f1e8;
            emissiveIntensity = 0.55;
          }
          break;
        }
        case "transformation": {
          baseColor = 0x183c32;
          if (isSelected) {
            emissiveColor = 0xb9a5df; // Soft lavender holographic tone
            emissiveIntensity = 0.85;
          }
          break;
        }
      }

      meshArray.forEach((mesh) => {
        if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
          mesh.material.color.setHex(baseColor);
          mesh.material.emissive.setHex(emissiveColor);
          mesh.material.emissiveIntensity = isSelected ? Math.max(emissiveIntensity, 0.45) : 0.06;
          mesh.material.opacity = isSelected ? 0.98 : opacity;
          mesh.material.needsUpdate = true;
        }
      });
    });
  }, [selectedRegion, activeLayer]);

  useEffect(() => {
    updateMaterials();
  }, [updateMaterials]);

  // Main Three.js Scene Setup with Realistic Anatomical Sculpting
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAutoRotate(false);
    }

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.copy(initialCamPos);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const humanGroup = new THREE.Group();
    scene.add(humanGroup);
    humanGroupRef.current = humanGroup;

    // Registry of meshes per muscle region
    const meshes: Record<string, THREE.Mesh[]> = {
      chest: [],
      back: [],
      shoulders: [],
      arms: [],
      core: [],
      legs: [],
    };
    meshMapRef.current = meshes;

    const muscleTexture = createMuscleTexture();

    // High-End Anatomical MeshPhysicalMaterial
    const createAnatomicalMaterial = (opacity = 0.92) =>
      new THREE.MeshPhysicalMaterial({
        color: 0x183c32,
        roughness: 0.32,
        metalness: 0.14,
        clearcoat: 0.35,
        clearcoatRoughness: 0.18,
        bumpMap: muscleTexture,
        bumpScale: 0.015,
        transparent: true,
        opacity,
      });

    // =========================================================================
    // 1. ANATOMICAL HEAD & CRANIAL SCULPT
    // =========================================================================
    const craniumGeo = new THREE.SphereGeometry(0.28, 32, 28);
    craniumGeo.scale(1, 1.22, 1.1);
    const head = new THREE.Mesh(craniumGeo, createAnatomicalMaterial(0.96));
    head.position.set(0, 1.95, 0.02);
    humanGroup.add(head);

    // Jawline & Chin Prominence
    const jawGeo = new THREE.ConeGeometry(0.19, 0.26, 16);
    jawGeo.scale(1.1, 1, 0.9);
    const jaw = new THREE.Mesh(jawGeo, createAnatomicalMaterial(0.96));
    jaw.rotation.x = Math.PI;
    jaw.position.set(0, 1.76, 0.08);
    humanGroup.add(jaw);

    // Muscular Neck (Sternocleidomastoid taper)
    const neckGeo = new THREE.CylinderGeometry(0.13, 0.165, 0.28, 24);
    const neck = new THREE.Mesh(neckGeo, createAnatomicalMaterial(0.96));
    neck.position.set(0, 1.58, 0);
    humanGroup.add(neck);

    // Clavicles (Collarbones)
    const clavicleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.78, 16);
    const clavicle = new THREE.Mesh(clavicleGeo, createAnatomicalMaterial(0.85));
    clavicle.rotation.z = Math.PI / 2;
    clavicle.position.set(0, 1.45, 0.06);
    humanGroup.add(clavicle);

    // =========================================================================
    // 2. SCULPTED CHEST (PECTORALIS MAJOR & MINOR)
    // =========================================================================
    // Left Pectoral Plate (Anatomical curve)
    const pecGeo = new THREE.BoxGeometry(0.38, 0.44, 0.26);
    pecGeo.scale(1, 0.9, 0.85);

    const leftPec = new THREE.Mesh(pecGeo, createAnatomicalMaterial());
    leftPec.position.set(-0.21, 1.24, 0.11);
    leftPec.rotation.set(-0.06, 0.12, -0.08);
    leftPec.name = "chest";
    humanGroup.add(leftPec);
    meshes.chest.push(leftPec);

    // Right Pectoral Plate
    const rightPec = new THREE.Mesh(pecGeo, createAnatomicalMaterial());
    rightPec.position.set(0.21, 1.24, 0.11);
    rightPec.rotation.set(-0.06, -0.12, 0.08);
    rightPec.name = "chest";
    humanGroup.add(rightPec);
    meshes.chest.push(rightPec);

    // Upper Ribcage Foundation
    const ribcageGeo = new THREE.CylinderGeometry(0.42, 0.38, 0.52, 24);
    const ribcage = new THREE.Mesh(ribcageGeo, createAnatomicalMaterial(0.88));
    ribcage.position.set(0, 1.22, 0);
    ribcage.name = "chest";
    humanGroup.add(ribcage);
    meshes.chest.push(ribcage);

    // =========================================================================
    // 3. SCULPTED BACK (LATISSIMUS DORSI & TRAPEZIUS V-TAPER)
    // =========================================================================
    // Trapezius Diamond (Upper back & neck slope)
    const trapsGeo = new THREE.ConeGeometry(0.48, 0.5, 4);
    const traps = new THREE.Mesh(trapsGeo, createAnatomicalMaterial());
    traps.rotation.set(0, Math.PI / 4, 0);
    traps.position.set(0, 1.34, -0.1);
    traps.name = "back";
    humanGroup.add(traps);
    meshes.back.push(traps);

    // Latissimus Dorsi V-Taper Wings
    const latGeo = new THREE.CylinderGeometry(0.46, 0.34, 0.58, 20);
    latGeo.scale(1.15, 1, 0.7);
    const lats = new THREE.Mesh(latGeo, createAnatomicalMaterial());
    lats.position.set(0, 1.15, -0.09);
    lats.name = "back";
    humanGroup.add(lats);
    meshes.back.push(lats);

    // =========================================================================
    // 4. SCULPTED SHOULDERS (3-HEADED DELTOID CAPS)
    // =========================================================================
    const deltoidGeo = new THREE.SphereGeometry(0.18, 20, 20);
    deltoidGeo.scale(0.9, 1.25, 1.1);

    const leftDeltoid = new THREE.Mesh(deltoidGeo, createAnatomicalMaterial());
    leftDeltoid.position.set(-0.54, 1.36, 0.02);
    leftDeltoid.rotation.set(0, 0, 0.18);
    leftDeltoid.name = "shoulders";
    humanGroup.add(leftDeltoid);
    meshes.shoulders.push(leftDeltoid);

    const rightDeltoid = new THREE.Mesh(deltoidGeo, createAnatomicalMaterial());
    rightDeltoid.position.set(0.54, 1.36, 0.02);
    rightDeltoid.rotation.set(0, 0, -0.18);
    rightDeltoid.name = "shoulders";
    humanGroup.add(rightDeltoid);
    meshes.shoulders.push(rightDeltoid);

    // =========================================================================
    // 5. SCULPTED ARMS (BICEPS, TRICEPS & FOREARMS)
    // =========================================================================
    // Upper Arm Bicep/Tricep Curvature
    const bicepGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.44, 20);
    bicepGeo.scale(1.1, 1, 1.2);

    const leftArmUpper = new THREE.Mesh(bicepGeo, createAnatomicalMaterial());
    leftArmUpper.position.set(-0.64, 1.0, 0.01);
    leftArmUpper.name = "arms";
    humanGroup.add(leftArmUpper);
    meshes.arms.push(leftArmUpper);

    const rightArmUpper = new THREE.Mesh(bicepGeo, createAnatomicalMaterial());
    rightArmUpper.position.set(0.64, 1.0, 0.01);
    rightArmUpper.name = "arms";
    humanGroup.add(rightArmUpper);
    meshes.arms.push(rightArmUpper);

    // Elbow Joints
    const elbowGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const leftElbow = new THREE.Mesh(elbowGeo, createAnatomicalMaterial(0.9));
    leftElbow.position.set(-0.64, 0.76, 0);
    humanGroup.add(leftElbow);

    const rightElbow = new THREE.Mesh(elbowGeo, createAnatomicalMaterial(0.9));
    rightElbow.position.set(0.64, 0.76, 0);
    humanGroup.add(rightElbow);

    // Forearms (Brachioradialis muscular taper)
    const forearmGeo = new THREE.CylinderGeometry(0.092, 0.068, 0.52, 18);
    const leftForearm = new THREE.Mesh(forearmGeo, createAnatomicalMaterial());
    leftForearm.position.set(-0.64, 0.48, 0.02);
    leftForearm.name = "arms";
    humanGroup.add(leftForearm);
    meshes.arms.push(leftForearm);

    const rightForearm = new THREE.Mesh(forearmGeo, createAnatomicalMaterial());
    rightForearm.position.set(0.64, 0.48, 0.02);
    rightForearm.name = "arms";
    humanGroup.add(rightForearm);
    meshes.arms.push(rightForearm);

    // Athletic Hands / Knuckles
    const handGeo = new THREE.BoxGeometry(0.07, 0.14, 0.04);
    const leftHand = new THREE.Mesh(handGeo, createAnatomicalMaterial(0.85));
    leftHand.position.set(-0.64, 0.17, 0.02);
    humanGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, createAnatomicalMaterial(0.85));
    rightHand.position.set(0.64, 0.17, 0.02);
    humanGroup.add(rightHand);

    // =========================================================================
    // 6. SCULPTED CORE & ABDOMINALS (6-PACK DELINEATION & OBLIQUES)
    // =========================================================================
    // Rectus Abdominis 6-Pack Matrix
    const abPackGeo = new THREE.BoxGeometry(0.12, 0.1, 0.06);
    const abYOffsets = [0.86, 0.73, 0.60];

    abYOffsets.forEach((yPos) => {
      // Left Ab Pad
      const leftAb = new THREE.Mesh(abPackGeo, createAnatomicalMaterial());
      leftAb.position.set(-0.08, yPos, 0.18);
      leftAb.name = "core";
      humanGroup.add(leftAb);
      meshes.core.push(leftAb);

      // Right Ab Pad
      const rightAb = new THREE.Mesh(abPackGeo, createAnatomicalMaterial());
      rightAb.position.set(0.08, yPos, 0.18);
      rightAb.name = "core";
      humanGroup.add(rightAb);
      meshes.core.push(rightAb);
    });

    // Abdominal Core Midsection Foundation
    const midsectionGeo = new THREE.CylinderGeometry(0.35, 0.31, 0.48, 24);
    midsectionGeo.scale(1.05, 1, 0.85);
    const midsection = new THREE.Mesh(midsectionGeo, createAnatomicalMaterial());
    midsection.position.set(0, 0.72, 0.02);
    midsection.name = "core";
    humanGroup.add(midsection);
    meshes.core.push(midsection);

    // External Obliques / V-Cut Adonis Belt
    const obliqueGeo = new THREE.BoxGeometry(0.09, 0.36, 0.18);
    const leftOblique = new THREE.Mesh(obliqueGeo, createAnatomicalMaterial());
    leftOblique.position.set(-0.31, 0.68, 0.03);
    leftOblique.rotation.z = -0.16;
    leftOblique.name = "core";
    humanGroup.add(leftOblique);
    meshes.core.push(leftOblique);

    const rightOblique = new THREE.Mesh(obliqueGeo, createAnatomicalMaterial());
    rightOblique.position.set(0.31, 0.68, 0.03);
    rightOblique.rotation.z = 0.16;
    rightOblique.name = "core";
    humanGroup.add(rightOblique);
    meshes.core.push(rightOblique);

    // =========================================================================
    // 7. SCULPTED PELVIS & GLUTEAL COMPLEX
    // =========================================================================
    const pelvisGeo = new THREE.CylinderGeometry(0.34, 0.29, 0.32, 20);
    pelvisGeo.scale(1.1, 1, 0.9);
    const pelvis = new THREE.Mesh(pelvisGeo, createAnatomicalMaterial(0.95));
    pelvis.position.set(0, 0.34, 0);
    pelvis.name = "core";
    humanGroup.add(pelvis);
    meshes.core.push(pelvis);

    // Gluteus Maximus Rounded Posterior
    const gluteGeo = new THREE.SphereGeometry(0.18, 18, 18);
    const leftGlute = new THREE.Mesh(gluteGeo, createAnatomicalMaterial());
    leftGlute.position.set(-0.16, 0.28, -0.12);
    leftGlute.name = "legs";
    humanGroup.add(leftGlute);
    meshes.legs.push(leftGlute);

    const rightGlute = new THREE.Mesh(gluteGeo, createAnatomicalMaterial());
    rightGlute.position.set(0.16, 0.28, -0.12);
    rightGlute.name = "legs";
    humanGroup.add(rightGlute);
    meshes.legs.push(rightGlute);

    // =========================================================================
    // 8. SCULPTED LEGS (QUADRICEPS, TEARDROP & CALVES)
    // =========================================================================
    // Thighs / Quadriceps with Vastus Medialis & Lateralis Sweep
    const thighGeo = new THREE.CylinderGeometry(0.165, 0.125, 0.88, 22);
    thighGeo.scale(1.08, 1, 1.15);

    const leftThigh = new THREE.Mesh(thighGeo, createAnatomicalMaterial());
    leftThigh.position.set(-0.21, -0.28, 0.02);
    leftThigh.name = "legs";
    humanGroup.add(leftThigh);
    meshes.legs.push(leftThigh);

    const rightThigh = new THREE.Mesh(thighGeo, createAnatomicalMaterial());
    rightThigh.position.set(0.21, -0.28, 0.02);
    rightThigh.name = "legs";
    humanGroup.add(rightThigh);
    meshes.legs.push(rightThigh);

    // Patella (Kneecaps)
    const patellaGeo = new THREE.SphereGeometry(0.08, 16, 16);
    patellaGeo.scale(1, 1.2, 0.6);
    const leftPatella = new THREE.Mesh(patellaGeo, createAnatomicalMaterial(0.9));
    leftPatella.position.set(-0.21, -0.74, 0.12);
    humanGroup.add(leftPatella);

    const rightPatella = new THREE.Mesh(patellaGeo, createAnatomicalMaterial(0.9));
    rightPatella.position.set(0.21, -0.74, 0.12);
    humanGroup.add(rightPatella);

    // Calves (Twin Gastrocnemius Heads tapering to Achilles)
    const calfGeo = new THREE.CylinderGeometry(0.125, 0.075, 0.94, 20);
    calfGeo.scale(1.05, 1, 1.2);

    const leftCalf = new THREE.Mesh(calfGeo, createAnatomicalMaterial());
    leftCalf.position.set(-0.21, -1.22, -0.01);
    leftCalf.name = "legs";
    humanGroup.add(leftCalf);
    meshes.legs.push(leftCalf);

    const rightCalf = new THREE.Mesh(calfGeo, createAnatomicalMaterial());
    rightCalf.position.set(0.21, -1.22, -0.01);
    rightCalf.name = "legs";
    humanGroup.add(rightCalf);
    meshes.legs.push(rightCalf);

    // Anatomical Feet
    const footGeo = new THREE.BoxGeometry(0.12, 0.08, 0.28);
    const leftFoot = new THREE.Mesh(footGeo, createAnatomicalMaterial(0.9));
    leftFoot.position.set(-0.21, -1.72, 0.06);
    humanGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, createAnatomicalMaterial(0.9));
    rightFoot.position.set(0.21, -1.72, 0.06);
    humanGroup.add(rightFoot);

    // =========================================================================
    // 9. HIGH-TECH BIO-SCANNER PEDESTAL WITH ILLUMINATED RINGS
    // =========================================================================
    const pedestalGeo = new THREE.CylinderGeometry(1.65, 1.8, 0.08, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x11221c,
      roughness: 0.2,
      metalness: 0.7,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, -1.78, 0);
    humanGroup.add(pedestal);

    // Concentric Neon Grid Ring on Base
    const ringGeo = new THREE.RingGeometry(1.2, 1.26, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x46c5b0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const baseRing = new THREE.Mesh(ringGeo, ringMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.set(0, -1.73, 0);
    humanGroup.add(baseRing);

    // Vertical Kinetic Bio-Scan Ring (Oscillates gently up and down)
    const scanRingGeo = new THREE.TorusGeometry(1.15, 0.012, 16, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x46c5b0,
      transparent: true,
      opacity: 0.45,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    scanRing.position.set(0, 0, 0);
    humanGroup.add(scanRing);
    scanRingRef.current = scanRing;

    // =========================================================================
    // 10. STUDIO LIGHTING SUITE
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Studio Key Light
    const keyLight = new THREE.DirectionalLight(0xfffbf0, 2.5);
    keyLight.position.set(3.5, 4.5, 4.5);
    scene.add(keyLight);

    // Electric Teal Fill Light (Enhances muscle separation)
    const fillLight = new THREE.DirectionalLight(0x46c5b0, 1.6);
    fillLight.position.set(-3.5, 0.5, 2.5);
    scene.add(fillLight);

    // Soft Lavender Rim Light (Highlights silhouette edges)
    const rimLight = new THREE.DirectionalLight(0xb9a5df, 1.8);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Scanner Base Uplight
    const upLight = new THREE.PointLight(0x46c5b0, 1.8, 4);
    upLight.position.set(0, -1.6, 0.4);
    scene.add(upLight);

    // Initial Material Update
    updateMaterials();

    // Interaction & Pointer Handlers
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let initialPinchDist = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      humanGroup.rotation.y += deltaX * 0.01;
      humanGroup.rotation.x = Math.max(-0.35, Math.min(0.35, humanGroup.rotation.x + deltaY * 0.005));
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Touch Pinch-to-Zoom
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (initialPinchDist > 0) {
          const delta = (dist - initialPinchDist) * 0.01;
          camera.position.z = Math.max(3.0, Math.min(7.5, camera.position.z - delta));
        }
        initialPinchDist = dist;
      }
    };

    const onTouchEnd = () => {
      initialPinchDist = 0;
    };

    // Mouse Wheel Zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(3.2, Math.min(7.5, camera.position.z + e.deltaY * 0.003));
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("wheel", onWheel, { passive: false });

    // Raycaster for region selection on click
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(humanGroup.children, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.name && hit.name in meshes) {
          onSelectRegion(hit.name as MuscleRegion);
        }
      }
    };

    container.addEventListener("click", onClick);

    // Animation Loop with Idle Frame Throttling & Scanner Wave
    let animId: number;
    let scanY = -1.6;
    let scanSpeed = 0.012;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        humanGroup.rotation.y += 0.006;
      }

      // Vertical scanner oscillation
      scanY += scanSpeed;
      if (scanY > 1.9 || scanY < -1.6) {
        scanSpeed = -scanSpeed;
      }
      if (scanRingRef.current) {
        scanRingRef.current.position.y = scanY;
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw > 0 && nh > 0) {
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("click", onClick);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      muscleTexture.dispose();
    };
  }, [onSelectRegion, updateMaterials]);

  // Viewport Control Actions
  const handleZoom = (direction: "in" | "out") => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    const delta = direction === "in" ? -0.5 : 0.5;
    cam.position.z = Math.max(3.2, Math.min(7.2, cam.position.z + delta));
  };

  const handleResetCamera = () => {
    if (!cameraRef.current || !humanGroupRef.current) return;
    cameraRef.current.position.copy(initialCamPos);
    humanGroupRef.current.rotation.set(0, 0, 0);
    setIsFrontView(true);
  };

  const handleFlipView = () => {
    if (!humanGroupRef.current) return;
    const targetY = isFrontView ? Math.PI : 0;
    humanGroupRef.current.rotation.y = targetY;
    setIsFrontView(!isFrontView);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`relative w-full h-[420px] sm:h-[500px] select-none ${className}`}>
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
        aria-label="Realistic 3D Fitness Digital Twin. Drag to rotate. Click to select muscle regions."
      />

      {/* Camera & Interactive Controls Floating Toolbar */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-[#183C32]/12 shadow-subtle z-10">
        <button
          onClick={() => handleZoom("in")}
          className="p-1.5 rounded-xl hover:bg-[#183C32]/10 text-[#183C32] transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom("out")}
          className="p-1.5 rounded-xl hover:bg-[#183C32]/10 text-[#183C32] transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-[#183C32]/15 mx-0.5" />
        <button
          onClick={handleFlipView}
          className="p-1.5 rounded-xl hover:bg-[#183C32]/10 text-[#183C32] transition-colors flex items-center gap-1 text-[11px] font-medium px-2"
          title="Flip Front / Back View"
        >
          <FlipHorizontal className="w-3.5 h-3.5" />
          <span>{isFrontView ? "Posterior" : "Anterior"}</span>
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-1.5 rounded-xl transition-colors flex items-center gap-1 text-[11px] font-medium px-2 ${
            autoRotate
              ? "bg-[#183C32] text-[#F5F1E8]"
              : "hover:bg-[#183C32]/10 text-[#183C32]"
          }`}
          title="Toggle Auto-Rotation"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Orbit</span>
        </button>
        <button
          onClick={handleResetCamera}
          className="p-1.5 rounded-xl hover:bg-[#183C32]/10 text-[#3E4542] transition-colors"
          title="Reset Camera Position"
          aria-label="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Perspective Badge */}
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm border border-[#183C32]/10 text-[10px] font-mono text-[#183C32] uppercase tracking-wider flex items-center gap-1.5 shadow-subtle">
        <Eye className="w-3 h-3 text-[#46C5B0]" />
        <span>{isFrontView ? "Anterior View" : "Posterior View"}</span>
      </div>
    </div>
  );
};

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
      let opacity = 0.85;

      switch (activeLayer) {
        case "activity": {
          const ratio = Math.min(1, regionData.weeklySets / Math.max(1, regionData.targetWeeklySets));
          baseColor = ratio >= 1 ? 0x183c32 : ratio >= 0.7 ? 0x46c5b0 : 0xed805a;
          if (isSelected) {
            emissiveColor = 0x46c5b0;
            emissiveIntensity = 0.7;
          }
          break;
        }
        case "measurements": {
          baseColor = 0x222624;
          if (isSelected) {
            baseColor = 0x46c5b0;
            emissiveColor = 0x183c32;
            emissiveIntensity = 0.8;
          }
          break;
        }
        case "nutrition": {
          baseColor = 0x183c32;
          if (regionData.glycogenStatus === "supercompensated") {
            baseColor = 0x46c5b0;
          } else if (regionData.glycogenStatus === "optimal") {
            baseColor = 0x1f4b3e;
          }
          if (isSelected) {
            emissiveColor = 0xed805a;
            emissiveIntensity = 0.6;
          }
          break;
        }
        case "recovery": {
          // Color based on recovery score
          if (regionData.recoveryScore >= 90) {
            baseColor = 0x183c32; // Fully recovered deep green
          } else if (regionData.recoveryScore >= 70) {
            baseColor = 0x46c5b0; // Optimal teal
          } else {
            baseColor = 0xed805a; // Sore / fatigue warm terracotta
          }
          if (isSelected) {
            emissiveColor = 0xf5f1e8;
            emissiveIntensity = 0.5;
          }
          break;
        }
        case "transformation": {
          baseColor = 0x183c32;
          if (isSelected) {
            emissiveColor = 0xb9a5df; // Soft lavender holographic tone
            emissiveIntensity = 0.8;
          }
          break;
        }
      }

      meshArray.forEach((mesh) => {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.setHex(baseColor);
          mesh.material.emissive.setHex(emissiveColor);
          mesh.material.emissiveIntensity = isSelected ? Math.max(emissiveIntensity, 0.45) : 0.05;
          mesh.material.opacity = isSelected ? 0.95 : opacity;
          mesh.material.needsUpdate = true;
        }
      });
    });
  }, [selectedRegion, activeLayer]);

  useEffect(() => {
    updateMaterials();
  }, [updateMaterials]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
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

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAutoRotate(false);
    }

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
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

    // Standard baseline material template
    const createPartMaterial = (opacity = 0.85) =>
      new THREE.MeshStandardMaterial({
        color: 0x183c32,
        roughness: 0.35,
        metalness: 0.2,
        transparent: true,
        opacity,
      });

    // --- ANATOMICAL VOLUMES ---
    // 1. Head
    const headGeo = new THREE.SphereGeometry(0.33, 24, 24);
    const headMat = createPartMaterial(0.9);
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 1.88, 0);
    humanGroup.add(head);

    // 2. Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.24, 16);
    const neck = new THREE.Mesh(neckGeo, createPartMaterial(0.9));
    neck.position.set(0, 1.54, 0);
    humanGroup.add(neck);

    // 3. Chest (Pectoralis)
    const chestGeo = new THREE.BoxGeometry(0.86, 0.52, 0.38);
    const chestMat = createPartMaterial();
    const chest = new THREE.Mesh(chestGeo, chestMat);
    chest.position.set(0, 1.18, 0.02);
    chest.name = "chest";
    humanGroup.add(chest);
    meshes.chest.push(chest);

    // 4. Back (Lats & Trapezius)
    const backGeo = new THREE.BoxGeometry(0.88, 0.58, 0.18);
    const backMat = createPartMaterial();
    const back = new THREE.Mesh(backGeo, backMat);
    back.position.set(0, 1.2, -0.12);
    back.name = "back";
    humanGroup.add(back);
    meshes.back.push(back);

    // 5. Shoulders (Deltoids)
    const shoulderGeo = new THREE.SphereGeometry(0.19, 18, 18);
    const leftShoulder = new THREE.Mesh(shoulderGeo, createPartMaterial());
    leftShoulder.position.set(-0.58, 1.34, 0);
    leftShoulder.name = "shoulders";
    humanGroup.add(leftShoulder);
    meshes.shoulders.push(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, createPartMaterial());
    rightShoulder.position.set(0.58, 1.34, 0);
    rightShoulder.name = "shoulders";
    humanGroup.add(rightShoulder);
    meshes.shoulders.push(rightShoulder);

    // 6. Arms (Biceps, Triceps, Forearms)
    const armUpperGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.52, 16);
    const armLowerGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.55, 16);

    const leftArmUpper = new THREE.Mesh(armUpperGeo, createPartMaterial());
    leftArmUpper.position.set(-0.66, 0.95, 0);
    leftArmUpper.name = "arms";
    humanGroup.add(leftArmUpper);
    meshes.arms.push(leftArmUpper);

    const rightArmUpper = new THREE.Mesh(armUpperGeo, createPartMaterial());
    rightArmUpper.position.set(0.66, 0.95, 0);
    rightArmUpper.name = "arms";
    humanGroup.add(rightArmUpper);
    meshes.arms.push(rightArmUpper);

    const leftArmLower = new THREE.Mesh(armLowerGeo, createPartMaterial());
    leftArmLower.position.set(-0.66, 0.42, 0);
    leftArmLower.name = "arms";
    humanGroup.add(leftArmLower);
    meshes.arms.push(leftArmLower);

    const rightArmLower = new THREE.Mesh(armLowerGeo, createPartMaterial());
    rightArmLower.position.set(0.66, 0.42, 0);
    rightArmLower.name = "arms";
    humanGroup.add(rightArmLower);
    meshes.arms.push(rightArmLower);

    // 7. Core & Abdomen
    const coreGeo = new THREE.CylinderGeometry(0.36, 0.33, 0.54, 18);
    const coreMat = createPartMaterial();
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, 0.68, 0);
    core.name = "core";
    humanGroup.add(core);
    meshes.core.push(core);

    // 8. Pelvis / Hip Girdle
    const pelvisGeo = new THREE.CylinderGeometry(0.36, 0.31, 0.32, 16);
    const pelvis = new THREE.Mesh(pelvisGeo, createPartMaterial(0.9));
    pelvis.position.set(0, 0.3, 0);
    pelvis.name = "core";
    humanGroup.add(pelvis);
    meshes.core.push(pelvis);

    // 9. Legs (Thighs, Hamstrings, Calves)
    const thighGeo = new THREE.CylinderGeometry(0.16, 0.12, 0.94, 16);
    const calfGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.98, 16);

    const leftThigh = new THREE.Mesh(thighGeo, createPartMaterial());
    leftThigh.position.set(-0.24, -0.32, 0);
    leftThigh.name = "legs";
    humanGroup.add(leftThigh);
    meshes.legs.push(leftThigh);

    const rightThigh = new THREE.Mesh(thighGeo, createPartMaterial());
    rightThigh.position.set(0.24, -0.32, 0);
    rightThigh.name = "legs";
    humanGroup.add(rightThigh);
    meshes.legs.push(rightThigh);

    const leftCalf = new THREE.Mesh(calfGeo, createPartMaterial());
    leftCalf.position.set(-0.24, -1.26, 0);
    leftCalf.name = "legs";
    humanGroup.add(leftCalf);
    meshes.legs.push(leftCalf);

    const rightCalf = new THREE.Mesh(calfGeo, createPartMaterial());
    rightCalf.position.set(0.24, -1.26, 0);
    rightCalf.name = "legs";
    humanGroup.add(rightCalf);
    meshes.legs.push(rightCalf);

    // 10. Ambient Holographic Halo Ring
    const haloGeo = new THREE.TorusGeometry(1.45, 0.015, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x46c5b0,
      transparent: true,
      opacity: 0.35,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.set(0, -1.72, 0);
    humanGroup.add(halo);

    // 11. Lighting Suite
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf5f1e8, 2.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x46c5b0, 1.4);
    fillLight.position.set(-4, -1, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xb9a5df, 1.2);
    rimLight.position.set(0, -4, 4);
    scene.add(rimLight);

    // Initial Material Pass
    updateMaterials();

    // Interaction & Mouse/Touch Handlers
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
      humanGroup.rotation.x = Math.max(-0.4, Math.min(0.4, humanGroup.rotation.x + deltaY * 0.005));
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

    // Animation Loop with Idle Frame Throttling
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        humanGroup.rotation.y += 0.006;
      }
      halo.rotation.z += 0.006;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
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
      headGeo.dispose();
      neckGeo.dispose();
      chestGeo.dispose();
      backGeo.dispose();
      shoulderGeo.dispose();
      armUpperGeo.dispose();
      armLowerGeo.dispose();
      coreGeo.dispose();
      pelvisGeo.dispose();
      thighGeo.dispose();
      calfGeo.dispose();
      haloGeo.dispose();
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
    return null; // Will trigger fallback
  }

  return (
    <div className={`relative w-full h-[400px] sm:h-[480px] select-none ${className}`}>
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
        aria-label="3D Fitness Digital Twin. Drag to rotate. Click to select muscle regions."
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

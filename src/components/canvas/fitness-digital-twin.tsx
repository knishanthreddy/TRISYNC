"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type MuscleRegion = "chest" | "back" | "shoulders" | "arms" | "core" | "legs" | "all";

interface FitnessDigitalTwinProps {
  selectedRegion: MuscleRegion;
  onSelectRegion: (region: MuscleRegion) => void;
  className?: string;
}

export const FitnessDigitalTwin: React.FC<FitnessDigitalTwinProps> = ({
  selectedRegion,
  onSelectRegion,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  // Keep ref to scene elements to update highlights when selectedRegion changes
  const meshMapRef = useRef<Record<string, THREE.Mesh>>({});

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

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const humanGroup = new THREE.Group();
    scene.add(humanGroup);

    // Baseline Materials
    const defaultMat = new THREE.MeshStandardMaterial({
      color: 0x183c32,
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 0.82,
    });

    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0x46c5b0,
      emissive: 0x183c32,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.4,
    });

    // Anatomical Geometries
    // Head
    const headGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const head = new THREE.Mesh(headGeo, defaultMat.clone());
    head.position.set(0, 1.85, 0);
    humanGroup.add(head);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.22, 16);
    const neck = new THREE.Mesh(neckGeo, defaultMat.clone());
    neck.position.set(0, 1.5, 0);
    humanGroup.add(neck);

    // Chest / Upper Torso
    const chestGeo = new THREE.BoxGeometry(0.85, 0.55, 0.42);
    const chest = new THREE.Mesh(chestGeo, defaultMat.clone());
    chest.position.set(0, 1.15, 0);
    chest.name = "chest";
    humanGroup.add(chest);
    meshMapRef.current["chest"] = chest;

    // Shoulders
    const leftShoulderGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const leftShoulder = new THREE.Mesh(leftShoulderGeo, defaultMat.clone());
    leftShoulder.position.set(-0.56, 1.3, 0);
    leftShoulder.name = "shoulders";
    humanGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(leftShoulderGeo, defaultMat.clone());
    rightShoulder.position.set(0.56, 1.3, 0);
    rightShoulder.name = "shoulders";
    humanGroup.add(rightShoulder);
    meshMapRef.current["shoulders"] = leftShoulder;

    // Core / Abdomen
    const coreGeo = new THREE.CylinderGeometry(0.36, 0.34, 0.5, 16);
    const core = new THREE.Mesh(coreGeo, defaultMat.clone());
    core.position.set(0, 0.65, 0);
    core.name = "core";
    humanGroup.add(core);
    meshMapRef.current["core"] = core;

    // Back / Traps
    const backGeo = new THREE.BoxGeometry(0.8, 0.5, 0.18);
    const back = new THREE.Mesh(backGeo, defaultMat.clone());
    back.position.set(0, 1.15, -0.15);
    back.name = "back";
    humanGroup.add(back);
    meshMapRef.current["back"] = back;

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.75, 16);
    const leftArm = new THREE.Mesh(armGeo, defaultMat.clone());
    leftArm.position.set(-0.64, 0.75, 0);
    leftArm.name = "arms";
    humanGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, defaultMat.clone());
    rightArm.position.set(0.64, 0.75, 0);
    rightArm.name = "arms";
    humanGroup.add(rightArm);
    meshMapRef.current["arms"] = leftArm;

    // Pelvis
    const pelvisGeo = new THREE.CylinderGeometry(0.35, 0.3, 0.28, 16);
    const pelvis = new THREE.Mesh(pelvisGeo, defaultMat.clone());
    pelvis.position.set(0, 0.28, 0);
    humanGroup.add(pelvis);

    // Legs
    const thighGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.9, 16);
    const leftLeg = new THREE.Mesh(thighGeo, defaultMat.clone());
    leftLeg.position.set(-0.22, -0.32, 0);
    leftLeg.name = "legs";
    humanGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(thighGeo, defaultMat.clone());
    rightLeg.position.set(0.22, -0.32, 0);
    rightLeg.name = "legs";
    humanGroup.add(rightLeg);

    const calfGeo = new THREE.CylinderGeometry(0.11, 0.08, 0.95, 16);
    const leftCalf = new THREE.Mesh(calfGeo, defaultMat.clone());
    leftCalf.position.set(-0.22, -1.2, 0);
    leftCalf.name = "legs";
    humanGroup.add(leftCalf);

    const rightCalf = new THREE.Mesh(calfGeo, defaultMat.clone());
    rightCalf.position.set(0.22, -1.2, 0);
    rightCalf.name = "legs";
    humanGroup.add(rightCalf);
    meshMapRef.current["legs"] = leftLeg;

    // Ambient Hologram Rings around the twin
    const haloGeo = new THREE.TorusGeometry(1.4, 0.02, 16, 60);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x46c5b0,
      transparent: true,
      opacity: 0.35,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.set(0, -1.6, 0);
    humanGroup.add(halo);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xf5f1e8, 2.0);
    dirLight.position.set(4, 5, 5);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x46c5b0, 1.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Mouse Controls (Rotation & Zoom)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let autoRotate = true;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      humanGroup.rotation.y += deltaX * 0.01;
      humanGroup.rotation.x += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Raycaster for clicking regions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(humanGroup.children);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.name && hit.name in meshMapRef.current) {
          onSelectRegion(hit.name as MuscleRegion);
        }
      }
    };

    container.addEventListener("click", onClick);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate) {
        humanGroup.rotation.y += 0.006;
      }
      halo.rotation.z += 0.008;

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
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("click", onClick);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      headGeo.dispose();
      neckGeo.dispose();
      chestGeo.dispose();
      leftShoulderGeo.dispose();
      coreGeo.dispose();
      backGeo.dispose();
      armGeo.dispose();
      pelvisGeo.dispose();
      thighGeo.dispose();
      calfGeo.dispose();
      haloGeo.dispose();
      defaultMat.dispose();
      highlightMat.dispose();
      haloMat.dispose();
    };
  }, [onSelectRegion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center ${className}`}
      aria-label="Interactive 3D Fitness Digital Twin. Drag to rotate. Click muscle groups to inspect recovery."
    />
  );
};

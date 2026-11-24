"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroThreeSceneProps {
  className?: string;
}

export const HeroThreeScene: React.FC<HeroThreeSceneProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

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

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. CENTRAL TRISYNC IDENTITY CORE (Luminous Icosahedron + Inner Shell)
    const centralCoreGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const centralCoreMat = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const centralCore = new THREE.Mesh(centralCoreGeo, centralCoreMat);
    mainGroup.add(centralCore);

    const coreWireGeo = new THREE.IcosahedronGeometry(1.02, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x183c32,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    mainGroup.add(coreWire);

    // 2. PHYSICAL DIMENSION: Kinetic movement helix & energy ribbon (Deep Forest #183C32 & Sage #A9B9A4)
    const physicalCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-2.2, -1.2, 0.5),
        new THREE.Vector3(-1.8, 1.2, -0.6),
        new THREE.Vector3(-0.4, 1.8, 0.8),
        new THREE.Vector3(0.8, 0.4, -0.8),
        new THREE.Vector3(-0.5, -1.6, -0.2),
        new THREE.Vector3(-2.2, -1.2, 0.5),
      ],
      true
    );
    const physicalRibbonGeo = new THREE.TubeGeometry(physicalCurve, 80, 0.09, 16, true);
    const physicalMat = new THREE.MeshStandardMaterial({
      color: 0x183c32,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.9,
    });
    const physicalMesh = new THREE.Mesh(physicalRibbonGeo, physicalMat);
    mainGroup.add(physicalMesh);

    // Physical kinetic energy nodes
    const physicalNodesGroup = new THREE.Group();
    const nodeSphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const sageMat = new THREE.MeshStandardMaterial({
      color: 0xa9b9a4,
      emissive: 0x183c32,
      emissiveIntensity: 0.3,
    });
    for (let i = 0; i < 7; i++) {
      const t = i / 7;
      const pt = physicalCurve.getPoint(t);
      const m = new THREE.Mesh(nodeSphereGeo, sageMat);
      m.position.copy(pt);
      physicalNodesGroup.add(m);
    }
    mainGroup.add(physicalNodesGroup);

    // 3. MENTAL DIMENSION: Brain-inspired abstract synaptic cloud & flowing particle rings (Soft Lavender #B9A5DF)
    const mentalParticlesCount = 90;
    const mentalGeo = new THREE.BufferGeometry();
    const mentalPos = new Float32Array(mentalParticlesCount * 3);
    for (let i = 0; i < mentalParticlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.9 + Math.sin(theta * 3) * 0.35 + (Math.random() - 0.5) * 0.4;
      mentalPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      mentalPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85 + 0.2;
      mentalPos[i * 3 + 2] = r * Math.cos(phi) * 0.9;
    }
    mentalGeo.setAttribute("position", new THREE.BufferAttribute(mentalPos, 3));
    const mentalMat = new THREE.PointsMaterial({
      color: 0xb9a5df,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
    });
    const mentalParticles = new THREE.Points(mentalGeo, mentalMat);
    mainGroup.add(mentalParticles);

    // Mental orbital halo
    const mentalHaloGeo = new THREE.TorusGeometry(1.95, 0.045, 16, 100);
    const mentalHaloMat = new THREE.MeshStandardMaterial({
      color: 0x7b59ba,
      roughness: 0.35,
      transparent: true,
      opacity: 0.7,
    });
    const mentalHalo = new THREE.Mesh(mentalHaloGeo, mentalHaloMat);
    mentalHalo.rotation.x = Math.PI / 4;
    mentalHalo.rotation.y = Math.PI / 6;
    mainGroup.add(mentalHalo);

    // 4. DIGITAL DIMENSION: Intelligent data pathways & connected nodes (Electric Teal #46C5B0 & Terracotta #ED805A)
    const digitalCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(1.9, -1.3, 0.4),
        new THREE.Vector3(2.3, 0.5, -0.5),
        new THREE.Vector3(1.1, 1.9, 0.6),
        new THREE.Vector3(0.3, 0.7, -0.9),
        new THREE.Vector3(1.2, -1.8, -0.3),
        new THREE.Vector3(1.9, -1.3, 0.4),
      ],
      true
    );
    const digitalTubeGeo = new THREE.TubeGeometry(digitalCurve, 70, 0.05, 12, true);
    const digitalMat = new THREE.MeshStandardMaterial({
      color: 0x46c5b0,
      roughness: 0.15,
      metalness: 0.45,
      transparent: true,
      opacity: 0.92,
    });
    const digitalTube = new THREE.Mesh(digitalTubeGeo, digitalMat);
    mainGroup.add(digitalTube);

    // Digital nodes with terracotta accent pulse
    const digitalNodesGroup = new THREE.Group();
    const terracottaMat = new THREE.MeshStandardMaterial({
      color: 0xed805a,
      roughness: 0.2,
      metalness: 0.3,
    });
    const tealMat = new THREE.MeshStandardMaterial({
      color: 0x46c5b0,
      roughness: 0.1,
      metalness: 0.5,
    });
    for (let i = 0; i < 8; i++) {
      const pt = digitalCurve.getPoint(i / 8);
      const isTerracotta = i % 2 === 0;
      const nm = new THREE.Mesh(nodeSphereGeo, isTerracotta ? terracottaMat : tealMat);
      nm.position.copy(pt);
      digitalNodesGroup.add(nm);
    }
    mainGroup.add(digitalNodesGroup);

    // 5. CONNECTIVE TETHER BEAMS LINKING ALL 3 TO THE CENTRAL TRISYNC CORE
    const tetherGroup = new THREE.Group();
    const tetherMat = new THREE.LineBasicMaterial({
      color: 0x183c32,
      transparent: true,
      opacity: 0.25,
    });
    const tetherTargets = [
      new THREE.Vector3(-1.8, 1.2, -0.6), // physical
      new THREE.Vector3(1.6, 1.4, 0.5),  // mental
      new THREE.Vector3(2.0, -0.8, -0.4), // digital
    ];
    tetherTargets.forEach((tgt) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        tgt,
      ]);
      const line = new THREE.Line(lineGeo, tetherMat);
      tetherGroup.add(line);
    });
    mainGroup.add(tetherGroup);

    // 6. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf5f1e8, 2.0);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const tealRim = new THREE.DirectionalLight(0x46c5b0, 1.4);
    tealRim.position.set(-5, -4, -3);
    scene.add(tealRim);

    const lavenderRim = new THREE.DirectionalLight(0xb9a5df, 1.2);
    lavenderRim.position.set(0, -5, 3);
    scene.add(lavenderRim);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous subtle dimensional rotations
      physicalMesh.rotation.y = t * 0.12;
      physicalMesh.rotation.z = Math.sin(t * 0.18) * 0.2;
      physicalNodesGroup.rotation.y = t * 0.12;
      physicalNodesGroup.rotation.z = Math.sin(t * 0.18) * 0.2;

      mentalParticles.rotation.y = -t * 0.15;
      mentalHalo.rotation.z = t * 0.1;

      digitalTube.rotation.x = t * 0.14;
      digitalTube.rotation.y = t * 0.1;
      digitalNodesGroup.rotation.x = t * 0.14;
      digitalNodesGroup.rotation.y = t * 0.1;

      // Central core gentle breathing resonance
      const pulse = 1.0 + Math.sin(t * 1.8) * 0.045;
      centralCore.scale.set(pulse, pulse, pulse);
      coreWire.rotation.y = t * 0.08;
      coreWire.rotation.x = t * 0.05;

      // Mouse smoothing
      mouseX += (targetX - mouseX) * 0.045;
      mouseY += (targetY - mouseY) * 0.045;
      mainGroup.rotation.y = mouseX;
      mainGroup.rotation.x = -mouseY;

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
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      centralCoreGeo.dispose();
      centralCoreMat.dispose();
      coreWireGeo.dispose();
      coreWireMat.dispose();
      physicalRibbonGeo.dispose();
      physicalMat.dispose();
      nodeSphereGeo.dispose();
      sageMat.dispose();
      mentalGeo.dispose();
      mentalMat.dispose();
      mentalHaloGeo.dispose();
      mentalHaloMat.dispose();
      digitalTubeGeo.dispose();
      digitalMat.dispose();
      terracottaMat.dispose();
      tealMat.dispose();
      tetherMat.dispose();
    };
  }, []);

  if (!isSupported) {
    return (
      <div className={`flex items-center justify-center p-8 text-center ${className}`}>
        <div className="w-56 h-56 rounded-full border-2 border-[#183C32]/15 flex flex-col items-center justify-center p-4">
          <span className="text-xs uppercase font-mono tracking-widest text-[#183C32] font-semibold">
            TRISYNC TRI-CORE
          </span>
          <span className="text-[11px] text-[#3E4542] mt-1">
            Physical &middot; Mental &middot; Digital in Sync
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center ${className}`}
      aria-label="Interactive 3D representation connecting physical movement, mental calm, and digital intelligence into one TRISYNC core"
    />
  );
};

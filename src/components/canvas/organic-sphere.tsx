"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface OrganicSphereProps {
  className?: string;
  interactive?: boolean;
}

export const OrganicSphere: React.FC<OrganicSphereProps> = ({
  className = "",
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group for the 3 interwoven dimensions
    const triGroup = new THREE.Group();
    scene.add(triGroup);

    // Dimension 1: Physical (Deep Forest / Sage) - Smooth Torus Knot
    const physicalGeo = new THREE.TorusGeometry(1.6, 0.08, 32, 100);
    const physicalMat = new THREE.MeshStandardMaterial({
      color: 0x183c32,
      roughness: 0.25,
      metalness: 0.15,
      transparent: true,
      opacity: 0.88,
    });
    const physicalRing = new THREE.Mesh(physicalGeo, physicalMat);
    physicalRing.rotation.x = Math.PI / 3;
    triGroup.add(physicalRing);

    // Dimension 2: Mental (Soft Lavender) - Second inclined Torus
    const mentalGeo = new THREE.TorusGeometry(1.52, 0.07, 32, 100);
    const mentalMat = new THREE.MeshStandardMaterial({
      color: 0xb9a5df,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const mentalRing = new THREE.Mesh(mentalGeo, mentalMat);
    mentalRing.rotation.y = Math.PI / 2.8;
    triGroup.add(mentalRing);

    // Dimension 3: Digital (Electric Teal) - Third Torus
    const digitalGeo = new THREE.TorusGeometry(1.44, 0.06, 32, 100);
    const digitalMat = new THREE.MeshStandardMaterial({
      color: 0x46c5b0,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.9,
    });
    const digitalRing = new THREE.Mesh(digitalGeo, digitalMat);
    digitalRing.rotation.z = Math.PI / 3.5;
    triGroup.add(digitalRing);

    // Central Core: Subtle Luminous Core representing Unified Self
    const coreGeo = new THREE.IcosahedronGeometry(0.72, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      roughness: 0.6,
      metalness: 0.05,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    triGroup.add(core);

    // Delicate floating particle field
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0xed805a, // Terracotta accent particle
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    triGroup.add(particles);

    // Lighting: Soft, controlled, minimal
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf5f1e8, 1.8);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x46c5b0, 1.2);
    dirLight2.position.set(-4, -3, -2);
    scene.add(dirLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.6;
      targetY = y * 0.6;
    };

    if (interactive) {
      window.addEventListener("mousemove", onMouseMove);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous rotation
      physicalRing.rotation.z += 0.003;
      mentalRing.rotation.x += 0.0035;
      digitalRing.rotation.y += 0.004;
      core.rotation.y -= 0.002;
      particles.rotation.y += 0.0015;

      // Subtle breathing pulse on the core
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      core.scale.set(scale, scale, scale);

      // Smooth mouse damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      triGroup.rotation.y = mouseX;
      triGroup.rotation.x = -mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener("mousemove", onMouseMove);
      }
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      physicalGeo.dispose();
      physicalMat.dispose();
      mentalGeo.dispose();
      mentalMat.dispose();
      digitalGeo.dispose();
      digitalMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [interactive]);

  if (!isSupported) {
    return (
      <div
        className={`flex items-center justify-center p-6 text-center text-xs text-[#3E4542] ${className}`}
      >
        <div className="w-40 h-40 rounded-full border border-[#183C32]/20 flex items-center justify-center">
          <span className="font-medium text-[#183C32]">TRISYNC TRI-CORE</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}
      aria-label="Interactive 3D Representation of Physical, Mental and Digital Wellbeing in Sync"
    />
  );
};

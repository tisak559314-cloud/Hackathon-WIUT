import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCluster3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.z = 850;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Particle System (Neuromorphic Event Cluster)
    // Prophesee event colors: cyan #00e5ff, blue #407ec9, electric blue #3b82f6, white #ffffff
    const particleCount = 1400;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];
    const sphereRadius = 260;

    const baseColors = [
      new THREE.Color(0x407ec9), // Prophesee signature blue
      new THREE.Color(0x00e5ff), // Bright cyan contrast
      new THREE.Color(0x2ea3f2), // Lite blue
      new THREE.Color(0xffffff), // Active event spike
    ];

    for (let i = 0; i < particleCount; i++) {
      // In-globe distribution (Fibonacci sphere / random spherical shell)
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const r = sphereRadius * Math.pow(Math.random(), 0.5) * (0.8 + 0.4 * Math.random());

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      velocities.push({
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4,
        baseR: r,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
      });

      const color = baseColors[Math.floor(Math.random() * baseColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular soft glow texture for points
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(64, 126, 201, 0.8)');
    grad.addColorStop(0.8, 'rgba(0, 229, 255, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 9.0,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Dynamic interconnecting lines between close particles (neuromorphic synaptic net)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const maxConnections = 600;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 4. Mouse and Target Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationFrameId;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Smooth target interpolation
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;

      pointCloud.rotation.y = time * 0.12 + targetX * 0.5;
      pointCloud.rotation.x = Math.sin(time * 0.08) * 0.15 - targetY * 0.5;
      linesMesh.rotation.copy(pointCloud.rotation);

      // Particle pulsing & drift
      const pos = pointCloud.geometry.attributes.position.array;
      let lineIdx = 0;

      for (let i = 0; i < particleCount; i++) {
        const vel = velocities[i];
        const idx = i * 3;

        // Subtle organic expansion/contraction like breathing neuromorphic lattice
        const pulse = 1 + Math.sin(time * 2 + vel.pulseOffset) * 0.04;
        pos[idx] += vel.x * pulse;
        pos[idx + 1] += vel.y * pulse;
        pos[idx + 2] += vel.z * pulse;

        // Bound within globe radius
        const dist = Math.sqrt(pos[idx] ** 2 + pos[idx + 1] ** 2 + pos[idx + 2] ** 2);
        if (dist > sphereRadius * 1.35 || dist < sphereRadius * 0.4) {
          vel.x *= -1;
          vel.y *= -1;
          vel.z *= -1;
        }

        // Connect subset of nearby particles with glowing lines
        if (i < 120 && lineIdx < maxConnections * 6) {
          for (let j = i + 1; j < 120; j++) {
            const jdx = j * 3;
            const dx = pos[idx] - pos[jdx];
            const dy = pos[idx + 1] - pos[jdx + 1];
            const dz = pos[idx + 2] - pos[jdx + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (d < 65 && lineIdx < maxConnections * 6 - 6) {
              linePositions[lineIdx++] = pos[idx];
              linePositions[lineIdx++] = pos[idx + 1];
              linePositions[lineIdx++] = pos[idx + 2];
              linePositions[lineIdx++] = pos[jdx];
              linePositions[lineIdx++] = pos[jdx + 1];
              linePositions[lineIdx++] = pos[jdx + 2];
            }
          }
        }
      }

      pointCloud.geometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eye, Cpu, Radio, ShieldCheck, Activity, Layers, Play } from 'lucide-react';

export default function HolographicApertureVisual() {
  const [activePreset, setActivePreset] = useState('mosaic'); // 'mosaic' as default Event Stream
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const presets = {
    sphere: {
      id: 'sphere',
      src: '/videos/digital-sphere.mp4',
      name: '3D Neural Sphere',
      subtitle: 'BIOMIMETIC NEURAL LATTICE',
      rate: '4,821,900 ev/s',
      latency: '< 8 µs Latency',
      power: '2.4 mW Ultra-Low Power',
      resolution: '1280 x 720 HD',
      blend: 'mix-blend-screen',
      badgeColor: 'text-[#00e5ff] border-[#00e5ff]/30',
      description: 'Continuous asynchronous event recording in 3D coordinate space',
    },
    silicon: {
      id: 'silicon',
      src: '/videos/metavision-intelligence.mp4',
      name: 'Silicon Core',
      subtitle: 'METAVISION® GENX320 DIE',
      rate: '6,450,000 ev/s',
      latency: '< 5 µs Latency',
      power: '3.1 mW Dynamic Power',
      resolution: 'Custom 3D Silicon Matrix',
      blend: 'mix-blend-lighten',
      badgeColor: 'text-[#0693e3] border-[#0693e3]/30',
      description: 'Neuromorphic pixel architecture with on-chip edge processing',
    },
    mosaic: {
      id: 'mosaic',
      src: '/videos/metavision-mosaic.mp4',
      name: 'Event Stream',
      subtitle: 'REAL-TIME SENSOR STREAM',
      rate: '10,240,000 ev/s',
      latency: '10,000 FPS Equiv.',
      power: 'Zero Motion Blur',
      resolution: 'Multi-Sensor Mosaic',
      blend: 'mix-blend-luminosity',
      badgeColor: 'text-[#00d084] border-[#00d084]/30',
      description: 'Live Metavision footage capturing high-speed temporal events',
    },
    quantum: {
      id: 'quantum',
      src: '/videos/neural-network.mp4',
      name: 'Quantum Cloud',
      subtitle: 'POINT CLOUD RECONSTRUCTION',
      rate: '3,890,000 ev/s',
      latency: '< 10 µs Latency',
      power: '120 dB Dynamic Range',
      resolution: 'Sparse Vector Array',
      blend: 'mix-blend-screen',
      badgeColor: 'text-[#9b51e0] border-[#9b51e0]/30',
      description: 'Sparse matrix computation discarding static visual redundancies',
    },
  };

  const current = presets[activePreset];

  // Auto-play video whenever preset changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [activePreset]);

  // Handle subtle 3D interactive mouse tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16; // -8 to 8 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16; // -8 to 8 deg
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] flex flex-col items-center justify-center select-none py-2 transition-transform duration-300 ease-out"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Ambient Radial Backlight Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-[#0693e3]/20 blur-3xl" />
        <div className="w-[260px] h-[260px] rounded-full bg-[#00e5ff]/15 blur-2xl animate-pulse" />
      </div>

      {/* Main Holographic Container with 3D Tilt */}
      <div
        className="relative w-[340px] h-[340px] sm:w-[410px] sm:h-[410px] flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Outer Cybernetic Orbital HUD Rings */}
        <div className="absolute inset-0 rounded-full border border-[#0693e3]/25 animate-[spin_50s_linear_infinite] pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-[#00e5ff]/35 animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />
        <div className="absolute inset-8 sm:inset-9 rounded-full border border-[#0693e3]/20 pointer-events-none" />

        {/* 4 Cardinal HUD Coordinates */}
        <div className="absolute inset-5 flex items-center justify-between pointer-events-none text-[9px] font-mono text-[#00e5ff]/60 px-1">
          <span>270° W</span>
          <span>090° E</span>
        </div>
        <div className="absolute inset-5 flex flex-col items-center justify-between pointer-events-none text-[9px] font-mono text-[#00e5ff]/60 py-1">
          <span>000° N</span>
          <span>180° S</span>
        </div>

        {/* Outer Corner Precision Reticles */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00e5ff]/70 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00e5ff]/70 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00e5ff]/70 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00e5ff]/70 pointer-events-none" />

        {/* 2. Central Holographic Video Aperture */}
        <div className="relative z-10 w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] rounded-full overflow-hidden border-2 border-[#00e5ff]/70 shadow-[0_0_55px_rgba(0,229,255,0.45)] bg-[#080c14] flex items-center justify-center group">
          {/* Looping 3D High-Tech Video from the Internet */}
          <video
            ref={videoRef}
            key={current.src}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover scale-110 filter brightness-110 contrast-125 transition-all duration-700 ${current.blend}`}
          >
            <source src={current.src} type="video/mp4" />
          </video>

          {/* Holographic Cyan Glass Lens Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00e5ff]/10 to-white/20 pointer-events-none" />

          {/* Sweeping Laser Radar Beam */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-40">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-[#0693e3]/50 origin-bottom-right animate-[spin_4s_linear_infinite]" />
          </div>

          {/* Center Tactical Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full border border-dashed border-[#00e5ff]/40 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
            </div>
            <div className="absolute w-24 h-[1px] bg-[#00e5ff]/35" />
            <div className="absolute h-24 w-[1px] bg-[#00e5ff]/35" />
          </div>

          {/* Top Hologram Status HUD Pill */}
          <div className="absolute top-4 inset-x-8 z-20 flex items-center justify-between text-[9px] font-mono bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#00e5ff]/30 shadow-lg">
            <div className="flex items-center gap-1.5 text-[#00e5ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse" />
              <span className="font-bold tracking-wider">{current.subtitle}</span>
            </div>
            <span className="text-gray-400 font-semibold">{current.resolution}</span>
          </div>

          {/* Bottom Telemetry HUD Bar */}
          <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between text-[10px] font-mono bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xl">
            <div className="flex items-center gap-1.5 text-gray-200">
              <Activity className="w-3 h-3 text-[#00e5ff] animate-pulse" />
              <span className="font-bold text-white">{current.rate}</span>
            </div>
            <span className="text-[#00e5ff] text-[9px] font-semibold">{current.latency}</span>
          </div>
        </div>

        {/* Floating Precision Metric Pill */}
        <div className="absolute -bottom-3 sm:-bottom-4 z-20 bg-[#0c121e]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#00e5ff]/50 shadow-[0_4px_25px_rgba(0,229,255,0.3)] flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00d084] animate-ping" />
          <span className="text-xs font-mono font-bold text-[#00e5ff] tracking-wide">
            {current.power}
          </span>
        </div>
      </div>

      {/* Preset Selector Buttons: 4 Authentic High-Tech Visuals from the Internet */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 bg-[#0c121e]/90 p-1.5 rounded-2xl border border-[#1f2d45] backdrop-blur-md shadow-2xl z-20 max-w-full">
        {Object.values(presets).map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0693e3] text-white shadow-lg shadow-[#0693e3]/40 scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {preset.id === 'sphere' && <Sparkles className="w-3 h-3" />}
              {preset.id === 'silicon' && <Cpu className="w-3 h-3" />}
              {preset.id === 'mosaic' && <Eye className="w-3 h-3" />}
              {preset.id === 'quantum' && <Layers className="w-3 h-3" />}
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Description Snippet */}
      <div className="mt-2.5 text-center text-gray-400 text-xs font-sans max-w-[340px] px-2 leading-relaxed">
        {current.description}
      </div>
    </div>
  );
}

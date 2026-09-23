import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Zap, Activity, Radio, Shield, Crosshair } from 'lucide-react';

export default function NeuromorphicCoreVisual() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // 3D tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  // Live telemetry metrics
  const [eventRate, setEventRate] = useState(3842190);
  const [pulseActive, setPulseActive] = useState(false);
  const [shockwaves, setShockwaves] = useState([]);

  // Mouse move 3D card tilt handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Trigger shockwave pulse on click
  const triggerPulse = () => {
    setPulseActive(true);
    setEventRate((prev) => prev + Math.floor(Math.random() * 800000 + 400000));
    setShockwaves((prev) => [...prev, { id: Date.now() }]);
    setTimeout(() => setPulseActive(false), 800);
  };

  // Live fluctuating telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setEventRate((prev) => {
        const delta = Math.floor((Math.random() - 0.48) * 120000);
        return Math.max(2500000, Math.min(6800000, prev + delta));
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Canvas particle stream & scanning laser simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = (canvas.width = 380);
    const height = (canvas.height = 380);

    // Particles representing incoming photons & outgoing events
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2.5 + 1,
      color: Math.random() > 0.4 ? '#00e5ff' : '#0693e3',
      alpha: Math.random() * 0.7 + 0.3,
    }));

    let scanY = 0;
    let scanSpeed = 1.6;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Moving laser scan line
      scanY += scanSpeed;
      if (scanY > height || scanY < 0) {
        scanSpeed *= -1;
      }

      // Laser scan gradient beam
      const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      scanGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.45)');
      scanGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(40, scanY - 20, width - 80, 40);

      // Laser sharp line
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(45, scanY);
      ctx.lineTo(width - 45, scanY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 2. Render particles & connections
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 30 || p.x > width - 30) p.vx *= -1;
        if (p.y < 30 || p.y > height - 30) p.vy *= -1;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            ctx.strokeStyle = '#0693e3';
            ctx.globalAlpha = (1 - dist / 45) * 0.25;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full max-w-[460px] flex items-center justify-center select-none">
      {/* 1. Holographic Cybernetic HUD Outer Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outermost precision coordinate ring */}
        <div className="w-[390px] h-[390px] sm:w-[430px] sm:h-[430px] rounded-full border border-[#0693e3]/20 animate-[spin_60s_linear_infinite]" />

        {/* Dashed radar gauge ring */}
        <div className="absolute w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-[#00e5ff]/25 animate-[spin_35s_linear_infinite_reverse]" />

        {/* 4 Cardinal tick marks */}
        <div className="absolute w-[360px] h-[360px] sm:w-[400px] sm:h-[400px] flex items-center justify-between pointer-events-none text-[9px] font-mono text-[#00e5ff]/50 px-2">
          <span>270°</span>
          <span>090°</span>
        </div>
        <div className="absolute w-[360px] h-[360px] sm:w-[400px] sm:h-[400px] flex flex-col items-center justify-between pointer-events-none text-[9px] font-mono text-[#00e5ff]/50 py-2">
          <span>000°</span>
          <span>180°</span>
        </div>

        {/* High-speed radar beam sweep */}
        <div className="absolute w-[310px] h-[310px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00e5ff]/10 to-[#0693e3]/40 origin-bottom-right animate-[spin_5s_linear_infinite]" />
        </div>

        {/* Expanding Shockwaves when user clicks */}
        {shockwaves.map((sw) => (
          <div
            key={sw.id}
            onAnimationEnd={() => setShockwaves((prev) => prev.filter((item) => item.id !== sw.id))}
            className="absolute rounded-full border-2 border-[#00e5ff] animate-[ping_1s_cubic-bezier(0,0,0.2,1)_forwards] pointer-events-none"
            style={{ width: '180px', height: '180px' }}
          />
        ))}
      </div>

      {/* 2. Interactive 3D Holographic Glass Card with Specular Reflection */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={triggerPulse}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative z-10 w-[300px] sm:w-[340px] h-[380px] sm:h-[400px] rounded-3xl bg-gradient-to-b from-[#0e1626]/90 via-[#0a101d]/95 to-[#060a12]/95 border border-[#00e5ff]/40 shadow-[0_0_50px_rgba(6,147,227,0.35)] backdrop-blur-2xl p-6 flex flex-col justify-between cursor-pointer group overflow-hidden"
      >
        {/* Dynamic cursor-following specular sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-75"
          style={{
            background: `radial-gradient(circle 220px at ${glowPos.x}% ${glowPos.y}%, rgba(0, 229, 255, 0.22), transparent 70%)`,
          }}
        />

        {/* Ambient Sensor Grid on Card */}
        <div className="absolute inset-0 sensor-grid opacity-20 pointer-events-none" />

        {/* Canvas for Laser Scanline & Micro Event Particle Stream */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Top Header & Tactical Reticles */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#1f2d45]/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00e5ff]" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00e5ff]">
              SENSOR ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            <Radio className="w-3 h-3 text-[#00d084] animate-pulse" />
            <span>&gt;10K FPS</span>
          </div>
        </div>

        {/* Center: Holographic Silicon Sensor Die with Iridescent Glass Glow */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          {/* Outer glowing silicon chip socket */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-[#121c2e] via-[#091120] to-[#162238] border-2 border-[#00e5ff]/50 p-3 shadow-[0_0_30px_rgba(0,229,255,0.35)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {/* Corner alignment marks */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#00e5ff]" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#00e5ff]" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#00e5ff]" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#00e5ff]" />

            {/* High-Resolution Silicon Chip Graphic */}
            <img
              src="https://www.prophesee.ai/wp-content/uploads/2024/05/Home_Page_Icons_Images__GenX320.png"
              alt="Prophesee GenX320 Neuromorphic Sensor"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-transform duration-300"
              onError={(e) => {
                e.target.style.opacity = '0.9';
              }}
            />

            {/* Micro iridescent rainbow diffraction layer on top of chip */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-tr from-transparent via-[#00e5ff]/15 to-[#fcb900]/10 mix-blend-overlay pointer-events-none" />

            {/* Click instruction tooltip */}
            <div className="absolute -bottom-2 bg-[#0693e3] text-[9px] font-mono text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Click to Fire Pulse
            </div>
          </div>

          {/* Core Labels */}
          <div className="mt-3 text-center">
            <div className="text-xs sm:text-sm font-extrabold font-mono text-white tracking-[0.2em] flex items-center justify-center gap-1.5">
              <span>METAVISION® CORE</span>
            </div>
            <div className="text-[10px] font-mono text-[#00e5ff] tracking-widest uppercase mt-0.5">
              GENX320 SILICON DIE
            </div>
          </div>
        </div>

        {/* Bottom: Live Telemetry & Polarity Events */}
        <div className="relative z-10 border-t border-[#1f2d45]/80 pt-3 space-y-2">
          {/* Live fluctuating event rate */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">EVENT FLOW RATE:</span>
            <span className={`font-bold transition-colors duration-200 ${pulseActive ? 'text-[#fcb900]' : 'text-[#00e5ff]'}`}>
              {eventRate.toLocaleString()} ev/s
            </span>
          </div>

          {/* Polarity indicators (+ON / -OFF) */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0693e3] animate-ping" />
              <span className="text-[#0693e3] font-bold">+ON</span>
              <span>Light Increase</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
              <span className="text-[#00e5ff] font-bold">-OFF</span>
              <span>Decrease</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Temporal Latency Badge */}
      <div className="absolute -bottom-6 right-2 sm:right-6 z-20 glass-panel px-3.5 py-2 rounded-xl border border-[#00e5ff]/40 shadow-2xl flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00d084] animate-pulse" />
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">Temporal Precision</div>
          <div className="text-xs sm:text-sm font-bold font-mono text-[#00e5ff]">&lt; 10 µs Asynchronous</div>
        </div>
      </div>
    </div>
  );
}

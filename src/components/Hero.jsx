import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef(null);
  // Animated counters state
  const [counts, setCounts] = useState({ classes: 0, horizon: '0.0', fps: 0 });

  useEffect(() => {
    // Ensure video plays reliably and smoothly
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out cubic
      const factor = 1 - Math.pow(1 - progress, 3);

      setCounts({
        classes: Math.round(14 * factor),
        horizon: (5.0 * factor).toFixed(1),
        fps: (29.97 * factor).toFixed(1),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts({ classes: 14, horizon: '5.0', fps: '29.97' });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#080c14] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* 1. Background Video - Crisp and clearly visible matching original prophesee.ai */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90 sm:opacity-95 filter brightness-105 contrast-105 transition-opacity duration-700"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video-fast.mp4" type="video/mp4" />
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Soft Vignette on the left so typography is razor-sharp while video remains fully visible */}
        <div className="absolute top-0 bottom-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#080c14]/80 via-[#080c14]/40 to-transparent pointer-events-none" />

        {/* Smooth bottom transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080c14] via-[#080c14]/60 to-transparent pointer-events-none" />

        {/* Subtle high-tech sensor grid */}
        <div className="absolute inset-0 sensor-grid opacity-15 pointer-events-none" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 flex flex-col items-start space-y-8">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0693e3]/15 border border-[#0693e3]/40 text-[#00e5ff] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            WIUT HACKATHON 2026 • COMPUTER VISION TRACK
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            AI TRAFFIC VISION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#93c5fd] to-[#0693e3]">
              &amp; ACCIDENT PREDICTION
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
            Autonomous road traffic event monitoring and early accident anticipation system developed by team <strong className="text-white font-medium">Antigradient</strong>. Detects 14 spatio-temporal incident classes and forecasts accident risks within a 5-second horizon from a fixed CCTV viewpoint.
          </p>

          {/* Live Metrics / Counters */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-4 pb-2 border-t border-b border-[#1f2d45]/80 w-full max-w-xl">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {counts.classes}
              </span>
              <span className="text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wider font-semibold mt-1">
                Event Classes
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {counts.horizon}s
              </span>
              <span className="text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wider font-semibold mt-1">
                Anticipation (H=5s)
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {counts.fps} FPS
              </span>
              <span className="text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wider font-semibold mt-1">
                Real-Time Stream
              </span>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#technology"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#0693e3] hover:bg-[#0582ca] text-white font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-xl shadow-[#0693e3]/25 hover:shadow-[#0693e3]/40 hover:scale-[1.02]"
            >
              <span>EXPLORE LIVE DEMO</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>

            <a
              href="#platform"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#121a2a]/80 hover:bg-[#182236] text-gray-200 font-semibold text-sm tracking-wider uppercase border border-[#1f2d45] hover:border-[#0693e3]/50 transition"
            >
              <span>SOLUTION PIPELINE</span>
            </a>
          </div>
        </div>

        {/* 3. Tactical CCTV Live HUD Overlay on Desktop */}
        <div className="hidden lg:flex lg:col-span-5 flex-col">
          <div className="relative rounded-3xl bg-[#080c14]/85 border border-[#1f2d45] backdrop-blur-xl p-6 shadow-2xl shadow-black/80 overflow-hidden group hover:border-[#00e5ff]/50 transition-all duration-300">
            {/* Corner Crosshair Reticles */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00e5ff]/60" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00e5ff]/60" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00e5ff]/60" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00e5ff]/60" />

            {/* Top HUD Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#1f2d45]/80 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  LIVE CCTV TELEMETRY
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121a2a] text-[#00e5ff] border border-[#1f2d45]">
                CAM 04 • TASHKENT
              </span>
            </div>

            {/* Camera Spec Strip */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-[#0c121e] border border-[#1f2d45]/60 flex flex-col">
                <span className="text-gray-400 text-[9px] uppercase tracking-wider">Stream &amp; Sensor</span>
                <span className="text-white font-bold mt-0.5">3840×2160 @ 29.97 FPS</span>
                <span className="text-[#00e5ff] text-[10px]">140.2 Mbps • H.264 4:2:2</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0c121e] border border-[#1f2d45]/60 flex flex-col">
                <span className="text-gray-400 text-[9px] uppercase tracking-wider">Decode Target</span>
                <span className="text-white font-bold mt-0.5">Tesla T4 Offline</span>
                <span className="text-emerald-400 text-[10px]">CPU NONREF (IBBP GOP)</span>
              </div>
            </div>

            {/* Active Traffic Phase Meter (75s cycle) */}
            <div className="p-3 rounded-2xl bg-[#0c121e] border border-[#1f2d45]/80 mb-4">
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <span className="text-gray-300 font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Signal Cycle: 75.0s Daytime
                </span>
                <span className="text-emerald-400 font-extrabold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  GREEN ACTIVE (36.0s)
                </span>
              </div>

              {/* Segmented Phase Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[#121a2a] overflow-hidden flex gap-0.5 p-0.5">
                <div className="h-full bg-emerald-400 rounded-l-full animate-pulse" style={{ width: '48%' }} title="Green: 36.0s (48%)" />
                <div className="h-full bg-amber-400" style={{ width: '4%' }} title="Yellow: 3.0s (4%)" />
                <div className="h-full bg-rose-500/70 rounded-r-full" style={{ width: '48%' }} title="Red: 36.0s (48%)" />
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-gray-400 mt-1.5">
                <span className="text-emerald-400">Green: 36.0s</span>
                <span className="text-amber-400">Yellow: 3.0s</span>
                <span className="text-rose-400">Red: 36.0s</span>
              </div>
            </div>

            {/* Dynamic Telemetry Metrics */}
            <div className="space-y-2 mb-4 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c121e]/60 border border-[#1f2d45]/50">
                <span className="text-gray-400 text-[11px]">SIFT+RANSAC Registration:</span>
                <span className="text-[#00e5ff] font-bold text-[11px]">LOCKED (Δx=-74px, Δy=+42px)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c121e]/60 border border-[#1f2d45]/50">
                <span className="text-gray-400 text-[11px]">Active Spatial Tracklets:</span>
                <span className="text-white font-bold text-[11px]">
                  <strong className="text-[#00e5ff]">34</strong> Vehicles &bull; <strong className="text-amber-400">18</strong> Pedestrians
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#0c121e]/60 border border-[#1f2d45]/50">
                <span className="text-gray-400 text-[11px]">Part B Causal Horizon:</span>
                <span className="text-emerald-400 font-bold text-[11px]">H = 5.0s [R(t) = 0.18 &lt; τ=0.50]</span>
              </div>
            </div>

            {/* Quick Status Footer */}
            <div className="pt-3 border-t border-[#1f2d45]/80 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                AUTONOMOUS EDGE NODE
              </span>
              <span className="text-[#00e5ff]">ZERO LOOKAHEAD ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-gray-400 text-xs">
        <span className="uppercase tracking-widest text-[10px] mb-1">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-gray-500/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#00e5ff] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

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
        fps: Math.round(25 * factor),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts({ classes: 14, horizon: '5.0', fps: 25 });
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
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl flex flex-col items-start space-y-8">
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

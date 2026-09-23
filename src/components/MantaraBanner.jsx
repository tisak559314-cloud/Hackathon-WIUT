import React from 'react';
import { ShieldAlert, Crosshair, Radar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MantaraBanner() {
  return (
    <section id="mantara" className="relative py-20 bg-[#080c14] overflow-hidden">
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 sensor-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0693e3]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#121a2a] via-[#0e1624] to-[#0a0f18] border border-[#1f2d45] overflow-hidden shadow-2xl p-8 lg:p-14 relative">
          {/* Tactical Crosshair Watermark */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none text-white">
            <Crosshair className="w-full h-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest">
                <Radar className="w-3.5 h-3.5 animate-spin" />
                PART B: BONUS TRACK • ACCIDENT ANTICIPATION
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                When every second counts, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-[#fcb900]">
                  anticipation saves lives.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Our causal <strong className="text-white font-semibold">RiskEstimator</strong> continuously monitors video frames to estimate the probability that an accident will occur within the next 5 seconds (<span className="text-[#00e5ff] font-mono">H = 5s</span>), raising high-confidence alarms well before physical impact.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0" />
                  <span>5-second anticipation horizon (H = 5s)</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0" />
                  <span>Causal frame streaming: step(frame, t_sec)</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0" />
                  <span>Zero future frame lookahead</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0" />
                  <span>Scored via chance-normalized AP, F1 & mTTA</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#platform"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#0693e3] to-[#2ea3f2] hover:from-[#0582ca] hover:to-[#1e8fd9] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#0693e3]/20"
                >
                  <span>DISCOVER PIPELINE</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#applications"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#182236] hover:bg-[#1f2d45] text-gray-200 font-semibold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
                >
                  <span>EXPLORE 14 CLASSES</span>
                </a>
              </div>
            </div>

            {/* Right Visual: Tactical Sensor Display */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-[#1f2d45] bg-[#070b12] shadow-2xl relative">
                {/* Visual Header */}
                <div className="px-4 py-3 bg-[#101724] border-b border-[#1f2d45] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#00e5ff]">
                    <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
                    <span>CAUSAL RISK ESTIMATOR HUD</span>
                  </div>
                  <span className="text-gray-400">HORIZON: H = 5.0s | &theta; = 0.5</span>
                </div>

                {/* Drone Visual Preview */}
                <div className="relative aspect-[16/10] bg-[#070d18] overflow-hidden flex items-center justify-center">
                  <img
                    src="/cctv-traffic-detection.jpg"
                    alt="WIUT CCTV Traffic Event Detection"
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  
                  {/* Tactical HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="border-t-2 border-l-2 border-[#00e5ff] w-6 h-6" />
                      <div className="border-t-2 border-r-2 border-[#00e5ff] w-6 h-6" />
                    </div>



                    <div className="flex justify-between items-end">
                      <div className="border-b-2 border-l-2 border-[#00e5ff] w-6 h-6" />
                      <div className="border-b-2 border-r-2 border-[#00e5ff] w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* HUD Footer Status */}
                <div className="px-4 py-2.5 bg-[#0a0f18] border-t border-[#1f2d45] flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>SYSTEM: <span className="text-[#00d084]">STREAMING</span></span>
                  <span>HORIZON: <span className="text-[#00e5ff]">5.0s</span></span>
                  <span>ALARM: <span className="text-red-400">ACTIVE</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

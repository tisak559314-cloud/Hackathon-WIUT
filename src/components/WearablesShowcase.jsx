import React from 'react';
import { BatteryCharging, Gauge, Users, Eye, ArrowRight } from 'lucide-react';

export default function WearablesShowcase() {
  return (
    <section id="wearables" className="py-24 bg-[#0c121e] relative border-t border-[#1f2d45] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Media Asset */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#121a2a] via-[#090f1a] to-[#121a2a] border border-[#1f2d45] p-8 shadow-2xl">
              {/* Product render */}
              <div className="relative flex items-center justify-center py-6">
                <img
                  src="https://downloads.prophesee.ai/website/2024/10/MicroMotion.png"
                  alt="Metavision Ultra Low Power Eye-Tracking"
                  className="w-full max-w-md object-contain drop-shadow-[0_15px_35px_rgba(0,229,255,0.2)] filter contrast-110"
                  onError={(e) => {
                    e.target.style.opacity = '0.7';
                  }}
                />
              </div>

              {/* Floating Performance Badges */}
              <div className="absolute top-6 left-6 glass-panel px-3.5 py-2 rounded-xl border border-[#00e5ff]/30 shadow-lg flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#00e5ff]" />
                <span className="text-xs font-mono font-bold text-white">&gt; 1,000 Hz Sampling</span>
              </div>

              <div className="absolute bottom-6 right-6 glass-panel px-3.5 py-2 rounded-xl border border-[#00d084]/30 shadow-lg flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-[#00d084]" />
                <span className="text-xs font-mono font-bold text-white">Down to 2 mW Power</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182236]/90 backdrop-blur-md border border-[#2a3a56] text-xs font-semibold uppercase tracking-widest text-[#00e5ff] shadow-lg">
              <Eye className="w-4 h-4 text-[#00e5ff]" />
              Ultra-Low Power Human Interface
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              World’s fastest & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#38bdf8] to-[#0693e3]">
                lowest-energy eye-tracking.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              Prophesee enables seamless, natural interactions in AR, VR, and Smart Glasses by capturing dynamic eye motion at unprecedented temporal frequencies while consuming negligible battery power.
            </p>

            {/* Metric Comparison Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#121a2a] border border-[#1f2d45]">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#00e5ff]">&gt;1,000 Hz</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-300 mt-1">Continuous Tracking</div>
                <p className="text-[11px] text-gray-400 mt-1">Captures rapid saccadic movements and micro-motions effortlessly</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121a2a] border border-[#1f2d45]">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#00d084]">Down to 2 mW</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-300 mt-1">Total System Power</div>
                <p className="text-[11px] text-gray-400 mt-1">Operates continuously without draining wearable batteries</p>
              </div>
            </div>

            {/* Community Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#121a2a] to-[#182236] border border-[#1f2d45] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0693e3]/20 flex items-center justify-center text-[#00e5ff]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Join 20,000+ Prophesee community members</div>
                  <div className="text-[11px] text-gray-400">Building the future of machine vision algorithms</div>
                </div>
              </div>
              <a
                href="https://github.com/prophesee-ai"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#00e5ff] hover:underline"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

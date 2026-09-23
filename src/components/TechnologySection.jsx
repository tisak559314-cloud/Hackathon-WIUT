import React from 'react';
import EventVisionSimulator from './EventVisionSimulator';
import { Zap, Sun, Database, Battery } from 'lucide-react';

export default function TechnologySection() {
  const techPillars = [
    {
      icon: Zap,
      title: 'The Hyper-Fast & Fleeting',
      metric: '> 10,000 FPS Equiv.',
      description: 'Temporal resolution in the microsecond range reveals transient phenomena that traditional 30-120fps cameras miss completely.',
    },
    {
      icon: Sun,
      title: 'Extreme Dynamic Range',
      metric: '> 120 dB',
      description: 'Operates in direct sunlight, severe headlights, and pitch darkness simultaneously without pixel saturation or underexposure.',
    },
    {
      icon: Database,
      title: 'Data Sparsity & Efficiency',
      metric: '10x to 1000x Less Data',
      description: 'Transmits only changes in scene brightness, eliminating static background redundancy and cutting network and compute workloads.',
    },
    {
      icon: Battery,
      title: 'Ultra-Low Power Operation',
      metric: 'Down to 2 mW',
      description: 'Ideal for always-on battery-powered edge devices, smart glasses, robotics, and aerospace avionics.',
    },
  ];

  return (
    <section id="technology" className="py-24 bg-[#0c121e] relative border-t border-[#1f2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
            Neuromorphic Engineering
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Beyond vision, METAVISION.
          </h2>
          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Thanks to our neuromorphic engineering revolution that allows machines to see like humans, we reveal what was invisible until now:
          </p>
        </div>

        {/* 4 Performance Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techPillars.map((tp, idx) => {
            const Icon = tp.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121a2a] border border-[#1f2d45] hover:border-[#00e5ff]/50 transition duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#0693e3]/10 border border-[#0693e3]/30 flex items-center justify-center text-[#00e5ff] mb-4 group-hover:scale-110 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{tp.title}</h3>
                  <div className="text-sm font-mono font-bold text-[#00e5ff] mb-3">{tp.metric}</div>
                  <p className="text-xs text-gray-400 leading-relaxed">{tp.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive Event Vision Simulator */}
        <EventVisionSimulator />

        {/* Deep Dive Visuals Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="rounded-2xl overflow-hidden bg-[#121a2a] border border-[#1f2d45] p-6 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded bg-[#0693e3]/15 text-[#00e5ff] text-xs font-mono uppercase tracking-wider mb-4">
                Sensing Paradigm
              </div>
              <h4 className="text-xl font-bold text-white mb-2">How Metavision Works</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Each pixel is fully autonomous. When local illuminance changes past a dynamic threshold, the pixel independently emits an asynchronous event with accurate $(x, y, t, p)$ coordinates. No synchronous shutter clock, no frame blur.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-[16/9] bg-black/40 border border-white/10">
              <img
                src="https://www.prophesee.ai/wp-content/uploads/2018/02/PROPHESEE-METAVISION.jpg"
                alt="Prophesee Metavision Sensing Paradigm"
                className="w-full h-full object-cover filter contrast-110"
                onError={(e) => {
                  e.target.style.opacity = '0.7';
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-[#121a2a] border border-[#1f2d45] p-6 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded bg-[#00d084]/15 text-[#00d084] text-xs font-mono uppercase tracking-wider mb-4">
                AI & Machine Intelligence
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Built for Spiking Neural Networks (SNN)</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Because events are inherently sparse and asynchronous, they feed naturally into neuromorphic computing chips and Spiking Neural Networks, achieving biological-level efficiency with near-zero latency.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-[16/9] bg-black/40 border border-white/10">
              <img
                src="https://www.prophesee.ai/wp-content/uploads/2018/02/PROPHESEE-Machine-Intelligence.jpg"
                alt="Prophesee Machine Intelligence and SNN"
                className="w-full h-full object-cover filter contrast-110"
                onError={(e) => {
                  e.target.style.opacity = '0.7';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

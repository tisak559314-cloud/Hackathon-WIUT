import React, { useState } from 'react';
import {
  AlertTriangle,
  TrafficCone,
  GitFork,
  Footprints,
  ShieldAlert,
  Cpu,
  Check,
  ArrowRight,
  Code,
  Flame,
  AlertOctagon,
  Car,
  Activity,
  Sparkles,
  Copy,
  CheckCheck,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';
import { OFFICIAL_14_CLASSES } from '../data/samplesConfig';

const CATEGORIES = [
  { id: 'all', label: 'All 14 Classes', icon: SlidersHorizontal, count: 14 },
  { id: 'collisions', label: 'Collisions & Kinetic', icon: AlertTriangle, count: 2, color: 'text-rose-400' },
  { id: 'signals', label: 'Signals & Queuing', icon: TrafficCone, count: 4, color: 'text-amber-400' },
  { id: 'maneuvers', label: 'Maneuvers & Markings', icon: GitFork, count: 4, color: 'text-[#00e5ff]' },
  { id: 'hazards', label: 'Pedestrians & Hazards', icon: Footprints, count: 4, color: 'text-emerald-400' },
];

export default function ApplicationsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedClassId, setSelectedClassId] = useState('failure_to_yield');
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredClasses = OFFICIAL_14_CLASSES.filter(
    (c) => activeCategory === 'all' || c.category === activeCategory
  );

  const currentClass =
    OFFICIAL_14_CLASSES.find((c) => c.id === selectedClassId) || OFFICIAL_14_CLASSES[0];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getCategoryBadgeColor = (cat) => {
    switch (cat) {
      case 'collisions':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'signals':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'maneuvers':
        return 'text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/30';
      case 'hazards':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <section id="applications" className="py-24 bg-[#0c121e] relative border-t border-[#1f2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121a2a] border border-[#1f2d45] text-xs font-semibold uppercase tracking-widest text-[#00e5ff] shadow-lg mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
            PART A &amp; PART B • OFFICIAL WIUT RUBRIC TAXONOMY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            14 OFFICIAL EVENT CLASSES
          </h2>
          <div className="w-16 h-1 bg-[#0693e3] mt-4 rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl mt-4 leading-relaxed">
            Click any official rubric class below to inspect its exact causal trigger logic, start/end conditions, mathematical ground truth rule, and empirical performance on the benchmark.
          </p>
        </div>

        {/* Category Domain Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-[#00e5ff] border-[#00e5ff] text-[#080c14] shadow-lg shadow-[#00e5ff]/20 font-black'
                    : 'bg-[#121a2a] border-[#1f2d45] text-gray-300 hover:text-white hover:bg-[#182236]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#080c14]' : cat.color || 'text-gray-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#080c14]/20 text-[#080c14]' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 14 Classes Interactive Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-10">
          {filteredClasses.map((item) => {
            const isSelected = item.id === selectedClassId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedClassId(item.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#182236] border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.25)] ring-1 ring-[#00e5ff]'
                    : 'bg-[#121a2a]/80 border-[#1f2d45] hover:border-gray-500 hover:bg-[#141e30]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.category === 'collisions'
                        ? 'bg-rose-400'
                        : item.category === 'signals'
                        ? 'bg-amber-400'
                        : item.category === 'maneuvers'
                        ? 'bg-[#00e5ff]'
                        : 'bg-emerald-400'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-gray-400 truncate max-w-[70px]">
                    {item.metricF1.startsWith('0.') ? `F1: ${item.metricF1.slice(0, 5)}` : 'GT Rule'}
                  </span>
                </div>
                <div
                  className={`text-xs font-mono font-bold truncate ${
                    isSelected ? 'text-[#00e5ff]' : 'text-white'
                  }`}
                  title={item.label}
                >
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Class Deep-Dive Showcase Card */}
        <div className="rounded-3xl bg-[#121a2a] border border-[#1f2d45] overflow-hidden shadow-2xl p-6 sm:p-10 transition-all duration-300">
          {/* Card Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f2d45] mb-8">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border font-mono ${getCategoryBadgeColor(
                    currentClass.category
                  )}`}
                >
                  {currentClass.category.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300">
                  {currentClass.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  {currentClass.status}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3 pt-2">
                <span className="font-mono text-[#00e5ff]">#{currentClass.label}</span>
                <span className="text-gray-400 font-normal text-lg sm:text-xl hidden sm:inline">
                  • {currentClass.name}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                {currentClass.name_ru} &bull; {currentClass.description}
              </p>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Benchmark Metric (Dev Score A)
              </span>
              <span className="text-2xl font-mono font-black text-[#00e5ff]">
                {currentClass.metricF1}
              </span>
              <span className="text-[10px] font-mono text-gray-400">tIoU Thresholds: {currentClass.tiou}</span>
            </div>
          </div>

          {/* Card Main Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Causal Logic & Ground Rules */}
            <div className="lg:col-span-6 space-y-6">
              {/* Trigger Boundaries */}
              <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <Activity className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>Temporal Boundary Formulation (start_sec &bull; end_sec)</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      [t_start]
                    </span>
                    <span className="text-xs text-gray-200 leading-relaxed">
                      {currentClass.startCondition}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      [t_end]
                    </span>
                    <span className="text-xs text-gray-200 leading-relaxed">
                      {currentClass.endCondition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mathematical Ground Rule */}
              <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-gray-400">
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#0693e3]" />
                    <span>Mathematical Ground Truth Rule</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">Camera-Calibrated</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121a2a] border border-[#2a3a56] font-mono text-xs sm:text-sm text-[#00e5ff] overflow-x-auto whitespace-nowrap">
                  <code>{currentClass.mathFormula}</code>
                </div>
              </div>

              {/* Pipeline Engine Tag */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                <Cpu className="w-4 h-4 text-[#00e5ff] shrink-0" />
                <span>
                  <strong className="text-white font-mono">Edge Engine Module: </strong>
                  {currentClass.pipelineModule}
                </span>
              </div>
            </div>

            {/* Right Column: Python Code & Interactive Rule Snippet */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl bg-[#080c14] border border-[#1f2d45] overflow-hidden shadow-xl">
                {/* Code Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1726] border-b border-[#1f2d45] text-xs font-mono">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Code className="w-4 h-4 text-[#00e5ff]" />
                    <span className="font-bold text-white">causal_rules/{currentClass.id}.py</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(currentClass.pythonSnippet)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer text-[11px]"
                  >
                    {copiedCode ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Rule</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-4 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto">
                  <pre className="text-emerald-300 whitespace-pre">
                    {currentClass.pythonSnippet}
                  </pre>
                </div>
              </div>

              {/* Bottom Quick Jump Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#080c14]/60 border border-[#1f2d45]">
                <div className="text-xs text-gray-400">
                  <span>Want to see this rule running live on the Tashkent benchmark clips?</span>
                </div>
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00e5ff] hover:bg-[#00c8e0] text-[#080c14] font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer font-mono"
                >
                  <span>Scrub in Player</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

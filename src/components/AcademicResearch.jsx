import React, { useState } from 'react';
import { Search, Database, Layers, SunMedium, AlertTriangle, Clock, Compass, ShieldCheck, Check } from 'lucide-react';

export default function AcademicResearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All Findings');

  const tags = [
    'All Findings',
    'Class Distribution',
    'camera.md Calibration',
    'Environmental Noise',
    'Occlusion & Density',
    'Temporal Ambiguity',
  ];

  const edaFindings = [
    {
      title: 'Severe Long-Tail Imbalance & Event Scarcity',
      category: '14 Classes • Distribution',
      metric: '~74% Stationary vs <3% Accidents',
      tag: 'Class Distribution',
      description:
        'Common stationary states (stopped_vehicle, congestion) account for ~74% of candidate windows, whereas safety-critical kinetic events (accident, near_miss, fire_smoke) appear in <3% of frames. Requires class-weighted loss and focal temporal penalties.',
      takeaway: 'Mitigation: Focal temporal classification loss & balanced sampling',
    },
    {
      title: 'camera.md Spatial Calibration & Ground-Plane Geometry',
      category: 'camera.md • Perspective Geometry',
      metric: 'Sub-meter Polygon Precision',
      tag: 'camera.md Calibration',
      description:
        'Each camera provides calibrated stop-line vectors, lane direction polygons, solid lines, and crosswalks. Road users are mapped using their bounding box ground-contact point (x_mid, y_max) to prevent perspective-induced false positives.',
      takeaway: 'Mitigation: Bottom-center bbox anchor (x_mid, y_max) polygon testing',
    },
    {
      title: 'Extreme Lighting: Direct Glare, Dusk & Night Headlights',
      category: 'Sensor Robustness • Environmental',
      metric: 'Zero Pixel Saturation Drift',
      tag: 'Environmental Noise',
      description:
        'Low-light nocturnal footage introduces sensor grain and headlight flare, while sunset angles produce blinding forward glare. Adaptive local contrast equalization and dynamic detector confidence thresholds preserve high recall.',
      takeaway: 'Mitigation: Adaptive CLAHE & low-confidence association thresholding',
    },
    {
      title: 'Heavy Vehicle Occlusion in Dense Queue Flow',
      category: 'ByteTrack • Occlusion Handling',
      metric: '3-5s Blind Tracklet Continuity',
      tag: 'Occlusion & Density',
      description:
        'Tall transit buses and commercial trucks frequently obscure smaller passenger sedans and pedestrians for 3–5 seconds. ByteTrack secondary association with Kalman motion vector forecasting preserves persistent track identities.',
      takeaway: 'Mitigation: Kalman velocity extrapolation across temporary blind windows',
    },
    {
      title: 'Temporal Boundary Ambiguity & Disjoint Enforcing',
      category: 'Part A • Temporal IoU Metrics',
      metric: 'τ ∈ {0.3, 0.5, 0.7} Greedy Match',
      tag: 'Temporal Ambiguity',
      description:
        'While accidents possess a sharp contact frame, complex maneuvers (wrong_way, illegal_turn) unfold across 15–40 frames. Post-processing merges adjacent candidate intervals and guarantees zero overlapping same-class intervals per guidelines.',
      takeaway: 'Mitigation: Disjoint non-maximum suppression on 1D temporal intervals',
    },
    {
      title: 'Part B Causal Horizon & Deceleration Trajectory Dynamics',
      category: 'Part B • Accident Anticipation',
      metric: '5.0s Horizon • Zero Lookahead',
      tag: 'camera.md Calibration',
      description:
        'Pre-accident windows exhibit distinct kinetic precursors: rapidly collapsing Time-to-Collision (TTC < 2.0s), converging vehicle trajectories, and sharp longitudinal deceleration prior to impact, evaluated strictly via online causal step().',
      takeaway: 'Mitigation: Online kinematic feature vector into causal RiskEstimator',
    },
  ];

  const benchmarkSpecs = [
    { label: '25 FPS CCTV Stream', value: 'Real-Time Frame Rate' },
    { label: 'NVIDIA Tesla T4', value: '16 GB VRAM Benchmark' },
    { label: 'Batch Size = 1', value: 'Sequential Frame-by-Frame' },
    { label: 'Weights Limit < 5 GB', value: 'Offline Self-Contained' },
    { label: 'Strict Offline Mode', value: 'Zero Network Lookups' },
    { label: '14 Event Classes', value: 'Part A Spatio-Temporal' },
    { label: 'IoU τ ∈ {0.3, 0.5, 0.7}', value: 'Bipartite Matching' },
    { label: 'H = 5.0s Horizon', value: 'Part B Anticipation' },
    { label: 'camera.md Polygons', value: 'Calibrated Road Geometry' },
    { label: 'Deterministic Seeding', value: 'Reproducible Scoring' },
  ];

  const filteredFindings = edaFindings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All Findings' || item.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <section id="academic" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121a2a] border border-[#1f2d45] text-xs font-semibold uppercase tracking-widest text-[#00e5ff]">
            <Database className="w-4 h-4 text-[#00e5ff]" />
            Exploratory Data Analysis • Dataset & Calibration
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight max-w-4xl leading-tight">
            CCTV STREAM EDA & SPATIAL CALIBRATION ANALYSIS
          </h2>

          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />

          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Rigorous analysis of 25 FPS multi-camera road video streams, geometric calibration parameters from{' '}
            <code className="px-1.5 py-0.5 rounded bg-[#182236] border border-[#2a3a56] text-[#00e5ff] font-mono text-xs">
              camera.md
            </code>
            , extreme class imbalance, and real-world traffic occlusion patterns.
          </p>
        </div>

        {/* EDA Search & Filters */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="relative rounded-2xl bg-[#0c121e] border border-[#1f2d45] p-2 shadow-2xl flex items-center">
            <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search findings (e.g. stop-line, accident, Kalman, glare, IoU, TTC)..."
              className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-gray-400 hover:text-white mr-3 px-2 py-1 bg-white/5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Topic Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedTag === tag
                    ? 'bg-[#0693e3] text-white shadow-md shadow-[#0693e3]/20 scale-[1.02]'
                    : 'bg-[#121a2a] text-gray-400 hover:text-gray-200 border border-[#1f2d45]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* EDA Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredFindings.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#121a2a] border border-[#1f2d45] hover:border-[#0693e3]/50 transition-all flex flex-col justify-between group shadow-xl hover:shadow-[#0693e3]/10"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#00e5ff] mb-3">
                  <span className="truncate max-w-[200px]">{item.category}</span>
                  <span className="text-gray-400 shrink-0 text-[11px] font-bold px-2 py-0.5 rounded bg-black/40 border border-white/5">
                    {item.metric}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-[#00e5ff] transition leading-snug mb-3">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f2d45] flex items-start gap-2 text-xs">
                <Check className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-mono text-[11px] leading-tight">
                  {item.takeaway}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Evaluation Dataset Specs & Benchmark Environment Marquee */}
        <div className="relative pt-8 border-t border-[#1f2d45]">
          <div className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-8">
            Evaluation Specs & Offline Benchmark Environment • NVIDIA T4
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap py-2">
              {[...benchmarkSpecs, ...benchmarkSpecs, ...benchmarkSpecs].map((spec, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#121a2a] border border-[#1f2d45] hover:border-[#00e5ff]/50 transition shrink-0 group shadow-md"
                >
                  <div className="w-2 h-2 rounded-full bg-[#00e5ff] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold font-mono text-white">
                    {spec.label}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    [{spec.value}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

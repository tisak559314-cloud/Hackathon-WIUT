import React, { useEffect, useRef, useState } from 'react';
import {
  Cpu,
  Camera,
  Code2,
  Wrench,
  ArrowRight,
  Check,
  Layers,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
} from 'lucide-react';

export default function PlatformStack() {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'matrix' | 'both'

  // Hash-based tab deep linking (e.g. clicking #matrix in Navbar)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#matrix') {
        setActiveTab('matrix');
      } else if (hash === '#pipeline') {
        setActiveTab('pipeline');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const stages = [
    {
      num: '01',
      title: 'Selective GOP Video Decoding',
      layer: 'Layer 01 • Decoding & Ingestion',
      icon: Camera,
      headline: 'PyAV NONREF Decoding @ 10 FPS on CPU',
      description:
        'Raw CCTV footage is encoded in 4K H.264 High 4:2:2 10-bit @ 29.97 FPS (~140 Mbit/s). Since Tesla T4 NVDEC does not support 4:2:2 10-bit hardware decode, PyAV selectively decodes reference frames of the GOP IBBP structure (~10 FPS), cutting compute cost by 2×.',
      metrics: '0.70× clip time vs 1.41× cv2.read',
      tags: ['CPU PyAV', 'GOP IBBP', 'NONREF Flag', '4K 4:2:2 10-bit'],
    },
    {
      num: '02',
      title: 'NMS-Free Road User Detection',
      layer: 'Layer 02 • Neural Perception',
      icon: Eye,
      headline: 'YOLO26m @ 1280 px (FP16 TensorRT)',
      description:
        'Localizes vehicles (cars, buses, trucks, taxis) and pedestrians with tight bounding boxes. Downscaling to 1280 px achieves 97.3% agreement with 1920 px resolution while cutting inference time in half, easily fitting within the 5 GB package weight limit.',
      metrics: '1280 px: 0.24× runtime | 97% Person Recall',
      tags: ['YOLO26m', 'NMS-Free', 'TensorRT FP16', '< 5 GB Weights'],
    },
    {
      num: '03',
      title: 'Multi-Object Tracking & Filtering',
      layer: 'Layer 03 • Trajectory Association',
      icon: Cpu,
      headline: 'ByteTrack with Driver-in-Vehicle Occlusion Filter',
      description:
        'Associates detections across consecutive frames into smooth spatiotemporal trajectories using Kalman filtering. A spatial occlusion filter removes drivers/passengers visible through windshields (2.2%–5.6% of detections), preventing false pedestrian alarms.',
      metrics: 'Persistent IDs • Occlusion Filter (2.2%–5.6%)',
      tags: ['ByteTrack', 'Kalman Filter', 'Velocity Vectors', 'Driver Filter'],
    },
    {
      num: '04',
      title: 'Spatial Scene Registration',
      layer: 'Layer 04 • Geometry & Homography',
      icon: Sliders,
      headline: 'SIFT + RANSAC Canonical View Alignment',
      description:
        'Compensates for 50–100 px physical camera sway between morning and evening recordings. Computes affine/homography transform H to warp canonical CVAT geometry (zebras 1–4, stop line 4, island, solid lines) onto the current frame coordinates.',
      metrics: '4,133 Inliers (Day) • 338 Inliers (Dusk)',
      tags: ['SIFT + RANSAC', 'Camera Sway Compensation', 'Ground Projection'],
    },
    {
      num: '05',
      title: 'Traffic Light State Reader',
      layer: 'Layer 05 • Signal Telemetry',
      icon: Clock,
      headline: 'Pixel ROI Lamp Reader (75s Day / 80s Evening)',
      description:
        'Extracts traffic light state by sampling pixel color intensity in traffic heads 7 and 8. Reliably tracks 75.0s daytime cycles (36s green, 3s yellow, 36s red) and 80.0s evening cycles, synchronizing pedestrian and vehicular phases.',
      metrics: 'Deterministic Cycle Tracking (±0.1s accuracy)',
      tags: ['Pixel ROI', 'Phase Sync', '75s / 80s Cycle', 'Stop Line Rules'],
    },
    {
      num: '06',
      title: 'Dual Spatiotemporal Evaluator',
      layer: 'Layer 06 • Rules & Risk Curve',
      icon: Code2,
      headline: 'Part A Rules + Part B Causal Risk Estimator',
      description:
        'Evaluates deterministic rules for 7 active classes (jaywalking, failure_to_yield, stop_line, red_light, etc.) with 1D temporal NMS, and runs a causal online risk function R(t) with oriented box axes and kinematic emergency brake (H=5.0s).',
      metrics: 'Score A: 0.338 / 0.434 • Alarms: 0.6% of duration',
      tags: ['Part A Deterministic', 'Part B H=5.0s', '1D Temporal NMS', 'Zero False Alarms'],
    },
  ];

  const tradeOffMatrix = [
    {
      criterion: 'Latency on Tesla T4',
      endToEnd: '6.2 FPS (SlowFast / Video Swin) — Violates real-time limit',
      modular: '35+ FPS (YOLO26m + ByteTrack) — Real-time compliant (2.6x ratio)',
      advantage: 'Modular 5× Faster',
    },
    {
      criterion: 'Explainability & Timecodes',
      endToEnd: 'Black-box soft attention heatmaps with diffuse start/end boundaries',
      modular: 'Exact [start_sec, end_sec, label] with mathematical rule conditions',
      advantage: '100% Auditable',
    },
    {
      criterion: 'False Alarm Suppression',
      endToEnd: 'Spurious detections caused by asphalt glare, reflections, and shadows',
      modular: 'Strict geometric gates (stop-line polygon, zebra zone, side-change test)',
      advantage: '0.6% Alarm Rate',
    },
    {
      criterion: 'Determinism & Reproducibility',
      endToEnd: 'Non-deterministic GPU batch kernels produce varying risk scores',
      modular: 'Fixed-step reference frame evaluation — Byte-for-byte deterministic',
      advantage: '100% Reproducible',
    },
    {
      criterion: 'Adaptation to Camera Drift',
      endToEnd: 'Requires retraining neural network for every new camera angle',
      modular: 'SIFT + RANSAC registration maps new viewpoints in <100ms offline',
      advantage: 'Zero Retraining',
    },
  ];

  const showPipeline = activeTab === 'pipeline' || activeTab === 'both';
  const showMatrix = activeTab === 'matrix' || activeTab === 'both';

  return (
    <section id="platform" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
            {activeTab === 'pipeline' && 'SYSTEM ARCHITECTURE • WIUT HACKATHON 2026'}
            {activeTab === 'matrix' && 'COMPARATIVE BENCHMARK • SYSTEM EVALUATION'}
            {activeTab === 'both' && 'FULL ARCHITECTURE & MATRIX • COMPLETE SYSTEM'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white transition-all duration-200">
            {activeTab === 'pipeline' && '6-STAGE MODULAR PIPELINE'}
            {activeTab === 'matrix' && 'LEARNED VS MODULAR MATRIX'}
            {activeTab === 'both' && 'PIPELINE & ARCHITECTURAL MATRIX'}
          </h2>
          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            {activeTab === 'pipeline' &&
              'Engineered specifically for the physical constraints of 4K H.264 4:2:2 10-bit CCTV streams, zero-network isolation, and Tesla T4 compute budgets.'}
            {activeTab === 'matrix' &&
              'Direct quantitative evaluation: why a hybrid modular pipeline strictly beats pure end-to-end 3D architectures on Tesla T4 inference speed, auditability, and false alarm suppression.'}
            {activeTab === 'both' &&
              'Comprehensive view of our 6-stage edge processing pipeline alongside the empirical trade-off matrix comparing modular and deep end-to-end paradigms.'}
          </p>

          {/* Switcher: Pipeline Stages vs Architecture Comparison vs View Both */}
          <div className="relative z-20 inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0c121e] border border-[#1f2d45] mt-4 shadow-xl select-none">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('pipeline');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-[#00e5ff] text-[#080c14] font-black shadow-lg shadow-[#00e5ff]/25 scale-[1.02]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Pipeline Stages (01–06)</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('matrix');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-[#00e5ff] text-[#080c14] font-black shadow-lg shadow-[#00e5ff]/25 scale-[1.02]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Learned vs Modular Matrix</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('both');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-[#00e5ff] text-[#080c14] font-black shadow-lg shadow-[#00e5ff]/25 scale-[1.02]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Both</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 6 Pipeline Stages */}
        {showPipeline && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stages.map((st, idx) => {
                const Icon = st.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] hover:border-[#00e5ff]/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-[#00e5ff]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00e5ff]/10 transition-colors" />

                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121a2a] border border-[#1f2d45] text-[11px] font-mono font-semibold text-[#00e5ff]">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{st.layer}</span>
                        </div>
                        <span className="text-xl font-mono font-black text-gray-600 group-hover:text-[#00e5ff] transition-colors">
                          {st.num}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00e5ff] transition-colors">
                        {st.title}
                      </h3>

                      <p className="text-xs font-mono text-[#00e5ff] mb-3">
                        {st.headline}
                      </p>

                      <p className="text-xs text-gray-300 leading-relaxed mb-6">
                        {st.description}
                      </p>
                    </div>

                    <div>
                      {/* Metrics Badge */}
                      <div className="p-2.5 rounded-xl bg-[#121a2a] border border-[#1f2d45] text-xs font-mono text-emerald-400 font-bold mb-4">
                        ⚡ {st.metrics}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {st.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-400 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick jump to Matrix when in pipeline-only view */}
            {activeTab === 'pipeline' && (
              <div className="mt-10 p-5 rounded-2xl bg-[#0c121e] border border-[#1f2d45] flex items-center justify-between flex-wrap gap-4 shadow-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#00e5ff] text-xs font-mono font-bold uppercase tracking-wider">
                    <GitBranch className="w-4 h-4" />
                    <span>Architectural Decision Matrix</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Why avoid pure end-to-end action recognition (SlowFast / Video Swin) on fixed CCTV?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('matrix');
                    const el = document.getElementById('platform');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0693e3] to-[#00e5ff] text-[#080c14] font-mono text-xs font-black uppercase tracking-wider hover:opacity-90 transition flex items-center gap-2 cursor-pointer shadow-lg shadow-[#0693e3]/20"
                >
                  <span>Compare Learned vs Modular Matrix</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Separator if Both are shown */}
        {activeTab === 'both' && (
          <div className="my-14 flex items-center gap-4">
            <div className="h-px bg-[#1f2d45] flex-1" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] px-4 py-1 rounded-full bg-[#0c121e] border border-[#1f2d45]">
              ARCHITECTURAL TRADE-OFF MATRIX
            </span>
            <div className="h-px bg-[#1f2d45] flex-1" />
          </div>
        )}

        {/* Tab 2: Learned vs Rule-Based Comparison Matrix */}
        {showMatrix && (
          <div id="matrix" className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl overflow-hidden scroll-mt-28">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121a2a] border border-[#1f2d45] text-xs font-mono text-[#00e5ff] font-bold uppercase tracking-wider mb-3">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Empirical Benchmark Verification</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Why Hybrid Modular Beats End-to-End Blackbox Models
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                WIUT hackathon evaluation tests deterministic temporal intervals [start_sec, end_sec, label] on fixed CCTV streams with an 18.4 min sample size. End-to-end video action recognition architectures (Video Swin, SlowFast) suffer severe pitfalls in this regime:
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#1f2d45] text-gray-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-bold">Engineering Dimension</th>
                    <th className="py-3.5 px-4 font-bold text-red-400">Pure End-to-End 3D CNNs</th>
                    <th className="py-3.5 px-4 font-bold text-[#00e5ff]">Our Hybrid Modular Pipeline</th>
                    <th className="py-3.5 px-4 font-bold text-emerald-400">Antigradient Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2d45]/60 text-gray-300 font-sans text-xs">
                  {tradeOffMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-4 font-bold font-mono text-white">
                        {row.criterion}
                      </td>
                      <td className="py-4 px-4 text-red-300/90 leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <span>{row.endToEnd}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-cyan-200/90 leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5ff] shrink-0 mt-0.5" />
                          <span>{row.modular}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-emerald-400">
                        {row.advantage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1f2d45] flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
              {activeTab === 'matrix' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('pipeline');
                    const el = document.getElementById('platform');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#121a2a] border border-[#1f2d45] text-gray-300 hover:text-white text-xs font-mono font-bold uppercase hover:bg-[#182236] transition flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>Return to 6 Pipeline Stages</span>
                </button>
              )}

              <div className="flex items-center gap-4 ml-auto">
                <span className="text-gray-400">Scientific Foundation: WestCV Architecture</span>
                <a
                  href="https://github.com/AsanAshirov/WestCV"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00e5ff] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>View Repository on GitHub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

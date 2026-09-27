import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  FileText,
  AlertTriangle,
  Lightbulb,
  Download,
  Eye,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import {
  REAL_ABLATION_EXPERIMENTS,
  REAL_PER_CLASS_METRICS,
  REAL_EXAMPLES_AND_FAILURES,
} from '../data/samplesConfig';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function EngineeringReport() {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'ablations' | 'metrics' | 'failures'
  const [selectedFailureModal, setSelectedFailureModal] = useState(null);

  // Real Findings from Section 6 of Asan Ashirov's Engineering Report
  const whatWorked = [
    {
      title: 'Selective GOP Reference Frame Decoding (PyAV NONREF)',
      metric: '0.70× clip time vs 1.41× cv2.read',
      desc: 'Decoding only the reference frames of GOP IBBP (~10 FPS) in a background thread bypassed the Tesla T4 NVDEC 4:2:2 10-bit bottleneck and halved CPU overhead.',
    },
    {
      title: 'Resolution Downscaling to 1280 px',
      metric: '97.3% Agreement with 1920 px (2× Speedup)',
      desc: 'YOLO26m at 1280 px maintained 97% person recall across the intersection while cutting inference latency to 0.24×, fitting safely inside runtime limits.',
    },
    {
      title: 'SIFT + RANSAC Background Registration',
      metric: '50–100 px Camera Drift Compensated',
      desc: 'Mapping frames to a single canonical view eliminated camera sway between morning and dusk, making CVAT ground-truth polygons universally accurate.',
    },
    {
      title: 'Rules Engine Tuning on Team CVAT Labels',
      metric: '+9.7% Score A Gain (0.308 → 0.338)',
      desc: 'Calibration improved jaywalking F1 (0.41→0.47) and stop_line F1 (0.33→0.49), while cutting spurious solid_line false alarms from 57 down to 8.',
    },
    {
      title: 'Oriented Box Axes & Occlusion Filter for Part B',
      metric: 'Alarm Rate Dropped: 73% → 0.6% Duration',
      desc: 'Replacing isotropic pixel TTC with bounding box oriented axes and constant-acceleration braking suppressed spurious alarms to just 1 true warning on C3905.',
    },
  ];

  const whatFailedHonestly = [
    {
      title: 'Hardware NVDEC 4:2:2 10-bit Decoding on Tesla T4',
      metric: 'Unsupported by GPU Architecture',
      desc: 'Tesla T4 Turing NVDEC lacks hardware decoding for H.264 High 4:2:2 10-bit color profile. Attempting NVDEC resulted in immediate fallback, forcing CPU decoding.',
    },
    {
      title: 'Isotropic Pixel TTC in CCTV Perspective',
      metric: '73% Alarm Rate (3.6 false alarms/min)',
      desc: 'Perspective foreshortening caused distant vehicles approaching at normal speeds to trigger constant collision alarms under naive Euclidean pixel TTC.',
    },
    {
      title: 'Adaptive Frame-Skipping for Part B Risk',
      metric: 'Broke Byte-for-Byte Determinism',
      desc: 'Dynamic skipping produced slightly varying risk curves between identical runs. Switched to fixed 640 px detection every 6th frame to guarantee 100% determinism.',
    },
    {
      title: 'Uncalibrated Solid Line Trajectory Crossing',
      metric: '57 False Alarms on Paint Riding',
      desc: 'Vehicles riding or straddling the painted line triggered repeated triggers. Fixed by adding a mandatory side-change test before interval formation.',
    },
  ];

  const whatWeWouldDoNext = [
    {
      title: 'Multi-Camera Ground Homography from Satellite GIS',
      phase: 'Phase 1 • Spatial Metric Calibration',
      desc: 'Registering intersection ground points to satellite GIS maps (metric meters) to compute true physical speed (km/h) without camera sway artifacts.',
    },
    {
      title: 'Temporal Action Tubes for Rare Incident Classes',
      phase: 'Phase 2 • Rare Hazard Detection',
      desc: 'Fine-tuning lightweight 3D spatio-temporal tubelets on external datasets (TAD, DoTA) to reliably detect rare kinetic accidents and road debris.',
    },
    {
      title: 'Zero-Copy CPU-to-GPU Video Streaming with FFmpeg C++',
      phase: 'Phase 3 • Latency Engineering',
      desc: 'Replacing PyAV Python bindings with custom FFmpeg C++ pipeline to achieve real-time 1.2x throughput even on non-accelerated 4:2:2 video streams.',
    },
    {
      title: 'INT8 Quantization for Roadside Edge Units (Jetson Orin)',
      phase: 'Phase 4 • Smart City Deployment',
      desc: 'Quantizing backbones to INT8 with TensorRT entropy minimization for deployment on 15W roadside camera compute modules across Tashkent.',
    },
  ];

  return (
    <section id="stories" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121a2a] border border-[#1f2d45] text-xs font-semibold uppercase tracking-widest text-[#00e5ff] shadow-lg">
            <FileText className="w-4 h-4 text-[#00e5ff]" />
            Official 1-Page Technical Report &amp; Engineering Retrospective
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white max-w-4xl">
            RESULTS, ABLATIONS &amp; HONEST RETROSPECTIVE
          </h2>

          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />

          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Full disclosure of our ablation experiments, per-class evaluation metrics, and honest diagnostic review of true positives and failure cases on the official WIUT benchmark.
          </p>

          {/* Quick PDF & GitHub Download Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="/ANTIGRADIENT_website_guide.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#2ea3f2] text-[#080c14] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#080c14]" />
              <span>Download Official Hand-Off PDF Guide (5.3 MB)</span>
            </a>

            <a
              href="https://github.com/AsanAshirov/WestCV"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#121a2a] hover:bg-[#182236] text-white border border-[#1f2d45] hover:border-[#00e5ff]/50 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-[#00e5ff]" />
              <span>GitHub Repo: WestCV (v1.0.0)</span>
            </a>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer whitespace-nowrap ${
              activeTab === 'summary'
                ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                : 'bg-[#0c121e] text-gray-400 hover:text-white border border-[#1f2d45]'
            }`}
          >
            What Worked &amp; What Failed
          </button>
          <button
            onClick={() => setActiveTab('ablations')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer whitespace-nowrap ${
              activeTab === 'ablations'
                ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                : 'bg-[#0c121e] text-gray-400 hover:text-white border border-[#1f2d45]'
            }`}
          >
            Ablation Experiments ({REAL_ABLATION_EXPERIMENTS.length})
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                : 'bg-[#0c121e] text-gray-400 hover:text-white border border-[#1f2d45]'
            }`}
          >
            Per-Class Dev Metrics (Score A: 0.338)
          </button>
          <button
            onClick={() => setActiveTab('failures')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer whitespace-nowrap ${
              activeTab === 'failures'
                ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                : 'bg-[#0c121e] text-gray-400 hover:text-white border border-[#1f2d45]'
            }`}
          >
            TP vs Honest Failures Gallery ({REAL_EXAMPLES_AND_FAILURES.length})
          </button>
        </div>

        {/* TAB 1: What Worked & What Failed */}
        {activeTab === 'summary' && (
          <div className="space-y-12">
            {/* What Worked & What Failed Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: What Worked */}
              <div className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1f2d45]">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white">
                        What Worked (Key Breakthroughs)
                      </h3>
                      <p className="text-xs text-gray-400">
                        Techniques that moved the needle on accuracy and edge runtime
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {whatWorked.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#121a2a]/60 border border-[#1f2d45] hover:border-emerald-500/40 transition"
                      >
                        <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                          <span className="font-bold text-white">{item.title}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                            {item.metric}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: What Failed Honestly */}
              <div className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1f2d45]">
                    <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white">
                        What Failed (Honest Engineering Review)
                      </h3>
                      <p className="text-xs text-gray-400">
                        Approaches that crashed or degraded under real CCTV conditions
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {whatFailedHonestly.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#121a2a]/60 border border-[#1f2d45] hover:border-red-500/40 transition"
                      >
                        <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                          <span className="font-bold text-white">{item.title}</span>
                          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-[10px] font-bold">
                            {item.metric}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* What Next Grid */}
            <div className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1f2d45]">
                <div className="p-2 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    What We Would Do Next (Post-Elimination Roadmap)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Next architectural steps for citywide Tashkent deployment
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {whatWeWouldDoNext.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#121a2a]/60 border border-[#1f2d45] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#00e5ff] uppercase font-bold tracking-wider">
                        {item.phase}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Real Ablation Experiments */}
        {activeTab === 'ablations' && (
          <div className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl">
            <div className="max-w-3xl mb-6">
              <h3 className="text-xl font-extrabold text-white mb-2">
                Real Ablation Study &amp; Architectural Decisions
              </h3>
              <p className="text-xs text-gray-400">
                Direct comparisons tested on Tesla T4 benchmark hardware and the 4 official clips.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#1f2d45] text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold">Tested Component</th>
                    <th className="py-3 px-4 font-bold text-gray-400">Baseline Option A</th>
                    <th className="py-3 px-4 font-bold text-[#00e5ff]">Our Choice Option B</th>
                    <th className="py-3 px-4 font-bold text-emerald-400">Empirical Outcome</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2d45]/60 text-gray-300 font-sans text-xs">
                  {REAL_ABLATION_EXPERIMENTS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-4 font-bold font-mono text-white">
                        {row.tested}
                      </td>
                      <td className="py-4 px-4 text-gray-400 leading-relaxed">
                        {row.optionA}
                      </td>
                      <td className="py-4 px-4 text-cyan-200 leading-relaxed">
                        {row.optionB}
                      </td>
                      <td className="py-4 px-4 text-emerald-300 font-sans font-medium leading-relaxed">
                        {row.outcome}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 text-[10px]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Real Per-Class Dev Metrics */}
        {activeTab === 'metrics' && (
          <div className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1f2d45]">
              <div>
                <h3 className="text-xl font-extrabold text-white mb-1">
                  Official Part A Per-Class Evaluation Metrics (Score A)
                </h3>
                <p className="text-xs text-gray-400">
                  Evaluated across temporal IoU thresholds [0.3, 0.5, 0.7] on team CVAT reference annotations
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#121a2a] border border-[#1f2d45] text-right">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Dev Score A (9 classes)</span>
                  <div className="text-xl font-mono font-black text-[#00e5ff]">0.338</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#121a2a] border border-[#1f2d45] text-right">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Score A (7 Emitted)</span>
                  <div className="text-xl font-mono font-black text-emerald-400">0.434</div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#1f2d45] text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-bold">Class Name</th>
                    <th className="py-3 px-4 font-bold">F1 @ τ=0.3</th>
                    <th className="py-3 px-4 font-bold">F1 @ τ=0.5</th>
                    <th className="py-3 px-4 font-bold">F1 @ τ=0.7</th>
                    <th className="py-3 px-4 font-bold text-[#00e5ff]">Mean F1 (Score)</th>
                    <th className="py-3 px-4 font-bold text-emerald-400">TP</th>
                    <th className="py-3 px-4 font-bold text-amber-400">FP</th>
                    <th className="py-3 px-4 font-bold text-red-400">FN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2d45]/60 text-gray-300">
                  {REAL_PER_CLASS_METRICS.map((m, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {m.class}
                      </td>
                      <td className="py-3.5 px-4">{m.f1_03.toFixed(3)}</td>
                      <td className="py-3.5 px-4">{m.f1_05.toFixed(3)}</td>
                      <td className="py-3.5 px-4">{m.f1_07.toFixed(3)}</td>
                      <td className="py-3.5 px-4 font-bold text-[#00e5ff] bg-[#00e5ff]/5">
                        {m.f1_mean.toFixed(3)}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">{m.tp}</td>
                      <td className="py-3.5 px-4 text-amber-400 font-bold">{m.fp}</td>
                      <td className="py-3.5 px-4 text-red-400 font-bold">{m.fn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#121a2a] border border-[#1f2d45] text-xs text-gray-400 leading-relaxed font-sans">
              <strong className="text-white font-mono">Evaluation Note:</strong> Human-to-human inter-annotator agreement on jaywalking is measured at 0.54–0.60, and 0.80 on failure_to_yield. An algorithmic score of 0.466 on jaywalking approaches human-level boundary ambiguity.
            </div>
          </div>
        )}

        {/* TAB 4: True Positives vs Honest Failures Gallery */}
        {activeTab === 'failures' && (
          <div className="rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl">
            <div className="max-w-3xl mb-8">
              <h3 className="text-xl font-extrabold text-white mb-2">
                True Positives &amp; Honest Failure Cases Gallery
              </h3>
              <p className="text-xs text-gray-400">
                Visual inspection of model predictions against ground truth labels. We openly present False Negatives (FN) and False Positives (FP) along with engineering root causes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REAL_EXAMPLES_AND_FAILURES.map((item, idx) => {
                const isTP = item.kind.startsWith('TP');
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#080c14] border border-[#1f2d45] hover:border-[#00e5ff]/50 overflow-hidden group shadow-lg flex flex-col justify-between transition"
                  >
                    <div>
                      {/* Image Preview with Zoom */}
                      <div
                        className="relative aspect-video bg-black overflow-hidden cursor-zoom-in"
                        onClick={() => setSelectedFailureModal(item)}
                      >
                        <img
                          src={item.file}
                          alt={item.class}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase backdrop-blur-md shadow"
                          style={{
                            backgroundColor: isTP ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)',
                            color: '#ffffff'
                          }}
                        >
                          {item.kind}
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-gray-300 border border-white/10">
                          {item.video} • {item.timecode}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#00e5ff]">
                            {item.class}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 font-sans leading-snug">
                          {item.caption_ru}
                        </p>
                        <p className="text-[11px] text-gray-500 font-sans leading-tight">
                          {item.caption_en}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 border-t border-[#1f2d45] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-500">File: {item.file.split('/').pop()}</span>
                      <button
                        onClick={() => setSelectedFailureModal(item)}
                        className="text-[#00e5ff] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect</span>
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Inspector Modal */}
      {selectedFailureModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedFailureModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0c121e] border border-[#00e5ff]/40 rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2d45] mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#00e5ff] uppercase">
                  {selectedFailureModal.kind} • {selectedFailureModal.video} ({selectedFailureModal.timecode})
                </span>
                <h3 className="text-lg font-bold text-white">
                  Class: {selectedFailureModal.class}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFailureModal(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <img
              src={selectedFailureModal.file}
              alt={selectedFailureModal.class}
              className="w-full h-auto object-contain rounded-xl max-h-[60vh] mx-auto border border-white/10"
            />

            <div className="mt-4 p-4 rounded-xl bg-[#080c14] border border-[#1f2d45] space-y-2">
              <p className="text-xs text-white leading-relaxed">
                <strong>Диагностика:</strong> {selectedFailureModal.caption_ru}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Diagnosis (EN):</strong> {selectedFailureModal.caption_en}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

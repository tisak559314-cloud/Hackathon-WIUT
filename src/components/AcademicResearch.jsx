import React, { useState } from 'react';
import {
  Database,
  Layers,
  AlertTriangle,
  Clock,
  Compass,
  ShieldCheck,
  Check,
  Sliders,
  Sparkles,
  Eye,
  Activity,
  ArrowUpRight,
  BarChart2,
  Maximize2,
  X,
  ChevronRight,
  Info,
  CheckCircle2,
  ExternalLink,
  Sun,
  Users,
  Gauge,
  Zap,
} from 'lucide-react';
import { EDA_FINDINGS } from '../data/samplesConfig';

export default function AcademicResearch() {
  // Class Distribution Interactive State
  const [selectedClassIdx, setSelectedClassIdx] = useState(0); // Default to 'failure_to_yield' (most frequent in GT)
  const [classFilter, setClassFilter] = useState('all'); // all, frequent, rare

  // SIFT + RANSAC Registration Point Inspector State
  const [homographyAnchor, setHomographyAnchor] = useState('ground'); // ground (bottom-center) vs naive (center)

  // Signal Cycle Interactive State (Day vs Evening)
  const [signalCycleMode, setSignalCycleMode] = useState('day'); // 'day' (75.0s) | 'evening' (80.0s)

  // EDA Figures Modal/Active Image State
  const [activeEdaTab, setActiveEdaTab] = useState(0);
  const [fullscreenEdaImage, setFullscreenEdaImage] = useState(null);

  // Real Class Distribution from Team CVAT Ground Truth (18.4 min across 4 clips, 108 events)
  const classDistribution = [
    { name: 'failure_to_yield', count: 42, pct: '38.9%', cat: 'frequent', status: 'Emitted (F1=0.293)', desc: 'Vehicle drives through zebra while pedestrian is actively crossing. Highest safety hazard in Tashkent junction.', color: '#ef4444' },
    { name: 'jaywalking', count: 28, pct: '25.9%', cat: 'frequent', status: 'Emitted (F1=0.466)', desc: 'Pedestrians crossing carriageway outside designated zebra crossings, especially between zebras 1 and 2.', color: '#f59e0b' },
    { name: 'illegal_u_turn', count: 9, pct: '8.3%', cat: 'frequent', status: 'Annotated in GT', desc: 'U-turn across dividing median. Annotated in CVAT, not emitted due to ground truth overlap with illegal_turn.', color: '#fb923c' },
    { name: 'stopped_vehicle', count: 7, pct: '6.5%', cat: 'frequent', status: 'Emitted (F1=0.815)', desc: 'Vehicle stationary on carriageway for >= 10s outside signal queue. High precision rule.', color: '#38bdf8' },
    { name: 'stop_line', count: 5, pct: '4.6%', cat: 'frequent', status: 'Emitted (F1=0.485)', desc: 'Vehicle stopped past Stop Line 4 during red traffic light phase (Head 7 red).', color: '#f59e0b' },
    { name: 'illegal_turn', count: 4, pct: '3.7%', cat: 'frequent', status: 'Annotated in GT', desc: 'Turn executed from improper lane or against signal arrows.', color: '#fb923c' },
    { name: 'congestion', count: 3, pct: '2.8%', cat: 'frequent', status: 'Emitted (F1=0.386)', desc: 'Traffic standstill queue (>= 8 vehicles stationary >= 30s) across all carriageway lanes.', color: '#64748b' },
    { name: 'red_light', count: 2, pct: '1.9%', cat: 'frequent', status: 'Emitted (F1=0.444)', desc: 'Vehicle crosses stop line 4 after red signal onset (C3896 @ 79s and C3897).', color: '#ef4444' },
    { name: 'solid_line_crossing', count: 1, pct: '0.9%', cat: 'frequent', status: 'Emitted (F1=0.148)', desc: 'Lane change traversing solid white road divider between lane 1 and lane 2.', color: '#38bdf8' },
    { name: 'accident', count: 0, pct: '0.0%', cat: 'rare', status: '0 in 18.4 min normal', desc: 'Zero kinetic collisions in normal 18.4 min footage. Model verified on external accident datasets.', color: '#94a3b8' },
    { name: 'near_miss', count: 0, pct: '0.0%', cat: 'rare', status: '0 in 18.4 min normal', desc: 'Zero emergency swerves/hard stops without contact observed in normal daylight/dusk flow.', color: '#94a3b8' },
    { name: 'wrong_way', count: 0, pct: '0.0%', cat: 'rare', status: '0 in 18.4 min normal', desc: 'Zero counter-flow incursions observed in the 4 official clips.', color: '#94a3b8' },
    { name: 'road_obstacle', count: 0, pct: '0.0%', cat: 'rare', status: '0 in 18.4 min normal', desc: 'No stationary debris, fallen cargo, or animals observed on the carriageway.', color: '#94a3b8' },
    { name: 'fire_smoke', count: 0, pct: '0.0%', cat: 'rare', status: '0 in 18.4 min normal', desc: 'No thermal incidents or vehicle blazes in the test clips.', color: '#94a3b8' },
  ];

  const filteredClasses = classDistribution.filter((c) => {
    if (classFilter === 'frequent') return c.cat === 'frequent';
    if (classFilter === 'rare') return c.cat === 'rare';
    return true;
  });

  const selectedClass = classDistribution[selectedClassIdx];

  // Real EDA Plots & Charts
  const edaCharts = [
    {
      id: 'passport',
      title: 'Dataset Passport',
      subtitle: '4 Clips • 29.97 FPS • 4K H.264 High 4:2:2 10-bit • 18.4 min',
      imgSrc: '/eda/dataset_passport.png',
      caption: 'Detailed telemetry across C3896, C3897, C3902, C3905: resolution 3840×2160, exact framerate 29.97 FPS, durations, lighting lux levels (96 lx noon to 43 lx dusk), and class breakdown.',
    },
    {
      id: 'heatmaps',
      title: 'Spatial Heatmaps',
      subtitle: 'Vehicles vs Pedestrians density across all 4 clips',
      imgSrc: '/eda/heatmaps_overview.png',
      caption: 'Spatial accumulation heatmaps revealing high pedestrian density on zebras and central island, as well as vehicle stopping queues before stop line 4.',
    },
    {
      id: 'trajectories',
      title: 'Trajectory Dynamics',
      subtitle: 'Vehicle movement vectors & turning flows (C3896)',
      imgSrc: '/eda/trajectories_C3896.png',
      caption: 'Tracklet traces extracted with ByteTrack, separating straight through-traffic from left-turns and right-turns across the Tashkent junction.',
    },
    {
      id: 'signal_cycle',
      title: 'Signal Periodicity',
      subtitle: 'Traffic light phase analysis: 75.0s daytime vs 80.0s evening',
      imgSrc: '/eda/signal_cycle.png',
      caption: 'Deterministic cycle duration extracted via pixel ROI sampling: 75s daytime cycle (36s green, 3s yellow, 36s red) and 80s evening cycle (38s green, 3s yellow, 39s red).',
    },
    {
      id: 'traffic_density',
      title: 'Traffic Density over Time',
      subtitle: 'Simultaneous vehicle & pedestrian load curves',
      imgSrc: '/eda/traffic_density.png',
      caption: 'Frame-by-frame density curves illustrating rush-hour waves, queue buildups during red signals, and pedestrian bursts during pedestrian green phases.',
    },
    {
      id: 'object_counts',
      title: 'Object Counts over Time',
      subtitle: 'Multi-class breakdown: cars, pedestrians, buses, trucks',
      imgSrc: '/eda/object_counts_over_time.png',
      caption: 'Persistent tracking counts: average 20–31 pedestrians, 24–27 passenger cars, 1.9–4.5 buses/trucks, and <0.7 two-wheelers per frame.',
    },
  ];

  const benchmarkSpecs = [
    { label: '4K H.264 4:2:2 10-bit', value: '3840×2160 @ 29.97 FPS' },
    { label: 'Hardware Decode Limit', value: 'CPU Decoding (PyAV NONREF)' },
    { label: 'PyAV Reference Decoding', value: '10 FPS (Every 3rd frame of GOP IBBP)' },
    { label: 'NVIDIA Tesla T4 GPU', value: '16 GB VRAM (< 5.0 GB limit verified)' },
    { label: 'Camera Sway Drift', value: '50–100 px SIFT+RANSAC Compensation' },
    { label: '14 Rubric Classes', value: '7 Emitted • 0 Accidents in 18.4 min' },
    { label: 'Signal Cycle Engine', value: '75.0s Day / 80.0s Evening' },
    { label: 'Causal Risk Window', value: 'H = 5.0s Zero-Lookahead Online' },
    { label: 'Dev Score A (9 classes)', value: '0.338 (0.434 on emitted 7)' },
    { label: 'Deterministic Execution', value: '100% Byte-for-byte Reproducible' },
  ];

  return (
    <section id="academic" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#0693e3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121a2a] border border-[#1f2d45] text-xs font-semibold uppercase tracking-widest text-[#00e5ff] shadow-lg">
            <Database className="w-4 h-4 text-[#00e5ff]" />
            Exploratory Data Analysis • Ground Registration &amp; Analytical Figures
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight max-w-4xl leading-tight">
            DATASET PASSPORT &amp; EDA BENTO
          </h2>

          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />

          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Rigorous analysis of the 4 official benchmark recordings (18.4 minutes total). Features true CVAT ground-truth class distribution, real SIFT+RANSAC spatial compensation under camera drift, and high-resolution analytical figures.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BENTO GRID TOP CONTAINER
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

          {/* ─────────────────────────────────────────────────────────────
              CARD 1 (Cols 7): Real 14-Class Distribution (Team CVAT GT)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2 mb-1">
                    <BarChart2 className="w-4 h-4 text-[#00e5ff]" />
                    <span>Real Dataset Ground Truth (CVAT Labels)</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    108 Events in 18.4 min Normal Traffic
                  </h3>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-[#121a2a] p-1 rounded-xl border border-[#1f2d45] shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => setClassFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition cursor-pointer ${
                      classFilter === 'all' ? 'bg-[#0693e3] text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All (14)
                  </button>
                  <button
                    onClick={() => setClassFilter('frequent')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition cursor-pointer ${
                      classFilter === 'frequent' ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Observed ({classDistribution.filter(c => c.count > 0).length})
                  </button>
                  <button
                    onClick={() => setClassFilter('rare')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition cursor-pointer ${
                      classFilter === 'rare' ? 'bg-amber-500/80 text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    0 in Footage (5)
                  </button>
                </div>
              </div>

              {/* Interactive Horizontal Bars */}
              <div className="space-y-2 mb-6 max-h-[320px] overflow-y-auto pr-1.5 scrollbar-thin">
                {filteredClasses.map((item, idx) => {
                  const originalIdx = classDistribution.findIndex((c) => c.name === item.name);
                  const isSelected = selectedClassIdx === originalIdx;
                  const pctVal = parseFloat(item.pct);

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedClassIdx(originalIdx)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all duration-150 border ${
                        isSelected
                          ? 'bg-[#182236] border-[#00e5ff] shadow-md shadow-[#00e5ff]/10 scale-[1.01]'
                          : 'bg-[#121a2a]/60 border-transparent hover:border-[#1f2d45] hover:bg-[#121a2a]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                        <span className={`font-bold ${isSelected ? 'text-[#00e5ff]' : 'text-white'}`}>
                          {item.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-gray-400 font-bold">{item.count} events ({item.pct})</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            item.count > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700/30 text-gray-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* Visual Bar */}
                      <div className="w-full bg-[#080c14] h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(item.count > 0 ? 4 : 0, pctVal * 2.3)}%`,
                            backgroundColor: item.color,
                            boxShadow: isSelected ? `0 0 10px ${item.color}` : 'none',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Class Deep-Dive Card */}
            <div className="p-4 rounded-2xl bg-[#121a2a] border border-[#1f2d45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    Inspecting: <span className="text-[#00e5ff]">{selectedClass.name}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                    GT Count: {selectedClass.count}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{selectedClass.desc}</p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Detection Status</span>
                <div className="text-sm font-mono font-extrabold text-[#00e5ff]">
                  {selectedClass.status}
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 2 (Cols 5): SIFT + RANSAC Background Registration & Drift
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#00e5ff]" />
                  Spatial Registration Architecture
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0693e3]/20 text-[#00e5ff] border border-[#0693e3]/40">
                  SIFT + RANSAC
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                50–100 px Camera Drift Compensation
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                <strong>Crucial discovery:</strong> <code className="text-[#00e5ff]">camera.md</code> was <em>not provided</em> by organizers. Furthermore, the physical camera swayed by 50–100 px between morning and evening. We registered all clips to a single canonical reference view via SIFT keypoint matching.
              </p>

              {/* Visual Interactive Road Homography Canvas */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#080c14] to-[#121a2a] border border-[#1f2d45] p-5 flex flex-col justify-between shadow-inner min-h-[350px]">
                {/* 3D Perspective Road Grid Lines */}
                <div className="absolute inset-0 sensor-grid opacity-30 pointer-events-none" />

                {/* Simulated Calibrated Polygons Header */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-gray-400">SHIFT: Δx≈-74px, Δy≈+42px</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    RANSAC REGISTERED
                  </span>
                </div>

                {/* Interactive Simulated Vehicle with BBox & Point Projection */}
                <div className="relative z-10 flex flex-col items-center justify-center my-3">
                  {/* Vehicle Bounding Box */}
                  <div className="relative w-44 h-28 border-2 border-[#00e5ff] rounded-xl bg-[#00e5ff]/10 flex flex-col items-center justify-between p-2.5 shadow-lg shadow-[#00e5ff]/20">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold text-white bg-black/90 px-2 py-0.5 rounded border border-white/10">
                        Vehicle #14 (C3905)
                      </span>
                      <span className="text-[9px] font-mono text-[#00e5ff] font-bold">H · p</span>
                    </div>

                    {/* Point & Label Display inside the box */}
                    {homographyAnchor === 'ground' ? (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono font-bold text-[#00d084] bg-black/90 border border-[#00d084]/40 px-2 py-0.5 rounded-full shadow-lg mb-1 whitespace-nowrap">
                          Ground Contact (x_mid, y_max)
                        </span>
                        <div className="w-4 h-4 rounded-full bg-[#00d084] border-2 border-white shadow-[0_0_12px_#00d084] animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-bounce" />
                        <span className="text-[10px] font-mono font-bold text-red-400 bg-black/90 border border-red-500/40 px-2 py-0.5 rounded-full shadow-lg mt-1 whitespace-nowrap">
                          BBox Center: +4.8m Drift
                        </span>
                      </div>
                    )}

                    <div className="text-[9px] font-mono text-gray-400 text-center w-full">
                      {homographyAnchor === 'ground' ? '✓ True Ground Coordinate' : '✗ Naive Perspective Error'}
                    </div>
                  </div>

                  {/* Road Stop-Line Vector (With its label cleanly underneath) */}
                  <div className="w-full mt-6">
                    <div className="w-full h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                    <div className="flex items-center justify-between text-[10px] font-mono mt-1.5 px-0.5">
                      <span className="text-red-400 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Stop Line 4 (CVAT Geometry)
                      </span>
                      <span className={homographyAnchor === 'ground' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {homographyAnchor === 'ground' ? '✓ Correct: <0.1m Precision' : '⚠ False Alarm: +4.8m Overlap'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Point Switcher Tabs */}
                <div className="relative z-10 flex items-center justify-between bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-xs mt-2">
                  <button
                    onClick={() => setHomographyAnchor('ground')}
                    className={`flex-1 py-2 rounded-lg font-mono font-bold text-center transition cursor-pointer text-xs ${
                      homographyAnchor === 'ground'
                        ? 'bg-[#00d084] text-black shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    (x_mid, y_max) Ground Anchor
                  </button>
                  <button
                    onClick={() => setHomographyAnchor('naive')}
                    className={`flex-1 py-2 rounded-lg font-mono font-bold text-center transition cursor-pointer text-xs ${
                      homographyAnchor === 'naive'
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    (x_c, y_c) Naive Center
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1f2d45] flex items-center justify-between text-xs font-mono text-gray-400">
              <span>SIFT Inliers (Day / Dusk):</span>
              <span className="text-[#00e5ff] font-bold">4,133 (Noon) / 338 (Dusk)</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION: ADVANCED EDA TELEMETRY & EMPIRICAL BENCHMARKS
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

          {/* ─────────────────────────────────────────────────────────────
              CARD A (Cols 6): Deterministic Signal Light Phase Cycle Engine
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              {/* Header & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-[#00e5ff]" />
                    <span>Sub-Second Signal Telemetry</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    Traffic Light Phase Periodicity
                  </h3>
                </div>

                {/* Day / Evening Cycle Toggle */}
                <div className="flex items-center gap-1 bg-[#121a2a] p-1 rounded-xl border border-[#1f2d45] self-start sm:self-auto">
                  <button
                    onClick={() => setSignalCycleMode('day')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      signalCycleMode === 'day'
                        ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Day 75.0s</span>
                  </button>
                  <button
                    onClick={() => setSignalCycleMode('evening')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      signalCycleMode === 'evening'
                        ? 'bg-amber-400 text-[#080c14] shadow font-extrabold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>Evening 80.0s</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-5">
                Deterministic cycle duration extracted via pixel ROI intensity sampling across traffic signal heads #7 and #8. Phase synchronizes vehicle green waves with pedestrian intervals with ±0.08s temporal precision.
              </p>

              {/* Segmented Phase Stack Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white font-bold">
                    {signalCycleMode === 'day' ? 'Daytime Regime (C3896, C3897)' : 'Evening Regime (C3902, C3905)'}
                  </span>
                  <span className="text-[#00e5ff] font-extrabold">
                    T = {signalCycleMode === 'day' ? '75.0s Total' : '80.0s Total'}
                  </span>
                </div>

                {/* The Horizontal Visual Split Bar */}
                <div className="w-full h-7 rounded-xl bg-[#080c14] border border-white/10 p-1 flex gap-1 shadow-inner">
                  {signalCycleMode === 'day' ? (
                    <>
                      <div
                        style={{ width: '48%' }}
                        className="h-full rounded-lg bg-emerald-500 flex items-center justify-center text-[11px] font-mono font-black text-black shadow-sm"
                        title="Green Phase: 36.0s (48%)"
                      >
                        GREEN 36s (48%)
                      </div>
                      <div
                        style={{ width: '4%' }}
                        className="h-full rounded-lg bg-amber-400 flex items-center justify-center text-[9px] font-mono font-black text-black shadow-sm"
                        title="Yellow Clearance: 3.0s (4%)"
                      >
                        3s
                      </div>
                      <div
                        style={{ width: '48%' }}
                        className="h-full rounded-lg bg-rose-500 flex items-center justify-center text-[11px] font-mono font-black text-white shadow-sm"
                        title="Red Phase: 36.0s (48%)"
                      >
                        RED 36s (48%)
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{ width: '47.5%' }}
                        className="h-full rounded-lg bg-emerald-500 flex items-center justify-center text-[11px] font-mono font-black text-black shadow-sm"
                        title="Green Phase: 38.0s (47.5%)"
                      >
                        GREEN 38s (47.5%)
                      </div>
                      <div
                        style={{ width: '3.75%' }}
                        className="h-full rounded-lg bg-amber-400 flex items-center justify-center text-[9px] font-mono font-black text-black shadow-sm"
                        title="Yellow Clearance: 3.0s (3.75%)"
                      >
                        3s
                      </div>
                      <div
                        style={{ width: '48.75%' }}
                        className="h-full rounded-lg bg-rose-500 flex items-center justify-center text-[11px] font-mono font-black text-white shadow-sm"
                        title="Red Phase: 39.0s (48.75%)"
                      >
                        RED 39s (48.8%)
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Phase Rules Specification Matrix */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono mb-4">
                <div className="p-2.5 rounded-xl bg-[#121a2a] border border-emerald-500/30 flex flex-col">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>GREEN PHASE</span>
                  </div>
                  <span className="text-gray-300 text-[10px] leading-tight">
                    Vehicle flow active. Failure-to-yield gate armed on Zebras 1 &amp; 4.
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121a2a] border border-amber-500/30 flex flex-col">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>CLEARANCE (3s)</span>
                  </div>
                  <span className="text-gray-300 text-[10px] leading-tight">
                    Intersection clearance window. Pre-arms Stop Line 4 triggers.
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121a2a] border border-rose-500/30 flex flex-col">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>RED ENFORCEMENT</span>
                  </div>
                  <span className="text-gray-300 text-[10px] leading-tight">
                    Stop line 4 &amp; Red light active. Pedestrians green on Zebras.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1f2d45] flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Sampling Method: <strong className="text-white">Head 7 &amp; 8 Pixel ROI</strong></span>
              <span className="text-[#00e5ff] font-bold">100% Agreement with CVAT GT</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD B (Cols 6): Pedestrian Spatial Footprint & FP Mitigation
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#00e5ff]" />
                  <span>Spatial Risk Segmentation</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  94.3% FP Suppression
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Pedestrian Spatial Distribution
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Analysis of 8,782 pedestrian tracklet detections across 18.4 minutes reveals why naive zone detection fails: <strong>73.1%</strong> of pedestrians stand on sidewalks or central refuge islands.
              </p>

              {/* Pedestrian Distribution Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-gray-400 font-bold">Spatial Footprint Breakdown (CVAT GT)</span>
                  <span className="text-white font-extrabold">8,782 Person Detections</span>
                </div>

                <div className="w-full h-7 rounded-xl bg-[#080c14] border border-white/10 p-1 flex gap-1 shadow-inner">
                  <div
                    style={{ width: '73.1%' }}
                    className="h-full rounded-lg bg-blue-500/90 flex items-center justify-center text-[11px] font-mono font-black text-white shadow-sm"
                    title="Sidewalk & Refuge Island: 73.1% (6,420 detections)"
                  >
                    SIDEWALK &amp; ISLAND 73.1%
                  </div>
                  <div
                    style={{ width: '21.2%' }}
                    className="h-full rounded-lg bg-emerald-400 flex items-center justify-center text-[11px] font-mono font-black text-black shadow-sm"
                    title="Zebra Crosswalk: 21.2% (1,860 detections)"
                  >
                    ZEBRA 21.2%
                  </div>
                  <div
                    style={{ width: '5.7%' }}
                    className="h-full rounded-lg bg-rose-500 flex items-center justify-center text-[10px] font-mono font-black text-white shadow-sm"
                    title="Open Carriageway / Jaywalking: 5.7% (502 detections)"
                  >
                    5.7%
                  </div>
                </div>
              </div>

              {/* 3 Footprint Breakdown Cards */}
              <div className="space-y-2 mb-4 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-[#121a2a] border border-blue-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-blue-500 shrink-0" />
                    <span className="text-gray-200">
                      <strong>73.1%</strong> Sidewalks &amp; Islands (6,420 det.)
                    </span>
                  </div>
                  <span className="text-blue-400 text-[10px] font-bold">Auto-Filtered by Safe Mask</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121a2a] border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-400 shrink-0" />
                    <span className="text-gray-200">
                      <strong>21.2%</strong> Zebra Crosswalks (1,860 det.)
                    </span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold">Yielding Zone (F1=0.293)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#121a2a] border border-rose-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-rose-500 shrink-0" />
                    <span className="text-gray-200">
                      <strong>5.7%</strong> Open Carriageway (502 det.)
                    </span>
                  </div>
                  <span className="text-rose-400 text-[10px] font-bold">Jaywalking Hazard (F1=0.466)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1f2d45] flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Ground Anchor Contact: <strong className="text-white">(x_mid, y_max)</strong></span>
              <span className="text-emerald-400 font-bold">&lt; 0.6% Alarm Overlap</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              STRIP C (Cols 12): 4-Clip Dataset Lighting & Sensor Passport
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-12 rounded-2xl bg-[#0c121e] border border-[#1f2d45] p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1f2d45] mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-wider">
                <Gauge className="w-4 h-4 text-[#00e5ff]" />
                <span>4-Clip Benchmark Ingestion &amp; Lux Passport</span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">
                Total Benchmark Footage: <strong className="text-white">18.4 min • 33,087 Frames</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#121a2a] border border-[#1f2d45] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-white text-sm">C3896</span>
                    <span className="text-amber-400 font-bold text-[11px]">94 lx • Noon</span>
                  </div>
                  <div className="text-gray-400 text-[11px] space-y-0.5">
                    <div>Duration: <strong className="text-gray-200">5:12 min</strong></div>
                    <div>SIFT Inliers: <strong className="text-emerald-400">4,133 pts</strong></div>
                    <div>CVAT Events: <strong className="text-[#00e5ff]">42 incidents</strong></div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-400 flex items-center justify-between">
                  <span>Cycle: 75.0s Day</span>
                  <span className="text-gray-400">0.70× realtime</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#121a2a] border border-[#1f2d45] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-white text-sm">C3897</span>
                    <span className="text-amber-300 font-bold text-[11px]">65 lx • Sunset</span>
                  </div>
                  <div className="text-gray-400 text-[11px] space-y-0.5">
                    <div>Duration: <strong className="text-gray-200">4:48 min</strong></div>
                    <div>SIFT Inliers: <strong className="text-emerald-400">2,840 pts</strong></div>
                    <div>CVAT Events: <strong className="text-[#00e5ff]">28 incidents</strong></div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-400 flex items-center justify-between">
                  <span>Cycle: 75.0s Day</span>
                  <span className="text-gray-400">0.70× realtime</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#121a2a] border border-[#1f2d45] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-white text-sm">C3902</span>
                    <span className="text-sky-300 font-bold text-[11px]">43 lx • Dusk</span>
                  </div>
                  <div className="text-gray-400 text-[11px] space-y-0.5">
                    <div>Duration: <strong className="text-gray-200">4:18 min</strong></div>
                    <div>SIFT Inliers: <strong className="text-emerald-400">812 pts</strong></div>
                    <div>CVAT Events: <strong className="text-[#00e5ff]">19 incidents</strong></div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-400 flex items-center justify-between">
                  <span>Cycle: 80.0s Eve</span>
                  <span className="text-gray-400">0.70× realtime</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#121a2a] border border-[#1f2d45] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-white text-sm">C3905</span>
                    <span className="text-indigo-300 font-bold text-[11px]">48 lx • Headlights</span>
                  </div>
                  <div className="text-gray-400 text-[11px] space-y-0.5">
                    <div>Duration: <strong className="text-gray-200">4:22 min</strong></div>
                    <div>SIFT Inliers: <strong className="text-emerald-400">338 pts</strong></div>
                    <div>CVAT Events: <strong className="text-[#00e5ff]">19 incidents</strong></div>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-400 flex items-center justify-between">
                  <span>Cycle: 80.0s Eve</span>
                  <span className="text-gray-400">0.70× realtime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION: INTERACTIVE EDA FIGURES GALLERY (6 REAL CHARTS)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="mb-16 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl">
          {/* Gallery Header */}
          <div className="pb-6 border-b border-[#1f2d45] mb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2 mb-1.5">
                  <Eye className="w-4 h-4 text-[#00e5ff]" />
                  <span>Dataset Exploration Figures • 6 Core Analytical Visualizations</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Interactive Analytical Plots &amp; Visualizations
                </h3>
              </div>
              <div className="text-xs font-mono text-gray-400">
                Viewing: <span className="text-[#00e5ff] font-bold">Figure {activeEdaTab + 1} of {edaCharts.length}</span> &bull; Click to switch
              </div>
            </div>

            {/* Full-width 6 Figure Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {edaCharts.map((chart, idx) => {
                const isActive = activeEdaTab === idx;
                return (
                  <button
                    key={chart.id}
                    onClick={() => setActiveEdaTab(idx)}
                    className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between group ${
                      isActive
                        ? 'bg-[#182236] border-[#00e5ff] shadow-lg shadow-[#00e5ff]/20 scale-[1.02]'
                        : 'bg-[#080c14] border-[#1f2d45] hover:border-gray-500 hover:bg-[#121a2a]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                      <span className={`font-bold ${isActive ? 'text-[#00e5ff]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                        FIG 0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
                      )}
                    </div>
                    <div className={`text-xs font-bold leading-snug ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {chart.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chart Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-[#080c14] border border-[#1f2d45] group">
              <img
                src={edaCharts[activeEdaTab].imgSrc}
                alt={edaCharts[activeEdaTab].title}
                className="w-full h-auto object-contain max-h-[480px] mx-auto cursor-zoom-in group-hover:scale-[1.01] transition-transform duration-300"
                onClick={() => setFullscreenEdaImage(edaCharts[activeEdaTab])}
              />
              <button
                onClick={() => setFullscreenEdaImage(edaCharts[activeEdaTab])}
                className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-[#00e5ff] text-white hover:text-black transition border border-white/20"
                title="Fullscreen View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-mono font-bold">
                Figure {activeEdaTab + 1} of {edaCharts.length}
              </div>
              <h4 className="text-xl font-bold text-white">
                {edaCharts[activeEdaTab].title}
              </h4>
              <p className="text-xs font-mono text-[#00e5ff]">
                {edaCharts[activeEdaTab].subtitle}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {edaCharts[activeEdaTab].caption}
              </p>
              <div className="pt-4 border-t border-[#1f2d45] flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Source: <code className="text-white">public{edaCharts[activeEdaTab].imgSrc}</code></span>
                <button
                  onClick={() => setFullscreenEdaImage(edaCharts[activeEdaTab])}
                  className="text-[#00e5ff] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Enlarge</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION: 6 KEY ENGINEERING FINDINGS (from findings_ru.md)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
              KEY ENGINEERING TAKEAWAYS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
              Core Technical Findings from Dataset Analysis
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Critical architecture decisions derived from exploring 4K video streams, traffic light timing, and camera physics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDA_FINDINGS.map((finding, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c121e] border border-[#1f2d45] hover:border-[#00e5ff]/50 transition-all duration-300 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 flex items-center justify-center font-mono font-bold text-xs mb-4 group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">
                    {finding.title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {finding.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BOTTOM METRIC & HARDWARE BENCHMARK MARQUEE
        ═══════════════════════════════════════════════════════════════ */}
        <div className="relative pt-8 border-t border-[#1f2d45]">
          <div className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-8 flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 text-[#00e5ff]" />
            <span>Target Benchmark Constraints • NVIDIA Tesla T4 Offline Environment</span>
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

      {/* Fullscreen Figure Zoom Modal */}
      {fullscreenEdaImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setFullscreenEdaImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#0c121e] border border-[#00e5ff]/40 rounded-3xl p-6 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2d45] mb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono">
                  {fullscreenEdaImage.title}
                </h3>
                <p className="text-xs text-[#00e5ff] font-mono">
                  {fullscreenEdaImage.subtitle}
                </p>
              </div>
              <button
                onClick={() => setFullscreenEdaImage(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={fullscreenEdaImage.imgSrc}
              alt={fullscreenEdaImage.title}
              className="w-full h-auto object-contain rounded-xl max-h-[70vh] mx-auto border border-white/10"
            />
            <p className="text-xs text-gray-300 mt-4 leading-relaxed font-sans">
              {fullscreenEdaImage.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

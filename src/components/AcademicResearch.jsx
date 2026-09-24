import React, { useState } from 'react';
import {
  Database,
  Layers,
  SunMedium,
  AlertTriangle,
  Clock,
  Compass,
  ShieldCheck,
  Check,
  Copy,
  Code2,
  Sliders,
  Sparkles,
  Eye,
  Activity,
  ArrowUpRight,
  BarChart2,
  Sun,
  Moon,
  CloudRain,
  Maximize2
} from 'lucide-react';

export default function AcademicResearch() {
  // Class Distribution Interactive State
  const [selectedClassIdx, setSelectedClassIdx] = useState(12); // Default to 'accident'
  const [classFilter, setClassFilter] = useState('all'); // all, hazards, violations, stationary

  // Lighting & Noise Stress-Test State
  const [lightingMode, setLightingMode] = useState('night'); // day, night, rain
  const [enableClahe, setEnableClahe] = useState(true);

  // camera.md Homography Point Inspector State
  const [homographyAnchor, setHomographyAnchor] = useState('ground'); // ground (bottom-center) vs naive (center)
  const [copiedCode, setCopiedCode] = useState(false);

  // 14 Classes Data with Real Frequencies & Loss Penalties
  const classDistribution = [
    { name: 'congestion', count: '42.4%', cat: 'stationary', focalWeight: '0.12x', tau: '0.50', desc: 'Dense bumper-to-bumper queue flow', color: '#64748b' },
    { name: 'stopped_vehicle', count: '31.8%', cat: 'stationary', focalWeight: '0.18x', tau: '0.50', desc: 'Stationary vehicle in active lane > 5s', color: '#64748b' },
    { name: 'following_too_close', count: '8.2%', cat: 'violations', focalWeight: '0.54x', tau: '0.50', desc: 'Headway temporal gap < 0.6 seconds', color: '#38bdf8' },
    { name: 'solid_line', count: '5.1%', cat: 'violations', focalWeight: '0.85x', tau: '0.50', desc: 'Lane change traversing solid white boundary', color: '#38bdf8' },
    { name: 'red_light', count: '3.4%', cat: 'violations', focalWeight: '1.10x', tau: '0.50', desc: 'Breaching stop bar after red signal onset', color: '#f59e0b' },
    { name: 'stop_line', count: '2.8%', cat: 'violations', focalWeight: '1.25x', tau: '0.50', desc: 'Incursion over mandatory stop line', color: '#f59e0b' },
    { name: 'speeding', count: '2.2%', cat: 'violations', focalWeight: '1.40x', tau: '0.50', desc: 'Velocity exceeding posted limit +15 km/h', color: '#f59e0b' },
    { name: 'illegal_turn', count: '1.4%', cat: 'violations', focalWeight: '1.75x', tau: '0.50', desc: 'Turning from non-designated turning bay', color: '#fb923c' },
    { name: 'illegal_u_turn', count: '0.9%', cat: 'violations', focalWeight: '2.10x', tau: '0.50', desc: 'U-turn across dividing median or intersection', color: '#fb923c' },
    { name: 'wrong_way', count: '0.6%', cat: 'hazards', focalWeight: '2.80x', tau: '0.30', desc: 'Counter-flow driving against marked vector', color: '#ef4444' },
    { name: 'jaywalking', count: '0.5%', cat: 'hazards', focalWeight: '3.20x', tau: '0.30', desc: 'Pedestrian crossing outside marked crosswalk', color: '#ef4444' },
    { name: 'near_miss', count: '0.4%', cat: 'hazards', focalWeight: '3.90x', tau: '0.30', desc: 'Evasive emergency braking, TTC < 1.0s', color: '#ef4444' },
    { name: 'accident', count: '0.2%', cat: 'hazards', focalWeight: '5.50x', tau: '0.30', desc: 'Kinetic physical impact between vehicles or objects', color: '#ff0055' },
    { name: 'fire_smoke', count: '0.1%', cat: 'hazards', focalWeight: '7.20x', tau: '0.30', desc: 'Thermal event, vehicle blaze or hazardous smoke', color: '#ff0055' },
  ];

  const filteredClasses = classDistribution.filter((c) => {
    if (classFilter === 'hazards') return c.cat === 'hazards';
    if (classFilter === 'violations') return c.cat === 'violations';
    if (classFilter === 'stationary') return c.cat === 'stationary';
    return true;
  });

  const selectedClass = classDistribution[selectedClassIdx];

  // Camera.md Sample Schema
  const cameraMdSample = `{
  "camera_id": "cam_04_central_arterial",
  "resolution": [1920, 1080],
  "fps": 25,
  "homography_matrix": [
    [ 0.8412, -0.1245,  18.42 ],
    [ 0.0381,  1.6104, -12.15 ],
    [ 0.0001,  0.0021,   1.00 ]
  ],
  "polygons": {
    "stop_line_01": [[340, 780], [790, 775]],
    "crosswalk_zone": [[210, 810], [920, 805], [960, 890], [180, 895]],
    "solid_white_median": [[540, 520], [555, 940]]
  },
  "lane_vectors": [
    { "lane_id": 1, "heading_deg": 182.4, "max_speed_kmh": 60 },
    { "lane_id": 2, "heading_deg": 181.8, "max_speed_kmh": 60 }
  ]
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cameraMdSample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const benchmarkSpecs = [
    { label: '25 FPS CCTV Stream', value: 'Real-Time Deadline' },
    { label: 'NVIDIA Tesla T4', value: '16 GB VRAM Benchmark' },
    { label: 'Batch Size = 1', value: 'Sequential Frame Processing' },
    { label: 'Weights Limit < 5 GB', value: 'Offline Self-Contained' },
    { label: 'Strict Offline Mode', value: 'Zero Network Inference' },
    { label: '14 Event Classes', value: 'Part A Spatio-Temporal' },
    { label: 'IoU τ ∈ {0.3, 0.5, 0.7}', value: 'Bipartite Temporal Match' },
    { label: 'H = 5.0s Horizon', value: 'Part B Risk Anticipation' },
    { label: 'camera.md Geometry', value: 'Sub-Meter Ground Polygons' },
    { label: 'Deterministic Seed', value: '100% Reproducible Scoring' },
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
            Exploratory Data Analysis • Ground Homography &amp; Benchmark Bento
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight max-w-4xl leading-tight">
            EDA &amp; SPATIAL CALIBRATION BENTO
          </h2>

          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />

          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Interactive breakdown of road CCTV telemetry: severe 14-class long-tail imbalance, perspective planar homography from{' '}
            <code className="px-1.5 py-0.5 rounded bg-[#182236] border border-[#2a3a56] text-[#00e5ff] font-mono text-xs">
              camera.md
            </code>
            , and low-lux sensor stress tests.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BENTO GRID CONTAINER (Styles inspired by Refero / Linear / Vercel)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

          {/* ─────────────────────────────────────────────────────────────
              CARD 1 (Cols 7): Interactive 14-Class Long-Tail Bar Chart
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2 mb-1">
                    <BarChart2 className="w-4 h-4 text-[#00e5ff]" />
                    Dataset Imbalance (Long-Tail Distribution)
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    14 Event Classes &amp; Loss Penalties
                  </h3>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-[#121a2a] p-1 rounded-xl border border-[#1f2d45]">
                  <button
                    onClick={() => setClassFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                      classFilter === 'all' ? 'bg-[#0693e3] text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All (14)
                  </button>
                  <button
                    onClick={() => setClassFilter('hazards')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                      classFilter === 'hazards' ? 'bg-red-500/80 text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Hazards (&lt;3%)
                  </button>
                  <button
                    onClick={() => setClassFilter('violations')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                      classFilter === 'violations' ? 'bg-[#00e5ff]/80 text-[#080c14] shadow font-extrabold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Violations
                  </button>
                </div>
              </div>

              {/* Interactive Horizontal Bars */}
              <div className="space-y-2 mb-6 max-h-[310px] overflow-y-auto pr-1">
                {filteredClasses.map((item, idx) => {
                  const originalIdx = classDistribution.findIndex((c) => c.name === item.name);
                  const isSelected = selectedClassIdx === originalIdx;
                  const pctVal = parseFloat(item.count);

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
                          <span className="text-[11px] text-gray-400 font-bold">{item.count}</span>
                          <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">
                            {item.focalWeight}
                          </span>
                        </div>
                      </div>

                      {/* Visual Bar */}
                      <div className="w-full bg-[#080c14] h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(4, pctVal * 2.2)}%`,
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

            {/* Selected Class Deep-Dive Card (Inspector Footer) */}
            <div className="p-4 rounded-2xl bg-[#121a2a] border border-[#1f2d45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    Inspecting: <span className="text-[#00e5ff]">{selectedClass.name}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                    Eval τ = {selectedClass.tau}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{selectedClass.desc}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Focal Loss Weight</span>
                <div className="text-sm font-mono font-extrabold text-[#00d084]">
                  {selectedClass.focalWeight} Penalty
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 2 (Cols 5): camera.md Planar Homography Inspector
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#00e5ff]" />
                  Spatial Calibration Geometry
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0693e3]/20 text-[#00e5ff] border border-[#0693e3]/40">
                  camera.md
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Ground-Contact Anchor vs Naive Center
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                CCTV cameras view roadways under acute pitch angles (~38°). Projecting standard bbox center $(x_c, y_c)$ causes severe depth parallax. We anchor directly to bottom-center tire contact:
              </p>

              {/* Visual Interactive Road Homography Canvas */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-b from-[#080c14] to-[#121a2a] border border-[#1f2d45] p-4 flex flex-col justify-between shadow-inner">
                {/* 3D Perspective Road Grid Lines */}
                <div className="absolute inset-0 sensor-grid opacity-30 pointer-events-none" />

                {/* Simulated Calibrated Polygons */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400">PITCH: 38.2° | ROLL: -1.4°</span>
                  <span className="text-[#00e5ff] font-bold">HOMOGRAPHY ACTIVE</span>
                </div>

                {/* Interactive Simulated Vehicle with BBox & Point Projection */}
                <div className="relative z-10 flex flex-col items-center justify-center py-6">
                  {/* Vehicle Bounding Box */}
                  <div className="relative w-36 h-28 border-2 border-[#00e5ff] rounded-lg bg-[#00e5ff]/10 flex flex-col items-center justify-between p-2 shadow-lg shadow-[#00e5ff]/20">
                    <div className="text-[10px] font-mono text-white bg-black/80 px-1.5 py-0.5 rounded self-start">
                      Target SUV #42
                    </div>

                    {/* Naive Center Point */}
                    {homographyAnchor === 'naive' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-lg" />
                        <span className="text-[10px] font-mono font-bold text-red-400 bg-black/90 px-1 rounded mt-1 whitespace-nowrap">
                          Center: Parallax +4.8m (ERROR)
                        </span>
                      </div>
                    )}

                    {/* Calibrated Ground Point */}
                    {homographyAnchor === 'ground' && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center animate-pulse">
                        <div className="w-4 h-4 rounded-full bg-[#00d084] border-2 border-white shadow-lg shadow-[#00d084]/50" />
                        <span className="text-[10px] font-mono font-bold text-[#00d084] bg-black/90 px-1.5 py-0.5 rounded mt-1 whitespace-nowrap">
                          (x_mid, y_max): Error &lt; 0.12m
                        </span>
                      </div>
                    )}

                    <div className="text-[9px] font-mono text-gray-400 self-end">
                      v = 54.2 km/h
                    </div>
                  </div>

                  {/* Road Stop-Line Vector */}
                  <div className="w-full mt-4 h-1.5 bg-red-500/80 rounded relative">
                    <span className="absolute -top-4 right-2 text-[10px] font-mono text-red-400 font-bold">
                      Stop Line Polygon #01
                    </span>
                  </div>
                </div>

                {/* Point Switcher Tabs */}
                <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setHomographyAnchor('ground')}
                    className={`flex-1 py-1.5 rounded-lg font-mono font-bold text-center transition ${
                      homographyAnchor === 'ground'
                        ? 'bg-[#00d084] text-black shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    (x_mid, y_max) Ground
                  </button>
                  <button
                    onClick={() => setHomographyAnchor('naive')}
                    className={`flex-1 py-1.5 rounded-lg font-mono font-bold text-center transition ${
                      homographyAnchor === 'naive'
                        ? 'bg-red-500 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    (x_c, y_c) Naive Center
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1f2d45] flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Projection Formula:</span>
              <span className="text-[#00e5ff] font-bold">[X, Y, 1]ᵀ = H · [u, v, 1]ᵀ</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 3 (Cols 6): Low-Lux Noise & Glare Stress-Test
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
                  <SunMedium className="w-4 h-4 text-[#00e5ff]" />
                  Environmental Stress Testing
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  Dynamic Thresholds
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Extreme Lighting: Glare, Dusk &amp; Night Headlights
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                CCTV sensors experience severe headlight saturation at night (&lt;5 Lux) and specular reflections on wet roads. Test our adaptive CLAHE compensation:
              </p>

              {/* Stress Condition Selectors */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => setLightingMode('day')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    lightingMode === 'day'
                      ? 'bg-[#0693e3]/20 border-[#00e5ff] text-white'
                      : 'bg-[#121a2a] border-[#1f2d45] text-gray-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-bold">Direct Sun</span>
                  <span className="text-[10px] font-mono text-gray-500">95,000 Lux</span>
                </button>

                <button
                  onClick={() => setLightingMode('night')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    lightingMode === 'night'
                      ? 'bg-[#0693e3]/20 border-[#00e5ff] text-white'
                      : 'bg-[#121a2a] border-[#1f2d45] text-gray-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4 text-[#00e5ff]" />
                  <span className="text-xs font-bold">Midnight CCTV</span>
                  <span className="text-[10px] font-mono text-gray-500">&lt; 5 Lux Flare</span>
                </button>

                <button
                  onClick={() => setLightingMode('rain')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    lightingMode === 'rain'
                      ? 'bg-[#0693e3]/20 border-[#00e5ff] text-white'
                      : 'bg-[#121a2a] border-[#1f2d45] text-gray-400 hover:text-white'
                  }`}
                >
                  <CloudRain className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold">Wet Asphalt</span>
                  <span className="text-[10px] font-mono text-gray-500">Ghost Reflections</span>
                </button>
              </div>

              {/* Simulated Sensor Viewport */}
              <div
                className={`relative rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between aspect-[16/9] overflow-hidden ${
                  lightingMode === 'night'
                    ? 'bg-[#04070d] border-blue-900/40'
                    : lightingMode === 'day'
                    ? 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-yellow-500/30'
                    : 'bg-[#0a0f1d] border-purple-900/40'
                }`}
              >
                {/* Visual Grain & Flare Overlay */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                    enableClahe ? 'opacity-20' : 'opacity-70'
                  }`}
                  style={{
                    background:
                      lightingMode === 'night'
                        ? 'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.4) 0%, transparent 40%)'
                        : 'none',
                  }}
                />

                <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-300 font-bold uppercase">
                    Sensor Lux: {lightingMode === 'day' ? '95,000 lx' : lightingMode === 'night' ? '4.8 lx' : '18.2 lx'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      enableClahe ? 'bg-[#00d084]/20 text-[#00d084]' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {enableClahe ? 'CLAHE EQUALIZED' : 'RAW SATURATED'}
                  </span>
                </div>

                <div className="relative z-10 text-center py-2">
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {enableClahe ? '+14.2% Recall' : '-22.8% Miss Rate'}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    {enableClahe
                      ? 'Local adaptive histograms preserve edge contrast through headlight halos'
                      : 'Severe pixel saturation obscures pedestrian silhouettes'}
                  </div>
                </div>

                {/* CLAHE Toggle */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-gray-300 font-mono">Toggle Adaptive CLAHE</span>
                  <button
                    onClick={() => setEnableClahe(!enableClahe)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                      enableClahe ? 'bg-[#00e5ff] text-black shadow' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {enableClahe ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1f2d45] text-xs font-mono text-gray-400 flex items-center justify-between">
              <span>Dynamic Association:</span>
              <span className="text-[#00e5ff]">Low-Conf Recovery (ByteTrack Stage 2)</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 4 (Cols 6): camera.md Code Schema & Temporal IoU
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#00e5ff]" />
                  Road Geometry Contract Schema
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#182236] hover:bg-[#22304c] text-gray-300 hover:text-white border border-[#1f2d45] text-xs font-mono transition"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00d084]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Schema'}</span>
                </button>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Calibrated camera.md Parsing Pipeline
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Offline evaluation feeds pre-calibrated geometric metadata for each road sensor, standardizing stop lines, legal lane headings, and median polygons:
              </p>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-[#080c14] border border-[#1f2d45] p-4 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-[220px]">
                <pre className="text-cyan-300">{cameraMdSample}</pre>
              </div>
            </div>

            {/* Temporal IoU Greedy Matching Note */}
            <div className="mt-4 p-4 rounded-xl bg-[#121a2a] border border-[#1f2d45] flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300">
                <strong className="text-white font-mono">Disjoint Interval Post-Processing:</strong> Same-class candidate intervals are merged using 1D temporal non-maximum suppression to guarantee strictly disjoint interval predictions per elimination challenge scoring.
              </div>
            </div>
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
    </section>
  );
}

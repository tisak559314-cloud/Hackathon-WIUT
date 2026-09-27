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
  Maximize2,
  X,
  ChevronRight,
  Info,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { EDA_FINDINGS_RU } from '../data/samplesConfig';

export default function AcademicResearch() {
  // Class Distribution Interactive State
  const [selectedClassIdx, setSelectedClassIdx] = useState(0); // Default to 'failure_to_yield' (most frequent in GT)
  const [classFilter, setClassFilter] = useState('all'); // all, frequent, rare

  // Lighting & Noise Stress-Test State
  const [lightingMode, setLightingMode] = useState('night'); // day, night, rain
  const [enableClahe, setEnableClahe] = useState(true);

  // SIFT + RANSAC Registration Point Inspector State
  const [homographyAnchor, setHomographyAnchor] = useState('ground'); // ground (bottom-center) vs naive (center)
  const [copiedCode, setCopiedCode] = useState(false);

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

  // Real SIFT + RANSAC Scene Registration & Reference Polygon Schema
  const registrationSnippet = `# Real Camera Registration Pipeline (WestCV v1.0.0)
# NOTE: camera.md was NOT provided by organizers!
# We engineered SIFT + RANSAC matching against a canonical reference view (C3896)
# to eliminate 50–100 px physical camera drift between day and evening recordings.

class SceneRegistrator:
    def __init__(self, ref_frame_path="ref_scene_C3896.jpg"):
        self.sift = cv2.SIFT_create(nfeatures=5000)
        self.ref_kp, self.ref_des = self.sift.detectAndCompute(ref_img, None)
        
    def compute_homography(self, frame_bgr):
        kp, des = self.sift.detectAndCompute(frame_bgr, None)
        matches = self.flann.knnMatch(des, self.ref_des, k=2)
        good = [m for m, n in matches if m.distance < 0.75 * n.distance]
        # Daytime: 4,133 inliers | Evening (C3905): 338 inliers (sufficient for RANSAC)
        H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
        return H  # Affine/Homography to Canonical Scene Geometry

# Canonical Scene Geometry Polygons (calibrated in CVAT on reference frame):
CANONICAL_ZONES = {
    "zebra_1": [(280, 890), (620, 880), (640, 940), (270, 950)],
    "zebra_3": [(1120, 820), (1480, 815), (1510, 875), (1110, 880)],
    "stop_line_4": [(320, 785), (780, 780)],
    "traffic_light_head_7": [(412, 198), (426, 235)] # Pixel ROI for Red/Yellow/Green
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(registrationSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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
                    Real Dataset Ground Truth (CVAT Labels)
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    108 Events in 18.4 min Normal Traffic
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
                    onClick={() => setClassFilter('frequent')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                      classFilter === 'frequent' ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Observed ({classDistribution.filter(c => c.count > 0).length})
                  </button>
                  <button
                    onClick={() => setClassFilter('rare')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                      classFilter === 'rare' ? 'bg-amber-500/80 text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    0 in Footage (5)
                  </button>
                </div>
              </div>

              {/* Interactive Horizontal Bars */}
              <div className="space-y-2 mb-6 max-h-[310px] overflow-y-auto pr-1">
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
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    Inspecting: <span className="text-[#00e5ff]">{selectedClass.name}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                    GT Count: {selectedClass.count}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{selectedClass.desc}</p>
              </div>

              <div className="text-right shrink-0">
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
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-b from-[#080c14] to-[#121a2a] border border-[#1f2d45] p-4 flex flex-col justify-between shadow-inner">
                {/* 3D Perspective Road Grid Lines */}
                <div className="absolute inset-0 sensor-grid opacity-30 pointer-events-none" />

                {/* Simulated Calibrated Polygons */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400">SHIFT: Δx≈-74px, Δy≈+42px</span>
                  <span className="text-emerald-400 font-bold">RANSAC REGISTERED</span>
                </div>

                {/* Interactive Simulated Vehicle with BBox & Point Projection */}
                <div className="relative z-10 flex flex-col items-center justify-center py-6">
                  {/* Vehicle Bounding Box */}
                  <div className="relative w-36 h-28 border-2 border-[#00e5ff] rounded-lg bg-[#00e5ff]/10 flex flex-col items-center justify-between p-2 shadow-lg shadow-[#00e5ff]/20">
                    <div className="text-[10px] font-mono text-white bg-black/80 px-1.5 py-0.5 rounded self-start">
                      Vehicle #14 (C3905)
                    </div>

                    {/* Naive Center Point */}
                    {homographyAnchor === 'naive' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-lg" />
                        <span className="text-[10px] font-mono font-bold text-red-400 bg-black/90 px-1 rounded mt-1 whitespace-nowrap">
                          BBox Center: +4.8m Parallax Error
                        </span>
                      </div>
                    )}

                    {/* Calibrated Ground Point */}
                    {homographyAnchor === 'ground' && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center animate-pulse">
                        <div className="w-4 h-4 rounded-full bg-[#00d084] border-2 border-white shadow-lg shadow-[#00d084]/50" />
                        <span className="text-[10px] font-mono font-bold text-[#00d084] bg-black/90 px-1.5 py-0.5 rounded mt-1 whitespace-nowrap">
                          Ground Contact (x_mid, y_max): &lt;0.1m
                        </span>
                      </div>
                    )}

                    <div className="text-[9px] font-mono text-gray-400 self-end">
                      H · p_ground
                    </div>
                  </div>

                  {/* Road Stop-Line Vector */}
                  <div className="w-full mt-4 h-1.5 bg-red-500/80 rounded relative">
                    <span className="absolute -top-4 right-2 text-[10px] font-mono text-red-400 font-bold">
                      Stop Line 4 (Canonical View)
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
                    (x_mid, y_max) Ground Anchor
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
              <span>SIFT Inliers (Day / Dusk):</span>
              <span className="text-[#00e5ff] font-bold">4,133 (Noon) / 338 (Dusk)</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 3 (Cols 6): Low-Lux Noise & Glare Stress-Test (C3905 43 Lux)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
                  <SunMedium className="w-4 h-4 text-[#00e5ff]" />
                  Lighting &amp; Contrast Stress Testing
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  C3905 Dusk Lux: 43/255
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Dusk Headlight Halos &amp; Low-Lux Shadows
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                In recording C3905 (17:22:21), ambient light drops to 43/255 lux with bright vehicle headlights saturating the camera sensor. Test adaptive CLAHE normalization on detection recall:
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
                  <span className="text-xs font-bold">C3896 Midday</span>
                  <span className="text-[10px] font-mono text-gray-500">96 Lux (Sunny)</span>
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
                  <span className="text-xs font-bold">C3905 Dusk</span>
                  <span className="text-[10px] font-mono text-gray-500">43 Lux (Halos)</span>
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
                  <span className="text-xs font-bold">C3902 Sunset</span>
                  <span className="text-[10px] font-mono text-gray-500">63 Lux (Shadows)</span>
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
                    Sample Lux: {lightingMode === 'day' ? '96/255' : lightingMode === 'night' ? '43/255' : '63/255'}
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
                    {enableClahe ? '97% Person Recall' : '-18% Dark Miss Rate'}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    {enableClahe
                      ? 'Local adaptive histograms preserve pedestrian contrast against headlight glare'
                      : 'Headlight halos conceal crossing pedestrian silhouettes on zebra 3'}
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
              <span>Driver-in-Vehicle Filter:</span>
              <span className="text-[#00e5ff]">Eliminates 2.2%–5.6% false pedestrian boxes</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 4 (Cols 6): Registration Code & Disjoint Intervals
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00e5ff]/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#00e5ff]" />
                  SIFT Registration &amp; Geometry Engine
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#182236] hover:bg-[#22304c] text-gray-300 hover:text-white border border-[#1f2d45] text-xs font-mono transition"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00d084]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Canonical Geometry Transformation
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Since <code className="text-[#00e5ff]">camera.md</code> was absent, our pipeline computes the SIFT+RANSAC homography matrix $H$ and warps scene polygons onto incoming video frames:
              </p>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-[#080c14] border border-[#1f2d45] p-4 font-mono text-[11px] text-gray-300 overflow-x-auto max-h-[220px]">
                <pre className="text-cyan-300">{registrationSnippet}</pre>
              </div>
            </div>

            {/* Disjoint interval explanation */}
            <div className="mt-4 p-4 rounded-xl bg-[#121a2a] border border-[#1f2d45] flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300">
                <strong className="text-white font-mono">Disjoint Interval Post-Processing:</strong> Rubric penalizes overlapping predictions for the same class with instant 0.0 IoU. Our pipeline enforces strict 1D temporal NMS, merging contiguous violations before output formatting.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION: INTERACTIVE EDA FIGURES GALLERY (6 REAL CHARTS)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="mb-16 rounded-3xl bg-[#0c121e] border border-[#1f2d45] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f2d45] mb-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-[#00e5ff]" />
                Dataset Exploration Figures
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Interactive Analytical Plots &amp; Visualizations
              </h3>
            </div>

            {/* Tabs for EDA plots */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {edaCharts.map((chart, idx) => (
                <button
                  key={chart.id}
                  onClick={() => setActiveEdaTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                    activeEdaTab === idx
                      ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                      : 'bg-[#121a2a] text-gray-400 hover:text-white border border-[#1f2d45]'
                  }`}
                >
                  {chart.title}
                </button>
              ))}
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
            {EDA_FINDINGS_RU.map((finding, idx) => (
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

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Video,
  ShieldAlert,
  Maximize2,
  Volume2,
  VolumeX,
  Terminal,
} from 'lucide-react';

const benchmarkVideo = {
  id: 'sample1',
  title: 'Cam #01: Official C3905 Full Model Inference',
  location: 'WestCV Intersection C3905 (1080p @ 25 FPS)',
  src: '/ft.mp4',
  badge: 'Official Elimination Demo',
  badgeColor: 'text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/30',
  description: 'Full end-to-end model pipeline inference on the official benchmark video C3905. Shows burned-in multi-class tracking, road geometry violations (stop-line, crosswalk), traffic signal states, and timeline.',
  events: [
    { time: 1.0, label: 'stopped_vehicle', track: 'White Car #08', conf: 0.98, desc: 'Stationary on carriageway > 10s outside signal queue', type: 'warning' },
    { time: 6.0, label: 'jaywalking', track: 'Pedestrian #04', conf: 0.95, desc: 'Pedestrian stepped on carriageway outside crosswalk', type: 'danger' },
    { time: 14.5, label: 'stop_line', track: 'White Sedan #22', conf: 0.97, desc: 'Vehicle stopped past stop line on red signal', type: 'danger' },
    { time: 31.0, label: 'failure_to_yield', track: 'Minivan #09', conf: 0.92, desc: 'Vehicle passing through crosswalk with active pedestrian', type: 'critical' },
    { time: 48.0, label: 'solid_line', track: 'Car #17', conf: 0.94, desc: 'Vehicle crossed continuous solid line before stop bar', type: 'warning' },
    { time: 72.0, label: 'red_light', track: 'Taxi #31', conf: 0.99, desc: 'Breached stop-line and crossed intersection on RED signal', type: 'critical' },
    { time: 85.0, label: 'congestion', track: 'Approach 1 Lanes', conf: 0.93, desc: 'Dense queue stationary > 20s across direction', type: 'warning' },
  ],
  getRisk: (t) => {
    if (t < 25.0) return 0.20 + (t / 25.0) * 0.15;
    if (t < 40.0) return 0.35 + ((t - 25.0) / 15.0) * 0.45;
    if (t < 75.0) return 0.30 + ((t - 40.0) / 35.0) * 0.55;
    return 0.35;
  },
};

export default function LiveDemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Keyboard shortcut listener: Spacebar toggles playback
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing into input, textarea, or contenteditable
      const target = e.target;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      // Check if modal dialog is open
      if (document.body.style.overflow === 'hidden') {
        return;
      }

      if (e.code === 'Space' || e.key === ' ' || e.keyCode === 32) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const seekTo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const currentRisk = benchmarkVideo.getRisk(currentTime);
  const isCriticalRisk = currentRisk >= 0.70;

  return (
    <section id="technology" className="py-24 bg-[#0a0f19] relative border-t border-[#1f2d45] overflow-hidden">
      {/* High-tech Cyber Grid & Ambient Radial Spotlights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2d451a_1px,transparent_1px),linear-gradient(to_bottom,#1f2d451a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#00e5ff]/10 via-[#0693e3]/8 to-[#9b51e0]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0693e3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121a2a]/90 border border-[#00e5ff]/30 text-xs font-mono uppercase tracking-widest text-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            BENCHMARK RUNNER // TESLA T4 FP16 // C3905 DATASET
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            OFFICIAL CCTV BENCHMARK DEMO
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent rounded-full" />

          <p className="text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Full end-to-end model pipeline inference on the official benchmark video C3905. Demonstrating multi-class tracking (YOLO26m + ByteTrack), road geometry boundary checks (stop-line, crosswalk), traffic signal states, and causal accident anticipation curves on Tesla T4.
          </p>
        </div>

        {/* Main Video Viewport / Console */}
        <div className="w-full max-w-5xl mx-auto">
          {/* Glowing Ambient Halo behind the console */}
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00e5ff]/25 via-[#0693e3]/20 to-[#9b51e0]/25 rounded-[26px] blur-xl opacity-60 group-hover:opacity-90 transition duration-700 pointer-events-none" />

            {/* Hardware Console Outer Frame */}
            <div className="relative rounded-3xl bg-[#0c121e]/90 backdrop-blur-xl border border-[#00e5ff]/30 p-2 shadow-2xl">
              {/* Top Chrome Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 mb-2 bg-[#080c14]/90 rounded-2xl border border-white/5">
                {/* Left Mac/Terminal Dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e] shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123] shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29] shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
                  <span className="ml-2 text-[11px] font-mono font-medium text-gray-400 hidden sm:inline">
                    C3905_INFERENCE_PIPELINE.SESSION
                  </span>
                </div>

                {/* Center Badge / Active Engine */}
                <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#121a2a] border border-[#00e5ff]/20 text-[10px] font-mono text-[#00e5ff]">
                  <Terminal className="w-3 h-3" />
                  <span>YOLO26m (NMS-Free) + ByteTrack</span>
                </div>

                {/* Right Engine Status */}
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold">LIVE REC</span>
                  </span>
                  <span className="text-gray-600 hidden md:inline">|</span>
                  <span className="text-gray-400 hidden md:inline">TESLA T4 FP16</span>
                </div>
              </div>

              {/* Video Screen Container */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video group/screen">
                {/* Precision HUD Corner Reticles */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00e5ff]/70 pointer-events-none z-20" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#00e5ff]/70 pointer-events-none z-20" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#00e5ff]/70 pointer-events-none z-20" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00e5ff]/70 pointer-events-none z-20" />

                {/* HTML5 Video element */}
                <video
                  ref={videoRef}
                  src={benchmarkVideo.src}
                  className="w-full h-full object-cover"
                  playsInline
                  muted={isMuted}
                  loop
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={togglePlay}
                />

                {/* Top-Left Watermark Badge */}
                <div className="absolute top-5 left-5 z-20 flex flex-col gap-1 pointer-events-none">
                  <div className="flex items-center gap-2 bg-[#080c14]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 text-xs font-mono shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-white tracking-wide">CCTV C3905</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-[#00e5ff] font-semibold">{benchmarkVideo.location}</span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 bg-black/70 backdrop-blur px-2.5 py-0.5 rounded-md border border-white/5 w-max">
                    HOMOGRAPHY: camera.md (CALIBRATED)
                  </div>
                </div>

                {/* Top-Right Risk Indicator Pill */}
                <div className="absolute top-5 right-5 z-20 pointer-events-none">
                  <div
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${
                      isCriticalRisk
                        ? 'bg-red-500/30 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                        : 'bg-[#080c14]/85 border-[#00e5ff]/30 text-gray-200'
                    }`}
                  >
                    <ShieldAlert
                      className={`w-4 h-4 ${isCriticalRisk ? 'text-red-400' : 'text-[#00e5ff]'}`}
                    />
                    <div className="text-xs font-mono">
                      <span className="font-bold uppercase tracking-wider text-gray-400">Risk R(t): </span>
                      <span
                        className={`font-black ${
                          isCriticalRisk ? 'text-red-300' : 'text-[#00e5ff]'
                        }`}
                      >
                        {(currentRisk * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center "RESUME" Button Overlay on Pause */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] flex flex-col items-center justify-center gap-4 z-20 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.currentTarget.blur();
                        togglePlay();
                      }}
                      className="group inline-flex items-center gap-3.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#00cce6] hover:from-[#00cce6] hover:to-[#0582ca] text-[#080c14] font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(0,229,255,0.45)] hover:shadow-[0_0_50px_rgba(0,229,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/30"
                      aria-label="Resume playback"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#080c14] flex items-center justify-center text-[#00e5ff] group-hover:scale-110 transition-transform shadow-inner">
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                      <span className="text-base tracking-widest font-black text-[#080c14]">RESUME PLAYBACK</span>
                    </button>
                    <p className="text-xs text-gray-300 font-mono tracking-wide px-4 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2">
                      <span>Press</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/20 text-[#00e5ff] font-bold border border-white/20 shadow">SPACE</kbd>
                      <span>or click to toggle playback</span>
                    </p>
                  </div>
                )}

                {/* Floating Glassmorphic Video Controls at Bottom */}
                <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 bg-[#080c14]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:p-4 flex flex-col gap-2.5 z-20 shadow-2xl">
                  {/* Scrubbable Progress Bar */}
                  <div
                    className="relative w-full h-2.5 bg-white/15 rounded-full cursor-pointer hover:h-3 transition-all group/bar"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      seekTo(pos * (duration || 1));
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#2ea3f2] rounded-full shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                      style={{ width: `${((currentTime / (duration || 1)) * 100).toFixed(2)}%` }}
                    />
                    {/* Scrub Head */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_#00e5ff] -translate-x-1/2 pointer-events-none opacity-0 group-hover/bar:opacity-100 transition-opacity"
                      style={{ left: `${((currentTime / (duration || 1)) * 100).toFixed(2)}%` }}
                    />
                    {/* Event markers on seekbar */}
                    {benchmarkVideo.events.map((ev, eIdx) => {
                      const pct = duration ? (ev.time / duration) * 100 : 0;
                      return (
                        <div
                          key={eIdx}
                          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-black transform -translate-x-1/2 transition-transform hover:scale-125 ${
                            ev.type === 'danger' || ev.type === 'critical'
                              ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                              : 'bg-[#ffaa00] shadow-[0_0_8px_rgba(255,170,0,0.8)]'
                          }`}
                          style={{ left: `${pct}%` }}
                          title={`${ev.label} at ${ev.time}s`}
                        />
                      );
                    })}
                  </div>

                  {/* Control Buttons & Timestamps */}
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          togglePlay();
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          restartVideo();
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition"
                        aria-label="Restart"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          setIsMuted(!isMuted);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00e5ff]" />}
                      </button>
                      <span className="font-mono text-[11px] text-gray-300 ml-1">
                        {currentTime.toFixed(1)}s <span className="text-gray-600">/</span> {(duration || 0).toFixed(1)}s
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-400 font-mono hidden sm:inline bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                        <span className="text-emerald-400 font-bold">25.0 FPS</span> <span className="text-gray-600">|</span> 28.4ms
                      </span>
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          if (videoRef.current?.requestFullscreen) {
                            videoRef.current.requestFullscreen();
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Under-Console Telemetry & Spec Ribbon */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#00e5ff] font-bold text-[10px]">SPACE</kbd>
              <span>Play / Pause</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
              <span className="text-gray-300">Detector:</span>
              <span className="text-[#00e5ff] font-semibold">YOLO26m (NMS-free)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0693e3]" />
              <span className="text-gray-300">Tracker:</span>
              <span className="text-white font-semibold">ByteTrack</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-gray-300">Target GPU:</span>
              <span className="text-emerald-400 font-semibold">Tesla T4 (&lt;5 GB VRAM)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

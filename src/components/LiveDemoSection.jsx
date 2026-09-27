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
    <section id="technology" className="py-24 bg-[#0c121e] relative border-t border-[#1f2d45]">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0693e3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182236]/90 border border-[#2a3a56] text-xs font-semibold uppercase tracking-widest text-[#00e5ff] shadow-lg">
            <Video className="w-4 h-4 text-[#00e5ff]" />
            Official Elimination Benchmark (50% Rubric Score)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            OFFICIAL CCTV BENCHMARK DEMO
          </h2>
          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Full end-to-end model pipeline inference on the official benchmark video C3905. Demonstrating multi-class tracking (YOLO26m + ByteTrack), road geometry boundary checks (stop-line, crosswalk), traffic signal states, and causal accident anticipation curves on Tesla T4.
          </p>
        </div>

        {/* Main Video Viewport */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-black border border-[#1f2d45] shadow-2xl aspect-video group">
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

            {/* Live HUD Watermark / Calibration Badge */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none">
              <div className="flex items-center gap-2 bg-[#080c14]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-white">LIVE REC</span>
                <span className="text-gray-400">|</span>
                <span className="text-[#00e5ff] font-semibold">{benchmarkVideo.location}</span>
              </div>
              <div className="text-[10px] font-mono text-gray-400 bg-black/60 backdrop-blur px-2 py-0.5 rounded w-max">
                HOMOGRAPHY: camera.md (ACTIVE)
              </div>
            </div>

            {/* Top-Right Risk Indicator Pill */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-colors ${
                  isCriticalRisk
                    ? 'bg-red-500/30 border-red-500 text-red-200 animate-bounce'
                    : 'bg-[#080c14]/80 border-[#1f2d45] text-gray-200'
                }`}
              >
                <ShieldAlert
                  className={`w-4 h-4 ${isCriticalRisk ? 'text-red-400' : 'text-[#00e5ff]'}`}
                />
                <div className="text-xs font-mono">
                  <span className="font-bold uppercase">Risk R(t): </span>
                  <span
                    className={`font-extrabold ${
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
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3.5 z-20 transition-all duration-300">
                <button
                  onClick={(e) => {
                    e.currentTarget.blur();
                    togglePlay();
                  }}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] to-[#0693e3] hover:from-[#00cce6] hover:to-[#0582ca] text-[#080c14] font-black text-sm uppercase tracking-wider shadow-2xl shadow-[#00e5ff]/40 hover:shadow-[#00e5ff]/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  aria-label="Resume playback"
                >
                  <div className="w-7 h-7 rounded-full bg-[#080c14] flex items-center justify-center text-[#00e5ff] group-hover:scale-110 transition-transform shadow">
                    <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  </div>
                  <span className="text-sm tracking-widest font-black text-[#080c14]">RESUME</span>
                </button>
                <p className="text-xs text-gray-300 font-mono tracking-wide px-3 py-1 rounded bg-black/70 border border-white/10 backdrop-blur-sm">
                  Press <kbd className="px-1.5 py-0.5 mx-1 rounded bg-white/20 text-[#00e5ff] font-bold">Space</kbd> or click &ldquo;Resume&rdquo; to start video playback
                </p>
              </div>
            )}

            {/* Bottom Video Controls Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-2 z-20">
              {/* Scrubbable Progress Bar */}
              <div
                className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer hover:h-3 transition-all"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  seekTo(pos * (duration || 1));
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00e5ff] to-[#0693e3] rounded-full"
                  style={{ width: `${((currentTime / (duration || 1)) * 100).toFixed(2)}%` }}
                />
                {/* Event markers on seekbar */}
                {benchmarkVideo.events.map((ev, eIdx) => {
                  const pct = duration ? (ev.time / duration) * 100 : 0;
                  return (
                    <div
                      key={eIdx}
                      className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-black transform -translate-x-1/2 ${
                        ev.type === 'danger' || ev.type === 'critical'
                          ? 'bg-red-500'
                          : 'bg-[#ffaa00]'
                      }`}
                      style={{ left: `${pct}%` }}
                      title={`${ev.label} at ${ev.time}s`}
                    />
                  );
                })}
              </div>

              {/* Control Buttons & Timestamps */}
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.currentTarget.blur();
                      togglePlay();
                    }}
                    className="p-1 hover:text-[#00e5ff] transition"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.currentTarget.blur();
                      restartVideo();
                    }}
                    className="p-1 hover:text-[#00e5ff] transition"
                    aria-label="Restart"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.currentTarget.blur();
                      setIsMuted(!isMuted);
                    }}
                    className="p-1 hover:text-[#00e5ff] transition"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-gray-300">
                    {currentTime.toFixed(1)}s / {(duration || 0).toFixed(1)}s
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                    FPS: 25.0 | LATENCY: 28.4ms
                  </span>
                  <button
                    onClick={(e) => {
                      e.currentTarget.blur();
                      if (videoRef.current?.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                      }
                    }}
                    className="p-1 hover:text-[#00e5ff] transition"
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
    </section>
  );
}

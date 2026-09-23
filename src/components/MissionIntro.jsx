import React, { useRef, useEffect } from 'react';
import { Eye, Zap, Cpu, Sparkles } from 'lucide-react';

export default function MissionIntro() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="intro" className="relative py-24 bg-[#080c14] border-t border-b border-[#1f2d45] overflow-hidden">
      {/* Background Event Stream Video Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-35 sm:opacity-40 filter brightness-110 contrast-125 scale-105 transition-opacity duration-700"
        >
          <source src="/videos/metavision-mosaic.mp4" type="video/mp4" />
        </video>

        {/* Cybernetic Dark Vignette & Gradient Overlays for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-[#080c14]/70 to-[#080c14]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,147,227,0.08)_0%,_rgba(8,12,20,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182236]/90 backdrop-blur-md border border-[#2a3a56] text-xs font-semibold uppercase tracking-widest text-[#00e5ff] shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            ELIMINATION TASK • ROAD CCTV MONITORING
          </div>

          {/* Section Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight max-w-3xl leading-tight drop-shadow-md">
            AUTONOMOUS TRAFFIC <span className="text-[#0693e3]">PERCEPTION</span>
          </h2>

          {/* Lead Paragraph matching Prophesee exactly */}
          <p className="text-lg sm:text-2xl text-gray-200 font-light max-w-4xl leading-relaxed drop-shadow-sm">
            Processing fixed CCTV road camera video streams to detect, classify, and temporally segment every traffic incident into{' '}
            <strong className="font-semibold text-white">[start_sec, end_sec, label]</strong> intervals across{' '}
            <span className="text-[#00e5ff] font-medium">14 official event classes</span>, while causally raising alarms before accidents happen.
          </p>

          {/* 3 Key Principles with Glassmorphism Over the Video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 text-left">
            <div className="p-6 rounded-2xl bg-[#121a2a]/85 backdrop-blur-md border border-[#1f2d45]/90 hover:border-[#00e5ff]/50 hover:bg-[#121a2a]/95 transition-all duration-300 shadow-xl group">
              <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] mb-4 group-hover:scale-110 transition">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Part A: Event Detection</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Mandatory multi-class spatio-temporal segmentation. Evaluated on temporal IoU thresholds [0.3, 0.5, 0.7] across all 14 official event classes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121a2a]/85 backdrop-blur-md border border-[#1f2d45]/90 hover:border-[#0693e3]/50 hover:bg-[#121a2a]/95 transition-all duration-300 shadow-xl group">
              <div className="w-10 h-10 rounded-lg bg-[#0693e3]/15 border border-[#0693e3]/30 flex items-center justify-center text-[#0693e3] mb-4 group-hover:scale-110 transition">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Part B: Accident Anticipation</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Causal frame-by-frame streaming with a 5-second horizon (H = 5s). Predicts collision risk using vehicle trajectories, TTC, and sudden braking before impact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121a2a]/85 backdrop-blur-md border border-[#1f2d45]/90 hover:border-[#00d084]/50 hover:bg-[#121a2a]/95 transition-all duration-300 shadow-xl group">
              <div className="w-10 h-10 rounded-lg bg-[#00d084]/15 border border-[#00d084]/30 flex items-center justify-center text-[#00d084] mb-4 group-hover:scale-110 transition">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Offline GPU Benchmark</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Self-contained solution running offline on 1× NVIDIA T4 GPU within 3× video duration. Open weights (&le;5 GB) and zero external API dependencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

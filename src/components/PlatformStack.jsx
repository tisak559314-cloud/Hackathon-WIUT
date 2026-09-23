import React, { useEffect, useRef } from 'react';
import { Cpu, Camera, Code2, Wrench, ArrowRight, Check } from 'lucide-react';

function ReliableVideo({ src, className }) {
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
  }, [src]);

  return (
    <video
      ref={videoRef}
      key={src}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function PlatformStack() {
  const pillars = [
    {
      title: 'OBJECT DETECTION',
      tag: 'Layer 01 • Perception',
      icon: Camera,
      headline: 'YOLOv8 & RT-DETR Real-Time Road User Localization',
      description: 'High-speed object detector processing 25 FPS road CCTV footage to localize vehicles (car, bus, taxi, SUV), pedestrians, traffic lights, and road obstacles with tight bounding boxes.',
      video: '/object-detection-demo.mp4',
      image: '/cctv-traffic-detection.jpg',
      features: ['25 FPS real-time throughput on single T4 GPU', 'Pre-trained open weights under 5 GB package limit', 'Multi-class confidences (cars, pedestrians, lights)'],
      link: '#demo',
    },
    {
      title: 'MULTI-OBJECT TRACKING',
      tag: 'Layer 02 • Association',
      icon: Cpu,
      headline: 'ByteTrack Persistent Trajectory & Identity Engine',
      description: 'Associates detections across consecutive frames into smooth spatio-temporal trajectories with Kalman filtering, preserving vehicle tracks across brief occlusions and stops.',
      image: '/traffic-tracking.gif',
      position: 'object-bottom',
      features: ['Robust tracking through dense vehicle queues', 'Instant motion vector & velocity computation', 'Continuous tracklet history for causal reasoning'],
      link: '#demo',
    },
    {
      title: 'SPATIO-TEMPORAL RULE ENGINE',
      tag: 'Layer 03 • Semantics',
      icon: Code2,
      headline: 'camera.md Calibration & Precise Interval Segmentation',
      description: 'Maps trajectories against lane directions, stop-lines, solid markings, and pedestrian crossings to detect infractions and output exact [start_sec, end_sec, label] intervals.',
      image: '/lane-calibration.gif?v=loop',
      imageClass: 'scale-[1.24] origin-[70%_center] group-hover:scale-[1.28]',
      features: ['Non-overlapping same-class interval enforcement', 'Stop-line polygon & directional lane validation', 'Post-processed temporal boundary smoothing (IoU >= 0.7)'],
      link: '#academic',
    },
    {
      title: 'CAUSAL ACCIDENT FORECASTER',
      tag: 'Layer 04 • Part B Risk',
      icon: Wrench,
      headline: 'RiskEstimator.step() 5-Second Horizon Predictor',
      description: 'Causal online model evaluating Time-to-Collision (TTC), converging headings, and sudden deceleration curves to output continuous P(accident within 5s) in [0, 1].',
      video: '/predictive-safety-part1.mp4',
      image: '/cctv-traffic-detection.jpg',
      features: ['Strictly causal: step(frame, t_sec) -> float', 'Zero lookahead: past and present frames only', 'Optimized for chance-normalized AP, F1_alarm & mTTA'],
      link: '#technology',
    },
  ];

  return (
    <section id="platform" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
            PIPELINE ARCHITECTURE • WIUT HACKATHON 2026
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            SOLUTION PIPELINE
          </h2>
          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            From raw 25 FPS CCTV video to certified [start_sec, end_sec, label] traffic events and causal pre-accident risk curves.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#121a2a] border border-[#1f2d45] hover:border-[#0693e3]/50 transition-all duration-300 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between group hover:shadow-[#0693e3]/10"
              >
                <div>
                  {/* Card Header with Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182236] border border-[#2a3a56] text-xs font-semibold uppercase tracking-wider text-[#00e5ff]">
                      <Icon className="w-3.5 h-3.5" />
                      {pillar.tag}
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-500">0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#00e5ff] transition">
                    {pillar.title}
                  </h3>

                  <p className="text-sm font-medium text-gray-300 mb-3 min-h-[44px] flex items-center">
                    {pillar.headline}
                  </p>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6 min-h-[52px]">
                    {pillar.description}
                  </p>

                  {/* Hardware / Software Image Asset */}
                  <div className="relative w-full h-52 sm:h-64 rounded-2xl bg-[#090f1a] border border-[#1f2d45] flex items-center justify-center mb-6 overflow-hidden">
                    {pillar.video ? (
                      <ReliableVideo
                        src={pillar.video}
                        className={`w-full h-full object-cover ${pillar.position || 'object-center'} ${pillar.imageClass || 'group-hover:scale-105'} filter brightness-105 transition-transform duration-500`}
                      />
                    ) : (
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        loading="lazy"
                        className={`w-full h-full object-cover ${pillar.position || 'object-center'} ${pillar.imageClass || 'group-hover:scale-105'} filter brightness-105 transition-transform duration-500`}
                        onError={(e) => {
                          e.target.style.opacity = '0.7';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-2xl" />
                  </div>

                  {/* Bullets */}
                  <div className="space-y-2 mb-6 min-h-[72px]">
                    {pillar.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#00e5ff] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-4 border-t border-[#1f2d45] flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-mono">Offline Inference Ready</span>
                  <a
                    href={pillar.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0693e3] group-hover:text-[#00e5ff] transition"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

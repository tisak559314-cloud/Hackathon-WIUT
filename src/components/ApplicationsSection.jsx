import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, TrafficCone, GitFork, Footprints, ArrowRight, Check } from 'lucide-react';

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

export default function ApplicationsSection() {
  const [activeTab, setActiveTab] = useState('collisions');

  const tabs = [
    {
      id: 'collisions',
      label: 'COLLISIONS & NEAR MISSES',
      icon: AlertTriangle,
      title: 'Accident & Near-Miss Kinetic Incidents',
      video: '/accident-trimmed.mp4',
      image: '/cctv-traffic-detection.jpg',
      badge: 'Safety Critical • Part A & Part B',
      description:
        'Direct physical impacts and rapid collision-avoidance actions. High-priority events evaluated both in Part A temporal segmentation and Part B accident anticipation.',
      bullets: [
        'accident: Contact between two or more road users, or a road user and a fixed object',
        'Start: First frame where contact is visible | End: All involved objects stop or leave frame',
        'near_miss: Sharp braking or swerving to avoid collision with zero physical contact',
        'Evaluated across temporal IoU thresholds [0.3, 0.5, 0.7] using greedy bipartite matching',
      ],
      linkText: 'View Evaluation Rules',
    },
    {
      id: 'signals',
      label: 'SIGNALS & STOP VIOLATIONS',
      icon: TrafficCone,
      title: 'Intersection Control & Queue Stoppages',
      image: 'https://www.prophesee.ai/wp-content/uploads/2021/05/06_SpatterMonitoring-copia.jpg',
      badge: 'Traffic Signal & Flow Compliance',
      description:
        'Monitoring compliance at intersection boundaries using calibrated stop-line geometry from camera.md, combined with stationary duration counters.',
      bullets: [
        'red_light: Vehicle crosses stop line while signal is red (start: crossing stop line)',
        'stop_line: Vehicle stops past stop line on red without entering the intersection',
        'stopped_vehicle: Stationary on carriageway for 10s or more, not in a queue at signal',
        'congestion: Traffic at standstill or crawling across all lanes of a direction',
      ],
      linkText: 'Explore Signal Logic',
    },
    {
      id: 'maneuvers',
      label: 'LANE & MANEUVER VIOLATIONS',
      icon: GitFork,
      title: 'Directional Trajectories & Solid Line Crossings',
      image: 'https://www.prophesee.ai/wp-content/uploads/2024/05/Consumer-Applications.jpg',
      badge: 'Road Marking & Direction Compliance',
      description:
        'Matching vehicle trajectory vectors against allowed lane directions and designated turn lanes defined in camera.md.',
      bullets: [
        'wrong_way: Moving against traffic direction of lane, including driving in oncoming lane',
        'illegal_u_turn: U-turn where road markings or signs prohibit it (starts at vehicle turn)',
        'illegal_turn: Turning from wrong lane or in a prohibited direction',
        'solid_line_crossing: Lane change or manoeuvre across solid road markings',
      ],
      linkText: 'Explore Lane Geometry',
    },
    {
      id: 'hazards',
      label: 'PEDESTRIANS & ROAD HAZARDS',
      icon: Footprints,
      title: 'Pedestrian Safety & Environmental Road Hazards',
      image: 'https://downloads.prophesee.ai/website/2024/10/MicroMotion.png',
      badge: 'Vulnerable Road Users & Hazards',
      description:
        'Protecting pedestrians on and off crossings, identifying dropped obstacles on carriageways, and detecting vehicle fire or smoke incidents.',
      bullets: [
        'jaywalking: Pedestrian stepping onto the carriageway outside a designated crossing',
        'failure_to_yield: Vehicle drives through crossing while pedestrian is on/stepping onto it',
        'road_obstacle: Debris, animal, or fallen object appearing on the carriageway',
        'fire_smoke: Visible fire or smoke originating from a vehicle or on the roadway',
      ],
      linkText: 'Explore Hazard Logic',
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="applications" className="py-24 bg-[#0c121e] relative border-t border-[#1f2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff] mb-2">
            PART A • SPATIO-TEMPORAL ROAD EVENT CLASSIFICATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            14 OFFICIAL EVENT CLASSES
          </h2>
          <div className="w-16 h-1 bg-[#0693e3] mt-4 rounded-full" />
        </div>

        {/* Tab Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 border w-full text-center ${
                  isActive
                    ? 'bg-[#0693e3] border-[#2ea3f2] text-white shadow-lg shadow-[#0693e3]/25'
                    : 'bg-[#121a2a] border-[#1f2d45] text-gray-300 hover:text-white hover:bg-[#182236]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#00e5ff]'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Showcase Card */}
        <div className="rounded-3xl bg-[#121a2a] border border-[#1f2d45] overflow-hidden shadow-2xl p-6 sm:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182236] border border-[#2a3a56] text-xs font-semibold uppercase tracking-wider text-[#00e5ff]">
                {current.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {current.title}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              {/* Bullets */}
              <div className="space-y-3 pt-2">
                {current.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0693e3]/20 border border-[#0693e3]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#00e5ff]" />
                    </div>
                    <span className="text-sm text-gray-300">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href="#platform"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0693e3] hover:bg-[#0582ca] text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-[#0693e3]/20"
                >
                  <span>{current.linkText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Media Preview */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-[#1f2d45] bg-[#070b12] shadow-xl relative aspect-[4/3] group">
                {current.video ? (
                  <ReliableVideo
                    src={current.video}
                    className="w-full h-full object-cover filter brightness-95 contrast-110"
                  />
                ) : (
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-110"
                    onError={(e) => {
                      // Fallback visual if offline
                      e.target.style.opacity = '0.5';
                    }}
                  />
                )}
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
                  <span className="text-[#00e5ff] font-bold uppercase">{current.label}</span>
                  <span className="text-gray-300">IoU &tau; &isin; &#123;0.3, 0.5, 0.7&#125;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

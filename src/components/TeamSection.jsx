import React from 'react';
import { Users, Globe, Mail, Check, FolderGit2, Download, Award, ArrowUpRight } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.4 9.74V10.13H5.06v8.37h2.8z"/>
    </svg>
  );
}

export default function TeamSection() {
  const members = [
    {
      id: 'member-1',
      name: 'Azam Khodzhimetov',
      role: 'Team Lead & Computer Vision Architect',
      badge: 'Perception & Model Optimization',
      photo: '/azam-khodzhimetov.jpg',
      objectPosition: 'center 26%',
      initials: 'AK',
      bio: 'Architected the end-to-end perception pipeline and lead the model selection and optimization. Fine-tuned the YOLOv8 and RT-DETR detection engines to achieve real-time 25 FPS throughput on the target NVIDIA Tesla T4 benchmark while staying strictly within the 5 GB package weight limit.',
      contributions: [
        'Detector selection & transfer learning on open traffic datasets (DoTA & CADP)',
        'Inference optimization & FP16 quantization for single-batch T4 GPU execution',
        'Offline submission packaging with reproducible deterministic random seeds',
      ],
      proudProjects: [
        'Autonomous Driving 3D Perception System (CVPR Challenge Top 10)',
        'Edge-AI Real-Time Multi-Camera Traffic Flow Analyzer',
      ],
      links: {
        github: 'https://github.com/azamkhodzhimetov',
        linkedin: 'https://linkedin.com/in/azamkhodzhimetov',
        portfolio: 'https://azam.dev',
        email: 'azam@antigradient.ai',
      },
      imageLeft: true, // 1st: Photo Left (25%), Info Right (75%)
    },
    {
      id: 'member-2',
      name: 'Teammate 2 (Placeholder)',
      role: 'Tracking & Spatial Geometry Specialist',
      badge: 'Multi-Object Tracking & camera.md',
      photo: '/teammate-2.jpg',
      objectPosition: '48% 22%',
      initials: 'T2',
      bio: 'Engineered the multi-object tracking pipeline using ByteTrack and calibrated spatial rule evaluation. Formulated intersection geometry rules from camera.md, associating vehicle ground-plane contact points against stop-line vectors, turn constraints, and pedestrian crossings.',
      contributions: [
        'ByteTrack association tuning with Kalman velocity extrapolation across occlusions',
        'camera.md virtual polygon parser for lane directions and solid line crossings',
        'Greedy bipartite matching optimizer for temporal IoU thresholds [0.3, 0.5, 0.7]',
      ],
      proudProjects: [
        'Real-Time Multi-Target Multi-Camera Vehicle Tracker (AI City Challenge)',
        'Urban Intersection Topological Map & Trajectory Synthesizer',
      ],
      links: {
        github: 'https://github.com/teammate2',
        linkedin: 'https://linkedin.com/in/teammate2',
        portfolio: 'https://teammate2.dev',
        email: 'member2@antigradient.ai',
      },
      imageLeft: false, // 2nd: Info Left (75%), Photo Right (25%) - CHESSBOARD
    },
    {
      id: 'member-3',
      name: 'Teammate 3 (Placeholder)',
      role: 'Causal Risk Modeling & Full-Stack Systems',
      badge: 'Part B Anticipation & Demo Platform',
      photo: '/teammate-3.jpg',
      objectPosition: '53% 20%',
      initials: 'T3',
      bio: 'Designed the causal accident anticipation architecture for Part B and built the web submission platform. Implemented the online RiskEstimator.step() causal interface, extracting Time-to-Collision (TTC) signals and deceleration anomalies across the 5.0-second prediction horizon.',
      contributions: [
        'Part B causal RiskEstimator.step() with strict zero-lookahead online inference',
        'Time-to-Collision (TTC) kinetic risk forecasting and chance-normalized AP scoring',
        'Public team website, interactive video demo engine, and evaluation harness validation',
      ],
      proudProjects: [
        'Causal Video Anomaly Detection Platform with Microsecond Stream Processing',
        'High-Throughput Distributed Video Inference Pipeline on Kubernetes',
      ],
      links: {
        github: 'https://github.com/teammate3',
        linkedin: 'https://linkedin.com/in/teammate3',
        portfolio: 'https://teammate3.dev',
        email: 'member3@antigradient.ai',
      },
      imageLeft: true, // 3rd: Photo Left (25%), Info Right (75%) - CHESSBOARD
    },
  ];

  return (
    <section id="team" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0693e3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121a2a] border border-[#1f2d45] text-xs font-semibold uppercase tracking-widest text-[#00e5ff]">
            <Users className="w-4 h-4 text-[#00e5ff]" />
            MEET THE BUILDERS • TEAM ANTIGRADIENT
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            CORE ENGINEERING TEAM
          </h2>

          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Three computer vision and systems engineers uniting deep learning detection, real-time multi-object tracking, and causal kinematics to solve the WIUT Hackathon 2026 Elimination Challenge.
          </p>
        </div>

        {/* Alternating Chessboard Members List */}
        <div className="space-y-10">
          {members.map((member, idx) => {
            const isPhotoLeft = member.imageLeft;

            const photoBlock = (
              <div
                className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-3xl border border-[#1f2d45] hover:border-[#00e5ff]/50 overflow-hidden group col-span-1 shadow-2xl transition-all duration-300 bg-[#090f1a] flex flex-col justify-between p-5 ${
                  isPhotoLeft ? 'order-1' : 'order-1 md:order-2'
                }`}
              >
                {/* Full-bleed Photo filling entire rectangle */}
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{ objectPosition: member.objectPosition || 'center 25%' }}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Atmospheric cinematic dark gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/90 via-[#080c14]/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/50 via-transparent to-transparent pointer-events-none" />

                {/* Fallback Initials Badge if image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center -z-10 bg-gradient-to-br from-[#121a2a] to-[#090f1a]">
                  <span className="text-5xl font-extrabold font-mono text-[#00e5ff]/30">
                    {member.initials}
                  </span>
                </div>

                {/* Top Spacer to push badge to bottom */}
                <div className="relative z-10" />

                {/* Bottom Corner: Status / Core Index Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080c14]/80 backdrop-blur-md border border-[#1f2d45] text-xs font-mono text-gray-300 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse" />
                    <span className="text-[#00e5ff] font-bold">0{idx + 1}</span>
                    <span className="text-gray-400">/ 03 Core</span>
                  </div>
                </div>
              </div>
            );

            const infoBlock = (
              <div className={`w-full flex flex-col justify-between p-6 sm:p-8 bg-[#121a2a] rounded-3xl border border-[#1f2d45] hover:border-[#0693e3]/40 transition-all shadow-xl group col-span-1 md:col-span-3 ${isPhotoLeft ? 'order-2' : 'order-2 md:order-1'}`}>
                <div>
                  {/* Top Bar: Role badge & Social Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182236] border border-[#2a3a56] text-xs font-semibold uppercase tracking-wider text-[#00e5ff]">
                      {member.badge}
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-2">
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={member.links.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                        title="Personal Portfolio"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${member.links.email}`}
                        className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 group-hover:text-[#00e5ff] transition">
                    {member.name}
                  </h3>
                  <div className="text-sm font-medium text-gray-400 mb-4">
                    {member.role}
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-300 leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  {/* Key Contributions List */}
                  <div className="mb-5 space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold block mb-1">
                      Key Hackathon Contributions:
                    </span>
                    {member.contributions.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#00e5ff] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Previous Proud Projects (Per PDF Rubric) */}
                  <div className="pt-4 border-t border-[#1f2d45]">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold block mb-2">
                      Featured Past Projects:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {member.proudProjects.map((proj, pIdx) => (
                        <div
                          key={pIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090f1a] border border-[#1f2d45] text-xs text-gray-300 font-mono"
                        >
                          <Award className="w-3 h-3 text-[#00e5ff]" />
                          <span>{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <div
                key={member.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch"
              >
                {photoBlock}
                {infoBlock}
              </div>
            );
          })}
        </div>

        {/* Official Submission Links Card (Per PDF Requirement 7) */}
        <div id="submission" className="mt-16 rounded-3xl bg-gradient-to-r from-[#0c1322] via-[#121a2a] to-[#0c1322] border border-[#1f2d45] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00e5ff]">
                REQUIREMENT 7 • REPOSITORY & ARTIFACTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                OFFICIAL SUBMISSION REPOSITORY & MODEL WEIGHTS
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                All source code, weights, inference scripts, and predictions required to reproduce our evaluation score on a clean machine.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <a
                href="https://github.com/antigradient/traffic-cv-2026"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0693e3] hover:bg-[#0582ca] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#0693e3]/20"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Git Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/antigradient/traffic-cv-2026/releases/download/v1.0/weights.zip"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#182236] hover:bg-[#202e47] text-white font-bold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
              >
                <Download className="w-4 h-4 text-[#00e5ff]" />
                <span>Weights (&lt; 5 GB)</span>
              </a>

              <a
                href="https://github.com/antigradient/traffic-cv-2026/blob/main/predictions_samples.json"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#182236] hover:bg-[#202e47] text-white font-bold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
              >
                <Check className="w-4 h-4 text-[#00d084]" />
                <span>predictions_samples.json</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

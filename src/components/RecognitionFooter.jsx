import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, ExternalLink } from 'lucide-react';

export default function RecognitionFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const awards = [
    { name: 'Benchmark Hardware', subtitle: 'NVIDIA Tesla T4 GPU', text: '25+ FPS' },
    { name: 'Package Weight Budget', subtitle: 'Strict Hackathon Limit', text: '< 5.0 GB' },
    { name: 'Anticipation Horizon', subtitle: 'Part B Causal Window', text: '5.0 SEC' },
    { name: 'Mandatory Classes', subtitle: 'Part A Spatial-Temporal', text: '14 CLASSES' },
  ];

  const footerLinks = {
    'Project Rubric': [
      { label: '01. Team & Portfolio (10%)', href: '#team' },
      { label: '02. Problem & Approach (15%)', href: '#platform' },
      { label: '03. EDA Analysis (15%)', href: '#academic' },
      { label: '04. Sample Results (20%)', href: '#wearables' },
      { label: '05. Live Interactive Demo (30%)', href: '#technology' },
      { label: '06. Technical Report (15%)', href: '#stories' },
    ],
    'Part A: Detection': [
      { label: '14 Traffic Event Classes', href: '#applications' },
      { label: 'Temporal IoU [0.3, 0.5, 0.7]', href: '#applications' },
      { label: 'ByteTrack Multi-Object Tracking', href: '#platform' },
      { label: 'camera.md Spatial Calibration', href: '#academic' },
      { label: 'Ground-Contact Box Projection', href: '#academic' },
    ],
    'Part B: Anticipation': [
      { label: '5.0-Second Causal Window', href: '#mantara' },
      { label: 'Online RiskEstimator.step()', href: '#mantara' },
      { label: 'Time-to-Collision (TTC) Kinematics', href: '#platform' },
      { label: 'Chance-Normalized Average Precision', href: '#academic' },
      { label: 'Zero-Lookahead Temporal Constraints', href: '#mantara' },
    ],
    'Submission Artifacts': [
      { label: 'GitHub Source Repository', href: 'https://github.com/antigradient/traffic-cv-2026', external: true },
      { label: 'Model Weights (< 5 GB)', href: 'https://github.com/antigradient/traffic-cv-2026/releases', external: true },
      { label: 'predictions_samples.json', href: 'https://github.com/antigradient/traffic-cv-2026', external: true },
      { label: 'Self-Contained Runner Script', href: '#submission' },
      { label: 'Verification & Reproduction Guide', href: '#stories' },
    ],
  };

  return (
    <footer id="contact" className="bg-[#080c14] relative border-t border-[#1f2d45] text-gray-300">
      {/* 1. Recognition & Awards Banner */}
      <div id="recognition" className="py-20 border-b border-[#1f2d45] bg-[#0a0f18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
              BENCHMARK COMPLIANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
              SYSTEM CONSTRAINTS & TARGET METRICS
            </h2>
            <div className="w-16 h-1 bg-[#0693e3] rounded-full mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121a2a] border border-[#1f2d45] flex flex-col items-center justify-center text-center group hover:border-[#0693e3]/50 transition"
              >
                <div className="h-14 flex items-center justify-center mb-3">
                  <span className="text-2xl font-extrabold font-mono text-[#00e5ff] tracking-wider">
                    {award.text}
                  </span>
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition">
                  {award.name}
                </div>
                <div className="text-xs text-gray-400 mt-1">{award.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Hackathon Track Details & Quick Contact */}
      <div className="py-16 border-b border-[#1f2d45] bg-[#0c121e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Mission Statement & Address */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl overflow-hidden bg-white/10 p-0.5 border border-[#00e5ff]/30 shadow-md shadow-[#00e5ff]/20 shrink-0">
                  <img
                    src="/logo.png"
                    alt="Antigradient Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="font-extrabold text-2xl tracking-[0.18em] text-white">ANTIGRADIENT</span>
                <span className="w-2 h-2 rounded-full bg-[#0693e3]" />
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0693e3]/20 border border-[#0693e3]/40 text-[#00e5ff]">
                  WIUT 2026
                </span>
              </div>

              <p className="text-sm text-gray-300 max-w-lg leading-relaxed">
                Official elimination task submission for the Westminster International University in Tashkent (WIUT) Hackathon 2026 — Computer Vision Track. Delivering real-time CCTV multi-event detection and causal accident anticipation.
              </p>

              <div className="flex items-start gap-2.5 text-xs text-gray-400 pt-2">
                <MapPin className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>
                  <strong>Host Institution:</strong> Westminster International University in Tashkent (WIUT), Tashkent, Uzbekistan
                </span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#121a2a] border border-[#1f2d45] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00e5ff] mb-2">
                  <Mail className="w-4 h-4" />
                  EVALUATION REPRODUCTION
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Verify Inference On Target T4 GPU
                </h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Enter your email to receive our automated verification runbook, docker commands, and evaluation scripts directly.
                </p>

                {subscribed ? (
                  <div className="p-4 rounded-xl bg-[#00d084]/15 border border-[#00d084]/30 flex items-center gap-3 text-xs text-[#00d084]">
                    <Check className="w-4 h-4" />
                    <span>Runbook details sent! You can also clone the repository directly below.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter reviewer email..."
                      className="flex-1 px-4 py-3 rounded-lg bg-[#080c14] border border-[#1f2d45] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0693e3]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-[#0693e3] hover:bg-[#0582ca] text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-[#0693e3]/25 flex items-center justify-center gap-2 shrink-0"
                    >
                      <span>GET RUNBOOK</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Multi-Column Sitemap Navigation */}
      <div className="py-16 bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <div key={idx}>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : '_self'}
                        rel={link.external ? 'noopener noreferrer' : ''}
                        className="text-gray-400 hover:text-[#00e5ff] transition flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        {link.external && (
                          <ExternalLink className="w-2.5 h-2.5 text-gray-600 group-hover:text-[#00e5ff]" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Legal & Social Strip */}
      <div className="py-8 bg-[#05080e] border-t border-[#1f2d45]/60 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Team Antigradient. Built for WIUT Hackathon 2026 — Computer Vision Track Elimination Task.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/antigradient/traffic-cv-2026"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition flex items-center gap-2"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span className="text-xs font-mono font-bold text-gray-300">antigradient/traffic-cv-2026</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

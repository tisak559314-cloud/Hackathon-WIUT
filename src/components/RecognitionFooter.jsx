import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export default function RecognitionFooter() {
  const awards = [
    { name: '4K CCTV Stream', subtitle: '3840×2160 H.264 4:2:2 10-bit', text: '29.97 FPS' },
    { name: 'Package Weight Budget', subtitle: 'Strict Hackathon Limit', text: '< 5.0 GB' },
    { name: 'Anticipation Horizon', subtitle: 'Part B Causal Window', text: '5.0 SEC' },
    { name: 'Official Event Classes', subtitle: '7 Emitted on Benchmark', text: '14 CLASSES' },
  ];

  const footerLinks = {
    'Project Rubric': [
      { label: '01. Team & Portfolio (10%)', href: '#team' },
      { label: '02. Problem & Approach (15%)', href: '#platform' },
      { label: '03. EDA Analysis (15%)', href: '#academic' },
      { label: '04. Sample Results (20%)', href: '#technology' },
      { label: '05. Live Interactive Demo (30%)', href: '#technology' },
      { label: '06. Technical Report (15%)', href: '#stories' },
    ],
    'Part A: Detection': [
      { label: '14 Traffic Event Classes', href: '#applications' },
      { label: 'Temporal IoU [0.3, 0.5, 0.7]', href: '#applications' },
      { label: 'ByteTrack Multi-Object Tracking', href: '#platform' },
      { label: 'SIFT+RANSAC Spatial Alignment', href: '#academic' },
      { label: 'Ground-Contact Box Projection', href: '#academic' },
    ],
    'Part B: Anticipation': [
      { label: '5.0-Second Causal Window', href: '#mantara' },
      { label: 'Online RiskEstimator.step()', href: '#mantara' },
      { label: 'Oriented Box Axis Kinematics', href: '#platform' },
      { label: 'Chance-Normalized Average Precision', href: '#academic' },
      { label: 'Zero-Lookahead Temporal Constraints', href: '#mantara' },
    ],
    'Submission Artifacts': [
      { label: 'GitHub Repository: WestCV', href: 'https://github.com/AsanAshirov/WestCV', external: true },
      { label: 'Release Tag v1.0.0 & Weights', href: 'https://github.com/AsanAshirov/WestCV/releases/tag/v1.0.0', external: true },
      { label: 'Hand-Off Guide PDF (5.3 MB)', href: '/ANTIGRADIENT_website_guide.pdf', external: true },
      { label: 'predictions_samples.json', href: 'https://github.com/AsanAshirov/WestCV/blob/main/predictions_samples.json', external: true },
      { label: 'Ablations & Dev Score A', href: '#stories' },
    ],
  };

  return (
    <footer id="contact" className="bg-[#080c14] relative border-t border-[#1f2d45] text-gray-300">
      {/* 1. Metric Badges Strip */}
      <div id="recognition" className="py-20 border-b border-[#1f2d45] bg-[#0a0f18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
              BENCHMARK COMPLIANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
              SYSTEM CONSTRAINTS &amp; TARGET METRICS
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

      {/* 2. Hackathon Track Details & Quick Actions */}
      <div className="py-14 border-b border-[#1f2d45] bg-[#0c121e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Mission Statement & Address */}
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-[0.18em] text-white">ANTIGRADIENT</span>
                <span className="w-2 h-2 rounded-full bg-[#0693e3]" />
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0693e3]/20 border border-[#0693e3]/40 text-[#00e5ff]">
                  WIUT 2026
                </span>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                Official elimination task submission for the Westminster International University in Tashkent (WIUT) Hackathon 2026 — Computer Vision Track. Delivering real-time CCTV multi-event detection and causal accident anticipation.
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                <MapPin className="w-4 h-4 text-[#00e5ff] shrink-0" />
                <span>
                  <strong>Host Institution:</strong> Westminster International University in Tashkent (WIUT), Tashkent, Uzbekistan
                </span>
              </div>
            </div>

            {/* Quick Repository Action Links */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://github.com/AsanAshirov/WestCV"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0693e3] hover:bg-[#0582ca] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#0693e3]/25 border border-[#2ea3f2]/40"
              >
                <span>GitHub: WestCV (v1.0.0)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="/ANTIGRADIENT_website_guide.pdf"
                download
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#121a2a] hover:bg-[#182236] text-[#00e5ff] hover:text-white font-bold text-xs uppercase tracking-wider transition border border-[#1f2d45] hover:border-[#00e5ff]/50"
              >
                <span>Hand-Off Guide (5.3 MB PDF)</span>
              </a>
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
              href="https://github.com/AsanAshirov/WestCV"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition flex items-center gap-2"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span className="text-xs font-mono font-bold text-gray-300">AsanAshirov/WestCV</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

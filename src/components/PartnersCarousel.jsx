import React from 'react';
import { Handshake, Award, ShieldCheck, Globe } from 'lucide-react';

export default function PartnersCarousel() {
  const partners = [
    { name: 'Sony Semiconductor', logo: 'https://downloads.prophesee.ai/website/2025/03/ZObrItDv-Partners_Logotype_Home_Page.jpg' },
    { name: 'Qualcomm', logo: 'https://downloads.prophesee.ai/website/2025/03/XYYh12Qu-Partners_Logotype_Home_Page2.jpg' },
    { name: 'IDS Imaging', logo: 'https://downloads.prophesee.ai/website/2025/03/LSxxl4wy-Partners_Logotype_Home_Page22.jpg' },
    { name: 'Intel Capital', logo: 'https://downloads.prophesee.ai/website/2025/03/Partners_Logotype_Home_Page6.jpg' },
    { name: 'Bosch', logo: 'https://downloads.prophesee.ai/website/2025/03/Partners_Logotype_Home_Page11.jpg' },
    { name: 'Renault', logo: 'https://downloads.prophesee.ai/website/2025/03/Partners_Logotype_Home_Page12.jpg' },
    { name: 'Terranet', logo: 'https://downloads.prophesee.ai/website/2025/03/Partners_Logotype_Home_Page16.jpg' },
    { name: 'Xiaomi', logo: 'https://downloads.prophesee.ai/website/2025/03/Partners_Logotype_Home_Page24.jpg' },
    { name: 'Lucid', logo: 'https://downloads.prophesee.ai/website/2025/03/lI6lIVBY-Partners_Logotype_Home_Page31.jpg' },
  ];

  return (
    <section id="partners" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
            Industry Leaders & Investors
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            PARTNERS
          </h2>
          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Collaborating with global semiconductor titans, automotive pioneers, and computer vision innovators to bring Metavision everywhere.
          </p>
        </div>

        {/* 3 Metric Cards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#121a2a] border border-[#1f2d45] flex items-center gap-4 shadow-xl group hover:border-[#00e5ff]/40 transition">
            <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0 group-hover:scale-110 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-white">96+</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-gray-300">Patents Granted</div>
              <div className="text-[11px] text-gray-500">Global IP protection on event sensing</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121a2a] border border-[#1f2d45] flex items-center gap-4 shadow-xl group hover:border-[#00e5ff]/40 transition">
            <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0 group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-white">66+</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-gray-300">International Recognitions</div>
              <div className="text-[11px] text-gray-500">IEEE, Prism Awards, CES Innovation</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121a2a] border border-[#1f2d45] flex items-center gap-4 shadow-xl group hover:border-[#00e5ff]/40 transition">
            <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0 group-hover:scale-110 transition">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-white">20,000+</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-gray-300">Global Community</div>
              <div className="text-[11px] text-gray-500">Developers, engineers & researchers</div>
            </div>
          </div>
        </div>

        {/* Infinite Partners Logo Carousel */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-8 sm:gap-12 animate-marquee-reverse whitespace-nowrap py-3">
            {[...partners, ...partners, ...partners].map((p, idx) => (
              <div
                key={idx}
                className="inline-flex items-center justify-center h-20 px-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0693e3]/60 transition-all duration-300 shrink-0 group hover:scale-105"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-10 max-w-[130px] object-contain opacity-70 group-hover:opacity-100 transition filter grayscale group-hover:grayscale-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="text-xs font-bold text-gray-300 ml-2 group-hover:text-white">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

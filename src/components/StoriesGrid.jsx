import React from 'react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

export default function StoriesGrid() {
  const stories = [
    {
      title: 'Prophesee launches Mantara® and announces €20M fundraise',
      date: 'Jun 15, 2026',
      tag: 'Press Release',
      image: 'https://downloads.prophesee.ai/website/2026/06/Featured-images.jpg',
      excerpt:
        'Prophesee announces Mantara, the first fully integrated drone detection and tracking system built natively on event-based vision, alongside a €20M strategic financing round.',
    },
    {
      title: 'IDS and Prophesee deepen collaboration to advance next-generation Event-based industrial vision systems',
      date: 'Mar 24, 2026',
      tag: 'Industrial Vision',
      image: 'https://downloads.prophesee.ai/website/2026/03/IDS_Prophesee_HD-400x250.jpg',
      excerpt:
        'IDS Imaging Development Systems and Prophesee expand their partnership with new industrial cameras combining high-speed event sensing with standard industrial GigE Vision.',
    },
    {
      title: 'Terranet collaborates with Prophesee on Event-Based Vision Technology for its new BlincVision MVP',
      date: 'Jan 18, 2026',
      tag: 'Automotive Safety',
      image: 'https://downloads.prophesee.ai/website/2026/01/Header_2025_Wordpress_New-400x250.jpg',
      excerpt:
        'Terranet implements Prophesee event sensors in its revolutionary BlincVision anti-collision safety system, slashing reaction time to under 10 milliseconds.',
    },
    {
      title: 'PROPHESEE Recap: Expanding the Neuromorphic Ecosystem',
      date: 'Dec 19, 2025',
      tag: 'Company Milestone',
      image: 'https://downloads.prophesee.ai/website/2025/12/Blog_Post-400x250.jpg',
      excerpt:
        'A landmark year with massive adoption across wearable smart glasses, industrial manufacturing quality control, and over 300 academic research citations.',
    },
    {
      title: 'Prophesee Appoints Jean Ferré as Chief Executive Officer to Lead Event-Based Vision Growth',
      date: 'Oct 14, 2025',
      tag: 'Leadership',
      image: 'https://www.prophesee.ai/wp-content/uploads/2018/02/PROPHESEE-HERO-ROBOTICS-Compressed-dark-logo.jpg',
      excerpt:
        'Seasoned deep-tech executive Jean Ferré joins Prophesee to accelerate global scale, foundry partnerships, and commercial customer deployment worldwide.',
    },
    {
      title: 'Event Sensors Bring Just the Right Data to Device Makers',
      date: 'Aug 05, 2025',
      tag: 'Tech Insights',
      image: 'https://www.prophesee.ai/wp-content/uploads/2024/05/Consumer-Applications.jpg',
      excerpt:
        'How neuromorphic event sensors solve the data deluge problem in edge computing, streaming only the temporal changes that matter.',
    },
  ];

  return (
    <section id="stories" className="py-24 bg-[#0c121e] relative border-t border-[#1f2d45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00e5ff]">
              Latest News & Milestones
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mt-1">
              STORIES
            </h2>
            <div className="w-16 h-1 bg-[#0693e3] rounded-full mt-3" />
          </div>

          <a
            href="#stories"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00e5ff] hover:text-white transition group self-start sm:self-auto"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Stories 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <article
              key={idx}
              className="rounded-2xl bg-[#121a2a] border border-[#1f2d45] hover:border-[#0693e3]/50 overflow-hidden shadow-xl hover:shadow-[#0693e3]/10 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#090f1a]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    onError={(e) => {
                      e.target.src = 'https://www.prophesee.ai/wp-content/uploads/2018/02/PROPHESEE-METAVISION.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#080c14]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-[#00e5ff] border border-white/10">
                    {story.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#00e5ff]" />
                    <span>{story.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00e5ff] transition leading-snug mb-3">
                    {story.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-6 pt-0 border-t border-transparent">
                <div className="pt-4 border-t border-[#1f2d45] flex items-center justify-between text-xs font-bold text-[#0693e3] group-hover:text-[#00e5ff] transition">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

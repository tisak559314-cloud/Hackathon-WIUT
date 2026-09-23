import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      title: 'OVERVIEW',
      href: '#intro',
      children: [
        { label: 'Elimination Task', href: '#intro', desc: 'Fixed CCTV road monitoring' },
        { label: 'Part A: Event Detection', href: '#intro', desc: '14 mandatory traffic event classes' },
        { label: 'Part B: Anticipation', href: '#mantara', desc: '5-second pre-accident risk score' },
      ]
    },
    {
      title: 'APPROACH',
      href: '#platform',
      children: [
        { label: 'Pipeline Architecture', href: '#platform', desc: 'Detector, Tracker, and Rule Engine' },
        { label: 'Object Tracking', href: '#platform', desc: 'ByteTrack spatial-temporal association' },
        { label: 'Risk Estimator', href: '#mantara', desc: 'Causal step() frame evaluation' },
      ]
    },
    {
      title: '14 CLASSES',
      href: '#applications',
      children: [
        { label: 'Collisions & Near Misses', href: '#applications', desc: 'accident, near_miss' },
        { label: 'Traffic Violations', href: '#applications', desc: 'red_light, stop_line, wrong_way' },
        { label: 'Lane & Maneuvers', href: '#applications', desc: 'illegal_turn, illegal_u_turn, solid_line' },
        { label: 'Roadway & Obstacles', href: '#applications', desc: 'jaywalking, obstacle, fire_smoke' },
      ]
    },
    {
      title: 'EDA & DATA',
      href: '#academic',
    },
    {
      title: 'LIVE DEMO',
      href: '#technology',
    },
    {
      title: 'REPORT',
      href: '#stories',
    },
    {
      title: 'TEAM',
      href: '#team',
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080c14]/90 backdrop-blur-md border-b border-[#1f2d45] py-3 shadow-lg shadow-black/40'
            : 'bg-gradient-to-b from-[#080c14]/80 via-[#080c14]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <span className="font-extrabold text-xl md:text-2xl tracking-[0.16em] text-white">
              ANTIGRADIENT
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 shrink-0">
            {navLinks.map((item, idx) => (
              <div
                key={idx}
                className="relative shrink-0"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="px-2.5 2xl:px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-[#00e5ff] flex items-center gap-1 transition-colors whitespace-nowrap"
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 shrink-0 ${
                        activeDropdown === item.title ? 'rotate-180 text-[#00e5ff]' : 'text-gray-400'
                      }`}
                    />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.title && (
                  <div className="absolute top-full left-0 w-64 pt-2 animate-fadeIn z-50">
                    <div className="rounded-xl bg-[#0c121e] border border-[#1f2d45] shadow-2xl p-2 backdrop-blur-xl">
                      {item.children.map((child, cIdx) => (
                        <a
                          key={cIdx}
                          href={child.href}
                          target={child.external ? '_blank' : '_self'}
                          rel={child.external ? 'noopener noreferrer' : ''}
                          className="flex flex-col p-2.5 rounded-lg hover:bg-[#182236] transition group"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-gray-200 group-hover:text-[#00e5ff]">
                            <span>{child.label}</span>
                            {child.external && <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-[#00e5ff]" />}
                          </div>
                          {child.desc && (
                            <span className="text-[11px] text-gray-400 mt-0.5">{child.desc}</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Icons & Contact */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition shrink-0"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Submission CTA */}
            <a
              href="#submission"
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0693e3] hover:bg-[#0582ca] transition shadow-md shadow-[#0693e3]/20 border border-[#2ea3f2]/40 whitespace-nowrap shrink-0"
            >
              SUBMISSION
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#080c14] border-b border-[#1f2d45] px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item, idx) => (
                <div key={idx} className="border-b border-[#1f2d45]/50 py-2">
                  <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-gray-200">
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-[#00e5ff]"
                    >
                      {item.title}
                    </a>
                  </div>
                  {item.children && (
                    <div className="pl-4 mt-2 space-y-1.5">
                      {item.children.map((child, cIdx) => (
                        <a
                          key={cIdx}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-gray-400 hover:text-[#00e5ff] py-1"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <a
                  href="#submission"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 px-4 rounded-lg bg-[#0693e3] text-xs font-bold uppercase tracking-wider text-white"
                >
                  SUBMISSION & REPO
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#0c121e] border border-[#1f2d45] rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#1f2d45] pb-4 mb-4">
              <Search className="w-5 h-5 text-[#00e5ff]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, applications, publications, docs..."
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                autoFocus
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto text-xs text-gray-300">
              <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Quick Links</div>
              <a
                href="#mantara"
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#182236] transition"
              >
                <span>Mantara® Drone Detection System</span>
                <span className="text-[#00e5ff]">Defense</span>
              </a>
              <a
                href="#applications"
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#182236] transition"
              >
                <span>Industrial High-Speed Monitoring</span>
                <span className="text-[#00e5ff]">Applications</span>
              </a>
              <a
                href="#platform"
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#182236] transition"
              >
                <span>GenX320 Neuromorphic Vision Sensor</span>
                <span className="text-[#00e5ff]">Sensors</span>
              </a>
              <a
                href="#academic"
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#182236] transition"
              >
                <span>300+ Academic Research Publications</span>
                <span className="text-[#00e5ff]">Research</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MissionIntro from './components/MissionIntro';
import MantaraBanner from './components/MantaraBanner';
import ApplicationsSection from './components/ApplicationsSection';
import AcademicResearch from './components/AcademicResearch';
import WearablesShowcase from './components/WearablesShowcase';
import PlatformStack from './components/PlatformStack';
import TechnologySection from './components/TechnologySection';
import PartnersCarousel from './components/PartnersCarousel';
import StoriesGrid from './components/StoriesGrid';
import TeamSection from './components/TeamSection';
import RecognitionFooter from './components/RecognitionFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080c14] text-white flex flex-col selection:bg-[#0693e3] selection:text-white">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Page Layout matching prophesee.ai 1-to-1 */}
      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section with Video BG and 3D Particle Constellation */}
        <Hero />

        {/* Section 1: Biological Vision & Neuromorphic Foundation */}
        <MissionIntro />

        {/* Section 2: Mantara & Hearth Drone Detection System */}
        <MantaraBanner />

        {/* Section 3: Applications 4-Tab Interactive Showcase */}
        <ApplicationsSection />

        {/* Section 4 & 5: 300+ Academic Research Publications & Marquee */}
        <AcademicResearch />

        {/* Section 6: XR Eye-Tracking & Ultra-Low Power Wearables */}
        <WearablesShowcase />

        {/* Section 7: The Prophesee Full Platform (Sensors, Cameras, Software, Services) */}
        <PlatformStack />

        {/* Section 8: Technology Deep Dive & Interactive Neuromorphic Simulator */}
        <TechnologySection />

        {/* Section 9 & 10: Industry Partners & Global Patents Metric Strip */}
        <PartnersCarousel />

        {/* Section 11: Latest Stories & News Cards */}
        <StoriesGrid />

        {/* Section: Official Submission Team & Links */}
        <TeamSection />
      </main>

      {/* Section 12 & Comprehensive Footer */}
      <RecognitionFooter />
    </div>
  );
}

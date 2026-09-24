import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MissionIntro from './components/MissionIntro';
import MantaraBanner from './components/MantaraBanner';
import PlatformStack from './components/PlatformStack';
import ApplicationsSection from './components/ApplicationsSection';
import AcademicResearch from './components/AcademicResearch';
import LiveDemoSection from './components/LiveDemoSection';
import EngineeringReport from './components/EngineeringReport';
import TeamSection from './components/TeamSection';
import RecognitionFooter from './components/RecognitionFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080c14] text-white flex flex-col selection:bg-[#0693e3] selection:text-white">
      {/* Top Fixed Header with dynamic anchor links */}
      <Navbar />

      {/* Main Hackathon Elimination Showcase Layout */}
      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section: Live CCTV stream, 14 classes, 25 FPS counter */}
        <Hero />

        {/* Section 1: Problem Statement & Elimination Challenge Overview */}
        <MissionIntro />

        {/* Section 2: Part B Risk Anticipation (H = 5.0s Horizon) */}
        <MantaraBanner />

        {/* Section 3: 4-Layer Edge Architecture & Pipeline */}
        <PlatformStack />

        {/* Section 4: 14 Spatiotemporal Traffic Event Classes */}
        <ApplicationsSection />

        {/* Section 5: EDA & camera.md Homography Calibration */}
        <AcademicResearch />

        {/* Section 6: Official Live Demo & Video Upload Visualizer (Rubric 50%) */}
        <LiveDemoSection />

        {/* Section 7: Official 1-Page Engineering Report & Ablations (Rubric 10%) */}
        <EngineeringReport />

        {/* Section 8: Official Team Antigradient Profiles & Popups (Rubric 15%) */}
        <TeamSection />
      </main>

      {/* Comprehensive Footer: Submission Links, Codebase, & Rubric Score (Rubric 10%) */}
      <RecognitionFooter />
    </div>
  );
}

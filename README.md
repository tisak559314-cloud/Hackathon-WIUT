# Prophesee AI | Metavision Technologies Website Clone

A high-fidelity 1-to-1 responsive clone of [prophesee.ai](https://www.prophesee.ai/), the pioneering neuromorphic event-based computer vision platform, built with **React 19**, **Vite**, **Tailwind CSS**, and **Three.js**.

---

## Key Features & Visual Effects

1. **Header & Navigation**:
   - Fixed translucent glassmorphism navbar with scroll detection (`#080c14/90` with blur).
   - Multi-level dropdowns for *Buy Products*, *Applications*, *Technology*, *Community*, *Support*, and *Prophesee*.
   - Interactive search modal and mobile-responsive drawer menu.

2. **Hero Section**:
   - High-definition ambient background video streaming directly from Prophesee's CDN (`Prophesee-header-video-compressed.mp4`).
   - Split-face human eye vs. machine vision artwork (`1-half eye.png`).
   - **Interactive 3D Three.js Neuromorphic Particle Cluster (`HeroCluster3D.jsx`)**:
     - 1,400+ glowing event particles (`#407ec9`, `#00e5ff`, white spikes) distributed on a 3D sphere.
     - Dynamic mouse tracking and organic breathing motion simulating asynchronous event-based retina firings.
     - Real-time connecting synaptic lines between adjacent event coordinates.
   - Animated counter metrics (96 Patents, 66 Awards, 20,000+ Community).

3. **Section 1: Biological Vision Foundations**:
   - "Reveal the Invisible" mission statement highlighting human-inspired asynchronous sensing, microsecond latency, and extreme data efficiency.

4. **Section 2: Mantara® & Hearth® Drone Detection**:
   - Counter-UAS defense banner with tactical radar HUD, target lock reticles, and sub-millisecond kinetic tracking specs.

5. **Section 3: Applications 4-Tab Interactive Showcase**:
   - Dynamic tab switcher across **Industrial**, **Defense & Aerospace**, **XR (Extended Reality)**, and **More Applications**.
   - Rich imagery, feature bullet points, and customized CTAs.

6. **Sections 4 & 5: Academic Research & Infinite University Marquee**:
   - 300+ academic papers showcase with live search filter and conference topic tags (CVPR, SLAM, Autonomous Driving, Optical Flow).
   - Seamless infinite auto-scrolling marquee of top research institutions (MIT, UC Berkeley, ANU, TU Berlin, KAUST, King's College, etc.).

7. **Section 6: Wearables & Eye-Tracking Showcase**:
   - Sensor performance specs: **>1,000 Hz sampling rate** and **down to 2mW power consumption**.
   - Prophesee community banner (20,000+ builders).

8. **Section 7: Full Prophesee Platform Stack**:
   - 4-pillar modular architecture:
     1. **Sensors**: GenX320 and Sony-Prophesee IMX636.
     2. **Cameras & EVK**: Turnkey EVK4 plug-and-play kits.
     3. **Software Toolkit**: Metavision SDK Pro, OpenEB, Metavision Studio.
     4. **Services**: Custom IP, algorithm acceleration, and turnkey vision delivery.

9. **Section 8: Technology Deep Dive & Interactive Event Simulator**:
   - **Interactive Neuromorphic Computer Vision Simulator (`EventVisionSimulator.jsx`)**:
     - Side-by-side benchmark of Conventional 30 FPS Frame Camera (motion blur, heavy bandwidth) vs. Metavision Event Sensor (asynchronous blue/cyan event spikes, microsecond timestamping).
     - Live interactive controls: Target Speed slider, Motion presets (Drone, Rotation, Mouse Following), and real-time latency/bandwidth metrics.

10. **Sections 9 & 10: Partner Ecosystem & Patents Strip**:
    - Infinite logo marquee of industry leaders and investors (Sony Semiconductor, Qualcomm, IDS Imaging, Intel Capital, Bosch, Renault, etc.).
    - Metrics: 96+ Patents, 66+ Awards, Global Market Activity.

11. **Section 11: Stories & News Cards**:
    - 6 featured articles with original photography, publication dates, and category tags.

12. **Section 12 & Comprehensive Footer**:
    - Industry accolades (MIT Technology Review 50 Smartest Companies, EE Times Silicon 100, SPIE Prism Award).
    - Paris global headquarters info (`75 TER rue de Charonne, 75011 Paris, FRANCE`).
    - Newsletter subscription form and multi-column sitemap navigation.

---

## Quick Start

### Using the Launch Script (Recommended)
Simply run the included bash script:
```bash
./start.sh
```

### Or using npm commands
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

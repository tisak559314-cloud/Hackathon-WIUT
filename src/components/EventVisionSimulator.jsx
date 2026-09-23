import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Zap, Eye, Activity, Cpu, Sliders, ShieldCheck } from 'lucide-react';

export default function EventVisionSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mode, setMode] = useState('drone'); // 'drone', 'rotation', 'mouse'
  const [speed, setSpeed] = useState(1.5);
  const [showGrid, setShowGrid] = useState(true);

  const canvasRefRGB = useRef(null);
  const canvasRefEvent = useRef(null);
  const mousePos = useRef({ x: 150, y: 150, prevX: 150, prevY: 150 });
  const objectState = useRef({
    x: 150,
    y: 150,
    vx: 3,
    vy: 2.2,
    angle: 0,
    prevAngle: 0,
  });

  // Simulated metrics
  const [stats, setStats] = useState({
    eventsPerSec: '4.8M',
    eventBandwidth: '1.4 MB/s',
    rgbBandwidth: '180 MB/s',
    latency: '8 µs',
    rgbLatency: '33.3 ms',
  });

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const canvasRGB = canvasRefRGB.current;
    const canvasEvent = canvasRefEvent.current;
    if (!canvasRGB || !canvasEvent) return;

    const ctxRGB = canvasRGB.getContext('2d');
    const ctxEvent = canvasEvent.getContext('2d');

    // Event trail buffer for temporal persistence
    const width = canvasRGB.width;
    const height = canvasRGB.height;
    const eventBuffer = [];

    const handleCanvasMouseMove = (e) => {
      const rect = canvasRGB.getBoundingClientRect();
      const scaleX = canvasRGB.width / rect.width;
      const scaleY = canvasRGB.height / rect.height;
      mousePos.current.prevX = mousePos.current.x;
      mousePos.current.prevY = mousePos.current.y;
      mousePos.current.x = (e.clientX - rect.left) * scaleX;
      mousePos.current.y = (e.clientY - rect.top) * scaleY;
    };

    canvasRGB.addEventListener('mousemove', handleCanvasMouseMove);
    canvasEvent.addEventListener('mousemove', handleCanvasMouseMove);

    const render = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Update simulated object position
      if (isPlaying) {
        const obj = objectState.current;
        if (mode === 'drone') {
          obj.x += obj.vx * speed;
          obj.y += obj.vy * speed;
          obj.angle = Math.atan2(obj.vy, obj.vx);

          if (obj.x < 30 || obj.x > width - 30) obj.vx *= -1;
          if (obj.y < 30 || obj.y > height - 30) obj.vy *= -1;
        } else if (mode === 'rotation') {
          obj.prevAngle = obj.angle;
          obj.angle += 0.05 * speed;
          const radius = 90;
          obj.x = width / 2 + Math.cos(obj.angle) * radius;
          obj.y = height / 2 + Math.sin(obj.angle) * radius;
        } else {
          // Follow cursor
          obj.x += (mousePos.current.x - obj.x) * 0.15;
          obj.y += (mousePos.current.y - obj.y) * 0.15;
        }
      }

      const obj = objectState.current;

      // ----------------------------------------------------
      // 1. RENDER CONVENTIONAL RGB CAMERA (Simulates motion blur & fixed frames)
      // ----------------------------------------------------
      // Motion blur effect via trailing alpha fade
      ctxRGB.fillStyle = 'rgba(15, 23, 42, 0.28)';
      ctxRGB.fillRect(0, 0, width, height);

      if (showGrid) {
        ctxRGB.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctxRGB.lineWidth = 1;
        for (let x = 0; x < width; x += 30) {
          ctxRGB.beginPath();
          ctxRGB.moveTo(x, 0);
          ctxRGB.lineTo(x, height);
          ctxRGB.stroke();
        }
        for (let y = 0; y < height; y += 30) {
          ctxRGB.beginPath();
          ctxRGB.moveTo(0, y);
          ctxRGB.lineTo(width, y);
          ctxRGB.stroke();
        }
      }

      // Draw conventional object (blurry drone or high-speed gear)
      ctxRGB.save();
      ctxRGB.translate(obj.x, obj.y);
      ctxRGB.rotate(obj.angle);

      // Blurry drone body
      ctxRGB.fillStyle = '#64748b';
      ctxRGB.beginPath();
      ctxRGB.arc(0, 0, 16, 0, Math.PI * 2);
      ctxRGB.fill();

      // Rotor arms
      ctxRGB.strokeStyle = '#94a3b8';
      ctxRGB.lineWidth = 3;
      ctxRGB.beginPath();
      ctxRGB.moveTo(-28, -28);
      ctxRGB.lineTo(28, 28);
      ctxRGB.moveTo(-28, 28);
      ctxRGB.lineTo(28, -28);
      ctxRGB.stroke();

      // Spinning blurred rotors
      ctxRGB.fillStyle = 'rgba(203, 213, 225, 0.45)';
      [-28, 28].forEach((rx) => {
        [-28, 28].forEach((ry) => {
          ctxRGB.beginPath();
          ctxRGB.arc(rx, ry, 12, 0, Math.PI * 2);
          ctxRGB.fill();
        });
      });
      ctxRGB.restore();

      // ----------------------------------------------------
      // 2. RENDER NEUROMORPHIC EVENT CAMERA (Pixel contrast changes only)
      // ----------------------------------------------------
      // Pure dark sensor plane with slow event decay
      ctxEvent.fillStyle = 'rgba(8, 12, 20, 0.22)';
      ctxEvent.fillRect(0, 0, width, height);

      // Generate events along edges of moving contours
      const samplePoints = 36;
      for (let i = 0; i < samplePoints; i++) {
        const rad = (i / samplePoints) * Math.PI * 2;
        const edgeX = obj.x + Math.cos(rad) * 22;
        const edgeY = obj.y + Math.sin(rad) * 22;

        // Polarity: positive contrast change (+1 blue) or negative (-1 cyan)
        const polarity = (i % 2 === 0) ? 1 : -1;
        eventBuffer.push({
          x: edgeX + (Math.random() - 0.5) * 4,
          y: edgeY + (Math.random() - 0.5) * 4,
          polarity,
          life: 1.0,
        });
      }

      // Add rotor blade micro-events (ultra-high speed edge firing)
      [-28, 28].forEach((rx) => {
        [-28, 28].forEach((ry) => {
          const rotorCenterX = obj.x + rx;
          const rotorCenterY = obj.y + ry;
          for (let k = 0; k < 6; k++) {
            const rotAngle = Math.random() * Math.PI * 2;
            const rDist = Math.random() * 12;
            eventBuffer.push({
              x: rotorCenterX + Math.cos(rotAngle) * rDist,
              y: rotorCenterY + Math.sin(rotAngle) * rDist,
              polarity: Math.random() > 0.5 ? 1 : -1,
              life: 0.9,
            });
          }
        });
      });

      // Render all asynchronous events in buffer
      for (let i = eventBuffer.length - 1; i >= 0; i--) {
        const ev = eventBuffer[i];
        ev.life -= dt * 3.5;

        if (ev.life <= 0) {
          eventBuffer.splice(i, 1);
          continue;
        }

        // Draw event pixel square (as in Metavision sensors)
        ctxEvent.fillStyle = ev.polarity === 1 
          ? `rgba(6, 147, 227, ${ev.life})` // ON Event (Light increase)
          : `rgba(0, 229, 255, ${ev.life * 0.95})`; // OFF Event (Light decrease)

        ctxEvent.fillRect(ev.x, ev.y, 2.4, 2.4);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvasRGB.removeEventListener('mousemove', handleCanvasMouseMove);
      canvasEvent.removeEventListener('mousemove', handleCanvasMouseMove);
    };
  }, [isPlaying, mode, speed, showGrid]);

  return (
    <div className="w-full max-w-6xl mx-auto my-12 p-6 md:p-8 rounded-2xl bg-[#0c121e] border border-[#1f2d45] shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0693e3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1f2d45]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00e5ff] mb-1">
            <Zap className="w-4 h-4" />
            Interactive Neuromorphic Benchmark
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Conventional Vision vs. Metavision® Event Sensing
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Move your cursor or watch the high-speed target. Standard cameras blur and waste bandwidth; Metavision captures pure microsecond temporal dynamics.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#182236] hover:bg-[#1f2d45] text-xs font-medium text-white transition border border-[#2a3a56]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#fcb900]" /> : <Play className="w-3.5 h-3.5 text-[#00d084]" />}
            {isPlaying ? 'Pause' : 'Resume'}
          </button>

          <div className="flex items-center gap-1 bg-[#182236] p-1 rounded-lg border border-[#2a3a56]">
            <button
              onClick={() => setMode('drone')}
              className={`px-2.5 py-1 rounded text-xs transition ${mode === 'drone' ? 'bg-[#0693e3] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              Drone
            </button>
            <button
              onClick={() => setMode('rotation')}
              className={`px-2.5 py-1 rounded text-xs transition ${mode === 'rotation' ? 'bg-[#0693e3] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              Rotation
            </button>
            <button
              onClick={() => setMode('mouse')}
              className={`px-2.5 py-1 rounded text-xs transition ${mode === 'mouse' ? 'bg-[#0693e3] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              Interactive Mouse
            </button>
          </div>
        </div>
      </div>

      {/* Dual Simulation Viewports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Frame-Based Camera Viewport */}
        <div className="flex flex-col rounded-xl overflow-hidden bg-[#070b12] border border-[#1f2d45]">
          <div className="px-4 py-2.5 bg-[#121824] flex items-center justify-between border-b border-[#1f2d45]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Standard Frame Camera</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
              30 FPS | Motion Blur
            </span>
          </div>

          <div className="relative aspect-[4/3] w-full bg-slate-950 flex items-center justify-center cursor-crosshair">
            <canvas
              ref={canvasRefRGB}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 text-[11px] font-mono bg-black/70 px-2 py-1 rounded backdrop-blur text-gray-300 border border-white/10">
              Payload: {stats.rgbBandwidth} (Heavy redundancy)
            </div>
          </div>

          <div className="p-3 bg-[#0a0f18] text-xs text-gray-400 border-t border-[#1f2d45] flex items-center justify-between">
            <span>Latency: <strong className="text-red-400">{stats.rgbLatency}</strong></span>
            <span>Static pixels transmitted: <strong className="text-red-400">100%</strong></span>
          </div>
        </div>

        {/* Metavision Event-Based Sensor Viewport */}
        <div className="flex flex-col rounded-xl overflow-hidden bg-[#070b12] border border-[#0693e3]/40 shadow-lg shadow-[#0693e3]/5">
          <div className="px-4 py-2.5 bg-[#121824] flex items-center justify-between border-b border-[#0693e3]/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00e5ff]">Prophesee Metavision®</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0693e3]/20 text-[#00e5ff] border border-[#0693e3]/30">
              &gt;10,000 FPS Equivalent
            </span>
          </div>

          <div className="relative aspect-[4/3] w-full bg-[#05080f] flex items-center justify-center cursor-crosshair">
            <canvas
              ref={canvasRefEvent}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
            {/* Polarity Legend */}
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono border border-white/10">
              <span className="flex items-center gap-1 text-[#0693e3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0693e3]" /> +ON
              </span>
              <span className="flex items-center gap-1 text-[#00e5ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" /> -OFF
              </span>
            </div>

            <div className="absolute bottom-3 left-3 text-[11px] font-mono bg-black/70 px-2 py-1 rounded backdrop-blur text-cyan-300 border border-cyan-500/20">
              Bandwidth: {stats.eventBandwidth} (&gt;99% Saved)
            </div>
          </div>

          <div className="p-3 bg-[#0a0f18] text-xs text-gray-300 border-t border-[#1f2d45] flex items-center justify-between">
            <span>Latency: <strong className="text-[#00e5ff]">{stats.latency}</strong></span>
            <span>Static pixels transmitted: <strong className="text-[#00d084]">0% (Zero waste)</strong></span>
          </div>
        </div>
      </div>

      {/* Speed & Live Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1f2d45]">
        <div className="p-3 rounded-lg bg-[#121a2a] border border-[#1f2d45]">
          <div className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Temporal Latency</div>
          <div className="text-lg font-mono font-bold text-[#00e5ff] mt-0.5">&lt; 10 µs</div>
          <div className="text-[10px] text-gray-500">1000x faster than standard video</div>
        </div>
        <div className="p-3 rounded-lg bg-[#121a2a] border border-[#1f2d45]">
          <div className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Dynamic Range</div>
          <div className="text-lg font-mono font-bold text-white mt-0.5">&gt; 120 dB</div>
          <div className="text-[10px] text-gray-500">Sunlight to extreme low-light</div>
        </div>
        <div className="p-3 rounded-lg bg-[#121a2a] border border-[#1f2d45]">
          <div className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Power Efficiency</div>
          <div className="text-lg font-mono font-bold text-[#00d084] mt-0.5">Down to 2 mW</div>
          <div className="text-[10px] text-gray-500">Compact edge & wearable ready</div>
        </div>
        <div className="p-3 rounded-lg bg-[#121a2a] border border-[#1f2d45]">
          <div className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Target Speed</div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="range"
              min="0.5"
              max="3.5"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-[#0693e3] cursor-pointer"
            />
            <span className="text-xs font-mono text-gray-300">{speed}x</span>
          </div>
        </div>
      </div>
    </div>
  );
}

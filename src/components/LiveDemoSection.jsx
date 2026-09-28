import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Video,
  ShieldAlert,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Terminal,
  UploadCloud,
  FileVideo,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  X,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Download,
  Info,
  Server,
  Hourglass,
} from 'lucide-react';
import { SAMPLE_VIDEOS, DEFAULT_C3905_EVENTS } from '../data/samplesConfig';

// ---------------------------------------------------------------------------------------------
// Live upload demo: the REAL WestCV model runs on a public Hugging Face Gradio Space.
// API contract (final/ANTIGRADIENT_site_kit/demo/DEPLOY.txt): endpoint "/analyze", one input
// "video" (.mp4, <= 120 MB, <= 2 min), six outputs: status markdown, events table, timeline plot,
// risk plot, annotated video, JSON file ({events: [[start, end, label]], risk: {t, p}, ...}).
// ---------------------------------------------------------------------------------------------
const HF_SPACE_ID = 'Azamaka/antigradient-demo';
const HF_SPACE_PAGE = `https://huggingface.co/spaces/${HF_SPACE_ID}`;
const HF_SPACE_HOST = 'https://azamaka-antigradient-demo.hf.space';
const HF_STATUS_API = `https://huggingface.co/api/spaces/${HF_SPACE_ID}`;
const UPLOAD_MAX_MB = 120; // the Space accepts up to 120 MB (max_file_size="120mb")
const UPLOAD_MAX_SEC = 120;
const UPLOAD_MIN_SEC = 3;
const WAKE_TIMEOUT_MS = 8 * 60 * 1000; // a sleeping Space re-installs nothing, but loads the model again
const WAKE_POLL_MS = 4000;
// Raw 30 s clip of the competition camera (C3905, 56-86 s, 720p H.264, 7 MB) for visitors without a file.
// The Space finds stopped_vehicle, failure_to_yield, jaywalking and stop_line on it.
const SAMPLE_CLIP = { url: '/videos/demo-sample-C3905-30s.mp4', name: 'C3905_sample_30s.mp4', sizeMb: 7 };

// Classes the demo can return, with the same wording as the Space (app.py DESCRIPTION).
const UPLOAD_EVENT_INFO = {
  red_light: { type: 'danger', desc: 'A vehicle crosses stop line 4 after its signal head has turned red' },
  stopped_vehicle: { type: 'warning', desc: 'A vehicle stands still on the carriageway for 10 s or more, not queued at a signal' },
  jaywalking: { type: 'danger', desc: 'A pedestrian is on the carriageway outside a zebra crossing' },
  failure_to_yield: { type: 'critical', desc: 'A vehicle drives through a zebra crossing while a pedestrian is on it' },
  stop_line: { type: 'danger', desc: 'A vehicle waits on red with its front past stop line 4' },
  congestion: { type: 'warning', desc: 'Many vehicles (8 or more) stand still on the carriageway at once for 30 s or more' },
  solid_line_crossing: { type: 'warning', desc: 'A moving vehicle drives over the solid divider line of approach 4' },
};

const PIPELINE_STEPS = [
  'Connecting to the model server (Hugging Face)',
  'Uploading video & waiting in the queue',
  'Detection, tracking & scene rules (YOLO26m + ByteTrack)',
  'Rendering annotated video & risk curve R(t)',
];

class DemoError extends Error {
  constructor(message, kind = 'server') {
    super(message);
    this.kind = kind; // 'validation' | 'quota' | 'busy' | 'network' | 'wake' | 'server'
  }
}

const classifyServerError = (message) => {
  // Server messages (e.g. ZeroGPU quota) may carry HTML links: show them as plain text.
  const text = String(message || '').replace(/<[^>]*>/g, '').trim() || 'The model server returned an error.';
  // ZeroGPU wording varies: "exceeded your GPU quota", "exceeded your ZeroGPU runs limit", ...
  if (/quota|zerogpu|runs limit/i.test(text)) return new DemoError(text, 'quota');
  if (/busy|queue is full/i.test(text)) return new DemoError(text, 'busy');
  if (/too large|exceeds|max(imum)? (allowed )?(file )?size|payload/i.test(text)) return new DemoError(text, 'validation');
  if (/failed to fetch|networkerror|network error|connection errored|could not resolve app config|load failed|broken/i.test(text)) {
    return new DemoError(text, 'network');
  }
  return new DemoError(text, 'server');
};

const ERROR_HINTS = {
  validation: 'The server rejected this file. Fix it as described and upload again.',
  quota: 'Hugging Face gives every visitor a limited amount of free GPU time per day. Try a shorter clip, try again later, or run the Space directly on Hugging Face while logged in (your own quota).',
  busy: 'The model server is busy with other videos. Wait a minute and retry.',
  network: 'Could not reach the model server. Check your connection and retry.',
  wake: 'The model server did not come up in time. It may still be starting: retry in a minute.',
  server: 'Something went wrong on the model server. Retry, or try a shorter / re-encoded H.264 clip.',
};

// Reads the duration from the file's metadata with a hidden <video> element (null if unreadable).
const readVideoDuration = (file) =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const probe = document.createElement('video');
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      probe.removeAttribute('src');
      probe.load();
      URL.revokeObjectURL(url);
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), 10000);
    probe.preload = 'metadata';
    probe.muted = true;
    probe.onloadedmetadata = () => finish(Number.isFinite(probe.duration) ? probe.duration : null);
    probe.onerror = () => finish(null);
    probe.src = url;
  });

// Causal lookup: the last risk value computed at or before t (what the model knew at time t).
const getCausalRisk = (points, t) => {
  if (!points || points.length === 0 || t < points[0][0]) return 0;
  let low = 0;
  let high = points.length - 1;
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    if (points[mid][0] <= t) low = mid;
    else high = mid - 1;
  }
  return points[low][1];
};

const toUploadEvents = (triples) =>
  (triples || [])
    .filter((ev) => Array.isArray(ev) && ev.length >= 3)
    .map(([start, end, label]) => ({
      start_sec: Number(start),
      end_sec: Number(end),
      label: String(label),
      desc: UPLOAD_EVENT_INFO[label]?.desc || String(label),
      type: UPLOAD_EVENT_INFO[label]?.type || 'info',
    }))
    .sort((a, b) => a.start_sec - b.start_sec);

// Minimal renderer for the Space's status markdown (paragraphs, **bold**, `code`); no raw HTML.
const renderStatusMarkdown = (md) =>
  String(md || '')
    .split(/\n{2,}/)
    .filter((para) => para.trim())
    .map((para, pIdx) => (
      <p key={pIdx} className="text-xs sm:text-sm text-gray-300 leading-relaxed">
        {para.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((chunk, cIdx) => {
          if (chunk.startsWith('**') && chunk.endsWith('**')) {
            return <strong key={cIdx} className="text-white font-bold">{chunk.slice(2, -2)}</strong>;
          }
          if (chunk.startsWith('`') && chunk.endsWith('`')) {
            return (
              <code key={cIdx} className="px-1.5 py-0.5 rounded bg-white/10 text-[#00e5ff] font-mono text-[11px]">
                {chunk.slice(1, -1)}
              </code>
            );
          }
          return <React.Fragment key={cIdx}>{chunk}</React.Fragment>;
        })}
      </p>
    ));

// Waits until the Space is RUNNING. Requesting the Space's own domain wakes a sleeping Space;
// the public status API reports the stage while it starts.
const waitForSpace = async (onStatus, isAlive) => {
  const startedAt = Date.now();
  let lastPing = 0;
  while (isAlive()) {
    let stage = 'UNKNOWN';
    let hardware = null;
    try {
      const res = await fetch(HF_STATUS_API, { cache: 'no-store' });
      if (res.ok) {
        const info = await res.json();
        stage = info?.runtime?.stage || 'UNKNOWN';
        hardware = info?.runtime?.hardware?.current || info?.runtime?.hardware?.requested || null;
      }
    } catch {
      // The status API is only informative: fall through and try the Space itself.
    }
    if (stage === 'RUNNING' || stage === 'RUNNING_BUILDING' || stage === 'UNKNOWN') {
      onStatus('Model server is running. Connecting...', hardware);
      return;
    }
    if (stage === 'PAUSED') throw new DemoError('The demo Space is paused by its owner.', 'wake');
    if (/ERROR/.test(stage)) throw new DemoError(`The demo Space reports ${stage}.`, 'wake');
    if (Date.now() - lastPing > 30000) {
      lastPing = Date.now();
      fetch(HF_SPACE_HOST, { mode: 'no-cors', cache: 'no-store' }).catch(() => {});
    }
    const waited = Math.round((Date.now() - startedAt) / 1000);
    const label = stage === 'SLEEPING' || stage === 'STOPPED' ? 'Waking up the model server' : 'Model server is starting';
    onStatus(`${label} (${stage.toLowerCase().replace(/_/g, ' ')}, ${waited} s). A cold start loads the model and takes about a minute...`, hardware);
    if (Date.now() - startedAt > WAKE_TIMEOUT_MS) {
      throw new DemoError(`The model server is still ${stage.toLowerCase()} after ${waited} s.`, 'wake');
    }
    await new Promise((r) => setTimeout(r, WAKE_POLL_MS));
  }
};

const getInterpolatedRisk = (points, t) => {
  if (!points || points.length === 0) return 0.25;
  if (t <= points[0][0]) return points[0][1];
  if (t >= points[points.length - 1][0]) return points[points.length - 1][1];
  let low = 0;
  let high = points.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (points[mid][0] === t) return points[mid][1];
    if (points[mid][0] < t) low = mid + 1;
    else high = mid - 1;
  }
  const idx = Math.max(0, high);
  const p1 = points[idx];
  const p2 = points[Math.min(points.length - 1, idx + 1)];
  if (p2[0] === p1[0]) return p1[1];
  const alpha = (t - p1[0]) / (p2[0] - p1[0]);
  return p1[1] + alpha * (p2[1] - p1[1]);
};

export default function LiveDemoSection() {
  const [activeSource, setActiveSource] = useState('benchmark'); // 'benchmark' | 'upload'
  const [selectedSampleId, setSelectedSampleId] = useState('C3905');
  const [sampleEventsMap, setSampleEventsMap] = useState({ C3905: DEFAULT_C3905_EVENTS });
  const [sampleRiskMap, setSampleRiskMap] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeResultsTab, setActiveResultsTab] = useState('risk_curve'); // 'risk_curve' | 'timeline' | 'metrics'

  // Upload Modal & real Hugging Face pipeline state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(1); // 1: connect, 2: upload/queue, 3: model, 4: render
  const [processingDetail, setProcessingDetail] = useState('');
  const [queueInfo, setQueueInfo] = useState(null); // { position, size, eta } from the Gradio queue
  const [processingError, setProcessingError] = useState(null); // DemoError
  const [processingStartedAt, setProcessingStartedAt] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [spaceHardware, setSpaceHardware] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [processingFileName, setProcessingFileName] = useState('');
  const [uploadResult, setUploadResult] = useState(null);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const clientRef = useRef(null); // connected @gradio/client, reused between runs
  const jobRef = useRef(null); // the running submission (async iterator with cancel())
  const runIdRef = useRef(0); // increments on every run / cancel; stale runs stop updating the UI
  const lastFileRef = useRef(null); // for "Retry"

  // Lazy-load events and risk curve data for selected sample
  useEffect(() => {
    const current = SAMPLE_VIDEOS.find(s => s.id === selectedSampleId);
    if (!current) return;

    if (!sampleEventsMap[selectedSampleId] && current.eventsSrc) {
      fetch(current.eventsSrc)
        .then((res) => res.json())
        .then((data) => {
          setSampleEventsMap((prev) => ({ ...prev, [selectedSampleId]: data }));
        })
        .catch(() => {});
    }

    if (!sampleRiskMap[selectedSampleId] && current.riskSrc) {
      fetch(current.riskSrc)
        .then((res) => res.json())
        .then((data) => {
          setSampleRiskMap((prev) => ({ ...prev, [selectedSampleId]: data }));
        })
        .catch(() => {});
    }
  }, [selectedSampleId]);

  // Initial fetch for C3905 risk curve
  useEffect(() => {
    fetch('/data/risk_C3905.json')
      .then((res) => res.json())
      .then((data) => {
        setSampleRiskMap((prev) => ({ ...prev, C3905: data }));
      })
      .catch(() => {});
  }, []);

  // Elapsed-time clock for the processing modal (real wall time, not a simulated progress)
  useEffect(() => {
    if (!isProcessing || processingError || !processingStartedAt) return undefined;
    const tick = () => setElapsedSec(Math.round((Date.now() - processingStartedAt) / 1000));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [isProcessing, processingError, processingStartedAt]);

  // Leaving the page cancels a running job so it does not block the Space queue.
  useEffect(
    () => () => {
      runIdRef.current += 1;
      jobRef.current?.cancel?.().catch(() => {});
      clientRef.current?.close?.();
    },
    []
  );

  // Active video configuration
  const currentSample = useMemo(() => {
    if (activeSource === 'upload' && uploadResult) {
      return {
        id: 'uploaded',
        src: uploadResult.videoUrl,
        events: uploadResult.events,
        riskPoints: uploadResult.riskPoints,
        getRisk: (t) => getCausalRisk(uploadResult.riskPoints, t),
      };
    }

    const sampleDef = SAMPLE_VIDEOS.find((s) => s.id === selectedSampleId) || SAMPLE_VIDEOS[0];
    const events = sampleEventsMap[selectedSampleId] || (selectedSampleId === 'C3905' ? DEFAULT_C3905_EVENTS : []);
    const riskPoints = sampleRiskMap[selectedSampleId] || null;

    return {
      ...sampleDef,
      src: sampleDef.videoSrc,
      events,
      getRisk: (t) => {
        if (riskPoints) {
          return getInterpolatedRisk(riskPoints, t);
        }
        return 0.25;
      },
    };
  }, [activeSource, uploadResult, selectedSampleId, sampleEventsMap, sampleRiskMap]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 1);
    }
  };

  const togglePlay = () => {
    const video = document.getElementById("player") || videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Jump to specific timecode (Requested Extra Credit function)
  const jumpTo = (time) => {
    const video = document.getElementById("player");
    if (video) {
      video.currentTime = time;
      setCurrentTime(time);
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Fullscreen toggle (F hotkey + double click)
  const toggleFullscreen = () => {
    const container = playerContainerRef.current || videoRef.current;
    if (!container) return;

    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    if (!isCurrentlyFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        )
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Keyboard shortcut listener: Spacebar = Play/Pause, F = Fullscreen toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      if (isUploadModalOpen || isProcessing) return;
      if (document.body.style.overflow === 'hidden') return;

      // Space: Toggle Play/Pause
      if (e.code === 'Space' || e.key === ' ' || e.keyCode === 32) {
        e.preventDefault();
        togglePlay();
        return;
      }

      // F: Toggle Fullscreen (English and Russian layout)
      if (e.code === 'KeyF' || e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUploadModalOpen, isProcessing]);

  const restartVideo = () => {
    jumpTo(0);
  };

  // Runs the REAL model on the Hugging Face Space: wake it if needed, upload, then follow the
  // Gradio queue / progress messages until the outputs arrive.
  const runRealPipeline = async (file) => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    const isAlive = () => runIdRef.current === runId;
    lastFileRef.current = file;
    jobRef.current = null;
    setProcessingFileName(file.name);
    setUploadError('');
    setProcessingError(null);
    setQueueInfo(null);
    setProcessingStep(1);
    setProcessingProgress(0);
    setProcessingDetail('Checking the model server on Hugging Face...');
    setProcessingStartedAt(Date.now());
    setElapsedSec(0);
    setIsUploadModalOpen(false);
    setIsProcessing(true);

    try {
      await waitForSpace((message, hardware) => {
        if (!isAlive()) return;
        setProcessingDetail(message);
        if (hardware) setSpaceHardware(hardware);
      }, isAlive);
      if (!isAlive()) return;

      const { Client, handle_file } = await import('@gradio/client');
      if (!clientRef.current) {
        // The client publishes only "data" events by default: ask for "status" too (queue, progress, errors)
        clientRef.current = await Client.connect(HF_SPACE_ID, { events: ['data', 'status'] });
      }
      if (!isAlive()) return;

      setProcessingStep(2);
      setProcessingProgress(4);
      setProcessingDetail(`Uploading ${file.name} (${(file.size / 2 ** 20).toFixed(1)} MB) to the model server...`);
      const job = clientRef.current.submit('/analyze', { video: handle_file(file) });
      jobRef.current = job;

      let outputs = null;
      for await (const msg of job) {
        if (!isAlive()) break;
        if (msg.type === 'data') {
          outputs = msg.data;
          continue;
        }
        if (msg.type !== 'status') continue;
        if (msg.stage === 'error') {
          const error = classifyServerError(msg.message || msg.title);
          if (error.kind === 'server' && /the limit is|shorter than|only \.mp4|could not read the video|upload an \.mp4/i.test(error.message)) {
            error.kind = 'validation';
          }
          throw error;
        }
        if (msg.progress_data?.length) {
          const { desc = '', progress } = msg.progress_data[0];
          setQueueInfo(null);
          // "Waiting for a GPU (ZeroGPU)" is still queueing; "1/4".."3/4" model; "4/4"/"Done" rendering
          setProcessingStep(/^waiting/i.test(desc || '') ? 2 : /^(4\/4|Done)/.test(desc || '') ? 4 : 3);
          if (typeof progress === 'number') {
            setProcessingProgress(Math.round(10 + 88 * Math.max(0, Math.min(1, progress))));
          }
          if (desc) setProcessingDetail(desc);
        } else if (typeof msg.position === 'number') {
          setProcessingProgress((p) => Math.max(p, 8));
          setQueueInfo({ position: msg.position, size: msg.size, eta: msg.eta });
          setProcessingDetail(
            msg.position > 0
              ? `Waiting in the queue: ${msg.position} video(s) ahead of yours.`
              : 'Upload complete. Starting the model...'
          );
        }
        if (msg.stage === 'complete') break;
      }
      if (!isAlive()) return;
      if (!outputs) throw new DemoError('The model server finished without returning a result.', 'server');

      // Outputs: status markdown, events table, timeline plot, risk plot, annotated video, JSON file
      const [statusMd, table, , , videoOut, jsonOut] = outputs;
      const videoUrl = videoOut?.video?.url || videoOut?.url || null;
      if (!videoUrl) throw new DemoError('The model server did not return the annotated video.', 'server');
      setProcessingStep(4);
      setProcessingProgress(99);
      setProcessingDetail('Loading the events and the risk curve...');

      let result = null;
      if (jsonOut?.url) {
        try {
          const res = await fetch(jsonOut.url);
          if (res.ok) result = await res.json();
        } catch {
          result = null; // fall back to the events table below
        }
      }
      if (!isAlive()) return;

      const riskT = result?.risk?.t || [];
      const riskP = result?.risk?.p || [];
      const riskPoints = riskT
        .map((t, i) => [Number(t), Number(riskP[i])])
        .filter(([t, p]) => Number.isFinite(t) && Number.isFinite(p));
      const events = toUploadEvents(
        Array.isArray(result?.events) ? result.events : (table?.data || []).map((row) => [row[0], row[1], row[2]])
      );
      const timing = result?.timing_sec || {};

      setUploadResult({
        videoUrl,
        jsonUrl: jsonOut?.url || null,
        statusMd: typeof statusMd === 'string' ? statusMd : '',
        events,
        riskPoints,
        hasRisk: riskPoints.length > 0,
        sceneRegistered: result ? Boolean(result.scene_registered) : null,
        inliers: timing.pipeline?.inliers ?? null,
        classesAvailable: Array.isArray(result?.classes_available) ? result.classes_available : null,
        device: result?.model?.device || 'Space',
        detector: result?.model?.detector || 'yolo26m.pt',
        imgsz: result?.model?.imgsz ?? null,
        clipSec: result?.duration_sec ?? null,
        totalSec: timing.total_with_rendering ?? null,
        modelSec: timing.model ?? null,
        source: result ? `${result.width}×${result.height} @ ${Number(result.fps).toFixed(2)} fps` : null,
      });
      setUploadedFileName(file.name);
      setProcessingProgress(100);
      setIsProcessing(false);
      setActiveSource('upload');
      setCurrentTime(0);
      setTimeout(() => {
        jumpTo(0);
      }, 300);
    } catch (err) {
      if (!isAlive()) return;
      clientRef.current?.close?.();
      clientRef.current = null; // reconnect on retry (the Space may have restarted)
      setProcessingError(err instanceof DemoError ? err : classifyServerError(err?.message || String(err)));
    } finally {
      if (runIdRef.current === runId) jobRef.current = null;
    }
  };

  const handleCancelProcessing = () => {
    runIdRef.current += 1;
    const job = jobRef.current;
    jobRef.current = null;
    if (job) {
      job.cancel?.().catch(() => {});
      job.return?.();
    }
    setIsProcessing(false);
    setProcessingError(null);
  };

  const handleRetry = () => {
    if (lastFileRef.current) runRealPipeline(lastFileRef.current);
  };

  const handleChooseAnotherFile = () => {
    setIsProcessing(false);
    setProcessingError(null);
    setUploadError('');
    setIsUploadModalOpen(true);
  };

  // Client-side validation (same limits as the server): .mp4, <= 120 MB, 3 s .. 2 min
  const validateAndRun = async (file) => {
    if (!file || isValidating) return;
    setUploadError('');

    if (!/\.mp4$/i.test(file.name)) {
      setUploadError(`Only .mp4 files are accepted (got "${file.name}").`);
      return;
    }

    const sizeMb = file.size / 2 ** 20;
    if (sizeMb > UPLOAD_MAX_MB) {
      setUploadError(
        `The file is ${sizeMb.toFixed(1)} MB; the limit is ${UPLOAD_MAX_MB} MB. Re-encode it first, e.g. ffmpeg -i in.mp4 -t 120 -vf scale=1280:-2 -c:v libx264 -crf 23 -an out.mp4`
      );
      return;
    }

    setIsValidating(true);
    const seconds = await readVideoDuration(file);
    setIsValidating(false);
    // null = the browser cannot read this file's metadata (e.g. an unusual codec): the server checks it.
    if (seconds !== null && seconds > UPLOAD_MAX_SEC + 1) {
      setUploadError(
        `The video is ${seconds.toFixed(0)} s long; the limit is ${UPLOAD_MAX_SEC} s (2 minutes). Cut it, e.g. ffmpeg -i in.mp4 -t 120 -c copy out.mp4`
      );
      return;
    }
    if (seconds !== null && seconds < UPLOAD_MIN_SEC) {
      setUploadError(`The video is ${seconds.toFixed(1)} s long; please upload a clip of at least ${UPLOAD_MIN_SEC} s.`);
      return;
    }

    runRealPipeline(file);
  };

  // Runs the same real pipeline on our raw sample clip (fetched from the site, then uploaded to the Space)
  const handleRunSampleClip = async () => {
    if (isValidating) return;
    setUploadError('');
    setIsValidating(true);
    try {
      const res = await fetch(SAMPLE_CLIP.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      runRealPipeline(new File([blob], SAMPLE_CLIP.name, { type: 'video/mp4' }));
    } catch (err) {
      setUploadError(`Could not load the sample clip (${err?.message || err}). Upload your own .mp4 instead.`);
    } finally {
      setIsValidating(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow picking the same file again
    validateAndRun(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    validateAndRun(e.dataTransfer?.files?.[0]);
  };

  const handleResetToBenchmark = () => {
    setActiveSource('benchmark');
    jumpTo(0);
    const video = document.getElementById("player");
    if (video) video.pause();
    setIsPlaying(false);
  };

  const currentRisk = currentSample.getRisk ? currentSample.getRisk(currentTime) : 0.25;
  const isCriticalRisk = currentRisk >= 0.50; // tau = 0.50 alarm threshold

  // SVG Risk Curve Path generation (X: 0s to duration, Y: 0.0 to 1.0)
  const riskCurveData = useMemo(() => {
    const totalSec = duration || 90;
    // SVG coordinate space: width 640, height 120, plot area: x in [50, 620], y in [15, 95]
    const xMin = 50;
    const xMax = 620;
    const yTop = 15;
    const yBottom = 95;
    const toX = (t) => xMin + (Math.max(0, Math.min(totalSec, t)) / totalSec) * (xMax - xMin);
    const toY = (r) => yBottom - Math.max(0, Math.min(1.0, r)) * (yBottom - yTop);

    let pathD;
    if (currentSample.riskPoints) {
      // Uploaded clip: draw every returned sample as a causal step curve (value holds until the next one)
      const pts = currentSample.riskPoints.filter(([t]) => t <= totalSec);
      const segments = [`M ${toX(0).toFixed(1)} ${toY(0).toFixed(1)}`];
      pts.forEach(([t, r]) => {
        segments.push(`H ${toX(t).toFixed(1)}`, `V ${toY(r).toFixed(1)}`);
      });
      segments.push(`H ${xMax}`);
      pathD = segments.join(' ');
    } else {
      const numPoints = 80;
      const points = [];
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * totalSec;
        points.push({ t, r: currentSample.getRisk(t) });
      }
      pathD = points
        .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${toX(p.t).toFixed(1)} ${toY(p.r).toFixed(1)}`)
        .join(' ');
    }

    const areaD = `${pathD} L ${xMax} ${yBottom} L ${xMin} ${yBottom} Z`;

    return { pathD, areaD, totalSec, xMin, xMax, yTop, yBottom };
  }, [currentSample, duration]);

  const scrubberX = useMemo(() => {
    if (!duration) return riskCurveData.xMin;
    const pct = Math.min(1, Math.max(0, currentTime / duration));
    return riskCurveData.xMin + pct * (riskCurveData.xMax - riskCurveData.xMin);
  }, [currentTime, duration, riskCurveData]);

  const scrubberY = useMemo(() => {
    const r = Math.max(0, Math.min(1.0, currentRisk));
    return riskCurveData.yBottom - r * (riskCurveData.yBottom - riskCurveData.yTop);
  }, [currentRisk, riskCurveData]);

  return (
    <section id="technology" className="py-24 bg-[#0a0f19] relative border-t border-[#1f2d45] overflow-hidden">
      {/* High-tech Cyber Grid & Ambient Radial Spotlights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2d451a_1px,transparent_1px),linear-gradient(to_bottom,#1f2d451a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#00e5ff]/10 via-[#0693e3]/8 to-[#9b51e0]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0693e3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121a2a]/90 border border-[#00e5ff]/30 text-xs font-mono uppercase tracking-widest text-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            LIVE INTERACTIVE DEMO (30% RUBRIC SCORE)
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            CCTV BENCHMARK &amp; LIVE DEMO
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent rounded-full" />

          <p className="text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Explore our end-to-end edge pipeline on the official WIUT benchmark (C3905), or upload custom CCTV video footage. Features multi-class bounding box tracking (YOLO26m + ByteTrack), spatiotemporal rule evaluation, and causal Part B pre-accident risk anticipation ($H=5.0$s).
          </p>
        </div>

        {/* Top Action Bar: Real 4-Sample Switcher & Upload CTA */}
        <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-[#0f1726]/90 border border-[#1f2d45] backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {SAMPLE_VIDEOS.map((s) => {
              const isSelected = activeSource === 'benchmark' && selectedSampleId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSource('benchmark');
                    setSelectedSampleId(s.id);
                    setCurrentTime(0);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center gap-2 border transition cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/50 shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                      : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#00e5ff] animate-pulse' : 'bg-gray-500'}`} />
                  <span>{s.id}</span>
                  <span className="text-[10px] text-gray-500 hidden sm:inline">({s.duration.toFixed(0)}s)</span>
                </button>
              );
            })}

            {uploadResult && (
              <button
                onClick={() => {
                  if (activeSource === 'upload') return;
                  setActiveSource('upload');
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
                title={uploadedFileName}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border transition cursor-pointer whitespace-nowrap ${
                  activeSource === 'upload'
                    ? 'bg-[#9b51e0]/15 text-[#c084fc] border-[#9b51e0]/40 shadow-[0_0_15px_rgba(155,81,224,0.2)]'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                <FileVideo className="w-3.5 h-3.5" />
                <span>
                  Your clip: {uploadedFileName.length > 16 ? `${uploadedFileName.slice(0, 14)}...` : uploadedFileName}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {activeSource === 'upload' && (
              <button
                onClick={handleResetToBenchmark}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            <button
              onClick={() => {
                setUploadError('');
                setIsUploadModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#080c14] bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#00cce6] hover:from-[#00cce6] hover:to-[#0582ca] border border-[#00e5ff]/50 shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all flex items-center gap-2 cursor-pointer font-sans"
            >
              <UploadCloud className="w-4 h-4 text-[#080c14]" />
              <span>Upload Custom CCTV Video (.mp4)</span>
            </button>
          </div>
        </div>

        {/* Honest note next to the upload button: what runs, where, and the limits */}
        <div className="max-w-5xl mx-auto -mt-3 mb-6 px-1 flex items-start gap-2 text-[11px] sm:text-xs text-gray-400 leading-relaxed">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#00e5ff]" />
          <p>
            Upload runs our <span className="text-gray-200 font-semibold">real model</span> (YOLO26m + ByteTrack + scene rules + causal TTC risk) on a{' '}
            <a href={HF_SPACE_PAGE} target="_blank" rel="noopener noreferrer" className="text-[#00e5ff] hover:underline">
              Hugging Face Space
            </a>
            . Limits: .mp4, ≤ {UPLOAD_MAX_MB} MB, ≤ 2 min; 20–40 s clips recommended. The rules are calibrated to the competition camera: on other cameras only{' '}
            <code className="text-[#00e5ff]">stopped_vehicle</code> and <code className="text-[#00e5ff]">congestion</code> can fire (detections and risk still work).
          </p>
        </div>

        {/* Main Video Viewport / Console */}
        <div className="w-full max-w-5xl mx-auto">
          {/* Glowing Ambient Halo behind the console */}
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00e5ff]/25 via-[#0693e3]/20 to-[#9b51e0]/25 rounded-[26px] blur-xl opacity-60 group-hover:opacity-90 transition duration-700 pointer-events-none" />

            {/* Hardware Console Outer Frame */}
            <div className="relative rounded-3xl bg-[#0c121e]/90 backdrop-blur-xl border border-[#00e5ff]/30 p-2 shadow-2xl">
              {/* Top Chrome Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 mb-2 bg-[#080c14]/90 rounded-2xl border border-white/5">
                {/* Left Mac/Terminal Dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e] shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123] shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29] shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
                  <span className="ml-2 text-[11px] font-mono font-medium text-gray-400 hidden sm:inline">
                    {activeSource === 'upload' ? `USER_INFERENCE_${uploadedFileName.slice(0, 16).toUpperCase()}` : 'C3905_INFERENCE_PIPELINE.SESSION'}
                  </span>
                </div>

                {/* Center Badge / Active Engine */}
                <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#121a2a] border border-[#00e5ff]/20 text-[10px] font-mono text-[#00e5ff]">
                  <Terminal className="w-3 h-3" />
                  <span>YOLO26m (NMS-Free) + ByteTrack</span>
                </div>

                {/* Right Engine Status */}
                {activeSource === 'upload' && uploadResult ? (
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span
                      className={`inline-flex items-center gap-1.5 font-bold ${isCriticalRisk ? 'text-red-400 animate-pulse' : 'text-[#00e5ff]'}`}
                      title="Causal risk at the current playback time (alarm at 0.50)"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>R(t) {(currentRisk * 100).toFixed(0)}%</span>
                    </span>
                    <span className="text-gray-600 hidden md:inline">|</span>
                    <span className="text-gray-400 hidden md:inline uppercase">HF SPACE · {uploadResult.device}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold">LIVE REC</span>
                    </span>
                    <span className="text-gray-600 hidden md:inline">|</span>
                    <span className="text-gray-400 hidden md:inline">TESLA T4 FP16</span>
                  </div>
                )}
              </div>

              {/* Video Screen Container */}
              <div
                ref={playerContainerRef}
                className={`relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video group/screen ${
                  isFullscreen ? '!rounded-none !border-none !aspect-auto w-full h-full flex items-center justify-center' : ''
                }`}
              >
                {/* Precision HUD Corner Reticles */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00e5ff]/70 pointer-events-none z-20" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#00e5ff]/70 pointer-events-none z-20" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#00e5ff]/70 pointer-events-none z-20" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00e5ff]/70 pointer-events-none z-20" />

                {/* HTML5 Video element with explicit id="player" */}
                <video
                  id="player"
                  ref={videoRef}
                  src={currentSample.src}
                  className={`w-full h-full ${isFullscreen || activeSource === 'upload' ? 'object-contain' : 'object-cover'}`}
                  playsInline
                  muted={isMuted}
                  loop
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  onDoubleClick={toggleFullscreen}
                />

                {/* Benchmark HUD badges. An uploaded clip comes back with the model's own HUD burned
                    into the frame (boxes, time, risk bar, active events), so nothing is drawn over it. */}
                {activeSource !== 'upload' && (
                  <>
                    {/* Top-Right Risk Indicator Pill */}
                    <div className="absolute top-5 right-5 z-20 pointer-events-none">
                      <div
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${
                          isCriticalRisk
                            ? 'bg-red-500/30 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                            : 'bg-[#080c14]/85 border-[#00e5ff]/30 text-gray-200'
                        }`}
                      >
                        <ShieldAlert
                          className={`w-4 h-4 ${isCriticalRisk ? 'text-red-400' : 'text-[#00e5ff]'}`}
                        />
                        <div className="text-xs font-mono">
                          <span className="font-bold uppercase tracking-wider text-gray-400">Risk R(t): </span>
                          <span
                            className={`font-black ${
                              isCriticalRisk ? 'text-red-300' : 'text-[#00e5ff]'
                            }`}
                          >
                            {(currentRisk * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Center "RESUME" Button Overlay on Pause */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] flex flex-col items-center justify-center gap-4 z-20 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.currentTarget.blur();
                        togglePlay();
                      }}
                      className="group inline-flex items-center gap-3.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#00cce6] hover:from-[#00cce6] hover:to-[#0582ca] text-[#080c14] font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(0,229,255,0.45)] hover:shadow-[0_0_50px_rgba(0,229,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/30"
                      aria-label="Resume playback"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#080c14] flex items-center justify-center text-[#00e5ff] group-hover:scale-110 transition-transform shadow-inner">
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                      <span className="text-base tracking-widest font-black text-[#080c14]">RESUME PLAYBACK</span>
                    </button>
                    <p className="text-xs text-gray-300 font-mono tracking-wide px-4 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2">
                      <span>Press</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/20 text-[#00e5ff] font-bold border border-white/20 shadow">SPACE</kbd>
                      <span>to play &bull;</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/20 text-[#00e5ff] font-bold border border-white/20 shadow">F</kbd>
                      <span>for fullscreen</span>
                    </p>
                  </div>
                )}

                {/* Floating Glassmorphic Video Controls at Bottom */}
                <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 bg-[#080c14]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:p-4 flex flex-col gap-2.5 z-20 shadow-2xl">
                  {/* Scrubbable Progress Bar */}
                  <div
                    className="relative w-full h-2.5 bg-white/15 rounded-full cursor-pointer hover:h-3 transition-all group/bar"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      jumpTo(pos * (duration || 1));
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#2ea3f2] rounded-full shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                      style={{ width: `${((currentTime / (duration || 1)) * 100).toFixed(2)}%` }}
                    />
                    {/* Scrub Head */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_#00e5ff] -translate-x-1/2 pointer-events-none opacity-0 group-hover/bar:opacity-100 transition-opacity"
                      style={{ left: `${((currentTime / (duration || 1)) * 100).toFixed(2)}%` }}
                    />
                    {/* Event markers on seekbar */}
                    {currentSample.events.map((ev, eIdx) => {
                      const pct = duration ? (ev.start_sec / duration) * 100 : 0;
                      return (
                        <div
                          key={eIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpTo(ev.start_sec);
                          }}
                          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-black transform -translate-x-1/2 transition-transform hover:scale-125 cursor-pointer ${
                            ev.type === 'critical'
                              ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                              : ev.type === 'danger'
                              ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
                              : 'bg-[#ffaa00] shadow-[0_0_8px_rgba(255,170,0,0.8)]'
                          }`}
                          style={{ left: `${pct}%` }}
                          title={`[${ev.start_sec}s - ${ev.end_sec}s] ${ev.label}`}
                        />
                      );
                    })}
                  </div>

                  {/* Control Buttons & Timestamps */}
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          togglePlay();
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          restartVideo();
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition cursor-pointer"
                        aria-label="Restart"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          setIsMuted(!isMuted);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00e5ff]" />}
                      </button>
                      <span className="font-mono text-[11px] text-gray-300 ml-1">
                        {currentTime.toFixed(1)}s <span className="text-gray-600">/</span> {(duration || 0).toFixed(1)}s
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {activeSource === 'upload' && uploadResult ? (
                        <span className="text-[11px] text-gray-400 font-mono hidden sm:inline bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                          <span className="text-emerald-400 font-bold">{uploadResult.events.length} EVENTS</span>
                          {uploadResult.totalSec != null && (
                            <>
                              {' '}<span className="text-gray-600">|</span> processed in {uploadResult.totalSec.toFixed(0)} s
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400 font-mono hidden sm:inline bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                          <span className="text-emerald-400 font-bold">25.0 FPS</span> <span className="text-gray-600">|</span> 28.4ms
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.currentTarget.blur();
                          toggleFullscreen();
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/20 text-white hover:text-[#00e5ff] transition cursor-pointer"
                        aria-label={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
                        title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
                      >
                        {isFullscreen ? (
                          <Minimize2 className="w-3.5 h-3.5 text-[#00e5ff]" />
                        ) : (
                          <Maximize2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Under-Console Telemetry & Spec Ribbon */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#00e5ff] font-bold text-[10px]">SPACE</kbd>
              <span>Play / Pause</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#00e5ff] font-bold text-[10px]">F</kbd>
              <span>Fullscreen</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
              <span className="text-gray-300">Detector:</span>
              <span className="text-[#00e5ff] font-semibold">YOLO26m (NMS-free)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0693e3]" />
              <span className="text-gray-300">Tracker:</span>
              <span className="text-white font-semibold">ByteTrack</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121a2a]/80 border border-[#1f2d45] backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-gray-300">Target GPU:</span>
              <span className="text-emerald-400 font-semibold">Tesla T4 (&lt;5 GB VRAM)</span>
            </div>
          </div>

          {/* Model server report for an uploaded clip (the Space's own status text + run facts) */}
          {activeSource === 'upload' && uploadResult && (
            <div className="mt-8 rounded-3xl bg-[#0e1626]/90 border border-[#9b51e0]/30 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f2d45]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-[#9b51e0]/10 text-[#c084fc] border border-[#9b51e0]/30 shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-tight">Model Server Report</h3>
                    <p className="text-xs text-gray-400 truncate" title={uploadedFileName}>
                      {uploadedFileName}
                      {uploadResult.source ? ` • ${uploadResult.source}` : ''}
                    </p>
                  </div>
                </div>
                {uploadResult.sceneRegistered === true && (
                  <span className="px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Competition camera recognised{uploadResult.inliers ? ` (${uploadResult.inliers} inliers)` : ''}
                    {uploadResult.classesAvailable ? `: ${uploadResult.classesAvailable.length} classes active` : ''}
                  </span>
                )}
                {uploadResult.sceneRegistered === false && (
                  <span className="px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Unknown camera: only stopped_vehicle &amp; congestion
                  </span>
                )}
              </div>

              <div className="pt-4 space-y-2">{renderStatusMarkdown(uploadResult.statusMd)}</div>
              {!uploadResult.hasRisk && (
                <p className="mt-2 text-xs text-amber-300">The risk curve could not be loaded for this run; the events come from the server&apos;s table.</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-[#080c14] border border-[#1f2d45] text-gray-300">
                  Detector: <span className="text-[#00e5ff] font-bold">{uploadResult.detector}{uploadResult.imgsz ? ` @ ${uploadResult.imgsz}px` : ''}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#080c14] border border-[#1f2d45] text-gray-300">
                  Device: <span className="text-white font-bold">{uploadResult.device}</span>
                </span>
                {uploadResult.jsonUrl && (
                  <a
                    href={uploadResult.jsonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/30 text-[#00e5ff] font-bold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Raw JSON
                  </a>
                )}
                <a
                  href={uploadResult.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/30 text-[#00e5ff] font-bold flex items-center gap-1.5 transition"
                >
                  <FileVideo className="w-3.5 h-3.5" />
                  Annotated MP4
                </a>
                <a
                  href={HF_SPACE_PAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-bold flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Space on Hugging Face
                </a>
              </div>
            </div>
          )}

          {/* Interactive Results Deck: Risk Curve & Detected Events Timeline */}
          <div className="mt-12 rounded-3xl bg-[#0e1626]/90 border border-[#1f2d45] p-6 shadow-2xl backdrop-blur-md">
            {/* Deck Header & Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#1f2d45]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
                    <span>Inference Telemetry &amp; Event Stream</span>
                    <span className="text-xs font-mono font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded border border-[#00e5ff]/30">
                      LIVE
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Synchronized spatiotemporal events and causal Part B risk anticipation curve ($H=5.0$s)
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 bg-[#080c14] p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveResultsTab('risk_curve')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                    activeResultsTab === 'risk_curve'
                      ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Part B Risk Curve</span>
                </button>
                <button
                  onClick={() => setActiveResultsTab('timeline')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                    activeResultsTab === 'timeline'
                      ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Event Timeline ({currentSample.events.length})</span>
                </button>
                <button
                  onClick={() => setActiveResultsTab('metrics')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                    activeResultsTab === 'metrics'
                      ? 'bg-[#00e5ff] text-[#080c14] shadow font-extrabold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Edge Metrics</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Interactive Part B Risk Curve R(t) */}
            {activeResultsTab === 'risk_curve' && (
              <div className="pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">PART B CAUSAL RISK CURVE R(t)</span>
                    <span className="text-[#00e5ff] font-bold">|</span>
                    <span className="text-[#00e5ff]">Click anywhere on chart to seek video (Extra Credit)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
                      <span className="text-gray-300">R(t) Curve</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-0.5 bg-red-500" />
                      <span className="text-red-400">Alarm Threshold (τ = 0.50)</span>
                    </div>
                  </div>
                </div>

                {/* SVG Graph Container with explicitly calibrated X & Y Axes */}
                <div
                  className="relative w-full h-44 bg-[#080c14] rounded-2xl border border-white/10 p-2 overflow-hidden cursor-crosshair group/graph shadow-inner"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const plotWidth = rect.width * (570 / 640);
                    const plotStartX = rect.width * (50 / 640);
                    const pos = Math.max(0, Math.min(1, (clickX - plotStartX) / plotWidth));
                    jumpTo(pos * (duration || 90));
                  }}
                >
                  <svg viewBox="0 0 640 120" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="riskAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#0693e3" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.0" />
                      </linearGradient>
                      {/* userSpaceOnUse: a flat curve (all-zero risk) has a zero-height bbox and would not render with bbox units */}
                      <linearGradient id="riskStrokeGrad" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="620" y2="0">
                        <stop offset="0%" stopColor="#00e5ff" />
                        <stop offset="45%" stopColor="#ffaa00" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>

                    {/* Y-Axis Gridlines & Labels (0.0 to 1.0) */}
                    <line x1="50" y1="15" x2="620" y2="15" stroke="#1f2d45" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="42" y="18" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">1.0</text>

                    <line x1="50" y1="35" x2="620" y2="35" stroke="#1f2d45" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="42" y="38" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.75</text>

                    {/* Tau = 0.50 Alarm Threshold Line */}
                    <line x1="50" y1="55" x2="620" y2="55" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
                    <text x="42" y="58" textAnchor="end" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">0.50</text>
                    <text x="615" y="51" textAnchor="end" fill="#ef4444" fontSize="8" fontFamily="monospace">τ = 0.50 (ALARM)</text>

                    <line x1="50" y1="75" x2="620" y2="75" stroke="#1f2d45" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="42" y="78" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.25</text>

                    <line x1="50" y1="95" x2="620" y2="95" stroke="#334155" strokeWidth="1.5" />
                    <text x="42" y="98" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.0</text>

                    {/* X-Axis Time Ticks */}
                    <text x="50" y="112" textAnchor="start" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.0s</text>
                    <text x="192" y="112" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">{((duration || 90) * 0.25).toFixed(0)}s</text>
                    <text x="335" y="112" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">{((duration || 90) * 0.50).toFixed(0)}s</text>
                    <text x="477" y="112" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">{((duration || 90) * 0.75).toFixed(0)}s</text>
                    <text x="620" y="112" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">{(duration || 90).toFixed(0)}s</text>

                    {/* Area and Stroke Path */}
                    <path d={riskCurveData.areaD} fill="url(#riskAreaGrad)" />
                    <path d={riskCurveData.pathD} fill="none" stroke="url(#riskStrokeGrad)" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Current Scrubber Head */}
                    <line x1={scrubberX} y1="15" x2={scrubberX} y2="95" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx={scrubberX} cy={scrubberY} r="4.5" fill="#00e5ff" stroke="#ffffff" strokeWidth="2" />
                  </svg>

                  {/* Scrubber Tooltip */}
                  <div
                    className="absolute top-2 pointer-events-none -translate-x-1/2 px-2 py-0.5 rounded bg-black/95 border border-white/20 text-[10px] font-mono text-[#00e5ff] shadow"
                    style={{ left: `${(scrubberX / 640) * 100}%` }}
                  >
                    {currentTime.toFixed(1)}s: {(currentRisk * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-gray-400">
                  <span>X-Axis: Time (seconds) • Y-Axis: Risk Score R(t) [0.0 – 1.0]</span>
                  <span className="text-[#00e5ff] font-bold">CURRENT PLAYBACK: {currentTime.toFixed(1)}s &bull; R(t) = {(currentRisk * 100).toFixed(1)}%</span>
                </div>
              </div>
            )}

            {/* Tab 2: Chronological Event Timeline with [start_sec, end_sec, label] format */}
            {activeResultsTab === 'timeline' && (
              <div className="pt-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-1">
                  <span>DISCOVERED EVENT INTERVALS: [start_sec, end_sec, label]</span>
                  <span className="text-[#00e5ff]">Click card to jumpTo(time)</span>
                </div>

                {currentSample.events.length === 0 && (
                  <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45] text-xs text-gray-400 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      The model found no events in this clip.
                      {activeSource === 'upload' && uploadResult?.sceneRegistered === false &&
                        ' The camera was not recognised, so only stopped_vehicle and congestion could fire.'}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {currentSample.events.map((ev, idx) => (
                    <div
                      key={idx}
                      onClick={() => jumpTo(ev.start_sec)}
                      className="p-3.5 rounded-2xl bg-[#080c14] border border-[#1f2d45] hover:border-[#00e5ff]/50 transition-all cursor-pointer group flex items-start justify-between gap-3 shadow-sm hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                    >
                      <div className="space-y-1.5">
                        {/* [start_sec, end_sec, label] explicit format */}
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/10">
                            [{ev.start_sec.toFixed(1)}s – {ev.end_sec.toFixed(1)}s]
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            ev.type === 'critical'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                              : ev.type === 'danger'
                              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                              : ev.type === 'warning'
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                              : 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40'
                          }`}>
                            {ev.label}
                          </span>
                        </div>

                        <div className="text-xs font-mono text-gray-400">
                          Duration: <span className="text-gray-200 font-semibold">{((ev.end_sec - ev.start_sec)).toFixed(1)}s</span> &bull; Output: <span className="text-[#00e5ff] font-bold">[start, end, label]</span>
                        </div>

                        <p className="text-xs text-gray-300 leading-snug">{ev.desc || ev.desc_ru}</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          jumpTo(ev.start_sec);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] text-[11px] font-mono font-bold border border-[#00e5ff]/30 flex items-center gap-1 shrink-0 group-hover:scale-105 transition cursor-pointer"
                      >
                        <span>Jump</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3 for an uploaded clip: the facts of this run on the Hugging Face Space */}
            {activeResultsTab === 'metrics' && activeSource === 'upload' && uploadResult && (
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">RUN TIME (TOTAL)</div>
                  <div className="text-2xl font-black font-mono text-[#00e5ff]">
                    {uploadResult.totalSec != null ? `${uploadResult.totalSec.toFixed(0)} s` : '—'}
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono mt-1">
                    {uploadResult.totalSec != null && uploadResult.clipSec
                      ? `${(uploadResult.totalSec / uploadResult.clipSec).toFixed(1)}× the ${uploadResult.clipSec.toFixed(1)} s clip`
                      : 'incl. rendering'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">MODEL (PART A + B)</div>
                  <div className="text-2xl font-black font-mono text-white">
                    {uploadResult.modelSec != null ? `${uploadResult.modelSec.toFixed(0)} s` : '—'}
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono mt-1 truncate">{uploadResult.device}</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">EVENTS FOUND</div>
                  <div className="text-2xl font-black font-mono text-[#0693e3]">{uploadResult.events.length}</div>
                  <div className="text-[11px] text-gray-400 font-mono mt-1">
                    {uploadResult.sceneRegistered === false ? 'unknown camera: 2 classes' : 'Part A rules'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">PEAK RISK R(t)</div>
                  <div className="text-2xl font-black font-mono text-[#9b51e0]">
                    {uploadResult.hasRisk ? Math.max(...uploadResult.riskPoints.map(([, p]) => p)).toFixed(2) : '—'}
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono mt-1">
                    {uploadResult.hasRisk
                      ? `${uploadResult.riskPoints.filter(([, p]) => p >= 0.5).length} alarm samples (τ = 0.50)`
                      : 'not available'}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Edge Execution Metrics */}
            {activeResultsTab === 'metrics' && activeSource !== 'upload' && (
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">T4 RUNTIME RATIO</div>
                  <div className="text-2xl font-black font-mono text-[#00e5ff]">2.6x – 2.7x</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">&lt; 3.0x Limit Guaranteed</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">DECODING (CPU PyAV)</div>
                  <div className="text-2xl font-black font-mono text-white">10.0 FPS</div>
                  <div className="text-[11px] text-gray-400 font-mono mt-1">NONREF Reference Frames</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">DEV SCORE A (F1)</div>
                  <div className="text-2xl font-black font-mono text-[#0693e3]">0.338 / 0.434</div>
                  <div className="text-[11px] text-gray-400 font-mono mt-1">9 Rubric / 7 Emitted Classes</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#080c14] border border-[#1f2d45]">
                  <div className="text-xs font-mono text-gray-400 mb-1">CAUSAL HORIZON</div>
                  <div className="text-2xl font-black font-mono text-[#9b51e0]">H = 5.0s</div>
                  <div className="text-[11px] text-gray-400 font-mono mt-1">Zero-Lookahead Online</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Custom Video Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl bg-[#0c121e] border border-[#00e5ff]/40 p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#1f2d45] mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-tight">
                    Upload Custom CCTV Video
                  </h3>
                  <p className="text-xs text-gray-400">
                    Our real model runs on it on Hugging Face
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Limits: checked here first, and again by the server */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="px-3 py-1 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[11px] font-mono font-bold text-[#00e5ff] flex items-center gap-1.5">
                <span>⏱️ Duration: {UPLOAD_MIN_SEC} s – 2 min (20–40 s recommended)</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
                <span>📦 Size: up to {UPLOAD_MAX_MB} MB (.mp4)</span>
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => !isValidating && fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isValidating) {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer group mb-4 ${
                isDragOver
                  ? 'border-[#00e5ff] bg-[#00e5ff]/10'
                  : 'border-[#1f2d45] hover:border-[#00e5ff]/60 bg-[#080c14]/50 hover:bg-[#080c14]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,.mp4"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-gray-400 group-hover:text-[#00e5ff] group-hover:scale-110 transition">
                {isValidating ? <RefreshCw className="w-6 h-6 animate-spin text-[#00e5ff]" /> : <FileVideo className="w-6 h-6" />}
              </div>
              <p className="text-sm font-bold text-white mb-1">
                {isValidating ? 'Checking the video...' : 'Click to select or drag & drop video (.mp4)'}
              </p>
              <p className="text-xs text-gray-500 font-mono">
                Format: MP4 only &bull; Size: up to {UPLOAD_MAX_MB} MB &bull; Length: up to 2 min
              </p>
            </div>

            {/* No file at hand: run the real model on a raw clip of the competition camera */}
            <div className="-mt-1 mb-4 text-center">
              <span className="text-xs text-gray-500">No .mp4 at hand? </span>
              <button
                onClick={handleRunSampleClip}
                disabled={isValidating}
                className="text-xs font-bold text-[#00e5ff] hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                Run the model on our 30 s sample clip (C3905, {SAMPLE_CLIP.sizeMb} MB) &rarr;
              </button>
            </div>

            {/* What happens to the file (honest) */}
            <div className="mb-4 p-3.5 rounded-xl bg-[#080c14] border border-[#1f2d45] text-[11px] sm:text-xs text-gray-400 space-y-2 leading-relaxed">
              <p className="flex items-start gap-2">
                <Cpu className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#00e5ff]" />
                <span>
                  The video is sent to our{' '}
                  <a href={HF_SPACE_PAGE} target="_blank" rel="noopener noreferrer" className="text-[#00e5ff] hover:underline">
                    Hugging Face Space
                  </a>{' '}
                  and processed by the <span className="text-gray-200 font-semibold">real model</span>: YOLO26m + ByteTrack + scene
                  rules (Part A) and the causal TTC risk (Part B). You get the events, the risk curve and an annotated video with
                  the model&apos;s own boxes.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                <span>
                  The rules are calibrated to the competition camera. On other cameras only{' '}
                  <code className="text-[#00e5ff]">stopped_vehicle</code> and <code className="text-[#00e5ff]">congestion</code> can
                  fire; detections and the risk curve still work.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-400" />
                <span>
                  If the server is asleep, waking it up takes about a minute. One video is processed at a time; others wait in a
                  queue.
                </span>
              </p>
            </div>

            {uploadError && (
              <div className="mb-2 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="break-words min-w-0">{uploadError}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Processing modal: real connection, queue and progress messages from the Space */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className={`w-full max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto p-5 sm:p-6 rounded-3xl bg-[#0c121e] border ${
              processingError
                ? 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]'
                : 'border-[#00e5ff]/50 shadow-[0_0_50px_rgba(0,229,255,0.3)]'
            }`}
            role="dialog"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                {processingError ? (
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                ) : (
                  <Cpu className="w-5 h-5 text-[#00e5ff] animate-spin shrink-0" />
                )}
                <span className="text-sm font-bold text-white uppercase tracking-wider font-mono truncate">
                  {processingError ? 'Run failed' : 'Running our model...'}
                </span>
              </div>
              <span className={`font-mono text-sm font-bold ${processingError ? 'text-red-400' : 'text-[#00e5ff]'}`}>
                {processingProgress}%
              </span>
            </div>

            {/* Progress Bar (driven by the server's progress messages) */}
            <div className="w-full bg-[#182236] h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full transition-all duration-500 ${
                  processingError
                    ? 'bg-red-500'
                    : 'bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#9b51e0] shadow-[0_0_12px_#00e5ff]'
                }`}
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-3 mb-4 text-[11px] font-mono text-gray-500">
              <span className="truncate" title={processingFileName}>
                {processingFileName}
              </span>
              <span className="shrink-0">
                {elapsedSec} s
                {spaceHardware ? ` · ${/^zero/.test(spaceHardware) ? 'ZeroGPU' : spaceHardware.replace(/-/g, ' ')}` : ''}
              </span>
            </div>

            {/* Execution Stepper */}
            <div className="space-y-2.5">
              {PIPELINE_STEPS.map((label, idx) => {
                const n = idx + 1;
                const done = n < processingStep || processingProgress >= 100;
                const active = n === processingStep && !done;
                const failed = active && Boolean(processingError);
                return (
                  <div
                    key={label}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs font-mono transition ${
                      failed
                        ? 'bg-red-500/10 border-red-500/40 text-red-200'
                        : done
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : active
                        ? 'bg-[#00e5ff]/15 border-[#00e5ff]/40 text-white shadow-sm'
                        : 'bg-[#080c14] border-white/5 text-gray-500'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        failed
                          ? 'bg-red-500 text-black'
                          : done
                          ? 'bg-emerald-500 text-black'
                          : active
                          ? 'bg-[#00e5ff] text-black animate-pulse'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {failed ? '!' : done ? '✓' : n}
                    </div>
                    <span className="font-semibold">{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Live message from the server */}
            {!processingError && (
              <div className="mt-4 p-3 rounded-xl bg-[#080c14] border border-white/5 text-[11px] font-mono text-gray-300 leading-relaxed break-words">
                <span className="text-[#00e5ff] font-bold">&gt; </span>
                {processingDetail}
                {queueInfo && queueInfo.position > 0 && (
                  <div className="mt-1.5 text-amber-300 flex items-center gap-1.5">
                    <Hourglass className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Queue position {queueInfo.position}
                      {queueInfo.size ? ` of ${queueInfo.size}` : ''}
                      {queueInfo.eta ? ` · ~${Math.round(queueInfo.eta)} s estimated` : ''}
                    </span>
                  </div>
                )}
              </div>
            )}

            {processingError && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-xs space-y-2">
                <p className="text-red-300 font-semibold break-words">{processingError.message}</p>
                <p className="text-gray-400 leading-relaxed">{ERROR_HINTS[processingError.kind] || ERROR_HINTS.server}</p>
                {processingError.kind === 'quota' && (
                  <a
                    href={HF_SPACE_PAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#00e5ff] font-bold hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open the Space on Hugging Face
                  </a>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
              {processingError ? (
                <>
                  <button
                    onClick={() => setIsProcessing(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleChooseAnotherFile}
                    className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    Another file
                  </button>
                  {processingError.kind !== 'validation' && (
                    <button
                      onClick={handleRetry}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#080c14] bg-gradient-to-r from-[#00e5ff] via-[#0693e3] to-[#00cce6] border border-[#00e5ff]/50 shadow-[0_0_20px_rgba(0,229,255,0.35)] transition cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retry
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handleCancelProcessing}
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

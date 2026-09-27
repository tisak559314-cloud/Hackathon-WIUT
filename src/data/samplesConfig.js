// Real Dataset & Evaluation Telemetry for ANTIGRADIENT • WIUT Hackathon 2026
// Source: all/ (ANTIGRADIENT site kit, WestCV v1.0.0 pipeline)

export const SAMPLE_VIDEOS = [
  {
    id: 'C3905',
    title: 'Clip 4: C3905 (Dusk & Headlights)',
    location: 'Tashkent Junction • Camera C3905 (17:22:21)',
    timeOfDay: '17:22:21 • Dusk (43 Lux)',
    duration: 127.63,
    videoSrc: '/videos/annotated_C3905.mp4',
    eventsSrc: '/data/events_C3905.json',
    riskSrc: '/data/risk_C3905.json',
    badge: 'Official Benchmark Sample',
    badgeColor: 'text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/30',
    description: 'Dusk clip with low lux (43/255) and vehicle headlights. Evaluates failure_to_yield on zebra 3, stopped vehicles on carriageway, stop line, and jaywalking.',
    runtimeSec: 381.6,
    runtimeX: '2.99x',
    eventsCount: 14,
    alarmsCount: 15,
    eventsBreakdown: {
      failure_to_yield: 7,
      jaywalking: 4,
      stopped_vehicle: 1,
      congestion: 1,
      stop_line: 1
    }
  },
  {
    id: 'C3896',
    title: 'Clip 1: C3896 (Midday Sun)',
    location: 'Tashkent Junction • Camera C3896 (11:18:24)',
    timeOfDay: '11:18:24 • Midday Sun (96 Lux)',
    duration: 340.34,
    videoSrc: '/videos/annotated_C3896.mp4',
    eventsSrc: '/data/events_C3896.json',
    riskSrc: '/data/risk_C3896.json',
    badge: 'Midday High Volume',
    badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    description: 'Midday sunny footage with hard shadows. Model detects red light breach, stop line incursions, solid line crossings, and queue congestions.',
    runtimeSec: 1267.3,
    runtimeX: '3.72x',
    eventsCount: 22,
    alarmsCount: 27,
    eventsBreakdown: {
      jaywalking: 9,
      congestion: 4,
      solid_line_crossing: 4,
      stop_line: 2,
      red_light: 1,
      stopped_vehicle: 1,
      failure_to_yield: 1
    }
  },
  {
    id: 'C3897',
    title: 'Clip 2: C3897 (Midday Sun)',
    location: 'Tashkent Junction • Camera C3897 (11:24:47)',
    timeOfDay: '11:24:47 • Midday Sun (96 Lux)',
    duration: 317.82,
    videoSrc: '/videos/annotated_C3897.mp4',
    eventsSrc: '/data/events_C3897.json',
    riskSrc: '/data/risk_C3897.json',
    badge: 'Heavy Pedestrian Flow',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    description: 'High-density midday traffic with heavy pedestrian flow across carriageway (12 jaywalking events) and pedestrian crosswalk violations.',
    runtimeSec: 967.1,
    runtimeX: '3.04x',
    eventsCount: 25,
    alarmsCount: 39,
    eventsBreakdown: {
      jaywalking: 12,
      failure_to_yield: 5,
      stop_line: 3,
      solid_line_crossing: 2,
      congestion: 2,
      stopped_vehicle: 1
    }
  },
  {
    id: 'C3902',
    title: 'Clip 3: C3902 (Evening Sunset)',
    location: 'Tashkent Junction • Camera C3902 (16:58:18)',
    timeOfDay: '16:58:18 • Sunset Low Sun (63 Lux)',
    duration: 317.82,
    videoSrc: '/videos/annotated_C3902.mp4',
    eventsSrc: '/data/events_C3902.json',
    riskSrc: '/data/risk_C3902.json',
    badge: 'Evening Commute Peak',
    badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    description: 'Evening commute with long shadows. High pedestrian count (32/frame) and dense queue standstills in 80s signal cycles.',
    runtimeSec: 934.5,
    runtimeX: '2.94x',
    eventsCount: 17,
    alarmsCount: 28,
    eventsBreakdown: {
      jaywalking: 7,
      congestion: 3,
      failure_to_yield: 3,
      solid_line_crossing: 2,
      stopped_vehicle: 1,
      stop_line: 1
    }
  }
];

export const DEFAULT_C3905_EVENTS = [
  {
    start_sec: 0.0,
    end_sec: 5.0,
    label: "jaywalking",
    desc: "Pedestrian on the carriageway outside a zebra crossing",
    desc_ru: "Пешеход на проезжей части вне пешеходного перехода",
    type: "danger"
  },
  {
    start_sec: 0.07,
    end_sec: 127.63,
    label: "stopped_vehicle",
    desc: "Vehicle standing on the carriageway for 10 s or more, not in a signal queue",
    desc_ru: "Машина стоит на проезжей части 10 с и дольше, не в очереди на светофоре",
    type: "warning"
  },
  {
    start_sec: 5.7,
    end_sec: 27.4,
    label: "jaywalking",
    desc: "Pedestrian on the carriageway outside a zebra crossing",
    desc_ru: "Пешеход на проезжей части вне пешеходного перехода",
    type: "danger"
  },
  {
    start_sec: 18.39,
    end_sec: 18.89,
    label: "failure_to_yield",
    desc: "Vehicle drives through a zebra while a pedestrian is crossing on it",
    desc_ru: "Машина проезжает зебру, когда по ней идёт пешеход",
    type: "critical"
  },
  {
    start_sec: 28.9,
    end_sec: 29.3,
    label: "failure_to_yield",
    desc: "Vehicle drives through a zebra while a pedestrian is crossing on it",
    desc_ru: "Машина проезжает зебру, когда по ней идёт пешеход",
    type: "critical"
  },
  {
    start_sec: 39.11,
    end_sec: 40.41,
    label: "failure_to_yield",
    desc: "Vehicle drives through a zebra while a pedestrian is crossing on it",
    desc_ru: "Машина проезжает зебру, когда по ней идёт пешеход",
    type: "critical"
  },
  {
    start_sec: 60.13,
    end_sec: 61.93,
    label: "failure_to_yield",
    desc: "Vehicle drives through a zebra while a pedestrian is crossing on it",
    desc_ru: "Машина проезжает зебру, когда по ней идёт пешеход",
    type: "critical"
  },
  {
    start_sec: 66.1,
    end_sec: 78.1,
    label: "jaywalking",
    desc: "Pedestrian on the carriageway outside a zebra crossing",
    desc_ru: "Пешеход на проезжей части вне пешеходного перехода",
    type: "danger"
  },
  {
    start_sec: 75.0,
    end_sec: 116.0,
    label: "congestion",
    desc: "Many vehicles standing still on the carriageway at once",
    desc_ru: "Много машин одновременно стоят на проезжей части",
    type: "warning"
  },
  {
    start_sec: 75.64,
    end_sec: 114.48,
    label: "stop_line",
    desc: "Vehicle stopped past stop line 4 while its signal is red",
    desc_ru: "Машина остановилась за стоп-линией 4 на красный",
    type: "danger"
  },
  {
    start_sec: 78.7,
    end_sec: 114.7,
    label: "jaywalking",
    desc: "Pedestrian on the carriageway outside a zebra crossing",
    desc_ru: "Пешеход на проезжей части вне пешеходного перехода",
    type: "danger"
  },
  {
    start_sec: 81.25,
    end_sec: 84.15,
    label: "failure_to_yield",
    desc: "Vehicle drives through a zebra while a pedestrian is crossing on it",
    desc_ru: "Машина проезжает зебру, когда по ней идёт пешеход",
    type: "critical"
  },
  {
    start_sec: 107.87,
    end_sec: 108.98,
    label: "failure_to_yield",
    desc: "Vehicle drives through a zebra while a pedestrian is crossing on it",
    desc_ru: "Машина проезжает зебру, когда по ней идёт пешеход",
    type: "critical"
  },
  {
    start_sec: 110.28,
    end_sec: 111.28,
    label: "failure_to_yield",
    desc: "Vehicle drives through a zebra while a pedestrian is crossing on it",
    desc_ru: "Машина проезжает зебру, когда по ней идёт пешеход",
    type: "critical"
  }
];

export const REAL_ABLATION_EXPERIMENTS = [
  {
    tested: '4K H.264 4:2:2 10-bit Decoding (Tesla T4, C3905)',
    optionA: 'cv2.read sequential all frames: 1.41× clip length',
    optionB: 'PyAV NONREF reference frames only (10 FPS): 0.70×',
    outcome: 'Option B Selected: every 3rd frame decoded in background thread at 2x lower compute budget',
    status: 'Optimized'
  },
  {
    tested: 'Detector Resolution & Architecture (Tesla T4, FP16)',
    optionA: 'YOLO26m @ 1920 px: 0.45× runtime',
    optionB: 'YOLO26m @ 1280 px: 0.24×; YOLO26s @ 960 px: 0.13×',
    outcome: 'YOLO26m @ 1280 px Selected: 97% person recall, 0.973 agreement with 1920 px at half the cost',
    status: 'Optimal Tradeoff'
  },
  {
    tested: 'Spatial Registration under Camera Drift (50–100 px shifts)',
    optionA: 'Static scene geometry coordinates',
    optionB: 'SIFT + RANSAC homography to reference view with Otsu bank',
    outcome: 'SIFT + RANSAC Mandatory: eliminates 50–100 px camera mounting drift across day/evening',
    status: 'Critical Architecture'
  },
  {
    tested: 'Rules Engine Tuning (Dev Score A, 9 classes)',
    optionA: 'Baseline uncalibrated rules: Score A = 0.308',
    optionB: 'Calibrated on team CVAT labels: Score A = 0.338',
    outcome: 'jaywalking 0.41→0.47, stop_line 0.33→0.49, failure_to_yield 0.26→0.29; solid_line false alarms cut from 57 to 8',
    status: '+9.7% Score A Gain'
  },
  {
    tested: 'Part B Causal Risk Estimator (TTC in CCTV Perspective)',
    optionA: 'Isotropic pixel TTC: alarm active 73% of duration (3.6 alarms/min)',
    optionB: 'Oriented bounding box axes, occlusion filter & constant-acceleration brake',
    outcome: 'Option B Selected: alarms drop to 0.6% of duration (1 true critical alarm per 2 min clip on C3905)',
    status: 'False Alarms Suppressed'
  },
  {
    tested: 'Part B Determinism & Runtime Budget Guarantee',
    optionA: 'Detection 1280 px + adaptive frame skipping: runs produced varying risk curves',
    optionB: 'Fixed 640 px detection every 6th frame + kinematic emergency brake',
    outcome: 'Option B Selected: 2.59–2.69× runtime out of 3.0× budget; byte-for-byte deterministic across runs',
    status: '100% Deterministic'
  }
];

export const REAL_PER_CLASS_METRICS = [
  { class: 'stopped_vehicle', f1_03: 0.889, f1_05: 0.889, f1_07: 0.667, f1_mean: 0.815, tp: 4, fp: 0, fn: 1 },
  { class: 'stop_line', f1_03: 0.545, f1_05: 0.545, f1_07: 0.364, f1_mean: 0.485, tp: 3, fp: 4, fn: 1 },
  { class: 'jaywalking', f1_03: 0.667, f1_05: 0.444, f1_07: 0.286, f1_mean: 0.466, tp: 14, fp: 18, fn: 17 },
  { class: 'red_light', f1_03: 0.667, f1_05: 0.667, f1_07: 0.000, f1_mean: 0.444, tp: 1, fp: 0, fn: 1 },
  { class: 'congestion', f1_03: 0.421, f1_05: 0.421, f1_07: 0.316, f1_mean: 0.386, tp: 4, fp: 6, fn: 5 },
  { class: 'failure_to_yield', f1_03: 0.320, f1_05: 0.320, f1_07: 0.240, f1_mean: 0.293, tp: 4, fp: 12, fn: 5 },
  { class: 'solid_line_crossing', f1_03: 0.222, f1_05: 0.111, f1_07: 0.111, f1_mean: 0.148, tp: 1, fp: 7, fn: 9 }
];

export const EDA_FINDINGS = [
  {
    title: '4K H.264 4:2:2 10-bit Decoding Bottleneck',
    desc: 'Footage is encoded in 3840×2160 @ 29.97 FPS (task PDF erroneously stated 25 FPS) at ~140 Mbit/s. Turing NVDEC on Tesla T4 lacks hardware decoding for 4:2:2 10-bit color profile, requiring CPU decoding. PyAV with the NONREF flag decodes only reference frames of GOP IBBP (~10 FPS), cutting compute overhead by 2×.'
  },
  {
    title: 'Resolution Sweet Spot: 1280 px vs 1920 px',
    desc: 'Downscaling frames to 1280 px achieves ~97% pedestrian recall, matching 1920 px inference with a 0.973 agreement on jaywalking while cutting inference cost in half.'
  },
  {
    title: 'In-Cabin Driver & Passenger Filtering',
    desc: '2.2% to 5.6% of person detections correspond to drivers and passengers visible through windshields. A spatial filter suppressing pedestrian detections inside moving vehicle boundaries eliminated these false alarms.'
  },
  {
    title: 'Intersection Road User Density',
    desc: 'Average load per frame: 20–31 pedestrians, 24–27 passenger cars, 1.9–4.5 buses/trucks, and <0.7 two-wheelers. Traffic is denser at dusk: 82 new vehicle tracks per minute compared to 68 at midday.'
  },
  {
    title: 'Traffic Signal Periodicity (75s Day vs 80s Evening)',
    desc: 'Fixed signal cycle duration: 75.0s during daytime (36s green, 3s yellow, 36s red) and 80.0s at evening dusk (38s green, 3s yellow, 39s red). Pedestrian green phase starts synchronously (±0.1s) with the vehicular phase. Lamp states are reliably read from traffic head pixel ROIs.'
  },
  {
    title: 'Camera Drift Compensation (SIFT + RANSAC)',
    desc: 'The physical CCTV camera swayed and shifted by 50–100 px between morning and evening. SIFT inliers dropped 10× at dusk (338 vs 4,133 at noon). Registering every video to a canonical reference view was essential for stop line and crosswalk polygon accuracy.'
  }
];

export const EDA_FINDINGS_RU = EDA_FINDINGS;

export const REAL_EXAMPLES_AND_FAILURES = [
  {
    file: '/results/failure_to_yield_C3905_40.jpg',
    class: 'failure_to_yield',
    video: 'C3905',
    kind: 'TP (True Positive)',
    timecode: '39.1–40.4s',
    caption_en: 'Vehicle drives through zebra 3 while pedestrian is actively crossing (model 39.1–40.4s vs label 38.7–40.6s). Red: vehicle and trajectory; magenta: pedestrian.',
    caption_ru: 'Непропуск пешехода на зебре 3 в C3905: модель 39.1–40.4 с, разметка 38.7–40.6 с. Красным: автомобиль и его путь; пурпурным: пешеход на зебре.'
  },
  {
    file: '/results/stop_line_C3905_96.jpg',
    class: 'stop_line',
    video: 'C3905',
    kind: 'TP (True Positive)',
    timecode: '75.6–114.5s',
    caption_en: 'Vehicle standing past stop line 4 on red light (model 75.6–114.5s vs label 76.8–119.3s). Red box: vehicle breaching line during head 7 red phase.',
    caption_ru: 'Заезд за стоп-линию в C3905: модель 75.6–114.5 с, разметка 76.8–119.3 с. Автомобиль в красной рамке стоит за стоп-линией 4 на красный сигнал.'
  },
  {
    file: '/results/red_light_C3896_79.jpg',
    class: 'red_light',
    video: 'C3896',
    kind: 'TP (True Positive)',
    timecode: '78.9–80.1s',
    caption_en: 'Vehicle crosses stop line 4 approximately 13 seconds into red phase (model 78.9–80.1s vs label 78.8–80.6s). Trajectory path highlighted in red.',
    caption_ru: 'Проезд на красный сигнал светофора в C3896: модель 78.9–80.1 с, разметка 78.8–80.6 с. Автомобиль пересекает стоп-линию 4 через 13 с после включения красного.'
  },
  {
    file: '/results/jaywalking_C3897_266.jpg',
    class: 'jaywalking',
    video: 'C3897',
    kind: 'TP (True Positive)',
    timecode: '262.8–268.8s',
    caption_en: 'Pedestrians crossing carriageway outside crosswalk zones in C3897: model 262.8–268.8s vs label 262.5–268.9s (tIoU = 0.93).',
    caption_ru: 'Переход вне зебры в C3897: модель 262.8–268.8 с, разметка 262.5–268.9 с (tIoU 0.93). Пешеходы на проезжей части между зонами зебр.'
  },
  {
    file: '/results/solid_line_crossing_C3897_195.jpg',
    class: 'solid_line_crossing',
    video: 'C3897',
    kind: 'TP (True Positive)',
    timecode: '194.3–196.5s',
    caption_en: 'Vehicle crossing solid divider line from lane 2 to lane 1 (model 194.3–196.5s vs label 194.5–196.8s, tIoU = 0.77).',
    caption_ru: 'Пересечение сплошной разметки в C3897: модель 194.3–196.5 с, разметка 194.5–196.8 с (tIoU 0.77). Смена полосы через одинарную сплошную.'
  },
  {
    file: '/results/solid_line_crossing_FN_C3896_124.jpg',
    class: 'solid_line_crossing',
    video: 'C3896',
    kind: 'FN (False Negative • Honest Failure Case)',
    timecode: 'Missed at 124.0s',
    caption_en: 'Honest failure case: vehicle rides the dividing paint for 2.9s but stays on same side, so side-change test rejected the candidate interval.',
    caption_ru: 'Честный разбор ошибки (FN): автомобиль наезжает на разметку 2.9 с, но остается в той же полосе; проверка смены стороны линии отклонила событие.'
  },
  {
    file: '/results/jaywalking_split_C3897_195.jpg',
    class: 'jaywalking',
    video: 'C3897',
    kind: 'FN+FP (Temporal Split • Honest Failure Case)',
    timecode: 'Split 122s into 5 segments',
    caption_en: 'Single 122s labelled event split by model into 5 discrete chunks (best tIoU 0.36), resulting in 1 FN and 5 FP in bipartite evaluation.',
    caption_ru: 'Разрыв интервала (FN+FP): длинное 122-секундное событие разметчика модель разбила на 5 кусков (лучший tIoU 0.36), получив штраф 1 FN + 5 FP.'
  },
  {
    file: '/results/congestion_FP_C3902.jpg',
    class: 'congestion',
    video: 'C3902',
    kind: 'FP (False Positive • Honest Failure Case)',
    timecode: 'Disagreement on standstill threshold',
    caption_en: 'Model flagged queue standstill (≥8 vehicles for ≥30s) as congestion, whereas human annotator classified it as a normal signal queue.',
    caption_ru: 'Расхождение в критериях (FP): модель посчитала затор (≥8 машин стоят ≥30с), тогда как разметчик классифицировал это как нормальную очередь на светофоре.'
  }
];

export const OFFICIAL_14_CLASSES = [
  {
    id: 'accident',
    label: 'accident',
    name: 'Kinetic Accident & Impact',
    name_ru: 'ДТП / Столкновение объектов',
    category: 'collisions',
    badge: 'Safety Critical • Part A & B',
    startCondition: 'First frame where direct physical contact occurs between road users or a road user and a fixed structure.',
    endCondition: 'All involved vehicles/objects come to a complete rest or completely clear the camera view.',
    mathFormula: '\\text{IoU}(\\mathbf{b}_i, \\mathbf{b}_j) > 0 \\;\\land\\; \\|\\Delta \\mathbf{v}_{i,j}\\| > \\gamma_{\\text{impact}}',
    pythonSnippet: `def detect_accident(track_i, track_j, t):
    # Overlap + Kinetic Velocity Discontinuity Spike
    if bbox_intersect(track_i.bbox, track_j.bbox):
        accel_impulse = np.linalg.norm(track_i.accel - track_j.accel)
        if accel_impulse > THRESH_ACCEL_SPIKE:
            return Event(label="accident", start=t, risk=1.0)`,
    metricF1: '0.000 (0 in 18.4m normal GT)',
    status: 'Verified on External Datasets (Rare)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Kinetic vehicle-to-vehicle or vehicle-to-barrier impact. Evaluated across Part A temporal detection and Part B accident anticipation.',
    pipelineModule: 'Kinematic Impulse Detector (Kalman Acceleration Spike)'
  },
  {
    id: 'near_miss',
    label: 'near_miss',
    name: 'Near-Miss Kinetic Hazard',
    name_ru: 'Опасное сближение / Резкое торможение',
    category: 'collisions',
    badge: 'Safety Critical • Part A & B',
    startCondition: 'Sharp deceleration (a < -3.5 m/s²) or rapid evasive swerving maneuver to avert impending collision with zero contact.',
    endCondition: 'Vehicle trajectory stabilizes or vehicle comes to a controlled stop.',
    mathFormula: '\\text{TTC}_{\\text{oriented}}(\\mathbf{p}_i, \\mathbf{p}_j) < \\tau_{\\text{crit}} \\;\\land\\; \\mathbf{a}_i < -3.5\\,\\text{m/s}^2',
    pythonSnippet: `def detect_near_miss(track_i, track_j, t):
    ttc = compute_oriented_ttc(track_i, track_j)
    if ttc < 1.5 and track_i.deceleration > 3.5:
        return Event(label="near_miss", start=t, risk=0.85)`,
    metricF1: '0.000 (0 in 18.4m normal GT)',
    status: 'Verified Causal Physics (Rare)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Emergency collision avoidance actions without physical contact. Crucial for Part B risk curve R(t) calibration.',
    pipelineModule: 'Oriented Box TTC & Kinematic Brake Estimator'
  },
  {
    id: 'red_light',
    label: 'red_light',
    name: 'Red Light Incursion',
    name_ru: 'Проезд на запрещающий (красный) сигнал',
    category: 'signals',
    badge: 'High Traffic Violation',
    startCondition: 'Vehicle ground contact anchor crosses Stop Line 4 during active Traffic Head 7 RED lamp phase.',
    endCondition: 'Vehicle completely traverses the intersection zone or clears the crossing boundary.',
    mathFormula: '\\mathbf{p}_{\\text{GC}}(t) \\times \\mathbf{L}_{\\text{stop}} < 0 \\;\\land\\; \\mathcal{S}_{\\text{head}}(t) = \\text{RED}',
    pythonSnippet: `def detect_red_light(track, signal_state, t):
    gc = (track.bbox[0] + track.bbox[2]/2, track.bbox[3])
    if signal_state.is_red and line_crossed(gc, STOP_LINE_4):
        return Event(label="red_light", start=t, end=track.exit_time)`,
    metricF1: '0.444 (TP=1, FP=0, FN=1)',
    status: 'Emitted in Dev (F1: 0.444)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Crossing stop line into the junction on red signal. Detected at 78.9s on C3896 and C3897.',
    pipelineModule: 'SIFT Line 4 Homography + Signal Head 7 ROI Reader'
  },
  {
    id: 'stop_line',
    label: 'stop_line',
    name: 'Stop Line Boundary Breach',
    name_ru: 'Заезд за стоп-линию на красный сигнал',
    category: 'signals',
    badge: 'Traffic Flow Compliance',
    startCondition: 'Vehicle passes Stop Line 4 on red light and stops past the line without entering the central intersection.',
    endCondition: 'Signal phase turns GREEN or vehicle resumes movement.',
    mathFormula: '\\mathbf{p}_{\\text{GC}} \\in \\text{Buffer}(\\mathbf{L}_{\\text{stop}}) \\;\\land\\; \\mathcal{S}_{\\text{head}} = \\text{RED} \\;\\land\\; \\|\\mathbf{v}\\| < 0.5\\,\\text{m/s}',
    pythonSnippet: `def detect_stop_line(track, signal_state, t):
    if signal_state.is_red and past_stop_line(track) and track.speed < 0.5:
        return Event(label="stop_line", start=track.stop_time, end=track.start_time)`,
    metricF1: '0.485 (TP=3, FP=4, FN=1)',
    status: 'Emitted in Dev (F1: 0.485)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Vehicles creeping past Stop Line 4 during red signal phases. Precision boosted from 0.33 to 0.49 via Ground Contact anchor.',
    pipelineModule: 'Buffer Zone Bipartite Classifier'
  },
  {
    id: 'stopped_vehicle',
    label: 'stopped_vehicle',
    name: 'Stationary Roadway Hazard',
    name_ru: 'Остановка на проезжей части вне очереди',
    category: 'signals',
    badge: 'Safety Hazard • Top Score',
    startCondition: 'Vehicle stationary (v < 0.5 m/s) on carriageway for 10.0 seconds or more, outside a normal signal queue.',
    endCondition: 'Vehicle resumes movement (v > 1.5 m/s) or exits camera perspective.',
    mathFormula: '\\forall \\tau \\in [t, t + 10], \\; \\|\\mathbf{v}(\\tau)\\| < 0.5\\,\\text{m/s} \\;\\land\\; \\mathbf{p}_{\\text{GC}} \\notin \\mathcal{Q}_{\\text{signal}}',
    pythonSnippet: `def detect_stopped_vehicle(track, t):
    if track.duration_stationary >= 10.0 and not in_traffic_queue(track):
        return Event(label="stopped_vehicle", start=track.stationary_start, end=t)`,
    metricF1: '0.815 (TP=4, FP=0, FN=1)',
    status: 'Highest Dev F1 Score (0.815)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Vehicle parked or broken down on carriageway. High-precision rule with zero false positives across all dev clips.',
    pipelineModule: 'Kalman Velocity Filter + Queue Mask Exclusion'
  },
  {
    id: 'congestion',
    label: 'congestion',
    name: 'Traffic Standstill & Jam',
    name_ru: 'Затор / Пробка на перекрёстке',
    category: 'signals',
    badge: 'Urban Flow Telemetry',
    startCondition: 'Traffic standstill queue across all lanes with >= 8 vehicles stationary for >= 30 seconds.',
    endCondition: 'Standstill dissolves and flow speed increases across all lanes (v > 5.0 m/s).',
    mathFormula: 'N_{\\text{stationary}} \\ge 8 \\;\\land\\; \\Delta t_{\\text{standstill}} \\ge 30.0\\,\\text{s}',
    pythonSnippet: `def detect_congestion(tracks, t):
    stopped = [tr for tr in tracks if tr.speed < 1.0]
    if len(stopped) >= 8 and (t - queue_start) >= 30.0:
        return Event(label="congestion", start=queue_start, end=t)`,
    metricF1: '0.386 (TP=4, FP=6, FN=5)',
    status: 'Emitted in Dev (F1: 0.386)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Multi-lane congestion queues. Distinguishes normal red light queuing from anomalous multi-cycle blockages.',
    pipelineModule: 'Spatial Density Cluster Analyzer'
  },
  {
    id: 'wrong_way',
    label: 'wrong_way',
    name: 'Counter-Flow Wrong Way Driving',
    name_ru: 'Движение по встречной полосе',
    category: 'maneuvers',
    badge: 'High Risk Hazard',
    startCondition: 'Vehicle velocity vector angle theta opposes designated lane direction by > 120 degrees.',
    endCondition: 'Vehicle corrects trajectory back into legal lane flow or leaves camera frame.',
    mathFormula: '\\langle \\mathbf{v}_{\\text{veh}}, \\mathbf{d}_{\\text{lane}} \\rangle < \\cos(120^\\circ) = -0.5',
    pythonSnippet: `def detect_wrong_way(track, lane_geometry, t):
    cos_angle = np.dot(track.velocity_unit, lane_geometry.heading)
    if cos_angle < -0.5:
        return Event(label="wrong_way", start=t, risk=0.90)`,
    metricF1: '0.000 (0 in 18.4m normal GT)',
    status: 'Causal Direction Vector (Rare)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Driving against the legal flow direction. Evaluated using vector dot products against lane direction maps from camera.md.',
    pipelineModule: 'Lane Vector Dot-Product Engine'
  },
  {
    id: 'illegal_u_turn',
    label: 'illegal_u_turn',
    name: 'Prohibited U-Turn Maneuver',
    name_ru: 'Разворот в неположенном месте',
    category: 'maneuvers',
    badge: 'Trajectory Rule',
    startCondition: 'Vehicle trajectory performs 180-degree heading reversal across road marking where prohibited.',
    endCondition: 'Vehicle aligns with opposite traffic flow direction.',
    mathFormula: '\\Delta \\theta_{\\text{track}} \\approx 180^\\circ \\;\\land\\; \\mathbf{p} \\in \\mathcal{Z}_{\\text{no\\_uturn}}',
    pythonSnippet: `def detect_illegal_u_turn(track, t):
    if abs(track.heading_delta) > 160 and in_no_uturn_zone(track.pos):
        return Event(label="illegal_u_turn", start=track.turn_start, end=t)`,
    metricF1: 'Annotated in GT (9 instances)',
    status: 'Ground Truth Calibrated',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Prohibited U-turns across central median. Annotated in CVAT, verified against turning lane polygons.',
    pipelineModule: 'Cumulative Trajectory Curvature Tracker'
  },
  {
    id: 'illegal_turn',
    label: 'illegal_turn',
    name: 'Improper Lane Turn',
    name_ru: 'Поворот из неразрешённого ряда',
    category: 'maneuvers',
    badge: 'Directional Rule',
    startCondition: 'Vehicle initiates turning maneuver from non-designated lane or violates direction arrows.',
    endCondition: 'Turn completed into intersecting roadway.',
    mathFormula: '\\text{TurnDirection}(\\mathbf{T}) \\notin \\text{AllowedTurns}(\\mathcal{L}_{\\text{origin}})',
    pythonSnippet: `def detect_illegal_turn(track, t):
    if track.lane == "LANE_THROUGH" and track.angular_velocity > 0.4:
        return Event(label="illegal_turn", start=track.turn_start, end=t)`,
    metricF1: 'Annotated in GT (4 instances)',
    status: 'Ground Truth Calibrated',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Turning left from straight-only lanes or right from center lanes. Calibrated to camera.md directional definitions.',
    pipelineModule: 'Lane Origin-Destination Matrix'
  },
  {
    id: 'solid_line_crossing',
    label: 'solid_line_crossing',
    name: 'Solid Dividing Line Crossing',
    name_ru: 'Пересечение сплошной линии разметки',
    category: 'maneuvers',
    badge: 'Marking Compliance',
    startCondition: 'Vehicle ground anchor crosses solid white lane divider with mandatory side-change validation.',
    endCondition: 'Vehicle completely settles into new lane with both sides clear of dividing line.',
    mathFormula: '\\text{Side}(t_1) \\ne \\text{Side}(t_2) \\;\\land\\; \\text{Intersect}(\\mathbf{p}_{\\text{GC}}(t), \\mathbf{L}_{\\text{solid}})',
    pythonSnippet: `def detect_solid_line(track, t):
    # Mandatory side-change test suppresses paint-riding false alarms
    if track.side_history[-1] != track.side_history[0] and intersects_line(track):
        return Event(label="solid_line_crossing", start=track.cross_start, end=t)`,
    metricF1: '0.148 (TP=1, FP=7, FN=9)',
    status: 'Emitted in Dev (F1: 0.148)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Changing lanes across solid white road divider. Mandatory side-change test eliminated 49 false alarms caused by paint riding.',
    pipelineModule: 'Bilateral Side-Change State Machine'
  },
  {
    id: 'jaywalking',
    label: 'jaywalking',
    name: 'Jaywalking Outside Crosswalk',
    name_ru: 'Переход в неположенном месте',
    category: 'hazards',
    badge: 'Pedestrian Safety',
    startCondition: 'Pedestrian bottom-mid anchor (x_mid, y_max) steps onto carriageway outside designated zebra polygons.',
    endCondition: 'Pedestrian steps back onto sidewalk, refuge median, or safely reaches zebra crossing.',
    mathFormula: '\\mathbf{p}_{\\text{ped, GC}} \\in \\mathcal{P}_{\\text{carriageway}} \\setminus \\bigcup_{k=1}^4 \\mathcal{P}_{\\text{zebra}, k}',
    pythonSnippet: `def detect_jaywalking(ped_track, t):
    gc = (ped_track.bbox[0] + ped_track.bbox[2]/2, ped_track.bbox[3])
    if in_carriageway(gc) and not in_any_crosswalk(gc):
        return Event(label="jaywalking", start=ped_track.step_time, end=t)`,
    metricF1: '0.466 (TP=14, FP=18, FN=17)',
    status: 'Emitted in Dev (F1: 0.466)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Pedestrians walking across carriageway outside crossings. Bottom-mid anchor eliminated 94.3% of false alarms on refuge islands.',
    pipelineModule: 'Ground Contact Polygon Containment'
  },
  {
    id: 'failure_to_yield',
    label: 'failure_to_yield',
    name: 'Failure to Yield to Pedestrian',
    name_ru: 'Непропуск пешехода на зебре',
    category: 'hazards',
    badge: 'Safety Critical Priority',
    startCondition: 'Vehicle drives through zebra crossing while pedestrian is walking or stepping onto it.',
    endCondition: 'Vehicle completely passes through crosswalk zone.',
    mathFormula: '\\mathbf{p}_{\\text{veh, GC}} \\in \\mathcal{P}_{\\text{zebra}} \\;\\land\\; \\mathbf{p}_{\\text{ped, GC}} \\in \\mathcal{P}_{\\text{zebra}}',
    pythonSnippet: `def detect_failure_to_yield(veh_track, ped_track, t):
    if on_same_zebra(veh_track, ped_track):
        time_to_ped = dist(veh_track.gc, ped_track.gc) / veh_track.speed
        if time_to_ped < 3.0:
            return Event(label="failure_to_yield", start=veh_track.zebra_entry, end=t)`,
    metricF1: '0.293 (TP=4, FP=12, FN=5)',
    status: 'Emitted in Dev (F1: 0.293)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Vehicle driving through zebra while pedestrian is actively crossing. Calibrated across zebras 1, 2, 3, 4 with 3.0s collision envelope.',
    pipelineModule: 'Crosswalk Collision Envelope Calculator'
  },
  {
    id: 'road_obstacle',
    label: 'road_obstacle',
    name: 'Roadway Obstacle or Debris',
    name_ru: 'Препятствие / Посторонний предмет',
    category: 'hazards',
    badge: 'Hazard Prevention',
    startCondition: 'Stationary debris, fallen cargo, or object appears on active carriageway causing vehicle swerves.',
    endCondition: 'Obstacle removed or leaves lane.',
    mathFormula: '\\text{StaticObject}(\\mathbf{p}) \\in \\mathcal{P}_{\\text{carriageway}} \\;\\land\\; \\Delta t > 15.0\\,\\text{s}',
    pythonSnippet: `def detect_road_obstacle(det, t):
    if is_stationary_object(det) and in_carriageway(det.pos):
        return Event(label="road_obstacle", start=det.first_seen, end=t)`,
    metricF1: '0.000 (0 in 18.4m normal GT)',
    status: 'Verified Causal Rule (Rare)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Dropped objects or obstacles obstructing lane flow. Monitored via stationary non-vehicle foreground segments.',
    pipelineModule: 'Stationary Foreground Blob Monitor'
  },
  {
    id: 'fire_smoke',
    label: 'fire_smoke',
    name: 'Thermal Incident & Vehicle Fire/Smoke',
    name_ru: 'Возгорание или задымление',
    category: 'hazards',
    badge: 'Catastrophic Emergency',
    startCondition: 'Dense chromatic smoke plumes or high-intensity fire cluster detected on or originating from vehicle.',
    endCondition: 'Smoke plume dissipates or fire is extinguished.',
    mathFormula: '\\text{Area}(\\mathcal{S}_{\\text{smoke}}) > \\theta_{\\text{plume}} \\;\\land\\; \\Delta \\text{Luminance} > \\theta_{\\text{fire}}',
    pythonSnippet: `def detect_fire_smoke(frame, t):
    smoke_mask = segment_smoke_hue(frame)
    if contour_area(smoke_mask) > MIN_PLUME_AREA:
        return Event(label="fire_smoke", start=t, risk=1.0)`,
    metricF1: '0.000 (0 in 18.4m normal GT)',
    status: 'Verified Causal Rule (Rare)',
    tiou: '[0.3, 0.5, 0.7]',
    description: 'Thermal vehicle fire and road smoke hazard detection. Part B risk estimator immediately spikes to R=1.0 upon confirmation.',
    pipelineModule: 'Chromatic Hue Plume Segmenter'
  }
];

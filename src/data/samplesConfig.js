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

export const EDA_FINDINGS_RU = [
  {
    title: '4K H.264 4:2:2 10-bit декодирование',
    desc: 'Файлы сняты в 3840×2160 при 29.97 fps (в PDF регламента ошибочно указано 25), битрейт ~140 Мбит/с. NVDEC на Tesla T4 не поддерживает 10-бит 4:2:2 аппаратно, поэтому декодирование выполняется на CPU. Использование PyAV с флагом NONREF позволило декодировать только опорные кадры GOP IBBP (каждый 3-й кадр, ~10 FPS) почти в 2 раза дешевле.'
  },
  {
    title: 'Разрешение 1280 px против 1920 px',
    desc: 'При масштабировании кадра до 1280 px полнота обнаружения людей (person recall) составляет ~97%, а совпадение с детекциями на 1920 px по jaywalking достигает 0.973 при вдвое меньшей вычислительной нагрузке.'
  },
  {
    title: 'Фильтрация водителей внутри автомобилей',
    desc: 'От 2.2% до 5.6% детекций класса person приходятся на водителей и пассажиров, видимых сквозь ветровые стекла автомобилей. Перед применением правил для пешеходов внедрен пространственный фильтр, отсекающий людей внутри габаритов движущегося транспорта.'
  },
  {
    title: 'Плотность объектов в кадре',
    desc: 'На кадр приходится 20–31 человек, 24–27 легковых автомобилей, 1.9–4.5 автобусов и грузовиков, и не более 0.7 двухколесных ТС. Вечером поток плотнее: 82 новых автомобильных трека в минуту против 68 днем.'
  },
  {
    title: 'Светофорные циклы и синхронизация (75с vs 80с)',
    desc: 'Светофорный цикл фиксирован: 75.0 секунд днем (36с зеленый, 3с желтый, 36с красный) и 80.0 секунд вечером (38с зеленый, 3с желтый, 39с красный). Пешеходная зеленая фаза стартует строго синхронно с транспортной (±0.1с). Состояние ламп надежно считывается из пикселей светофорной головки.'
  },
  {
    title: 'Компенсация смещения камеры (SIFT + RANSAC)',
    desc: 'Между утренними и вечерними записями камеру сдвигали на 50–100 px. Вечером число SIFT-инлаеров падает в 10 раз (338–380 против 4133 днем). Регистрация каждого видео на единый опорный вид сцены обязательна для точной работы полигонов стоп-линий и зебр.'
  }
];

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

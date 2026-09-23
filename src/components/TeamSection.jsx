import React, { useState, useEffect } from 'react';
import {
  Users,
  Globe,
  Mail,
  Check,
  FolderGit2,
  Download,
  Award,
  ArrowUpRight,
  X,
  Briefcase,
  GraduationCap,
  Trophy,
  Code,
  Languages,
  Phone,
  Send,
  Calendar,
  MapPin,
  Sparkles,
  ExternalLink,
  FileText,
  CheckCircle2,
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.4 9.74V10.13H5.06v8.37h2.8z"/>
    </svg>
  );
}

function TelegramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  );
}

function GitlabIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.65 14.39L20.6 8.07a.9.9 0 0 0-.34-.46.9.9 0 0 0-.58-.16.9.9 0 0 0-.54.21.9.9 0 0 0-.27.41l-1.92 5.92H6.98l-1.92-5.92a.9.9 0 0 0-.27-.41.9.9 0 0 0-.54-.21.9.9 0 0 0-.58.16.9.9 0 0 0-.34.46L1.35 14.39a.9.9 0 0 0 .32 1l10.02 7.28a.6.6 0 0 0 .66 0l10.02-7.28a.9.9 0 0 0 .28-1z"/>
    </svg>
  );
}

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Prevent background scrolling when modal is open and handle Escape key
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  const members = [
    {
      id: 'member-1',
      name: 'Azam Xodjimetov',
      nameRu: 'Азам Ходжиметов',
      role: 'Team Lead & Technical Project Manager • AI Solutions',
      badge: 'TPM & AI Product Builder • Uzum Tech / Inha',
      photo: '/azam-khodzhimetov.jpg',
      objectPosition: 'center 26%',
      initials: 'AX',
      bio: 'Results-driven Technical Project Manager and Software & ML Engineer with 1.5+ years FinTech product leadership at Uzum Tech (Uzum Business). Rigorous CS foundation at Inha University (GPA 4.1/4.5) and School 21 (ML Track). Multiple hackathon champion (1st Place Kapitalbank & Uzum, Rector\'s Cup 2025) bridging engineering, business analysis, and applied AI.',
      contributions: [
        'Team Lead & technical delivery orchestration: end-to-end alignment of perception pipeline with hackathon evaluation benchmarks',
        'System requirements translation, acceptance criteria validation & submission container optimization (Tesla T4, <5 GB)',
        'Cross-functional coordination, presentation platform architecture & deterministic reproducible pipeline execution',
      ],
      proudProjects: [
        'Uzum Business FinTech Product Initiatives (1.5+ yrs)',
        '1st Place – Kapitalbank & Uzum Hackathon',
        '1st Place – Rector\'s Cup 2025 Hackathon',
        'Kibo – AI-Powered Enterprise Onboarding Platform',
      ],
      links: {
        telegram: 'https://t.me/azamoka',
        email: 'agzamrich@gmail.com',
        phone: '+998909436031',
        phoneDisplay: '+998 90 943 60 31',
        linkedin: 'https://linkedin.com/in/azam-xodjimetov',
        github: 'https://github.com/azamkhodzhimetov',
      },
      imageLeft: true, // 1st: Photo Left (25%), Info Right (75%)
      dossier: {
        title: 'Technical Project Manager • AI & Software Solutions • AI Product Builder',
        location: 'Ташкент, Узбекистан',
        summary: 'Technical Project Manager и Software & ML Engineer с 1.5+ годами практического опыта управления FinTech-продуктами в Uzum Tech (Uzum Business). Фундаментальная база Computer Science (Inha University, School 21 ML Track) с доказанным лидерством в создании сложных AI-решений, кросс-функциональном менеджменте и быстром прототипировании. Многократный победитель хакатонов (1-е место Kapitalbank & Uzum, 1-е место Кубок Ректора 2025), объединяющий инженерные команды (Backend, QA, DevOps) со стратегическими целями бизнеса.',
        hackathonFocus: [
          'Руководство инженерной командой (Team Lead), сквозная синхронизация модулей детекции, трекинга и оценки рисков аварий',
          'Трансляция регламента хакатона (Requirements 1–7) в спринты разработки, управление рисками и критериями приемки',
          'Контроль ограничений бенчмарка: пропускная способность NVIDIA Tesla T4 (25+ FPS), лимит веса до 5 ГБ и детерминированная воспроизводимость'
        ],
        experience: [
          {
            company: 'Uzum Tech — Uzum Business',
            role: 'Project Manager',
            period: '2025 — Настоящее время (1.5+ года)',
            location: 'Ташкент, Узбекистан',
            badge: 'FinTech & B2B Ecosystem',
            highlights: [
              'Руководство сквозной разработкой (End-to-End Delivery) ключевых сервисов интернет-банкинга и финансовых услуг для бизнеса.',
              'Координация кросс-функциональных команд: backend, frontend, QA, продуктовые дизайнеры, системные аналитики.',
              'Ускорение релизных циклов за счет перевода бизнес-логики в четкие технические требования, спринт-бэклоги Jira и критерии приемки.',
              'Проведение ежедневных agile-церемоний (daily syncs, sprint planning, backlog grooming, post-mortems), устранение блокеров между командами.',
              'Тесное взаимодействие с системными аналитиками и техлидами по требованиям к БД, API-контрактам и зависимостям интеграций.'
            ]
          }
        ],
        education: [
          {
            institution: 'Inha University in Tashkent (IUT)',
            degree: 'Bachelor of Science in Computer Science and Software Engineering (3rd Year)',
            specialization: 'Cumulative GPA: 4.1 / 4.5 • Data Structures & Algorithms, OOP, Discrete Math, OS',
            period: '2024 — Настоящее время',
          },
          {
            institution: 'School 21',
            degree: 'Machine Learning Engineer Track (1+ год)',
            specialization: 'Прикладной C/C++, алгоритмический problem-solving, Linux, основы ML',
            period: '2025 — Настоящее время',
          }
        ],
        achievements: [
          {
            title: '1st Place — Kapitalbank & Uzum Hackathon',
            desc: 'Абсолютный победитель хакатона по разработке FinTech и AI решений.'
          },
          {
            title: '1st Place — Rector\'s Cup 2025 Hackathon',
            desc: 'Победитель кубка ректора по разработке инновационных цифровых платформ.'
          },
          {
            title: '3rd Place — TheBuildX Hackathon',
            desc: 'Призовое место в соревновании по продуктовой разработке и прототипированию.'
          },
          {
            title: 'Top 10% Finalist & Podium Finishes',
            desc: 'Многократные призовые места на национальных и региональных AI-хакатонах (включая No Flame No Game AI Hackathon).'
          }
        ],
        skillCategories: [
          {
            category: 'Project & Delivery Management',
            items: ['Agile (Scrum/Kanban)', 'Sprint Planning', 'Backlog Prioritization', 'PRD / BRD Documentation', 'Risk Management', 'Cross-Functional Leadership']
          },
          {
            category: 'Languages & Core Engineering',
            items: ['C++', 'C', 'Python', 'Java', 'SQL', 'Arduino', 'Object-Oriented Design', 'REST APIs']
          },
          {
            category: 'Machine Learning, CV & AI',
            items: ['Computer Vision (OpenCV, YOLO)', 'Machine Learning Baselines', 'Prompt Engineering & LLM Integration', 'Automated Workflows', 'NumPy', 'Matplotlib']
          },
          {
            category: 'Developer Tools & Infra',
            items: ['Git', 'GitLab', 'GitHub', 'Docker', 'Linux CLI', 'Cursor / VS Code', 'PyCharm', 'Jira', 'Confluence', 'Notion', 'Postman', 'Figma']
          }
        ],
        languages: [
          { name: 'Русский', level: 'Native / Bilingual' },
          { name: 'O‘zbek', level: 'Native / Bilingual' },
          { name: 'English', level: 'Professional Working Proficiency' },
          { name: 'Chinese (中文)', level: 'B2 (Upper-Intermediate)' }
        ]
      }
    },
    {
      id: 'member-2',
      name: 'Diyora Fatakhova',
      nameRu: 'Диёра Фатахова',
      role: 'Business Systems Analyst & AI Product Lead',
      badge: 'Business Systems & AI Product • Inha / School 21',
      photo: '/teammate-2.jpg',
      objectPosition: '48% 22%',
      initials: 'DF',
      bio: '3rd year student at INHA University in Tashkent (School of Computer & Information Engineering) and School 21 (Business Systems Analytics). Combines core IT skills (C++, SQL, business analysis) with fluent trilingual leadership (RU, EN, UZ). Founder of Talkaholics Anonymous (100+ members) and marketing & visual design coordinator at Women in Tech Uzbekistan.',
      contributions: [
        'Analysis & structuring of hackathon system requirements (Requirements 1–7) and evaluation criteria compliance',
        'Emergency AI-camera application scenario formulation, user requirement specifications, and incident validation',
        'Product positioning, cross-functional coordination, presentation pitch materials, and UI/UX demo platform',
      ],
      proudProjects: [
        'Technovation Girls\'25 «Zira» (Emergency AI-Camera App)',
        'Talkaholics Anonymous (Founder & Organizer, 100+ members)',
        'INHA Mock Testing System (Product Launch Manager)',
        'Women in Tech Uzbekistan (Marketing & Visual Communications)',
      ],
      links: {
        telegram: 'https://t.me/mvpxein',
        email: 'diyora.ft@gmail.com',
        gitlab: 'https://gitlab.com',
        linkedin: 'https://linkedin.com',
      },
      imageLeft: false, // 2nd: Info Left (75%), Photo Right (25%) - CHESSBOARD
      dossier: {
        title: 'Business Systems Analyst • Product & Launch Manager',
        location: 'Ташкент, Узбекистан',
        summary: 'Студентка 3-го курса INHA University in Tashkent (School of Computer and Information Engineering) и School 21 (Business Systems Analytics). Сочетаю базовые навыки в IT (C++, SQL, Excel) со свободным владением тремя языками (RU, UZ, EN) и лидерским опытом: развиваю собственный English Speaking Club (100+ участников) в School 21, занимаюсь активной деятельностью в роли дизайнера и маркетолога в сообществе Women in Tech Uzbekistan. Регулярно участвую в хакатонах, лекциях и технологических проектах. Специализируюсь на бизнес-анализе, CustDev, координации кросс-функциональных команд и запуске инновационных продуктов с интеграцией AI-камер.',
        hackathonFocus: [
          'Анализ и структурирование системных требований хакатона (Requirements 1–7) и контроль соответствия регламенту сдачи',
          'Разработка сценариев применения AI-камер, выявление пользовательских кейсов и функциональных требований к детектированию инцидентов',
          'Координация кросс-функциональной работы команды, подготовка технического отчета и финального продуктового питча'
        ],
        experience: [
          {
            company: 'Talkaholics Anonymous',
            role: 'Основатель и организатор',
            period: 'Май 2025 — настоящее время',
            location: 'Ташкент / School 21',
            badge: 'Community & Leadership',
            highlights: [
              'Event-менеджмент: с нуля создала и координирую языковое сообщество, объединяющее 100+ участников; регулярно организую внутренние интерактивные мероприятия и встречи.',
              'Внутренние коммуникации: веду Telegram-канал клуба, пишу вовлекающие анонсы для комьюнити, развиваю англоязычный чат; привлекла новых участников и удерживала их внимание через интерактивные форматы.'
            ]
          },
          {
            company: 'Women in Tech Uzbekistan',
            role: 'Маркетинг и графический дизайн',
            period: 'Июнь 2025 — настоящее время',
            location: 'Ташкент',
            badge: 'Community & Marketing',
            highlights: [
              'Более года развиваю маркетинг и визуальные коммуникации сообщества Women in Tech Uzbekistan.',
              'Координирую запуск специальных проектов и технологических инициатив в кросс-функциональной команде.',
              'Создание айдентики, визуальных материалов и продвижение мероприятий сообщества.'
            ]
          },
          {
            company: 'Проект «Zira» (Technovation Girls\'25)',
            role: 'Координатор команды & Product Analyst',
            period: 'Март — Май 2025',
            location: 'Ташкент',
            badge: 'AI Camera Mobile App',
            highlights: [
              'Разработка в команде концепции и MVP мобильного приложения для экстренных ситуаций с интеграцией AI-камеры.',
              'CustDev и требования: провела интервью с пользователями, выявила ключевые боли в экстренных ситуациях и сформировала функциональные требования к MVP приложения с AI-камерой.',
              'Координация команды: организовала работу кросс-функциональной команды, распределяла задачи, настраивала дедлайны и фасилитировала созвоны.'
            ]
          },
          {
            company: 'Платформа IMTS (INHA Mock Testing System)',
            role: 'Product / Launch Manager',
            period: 'Март — Апрель 2025',
            location: 'Ташкент',
            badge: 'Product Launch & Pitching',
            highlights: [
              'Продуктовый запуск и питчинг: провела 2 масштабные презентации платформы (в Ziyo Forum и университете INHA), собрав суммарно 150+ участников (целевая аудитория — абитуриенты).',
              'Продвижение и привлечение: успешно продвигала подкурсы через социальные сети и презентации, обеспечив стабильный поток целевой аудитории и повысив узнаваемость продукта.'
            ]
          }
        ],
        education: [
          {
            institution: 'School 21',
            degree: 'Business Systems Analytics',
            specialization: 'Бизнес и системный анализ, архитектура процессов',
            period: '2025 — настоящее время',
          },
          {
            institution: 'INHA University in Tashkent (IUT)',
            degree: 'Студентка 3-го курса, School of Computer and Information Engineering (SOCIE)',
            specialization: 'Computer and Information Engineering',
            period: '2024 — настоящее время',
          },
          {
            institution: 'ALUzSWLU (Академический лицей при УзГУМЯ)',
            degree: 'Exact Sciences (Точные науки)',
            specialization: 'Математика и информатика',
            period: '2022 — 2024',
          }
        ],
        achievements: [
          {
            title: 'Technovation Girls\'25 — Проект «Zira»',
            desc: 'Разработка мобильного приложения для экстренных ситуаций с интеграцией AI-камеры и исследование болей пользователей.'
          },
          {
            title: 'Основатель Talkaholics Anonymous (100+ участников)',
            desc: 'Успешное создание и масштабирование англоязычного комьюнити в School 21.'
          },
          {
            title: 'Product Launch Manager IMTS',
            desc: 'Запуск и публичный питчинг системы тестирования INHA на 150+ участников.'
          }
        ],
        skillCategories: [
          {
            category: 'Бизнес-анализ & Продукт',
            items: ['Business Systems Analysis', 'CustDev', 'Product Launch', 'Requirements Gathering', 'Event Management', 'Team Coordination']
          },
          {
            category: 'Инструменты & Дизайн',
            items: ['Figma', 'Canva', 'Excel', 'PowerPoint', 'Google Docs', 'Notion']
          },
          {
            category: 'Базовый IT-стек & AI',
            items: ['SQL', 'C++', 'Gemini', 'Notion AI', 'Data Analysis']
          },
          {
            category: 'Менеджмент & Контент',
            items: ['Создание визуала и текстов (EN/RU)', 'Организация ивентов', 'Ведение Telegram-каналов', 'Фасилитация созвонов']
          }
        ],
        languages: [
          { name: 'Русский', level: 'Свободный (Native)' },
          { name: 'English', level: 'Свободный (C1 / Founder Speaking Club)' },
          { name: 'O‘zbek', level: 'Свободный (Native)' }
        ]
      }
    },
    {
      id: 'member-3',
      name: 'Ashirov Asan',
      nameRu: 'Аширов Асан',
      role: 'ML Engineer & Computer Vision Architect',
      badge: 'AI Vision & Deep Learning • Airi.uz / Inha',
      photo: '/teammate-3.jpg',
      objectPosition: '53% 20%',
      initials: 'AA',
      bio: 'Machine Learning & Computer Vision engineer with proven experience building industrial CV object detection systems, 4-LGBM order forecasting ensembles, STT/TTS speech models, and RAG architectures. Top 11 in Yandex Contest (CMC) and active Kaggle/Hackathon participant.',
      contributions: [
        'Part B Causal Risk Estimator & TTC kinematic risk forecasting interface',
        'YOLOv8 & RT-DETR detection adaptation and post-processing pipeline',
        'Validation harness, ensemble evaluation, and submission packaging',
      ],
      proudProjects: [
        'Yandex Contest (CMC) — Top 11 ranking',
        'LINKTRADE Smart Retail CV Detection (>95% accuracy for AVON)',
        'airi.uz Speech (STT/TTS) & RAG Multimodal AI Models',
      ],
      links: {
        github: 'https://github.com/Antifragile-nnt',
        telegram: 'https://t.me/Antifragile_nnt',
        email: 'asanashirov24@gmail.com',
        phone: '+998933940681',
        phoneDisplay: '+998 (93) 394-06-81',
      },
      imageLeft: true, // 3rd: Photo Left (25%), Info Right (75%) - CHESSBOARD
      dossier: {
        title: 'Data Scientist • Machine Learning Engineer • AI Engineer',
        location: 'Ташкент, Узбекистан',
        summary: 'Специализируюсь на прикладном машинном обучении, компьютерном зрении (CV), обработке естественного языка (NLP) и рекомендательных системах. Имею подтверждённый опыт разработки промышленных пайплайнов детекции объектов, ансамблевых моделей градиентного бустинга с высокой точностью (ROC-AUC > 0.93, lift 58x), интеграции моделей распознавания речи (STT/TTS) и создания автономных RAG-агентов.',
        hackathonFocus: [
          'Архитектура причинного прогнозирования рисков аварий (Part B Causal Risk Estimator) со строгим соблюдением нулевого заглядывания в будущее',
          'Оценка кинематических аномалий и расчет метрик Time-to-Collision (TTC) на 5-секундном горизонте',
          'Интеграция предсказаний компьютерного зрения и валидация скрипта оценки метрик AP'
        ],
        experience: [
          {
            company: 'Институт исследований цифровых технологий и искусственного интеллекта (airi.uz)',
            role: 'ML-инженер',
            period: 'Июль 2026 — настоящее время (3 мес.)',
            location: 'Ташкент',
            badge: 'Текущее место работы',
            highlights: [
              'Разработка и дообучение моделей распознавания и синтеза речи (STT/TTS) для узбекского языка.',
              'Проектирование и внедрение архитектур RAG (Retrieval-Augmented Generation) для корпоративных баз знаний.',
              'Исследование и внедрение мультимодальных AI VISION моделей для анализа визуальных данных.'
            ]
          },
          {
            company: 'LINKTRADE',
            role: 'Data Scientist / ML Engineer',
            period: 'Январь 2026 — Август 2026 (8 мес.)',
            location: 'Ташкент',
            badge: 'Computer Vision & B2B ML',
            highlights: [
              'Computer Vision: разработал систему распознавания и классификации товаров на полках магазинов для брендов AVON и Sardor Snacks с точностью детекции >95%, сократив ручную проверку на 70%.',
              'B2B Прогнозирование заказов: создал ансамбль из 4 моделей LightGBM с walk-forward валидацией (ROC-AUC > 0.93, lift 58x), оптимизировав цепочку поставок и оборотный капитал.',
              'Разработал интеллектуальных RAG-агентов (LangChain, LlamaIndex) для генерации бизнес-аналитики и автоматических отчётов.'
            ]
          },
          {
            company: 'Яндекс Крауд',
            role: 'Специалист по сбору и анализу данных',
            period: 'Июнь 2025 — Декабрь 2025 (7 мес.)',
            location: 'Ташкент / Удалённо',
            badge: 'Data Ops & QA',
            highlights: [
              'Сбор, структурирование и валидация геопространственных данных для сервисов Яндекс.Карты и Яндекс.Go.',
              'Верификация и контроль качества обучающих выборок для моделей Computer Vision и NLP.',
              'Автоматизация детекции аномалий в разметке и подготовка датасетов к обучению.'
            ]
          },
          {
            company: 'Syncall AI',
            role: 'Data Analyst',
            period: 'Июль 2025 — Октябрь 2025 (4 мес.)',
            location: 'Ташкент',
            badge: 'Voice AI Analytics',
            highlights: [
              'Анализ качества и валидация моделей синтеза и распознавания речи (STT/TTS) в голосовых роботах.',
              'Построение аналитических пайплайнов на Python для мониторинга конверсий диалоговых сценариев и проведения A/B тестов.'
            ]
          },
          {
            company: 'Neuro Pulse',
            role: 'Data Scientist / AI Engineer (Intern)',
            period: 'Декабрь 2024 — Февраль 2025 (3 мес.)',
            location: 'Ташкент',
            badge: 'Deep Learning R&D',
            highlights: [
              'Исследование современных архитектур трансформеров и обучение baseline-моделей на PyTorch.',
              'Инженерия признаков (Feature Engineering) и предварительная обработка табличных и текстовых данных.'
            ]
          }
        ],
        education: [
          {
            institution: 'Inha University in Tashkent (IUT)',
            degree: 'Бакалавр, Компьютерные науки и инженерия (CSE)',
            specialization: 'Software Engineering & Data Science / ML',
            period: '2024 — 2028',
          },
          {
            institution: 'Qwasar Silicon Valley',
            degree: 'Программа специализации Data Science & ML Engineering',
            specialization: 'Applied Deep Learning, Algorithms & Data Structures',
            period: '2023 — 2024',
          }
        ],
        achievements: [
          {
            title: 'Yandex Contest (CMC) — Top 11',
            desc: 'Высокий результат среди участников в соревновании по алгоритмам анализа данных и машинному обучению.'
          },
          {
            title: 'Хакатоны CBU & IT-Park — Призёр',
            desc: 'Призовые места в соревнованиях по прикладным ML/AI задачам и разработке data-driven продуктов.'
          },
          {
            title: 'Kaggle Competitions Participant',
            desc: 'Успешные решения в задачах табличного моделирования (Tabular Data) и классификации изображений.'
          }
        ],
        skillCategories: [
          {
            category: 'Machine Learning & Deep Learning',
            items: ['PyTorch', 'TensorFlow', 'LightGBM', 'CatBoost', 'XGBoost', 'Scikit-learn', 'Transformers', 'Hugging Face']
          },
          {
            category: 'Computer Vision & Speech / NLP',
            items: ['OpenCV', 'YOLO', 'Object Detection', 'STT / TTS', 'RAG', 'LangChain', 'LlamaIndex']
          },
          {
            category: 'Languages & Databases',
            items: ['Python', 'SQL', 'C++', 'PostgreSQL', 'ClickHouse', 'Pandas', 'NumPy', 'SciPy']
          },
          {
            category: 'Tools & Analytics',
            items: ['Docker', 'Git', 'Linux / Bash', 'FastAPI', 'Flask', 'Tableau', 'Power BI']
          }
        ],
        languages: [
          { name: 'Русский', level: 'Родной' },
          { name: 'English', level: 'B2 / Professional Working' },
          { name: 'O‘zbek', level: 'C1 / Professional' },
          { name: 'Қазақ', level: 'C1 / Professional' },
        ]
      }
    },
  ];

  return (
    <section id="team" className="py-24 bg-[#080c14] relative border-t border-[#1f2d45] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0693e3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121a2a] border border-[#1f2d45] text-xs font-semibold uppercase tracking-widest text-[#00e5ff]">
            <Users className="w-4 h-4 text-[#00e5ff]" />
            MEET THE BUILDERS • TEAM ANTIGRADIENT
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            CORE ENGINEERING TEAM
          </h2>

          <div className="w-16 h-1 bg-[#0693e3] rounded-full" />

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Three computer vision and systems engineers uniting deep learning detection, real-time multi-object tracking, and causal kinematics to solve the WIUT Hackathon 2026 Elimination Challenge.
          </p>
        </div>

        {/* Alternating Chessboard Members List */}
        <div className="space-y-10">
          {members.map((member, idx) => {
            const isPhotoLeft = member.imageLeft;

            const photoBlock = (
              <div
                onClick={() => setSelectedMember(member)}
                className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-3xl border border-[#1f2d45] hover:border-[#00e5ff]/50 overflow-hidden group col-span-1 shadow-2xl transition-all duration-300 bg-[#090f1a] flex flex-col justify-between p-5 cursor-pointer ${
                  isPhotoLeft ? 'order-1' : 'order-1 md:order-2'
                }`}
                title="Нажмите, чтобы открыть полное резюме сотрудника"
              >
                {/* Full-bleed Photo filling entire rectangle */}
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{ objectPosition: member.objectPosition || 'center 25%' }}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Atmospheric cinematic dark gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/90 via-[#080c14]/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/50 via-transparent to-transparent pointer-events-none" />

                {/* Fallback Initials Badge if image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center -z-10 bg-gradient-to-br from-[#121a2a] to-[#090f1a]">
                  <span className="text-5xl font-extrabold font-mono text-[#00e5ff]/30">
                    {member.initials}
                  </span>
                </div>

                {/* Top Quick Action on Hover */}
                <div className="relative z-10 flex justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080c14]/90 backdrop-blur-md border border-[#00e5ff]/40 text-xs font-semibold text-[#00e5ff] shadow-xl">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Посмотреть досье</span>
                  </div>
                </div>

                {/* Bottom Corner: Status / Core Index Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080c14]/80 backdrop-blur-md border border-[#1f2d45] text-xs font-mono text-gray-300 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse" />
                    <span className="text-[#00e5ff] font-bold">0{idx + 1}</span>
                    <span className="text-gray-400">/ 03 Core</span>
                  </div>

                  <span className="text-xs font-mono text-gray-400 group-hover:text-[#00e5ff] transition">
                    Резюме &rarr;
                  </span>
                </div>
              </div>
            );

            const infoBlock = (
              <div className={`w-full flex flex-col justify-between p-6 sm:p-8 bg-[#121a2a] rounded-3xl border border-[#1f2d45] hover:border-[#0693e3]/40 transition-all shadow-xl group col-span-1 md:col-span-3 ${isPhotoLeft ? 'order-2' : 'order-2 md:order-1'}`}>
                <div>
                  {/* Top Bar: Role badge & Social Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182236] border border-[#2a3a56] text-xs font-semibold uppercase tracking-wider text-[#00e5ff]">
                      {member.badge}
                    </div>

                    {/* Socials & Contacts */}
                    <div className="flex items-center gap-2">
                      {member.links.telegram && (
                        <a
                          href={member.links.telegram}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                          title="Telegram Profile"
                        >
                          <TelegramIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.links.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                          title="GitHub Profile"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.links.gitlab && (
                        <a
                          href={member.links.gitlab}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#fc6d26]/20 hover:text-[#fc6d26] text-gray-400 border border-[#1f2d45] transition"
                          title="GitLab Profile"
                        >
                          <GitlabIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                          title="LinkedIn Profile"
                        >
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.links.portfolio && (
                        <a
                          href={member.links.portfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                          title="Personal Portfolio"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      {member.links.email && (
                        <a
                          href={`mailto:${member.links.email}`}
                          className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#0693e3]/20 hover:text-[#00e5ff] text-gray-400 border border-[#1f2d45] transition"
                          title={`Email: ${member.links.email}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00e5ff] transition">
                      {member.name}
                    </h3>
                    {member.nameRu && member.nameRu !== member.name && (
                      <span className="text-base font-medium text-gray-400">
                        ({member.nameRu})
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-400 mb-4">
                    {member.role}
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-300 leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  {/* Key Contributions List */}
                  <div className="mb-5 space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold block mb-1">
                      Key Hackathon Contributions:
                    </span>
                    {member.contributions.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#00e5ff] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Previous Proud Projects (Per PDF Rubric) */}
                  <div className="pt-4 border-t border-[#1f2d45] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold block mb-2">
                        Featured Past Projects:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {member.proudProjects.map((proj, pIdx) => (
                          <div
                            key={pIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090f1a] border border-[#1f2d45] text-xs text-gray-300 font-mono"
                          >
                            <Award className="w-3 h-3 text-[#00e5ff]" />
                            <span>{proj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pop-up Modal Trigger Button */}
                    <div className="shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0693e3]/20 to-[#00e5ff]/20 hover:from-[#0693e3]/40 hover:to-[#00e5ff]/40 text-[#00e5ff] hover:text-white font-semibold text-xs border border-[#00e5ff]/30 hover:border-[#00e5ff] transition-all shadow-lg hover:shadow-[#00e5ff]/20 group/btn"
                      >
                        <FileText className="w-4 h-4 text-[#00e5ff] group-hover/btn:scale-110 transition-transform" />
                        <span>Подробнее / Полное резюме</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <div
                key={member.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch"
              >
                {photoBlock}
                {infoBlock}
              </div>
            );
          })}
        </div>

        {/* Official Submission Links Card (Per PDF Requirement 7) */}
        <div id="submission" className="mt-16 rounded-3xl bg-gradient-to-r from-[#0c1322] via-[#121a2a] to-[#0c1322] border border-[#1f2d45] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00e5ff]">
                REQUIREMENT 7 • REPOSITORY & ARTIFACTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                OFFICIAL SUBMISSION REPOSITORY & MODEL WEIGHTS
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                All source code, weights, inference scripts, and predictions required to reproduce our evaluation score on a clean machine.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <a
                href="https://github.com/antigradient/traffic-cv-2026"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0693e3] hover:bg-[#0582ca] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#0693e3]/20"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Git Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/antigradient/traffic-cv-2026/releases/download/v1.0/weights.zip"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#182236] hover:bg-[#202e47] text-white font-bold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
              >
                <Download className="w-4 h-4 text-[#00e5ff]" />
                <span>Weights (&lt; 5 GB)</span>
              </a>

              <a
                href="https://github.com/antigradient/traffic-cv-2026/blob/main/predictions_samples.json"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#182236] hover:bg-[#202e47] text-white font-bold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
              >
                <Check className="w-4 h-4 text-[#00d084]" />
                <span>predictions_samples.json</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* POP-UP MODAL: ПОЛНОЕ РЕЗЮМЕ И ДОСЬЕ СОТРУДНИКА                            */}
      {/* ========================================================================= */}
      {selectedMember && selectedMember.dossier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c1322] border border-[#1f2d45] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#121a2a] via-[#101726] to-[#0c1322] border-b border-[#1f2d45]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#080c14]/80 text-gray-400 hover:text-white hover:bg-[#1f2d45] border border-[#1f2d45] transition-all"
                title="Закрыть (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pr-10">
                {/* Photo Avatar */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#00e5ff]/40 shadow-xl shrink-0 bg-[#090f1a]">
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    style={{ objectPosition: selectedMember.objectPosition || 'center 25%' }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Title */}
                <div className="space-y-1.5 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182236] border border-[#2a3a56] text-xs font-semibold text-[#00e5ff]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedMember.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex flex-wrap items-center gap-2">
                    <span>{selectedMember.name}</span>
                    {selectedMember.nameRu && selectedMember.nameRu !== selectedMember.name && (
                      <span className="text-gray-400 text-lg font-normal">
                        ({selectedMember.nameRu})
                      </span>
                    )}
                  </h3>

                  <p className="text-sm font-medium text-gray-300">
                    {selectedMember.dossier.title || selectedMember.role}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00e5ff]" />
                      <span>{selectedMember.dossier.location}</span>
                    </span>

                    {selectedMember.links.phone && (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#00d084]" />
                        <a href={`tel:${selectedMember.links.phone}`} className="hover:text-white transition">
                          {selectedMember.links.phoneDisplay || selectedMember.links.phone}
                        </a>
                      </span>
                    )}

                    {selectedMember.links.telegram && (
                      <span className="inline-flex items-center gap-1.5">
                        <TelegramIcon className="w-3.5 h-3.5 text-[#00e5ff]" />
                        <a href={selectedMember.links.telegram} target="_blank" rel="noreferrer" className="hover:text-white transition">
                          {selectedMember.links.telegram.replace('https://t.me/', '@')}
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Fast Direct Contacts Bar */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-4 border-t border-[#1f2d45]/70">
                {selectedMember.links.telegram && (
                  <a
                    href={selectedMember.links.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/40 text-[#00e5ff] text-xs font-semibold transition"
                  >
                    <TelegramIcon className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                {selectedMember.links.email && (
                  <a
                    href={`mailto:${selectedMember.links.email}`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#182236] hover:bg-[#202e47] border border-[#2a3a56] text-gray-200 text-xs font-semibold transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#00e5ff]" />
                    <span>{selectedMember.links.email}</span>
                  </a>
                )}

                {selectedMember.links.phone && (
                  <a
                    href={`tel:${selectedMember.links.phone}`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#182236] hover:bg-[#202e47] border border-[#2a3a56] text-gray-200 text-xs font-semibold transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00d084]" />
                    <span>Позвонить</span>
                  </a>
                )}

                {selectedMember.links.github && (
                  <a
                    href={selectedMember.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#182236] hover:bg-[#202e47] border border-[#2a3a56] text-gray-200 text-xs font-semibold transition"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-gray-300" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                {selectedMember.links.gitlab && (
                  <a
                    href={selectedMember.links.gitlab}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#182236] hover:bg-[#202e47] border border-[#2a3a56] text-gray-200 text-xs font-semibold transition"
                  >
                    <GitlabIcon className="w-3.5 h-3.5 text-[#fc6d26]" />
                    <span>GitLab</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                {selectedMember.links.linkedin && (
                  <a
                    href={selectedMember.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#182236] hover:bg-[#202e47] border border-[#2a3a56] text-gray-200 text-xs font-semibold transition"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#00e5ff]" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-gray-300 max-h-[calc(92vh-200px)]">
              {/* 1. Summary / О специалисте */}
              <div className="p-5 rounded-2xl bg-[#121a2a]/70 border border-[#1f2d45]">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  О специалисте (Executive Summary)
                </h4>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {selectedMember.dossier.summary}
                </p>
              </div>

              {/* 2. Hackathon Role & Specific Impact */}
              {selectedMember.dossier.hackathonFocus && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
                    Ключевые задачи и вклад в решение Хакатона WIUT 2026:
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedMember.dossier.hackathonFocus.map((focus, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-[#090f1a] border border-[#1f2d45] text-xs sm:text-sm text-gray-300"
                      >
                        <Check className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Work Experience / Опыт работы */}
              {selectedMember.dossier.experience && selectedMember.dossier.experience.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#00e5ff]" />
                    Опыт работы (Work Experience):
                  </h4>

                  <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#1f2d45]">
                    {selectedMember.dossier.experience.map((exp, eIdx) => (
                      <div key={eIdx} className="relative pl-8">
                        {/* Node circle */}
                        <div className="absolute left-[7px] top-4 w-3 h-3 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />

                        <div className="p-5 rounded-2xl bg-[#0e1626] border border-[#1f2d45] hover:border-[#0693e3]/40 transition space-y-3">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h5 className="text-base font-bold text-white">
                                {exp.role}
                              </h5>
                              <div className="text-sm font-semibold text-[#00e5ff]">
                                {exp.company}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              {exp.badge && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#182236] border border-[#2a3a56] text-[#00d084] font-medium">
                                  {exp.badge}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 text-gray-400 font-mono">
                                <Calendar className="w-3 h-3" />
                                {exp.period}
                              </span>
                            </div>
                          </div>

                          {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="space-y-2 pt-1 text-xs sm:text-sm text-gray-300">
                              {exp.highlights.map((item, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2">
                                  <span className="text-[#00e5ff] font-bold leading-none mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Education & Competitions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                {selectedMember.dossier.education && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#00e5ff]" />
                      Образование (Education):
                    </h4>
                    <div className="space-y-3">
                      {selectedMember.dossier.education.map((edu, edIdx) => (
                        <div key={edIdx} className="p-4 rounded-xl bg-[#0e1626] border border-[#1f2d45] space-y-1">
                          <div className="text-sm font-bold text-white">
                            {edu.institution}
                          </div>
                          <div className="text-xs text-[#00e5ff] font-medium">
                            {edu.degree}
                          </div>
                          {edu.specialization && (
                            <div className="text-xs text-gray-400">
                              {edu.specialization}
                            </div>
                          )}
                          <div className="text-[11px] font-mono text-gray-500 pt-1">
                            {edu.period}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements & Competitions */}
                {selectedMember.dossier.achievements && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#00d084]" />
                      Достижения & Соревнования:
                    </h4>
                    <div className="space-y-3">
                      {selectedMember.dossier.achievements.map((ach, acIdx) => (
                        <div key={acIdx} className="p-4 rounded-xl bg-[#0e1626] border border-[#1f2d45] space-y-1">
                          <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-[#00e5ff]" />
                            <span>{ach.title}</span>
                          </div>
                          <div className="text-xs text-gray-400 leading-relaxed">
                            {ach.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Tech Stack & Skills */}
              {selectedMember.dossier.skillCategories && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#00e5ff]" />
                    Стек технологий & Навыки (Skills & Technologies):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedMember.dossier.skillCategories.map((cat, cIdx) => (
                      <div key={cIdx} className="p-4 rounded-xl bg-[#0e1626] border border-[#1f2d45] space-y-2">
                        <div className="text-xs font-semibold text-gray-300">
                          {cat.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md bg-[#182236] border border-[#2a3a56] text-xs font-mono text-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Spoken Languages */}
              {selectedMember.dossier.languages && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#00e5ff]" />
                    Владение языками:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedMember.dossier.languages.map((lang, lIdx) => (
                      <div
                        key={lIdx}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0e1626] border border-[#1f2d45] text-xs"
                      >
                        <span className="font-bold text-white">{lang.name}</span>
                        <span className="text-gray-400">({lang.level})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#080c14] border-t border-[#1f2d45] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-400">
                Team Antigradient • WIUT Hackathon 2026 Core Dossier
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {selectedMember.links.telegram && (
                  <a
                    href={selectedMember.links.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Написать в Telegram</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#182236] hover:bg-[#202e47] text-gray-300 font-bold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

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

function KaggleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.246l-5.17-6.574-1.875 1.792v4.74c0 .201-.094.301-.281.301H5.113c-.188 0-.281-.1-.281-.301V.287c0-.187.094-.287.281-.287h2.474c.188 0 .281.1.281.287v15.225l6.815-7.145c.141-.164.293-.246.457-.246h3.292c.164 0 .252.062.264.188.023.094-.012.188-.105.281l-6.205 6.275 6.444 8.718c.082.117.105.211.07.281z"/>
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
      role: 'Team Lead & Technical Product Manager • Web Platform & Data Delivery',
      badge: 'TPM & AI Product Builder • Uzum Tech / Inha',
      photo: '/azam-khodzhimetov.jpg',
      objectPosition: 'center 26%',
      initials: 'AX',
      bio: 'Results-driven Technical Project Manager and Software & ML Engineer with 1.5+ years FinTech product leadership at Uzum Tech (Uzum Business). Rigorous CS foundation at Inha University (GPA 4.1/4.5) and School 21 (ML Track). Multiple hackathon champion (1st Place Kapitalbank & Uzum, Rector\'s Cup 2025). Co-engineered the full public presentation web platform (25% of score) and orchestrated dataset annotation for the 14 traffic event classes.',
      contributions: [
        'End-to-End Web Platform Architecture: engineered interactive 25% scoring web portal with live CCTV inspector, clickable timeline & Bento Grid EDA',
        'Data Pipeline & Annotation: co-annotated 14 spatiotemporal event classes in Label Studio and verified ground truth calibration',
        'Project Management & Submission Packaging: sprint planning, Dockerfile isolation, zero-network compliance and time budget scheduling',
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
        title: 'Technical Project Manager • Web Platform & Data Delivery Lead',
        location: 'Tashkent, Uzbekistan',
        summary: 'Technical Project Manager and Software & ML Engineer with 1.5+ years of hands-on FinTech product leadership at Uzum Tech (Uzum Business). Rigorous Computer Science foundation (Inha University, School 21 ML Track) with proven leadership in engineering complex AI solutions, cross-functional management, and rapid prototyping. Multiple hackathon champion (1st Place Kapitalbank & Uzum, 1st Place Rector\'s Cup 2025), aligning engineering teams (Backend, QA, DevOps) with strategic business objectives.',
        hackathonFocus: [
          'Project Management (Team Lead) & Web Platform Architecture (25% score): engineered interactive Live Demo inspector, Bento Grid EDA, and official engineering report',
          'Data Annotation Pipeline Leadership: co-annotated 14 traffic event classes on CCTV video in Label Studio and structured reference ground truth dev_gt.json',
          'Submission Compliance & Quality Control: solution reproducibility, dependency isolation (Dockerfile, --network none), and runtime budget validation on Tesla T4'
        ],
        experience: [
          {
            company: 'Uzum Tech — Uzum Business',
            role: 'Project Manager',
            period: '2025 — Present (1.5+ yrs)',
            location: 'Tashkent, Uzbekistan',
            badge: 'FinTech & B2B Ecosystem',
            highlights: [
              'Spearheaded end-to-end delivery of core internet banking and financial services for business clients.',
              'Coordinated cross-functional teams: backend, frontend, QA, product designers, and system analysts.',
              'Accelerated release velocity by translating business requirements into clear technical specifications, Jira sprint backlogs, and acceptance criteria.',
              'Led daily agile ceremonies (daily syncs, sprint planning, backlog grooming, post-mortems) and unblocked cross-team dependencies.',
              'Collaborated closely with system analysts and tech leads on database requirements, API contracts, and integration dependencies.'
            ]
          }
        ],
        education: [
          {
            institution: 'Inha University in Tashkent (IUT)',
            degree: 'Bachelor of Science in Computer Science and Software Engineering (3rd Year)',
            specialization: 'Cumulative GPA: 4.1 / 4.5 • Data Structures & Algorithms, OOP, Discrete Math, OS',
            period: '2024 — Present',
          },
          {
            institution: 'School 21',
            degree: 'Machine Learning Engineer Track (1+ yr)',
            specialization: 'Applied C/C++, algorithmic problem-solving, Linux systems, foundational ML algorithms',
            period: '2025 — Present',
          }
        ],
        achievements: [
          {
            title: '1st Place — Kapitalbank & Uzum Hackathon',
            desc: 'Grand champion in FinTech and AI solution engineering.'
          },
          {
            title: '1st Place — Rector\'s Cup 2025 Hackathon',
            desc: 'Winner of Rector\'s Cup for innovative digital platforms.'
          },
          {
            title: '3rd Place — TheBuildX Hackathon',
            desc: 'Prize winner in product development and rapid prototyping.'
          },
          {
            title: 'Top 10% Finalist & Podium Finishes',
            desc: 'Multiple awards in national and regional AI hackathons (including No Flame No Game AI Hackathon).'
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
          { name: 'Russian', level: 'Native / Bilingual' },
          { name: 'Uzbek', level: 'Native / Bilingual' },
          { name: 'English', level: 'Professional Working Proficiency' },
          { name: 'Chinese (中文)', level: 'B2 (Upper-Intermediate)' }
        ]
      }
    },
    {
      id: 'member-2',
      name: 'Diyora Fatakhova',
      role: 'Data & Annotation Lead • UI/UX Co-Developer',
      badge: 'Data Operations & UI/UX • Inha / School 21',
      photo: '/teammate-2.jpg',
      objectPosition: '48% 22%',
      initials: 'DF',
      bio: '3rd year student at INHA University in Tashkent (School of Computer & Information Engineering) and School 21 (Business Systems Analytics). Founder of Talkaholics Anonymous (100+ members) and marketing & visual design coordinator at Women in Tech Uzbekistan. Led the end-to-end video data annotation pipeline across 14 event classes, calibrated scene road geometry polygons in labelme, and co-designed the interactive user experience of the presentation web platform.',
      contributions: [
        'Data Annotation Pipeline Lead: comprehensive frame-by-frame labeling of 14 spatiotemporal event classes across multi-camera 4K CCTV samples in Label Studio',
        'Spatial Road Geometry: polygon annotation of stop-lines, lane dividers, pedestrian crosswalks and traffic signal ROIs for scene.yaml',
        'Web Platform UI/UX & Quality: co-designed visual presentation, dossier modals, responsive mobile layouts and structured product requirements',
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
        gitlab: 'https://gitlab.com/diyora.ft-group/diyora_bsa-projects/-/tree/develop?ref_type=heads',
        linkedin: 'https://www.linkedin.com/in/diyora-fatakhova-638665336/',
      },
      imageLeft: false, // 2nd: Info Left (75%), Photo Right (25%) - CHESSBOARD
      dossier: {
        title: 'Data & Annotation Lead • Business Systems Analyst • UI/UX Co-Developer',
        location: 'Tashkent, Uzbekistan',
        summary: '3rd-year student at INHA University in Tashkent (School of Computer and Information Engineering) and School 21 (Business Systems Analytics). Combines core technical skills (C++, SQL, Excel) with trilingual fluency (RU, UZ, EN) and proven leadership: founded the English Speaking Club (100+ participants) at School 21, active designer and marketer at Women in Tech Uzbekistan. Regularly participates in hackathons, workshops, and tech initiatives. Specializes in business analysis, CustDev, cross-functional team coordination, and deploying innovative AI-vision products.',
        hackathonFocus: [
          'Data Annotation Pipeline Lead: frame-by-frame annotation of 14 road traffic event classes across 4K CCTV samples in Label Studio',
          'Intersection Spatial Geometry Calibration: annotated lane polygons, stop-lines, and pedestrian crosswalk zones in labelme for scene.yaml calibration',
          'UI/UX & Frontend Co-Design: co-designed user experience, interactive controls, and visual clarity across the web presentation platform'
        ],
        experience: [
          {
            company: 'Talkaholics Anonymous',
            role: 'Founder & Community Lead',
            period: 'May 2025 — Present',
            location: 'Tashkent / School 21',
            badge: 'Community & Leadership',
            highlights: [
              'Event Management: built from scratch and coordinate a vibrant English conversational club with 100+ active members; regularly organize interactive workshops and debate meetups.',
              'Internal Communications: manage the club\'s Telegram channel, author engaging community announcements, and drive English-first discussions; achieved high member retention through gamified formats.'
            ]
          },
          {
            company: 'Women in Tech Uzbekistan',
            role: 'Marketing & Visual Designer',
            period: 'June 2025 — Present',
            location: 'Tashkent, Uzbekistan',
            badge: 'Community & Marketing',
            highlights: [
              'Spearheaded marketing and visual design communications for Women in Tech Uzbekistan for over a year.',
              'Coordinated cross-functional teams for special event launches and technical education initiatives.',
              'Created visual identities, promotional assets, and marketing campaigns for community conferences.'
            ]
          },
          {
            company: 'Project «Zira» (Technovation Girls\'25)',
            role: 'Team Lead & Product Analyst',
            period: 'March — May 2025',
            location: 'Tashkent, Uzbekistan',
            badge: 'AI Camera Mobile App',
            highlights: [
              'Co-developed product concept and MVP for an emergency mobile application integrated with AI camera vision.',
              'Customer Development & Requirements: conducted user interviews, mapped pain points during emergency situations, and drafted PRD / functional specifications for the AI camera MVP.',
              'Team Coordination: orchestrated sprint tasks for cross-functional peers, aligned deadlines, and facilitated progress standups.'
            ]
          },
          {
            company: 'IMTS Platform (INHA Mock Testing System)',
            role: 'Product / Launch Manager',
            period: 'March — April 2025',
            location: 'Tashkent, Uzbekistan',
            badge: 'Product Launch & Pitching',
            highlights: [
              'Product Launch & Public Pitching: delivered two key platform presentations (at Ziyo Forum and INHA University) with 150+ attendees (target audience: prospective university applicants).',
              'Growth & Acquisition: promoted preparatory courses via social channels and direct presentations, driving consistent target user acquisition and brand awareness.'
            ]
          }
        ],
        education: [
          {
            institution: 'School 21',
            degree: 'Business Systems Analytics Track',
            specialization: 'Business & Systems Analysis, Process Architecture, Peer-to-Peer Engineering',
            period: '2025 — Present',
          },
          {
            institution: 'INHA University in Tashkent (IUT)',
            degree: '3rd Year Undergraduate, School of Computer and Information Engineering (SOCIE)',
            specialization: 'Computer and Information Engineering',
            period: '2024 — Present',
          },
          {
            institution: 'ALUzSWLU (Academic Lyceum under UzSWLU)',
            degree: 'Exact Sciences Diploma',
            specialization: 'Advanced Mathematics & Computer Science',
            period: '2022 — 2024',
          }
        ],
        achievements: [
          {
            title: 'Technovation Girls\'25 — Project «Zira»',
            desc: 'Developed emergency response mobile application integrating AI computer vision and user safety workflows.'
          },
          {
            title: 'Founder — Talkaholics Anonymous (100+ Members)',
            desc: 'Successfully launched and scaled an active peer English-speaking community at School 21.'
          },
          {
            title: 'Product Launch Manager — IMTS',
            desc: 'Spearheaded launch and public pitching of the INHA Mock Testing System to 150+ prospective students.'
          }
        ],
        skillCategories: [
          {
            category: 'Business Analysis & Product',
            items: ['Business Systems Analysis', 'CustDev', 'Product Launch', 'Requirements Gathering', 'Event Management', 'Team Coordination']
          },
          {
            category: 'Design & Office Tools',
            items: ['Figma', 'Canva', 'Excel', 'PowerPoint', 'Google Docs', 'Notion']
          },
          {
            category: 'Core IT Stack & AI',
            items: ['SQL', 'C++', 'Gemini', 'Notion AI', 'Data Analysis']
          },
          {
            category: 'Management & Content',
            items: ['Visual & Copywriting (EN/RU)', 'Event Organization', 'Telegram Channel Ops', 'Meeting Facilitation']
          }
        ],
        languages: [
          { name: 'Russian', level: 'Native / Bilingual' },
          { name: 'English', level: 'Fluent (C1 / Speaking Club Founder)' },
          { name: 'Uzbek', level: 'Native / Bilingual' }
        ]
      }
    },
    {
      id: 'member-3',
      name: 'Ashirov Asan',
      role: 'Chief ML & Computer Vision Architect • Systems Engineer',
      badge: 'Lead AI Vision & Systems Architect • Airi.uz / Inha',
      photo: '/teammate-3.jpg',
      objectPosition: '53% 20%',
      initials: 'AA',
      bio: 'Machine Learning & Computer Vision engineer with proven experience building industrial CV object detection systems, 4-LGBM order forecasting ensembles, STT/TTS speech models, and RAG architectures. Top 11 in Yandex Contest (CMC). Sole architect and developer of the entire core technical ML/CV backend, object perception, kinematics rules engine for 14 classes, and Part B Causal Risk Estimator.',
      contributions: [
        'Complete Core ML/CV Pipeline: designed solution.py, YOLO26m/YOLOv8 vehicle & pedestrian detection and ByteTrack tracking (fuse_score=False fix)',
        'Rules Engine for 14 Classes: engineered kinematic and geometric rules on top of camera.md homography (speed in km/h, heading, stop-lines, solid lines, congestion)',
        'Part B Causal Risk Estimator: developed online step() causal anticipation model with two-channel score (<=0.4999 ranking vs >=0.5 alarm) and TTC collision detection',
      ],
      proudProjects: [
        'Yandex Contest (CMC) — Top 11 ranking',
        'LINKTRADE Smart Retail CV Detection (>95% accuracy for AVON)',
        'airi.uz Speech (STT/TTS) & RAG Multimodal AI Models',
      ],
      links: {
        github: 'https://github.com/Antifragile-nnt',
        kaggle: 'https://www.kaggle.com/asanashirov',
        telegram: 'https://t.me/Antifragile_nnt',
        email: 'asanashirov24@gmail.com',
        phone: '+998933940681',
        phoneDisplay: '+998 (93) 394-06-81',
      },
      imageLeft: true, // 3rd: Photo Left (25%), Info Right (75%) - CHESSBOARD
      dossier: {
        title: 'Chief ML & Computer Vision Architect • Systems Engineer',
        location: 'Tashkent, Uzbekistan',
        summary: 'Specializing in applied machine learning, computer vision (CV), natural language processing (NLP), and recommender systems. Proven track record building industrial object detection pipelines, high-precision gradient boosted ensembles (ROC-AUC > 0.93, lift 58x), speech synthesis/recognition (STT/TTS) integrations, and autonomous RAG agents. For the WIUT Hackathon, solely designed and implemented the entire core algorithmic backend: frame detection, multi-object tracking, geometric rules engine for all 14 Part A classes, and the causal Part B accident prediction module.',
        hackathonFocus: [
          'End-to-End Core ML/CV Pipeline Architecture: designed solution.py, integrated YOLO26m/YOLOv8 detector and ByteTrack tracker (with fuse_score=False fix)',
          'Mathematical Rule Engine for all 14 Part A Classes: implemented violation logic based on camera.md homography (TTC, metric velocity, heading angles, stop-lines)',
          'Causal Part B RiskEstimator: dual-channel risk calibration (continuous <=0.4999 ranking vs >=0.5 alarm trigger 0.5-1.0s pre-collision) and Tesla T4 runtime optimization'
        ],
        experience: [
          {
            company: 'Institute of Digital Technologies and Artificial Intelligence (airi.uz)',
            role: 'Machine Learning Engineer',
            period: 'July 2026 — Present (3 mos)',
            location: 'Tashkent, Uzbekistan',
            badge: 'Current Employment',
            highlights: [
              'Trained and fine-tuned speech recognition and synthesis models (STT/TTS) for the Uzbek language.',
              'Architected and deployed enterprise RAG (Retrieval-Augmented Generation) systems for corporate knowledge bases.',
              'Researched and integrated multimodal AI Vision models for complex visual scene analysis.'
            ]
          },
          {
            company: 'LINKTRADE',
            role: 'Data Scientist / ML Engineer',
            period: 'January 2026 — August 2026 (8 mos)',
            location: 'Tashkent, Uzbekistan',
            badge: 'Computer Vision & B2B ML',
            highlights: [
              'Computer Vision: developed shelf product recognition and classification system for brands like AVON and Sardor Snacks with >95% detection accuracy, slashing manual verification by 70%.',
              'B2B Order Forecasting: built 4-model LightGBM ensemble with walk-forward validation (ROC-AUC > 0.93, lift 58x), optimizing supply chain and working capital.',
              'Engineered intelligent RAG agents (LangChain, LlamaIndex) for automated business intelligence and operational reporting.'
            ]
          },
          {
            company: 'Yandex Crowd',
            role: 'Data Collection & Quality Assurance Specialist',
            period: 'June 2025 — December 2025 (7 mos)',
            location: 'Tashkent / Remote',
            badge: 'Data Ops & QA',
            highlights: [
              'Curated, structured, and validated geospatial training datasets for Yandex Maps and Yandex Go.',
              'Conducted quality control and label auditing for production Computer Vision and NLP datasets.',
              'Automated annotation anomaly detection and training dataset pre-processing pipelines.'
            ]
          },
          {
            company: 'Syncall AI',
            role: 'Data Analyst',
            period: 'July 2025 — October 2025 (4 mos)',
            location: 'Tashkent, Uzbekistan',
            badge: 'Voice AI Analytics',
            highlights: [
              'Analyzed performance and quality of speech synthesis and recognition models (STT/TTS) in conversational voice bots.',
              'Built analytical Python data pipelines to monitor dialogue conversion rates and evaluate A/B test cohorts.'
            ]
          },
          {
            company: 'Neuro Pulse',
            role: 'Data Scientist / AI Engineer (Intern)',
            period: 'December 2024 — February 2025 (3 mos)',
            location: 'Tashkent, Uzbekistan',
            badge: 'Deep Learning R&D',
            highlights: [
              'Researched modern transformer architectures and trained deep learning baseline models in PyTorch.',
              'Performed feature engineering and pre-processing across tabular, speech, and text modalities.'
            ]
          }
        ],
        education: [
          {
            institution: 'Inha University in Tashkent (IUT)',
            degree: 'Bachelor of Science in Computer Science and Engineering (CSE)',
            specialization: 'Software Engineering & Data Science / ML',
            period: '2024 — 2028',
          },
          {
            institution: 'Qwasar Silicon Valley',
            degree: 'Data Science & ML Engineering Specialization',
            specialization: 'Applied Deep Learning, Algorithms & Data Structures',
            period: '2023 — 2024',
          }
        ],
        achievements: [
          {
            title: 'Yandex Contest (CMC) — Top 11',
            desc: 'High percentile finish in competitive algorithmic data science and machine learning.'
          },
          {
            title: 'CBU & IT-Park Hackathons — Prize Winner',
            desc: 'Multiple top placements in applied ML/AI engineering and data-driven product challenges.'
          },
          {
            title: 'Kaggle Competitions Contributor',
            desc: 'Top solutions in tabular feature engineering and image classification benchmarks.'
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
          { name: 'Russian', level: 'Native' },
          { name: 'English', level: 'B2 / Professional Working' },
          { name: 'Uzbek', level: 'C1 / Professional' },
          { name: 'Kazakh', level: 'C1 / Professional' },
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
            A cohesive three-member team uniting a dedicated ML/CV Systems Architect with Technical Product, UI/UX, and Video Annotation Leads to deliver a robust end-to-end solution for the WIUT Hackathon 2026 Elimination Challenge.
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
                title="Click to view full dossier & resume"
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
                    <span>View Dossier</span>
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
                    Dossier &rarr;
                  </span>
                </div>
              </div>
            );

            const infoBlock = (
              <div
                onClick={() => setSelectedMember(member)}
                className={`w-full flex flex-col justify-between p-6 sm:p-8 bg-[#121a2a] rounded-3xl border border-[#1f2d45] hover:border-[#00e5ff]/50 transition-all shadow-xl group col-span-1 md:col-span-3 cursor-pointer ${
                  isPhotoLeft ? 'order-2' : 'order-2 md:order-1'
                }`}
                title="Click to view full dossier & resume"
              >
                <div>
                  {/* Top Bar: Role badge & Social Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182236] border border-[#2a3a56] text-xs font-semibold uppercase tracking-wider text-[#00e5ff]">
                      {member.badge}
                    </div>

                    {/* Socials & Contacts - stop propagation so external links don't trigger modal */}
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
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
                      {member.links.kaggle && (
                        <a
                          href={member.links.kaggle}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#090f1a] hover:bg-[#20BEFF]/20 hover:text-[#20BEFF] text-gray-400 border border-[#1f2d45] transition"
                          title="Kaggle Profile"
                        >
                          <KaggleIcon className="w-4 h-4" />
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
                        <span>View Full Dossier</span>
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
                href="https://github.com/tisak559314-cloud/Hackathon-WIUT"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0693e3] hover:bg-[#0582ca] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#0693e3]/20"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Git Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/tisak559314-cloud/Hackathon-WIUT/releases"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#182236] hover:bg-[#202e47] text-white font-bold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
              >
                <Download className="w-4 h-4 text-[#00e5ff]" />
                <span>Weights (&lt; 5 GB)</span>
              </a>

              <a
                href="https://github.com/tisak559314-cloud/Hackathon-WIUT/blob/main/predictions_samples.json"
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
      {/* POP-UP MODAL: FULL CANDIDATE DOSSIER & RESUME                             */}
      {/* ========================================================================= */}
      {selectedMember && selectedMember.dossier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c1322] border border-[#1f2d45] rounded-3xl shadow-2xl overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Sticky at top right of modal so it's always accessible while scrolling */}
            <button
              onClick={() => setSelectedMember(null)}
              className="sticky top-4 right-4 float-right z-30 p-2 sm:p-2.5 rounded-full bg-[#080c14]/90 text-gray-300 hover:text-white hover:bg-[#1f2d45] border border-[#1f2d45] shadow-xl backdrop-blur-md transition-all mr-4 mt-4 -mb-12"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header - now scrolls away when user scrolls down */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#121a2a] via-[#101726] to-[#0c1322] border-b border-[#1f2d45] pr-14">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
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

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    <span>{selectedMember.name}</span>
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
                    <span>Call</span>
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

                {selectedMember.links.kaggle && (
                  <a
                    href={selectedMember.links.kaggle}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#182236] hover:bg-[#20BEFF]/20 border border-[#2a3a56] hover:border-[#20BEFF]/40 text-gray-200 hover:text-[#20BEFF] text-xs font-semibold transition"
                  >
                    <KaggleIcon className="w-3.5 h-3.5 text-[#20BEFF]" />
                    <span>Kaggle</span>
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

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 text-gray-300">
              {/* 1. Summary / Executive Summary */}
              <div className="p-5 rounded-2xl bg-[#121a2a]/70 border border-[#1f2d45]">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Executive Summary
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
                    Key Hackathon Deliverables &amp; Impact (WIUT 2026):
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

              {/* 3. Work Experience */}
              {selectedMember.dossier.experience && selectedMember.dossier.experience.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-bold flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#00e5ff]" />
                    Work Experience &amp; Leadership:
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
                      Education &amp; Academic Background:
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
                      Honors, Hackathons &amp; Competitions:
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
                    Technical Skills &amp; Stack:
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
                    Spoken Languages:
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
                    <span>Message on Telegram</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#182236] hover:bg-[#202e47] text-gray-300 font-bold text-xs uppercase tracking-wider border border-[#2a3a56] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

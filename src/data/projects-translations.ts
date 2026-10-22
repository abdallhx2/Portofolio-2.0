import { Language } from '@/translations';

export interface ProjectTranslation {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  image: string;
  gallery: string[];
  client: string;
  duration: string;
  year: number;
  url?: string;
  github?: string;
  featured: boolean;
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
}

export const projectsTranslations: Record<Language, ProjectTranslation[]> = {
  en: [
    {
      id: "portfolio-app",
      title: "Portfolio App",
      description: "An advanced and innovative personal application that showcases developers' portfolios in a professional and attractive manner worthy of the quality of work delivered. The app idea originated from a genuine personal need to find a distinctive way to display portfolios flexibly and attractively across all devices. The application provides a smooth and seamless browsing experience across different devices with multiple organized sections for projects, skills, articles, and experiences. Developed using advanced Flutter technology to work on mobile and web with the same efficiency and quality, with easy and flexible customization capabilities. The goal of the application is not just to display work but to reflect the quality of experience that can be delivered to any future project, making it a powerful marketing tool for professional developers.",
      shortDescription: "Portfolio showcase app for developers",
      category: "Mobile Development",
      tags: ["Flutter", "Dart", "Responsive Design", "Cross-Platform"],
      image: "/project/cv/1.png",
      gallery: [
        "/project/cv/1.png",
        "/project/cv/2.png",
        "/project/cv/3.png",
        "/project/cv/4.png"
      ],
      client: "Personal Project",
      duration: "2 months",
      year: 2023,
      url: "https://an11one.netlify.app/",
      github: "https://github.com/abdallhx2/portofilo",
      featured: false,
      challenge: "Creating an application that reflects work quality and provides an exceptional browsing experience across all devices.",
      solution: "Developing a responsive Flutter application with attractive design and organized sections for projects and skills.",
      result: "Achieved a professional platform for showcasing work and improving professional impression.",
      technologies: ["Flutter", "Dart", "Responsive Design", "Material Design", "Firebase"]
    },
    {
      id: "raseem-app",
      title: "Raseem - AI Diagram Generator",
      description: "An innovative mobile application that transforms text descriptions into professional diagrams using AI technology. Raseem supports multiple diagram types including flowcharts, mind maps, and network diagrams, making technical documentation faster and more accessible.",
      shortDescription: "AI-powered app that converts text to professional diagrams",
      category: "AI Development",
      tags: ["AI", "Machine Learning", "Next.js"],
      image: "/project/rassem/1.jpg",
      gallery: [
        "/project/rassem/1.jpg",
        "/project/rassem/2.jpg",
        "/project/rassem/3.jpg",
        "/project/rassem/4.jpg"
      ],
      client: "Personal Project",
      duration: "4 Days",
      year: 2024,
      url: "https://www.raseemai.com/",
      github: "https://github.com/abdallhx2/RaseemAi",
      featured: false,
      challenge: "Bridging the gap between complex technical documentation and user-friendly diagram creation.",
      solution: "Developed an AI-powered Flutter application with natural language processing capabilities and intelligent diagram generation.",
      result: "Successfully streamlined diagram creation process for technical teams and educators.",
      technologies: ["AI/ML", "Natural Language Processing", "Next.js", "Firebase"]
    },
    {
      id: "fruitai-app",
      title: "FruitAI",
      description: "An intelligent and advanced application that utilizes the latest artificial intelligence technologies to help farmers make better and more accurate decisions about their agricultural production. The app idea originated from a real situation experienced by most farmers who put tremendous effort into their lands but lack the technical tools that support their important decisions, especially during critical harvest times or when needing to determine fruit quality and ripeness. The application provides advanced solutions through machine learning techniques and image analysis to determine fruit type, quality, and optimal harvest timing with high accuracy. It also displays useful data and comprehensive analytics that help farmers improve their production and increase the efficiency of their agricultural operations, representing an important step towards smarter, more conscious, and effective farming in the future.",
      shortDescription: "AI app for fruit quality analysis and harvest timing",
      category: "AI Development",
      tags: ["Flutter", "AI", "Machine Learning", "Computer Vision"],
      image: "/project/fruit/1.png",
      gallery: [
        "/project/fruit/2.png",
        "/project/fruit/3.png",
        "/project/fruit/4.png"
      ],
      client: "Agricultural Sector",
      duration: "4 months",
      year: 2023,
      github: "https://github.com/abdallhx2/fruitAi",
      featured: false,
      challenge: "Developing a tool that helps farmers make better decisions about harvest and fruit quality.",
      solution: "An application that uses artificial intelligence to analyze images and provide accurate instant information.",
      result: "Improved agricultural production efficiency and reduced crop waste.",
      technologies: ["Flutter", "Dart", "TensorFlow", "Computer Vision", "Machine Learning", "Firebase"]
    },
    {
      id: "izahab-app",
      title: "iZahab - Hajj Luggage Tracker",
      description: "An integrated and advanced application for tracking luggage and managing reports during the Hajj season, specifically designed to solve real and recurring problems that occur every year. The app idea originated from a precise observation of a problem that recurs annually with pilgrims, which is the loss of luggage or delayed arrival after entering the holy sites, causing great inconvenience to pilgrims and pressure on organizing teams. The application provides an intelligent and advanced tracking system for lost luggage and cases of lost pilgrims, in addition to a comprehensive and integrated control panel that allows organizing teams to monitor all operations and locations with high accuracy. The application is distinguished by its ability to determine geographical coordinates with extreme precision and provide detailed reports on the situation on the ground. The project started with a simple idea but evolved and expanded to become a comprehensive solution serving all entities working in Hajj, saving organizing teams significant time and effort and giving them complete and effective control in managing the field situation.",
      shortDescription: "Hajj luggage tracking and incident management app",
      category: "Web Development",
      tags: ["Next.js", "GPS", "Real-time Tracking"],
      image: "/project/zahab/1.jpg",
      gallery: [
        "/project/zahab/1.jpg",
        "/project/zahab/2.jpg",
        "/project/zahab/3.jpg",
        "/project/zahab/4.jpg",
        "/project/zahab/5.jpg",
        "/project/zahab/6.jpg",
        "/project/zahab/7.jpg",
        "/project/zahab/8.jpg",


      ],
      client: "Belad Al-Haramain Company",
      duration: "2 months",
      year: 2025,
      featured: true,
      challenge: "Solving the problem of lost luggage and lost pilgrims through an effective technical approach.",
      solution: "A comprehensive application that tracks luggage and manages reports with an integrated control panel for teams.",
      result: "Improved pilgrim experience and saved time and effort for organizing teams.",
      technologies: ["GPS", "Next.js", "Real-time Database", "Firebase", "Google Maps"]
    },
    {
      id: "efficiency",
      title: "Efficiency Tools - Free Smart Utilities Platform",
      description: "A completely free platform featuring 30+ daily tools, developed with Vue.js to provide zero-cost solutions. Includes URL shorteners, background removers, text extractors, speed tests, specialized calculators (BMI, age, date) and designer tools (color extractors, palette generators, font previewers). All tools are 100% free with no subscriptions or hidden fees, making it the ideal solution for developers, designers and general users.",
      shortDescription: "Fully free all-in-one platform for daily utilities",
      category: "Web Tools",
      tags: ["Completely Free", "Vue.js", "Open Tools"],
      image: "/project/efficiency-tools/main.png",
      gallery: [
        "/project/efficiency-tools/1.png",
        "/project/efficiency-tools/2.png",
        "/project/efficiency-tools/3.png",
        "/project/efficiency-tools/4.png"
      ],
      client: "Personal Project",
      duration: "3 months",
      year: 2024,
      featured: false,
      challenge: "Providing professional tools completely free as alternative to paid solutions",
      solution: "Unified free platform replacing multiple paid services",
      result: "Saved users thousands of dollars with unified experience",
      technologies: ["Vue.js", "HTML5 Canvas", "Tesseract.js", "Web Workers"]
    },
    {
      id: "labib-app",
      title: "Labib - Smart Learning Agent",
      description: "An intelligent educational platform that revolutionizes daily student learning through AI-generated interactive questions delivered via Telegram. The system originated from a real educational gap — students need consistent daily reinforcement, but teachers lack the tools and time to provide it individually. Labib solves this by automatically generating three tailored true/false questions daily from lesson content using advanced AI models, delivering them sequentially through a Telegram bot with immediate constructive feedback and explanations. On the teacher side, a comprehensive Next.js dashboard provides real-time analytics: daily participation rates, individual student performance tracking, weekly and monthly trend reports, and early identification of struggling students. The backend architecture uses FastAPI with Celery for scheduled task processing, Redis for caching and job queuing, and PostgreSQL for persistent data. The entire system is containerized with Docker for reliable deployment and scaling. Labib transforms passive learning into an active daily habit while giving teachers unprecedented visibility into their students' progress.",
      shortDescription: "AI-powered educational agent that delivers daily quizzes via Telegram with teacher analytics dashboard",
      category: "AI Development",
      tags: ["AI", "Telegram Bot", "FastAPI", "Next.js", "Education"],
      image: "/project/labeeb/1761125577029.jpg",
      gallery: [
        "/project/labeeb/1761125577029.jpg",
        "/project/labeeb/1761125577105.jpg",
        "/project/labeeb/1761125577263.jpg",
        "/project/labeeb/1761125577348.jpg",
        "/project/labeeb/1761125577361.jpg",
        "/project/labeeb/1761125578155.jpg"
      ],
      client: "Personal Project",
      duration: "2 months",
      year: 2025,
      url: "https://www.labeeb.pro/",
      featured: true,
      challenge: "Students lack consistent daily reinforcement outside classrooms, and teachers have no efficient way to monitor individual progress at scale.",
      solution: "An AI-powered Telegram bot that delivers personalized daily questions generated from lesson content, paired with a real-time teacher dashboard for performance analytics and early intervention.",
      result: "A production-ready platform supporting 100+ concurrent students with instant feedback, automated reminders, and comprehensive performance reports that transformed passive learning into an active daily habit.",
      technologies: ["FastAPI", "Next.js", "PostgreSQL", "Celery", "Redis", "Telegram Bot API", "OpenRouter AI", "Docker"]
    },
    {
      id: "aloura-agency",
      title: "ALOURA - Creative Agency Website",
      description: "A premium, immersive website for ALOURA Creative House — a luxury creative agency based in Mecca, Saudi Arabia, specializing in creative direction, content creation, and social media management for fashion, beauty, and lifestyle brands. The project demanded a digital experience that matches the agency's high-end positioning: every interaction feels intentional and luxurious. The site features a full-screen hero section with cinematic video backgrounds, smooth Lenis-powered scrolling, and sophisticated animations including 3D globe visualizations built with Three.js, stacking card effects, and vertical testimonial marquees. The bilingual architecture supports seamless switching between English and Arabic with full RTL layout adaptation using next-intl. A functional contact form powered by Resend handles client inquiries directly. The portfolio section showcases the agency's work through high-quality video and image galleries. SEO is handled through dynamic metadata generation, structured JSON-LD markup, and Google Analytics integration. The entire experience is optimized for performance with lazy loading, image optimization, and code splitting while maintaining the visual richness expected of a luxury brand website.",
      shortDescription: "Premium bilingual website for a luxury creative agency specializing in fashion and beauty brands",
      category: "Web Development",
      tags: ["Next.js", "Three.js", "Framer Motion", "Bilingual", "Luxury Design"],
      image: "/project/lura/1.jpg",
      gallery: [
        "/project/lura/1.jpg",
        "/project/lura/2.jpg",
        "/project/lura/3.jpg",
        "/project/lura/4.png",
        "/project/lura/5.jpg"
      ],
      client: "ALOURA Creative House",
      duration: "1 month",
      year: 2025,
      url: "https://www.aloura.agency/",
      featured: true,
      challenge: "Building a digital experience that authentically reflects a luxury creative agency's premium positioning while maintaining fast performance and seamless bilingual support.",
      solution: "An immersive Next.js website with cinematic video backgrounds, 3D visualizations, smooth scroll animations, and full Arabic/English bilingual support with RTL adaptation.",
      result: "A visually stunning platform that elevated the agency's digital presence, attracting high-end fashion and beauty clients with a browsing experience that matches the quality of their creative work.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Lenis", "next-intl", "Resend"]
    },
    {
      id: "traweh-directory",
      title: "Traweh - Taraweeh Prayer Directory",
      description: "A comprehensive Arabic web platform that helps worshippers find the best Taraweeh prayer mosques and imams across Makkah, Madinah, Jeddah, and Riyadh during Ramadan. Born from a real community need — every Ramadan, millions search for mosques with distinguished reciters, yet no dedicated platform existed to guide them. Traweh fills this gap with a rich database covering 259+ districts, complete Haramain schedules for all 30 nights with imam assignments for each Taraweeh and Tahajjud session, and audio samples so users can preview each imam's recitation style before choosing their mosque. The platform features an interactive map powered by Leaflet with GPS-based nearest mosque detection, a smart duplicate-detection system using Haversine formula within 50-meter radius, and a community-driven data collection pipeline where contributors can submit mosques without registration. One of the most challenging aspects was the audio processing pipeline — built entirely in-browser using FFmpeg.wasm, it automatically trims recordings to 45 seconds, compresses to 128kbps mono MP3, and extracts audio from video files. A separate Python service on Render handles YouTube audio extraction with async job queues. The location verification system parses 5 different Google Maps URL formats to extract coordinates and cross-references them against existing mosques to prevent duplicates. The platform serves as an essential Ramadan companion, transforming the mosque selection experience from word-of-mouth into a data-driven, audio-enriched discovery process.",
      shortDescription: "Arabic platform helping worshippers find Taraweeh mosques and imams with audio samples and interactive maps",
      category: "Web Development",
      tags: ["Next.js", "PWA", "Leaflet Maps", "FFmpeg", "Supabase", "Arabic-First"],
      image: "/images/projects/traweh/traweh-hero.png",
      gallery: [
        "/images/projects/traweh/traweh-hero.png",
        "/images/projects/traweh/traweh-mobile.png",
        "/images/projects/traweh/traweh-map.png",
        "/images/projects/traweh/traweh-haram.png"
      ],
      client: "Community Project",
      duration: "3 months",
      year: 2025,
      url: "https://traweh.org",
      featured: true,
      challenge: "Every Ramadan, millions of worshippers struggle to find mosques with their preferred reciters — no centralized, audio-enriched directory existed for Taraweeh prayers across Saudi cities.",
      solution: "A PWA platform with interactive maps, in-browser audio processing via FFmpeg.wasm, community-driven data collection, Haramain schedules for 30 nights, and smart mosque duplicate detection using geolocation.",
      result: "A production-ready Ramadan companion serving worshippers across 4 cities and 259+ districts, with complete Haramain schedules, audio previews for imam recitations, and a contributor-powered data ecosystem that grows organically each Ramadan.",
      technologies: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Leaflet", "FFmpeg.wasm", "TailwindCSS", "PWA", "Vercel"]
    }

  ],
  ar: [
    {
      id: "portfolio-app",
      title: "Portfolio App",
      description: "تطبيق شخصي متطور ومبتكر يعرض الملف الشخصي للمطورين بشكل احترافي وجذاب يليق بجودة العمل المقدم. نشأت فكرة التطبيق من حاجة شخصية حقيقية لإيجاد طريقة مميزة لعرض الملف الشخصي بشكل مرن وجذاب على جميع الأجهزة. يوفر التطبيق تجربة تصفح سلسة وناعمة عبر الأجهزة المختلفة مع أقسام متعددة ومنظمة للمشاريع والمهارات والمقالات والخبرات. مطور بتقنية Flutter المتقدمة ليعمل على الجوال والويب بنفس الكفاءة والجودة، مع إمكانية التخصيص السهل والمرن. الهدف من التطبيق ليس فقط عرض الأعمال بل عكس جودة التجربة التي يمكن توصيلها لأي مشروع مستقبلي، مما يجعله أداة تسويقية قوية للمطورين المحترفين.",
      shortDescription: "تطبيق عرض الملف الشخصي للمطورين",
      category: "Mobile Development",
      tags: ["Flutter", "Dart", "Responsive Design", "Cross-Platform"],
      image: "/project/cv/1.png",
      gallery: [
        "/project/cv/1.png",
        "/project/cv/2.png",
        "/project/cv/3.png",
        "/project/cv/4.png"
      ],
      client: "Personal Project",
      duration: "2 months",
      year: 2023,
      url: "https://an11one.netlify.app/",
      github: "https://github.com/abdallhx2/portofilo",
      featured: false,
      challenge: "إنشاء تطبيق يعكس جودة العمل ويوفر تجربة تصفح مميزة عبر جميع الأجهزة.",
      solution: "تطوير تطبيق Flutter متجاوب مع تصميم جذاب وأقسام منظمة للمشاريع والمهارات.",
      result: "حصلت على منصة احترافية لعرض الأعمال وتحسين الانطباع المهني.",
      technologies: ["Flutter", "Dart", "Responsive Design", "Material Design", "Firebase"]
    },
    {
      id: "fruitai-app",
      title: "FruitAI",
      description: "تطبيق ذكي ومتقدم يستخدم أحدث تقنيات الذكاء الاصطناعي لمساعدة المزارعين في اتخاذ قرارات أفضل وأكثر دقة حول إنتاجهم الزراعي. نشأت فكرة التطبيق من واقع حقيقي يعيشه أغلب المزارعين الذين يبذلون جهوداً كبيرة في أراضيهم لكن يفتقرون إلى الأدوات التقنية التي تدعم قراراتهم المهمة، خاصة في أوقات الحصاد الحرجة أو عند الحاجة لمعرفة صلاحية الفاكهة وجودتها. يوفر التطبيق حلولاً متقدمة عبر استخدام تقنيات التعلم الآلي وتحليل الصور لتحديد نوع الفاكهة وجودتها والتوقيت المثالي للحصاد بدقة عالية. كما يعرض بيانات مفيدة وتحليلات شاملة تساعد المزارعين في تحسين إنتاجهم وزيادة كفاءة عملياتهم الزراعية، مما يمثل خطوة مهمة نحو زراعة أكثر ذكاءً ووعياً وفعالية في المستقبل.",
      shortDescription: "تطبيق AI لتحليل جودة الفاكهة والحصاد",
      category: "AI Development",
      tags: ["Flutter", "AI", "Machine Learning", "Computer Vision"],
      image: "/project/fruit/1.png",
      gallery: [
        "/project/fruit/2.png",
        "/project/fruit/3.png",
        "/project/fruit/4.png"
      ],
      client: "Agricultural Sector",
      duration: "4 months",
      year: 2023,
      github: "https://github.com/abdallhx2/fruitAi",
      featured: false,
      challenge: "تطوير أداة تساعد المزارعين في اتخاذ قرارات أفضل حول الحصاد وجودة الفاكهة.",
      solution: "تطبيق يستخدم الذكاء الاصطناعي لتحليل الصور وتقديم معلومات دقيقة فورية.",
      result: "تحسين كفاءة الإنتاج الزراعي وتقليل الفاقد في المحاصيل.",
      technologies: ["Flutter", "Dart", "TensorFlow", "Computer Vision", "Machine Learning", "Firebase"]
    },
    {
      id: "raseem-app",
      title: "Raseem - AI Diagram Generator",
      description: "أداة مبتكرة وثورية تحوّل الوصف النصي إلى مخططات هندسية احترافية ودقيقة باستخدام أحدث تقنيات الذكاء الاصطناعي ومعالجة اللغة الطبيعية. نشأت فكرة رسيم من حاجة حقيقية وتحدي يومي كان يواجه المطورين والمهندسين في عملية توثيق الأنظمة، حيث تستغرق هذه العملية وقتاً طويلاً وأحياناً لا تكون واضحة لجميع أفراد الفريق. تدعم الأداة أنواعاً متعددة ومتنوعة من المخططات الهندسية مثل مخططات قواعد البيانات (ER) ومخططات التدفق (Flow) ومخططات التسلسل (Sequence) وغيرها الكثير، وكلها تُنتج بشكل فوري وبجودة عالية. الهدف من رسيم هو توفير الوقت الثمين وخدمة المطورين والمصممين ومدراء المشاريع بطريقة تجعل التوثيق جزءاً طبيعياً وسلساً من العملية التطويرية وليس عبئاً إضافياً يثقل كاهل الفرق التقنية.",
      shortDescription: "أداة AI لتحويل النص إلى مخططات هندسية",
      category: "AI Development",
      tags: ["Flutter", "AI", "Machine Learning", "Dart"],
      image: "/project/rassem/1.jpg",

      gallery: [
        "/project/rassem/1.jpg",
        "/project/rassem/2.jpg",
        "/project/rassem/3.jpg",
        "/project/rassem/4.jpg"
      ],
      client: "Tuwaiq Academy",
      duration: "4 Days",
      year: 2024,
      url: "https://www.raseemai.com/",
      github: "https://github.com/abdullah/raseem",
      featured: false,
      challenge: "تسهيل عملية توثيق الأنظمة وجعلها جزءاً من العملية وليس عبئاً إضافياً.",
      solution: "تطوير أداة ذكية تحول الوصف النصي لمخططات هندسية فورية باستخدام الذكاء الاصطناعي.",
      result: "توفير الوقت والجهد للمطورين والمصممين في عملية التوثيق.",
      technologies: ["Flutter", "Dart", "AI/ML", "Natural Language Processing", "Firebase"]
    },
    {
      id: "izahab-app",
      title: "iZahab - Hajj Luggage Tracker",
      description: "تطبيق متكامل ومتطور لتتبع الحقائب وإدارة البلاغات خلال موسم الحج، مصمم خصيصاً لحل مشاكل حقيقية ومتكررة تحدث كل عام. نشأت فكرة التطبيق من ملاحظة دقيقة لمشكلة تتكرر سنوياً مع الحجاج وهي ضياع الحقائب أو تأخر وصولها بعد دخولهم إلى المشاعر المقدسة، مما يسبب إزعاجاً كبيراً للحجاج وضغطاً على فرق التنظيم. يوفر التطبيق نظام تتبع ذكي ومتقدم للحقائب المفقودة وحالات تيه الحجاج، بالإضافة إلى لوحة تحكم شاملة ومتكاملة تتيح لفرق التنظيم متابعة جميع العمليات والمواقع بدقة عالية. يتميز التطبيق بقدرته على تحديد الإحداثيات الجغرافية بدقة متناهية وتوفير تقارير مفصلة عن الحالة على الأرض. بدأ المشروع بفكرة بسيطة لكنه تطور وتوسع ليصبح حلاً شاملاً يخدم جميع الجهات العاملة في الحج، مما يوفر على فرق التنظيم وقتاً وجهداً كبيرين ويمنحهم تحكماً كاملاً وفعالاً في إدارة الوضع الميداني.",
      shortDescription: "تطبيق تتبع الحقائب وإدارة البلاغات للحج",
      category: "Web Development",
      tags: ["Next.js", "GPS", "Real-time Tracking"],
      image: "/project/zahab/1.jpg",
      gallery: [
        "/project/zahab/1.jpg",
        "/project/zahab/2.jpg",
        "/project/zahab/3.jpg",
        "/project/zahab/4.jpg",
        "/project/zahab/5.jpg",
        "/project/zahab/6.jpg",
        "/project/zahab/7.jpg",
        "/project/zahab/8.jpg",


      ],
      client: "Belad Al-Haramain Company",
      duration: "2 months",
      year: 2025,
      featured: true,
      challenge: "حل مشكلة ضياع الحقائب وتيه الحجاج بطريقة تقنية فعالة.",
      solution: "تطبيق شامل يتتبع الحقائب ويدير البلاغات مع لوحة تحكم متكاملة للفرق.",
      result: "تحسين تجربة الحجاج وتوفير الوقت والجهد لفرق التنظيم.",
      technologies: ["GPS", "Next.js", "Real-time Database", "Firebase", "Google Maps"]
    },
    {
      id: "efficiency-tools",
      title: "كفاءة - منصة الأدوات المجانية",
      description: "منصة مجانية بالكامل تضم أكثر من 30 أداة عملية يومية، تم تطويرها باستخدام Vue.js لتقديم حلول فورية دون أي تكلفة. تشمل أدوات لاختصار الروابط، إزالة خلفيات الصور، استخراج النصوص، قياس سرعة الإنترنت، حاسبات متخصصة (كمؤشر كتلة الجسم، العمر، تحويل التاريخ) وأدوات مصممين متقدمة (استخراج الألوان، توليد ألوان متناسقة، معاينة الخطوط). جميع الأدوات متاحة مجاناً بدون اشتراكات أو رسوم خفية، مما يجعلها الحل الأمثل للمطورين والمصممين والمستخدمين العاديين.",
      shortDescription: "منصة مجانية متكاملة لأدوات المهام اليومية",
      category: "أدوات الويب",
      tags: ["مجانية بالكامل", "Vue.js", "أدوات مفتوحة"],
      image: "/project/efficiency-tools/main.png",
      gallery: [
        "/project/efficiency-tools/1.png",
        "/project/efficiency-tools/2.png",
        "/project/efficiency-tools/3.png",
        "/project/efficiency-tools/4.png"
      ],
      client: "مشروع شخصي",
      duration: "3 أشهر",
      year: 2024,
      featured: false,
      challenge: "توفير أدوات احترافية مجانية بديلاً عن الحلول المدفوعة",
      solution: "منصة موحدة مجانية تغني عن استخدام مواقع متعددة مدفوعة",
      result: "توفير آلاف الدولارات على المستخدمين مع تجربة موحدة وسهلة",
      technologies: ["Vue.js", "HTML5 Canvas", "Tesseract.js", "Web Workers"]
    },
    {
      id: "labib-app",
      title: "لبيب - وكيل التعلم الذكي",
      description: "منصة تعليمية ذكية تعيد تعريف التعلم اليومي للطلاب من خلال أسئلة تفاعلية مولّدة بالذكاء الاصطناعي تُرسل عبر تيليجرام. نشأت الفكرة من فجوة تعليمية حقيقية — الطلاب يحتاجون تعزيزاً يومياً مستمراً، لكن المعلمين يفتقرون للأدوات والوقت لتوفيره بشكل فردي. يحل لبيب هذه المشكلة بتوليد ثلاثة أسئلة صح/خطأ يومياً من محتوى الدروس باستخدام نماذج ذكاء اصطناعي متقدمة، ويرسلها بالتتابع عبر بوت تيليجرام مع تغذية راجعة فورية بناءة وشروحات مفصلة. على جانب المعلم، توفر لوحة تحكم شاملة مبنية بـ Next.js تحليلات لحظية: معدلات المشاركة اليومية، تتبع أداء كل طالب بشكل فردي، تقارير أسبوعية وشهرية للاتجاهات، وكشف مبكر عن الطلاب المتعثرين. البنية الخلفية تستخدم FastAPI مع Celery لمعالجة المهام المجدولة، Redis للتخزين المؤقت وقوائم المهام، وPostgreSQL لتخزين البيانات. النظام بالكامل محتوى بـ Docker للنشر والتوسع الموثوق. لبيب يحول التعلم السلبي إلى عادة يومية نشطة مع منح المعلمين رؤية غير مسبوقة لتقدم طلابهم.",
      shortDescription: "وكيل تعليمي ذكي يرسل اختبارات يومية عبر تيليجرام مع لوحة تحليلات للمعلمين",
      category: "تطوير الذكاء الاصطناعي",
      tags: ["AI", "Telegram Bot", "FastAPI", "Next.js", "Education"],
      image: "/project/labeeb/1761125577029.jpg",
      gallery: [
        "/project/labeeb/1761125577029.jpg",
        "/project/labeeb/1761125577105.jpg",
        "/project/labeeb/1761125577263.jpg",
        "/project/labeeb/1761125577348.jpg",
        "/project/labeeb/1761125577361.jpg",
        "/project/labeeb/1761125578155.jpg"
      ],
      client: "مشروع شخصي",
      duration: "شهرين",
      year: 2025,
      url: "https://www.labeeb.pro/",
      featured: true,
      challenge: "الطلاب يفتقرون للتعزيز اليومي المستمر خارج الفصول الدراسية، والمعلمون ليس لديهم طريقة فعالة لمتابعة التقدم الفردي على نطاق واسع.",
      solution: "بوت تيليجرام مدعوم بالذكاء الاصطناعي يرسل أسئلة يومية مخصصة مولّدة من محتوى الدروس، مقترن بلوحة تحكم لحظية للمعلمين لتحليلات الأداء والتدخل المبكر.",
      result: "منصة جاهزة للإنتاج تدعم أكثر من 100 طالب بتغذية راجعة فورية وتذكيرات تلقائية وتقارير أداء شاملة حوّلت التعلم السلبي إلى عادة يومية نشطة.",
      technologies: ["FastAPI", "Next.js", "PostgreSQL", "Celery", "Redis", "Telegram Bot API", "OpenRouter AI", "Docker"]
    },
    {
      id: "aloura-agency",
      title: "ألورا - موقع الوكالة الإبداعية",
      description: "موقع فاخر وغامر لـ ALOURA Creative House — وكالة إبداعية راقية مقرها مكة المكرمة، متخصصة في الإخراج الإبداعي وصناعة المحتوى وإدارة السوشال ميديا لبراندات الأزياء والجمال وأسلوب الحياة. المشروع تطلّب تجربة رقمية تضاهي المكانة الفاخرة للوكالة: كل تفاعل مدروس ويعكس الفخامة. يتميز الموقع بقسم Hero بملء الشاشة مع خلفيات فيديو سينمائية، تمرير سلس بتقنية Lenis، وأنيميشن متطور يشمل تصوّرات ثلاثية الأبعاد مبنية بـ Three.js، وتأثيرات بطاقات متراكبة، وشريط شهادات عملاء عمودي متحرك. البنية ثنائية اللغة تدعم التبديل السلس بين الإنجليزية والعربية مع تكيّف كامل لتخطيط RTL باستخدام next-intl. نموذج تواصل وظيفي مدعوم بـ Resend يعالج استفسارات العملاء مباشرة. قسم الأعمال يعرض مشاريع الوكالة عبر معارض فيديو وصور عالية الجودة. السيو يُدار عبر بيانات وصفية ديناميكية وترميز JSON-LD منظم وتكامل Google Analytics. التجربة بالكامل محسّنة للأداء مع التحميل الكسول وتحسين الصور وتقسيم الكود مع الحفاظ على الثراء البصري المتوقع من موقع براند فاخر.",
      shortDescription: "موقع فاخر ثنائي اللغة لوكالة إبداعية متخصصة في براندات الأزياء والجمال",
      category: "تطوير الويب",
      tags: ["Next.js", "Three.js", "Framer Motion", "Bilingual", "Luxury Design"],
      image: "/project/lura/1.jpg",
      gallery: [
        "/project/lura/1.jpg",
        "/project/lura/2.jpg",
        "/project/lura/3.jpg",
        "/project/lura/4.png",
        "/project/lura/5.jpg"
      ],
      client: "ALOURA Creative House",
      duration: "شهر",
      year: 2025,
      url: "https://www.aloura.agency/",
      featured: true,
      challenge: "بناء تجربة رقمية تعكس بصدق المكانة الفاخرة لوكالة إبداعية راقية مع الحفاظ على أداء سريع ودعم ثنائي اللغة سلس.",
      solution: "موقع غامر بـ Next.js مع خلفيات فيديو سينمائية، تصورات ثلاثية الأبعاد، أنيميشن تمرير سلس، ودعم كامل للعربية والإنجليزية مع تكيف RTL.",
      result: "منصة بصرية مذهلة رفعت الحضور الرقمي للوكالة وجذبت عملاء أزياء وجمال من الدرجة الأولى بتجربة تصفح تضاهي جودة عملهم الإبداعي.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Lenis", "next-intl", "Resend"]
    },
    {
      id: "traweh-directory",
      title: "تراويح - دليل أئمة التراويح",
      description: "منصة ويب عربية شاملة تُعين المصلين على إيجاد أفضل مساجد التراويح والأئمة في مكة المكرمة والمدينة المنورة وجدة والرياض خلال شهر رمضان. وُلد المشروع من حاجة مجتمعية حقيقية — كل رمضان، يبحث الملايين عن مساجد بقراء مميزين، ولم تكن هناك منصة مخصصة لإرشادهم. تراويح يسد هذه الفجوة بقاعدة بيانات غنية تغطي أكثر من 259 حياً، وجداول كاملة للحرمين الشريفين لجميع ليالي رمضان الثلاثين مع توزيع الأئمة لكل تسليمة تراويح وتهجد، وعينات صوتية تتيح للمستخدم الاستماع لأسلوب تلاوة كل إمام قبل اختيار مسجده. تتميز المنصة بخريطة تفاعلية مدعومة بـ Leaflet مع كشف أقرب المساجد عبر GPS، ونظام ذكي لكشف التكرار باستخدام معادلة Haversine ضمن نطاق 50 متراً، وخط إمداد بيانات مجتمعي يتيح للمساهمين إضافة المساجد بدون تسجيل. من أصعب جوانب المشروع كان خط معالجة الصوتيات — مبني بالكامل في المتصفح باستخدام FFmpeg.wasm، يقص التسجيلات تلقائياً إلى 45 ثانية، ويضغطها إلى 128 كيلوبت مونو MP3، ويستخرج الصوت من ملفات الفيديو. خدمة Python منفصلة على Render تعالج استخراج الصوت من يوتيوب بطوابير مهام غير متزامنة. نظام التحقق من الموقع يحلل 5 أنماط مختلفة من روابط Google Maps لاستخراج الإحداثيات ومقارنتها بالمساجد الموجودة لمنع التكرار. المنصة تخدم كرفيق رمضاني أساسي، تحوّل تجربة اختيار المسجد من التناقل الشفهي إلى اكتشاف مبني على البيانات ومُعزز بالصوت.",
      shortDescription: "منصة عربية تُعين المصلين على إيجاد مساجد التراويح والأئمة مع عينات صوتية وخرائط تفاعلية",
      category: "تطوير الويب",
      tags: ["Next.js", "PWA", "Leaflet Maps", "FFmpeg", "Supabase", "Arabic-First"],
      image: "/images/projects/traweh/traweh-hero.png",
      gallery: [
        "/images/projects/traweh/traweh-hero.png",
        "/images/projects/traweh/traweh-mobile.png",
        "/images/projects/traweh/traweh-map.png",
        "/images/projects/traweh/traweh-haram.png"
      ],
      client: "مشروع مجتمعي",
      duration: "3 أشهر",
      year: 2025,
      url: "https://traweh.org",
      featured: true,
      challenge: "كل رمضان، يعاني ملايين المصلين في إيجاد مساجد بقرائهم المفضلين — لم يكن هناك دليل مركزي مُعزز بالصوت لصلاة التراويح في المدن السعودية.",
      solution: "منصة PWA بخرائط تفاعلية، معالجة صوت في المتصفح عبر FFmpeg.wasm، جمع بيانات مجتمعي، جداول الحرمين لـ30 ليلة، وكشف ذكي لتكرار المساجد باستخدام الموقع الجغرافي.",
      result: "رفيق رمضاني جاهز للإنتاج يخدم المصلين في 4 مدن وأكثر من 259 حياً، مع جداول كاملة للحرمين الشريفين، معاينات صوتية لتلاوات الأئمة، ومنظومة بيانات يغذيها المساهمون تنمو عضوياً كل رمضان.",
      technologies: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Leaflet", "FFmpeg.wasm", "TailwindCSS", "PWA", "Vercel"]
    }
  ]
};

export const projectCategoriesTranslations: Record<Language, string[]> = {
  en: ['All', 'Web Development', 'Mobile Development', 'AI Development', 'Web Tools'],
  ar: ['الكل', 'تطوير الويب', 'تطوير التطبيقات', 'تطوير الذكاء الاصطناعي', 'أدوات الويب']
};

export function getProjectsByCategoryTranslated(category: string, language: Language): ProjectTranslation[] {
  const projects = projectsTranslations[language];

  if (category === 'All' || category === 'الكل') {
    return projects;
  }

  return projects.filter(project => project.category === category);
}

export const featuredProjectsTranslations: Record<Language, ProjectTranslation[]> = {
  en: projectsTranslations.en.filter(project => project.featured),
  ar: projectsTranslations.ar.filter(project => project.featured)
};
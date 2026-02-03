'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ParallaxServiceData {
  id: string;
  image: string;
  en: {
    title: string;
    tagline: string;
    description: string;
    features: string[];
  };
  ar: {
    title: string;
    tagline: string;
    description: string;
    features: string[];
  };
}

const PARALLAX_SERVICES: ParallaxServiceData[] = [
  {
    id: 'web-mobile',
    image: '/services/web.png',
    en: {
      title: 'Web & Mobile App Development',
      tagline: 'Modern, scalable applications built with cutting-edge technology',
      description:
        'I build modern, responsive web and mobile applications using Next.js, React, Flutter, and TypeScript. From concept to deployment, every project is engineered for performance, scalability, and exceptional user experience.',
      features: [
        'Full-stack Next.js & React development',
        'Cross-platform Flutter mobile apps',
        'Type-safe coding with TypeScript',
        'Responsive design across all devices',
        'API integration & database architecture',
        'Performance optimization & SEO readiness',
      ],
    },
    ar: {
      title: 'تطوير تطبيقات الويب والجوال',
      tagline: 'تطبيقات حديثة وقابلة للتوسع مبنية بأحدث التقنيات',
      description:
        'أبني تطبيقات ويب وجوال حديثة ومتجاوبة باستخدام Next.js و React و Flutter و TypeScript. من الفكرة إلى الإطلاق، كل مشروع مهندَس للأداء والتوسع وتجربة استخدام استثنائية.',
      features: [
        'تطوير Full-stack باستخدام Next.js و React',
        'تطبيقات جوال متعددة المنصات بـ Flutter',
        'كتابة كود آمن الأنواع بـ TypeScript',
        'تصميم متجاوب لجميع الأجهزة',
        'تكامل مع APIs وبنية قواعد البيانات',
        'تحسين الأداء وتجهيز للسيو',
      ],
    },
  },
  {
    id: 'ai-agents',
    image: '/services/ai.png',
    en: {
      title: 'AI Agent Systems Engineering',
      tagline: 'Designing intelligent agent architectures and AI environments',
      description:
        'I engineer AI agent systems and intelligent environments — from multi-agent orchestration to autonomous workflows. Leveraging LLMs, prompt engineering, and context design to build systems that think, decide, and act.',
      features: [
        'Multi-agent system architecture',
        'Autonomous workflow design',
        'LLM orchestration & chaining',
        'Prompt engineering & context design',
        'Tool-use and function calling agents',
        'AI environment & infrastructure setup',
      ],
    },
    ar: {
      title: 'هندسة أنظمة الوكلاء وبيئات الذكاء الاصطناعي',
      tagline: 'تصميم بنى وكلاء ذكية وبيئات ذكاء اصطناعي متقدمة',
      description:
        'أهندس أنظمة وكلاء ذكية وبيئات ذكاء اصطناعي — من تنسيق الوكلاء المتعددين إلى سير العمل المستقل. أوظف النماذج اللغوية الكبيرة وهندسة البرومبت وتصميم السياق لبناء أنظمة تفكر وتقرر وتنفذ.',
      features: [
        'هندسة أنظمة وكلاء متعددة',
        'تصميم سير عمل مستقل',
        'تنسيق وربط النماذج اللغوية الكبيرة',
        'هندسة البرومبت وتصميم السياق',
        'وكلاء استدعاء الأدوات والدوال',
        'إعداد بيئات وبنى تحتية للذكاء الاصطناعي',
      ],
    },
  },
  {
    id: 'ai-solutions',
    image: '/services/app.png',
    en: {
      title: 'AI Solutions & LLM Applications',
      tagline: 'Custom AI-powered products that transform how you work',
      description:
        'I develop tailored AI solutions and LLM-powered applications — from intelligent chatbots and smart analytics to embedded AI features in existing products. Every solution is designed to serve a real purpose and deliver measurable impact.',
      features: [
        'Custom LLM integration (GPT, Claude, etc.)',
        'Intelligent chatbots & conversational AI',
        'Smart analytics & decision support',
        'AI-powered product features',
        'Data pipeline & model deployment',
        'Embedding AI into existing systems',
      ],
    },
    ar: {
      title: 'تطوير حلول الذكاء الاصطناعي وتطبيقات النماذج اللغوية الكبيرة',
      tagline: 'حلول ذكاء اصطناعي مخصصة تغير طريقة عملك',
      description:
        'أطور حلول ذكاء اصطناعي مخصصة وتطبيقات مبنية على النماذج اللغوية الكبيرة — من البوتات الذكية والتحليلات المتقدمة إلى دمج مزايا AI في المنتجات الحالية. كل حل مصمم لخدمة هدف حقيقي وتحقيق أثر ملموس.',
      features: [
        'تكامل مع نماذج لغوية كبيرة (GPT, Claude, إلخ)',
        'بوتات ذكية ومحادثات تفاعلية بالذكاء الاصطناعي',
        'تحليلات ذكية وأدوات دعم القرار',
        'مزايا ذكية مدمجة في المنتجات',
        'بناء خطوط بيانات ونشر نماذج',
        'دمج الذكاء الاصطناعي في الأنظمة الحالية',
      ],
    },
  },
];

function StickyImage({ imgUrl, alt }: { imgUrl: string; alt: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        height: '70vh',
        scale,
      }}
      ref={targetRef}
      className="sticky top-0 z-0 overflow-hidden"
    >
      <Image
        src={imgUrl}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity }}
      />
    </motion.div>
  );
}

function OverlayCopy({
  title,
  tagline,
}: {
  title: string;
  tagline: string;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-[70vh] w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-lg md:mb-4 md:text-2xl px-6 max-w-3xl opacity-80">
        {tagline}
      </p>
      <p className="text-center text-3xl font-bold sm:text-4xl md:text-6xl lg:text-7xl px-6 max-w-5xl leading-tight">
        {title}
      </p>
    </motion.div>
  );
}

function TextParallaxContent({
  imgUrl,
  imgAlt,
  title,
  tagline,
  children,
}: {
  imgUrl: string;
  imgAlt: string;
  title: string;
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative h-[85vh]">
        <StickyImage imgUrl={imgUrl} alt={imgAlt} />
        <OverlayCopy title={title} tagline={tagline} />
      </div>
      {children}
    </div>
  );
}

function ServiceContent({
  description,
  features,
  isRTL,
}: {
  description: string;
  features: string[];
  isRTL: boolean;
}) {
  return (
    <div
      className="py-10 sm:py-14 lg:py-16"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <p
          className={`text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ color: 'var(--muted-foreground)' }}
        >
          {description}
        </p>

        <div
          className="border-t mb-8"
          style={{ borderColor: 'var(--border)' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
            >
              <CheckCircle
                size={20}
                className="flex-shrink-0"
                style={{ color: 'var(--primary)' }}
              />
              <span
                className="text-base sm:text-lg"
                style={{ color: 'var(--foreground)' }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesParallaxContent() {
  const { t, isRTL, language } = useLanguage();

  return (
    <section dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="section-unified">
        <div className="container-unified">
          <div className={`max-w-2xl mb-8 sm:mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2
              className="title-section mb-3"
              style={{ color: 'var(--foreground)' }}
            >
              {t('home.servicesTitle') || 'Services I Provide'}
            </h2>
            <p
              className="text-subtitle"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {t('home.servicesDesc') ||
                'Pushing the limits of innovation with services that redefine possibilities.'}
            </p>
          </div>
        </div>
      </div>

      {PARALLAX_SERVICES.map((service) => {
        const data = service[language];
        return (
          <TextParallaxContent
            key={service.id}
            imgUrl={service.image}
            imgAlt={data.title}
            title={data.title}
            tagline={data.tagline}
          >
            <ServiceContent
              description={data.description}
              features={data.features}
              isRTL={isRTL}
            />
          </TextParallaxContent>
        );
      })}
    </section>
  );
}

export function ServicesParallax() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="section-unified">
        <div className="container-unified">
          <h2
            className="title-section mb-3"
            style={{ color: 'var(--foreground)' }}
          >
            {t('home.servicesTitle') || 'Services I Provide'}
          </h2>
          <p
            className="text-subtitle mb-12"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('home.servicesDesc') ||
              'Pushing the limits of innovation with services that redefine possibilities.'}
          </p>
          <div className="space-y-8">
            {PARALLAX_SERVICES.map((service) => (
              <div
                key={service.id}
                className="h-[300px] rounded-3xl animate-pulse"
                style={{ backgroundColor: 'var(--card)' }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <ServicesParallaxContent />;
}

export default ServicesParallax;

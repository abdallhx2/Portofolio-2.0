'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const processSteps = [
  {
    id: 1,
    titleKey: 'home.process.discovery',
    titleFallback: 'Discovery & Strategy',
    descKey: 'home.process.discoveryDesc',
    descFallback: 'Understanding your business, target audience, and project goals. I gather insights through research and align on a clear strategy for success.',
    duration: '1-2 weeks',
    image: '/Methodology/Discovery.png',
    color: '#1e293b',
    icon: '🔍'
  },
  {
    id: 2,
    titleKey: 'home.process.design',
    titleFallback: 'Ideation & Wireframing',
    descKey: 'home.process.designDesc',
    descFallback: 'Creating wireframes and prototypes to map out structure and flow, ensuring the user journey is smooth and intuitive.',
    duration: '2-3 weeks',
    image: '/Methodology/Thinking.png',
    color: '#312e81',
    icon: '✏️'
  },
  {
    id: 3,
    titleKey: 'home.process.development',
    titleFallback: 'Design & Development',
    descKey: 'home.process.developmentDesc',
    descFallback: 'Bringing the product to life through high-fidelity design and development, ensuring every interaction is pixel-perfect and functional.',
    duration: '4-8 weeks',
    image: '/Methodology/Development.png',
    color: '#581c87',
    icon: '💻'
  },
  {
    id: 4,
    titleKey: 'home.process.testing',
    titleFallback: 'Testing & Launch',
    descKey: 'home.process.testingDesc',
    descFallback: 'Using testing insights to refine the design, ensuring the final product is aesthetically pleasing, effective, and user-centered.',
    duration: '1-2 weeks',
    image: '/Methodology/Testing.png',
    color: '#134e4a',
    icon: '🚀'
  }
];

function ProcessCard({
  step,
  index,
  progress
}: {
  step: typeof processSteps[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const { t } = useLanguage();
  const totalCards = processSteps.length;
  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];

  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  const scale = useTransform(progress, [cardStart, cardEnd], [1, 0.92]);
  const opacity = useTransform(
    progress,
    [cardStart, cardEnd - 0.1, cardEnd],
    [1, 1, index === totalCards - 1 ? 1 : 0.6]
  );
  const y = useTransform(progress, [cardStart, cardEnd], [0, -40]);

  return (
    <motion.div
      style={{ scale, opacity, y, top: `${60 + index * 40}px` }}
      className={`stacking-card sticky ${rotations[index % rotations.length]}`}
    >
      <div className="stack-card-process w-full rounded-3xl overflow-hidden shadow-2xl relative">
        {/* صورة الخلفية */}
        <div className="absolute inset-0">
          <Image
            fill
            src={step.image}
            alt={step.titleFallback}
            className="object-cover"
            priority={index === 0}
          />
          {/* تدرج خفيف من الأسفل */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${step.color}ee 0%, ${step.color}88 40%, transparent 70%)`
            }}
          />
        </div>

        {/* رقم الخطوة - أعلى اليسار */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <span
            className="text-step-number"
            style={{
              color: 'rgba(255,255,255,0.12)',
              textShadow: '0 0 60px rgba(255,255,255,0.08)'
            }}
          >
            0{index + 1}
          </span>
        </div>

        {/* مدة الخطوة - أعلى اليمين */}
        <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
          <span
            className="text-base sm:text-lg font-semibold px-6 py-3 rounded-full backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.25)'
            }}
          >
            ⏱️ {step.duration}
          </span>
        </div>

        {/* بطاقة المحتوى - أسفل البطاقة */}
        <div className="absolute bottom-0 left-0 right-0 card-padding">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl rounded-3xl card-padding"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.25)'
            }}
          >
            {/* الأيقونة والعنوان */}
            <div className="flex items-center gap-4 sm:gap-6 mb-6">
              <span className="text-5xl sm:text-6xl lg:text-7xl">{step.icon}</span>
              <h3 className="title-card text-white">
                {t(step.titleKey) || step.titleFallback}
              </h3>
            </div>

            {/* خط فاصل */}
            <div
              className="w-24 h-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            />

            {/* الوصف */}
            <p className="text-body text-white/85 leading-relaxed max-w-4xl">
              {t(step.descKey) || step.descFallback}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function StackingCardsContent() {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section className="stacking-cards-section relative">
      <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} max-w-[2000px] mx-auto`}>
        {/* Stacking Cards */}
        <div
          ref={containerRef}
          className="stacking-cards-container relative px-6 sm:px-8 lg:px-12 flex-1"
          style={{ height: `${processSteps.length * 100}vh` }}
        >
          <div className="max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <ProcessCard
                key={step.id}
                step={step}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Sticky Title Column - Desktop Only */}
        <div className={`sticky top-0 h-screen hidden xl:grid place-content-center w-80 ${isRTL ? 'pr-12' : 'pl-12'}`}>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h2
              className="title-section leading-tight mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              {isRTL ? (
                <>
                  كيف
                  <br />
                  أعمل؟
                </>
              ) : (
                <>
                  How I
                  <br />
                  Work
                </>
              )}
            </h2>
            <p className="text-subtitle max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
              {t('home.process.subtitle') || 'My development process from idea to launch'}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="xl:hidden text-center section-unified max-w-4xl mx-auto absolute top-0 left-0 right-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title-section mb-4"
          style={{ color: 'var(--foreground)' }}
        >
          {t('home.process.title') || 'How I Work'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-subtitle max-w-2xl mx-auto"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {t('home.process.subtitle') || 'My development process from idea to launch'}
        </motion.p>
      </div>

      <div className="h-[30vh]" />
    </section>
  );
}

export function ProcessStackingCards() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="py-20 lg:py-28">
        <div className="text-center mb-16 lg:mb-20 px-6">
          <h2 className="title-section mb-6" style={{ color: 'var(--foreground)' }}>
            {t('home.process.title') || 'How I Work'}
          </h2>
          <p className="text-subtitle max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            {t('home.process.subtitle') || 'My development process from idea to launch'}
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {processSteps.map((step) => (
            <div
              key={step.id}
              className="h-[500px] rounded-3xl animate-pulse"
              style={{ backgroundColor: `${step.color}30` }}
            />
          ))}
        </div>
      </section>
    );
  }

  return <StackingCardsContent />;
}

export default ProcessStackingCards;

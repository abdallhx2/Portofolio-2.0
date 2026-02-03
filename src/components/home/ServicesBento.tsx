'use client';

import { useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { sectionViewport, sectionHeader } from '@/lib/motion';
// Heavy components loaded lazily — saves ~500KB from initial bundle
const Globe = dynamic(() => import('@/components/ui/globe').then(m => m.Globe), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-16 h-16 rounded-full border-2 animate-pulse" style={{ borderColor: 'var(--border)' }} /></div>,
});
const OrbitRotation = dynamic(() => import('@/components/ui/orbit-rotation').then(m => m.OrbitRotation), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-16 h-16 rounded-full border-2 animate-pulse" style={{ borderColor: 'var(--border)' }} /></div>,
});
const ThreeDMarquee = dynamic(() => import('@/components/ui/three-d-marquee').then(m => m.ThreeDMarquee), {
  ssr: false,
  loading: () => <div className="w-full h-full" style={{ backgroundColor: 'var(--background)' }} />,
});
import { Smartphone } from 'lucide-react';
import {
  SiFlutter,
  SiReact,
  SiPython,
  SiFirebase,
  SiDart,
  SiAndroid,
  SiApple,
  SiKotlin,
  SiSwift,
  SiWhatsapp,
  SiTelegram,
  SiPostgresql,
  SiGithub,
  SiSlack,
  SiNotion,
  SiGoogle,
  SiXcode,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

/* ─── بيانات الخدمات ─── */
interface BentoServiceData {
  id: string;
  en: { title: string; description: string };
  ar: { title: string; description: string };
}

const BENTO_SERVICES: BentoServiceData[] = [
  {
    id: 'ai-systems',
    en: {
      title: 'AI & Agent Systems Engineering',
      description:
        'Designing intelligent agent architectures, LLM orchestration, and autonomous workflows that think, decide, and act.',
    },
    ar: {
      title: 'هندسة أنظمة الذكاء الاصطناعي والوكلاء',
      description:
        'تصميم بنى وكلاء ذكية، تنسيق النماذج اللغوية الكبيرة، وسير عمل مستقل يفكر ويقرر وينفذ.',
    },
  },
  {
    id: 'web-dev',
    en: {
      title: 'Web Development',
      description:
        'Full-stack Next.js & React applications with TypeScript, responsive design, and performance-first architecture.',
    },
    ar: {
      title: 'تطوير الويب',
      description:
        'تطبيقات Full-stack بـ Next.js و React مع TypeScript، تصميم متجاوب وأداء عالي.',
    },
  },
  {
    id: 'ui-ux',
    en: {
      title: 'UI/UX Design',
      description:
        'User-centered design with modern aesthetics, prototyping, and seamless user experience.',
    },
    ar: {
      title: 'تصميم واجهات وتجربة المستخدم',
      description:
        'تصميم محوره المستخدم مع جماليات حديثة ونمذجة أولية وتجربة استخدام سلسة.',
    },
  },
  {
    id: 'mobile-dev',
    en: {
      title: 'Mobile App Development',
      description:
        'Cross-platform Flutter apps with native performance, beautiful UI, and seamless API integration.',
    },
    ar: {
      title: 'تطوير تطبيقات الجوال',
      description:
        'تطبيقات Flutter متعددة المنصات بأداء محلي وواجهات جميلة وتكامل سلس مع APIs.',
    },
  },
];

/* ─── صور 3D Marquee ─── */
const MARQUEE_IMAGES = [
  '/project/fruit/1.png',
  '/project/zahab/1.jpg',
  '/project/rassem/1.jpg',
  '/project/cv/1.png',
  '/project/efficiency-tools/1.png',
  '/project/zahab/5.jpg',
  '/project/fruit/2.png',
  '/project/zahab/2.jpg',
  '/project/rassem/2.jpg',
  '/project/cv/2.png',
  '/project/efficiency-tools/2.png',
  '/project/zahab/6.jpg',
  '/project/fruit/3.png',
  '/project/zahab/3.jpg',
  '/project/rassem/3.jpg',
  '/project/cv/3.png',
  '/project/efficiency-tools/3.png',
  '/project/zahab/7.jpg',
  '/project/fruit/4.png',
  '/project/zahab/4.jpg',
  '/project/rassem/4.jpg',
  '/project/cv/4.png',
  '/project/efficiency-tools/4.png',
  '/project/zahab/8.jpg',
  '/project/cv/5.png',
  '/project/efficiency-tools/main.png',
  '/project/fruit/1.png',
  '/project/rassem/1.jpg',
];

/* ─── أيقونات OrbitRotation لتطوير الجوال ─── */
const MOBILE_ICONS = [
  { Icon: SiFlutter, name: 'Flutter' },
  { Icon: SiReact, name: 'React Native' },
  { Icon: SiDart, name: 'Dart' },
  { Icon: SiFirebase, name: 'Firebase' },
  { Icon: SiPython, name: 'Python' },
  { Icon: SiAndroid, name: 'Android' },
  { Icon: SiApple, name: 'Apple' },
  { Icon: SiKotlin, name: 'Kotlin' },
  { Icon: SiSwift, name: 'Swift' },
  { Icon: SiGoogle, name: 'Google Play' },
  { Icon: SiXcode, name: 'Xcode' },
];

/* ─── عقدة دائرية للـ Beam ─── */
const BeamNode = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      'z-10 flex items-center justify-center rounded-full border-2 p-[clamp(0.5rem,0.35rem+0.3vw,0.625rem)] shadow-sm',
      className
    )}
    style={{
      backgroundColor: 'var(--card)',
      borderColor: 'var(--border)',
      color: 'var(--muted-foreground)',
    }}
  >
    {children}
  </div>
));
BeamNode.displayName = 'BeamNode';

/* ─── مكون AI Beam Demo ─── */
function AIBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef1 = useRef<HTMLDivElement>(null);
  const inputRef2 = useRef<HTMLDivElement>(null);
  const inputRef3 = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const outputRef1 = useRef<HTMLDivElement>(null);
  const outputRef2 = useRef<HTMLDivElement>(null);
  const outputRef3 = useRef<HTMLDivElement>(null);

  const iconSize = 'w-[clamp(1.85rem,1.5rem+0.8vw,2.25rem)] h-[clamp(1.85rem,1.5rem+0.8vw,2.25rem)]';

  return (
    <div className="flex h-full w-full items-center justify-center" style={{ padding: 'clamp(1.5rem, 1rem + 1.5vw, 2.5rem)' }}>
      {/* containerRef wraps only the node area so beams match exactly */}
      <div
        ref={containerRef}
        className="relative grid w-full max-w-2xl grid-cols-[auto_1fr_auto] items-center"
        style={{ columnGap: 'clamp(1.5rem, 0.5rem + 3vw, 4rem)' }}
      >
        {/* Left: Inputs */}
        <div className="flex flex-col items-center justify-center" style={{ gap: 'clamp(1.25rem, 0.75rem + 1.5vw, 2rem)' }}>
          <BeamNode ref={inputRef1} className="p-[clamp(0.625rem,0.5rem+0.3vw,0.75rem)]">
            <SiWhatsapp className={iconSize} />
          </BeamNode>
          <BeamNode ref={inputRef2} className="p-[clamp(0.625rem,0.5rem+0.3vw,0.75rem)]">
            <SiTelegram className={iconSize} />
          </BeamNode>
          <BeamNode ref={inputRef3} className="p-[clamp(0.625rem,0.5rem+0.3vw,0.75rem)]">
            <SiPostgresql className={iconSize} />
          </BeamNode>
        </div>

        {/* Center: Claude AI */}
        <div className="flex items-center justify-center">
          <BeamNode ref={centerRef} className="p-[clamp(0.75rem,0.6rem+0.4vw,1rem)]">
            <svg viewBox="0 0 1200 1200" fill="currentColor" className="w-[clamp(2.4rem,1.85rem+1vw,2.75rem)] h-[clamp(2.4rem,1.85rem+1vw,2.75rem)]" style={{ color: 'var(--foreground)' }}>
              <path d="M 233.96 800.21 L 468.64 668.54 L 472.59 657.1 L 468.64 650.74 L 457.21 650.74 L 417.99 648.32 L 283.89 644.7 L 167.6 639.87 L 54.93 633.83 L 26.58 627.79 L 0 592.75 L 2.74 575.28 L 26.58 559.25 L 60.72 562.23 L 136.19 567.38 L 249.42 575.19 L 331.57 580.03 L 453.26 592.67 L 472.59 592.67 L 475.33 584.86 L 468.72 580.03 L 463.57 575.19 L 346.39 495.79 L 219.54 411.87 L 153.1 363.54 L 117.18 339.06 L 99.06 316.11 L 91.25 266.01 L 123.87 230.09 L 167.68 233.07 L 178.87 236.05 L 223.25 270.2 L 318.04 343.57 L 441.83 434.74 L 459.95 449.8 L 467.19 444.64 L 468.08 441.02 L 459.95 427.41 L 392.62 305.72 L 320.78 181.93 L 288.81 130.63 L 280.35 99.87 C 277.37 87.22 275.19 76.59 275.19 63.62 L 312.32 13.21 L 332.86 6.6 L 382.39 13.21 L 403.25 31.33 L 434.01 101.72 L 483.87 212.54 L 561.18 363.22 L 583.81 407.92 L 595.89 449.32 L 600.4 461.96 L 608.21 461.96 L 608.21 454.71 L 614.58 369.83 L 626.34 265.61 L 637.77 131.52 L 641.72 93.75 L 660.4 48.48 L 697.53 24 L 726.52 37.85 L 750.36 72 L 747.06 94.07 L 732.89 186.2 L 705.1 330.52 L 686.98 427.17 L 697.53 427.17 L 709.61 415.09 L 758.5 350.17 L 840.64 247.49 L 876.89 206.74 L 919.17 161.72 L 946.31 140.3 L 997.61 140.3 L 1035.38 196.43 L 1018.47 254.42 L 965.64 321.42 L 921.83 378.2 L 859.01 462.77 L 819.79 530.42 L 823.41 535.81 L 832.75 534.93 L 974.66 504.72 L 1051.33 490.87 L 1142.82 475.17 L 1184.21 494.5 L 1188.72 514.15 L 1172.46 554.34 L 1074.6 578.5 L 959.84 601.45 L 788.94 641.88 L 786.85 643.41 L 789.26 646.39 L 866.26 653.64 L 899.19 655.41 L 979.81 655.41 L 1129.93 666.6 L 1169.15 692.54 L 1192.67 724.27 L 1188.72 748.43 L 1128.32 779.19 L 1046.82 759.87 L 856.59 714.6 L 791.36 698.34 L 782.34 698.34 L 782.34 703.73 L 836.7 756.89 L 936.32 846.85 L 1061.07 962.82 L 1067.44 991.49 L 1051.41 1014.12 L 1034.5 1011.7 L 924.89 929.23 L 882.6 892.11 L 786.85 811.49 L 780.48 811.49 L 780.48 819.95 L 802.55 852.24 L 919.09 1027.41 L 925.13 1081.13 L 916.67 1098.6 L 886.47 1109.15 L 853.29 1103.11 L 785.07 1007.36 L 714.68 899.52 L 657.91 802.87 L 650.98 806.82 L 617.48 1167.7 L 601.77 1186.15 L 565.53 1200 L 535.33 1177.05 L 519.3 1139.92 L 535.33 1066.55 L 554.66 970.79 L 570.36 894.68 L 584.54 800.13 L 592.99 768.72 L 592.43 766.63 L 585.5 767.52 L 514.23 865.37 L 405.83 1011.87 L 320.05 1103.68 L 299.52 1111.81 L 263.92 1093.37 L 267.22 1060.43 L 287.11 1031.11 L 405.83 880.11 L 477.42 786.52 L 523.65 732.48 L 523.33 724.67 L 520.59 724.67 L 205.29 929.4 L 149.15 936.64 L 124.99 914.01 L 127.97 876.89 L 139.41 864.81 L 234.2 799.57 Z" />
            </svg>
          </BeamNode>
        </div>

        {/* Right: Outputs */}
        <div className="flex flex-col items-center justify-center" style={{ gap: 'clamp(1.25rem, 0.75rem + 1.5vw, 2rem)' }}>
          <BeamNode ref={outputRef1} className="p-[clamp(0.625rem,0.5rem+0.3vw,0.75rem)]">
            <SiNotion className={iconSize} />
          </BeamNode>
          <BeamNode ref={outputRef2} className="p-[clamp(0.625rem,0.5rem+0.3vw,0.75rem)]">
            <SiSlack className={iconSize} />
          </BeamNode>
          <BeamNode ref={outputRef3} className="p-[clamp(0.625rem,0.5rem+0.3vw,0.75rem)]">
            <SiGithub className={iconSize} />
          </BeamNode>
        </div>

        {/* Beams: Inputs → Center */}
        <AnimatedBeam containerRef={containerRef} fromRef={inputRef1} toRef={centerRef} curvature={40} pathWidth={3} pathColor="var(--foreground)" gradientStartColor="var(--foreground)" gradientStopColor="var(--foreground)" />
        <AnimatedBeam containerRef={containerRef} fromRef={inputRef2} toRef={centerRef} curvature={-20} pathWidth={3} pathColor="var(--foreground)" gradientStartColor="var(--foreground)" gradientStopColor="var(--foreground)" />
        <AnimatedBeam containerRef={containerRef} fromRef={inputRef3} toRef={centerRef} curvature={-40} pathWidth={3} pathColor="var(--foreground)" gradientStartColor="var(--foreground)" gradientStopColor="var(--foreground)" />

        {/* Beams: Center → Outputs */}
        <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={outputRef1} curvature={40} reverse pathWidth={3} pathColor="var(--foreground)" gradientStartColor="var(--foreground)" gradientStopColor="var(--foreground)" />
        <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={outputRef2} curvature={-20} reverse pathWidth={3} pathColor="var(--foreground)" gradientStartColor="var(--foreground)" gradientStopColor="var(--foreground)" />
        <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={outputRef3} curvature={-40} reverse pathWidth={3} pathColor="var(--foreground)" gradientStartColor="var(--foreground)" gradientStopColor="var(--foreground)" />
      </div>
    </div>
  );
}

/* ─── بطاقة Bento عامة ─── */
function BentoCard({
  title,
  description,
  children,
  className = '',
  isRTL,
  allowOverflow = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  isRTL: boolean;
  allowOverflow?: boolean;
}) {
  return (
    <div
      className={`group flex flex-col backdrop-blur-xl ${allowOverflow ? '' : 'overflow-hidden'} ${className}`}
      style={{ backgroundColor: 'color-mix(in srgb, var(--background) 35%, transparent)' }}
    >
      {/* المكون التفاعلي */}
      <div className={`flex-1 min-h-0 relative ${allowOverflow ? 'overflow-visible' : ''}`}>
        {children}
      </div>

      {/* النص */}
      <div
        className={`${isRTL ? 'text-right' : 'text-left'}`}
        style={{ padding: 'clamp(1.25rem, 1rem + 0.5vw, 1.5rem)' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <h3
          className="font-semibold mb-1.5"
          style={{ color: 'var(--foreground)', fontSize: 'clamp(1.075rem, 0.95rem + 0.3vw, 1.125rem)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── المكون الرئيسي ─── */
export function ServicesBento() {
  const { isRTL, language } = useLanguage();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart={isDark ? 'rgb(10, 10, 15)' : 'rgb(230, 228, 235)'}
      gradientBackgroundEnd={isDark ? 'rgb(15, 10, 25)' : 'rgb(240, 238, 245)'}
      firstColor={isDark ? '30, 30, 60' : '180, 175, 200'}
      secondColor={isDark ? '50, 20, 80' : '200, 190, 220'}
      thirdColor={isDark ? '20, 40, 70' : '190, 200, 215'}
      fourthColor={isDark ? '40, 15, 60' : '210, 200, 225'}
      fifthColor={isDark ? '25, 25, 50' : '195, 190, 210'}
      pointerColor={isDark ? '60, 40, 100' : '170, 160, 200'}
      size="80%"
      blendingValue="hard-light"
      interactive={false}
      containerClassName="!w-full !h-auto !relative py-[clamp(5rem,3rem+4vw,7rem)]"
    >
      <div className="relative z-10 flex flex-col items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container-unified">

          {/* Section Header */}
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="text-center" style={{ marginBottom: 'clamp(2rem, 1.5rem + 1.5vw, 3rem)' }}
          >
            <h2 className="title-section" style={{ color: 'var(--foreground)' }}>
              {language === 'ar'
                ? <>ما <span style={{ color: 'var(--primary)' }}>الخدمات</span> التي أقدمها؟</>
                : <>What <span style={{ color: 'var(--primary)' }}>Services</span> Do I Offer?</>
              }
            </h2>
          </motion.div>

          {/* Section Content - Bento Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4px] rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 15%, transparent)' }}
          >
            {/* 1. AI & Agent Systems — كبير col-span-2 */}
            <BentoCard
              title={BENTO_SERVICES[0][language].title}
              description={BENTO_SERVICES[0][language].description}
              className="md:col-span-2 h-[280px] sm:h-[350px] lg:h-[400px]"
              isRTL={isRTL}
            >
              <AIBeamDemo />
            </BentoCard>

            {/* 2. Web Development — طويل */}
            <BentoCard
              title={BENTO_SERVICES[1][language].title}
              description={BENTO_SERVICES[1][language].description}
              className="h-[280px] sm:h-[350px] lg:h-[400px]"
              isRTL={isRTL}
              allowOverflow={true}
            >
              <div className="w-full h-full flex items-start justify-start overflow-hidden pt-4 pl-4" dir="ltr">
                <Globe size={700} />
              </div>
            </BentoCard>

            {/* 3. Mobile App Development — عادي */}
            <BentoCard
              title={BENTO_SERVICES[3][language].title}
              description={BENTO_SERVICES[3][language].description}
              className="h-[280px] sm:h-[350px] lg:h-[400px]"
              isRTL={isRTL}
            >
              <div className="w-full h-full flex items-start justify-start overflow-hidden pt-4 pl-20">
                <OrbitRotation
                  icons={MOBILE_ICONS}
                  orbitCount={3}
                  orbitGap={8}
                  centerIcon={{ Icon: Smartphone, name: 'Mobile' }}
                  size="xl"
                />
              </div>
            </BentoCard>

            {/* 4. UI/UX Design — عريض col-span-2 */}
            <BentoCard
              title={BENTO_SERVICES[2][language].title}
              description={BENTO_SERVICES[2][language].description}
              className="md:col-span-2 h-[280px] sm:h-[350px] lg:h-[400px]"
              isRTL={isRTL}
            >
              <div className="w-full h-full flex items-center justify-center" style={{ padding: '0 clamp(2rem, 1rem + 2.5vw, 4rem)' }}>
                <div className="w-full max-w-[600px] lg:max-w-[800px] h-full">
                  <ThreeDMarquee
                    images={MARQUEE_IMAGES}
                    className="h-full"
                  />
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}

export default ServicesBento;

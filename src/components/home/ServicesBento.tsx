'use client';

import { useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { AuroraBackground } from '@/components/ui/aurora-background';
// Heavy component loaded lazily
const OrbitRotation = dynamic(() => import('@/components/ui/orbit-rotation').then(m => m.OrbitRotation), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-16 h-16 rounded-full border-2 animate-pulse" style={{ borderColor: 'var(--border)' }} /></div>,
});
import { MonitorSmartphone, FileText, Database, Mic, Sparkles, CalendarCheck } from 'lucide-react';
import {
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiFirebase,
  SiTailwindcss,
  SiAndroid,
  SiApple,
  SiSwift,
  SiNodedotjs,
  SiSupabase,
  SiVercel,
  SiWhatsapp,
  SiTelegram,
  SiPostgresql,
  SiGithub,
  SiSlack,
  SiNotion,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── بيانات الخدمات ─── */
type ServiceId = 'ai-apps' | 'automation' | 'knowledge' | 'voice' | 'web-mobile';

const BENTO_SERVICES: Record<ServiceId, { en: { title: string; description: string }; ar: { title: string; description: string } }> = {
  'ai-apps': {
    en: {
      title: 'AI-Powered Applications',
      description:
        'Products with generative AI at their core — LLM integration, smart search, summarization, classification, and content generation built right into your app.',
    },
    ar: {
      title: 'تطبيقات مدعومة بالذكاء الاصطناعي',
      description:
        'منتجات يكون الذكاء التوليدي في قلبها — دمج النماذج اللغوية، بحث ذكي، تلخيص وتصنيف وتوليد محتوى مبني داخل تطبيقك.',
    },
  },
  automation: {
    en: {
      title: 'AI Agents & Workflow Automation',
      description:
        'Autonomous agents that connect your tools — WhatsApp, Slack, Notion, databases — and run multi-step tasks end to end, without manual work.',
    },
    ar: {
      title: 'وكلاء الذكاء الاصطناعي وأتمتة المهام',
      description:
        'وكلاء مستقلون يربطون أدواتك ببعض — واتساب وسلاك ونوشن وقواعد البيانات — وينفذون المهام متعددة الخطوات من البداية للنهاية بدون تدخل يدوي.',
    },
  },
  knowledge: {
    en: {
      title: 'Knowledge Base & RAG Systems',
      description:
        'Turn your documents and data into an assistant that answers accurately with cited sources — for your team or your customers.',
    },
    ar: {
      title: 'قواعد المعرفة وأنظمة RAG',
      description:
        'حوّل مستنداتك وبياناتك إلى مساعد يجاوب بدقة مع ذكر المصدر — لفريقك أو لعملائك.',
    },
  },
  voice: {
    en: {
      title: 'Voice AI & Conversational Agents',
      description:
        'Real-time voice and chat agents that understand Arabic & English, take actions through your systems, and serve customers 24/7.',
    },
    ar: {
      title: 'الذكاء الاصطناعي الصوتي ووكلاء المحادثة',
      description:
        'وكلاء صوت ومحادثة لحظيين يفهمون العربية والإنجليزية، ينفذون مهام عبر أنظمتك، ويخدمون عملاءك على مدار الساعة.',
    },
  },
  'web-mobile': {
    en: {
      title: 'Web & Mobile Development',
      description:
        'Full-stack Next.js platforms and cross-platform Flutter apps — responsive UI and performance-first architecture.',
    },
    ar: {
      title: 'تطوير الويب والجوال',
      description:
        'منصات Full-stack بـ Next.js وتطبيقات Flutter متعددة المنصات — واجهات متجاوبة وبنية تضع الأداء أولاً.',
    },
  },
};

/* ─── أيقونات OrbitRotation للويب والجوال ─── */
const WEB_MOBILE_ICONS = [
  { Icon: SiNextdotjs, name: 'Next.js' },
  { Icon: SiFlutter, name: 'Flutter' },
  { Icon: SiReact, name: 'React' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiApple, name: 'iOS' },
  { Icon: SiAndroid, name: 'Android' },
  { Icon: SiTailwindcss, name: 'Tailwind' },
  { Icon: SiFirebase, name: 'Firebase' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiSwift, name: 'Swift' },
  { Icon: SiSupabase, name: 'Supabase' },
  { Icon: SiVercel, name: 'Vercel' },
];

/** يشغل الأنيميشن المتكررة فقط وهي ظاهرة بالشاشة */
function playWhileVisible(tl: gsap.core.Animation, trigger: Element | null) {
  if (!trigger) return;
  ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  });
}

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

/* ─── مساعد المعرفة (RAG): سؤال ← استرجاع ← إجابة بمصادر ─── */
const RAG_COPY = {
  en: {
    q: 'What is our refund policy for annual plans?',
    a: 'Annual plans are refundable within 30 days of purchase, prorated after that.',
    docs: ['Policies.pdf', 'Billing DB'],
    searching: 'Searching knowledge base…',
  },
  ar: {
    q: 'وش سياسة الاسترجاع للباقات السنوية؟',
    a: 'الباقات السنوية قابلة للاسترجاع خلال ٣٠ يوم من الشراء، وبعدها يكون الاسترداد نسبي.',
    docs: ['السياسات.pdf', 'قاعدة الفوترة'],
    searching: 'جاري البحث في قاعدة المعرفة…',
  },
};

function RagChatDemo({ language, isRTL }: { language: 'en' | 'ar'; isRTL: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const copy = RAG_COPY[language];

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const answer = q<HTMLElement>('[data-answer]')[0];
      const typed = { n: 0 };
      const full = copy.a;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, paused: true });
      tl.set(q('[data-bubble], [data-doc], [data-cite], [data-searching]'), { opacity: 0, y: 10 })
        .set(answer, { textContent: '' })
        .set(typed, { n: 0 })
        .to(q('[data-bubble="user"]'), { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
        .to(q('[data-searching]'), { opacity: 1, y: 0, duration: 0.3 }, '+=0.2')
        .to(q('[data-doc]'), { opacity: 1, y: 0, duration: 0.35, stagger: 0.18, ease: 'back.out(2)' })
        .to(q('[data-searching]'), { opacity: 0, duration: 0.25 }, '+=0.3')
        .to(q('[data-bubble="ai"]'), { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        .to(typed, {
          n: full.length,
          duration: full.length * 0.028,
          ease: 'none',
          onUpdate: () => {
            answer.textContent = full.slice(0, Math.round(typed.n));
          },
        })
        .to(q('[data-cite]'), { opacity: 1, y: 0, duration: 0.3, stagger: 0.12 });

      playWhileVisible(tl, ref.current);
    },
    { scope: ref, dependencies: [language], revertOnUpdate: true }
  );

  const bubbleBase = 'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm';

  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-center gap-2.5 px-5 pt-5" dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        data-bubble="user"
        className={cn(bubbleBase, 'self-end')}
        style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
      >
        {copy.q}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 min-h-[26px]">
        <span data-searching className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
          <Sparkles className="w-3.5 h-3.5 animate-pulse" style={{ color: 'var(--primary)' }} />
          {copy.searching}
        </span>
        {copy.docs.map((d, i) => (
          <span
            key={d}
            data-doc
            className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px]"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
          >
            {i === 0 ? <FileText className="w-3 h-3" /> : <Database className="w-3 h-3" />}
            {d}
          </span>
        ))}
      </div>

      <div
        data-bubble="ai"
        className={cn(bubbleBase, 'self-start border')}
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
      >
        <span data-answer className="min-h-[1.5em] inline">{copy.a}</span>
        <span className="mt-1.5 flex gap-1">
          {[1, 2].map((n) => (
            <span
              key={n}
              data-cite
              className="inline-flex h-4 min-w-4 items-center justify-center rounded px-1 text-[10px] font-semibold"
              style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 18%, transparent)', color: 'var(--primary)' }}
            >
              {n}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

/* ─── تطبيق ذكي: نص يدخل ← تحليل ← نتائج منظمة ─── */
const APPS_COPY = {
  en: {
    label: 'Customer review',
    text: 'The app is fast and the delivery arrived early, but I wish there were more payment options.',
    analyzing: 'Analyzing with AI…',
    outputs: [
      { k: 'Sentiment', v: 'Positive · 82%' },
      { k: 'Topics', v: 'Delivery, Payments' },
      { k: 'Action', v: 'Suggest Apple Pay' },
    ],
  },
  ar: {
    label: 'تقييم عميل',
    text: 'التطبيق سريع والتوصيل وصل بدري، بس أتمنى يكون فيه طرق دفع أكثر.',
    analyzing: 'جاري التحليل بالذكاء الاصطناعي…',
    outputs: [
      { k: 'الانطباع', v: 'إيجابي · ٨٢٪' },
      { k: 'المواضيع', v: 'التوصيل، الدفع' },
      { k: 'الإجراء', v: 'اقتراح Apple Pay' },
    ],
  },
};

function AIAppsDemo({ language, isRTL }: { language: 'en' | 'ar'; isRTL: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const copy = APPS_COPY[language];

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, paused: true });
      tl.set(q('[data-out]'), { opacity: 0, y: 10 })
        .set(q('[data-scan]'), { yPercent: -100, opacity: 0 })
        .set(q('[data-analyzing]'), { opacity: 0 })
        .to(q('[data-analyzing]'), { opacity: 1, duration: 0.3 })
        .to(q('[data-scan]'), { opacity: 1, duration: 0.2 }, '<')
        .to(q('[data-scan]'), { yPercent: 100, duration: 1.3, ease: 'power1.inOut' }, '<')
        .to(q('[data-scan]'), { opacity: 0, duration: 0.2 })
        .to(q('[data-analyzing]'), { opacity: 0, duration: 0.2 }, '<')
        .to(q('[data-out]'), { opacity: 1, y: 0, duration: 0.4, stagger: 0.18, ease: 'back.out(1.8)' })
        .to({}, { duration: 2 });
      playWhileVisible(tl, ref.current);
    },
    { scope: ref, dependencies: [language], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-center gap-2.5 px-5 pt-5" dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        className="relative overflow-hidden rounded-2xl border px-3.5 py-3"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
      >
        <span className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>
          {copy.label}
        </span>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--foreground)' }}>
          {copy.text}
        </p>
        {/* خط المسح */}
        <span
          data-scan
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, color-mix(in srgb, var(--primary) 35%, transparent) 50%, transparent 60%)' }}
        />
      </div>

      <span data-analyzing className="inline-flex items-center gap-1.5 text-[11px] min-h-4" style={{ color: 'var(--muted-foreground)' }}>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" style={{ color: 'var(--primary)' }} />
        {copy.analyzing}
      </span>

      <div className="grid grid-cols-1 gap-1.5">
        {copy.outputs.map((o) => (
          <div
            key={o.k}
            data-out
            className="flex items-center justify-between gap-2 rounded-xl px-3 py-1.5 text-[12px]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
          >
            <span style={{ color: 'var(--muted-foreground)' }}>{o.k}</span>
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{o.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── وكيل صوتي: موجة صوت + نص المحادثة + تنفيذ مهمة ─── */
const VOICE_COPY = {
  en: {
    user: 'Book me an appointment tomorrow at 4 PM.',
    agent: 'Done! You’re booked for tomorrow at 4:00 PM — I sent the confirmation by WhatsApp.',
    tool: 'calendar.create_event',
    live: 'Live',
  },
  ar: {
    user: 'أبغى أحجز موعد بكرة الساعة ٤ العصر.',
    agent: 'تم! حجزت لك بكرة الساعة ٤:٠٠ العصر، وأرسلت لك التأكيد على الواتساب.',
    tool: 'calendar.create_event',
    live: 'مباشر',
  },
};

const BAR_COUNT = 36;

function VoiceAgentDemo({ language, isRTL }: { language: 'en' | 'ar'; isRTL: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const copy = VOICE_COPY[language];

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const bars = q('[data-bar]');

      // الموجة: كل عمود يتذبذب بارتفاع عشوائي — تشتغل بس وهي ظاهرة
      const wave = gsap.to(bars, {
        paused: true,
        scaleY: () => gsap.utils.random(0.15, 1),
        duration: 0.28,
        ease: 'sine.inOut',
        stagger: { each: 0.02, from: 'center', repeat: -1, yoyo: true, repeatRefresh: true },
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, paused: true });
      tl.set(q('[data-line]'), { opacity: 0, y: 12 })
        .to(q('[data-ring]'), { scale: 1.6, opacity: 0, duration: 1.4, stagger: 0.45, repeat: 2, ease: 'power1.out' }, 0)
        .to(q('[data-line="user"]'), { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.5)
        .to(q('[data-line="tool"]'), { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, '+=0.6')
        .to(q('[data-line="agent"]'), { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '+=0.6')
        .to({}, { duration: 2.2 });

      playWhileVisible(wave, ref.current);
      playWhileVisible(tl, ref.current);
    },
    { scope: ref, dependencies: [language], revertOnUpdate: true }
  );

  return (
    <div
      ref={ref}
      className="grid h-full w-full grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-5 sm:gap-8 px-5 sm:px-8 pt-6"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* الميكروفون + الموجة */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
          {[0, 1].map((i) => (
            <span
              key={i}
              data-ring
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: 'var(--primary)' }}
            />
          ))}
          <span
            className="relative z-10 flex items-center justify-center w-full h-full rounded-full shadow-lg"
            style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
          >
            <Mic className="w-6 h-6" />
          </span>
        </div>
        <div className="flex h-16 sm:h-20 flex-1 items-center justify-between gap-[2px] min-w-0" dir="ltr" aria-hidden>
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              data-bar
              className="w-[3px] sm:w-1 h-full rounded-full origin-center"
              style={{
                transform: `scaleY(${0.2 + 0.6 * Math.abs(Math.sin(i * 0.7))})`,
                backgroundColor: i % 3 === 0 ? 'var(--primary)' : 'color-mix(in srgb, var(--foreground) 55%, transparent)',
              }}
            />
          ))}
        </div>
      </div>

      {/* نص المحادثة */}
      <div className="flex flex-col gap-2 min-w-0">
        <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {copy.live}
        </span>
        <p data-line="user" className="text-[13px] leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          “{copy.user}”
        </p>
        <span
          data-line="tool"
          className="inline-flex items-center gap-1.5 self-start rounded-md border px-2 py-1 font-mono text-[11px]"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}
          dir="ltr"
        >
          <CalendarCheck className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
          {copy.tool} ✓
        </span>
        <p data-line="agent" className="text-[13px] sm:text-sm font-medium leading-relaxed" style={{ color: 'var(--foreground)' }}>
          {copy.agent}
        </p>
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
  horizontal = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  isRTL: boolean;
  /** بطاقة عريضة: المحتوى بجانب النص في الشاشات الكبيرة */
  horizontal?: boolean;
}) {
  return (
    <div
      data-bento-card
      className={`group flex flex-col ${horizontal ? 'lg:flex-row-reverse' : ''} backdrop-blur-xl overflow-hidden ${className}`}
      style={{ backgroundColor: 'color-mix(in srgb, var(--background) 35%, transparent)' }}
    >
      {/* المكون التفاعلي */}
      <div className="flex-1 min-h-[220px] relative">
        {children}
      </div>

      {/* النص */}
      <div
        className={`${isRTL ? 'text-right' : 'text-left'} ${horizontal ? 'lg:w-[38%] lg:flex lg:flex-col lg:justify-center lg:px-12' : ''}`}
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const svc = (id: ServiceId) => BENTO_SERVICES[id][language];

  // دخول العنوان والبطاقات بالتتابع مع التمرير
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(sectionRef);
        gsap.from(q('[data-services-title]'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
        gsap.from(q('[data-bento-card]'), {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: q('[data-bento-grid]')[0], start: 'top 85%' },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const cardHeight = 'min-h-[360px] sm:min-h-0 sm:h-[370px] lg:h-[400px]';

  return (
    <AuroraBackground
      className="w-full py-[clamp(5rem,3rem+4vw,7rem)]"
      showRadialGradient={false}
    >
      <div ref={sectionRef} className="relative z-10 flex flex-col items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container-unified">

          {/* Section Header */}
          <div data-services-title className="text-center" style={{ marginBottom: 'clamp(2rem, 1.5rem + 1.5vw, 3rem)' }}>
            <h2 className="title-section" style={{ color: 'var(--foreground)' }}>
              {language === 'ar'
                ? <>ما <span style={{ color: 'var(--primary)' }}>الخدمات</span> التي أقدمها؟</>
                : <>What <span style={{ color: 'var(--primary)' }}>Services</span> Do I Offer?</>
              }
            </h2>
          </div>

          {/* Section Content - Bento Grid */}
          <div
            data-bento-grid
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4px] rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 15%, transparent)' }}
          >
            {/* 1. Agents & Automation — عريض */}
            <BentoCard
              title={svc('automation').title}
              description={svc('automation').description}
              className={`md:col-span-2 ${cardHeight}`}
              isRTL={isRTL}
            >
              <AIBeamDemo />
            </BentoCard>

            {/* 2. Knowledge Base & RAG */}
            <BentoCard
              title={svc('knowledge').title}
              description={svc('knowledge').description}
              className={cardHeight}
              isRTL={isRTL}
            >
              <RagChatDemo language={language} isRTL={isRTL} />
            </BentoCard>

            {/* 3. AI-Powered Apps */}
            <BentoCard
              title={svc('ai-apps').title}
              description={svc('ai-apps').description}
              className={cardHeight}
              isRTL={isRTL}
            >
              <AIAppsDemo language={language} isRTL={isRTL} />
            </BentoCard>

            {/* 4. Voice AI — عريض */}
            <BentoCard
              title={svc('voice').title}
              description={svc('voice').description}
              className={`md:col-span-2 ${cardHeight}`}
              isRTL={isRTL}
            >
              <VoiceAgentDemo language={language} isRTL={isRTL} />
            </BentoCard>

            {/* 5. Web & Mobile — بعرض كامل */}
            <BentoCard
              title={svc('web-mobile').title}
              description={svc('web-mobile').description}
              className="md:col-span-2 lg:col-span-3 min-h-[360px] sm:min-h-0 sm:h-[370px] lg:h-[340px]"
              isRTL={isRTL}
              horizontal
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden" dir="ltr">
                <div className="scale-[0.72] sm:scale-[0.8] lg:scale-90">
                  <OrbitRotation
                    icons={WEB_MOBILE_ICONS}
                    orbitCount={2}
                    orbitGap={8}
                    centerIcon={{ Icon: MonitorSmartphone, name: 'Web & Mobile' }}
                    size="xl"
                  />
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}

export default ServicesBento;

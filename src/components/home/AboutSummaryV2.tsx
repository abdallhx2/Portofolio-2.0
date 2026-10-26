'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BrainCircuit, Bot, MonitorSmartphone, Workflow, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getColorScheme } from '@/data/colors';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import AnimatedFrameworks from '@/components/ui/animated-frameworks';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── مجالات التركيز (شرائح صغيرة تحت النبذة) ─── */
const FOCUS_AREAS = [
    { Icon: Bot, en: 'AI Agents', ar: 'وكلاء الذكاء الاصطناعي' },
    { Icon: BrainCircuit, en: 'LLMs & RAG', ar: 'النماذج اللغوية و RAG' },
    { Icon: MonitorSmartphone, en: 'Web & Mobile', ar: 'الويب والجوال' },
    { Icon: Workflow, en: 'Automation', ar: 'أتمتة العمليات' },
];

/* يقسم النص لكلمات — كل كلمة كاملة عشان الحروف العربية تبقى متصلة */
function SplitWords({ text, className }: { text: string; className?: string }) {
    return (
        <>
            {text.split(/\s+/).map((word, i) => (
                <span key={i} data-word className={className}>
                    {word}{' '}
                </span>
            ))}
        </>
    );
}

export function AboutSummaryV2() {
    const { t, isRTL, language } = useLanguage();
    const { colorScheme } = useTheme();
    const { personalInfo, statistics } = useTranslatedData();
    const sectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    // القسم دائماً داكن بغض النظر عن الثيم العام
    const darkColors = getColorScheme(colorScheme, 'dark');
    const forceDarkVars = {
        backgroundColor: '#000',
        colorScheme: 'dark',
        '--foreground': darkColors.foreground,
        '--primary': darkColors.primary,
        '--primary-dark': darkColors.primaryDark,
        '--background': darkColors.background,
        '--card': darkColors.cardBg,
        '--card-bg': darkColors.cardBg,
        '--border': darkColors.border,
        '--info': darkColors.info,
        '--accent': darkColors.accent,
        '--muted': darkColors.muted,
        '--secondary': darkColors.secondary,
        '--success': darkColors.success,
        '--warning': darkColors.warning,
        '--error': darkColors.error,
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--glass-bg': 'rgba(24, 24, 27, 0.7)',
        '--glass-border': 'rgba(63, 63, 70, 0.4)',
    } as React.CSSProperties;

    const stats = [
        { value: statistics.yearsExperience, label: t('home.stats.experience') || 'Years Experience' },
        { value: statistics.projectsCompleted, label: t('home.stats.projects') || 'Projects Completed' },
        { value: statistics.happyClients, label: t('home.stats.clients') || 'Happy Clients' },
        { value: statistics.awardsWon, label: t('home.stats.awards') || 'Awards Won' },
    ];

    useGSAP(
        () => {
            const q = gsap.utils.selector(sectionRef);
            const words = q('[data-word]');
            const titleWords = q('[data-title-word]');
            const fadeUps = q('[data-fade-up]');
            const counters = q<HTMLElement>('[data-count]');
            const image = q('[data-about-image]');
            const imageInner = q('[data-about-image-inner]');

            const setCount = (el: HTMLElement, v: number) => {
                el.textContent = `+${Math.round(v)}`;
            };
            const countTweens = (tl: gsap.core.Timeline, at: string | number, duration: number) => {
                counters.forEach((el) => {
                    const target = Number(el.dataset.count);
                    const obj = { v: 0 };
                    setCount(el, 0);
                    tl.to(obj, { v: target, duration, ease: 'power2.out', onUpdate: () => setCount(el, obj.v) }, at);
                });
            };

            const mm = gsap.matchMedia();

            mm.add(
                {
                    pinned: '(min-width: 1024px) and (min-height: 860px) and (prefers-reduced-motion: no-preference)',
                    flow: '(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 859px) and (prefers-reduced-motion: no-preference)',
                },
                (ctx) => {
                    const { pinned } = ctx.conditions as { pinned: boolean; flow: boolean };

                    // كشف الصورة: قناع يفتح من الأسفل مع تصغير خفيف
                    gsap.fromTo(
                        image,
                        { clipPath: 'inset(100% 0% 0% 0% round 2rem)' },
                        {
                            clipPath: 'inset(0% 0% 0% 0% round 2rem)',
                            ease: 'none',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', end: pinned ? 'top top' : 'top 25%', scrub: 0.6 },
                        }
                    );
                    gsap.fromTo(
                        imageInner,
                        { scale: 1.25, y: 0, yPercent: 6 },
                        {
                            scale: 1,
                            yPercent: 0,
                            ease: 'none',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: pinned ? 'top top' : 'bottom 60%', scrub: 0.6 },
                        }
                    );

                    // y صريحة لأن GSAP قد يحتفظ بقيمة px قديمة بعد إعادة التهيئة (تبديل اللغة)
                    gsap.set(titleWords, { y: 0, yPercent: 110 });
                    gsap.set(words, { opacity: 0.14 });
                    gsap.set(fadeUps, { opacity: 0, y: 24 });

                    if (pinned) {
                        // تثبيت القسم وتشغيل القصة كاملة مع التمرير
                        const tl = gsap.timeline({
                            defaults: { ease: 'none' },
                            scrollTrigger: {
                                trigger: pinRef.current,
                                start: 'top top',
                                end: '+=140%',
                                pin: true,
                                scrub: 0.8,
                                anticipatePin: 1,
                            },
                        });
                        tl.to(titleWords, { y: 0, yPercent: 0, duration: 0.25, stagger: 0.05, ease: 'power3.out' })
                            .to(words, { opacity: 1, duration: 0.05, stagger: 0.012 }, '<0.1')
                            .to(fadeUps, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, '-=0.15');
                        countTweens(tl, '<', 0.5);
                        tl.to({}, { duration: 0.2 }); // مهلة قصيرة قبل فك التثبيت
                        return;
                    }

                    // الجوال والشاشات القصيرة: بدون تثبيت، كل جزء يتحرك عند وصوله
                    gsap.to(titleWords, {
                        y: 0,
                        yPercent: 0,
                        duration: 0.9,
                        stagger: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: titleWords[0], start: 'top 88%' },
                    });
                    gsap.to(words, {
                        opacity: 1,
                        stagger: 0.02,
                        ease: 'none',
                        scrollTrigger: { trigger: q('[data-bio]')[0], start: 'top 85%', end: 'bottom 55%', scrub: 0.5 },
                    });
                    fadeUps.forEach((el) => {
                        gsap.to(el, {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: 'power2.out',
                            scrollTrigger: { trigger: el, start: 'top 92%' },
                        });
                    });
                    const statsTl = gsap.timeline({ scrollTrigger: { trigger: q('[data-stats]')[0], start: 'top 90%' } });
                    countTweens(statsTl, 0, 1.6);
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [language], revertOnUpdate: true }
    );

    return (
        <section ref={sectionRef} className="relative z-10 rounded-t-[2rem] overflow-clip" style={forceDarkVars}>
            <div ref={pinRef} className="relative lg:min-h-[100svh] flex items-center" dir={isRTL ? 'rtl' : 'ltr'}>
                {/* هالات لونية خفيفة */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                    <div
                        className="absolute -top-[10%] end-0 w-[45%] h-[60%] rounded-full blur-[120px] opacity-[0.07]"
                        style={{ backgroundColor: 'var(--primary)' }}
                    />
                    <div
                        className="absolute bottom-0 start-0 w-[35%] h-[45%] rounded-full blur-[110px] opacity-[0.04]"
                        style={{ backgroundColor: 'var(--info)' }}
                    />
                </div>

                <div
                    className="container-unified relative grid grid-cols-1 lg:grid-cols-12 items-center"
                    style={{
                        gap: 'clamp(2rem, 1rem + 3vw, 4rem)',
                        paddingTop: 'clamp(4rem, 2rem + 4vh, 5.5rem)',
                        paddingBottom: 'clamp(4rem, 2rem + 4vh, 5.5rem)',
                    }}
                >
                    {/* ── الصورة ── */}
                    <div className="lg:col-span-6 w-full sm:max-w-xl lg:max-w-none mx-auto">
                        <div
                            data-about-image
                            className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[min(86svh,56rem)] overflow-hidden rounded-[2rem] shadow-2xl"
                            style={{ backgroundColor: 'var(--card)' }}
                        >
                            <div data-about-image-inner className="absolute inset-0 will-change-transform">
                                <Image
                                    src="/me/2.jpeg"
                                    alt={personalInfo.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 576px, 50vw"
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)' }}
                            />

                            {/* بطاقة الاسم فوق الصورة */}
                            <div
                                className="absolute bottom-4 inset-x-4 sm:bottom-5 sm:inset-x-5 rounded-2xl border px-4 py-3 backdrop-blur-md"
                                style={{ backgroundColor: 'rgba(10,10,12,0.55)', borderColor: 'rgba(255,255,255,0.08)' }}
                            >
                                <div className="min-w-0">
                                    <p className="font-semibold truncate text-sm sm:text-base" style={{ color: 'var(--foreground)' }}>
                                        {personalInfo.name}
                                    </p>
                                    <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
                                        {personalInfo.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── النص ── */}
                    <div className="lg:col-span-6 flex flex-col min-w-0">
                        <p
                            data-fade-up
                            className="inline-flex items-center gap-2 text-xs sm:text-sm mb-4"
                            style={{ color: 'var(--muted-foreground)' }}
                        >
                            <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                            {personalInfo.location}
                        </p>

                        <h2
                            className="title-section font-bold leading-tight mb-5 lg:mb-6"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {(t('about.title') || 'Who am I?').split(' ').map((w, i) => (
                                <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                                    <span data-title-word className="inline-block">
                                        {w}
                                    </span>
                                    {' '}
                                </span>
                            ))}
                        </h2>

                        <div
                            data-bio
                            className="space-y-4 lg:space-y-5 leading-relaxed"
                            style={{ color: 'var(--foreground)', fontSize: 'clamp(0.95rem, 0.85rem + 0.35vw, 1.15rem)' }}
                        >
                            <p>
                                <SplitWords text={personalInfo.bioParagraph1} />
                            </p>
                            <p>
                                <SplitWords text={personalInfo.bioParagraph2} />
                            </p>
                        </div>

                        {/* مجالات التركيز */}
                        <ul className="flex flex-wrap gap-2 mt-6 lg:mt-8">
                            {FOCUS_AREAS.map(({ Icon, en, ar }) => (
                                <li
                                    key={en}
                                    data-fade-up
                                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs sm:text-sm"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--foreground) 12%, transparent)',
                                        backgroundColor: 'color-mix(in srgb, var(--foreground) 4%, transparent)',
                                        color: 'var(--foreground)',
                                    }}
                                >
                                    <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                                    {language === 'ar' ? ar : en}
                                </li>
                            ))}
                        </ul>

                        {/* لوحة الأدوات المتحركة + الإحصائيات */}
                        <div
                            data-fade-up
                            className="mt-8 lg:mt-10 rounded-3xl border overflow-hidden"
                            style={{
                                borderColor: 'color-mix(in srgb, var(--foreground) 10%, transparent)',
                                background: 'linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 3%, transparent), #050506)',
                            }}
                        >
                            <AnimatedFrameworks compact />
                            <div
                                data-stats
                                className="grid grid-cols-2 sm:grid-cols-4 gap-px border-t"
                                style={{
                                    backgroundColor: 'color-mix(in srgb, var(--foreground) 10%, transparent)',
                                    borderColor: 'color-mix(in srgb, var(--foreground) 10%, transparent)',
                                }}
                            >
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col items-center justify-center text-center gap-1 px-2 py-4 sm:py-5"
                                        style={{ backgroundColor: '#050506' }}
                                    >
                                        <span
                                            data-count={stat.value}
                                            className="tracking-tight font-bold tabular-nums"
                                            style={{
                                                color: 'var(--foreground)',
                                                fontFamily: "Georgia, 'Times New Roman', serif",
                                                fontSize: 'clamp(1.5rem, 1.1rem + 1.2vw, 2.25rem)',
                                            }}
                                        >
                                            +{stat.value}
                                        </span>
                                        <span className="text-[11px] sm:text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

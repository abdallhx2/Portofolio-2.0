'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getColorScheme } from '@/data/colors';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import AnimatedFrameworks from '@/components/ui/animated-frameworks';
import { AboutStatistics } from './AboutStatistics';
import {
    staggerContainer,
    staggerItem,
    easings,
    rtlX,
    sectionViewport,
    sectionHeader,
    sectionContent,
} from '@/lib/motion';

const POETRY_STARS = [
    // Wave 1 — appear first with hemistich entry
    { top: '5%', left: '8%', size: 30, color: 'primary', wave: 1 },
    { top: '10%', left: '78%', size: 26, color: 'foreground', wave: 1 },
    { top: '18%', left: '45%', size: 35, color: 'primary', wave: 1 },
    { top: '3%', left: '62%', size: 28, color: 'foreground', wave: 1 },
    { top: '22%', left: '15%', size: 40, color: 'primary', wave: 1 },
    { top: '8%', left: '92%', size: 32, color: 'foreground', wave: 1 },
    { top: '15%', left: '30%', size: 25, color: 'primary', wave: 1 },
    { top: '25%', left: '88%', size: 38, color: 'foreground', wave: 1 },
    { top: '12%', left: '55%', size: 27, color: 'primary', wave: 1 },
    { top: '6%', left: '38%', size: 33, color: 'foreground', wave: 1 },
    { top: '20%', left: '72%', size: 29, color: 'primary', wave: 1 },
    { top: '2%', left: '22%', size: 36, color: 'foreground', wave: 1 },
    // Wave 2 — mid entrance
    { top: '35%', left: '5%', size: 42, color: 'primary', wave: 2 },
    { top: '40%', left: '85%', size: 28, color: 'foreground', wave: 2 },
    { top: '48%', left: '20%', size: 35, color: 'primary', wave: 2 },
    { top: '33%', left: '68%', size: 30, color: 'foreground', wave: 2 },
    { top: '55%', left: '92%', size: 45, color: 'primary', wave: 2 },
    { top: '42%', left: '42%', size: 26, color: 'foreground', wave: 2 },
    { top: '50%', left: '10%', size: 38, color: 'primary', wave: 2 },
    { top: '38%', left: '55%', size: 32, color: 'foreground', wave: 2 },
    { top: '45%', left: '75%', size: 27, color: 'primary', wave: 2 },
    { top: '52%', left: '35%', size: 40, color: 'foreground', wave: 2 },
    { top: '30%', left: '48%', size: 34, color: 'primary', wave: 2 },
    // Wave 3 — final stars as hemistich settles
    { top: '62%', left: '12%', size: 37, color: 'primary', wave: 3 },
    { top: '68%', left: '82%', size: 29, color: 'foreground', wave: 3 },
    { top: '75%', left: '28%', size: 44, color: 'primary', wave: 3 },
    { top: '82%', left: '65%', size: 31, color: 'foreground', wave: 3 },
    { top: '70%', left: '50%', size: 25, color: 'primary', wave: 3 },
    { top: '88%', left: '8%', size: 39, color: 'foreground', wave: 3 },
    { top: '65%', left: '90%', size: 33, color: 'primary', wave: 3 },
    { top: '78%', left: '40%', size: 28, color: 'foreground', wave: 3 },
    { top: '92%', left: '58%', size: 42, color: 'primary', wave: 3 },
    { top: '85%', left: '18%', size: 36, color: 'foreground', wave: 3 },
    { top: '72%', left: '70%', size: 30, color: 'primary', wave: 3 },
    { top: '95%', left: '32%', size: 26, color: 'foreground', wave: 3 },
] as const;

export function AboutSummaryV2() {
    const { t, isRTL } = useLanguage();
    const { colorScheme } = useTheme();
    const { personalInfo } = useTranslatedData();
    const sectionRef = useRef<HTMLElement>(null);

    // Always render in dark mode regardless of global theme
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
        // Fixed dark values (not scheme-specific)
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--glass-bg': 'rgba(24, 24, 27, 0.7)',
        '--glass-border': 'rgba(63, 63, 70, 0.4)',
    } as React.CSSProperties;
    // Scroll-linked parallax for the image
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

    // Scroll-linked poetry animations
    const poetryRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: poetryProgress } = useScroll({
        target: poetryRef,
        offset: ['start end', 'end start'],
    });
    const poetryX1 = useTransform(poetryProgress, [0.15, 0.45], ['100vw', '0vw']);
    const poetryOpacity1 = useTransform(poetryProgress, [0.15, 0.3], [0, 1]);
    const poetryX2 = useTransform(poetryProgress, [0.35, 0.65], ['-100vw', '0vw']);
    const poetryOpacity2 = useTransform(poetryProgress, [0.35, 0.5], [0, 1]);

    // Stars — 3 waves synced with second hemistich (0.35 → 0.65)
    const starsScale1 = useTransform(poetryProgress, [0.35, 0.55], [0, 1]);
    const starsOpacity1 = useTransform(poetryProgress, [0.35, 0.50], [0, 1]);
    const starsScale2 = useTransform(poetryProgress, [0.40, 0.60], [0, 1]);
    const starsOpacity2 = useTransform(poetryProgress, [0.40, 0.55], [0, 1]);
    const starsScale3 = useTransform(poetryProgress, [0.45, 0.65], [0, 1]);
    const starsOpacity3 = useTransform(poetryProgress, [0.45, 0.60], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-dvh lg:overflow-clip z-10"
            style={forceDarkVars}
        >
            {/* Subtle background pattern */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: bgOpacity }}
            >
                <div
                    className="absolute top-0 right-0 w-[40%] h-[60%] rounded-full blur-[120px] opacity-[0.03]"
                    style={{ backgroundColor: 'var(--primary)' }}
                />
                <div
                    className="absolute bottom-0 left-0 w-[30%] h-[40%] rounded-full blur-[100px] opacity-[0.02]"
                    style={{ backgroundColor: 'var(--info)' }}
                />
            </motion.div>

            {/* ── Mobile: Image at very top, then content below ── */}
            <div className="lg:hidden relative">
                {/* Full-bleed image from top of section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={sectionViewport}
                    transition={{ duration: 0.8, ease: easings.decelerate }}
                >
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                        <Image
                            src="/me/2.jpeg"
                            alt={personalInfo.name}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                        {/* Gradient fade to background */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to top, #000 0%, transparent 100%)'
                            }}
                        />
                    </div>
                </motion.div>

                {/* Content below image — full width, stretched */}
                <div
                    className="relative -mt-16 z-10 flex-1"
                    style={{ padding: '0 var(--section-px)' }}
                >
                    {/* Title */}
                    <motion.h2
                        variants={sectionHeader}
                        initial="hidden"
                        whileInView="visible"
                        viewport={sectionViewport}
                        className="title-section font-bold leading-tight mb-3"
                        style={{ color: 'var(--foreground)' }}
                    >
                        {t('about.title') || 'Who am I?'}
                    </motion.h2>

                    {/* Bio */}
                    <motion.div
                        variants={sectionContent}
                        initial="hidden"
                        whileInView="visible"
                        viewport={sectionViewport}
                    >
                        <motion.div
                            variants={staggerContainer(0.15)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={sectionViewport}
                            className="space-y-3 text-sm sm:text-base leading-relaxed"
                        >
                            <motion.p variants={staggerItem} style={{ color: 'var(--muted-foreground)' }}>
                                {personalInfo.bioParagraph1}
                            </motion.p>
                            <motion.p variants={staggerItem} style={{ color: 'var(--muted-foreground)' }}>
                                {personalInfo.bioParagraph2}
                            </motion.p>
                        </motion.div>

                        {/* Statistics */}
                        <motion.div variants={staggerItem} className="mt-4">
                            <AboutStatistics />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom spacing */}
                <div className="h-8" />
            </div>

            {/* ── Desktop: Side-by-side layout (unchanged) ── */}
            <div
                className="hidden lg:flex relative w-full h-full flex-row items-center gap-12 xl:gap-16 container-unified"
                style={{ paddingTop: 'clamp(5rem, 12vh, 7rem)' }}
            >
                {/* ── Image Column ── */}
                <motion.div
                    initial={{ opacity: 0, x: rtlX(-50, isRTL) }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={sectionViewport}
                    transition={{ duration: 0.8, ease: easings.decelerate }}
                    style={{ y: imageY }}
                    className="w-[42%] xl:w-[40%] shrink-0"
                >
                    <div className="relative w-full aspect-[3/4] max-h-[70vh] overflow-hidden shadow-2xl rounded-3xl">
                        <Image
                            src="/me/2.jpeg"
                            alt={personalInfo.name}
                            fill
                            sizes="(max-width: 1200px) 50vw, 40vw"
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            priority
                        />

                        {/* Gradient Overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 100%)'
                            }}
                        />

                    </div>
                </motion.div>

                {/* ── Text Column ── */}
                <div className="w-[58%] xl:w-[60%] flex flex-col justify-center min-h-0">
                    {/* Section Header */}
                    <motion.h2
                        variants={sectionHeader}
                        initial="hidden"
                        whileInView="visible"
                        viewport={sectionViewport}
                        className="title-section font-bold leading-tight mb-6"
                        style={{ color: 'var(--foreground)' }}
                    >
                        {t('about.title') || 'Who am I?'}
                    </motion.h2>

                    {/* Bio Paragraphs */}
                    <motion.div
                        variants={sectionContent}
                        initial="hidden"
                        whileInView="visible"
                        viewport={sectionViewport}
                    >
                        <motion.div
                            variants={staggerContainer(0.15)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={sectionViewport}
                            className="space-y-5 text-lg leading-relaxed"
                        >
                            <motion.p variants={staggerItem} style={{ color: 'var(--muted-foreground)' }}>
                                {personalInfo.bioParagraph1}
                            </motion.p>
                            <motion.p variants={staggerItem} style={{ color: 'var(--muted-foreground)' }}>
                                {personalInfo.bioParagraph2}
                            </motion.p>
                        </motion.div>

                        {/* Animated Frameworks + Statistics */}
                        <motion.div variants={staggerItem} className="mt-8">
                            <AnimatedFrameworks />
                            <div className="-mt-1">
                                <AboutStatistics />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ── Poetry Verse ── */}
            <div ref={poetryRef} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" dir="rtl">
                {/* Stars */}
                {POETRY_STARS.map((star, i) => {
                    const s = star.wave === 1
                        ? { scale: starsScale1, opacity: starsOpacity1 }
                        : star.wave === 2
                            ? { scale: starsScale2, opacity: starsOpacity2 }
                            : { scale: starsScale3, opacity: starsOpacity3 };
                    return (
                        <motion.svg
                            key={i}
                            className={`absolute pointer-events-none${i % 2 === 0 ? ' hidden lg:block' : ''}`}
                            style={{
                                top: star.top,
                                left: star.left,
                                width: `clamp(${Math.round(star.size * 0.45)}px, ${(star.size / 14).toFixed(1)}vw, ${star.size}px)`,
                                height: `clamp(${Math.round(star.size * 0.45)}px, ${(star.size / 14).toFixed(1)}vw, ${star.size}px)`,
                                scale: s.scale,
                                opacity: s.opacity,
                            }}
                            viewBox="0 0 24 24"
                            fill={star.color === 'primary' ? 'var(--primary)' : 'var(--foreground)'}
                        >
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                        </motion.svg>
                    );
                })}

                <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 w-full px-4">
                    <motion.p
                        className="font-bold text-center whitespace-nowrap select-none"
                        style={{
                            x: poetryX1,
                            opacity: poetryOpacity1,
                            fontFamily: 'var(--font-marhey)',
                            fontSize: 'clamp(2rem, 6vw, 6rem)',
                            color: 'var(--foreground)',
                        }}
                    >
                        إذا غامرتَ في شرفٍ مرومِ
                    </motion.p>

                    <motion.div
                        className="flex items-center gap-3"
                        style={{ opacity: poetryOpacity2 }}
                    >
                        <div className="h-px w-12 sm:w-20" style={{ backgroundColor: 'var(--primary)' }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                        <div className="h-px w-12 sm:w-20" style={{ backgroundColor: 'var(--primary)' }} />
                    </motion.div>

                    <motion.p
                        className="font-bold text-center whitespace-nowrap select-none"
                        style={{
                            x: poetryX2,
                            opacity: poetryOpacity2,
                            fontFamily: 'var(--font-marhey)',
                            fontSize: 'clamp(2rem, 6vw, 6rem)',
                            color: 'var(--primary)',
                        }}
                    >
                        فلا تقنعْ بما دونَ النجومِ
                    </motion.p>

                    <motion.span
                        className="text-sm sm:text-base mt-4"
                        style={{
                            opacity: poetryOpacity2,
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-marhey)',
                        }}
                    >
                        — المتنبي
                    </motion.span>
                </div>
            </div>
        </section>
    );
}

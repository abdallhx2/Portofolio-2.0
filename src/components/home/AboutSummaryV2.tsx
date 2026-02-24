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

        </section>
    );
}

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from '@/context/ThemeContext';
import { getColorScheme } from '@/data/colors';

const VERSE_FIRST = 'إذا غامرتَ في شرفٍ مرومِ';
const VERSE_SECOND = 'فلا تقنعْ بما دونَ النجومِ';

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

export function PoetryScrollSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { colorScheme } = useTheme();

    // Forced dark mode vars
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

    // Scroll-linked progress — compressed so everything settles before mid-scroll
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Timeline: 0.5 = section fully in viewport (bottom at viewport bottom)
    // First hemistich — slides from right, settles before second starts
    const poetryX1 = useTransform(scrollYProgress, [0.10, 0.30], ['100vw', '0vw']);
    const poetryOpacity1 = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);

    // Second hemistich — slides from left, completes exactly at 0.50
    const poetryX2 = useTransform(scrollYProgress, [0.25, 0.50], ['-100vw', '0vw']);
    const poetryOpacity2 = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

    // Divider — appears between the two verses
    const dividerOpacity = useTransform(scrollYProgress, [0.28, 0.40], [0, 1]);

    // Attribution — after second verse settles
    const attributionOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);

    // Stars — all together, synced with second hemistich entry → completion
    const starsScale = useTransform(scrollYProgress, [0.25, 0.50], [0, 1]);
    const starsOpacity = useTransform(scrollYProgress, [0.25, 0.40], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-dvh z-10 overflow-hidden flex items-center justify-center"
            style={forceDarkVars}
            dir="rtl"
        >
            {/* Stars */}
            {POETRY_STARS.map((star, i) => (
                <motion.svg
                    key={i}
                    className={`absolute pointer-events-none${i % 2 === 0 ? ' hidden lg:block' : ''}`}
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `clamp(${Math.round(star.size * 0.45)}px, ${(star.size / 14).toFixed(1)}vw, ${star.size}px)`,
                        height: `clamp(${Math.round(star.size * 0.45)}px, ${(star.size / 14).toFixed(1)}vw, ${star.size}px)`,
                        scale: starsScale,
                        opacity: starsOpacity,
                    }}
                    viewBox="0 0 24 24"
                    fill={star.color === 'primary' ? 'var(--primary)' : 'var(--foreground)'}
                >
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                </motion.svg>
            ))}

            {/* Verses */}
            <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 w-full px-4">
                {/* First hemistich */}
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
                    {VERSE_FIRST}
                </motion.p>

                {/* Decorative divider */}
                <motion.div
                    className="flex items-center gap-3"
                    style={{ opacity: dividerOpacity }}
                >
                    <div className="h-px w-12 sm:w-20" style={{ backgroundColor: 'var(--primary)' }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                    <div className="h-px w-12 sm:w-20" style={{ backgroundColor: 'var(--primary)' }} />
                </motion.div>

                {/* Second hemistich */}
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
                    {VERSE_SECOND}
                </motion.p>

                {/* Attribution */}
                <motion.span
                    className="text-sm sm:text-base mt-4"
                    style={{
                        opacity: attributionOpacity,
                        color: 'var(--muted-foreground)',
                        fontFamily: 'var(--font-marhey)',
                    }}
                >
                    — المتنبي
                </motion.span>
            </div>
        </section>
    );
}

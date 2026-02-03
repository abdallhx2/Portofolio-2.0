'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
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

export function AboutSummary() {
    const { t, isRTL } = useLanguage();
    const { personalInfo } = useTranslatedData();
    const sectionRef = useRef<HTMLElement>(null);

    // Scroll-linked parallax for the image
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section
            ref={sectionRef}
            className="h-svh lg:h-screen overflow-clip sticky top-0 z-10 rounded-t-3xl"
            style={{ backgroundColor: 'var(--background)' }}
        >
            <div className="container-unified w-full h-full flex flex-col lg:flex-row items-center justify-evenly lg:justify-center gap-2 sm:gap-4 lg:gap-16 py-4 sm:py-6 lg:py-0">

                    {/* Image Column — compact banner on mobile, tall portrait on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: rtlX(-60, isRTL) }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={sectionViewport}
                        transition={{ duration: 0.8, ease: easings.decelerate }}
                        style={{ y: imageY }}
                        className="w-full lg:w-[45%] lg:shrink-0"
                    >
                        <div className="relative w-full aspect-[5/2] sm:aspect-[3/1] lg:aspect-[4/5] max-h-[25svh] sm:max-h-[28svh] lg:max-h-none rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/me/2.jpeg"
                                alt={personalInfo.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />

                            {/* Gradient Overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)'
                                }}
                            />

                            {/* Quote Card Overlay — desktop only */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={sectionViewport}
                                transition={{ delay: 0.3, duration: 0.6, ease: easings.smooth }}
                                className="hidden lg:block absolute bottom-6 inset-x-6 z-10"
                            >
                                <div
                                    className="p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.90)',
                                    }}
                                >
                                    <p className="text-lg font-medium italic leading-relaxed mb-3 text-gray-800">
                                        &ldquo;{personalInfo.poetryQuote}&rdquo;
                                    </p>
                                    <cite className="text-sm font-semibold not-italic block text-end text-gray-600">
                                        &mdash; {personalInfo.poetryAuthor}
                                    </cite>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text Column */}
                    <div className="w-full lg:w-[55%] flex flex-col justify-center min-h-0">
                        {/* Section Header */}
                        <motion.h2
                            variants={sectionHeader}
                            initial="hidden"
                            whileInView="visible"
                            viewport={sectionViewport}
                            className="title-section font-bold leading-tight mb-2 sm:mb-3 lg:mb-8"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {t('about.title') || 'Who am I?'}
                        </motion.h2>

                        {/* Section Content */}
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
                                className="space-y-2 sm:space-y-3 lg:space-y-6 text-sm sm:text-base lg:text-xl leading-relaxed"
                            >
                                <motion.p
                                    variants={staggerItem}
                                    style={{ color: 'var(--muted-foreground)' }}
                                >
                                    {personalInfo.bioParagraph1}
                                </motion.p>
                                <motion.p
                                    variants={staggerItem}
                                    style={{ color: 'var(--muted-foreground)' }}
                                >
                                    {personalInfo.bioParagraph2}
                                </motion.p>
                            </motion.div>

                            {/* Animated Frameworks + Statistics */}
                            <motion.div
                                variants={staggerItem}
                                className="mt-3 sm:mt-4 lg:mt-12"
                            >
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

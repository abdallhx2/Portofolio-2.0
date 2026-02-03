'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';

function useCountUp(target: number, duration = 1.8, inView = false) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!inView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, inView]);

    return count;
}

interface StatItemProps {
    target: number;
    label: string;
    inView: boolean;
    index: number;
}

function StatItem({ target, label, inView, index }: StatItemProps) {
    const count = useCountUp(target, 1.8, inView);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center text-center gap-0.5"
        >
            <span
                className="text-xl sm:text-2xl lg:text-4xl tracking-tight font-bold"
                style={{
                    color: 'var(--foreground)',
                    fontFamily: "Georgia, 'Times New Roman', serif",
                }}
            >
                +{count}
            </span>
            <span
                className="text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                style={{ color: 'var(--muted-foreground)' }}
            >
                {label}
            </span>
        </motion.div>
    );
}

export function AboutStatistics() {
    const { t } = useLanguage();
    const { statistics } = useTranslatedData();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    const statsList = [
        {
            value: statistics.yearsExperience,
            label: t('home.stats.experience') || 'Years Experience'
        },
        {
            value: statistics.projectsCompleted,
            label: t('home.stats.projects') || 'Projects Completed'
        },
        {
            value: statistics.happyClients,
            label: t('home.stats.clients') || 'Happy Clients'
        },
        {
            value: statistics.awardsWon,
            label: t('home.stats.awards') || 'Awards Won'
        }
    ];

    return (
        <div ref={ref} className="w-full pt-1 sm:pt-3 flex justify-center">
            <div className="inline-grid grid-cols-4 gap-x-4 sm:gap-x-8 lg:gap-x-10">
                {statsList.map((stat, index) => (
                    <StatItem
                        key={index}
                        target={stat.value}
                        label={stat.label}
                        inView={inView}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

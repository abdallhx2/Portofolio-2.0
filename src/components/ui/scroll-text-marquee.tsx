'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'motion/react';

interface ScrollBaseAnimationProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
  delay?: number;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export default function ScrollBaseAnimation({
  children,
  baseVelocity = 3,
  className = '',
  delay = 0
}: ScrollBaseAnimationProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const [repetitions, setRepetitions] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // تتبع الرؤية
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // حساب التكرارات مع debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const calculateRepetitions = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / contentWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    const debouncedCalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateRepetitions, 150);
    };

    calculateRepetitions();
    window.addEventListener('resize', debouncedCalculate);
    return () => {
      window.removeEventListener('resize', debouncedCalculate);
      clearTimeout(timeoutId);
    };
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = useRef<number>(1);

  // الحركة فقط عندما يكون العنصر مرئياً
  useAnimationFrame((t, delta) => {
    // إيقاف الحركة إذا لم يكن مرئياً
    if (!isVisible) return;
    if (delay > 0 && t < delay) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      ref={containerRef}
    >
      <motion.div
        className={`inline-flex ${className}`}
        style={{
          x,
          willChange: isVisible ? 'transform' : 'auto'
        }}
      >
        {Array.from({ length: repetitions }).map((_, i) => (
          <div key={i} className="inline-flex items-center" ref={i === 0 ? contentRef : null}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Icon Marquee Component
interface IconMarqueeProps {
  icons: Array<{ name: string; icon: React.ComponentType<{ size?: number; className?: string }> }>;
  baseVelocity?: number;
  iconSize?: number;
  iconClassName?: string;
  gap?: number;
  className?: string;
}

export function IconMarquee({
  icons,
  baseVelocity = 2,
  iconSize = 32,
  iconClassName = '',
  gap = 12,
  className = ''
}: IconMarqueeProps) {
  return (
    <ScrollBaseAnimation baseVelocity={baseVelocity} className={className}>
      <div className="flex items-center">
        {icons.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex-shrink-0"
            title={item.name}
            style={{ paddingLeft: `${gap}px`, paddingRight: `${gap}px` }}
          >
            {React.createElement(item.icon, {
              size: iconClassName ? undefined : iconSize,
              className: iconClassName
            })}
          </div>
        ))}
      </div>
    </ScrollBaseAnimation>
  );
}

// Dual Icon Marquee - Two rows scrolling in opposite directions
interface DualIconMarqueeProps {
  icons: Array<{ name: string; icon: React.ComponentType<{ size?: number; className?: string }> }>;
  baseVelocity?: number;
  iconSize?: number;
  iconClassName?: string;
  gap?: number;
  className?: string;
}

export function DualIconMarquee({
  icons,
  baseVelocity = 2,
  iconSize = 40,
  iconClassName = '',
  gap = 16,
  className = ''
}: DualIconMarqueeProps) {
  // ترتيب الأيقونات أبجدياً
  const sortedIcons = [...icons].sort((a, b) => a.name.localeCompare(b.name));

  // Split icons into two rows
  const midPoint = Math.ceil(sortedIcons.length / 2);
  const topRow = sortedIcons.slice(0, midPoint);
  const bottomRow = sortedIcons.slice(midPoint);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Row - Scrolls in one direction */}
      <ScrollBaseAnimation baseVelocity={-baseVelocity}>
        <div className="flex items-center" style={{ gap: `${gap * 2}px` }}>
          {topRow.map((item, index) => (
            <div
              key={`top-${item.name}-${index}`}
              className="flex-shrink-0"
              style={{ padding: `0 ${gap}px`, color: 'var(--muted-foreground)' }}
              title={item.name}
            >
              {React.createElement(item.icon, {
                size: iconClassName ? undefined : iconSize,
                className: iconClassName
              })}
            </div>
          ))}
        </div>
      </ScrollBaseAnimation>

      {/* Bottom Row - Scrolls in opposite direction */}
      <ScrollBaseAnimation baseVelocity={baseVelocity}>
        <div className="flex items-center" style={{ gap: `${gap * 2}px` }}>
          {bottomRow.map((item, index) => (
            <div
              key={`bottom-${item.name}-${index}`}
              className="flex-shrink-0"
              style={{ padding: `0 ${gap}px`, color: 'var(--muted-foreground)' }}
              title={item.name}
            >
              {React.createElement(item.icon, {
                size: iconClassName ? undefined : iconSize,
                className: iconClassName
              })}
            </div>
          ))}
        </div>
      </ScrollBaseAnimation>
    </div>
  );

}

// Text & Icon Marquee - Displays both icon and text
interface TextIconMarqueeProps {
  icons: Array<{ name: string; icon: React.ComponentType<{ size?: number; className?: string }> }>;
  baseVelocity?: number;
  iconSize?: number;
  iconClassName?: string;
  textClassName?: string;
  gap?: number | string;
  className?: string;
}

export function TextIconMarquee({
  icons,
  baseVelocity = 2,
  iconSize = 32,
  iconClassName = '',
  textClassName = 'text-xl',
  gap = 32,
  className = ''
}: TextIconMarqueeProps) {
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;
  return (
    <ScrollBaseAnimation baseVelocity={baseVelocity} className={className}>
      <div className="flex items-center">
        {icons.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center flex-shrink-0"
            style={{ paddingLeft: gapValue, paddingRight: gapValue }}
          >
            {React.createElement(item.icon, {
              size: iconClassName ? undefined : iconSize,
              className: iconClassName || 'mr-3'
            })}
            <span className={`font-bold uppercase tracking-wider ${textClassName}`} style={{ color: 'var(--foreground)' }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </ScrollBaseAnimation>
  );
}

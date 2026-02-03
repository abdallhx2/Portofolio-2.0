'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'motion/react';
import { wrap } from '@motionone/utils';

interface ScrollTextProps {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
}

export function ScrollText({
  children,
  baseVelocity = -5,
  className = '',
  scrollDependent = false,
  delay = 0,
}: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  // تتبع الرؤية لإيقاف الحركة عندما لا يكون العنصر مرئياً
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

  useAnimationFrame((t, delta) => {
    // إيقاف الحركة إذا لم يكن مرئياً
    if (!isVisible) return;

    // Apply delay
    if (delay > 0 && t < delay) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap flex flex-nowrap"
    >
      <motion.div
        className={`flex whitespace-nowrap flex-nowrap ${className}`}
        style={{
          x,
          willChange: isVisible ? 'transform' : 'auto'
        }}
      >
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
      </motion.div>
    </div>
  );
}

// Bidirectional variant that scrolls in opposite directions
export function ScrollTextBidirectional({
  text1,
  text2,
  baseVelocity = 5,
  className = '',
  scrollDependent = true,
}: {
  text1: string;
  text2: string;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ScrollText
        baseVelocity={baseVelocity}
        className={className}
        scrollDependent={scrollDependent}
      >
        {text1}
      </ScrollText>
      <ScrollText
        baseVelocity={-baseVelocity}
        className={className}
        scrollDependent={scrollDependent}
      >
        {text2}
      </ScrollText>
    </div>
  );
}

export default ScrollText;

'use client';

import React, { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, motion } from 'motion/react';
import Image from 'next/image';

export interface StickyScrollContent {
  title: string;
  description: string;
  image?: string;
}

interface StickyScrollRevealProps {
  content: StickyScrollContent[];
  stickyImage?: string;
  stickyImageAlt?: string;
  isRTL?: boolean;
  stickyOverlay?: React.ReactNode;
}

export function StickyScrollReveal({
  content,
  stickyImage,
  stickyImageAlt = '',
  isRTL = false,
  stickyOverlay,
}: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end start'],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const currentImage = content[activeCard]?.image || stickyImage;
  const firstImage = content[0]?.image || stickyImage;

  return (
    <div ref={containerRef}>
      {/* ── Mobile: Hero image at the top, full width ── */}
      {firstImage && (
        <div className="lg:hidden w-full mb-6">
          <div
            className="relative w-full aspect-[3/4] overflow-hidden"
          >
            <Image
              src={firstImage}
              alt={stickyImageAlt || content[0]?.title || ''}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Overlay content below mobile image */}
          {stickyOverlay && (
            <div className="px-4 -mt-8 relative z-10">{stickyOverlay}</div>
          )}
        </div>
      )}

      {/* ── Desktop: Side-by-side sticky layout ── */}
      <motion.div
        className="relative flex justify-between gap-8 lg:gap-14 p-4 sm:p-6 lg:p-10"
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        {/* ── Scrolling Side: Text Content ── */}
        <div className="relative flex flex-1 items-start">
          <div className="w-full">
            {content.map((item, index) => (
              <div
                key={index}
                className="min-h-[40vh] lg:min-h-[60vh] flex flex-col justify-center py-8 lg:py-14"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors duration-300"
                    style={{
                      backgroundColor: activeCard === index ? 'var(--primary)' : 'var(--primary-soft)',
                      color: activeCard === index ? 'white' : 'var(--primary)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div
                    className="h-px flex-1 transition-colors duration-300"
                    style={{
                      backgroundColor: activeCard === index ? 'var(--primary)' : 'var(--border)',
                    }}
                  />
                </div>

                {/* Title */}
                <motion.h3
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight transition-opacity duration-300"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-base sm:text-lg leading-relaxed max-w-xl transition-opacity duration-300"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {item.description}
                </motion.p>
              </div>
            ))}

            {/* Bottom spacer */}
            <div className="h-[30vh]" />
          </div>
        </div>

        {/* ── Sticky Side: Photo (desktop only) ── */}
        <div className="hidden lg:block lg:w-[45%] xl:w-[40%]">
          <div className="sticky top-24">
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow effect */}
              <div
                className="absolute -inset-3 rounded-3xl opacity-20 blur-2xl transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--info))',
                }}
              />

              {/* Photo container */}
              <div
                className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border-2"
                style={{ borderColor: 'var(--primary)' }}
              >
                {currentImage && (
                  <Image
                    src={currentImage}
                    alt={stickyImageAlt}
                    fill
                    className="object-cover transition-all duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                )}

                {/* Gradient overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
                  }}
                />
              </div>

              {/* Overlay content below image */}
              {stickyOverlay && (
                <div className="mt-5">{stickyOverlay}</div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default StickyScrollReveal;

'use client';

/**
 * نسخة ui-layouts من Stacking Cards
 * مبنية على: https://www.ui-layouts.com/components/stacking-card
 * مع تعديلات للتوافق مع المشروع
 */

import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

interface CardData {
  id: number | string;
  title: string;
  description: string;
  image: string;
  link?: string;
  color: string;
}

interface UILayoutsStackingCardsProps {
  cards: CardData[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function UILayoutsStackingCards({
  cards,
  title,
  subtitle,
  className = ''
}: UILayoutsStackingCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={container}
      className={`relative ${className}`}
      style={{
        marginLeft: 'calc(-50vw + 50%)',
        width: '100vw',
        backgroundColor: 'var(--background)'
      }}
    >
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="h-[50vh] w-full flex items-center justify-center px-4">
          <div className="max-w-3xl mx-auto text-center">
            {title && (
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-base lg:text-lg opacity-70"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Cards Section - ui-layouts style */}
      <div className="relative">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <UILayoutsCard
              key={card.id}
              card={card}
              index={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Bottom Spacer */}
      <div className="h-[20vh]" />
    </section>
  );
}

// مكون البطاقة بأسلوب ui-layouts
interface UILayoutsCardProps {
  card: CardData;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function UILayoutsCard({ card, index, progress, range, targetScale }: UILayoutsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: card.color,
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="relative -top-[5%] h-[450px] sm:h-[500px] w-[90%] sm:w-[80%] max-w-4xl rounded-2xl overflow-hidden origin-top shadow-2xl"
      >
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row h-full">

          {/* Left: Content */}
          <div className="w-full lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            {/* Step Number */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-6"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white'
              }}
            >
              0{index + 1}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {card.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              {card.description}
            </p>

            {/* Link */}
            {card.link && (
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
              >
                <span className="underline underline-offset-4">See more</span>
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 22 12"
                  fill="none"
                  className="transform group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-[55%] h-48 lg:h-full relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ scale: imageScale }}
            >
              <Image
                fill
                src={card.image}
                alt={card.title}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </motion.div>

            {/* Gradient overlay for text readability on mobile */}
            <div
              className="absolute inset-0 lg:hidden"
              style={{
                background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)'
              }}
            />
          </div>
        </div>

        {/* Border Effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
          }}
        />
      </motion.div>
    </div>
  );
}

export default UILayoutsStackingCards;

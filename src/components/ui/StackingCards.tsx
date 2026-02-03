'use client';

import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

interface CardData {
  id: number;
  title: string;
  description: string;
  duration: string;
  image: string;
  color: string;
}

interface StackingCardsProps {
  cards: CardData[];
  title?: string;
  subtitle?: string;
}

export function StackingCards({ cards, title, subtitle }: StackingCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div className="relative w-screen" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
      <div ref={container} className="relative">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="h-[40vh] w-full flex items-center justify-center px-4">
            <div className="max-w-3xl mx-auto text-center">
              {title && (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className="text-sm sm:text-base opacity-70"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Cards Container */}
        <div
          className="relative"
          style={{ height: `${(cards.length + 1) * 100}vh` }}
        >
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            {cards.map((card, i) => (
              <StackingCard
                key={card.id}
                card={card}
                index={i}
                total={cards.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ مكون منفصل للبطاقة - الآن Hooks تُستدعى بشكل صحيح
interface StackingCardProps {
  card: CardData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function StackingCard({ card, index, total, progress }: StackingCardProps) {
  const start = index / total;
  const end = (index + 1) / total;

  // ✅ Hooks في المستوى الأعلى من المكون
  const scale = useTransform(
    progress,
    [start, end],
    [1, 1 - (total - index) * 0.05]
  );

  const y = useTransform(
    progress,
    [start - 0.1, start, end],
    [100, 0, -index * 40]
  );

  const opacity = useTransform(
    progress,
    [start - 0.15, start, end - 0.1, end],
    [0, 1, 1, index === total - 1 ? 1 : 0.6]
  );

  const imageScale = useTransform(
    progress,
    [start, end],
    [1.15, 1]
  );

  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        zIndex: total - index,
      }}
      className="absolute h-[450px] sm:h-[500px] lg:h-[550px] w-[92%] sm:w-[88%] max-w-5xl rounded-3xl overflow-hidden shadow-2xl"
    >
      <div
        style={{ backgroundColor: card.color }}
        className="relative h-full w-full rounded-3xl overflow-hidden"
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <Image
            fill
            src={card.image}
            alt={card.title}
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)'
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          {/* Top: Step Number & Duration */}
          <div className="flex items-center justify-between">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {index + 1}
            </div>
            <span
              className="text-sm sm:text-base font-medium px-4 py-2 rounded-full backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {card.duration}
            </span>
          </div>

          {/* Bottom: Title & Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-white">
              {card.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/85 max-w-2xl">
              {card.description}
            </p>
          </div>
        </div>

        {/* Border Glow */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    </motion.div>
  );
}

export default StackingCards;

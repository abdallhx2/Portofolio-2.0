'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { GlareCard } from '@/components/ui/glare-card';
import { useLanguage } from '@/context/LanguageContext';

interface CardData {
  title: string;
  description: string;
  icon: string;
  color: string;
  index: number;
}

interface StackingCardsProps {
  cards: CardData[];
  className?: string;
}

export function StackingCards({ cards, className = '' }: StackingCardsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { isRTL } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Layout - Simple Timeline (unchanged)
  if (isMobile) {
    return (
      <div className={`px-4 pb-12 ${className}`}>
        <div className="relative max-w-lg mx-auto">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{
              background: `linear-gradient(to bottom, ${cards[0]?.color}, ${cards[cards.length - 1]?.color})`
            }}
          />

          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start mb-8 last:mb-0"
            >
              {/* Timeline Dot with Icon */}
              <div
                className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: card.color }}
              >
                <div className="w-6 h-6 relative">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
              </div>

              {/* Content Card */}
              <div className="ml-4 flex-1">
                <GlareCard>
                  <div
                    className="p-4 rounded-2xl border shadow-lg"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: `${card.color}30`,
                      boxShadow: `0 4px 20px ${card.color}10`
                    }}
                  >
                    {/* Step Number Badge */}
                    <div
                      className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold text-white mb-3"
                      style={{ backgroundColor: card.color }}
                    >
                      {index + 1}
                    </div>

                    <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--foreground)' }}>
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {card.description}
                    </p>
                  </div>
                </GlareCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Layout - 2x Bigger Sizes
  const rotations = ['rotate-2', '-rotate-1', 'rotate-1', '-rotate-2'];

  return (
    <section
      className={`stacking-cards-section relative ${className}`}
    >
      <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between px-8 lg:px-16 xl:px-20 max-w-[2200px] mx-auto`}>

        {/* Cards Column */}
        <div className="grid gap-4 flex-1">
          {cards.map((card, index) => (
            <figure
              key={index}
              className="sticky h-screen grid place-content-center"
              style={{ top: `${index * 50}px` }}
            >
              <GlareCard className={`${rotations[index % rotations.length]}`}>
                <article
                  className="stack-card-height w-[90vw] max-w-3xl xl:max-w-4xl rounded-3xl card-padding grid place-content-start gap-6 lg:gap-8 relative overflow-hidden"
                  style={{ backgroundColor: card.color }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-6">
                    {/* Step Number */}
                    <div className="step-badge flex items-center justify-center rounded-2xl font-bold bg-white/20 text-white">
                      0{index + 1}
                    </div>
                    <div className="h-1 flex-1 bg-white/30 max-w-[100px] lg:max-w-[120px]" />
                    {/* Icon */}
                    <div className="relative w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        className="object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="title-card text-white">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="text-body text-white/90 leading-relaxed max-w-2xl">
                    {card.description}
                  </p>

                  {/* Decorative Icon */}
                  <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 opacity-15">
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48">
                      <Image
                        src={card.icon}
                        alt=""
                        fill
                        className="object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                  </div>
                </article>
              </GlareCard>
            </figure>
          ))}
        </div>

        {/* Sticky Title Column */}
        <div className={`sticky top-0 h-screen hidden lg:grid place-content-center w-72 xl:w-80 2xl:w-96 ${isRTL ? 'pr-8 xl:pr-12' : 'pl-8 xl:pl-12'}`}>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h2
              className="title-section leading-tight mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              {isRTL ? (
                <>
                  كيف نحوّل
                  <br />
                  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    فكرتك لواقع؟
                  </span>
                </>
              ) : (
                <>
                  How We Turn
                  <br />
                  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    Ideas Into Reality
                  </span>
                </>
              )}
            </h2>
            <p className="text-subtitle max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
              {isRTL
                ? 'رحلة تطوير مشروعك من البداية للنهاية'
                : 'Your project development journey from start to finish'
              }
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Spacer */}
      <div className="h-[30vh]" />
    </section>
  );
}

export default StackingCards;

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import {
  ArrowRight,
  ArrowLeft,
  Briefcase
} from 'lucide-react';

interface StorySlide {
  id: string;
  year: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  image: string;
}

export function AboutHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const yearRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { isRTL, language } = useLanguage();
  const { statistics } = useTranslatedData();

  // Story slides - Your journey
  const storySlides: StorySlide[] = useMemo(() => [
    {
      id: 'beginning',
      year: '2016',
      titleAr: 'البداية',
      titleEn: 'THE BEGINNING',
      contentAr: 'بدأت رحلتي مع سطر كود واحد، وفضول لا ينتهي. لم أكن أعلم أن تلك اللحظة ستغير مسار حياتي.',
      contentEn: 'My journey began with a single line of code and endless curiosity. I didn\'t know that moment would change the course of my life.',
      image: '/me/1.jpg',
    },
    {
      id: 'learning',
      year: '2016-2020',
      titleAr: 'التعلّم',
      titleEn: 'LEARNING',
      contentAr: 'في أروقة جامعة أم القرى، اكتشفت أن البرمجة ليست مجرد كود - إنها فن حل المشكلات، وهندسة الأفكار.',
      contentEn: 'In the halls of Umm Al-Qura University, I discovered that programming is not just code - it\'s the art of problem-solving and engineering ideas.',
      image: '/me/learning.jpg',
    },
    {
      id: 'experience',
      year: '2020-2023',
      titleAr: 'التجربة',
      titleEn: 'EXPERIENCE',
      contentAr: 'من مشاريع صغيرة إلى أنظمة متكاملة. كل مشروع كان درساً، وكل فشل كان خطوة للأمام. بنيت، وهدمت، وأعدت البناء.',
      contentEn: 'From small projects to integrated systems. Every project was a lesson, every failure a step forward. I built, demolished, and rebuilt.',
      image: '/me/experience.jpg',
    },
    {
      id: 'mastery',
      year: '2023-2024',
      titleAr: 'الإتقان',
      titleEn: 'MASTERY',
      contentAr: 'الآن أهندس المستقبل. أبني أنظمة ذكية، أُطوّع نماذج الذكاء الاصطناعي، وأحوّل الأفكار المعقدة إلى تجارب بسيطة.',
      contentEn: 'Now I engineer the future. I build intelligent systems, harness AI models, and transform complex ideas into simple experiences.',
      image: '/me/mastery.jpg',
    },
    {
      id: 'future',
      year: '2025+',
      titleAr: 'المستقبل',
      titleEn: 'THE FUTURE',
      contentAr: '',
      contentEn: '',
      image: '/me/1.jpg',
    },
  ], []);

  const stats = [
    {
      value: statistics?.yearsExperience || 5,
      suffix: '+',
      labelAr: 'سنوات الخبرة',
      labelEn: 'Years',
    },
    {
      value: statistics?.projectsCompleted || 57,
      suffix: '+',
      labelAr: 'مشروع',
      labelEn: 'Projects',
    },
    {
      value: statistics?.happyClients || 76,
      suffix: '+',
      labelAr: 'عميل',
      labelEn: 'Clients',
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const container = containerRef.current;
    const section = sectionRef.current;

    if (!container || !section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

      // Calculate translation
      const totalSlides = storySlides.length;
      const translateX = progress * (totalSlides - 1) * 100;

      // Apply transform
      container.style.transform = `translateX(calc(-${translateX}vw))`;

      // Animate year text - moves OPPOSITE direction to content
      const segmentLength = 1 / totalSlides;
      yearRefs.current.forEach((yearEl, i) => {
        if (!yearEl) return;
        const segmentStart = i * segmentLength;
        const segmentProgress = (progress - segmentStart) / segmentLength;
        // Year moves RIGHT (opposite to content which moves LEFT)
        const yearX = -500 + (segmentProgress * 1000);
        yearEl.style.transform = `translateX(${yearX}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMounted, storySlides.length]);

  if (!isMounted) {
    return (
      <section className="py-20 text-center">
        <div className="animate-pulse" style={{ color: 'var(--muted-foreground)' }}>
          {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </div>
      </section>
    );
  }

  return (
    <section className="relative" dir="ltr">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
          style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
        >
          <Briefcase className="w-4 h-4" />
          <span>{language === 'ar' ? 'قصتي' : 'My Story'}</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ color: 'var(--foreground)' }}
        >
          {language === 'ar' ? 'رحلة عبر ' : 'A Journey Through '}
          <span style={{ color: 'var(--primary)' }}>
            {language === 'ar' ? 'الزمن' : 'Time'}
          </span>
        </h2>

        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-4"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {language === 'ar'
            ? 'من فضول طفل إلى مهندس يبني المستقبل'
            : 'From a curious child to an engineer building the future'}
        </p>

        <div className="flex justify-center items-center gap-2 animate-bounce">
          <ArrowRight className="w-5 h-5 rotate-90" style={{ color: 'var(--primary)' }} />
          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {language === 'ar' ? 'مرر للاستكشاف' : 'Scroll to explore'}
          </span>
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <section ref={sectionRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Slides Container */}
          <div
            ref={containerRef}
            className="flex h-full items-center"
            style={{
              width: `calc(${storySlides.length * 100}vw)`,
              paddingLeft: '50vw',
              paddingRight: '50vw',
              marginLeft: '-50vw'
            }}
          >
            {storySlides.map((slide, index) => (
              <div
                key={slide.id}
                className="h-full flex-shrink-0 w-screen flex flex-col justify-center items-center overflow-hidden relative px-4 sm:px-8"
              >
                {/* Year - Top, Doubled Size, Opposite Movement */}
                <span
                  ref={(el) => { yearRefs.current[index] = el; }}
                  className="absolute top-16 sm:top-20 text-[140px] sm:text-[170px] lg:text-[200px] font-black pointer-events-none select-none"
                  style={{
                    color: 'var(--primary)',
                    opacity: 0.12,
                  }}
                >
                  {slide.year}
                </span>

                {/* Content - Centered vertically */}
                <div
                  className="relative z-10 w-full max-w-6xl mx-auto"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {slide.id !== 'future' ? (
                    /* Story Slides */
                    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 h-full">
                      {/* Image - Responsive to viewport height */}
                      <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="relative aspect-square w-[60vw] max-w-[500px] sm:w-[45vw] lg:w-[40vh] lg:h-[40vh] xl:w-[50vh] xl:h-[50vh] overflow-hidden">
                          <Image
                            src={slide.image}
                            alt={language === 'ar' ? slide.titleAr : slide.titleEn}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="w-full lg:w-1/2 text-center lg:text-start">
                        {/* Title */}
                        <h3
                          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {language === 'ar' ? slide.titleAr : slide.titleEn}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-base sm:text-lg lg:text-xl leading-relaxed"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {language === 'ar' ? slide.contentAr : slide.contentEn}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Future/Stats Slide */
                    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 h-full">
                      {/* Image - Responsive to viewport height */}
                      <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="relative aspect-square w-[60vw] max-w-[500px] sm:w-[45vw] lg:w-[40vh] lg:h-[40vh] xl:w-[50vh] xl:h-[50vh] overflow-hidden">
                          <Image
                            src={slide.image}
                            alt={language === 'ar' ? slide.titleAr : slide.titleEn}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Stats Content */}
                      <div className="w-full lg:w-1/2 text-center lg:text-start space-y-6">
                        {/* Title */}
                        <h3
                          className="text-3xl sm:text-4xl lg:text-5xl font-bold"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {language === 'ar' ? slide.titleAr : slide.titleEn}
                        </h3>

                        {/* Stats */}
                        <div className="flex justify-center lg:justify-start gap-8">
                          {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                              <div
                                className="text-3xl sm:text-4xl font-bold tabular-nums"
                                style={{ color: 'var(--primary)' }}
                              >
                                {stat.value}{stat.suffix}
                              </div>
                              <div
                                className="text-sm mt-1"
                                style={{ color: 'var(--muted-foreground)' }}
                              >
                                {language === 'ar' ? stat.labelAr : stat.labelEn}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Closing Quote */}
                        <p
                          className="text-lg sm:text-xl italic"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {language === 'ar'
                            ? '"والرحلة لم تنتهِ بعد..."'
                            : '"And the journey continues..."'}
                        </p>

                        {/* CTA */}
                        <Link
                          href="/about"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all hover:scale-105"
                          style={{ backgroundColor: 'var(--primary)' }}
                        >
                          {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                          {isRTL ? (
                            <ArrowLeft className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default AboutHorizontalScroll;

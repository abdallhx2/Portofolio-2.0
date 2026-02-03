'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  sectionViewport,
  sectionHeader,
  sectionContentScale,
} from '@/lib/motion';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  tags: string[];
  image: string;
  year: number;
  client: string;
  url?: string;
  github?: string;
}

interface FeaturedProjectsSectionProps {
  projects: Project[];
  t: (key: string) => string;
}

export function FeaturedProjectsSection({ projects, t }: FeaturedProjectsSectionProps) {
  const { isRTL } = useLanguage();
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [handleNext]);

  // Deterministic rotation values per project to avoid hydration mismatch
  const rotations = useMemo(
    () => projects.map((_, i) => ((i * 7 + 3) % 21) - 10),
    [projects]
  );

  const currentProject = projects[active];

  if (!projects.length) return null;

  return (
    <section className="section-unified" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container-unified">
        <motion.div
          variants={sectionContentScale}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: 'clamp(2.5rem, 1rem + 4vw, 5rem)' }}>

            {/* Text Side - appears RIGHT in RTL, LEFT in LTR */}
            <div className="flex flex-col justify-between order-1 md:order-1" style={{ minHeight: 'clamp(400px, 350px + 5vw, 450px)' }}>

              {/* Section Title */}
              <motion.div
                variants={sectionHeader}
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
              >
                <h2
                  className="title-section mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  {t('home.featuredWork.title') || (isRTL ? 'الأعمال المميزة' : 'Featured Work')}
                </h2>
                <p className="text-subtitle" style={{ color: 'var(--muted-foreground)', marginBottom: 'clamp(1.5rem, 1rem + 1vw, 2rem)' }}>
                  {t('home.featuredWork.description') || (isRTL ? 'عرض لأحدث مشاريعي والمساعي الإبداعية' : 'A showcase of my latest projects and creative endeavors')}
                </p>
              </motion.div>

              {/* Project Info - Animated */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-1 flex flex-col"
                >
                  {/* Category & Year */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground, #fff)',
                      }}
                    >
                      {currentProject.category}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {currentProject.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold mb-3"
                    style={{ color: 'var(--foreground)', fontSize: 'clamp(1.65rem, 1.2rem + 0.8vw, 1.875rem)' }}
                  >
                    {currentProject.title}
                  </h3>

                  {/* Description with word-by-word blur animation */}
                  <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)', fontSize: 'clamp(1.075rem, 0.95rem + 0.3vw, 1.125rem)' }}>
                    {currentProject.shortDescription.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ filter: 'blur(8px)', opacity: 0, y: 4 }}
                        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeInOut',
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProject.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-full font-medium border"
                        style={{
                          borderColor: 'var(--border)',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--secondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <Link
                    href={`/projects/${currentProject.id}`}
                    className="group inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:gap-3"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground, #fff)',
                    }}
                  >
                    <span>{t('home.featuredWork.projectLabel') || (isRTL ? 'عرض المشروع' : 'View Project')}</span>
                    <ExternalLink size={14} className="transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="group/btn flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--foreground)',
                  }}
                  aria-label={isRTL ? 'التالي' : 'Previous'}
                >
                  <IconArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/btn:rotate-12" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/btn flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--foreground)',
                  }}
                  aria-label={isRTL ? 'السابق' : 'Next'}
                >
                  <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:-rotate-12" />
                </button>

                {/* Counter */}
                <span
                  className="text-sm font-medium tabular-nums"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>

                {/* Progress dots */}
                <div className="flex gap-1.5 ms-auto">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActive(index)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: index === active ? '24px' : '8px',
                        backgroundColor: index === active ? 'var(--primary)' : 'var(--border)',
                      }}
                      aria-label={`${isRTL ? 'مشروع' : 'Project'} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Image Side - appears LEFT in RTL, RIGHT in LTR */}
            <div className="order-2 md:order-2">
              <div className="relative w-full" style={{ height: 'clamp(350px, 250px + 12vw, 450px)' }}>
                <AnimatePresence>
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.image}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: rotations[index],
                      }}
                      animate={{
                        opacity: index === active ? 1 : 0.7,
                        scale: index === active ? 1 : 0.95,
                        z: index === active ? 0 : -100,
                        rotate: index === active ? 0 : rotations[index],
                        zIndex: index === active ? 40 : projects.length + 2 - index,
                        y: index === active ? [0, -80, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        z: 100,
                        rotate: rotations[index],
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <div
                        className="h-full w-full rounded-3xl overflow-hidden border shadow-lg"
                        style={{
                          borderColor: 'var(--border)',
                          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          draggable={false}
                          className="h-full w-full object-cover object-center"
                        />

                        {/* Overlay gradient at bottom */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl"
                          style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                          }}
                        />

                        {/* Floating client badge */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span
                            className="text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.15)',
                              color: '#fff',
                            }}
                          >
                            {project.client}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

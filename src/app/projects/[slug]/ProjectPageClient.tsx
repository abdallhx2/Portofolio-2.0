'use client';

import { ProjectTranslation, projectsTranslations } from '@/data/projects-translations';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { sectionHeader, sectionContent, sectionViewport, staggerContainer, staggerItem, fadeInUp, fadeInScale, easings } from '@/lib/motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Target, Lightbulb, Trophy, ExternalLink, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';

// Check if image is a placeholder/coming soon
const isComingSoonImage = (imagePath: string) => {
  return imagePath.includes('coming-soon') || imagePath === '/images/coming-soon.jpg';
};

interface ProjectPageClientProps {
  project: ProjectTranslation;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const { t, isRTL, language } = useLanguage();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const allProjects = projectsTranslations[language];
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const otherProjects = allProjects
    .filter(p => p.id !== project.id)
    .slice(0, 3);

  const handlePrevGalleryImage = () => {
    setActiveGalleryIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };

  const handleNextGalleryImage = () => {
    setActiveGalleryIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'} style={{ background: 'var(--background)' }}>
      {/* Content Wrapper - Medium Width Template */}
      <div className="max-w-5xl mx-auto" style={{ padding: '0 var(--section-px)' }}>

        {/* Project Hero — back + actions + image merged */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easings.decelerate }}
          className="pb-6"
          style={{ paddingTop: 'var(--section-py)' }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="relative aspect-[2/1] sm:aspect-[16/9]">
              {isComingSoonImage(project.image) ? (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <ImageOff
                    size={64}
                    className="mb-3 opacity-30"
                    style={{ color: 'var(--muted-foreground)' }}
                  />
                  <span
                    className="text-body font-medium opacity-50"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {isRTL ? 'الصور قيد الرفع' : 'Images Coming Soon'}
                  </span>
                </div>
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: isComingSoonImage(project.image)
                    ? 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.3) 100%)',
                }}
              />

              {/* Top bar: Back + Action links */}
              <div className="absolute top-0 left-0 right-0 p-4 md:p-5 flex items-center justify-between">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium backdrop-blur-md transition-all hover:scale-105"
                  style={{ background: 'rgba(0,0,0,0.35)', color: 'white' }}
                >
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  {t('projects.allProjects') || 'All Projects'}
                </Link>

                <div className="flex items-center gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium backdrop-blur-md transition-all hover:scale-105"
                      style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{t('common.viewLive')}</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium backdrop-blur-md transition-all hover:scale-105"
                      style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{t('common.viewCode')}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom: Title + meta */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-body-sm px-2.5 py-0.5 rounded-full font-medium backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                    {project.category}
                  </span>
                  <span className="text-body-sm text-white/70">{project.year}</span>
                  {project.client && (
                    <>
                      <span className="text-white/40">·</span>
                      <span className="text-body-sm text-white/70">{project.client}</span>
                    </>
                  )}
                  {project.duration && (
                    <>
                      <span className="text-white/40">·</span>
                      <span className="text-body-sm text-white/70">{project.duration}</span>
                    </>
                  )}
                </div>
                <h1 className="title-section-sm text-white">{project.title}</h1>
              </div>
            </div>
          </div>

          {/* Technologies — below image */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-body-sm px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Overview */}
        <div className="pb-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={sectionContent}
          >
            <h2 className="title-section-sm mb-3" style={{ color: 'var(--foreground)' }}>
              {t('projects.overview')}
            </h2>
            <p className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {project.description}
            </p>
          </motion.div>
        </div>

        {/* Challenge / Solution / Result */}
        <div className="pb-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer()}
            className="grid md:grid-cols-3 gap-4"
          >
            <motion.div
              variants={staggerItem}
              className="section-glass-dark rounded-xl"
              style={{ padding: 'clamp(0.875rem, 2.5vw, 1.5rem)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'var(--primary-soft)' }}>
                <Target className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="text-body font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {t('projects.challenge')}
              </h3>
              <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="section-glass-dark rounded-xl"
              style={{ padding: 'clamp(0.875rem, 2.5vw, 1.5rem)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'var(--primary-soft)' }}>
                <Lightbulb className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="text-body font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {t('projects.solution')}
              </h3>
              <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {project.solution}
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="section-glass-dark rounded-xl"
              style={{ padding: 'clamp(0.875rem, 2.5vw, 1.5rem)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'var(--primary-soft)' }}>
                <Trophy className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="text-body font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {t('projects.results')}
              </h3>
              <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {project.result}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && !isComingSoonImage(project.gallery[0]) && (
          <div className="pb-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={sectionHeader}
            >
              <h2 className="title-section-sm mb-6" style={{ color: 'var(--foreground)' }}>{t('projects.gallery')}</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={sectionContent}
              className="space-y-4"
            >
              {/* Main Image - Constrained */}
              <div className="relative rounded-xl overflow-hidden section-glass-dark max-h-[380px]">
                <div className="relative aspect-[16/9] max-h-[380px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGalleryIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={project.gallery[activeGalleryIndex]}
                        alt={`${project.title} - Gallery ${activeGalleryIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {project.gallery.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevGalleryImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={handleNextGalleryImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 text-white text-body-sm">
                    {activeGalleryIndex + 1} / {project.gallery.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {project.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {project.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveGalleryIndex(index)}
                      className={`relative flex-shrink-0 w-[100px] aspect-[16/9] rounded-lg overflow-hidden transition-all hover:scale-105 ${
                        activeGalleryIndex === index ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        '--tw-ring-color': activeGalleryIndex === index ? 'var(--primary)' : 'transparent',
                        '--tw-ring-offset-color': 'var(--background)',
                      } as React.CSSProperties}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <div className="pb-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={fadeInScale}
              className="section-glass-dark rounded-xl"
              style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}
            >
              <div className="text-4xl mb-4" style={{ color: 'var(--primary)' }}>&#10077;</div>
              <p className="text-body leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
                {project.testimonial.text}
              </p>
              <div>
                <p className="text-body font-bold" style={{ color: 'var(--foreground)' }}>
                  {project.testimonial.author}
                </p>
                <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {project.testimonial.role} &bull; {project.testimonial.company}
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="pb-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={sectionHeader}
            >
              <h2 className="title-section-sm mb-6" style={{ color: 'var(--foreground)' }}>{t('projects.title')}</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={staggerContainer()}
              className="grid md:grid-cols-3 gap-4"
            >
              {otherProjects.map((otherProject) => (
                <motion.div key={otherProject.id} variants={staggerItem}>
                  <Link
                    href={`/projects/${otherProject.id}`}
                    className="block section-glass-dark rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all"
                  >
                    <div className="relative aspect-video">
                      {isComingSoonImage(otherProject.image) ? (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ backgroundColor: 'var(--background)' }}
                        >
                          <ImageOff
                            size={32}
                            className="mb-1 opacity-30"
                            style={{ color: 'var(--muted-foreground)' }}
                          />
                          <span
                            className="text-body-sm opacity-50"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            {isRTL ? 'قيد الرفع' : 'Coming Soon'}
                          </span>
                        </div>
                      ) : (
                        <Image src={otherProject.image} alt={otherProject.title} fill className="object-cover" />
                      )}
                    </div>
                    <div style={{ padding: 'clamp(0.75rem, 2vw, 1rem)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-body-sm px-2 py-0.5 rounded-full" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                          {otherProject.category}
                        </span>
                      </div>
                      <h3 className="text-body font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                        {otherProject.title}
                      </h3>
                      <p className="text-body-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                        {otherProject.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Prev/Next Navigation */}
        <div style={{ paddingBottom: 'var(--section-py)' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeInUp}
            className="flex items-center justify-between gap-4"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="section-glass flex-1 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}
              >
                <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--muted-foreground)' }}>
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  <span className="text-body-sm">{t('common.previous') || 'Previous'}</span>
                </div>
                <h3 className="text-body font-semibold" style={{ color: 'var(--foreground)' }}>
                  {prevProject.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="section-glass flex-1 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all text-right"
                style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}
              >
                <div className="flex items-center justify-end gap-2 mb-1" style={{ color: 'var(--muted-foreground)' }}>
                  <span className="text-body-sm">{t('common.next') || 'Next'}</span>
                  {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
                <h3 className="text-body font-semibold" style={{ color: 'var(--foreground)' }}>
                  {nextProject.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}

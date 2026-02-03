'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Filter, LayoutGrid, List, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import {
  easings,
} from '@/lib/motion';

type ViewMode = 'grid' | 'list';

export default function ProjectsPage() {
  const { t, isRTL } = useLanguage();
  const { projectCategories, getProjectsByCategory } = useTranslatedData();
  const [activeCategory, setActiveCategory] = useState(projectCategories[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredProjects = getProjectsByCategory(activeCategory);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projectCategories.forEach((cat: string) => {
      counts[cat] = getProjectsByCategory(cat).length;
    });
    return counts;
  }, [projectCategories, getProjectsByCategory]);

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto" style={{ padding: '0 var(--section-px)' }}>

        {/* Header */}
        <div style={{ paddingTop: 'var(--section-py)' }} className="pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easings.decelerate }}
          >
            <h1 className="title-section mb-2" style={{ color: 'var(--foreground)' }}>
              {t('projects.title')}
            </h1>
            <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
              {t('projects.description')}
            </p>
          </motion.div>
        </div>

        {/* Filter + View Toggle */}
        <div className="pb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: easings.decelerate }}
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              {projectCategories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="relative px-4 py-2 rounded-lg text-body-sm font-medium transition-all hover:scale-[1.02]"
                  style={{
                    color: activeCategory === category ? 'white' : 'var(--foreground)',
                  }}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'var(--primary)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {activeCategory !== category && (
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {category}
                    <span className="opacity-60">({categoryCounts[category] || 0})</span>
                  </span>
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div
              className="flex items-center gap-1 p-1 rounded-lg flex-shrink-0"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <button
                onClick={() => setViewMode('grid')}
                className="p-2 rounded-md transition-all"
                style={{
                  backgroundColor: viewMode === 'grid' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : 'var(--muted-foreground)',
                }}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="p-2 rounded-md transition-all"
                style={{
                  backgroundColor: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : 'var(--muted-foreground)',
                }}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Projects */}
        <div style={{ paddingBottom: 'var(--section-py)' }}>
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              /* ── Grid / Bento View ── */
              <motion.div
                key={`grid-${activeCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
              >
                {filteredProjects.map((project, index) => {
                  const isWide = index % 4 === 0;
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 25, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.06, duration: 0.35, ease: easings.smooth }}
                      className={isWide ? 'md:col-span-2' : ''}
                    >
                      <Link
                        href={`/projects/${project.id}`}
                        className="group block h-full overflow-hidden rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg"
                        style={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {/* Image */}
                        <div className={`relative overflow-hidden ${isWide ? 'aspect-[2.2/1]' : 'aspect-video'}`}>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                            }}
                          />
                          {project.featured && (
                            <div
                              className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                            >
                              <Star size={11} />
                              {t('common.featured')}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-body font-semibold line-clamp-1" style={{ color: 'var(--foreground)' }}>
                              {project.title}
                            </h3>
                            <span
                              className="text-body-sm px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
                            >
                              {project.category}
                            </span>
                          </div>

                          <p className="text-body-sm line-clamp-2 mb-3" style={{ color: 'var(--muted-foreground)' }}>
                            {project.shortDescription}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {project.tags.slice(0, 3).map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-body-sm px-2 py-0.5 rounded-md"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  color: 'var(--muted-foreground)',
                                  border: '1px solid var(--border)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-body-sm px-1" style={{ color: 'var(--primary)' }}>
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                            <span
                              className="flex-1 text-center text-body-sm font-medium py-2 rounded-lg"
                              style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                            >
                              {t('common.viewDetails')}
                            </span>
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-lg transition-all hover:scale-110"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  color: 'var(--muted-foreground)',
                                  border: '1px solid var(--border)',
                                }}
                                title={t('common.viewLive')}
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-lg transition-all hover:scale-110"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  color: 'var(--muted-foreground)',
                                  border: '1px solid var(--border)',
                                }}
                                title={t('common.viewCode')}
                              >
                                <FaGithub size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* ── List View ── */
              <motion.div
                key={`list-${activeCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: isRTL ? 25 : -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.35, ease: easings.smooth }}
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="group flex flex-col sm:flex-row overflow-hidden rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {/* Image */}
                      <div className="relative sm:w-[280px] flex-shrink-0 aspect-video sm:aspect-auto overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {project.featured && (
                          <div
                            className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                          >
                            <Star size={11} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col" style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-body font-semibold" style={{ color: 'var(--foreground)' }}>
                            {project.title}
                          </h3>
                          <span
                            className="text-body-sm px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
                          >
                            {project.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-body-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>
                          <span>{project.client}</span>
                          <span>·</span>
                          <span>{project.year}</span>
                        </div>

                        <p className="text-body-sm line-clamp-2 mb-3 flex-1" style={{ color: 'var(--muted-foreground)' }}>
                          {project.shortDescription}
                        </p>

                        {/* Tags + Actions */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 4).map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-body-sm px-2 py-0.5 rounded-md"
                                style={{
                                  backgroundColor: 'var(--background)',
                                  color: 'var(--muted-foreground)',
                                  border: '1px solid var(--border)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-lg transition-all hover:scale-110"
                                style={{ color: 'var(--muted-foreground)' }}
                                title={t('common.viewLive')}
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-lg transition-all hover:scale-110"
                                style={{ color: 'var(--muted-foreground)' }}
                                title={t('common.viewCode')}
                              >
                                <FaGithub size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="mb-4 opacity-30">
                <Filter size={48} className="mx-auto" style={{ color: 'var(--muted-foreground)' }} />
              </div>
              <h3 className="text-body font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                {t('projects.noProjectsFound')}
              </h3>
              <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                {t('projects.noProjectsDesc')}
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

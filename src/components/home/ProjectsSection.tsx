'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  staggerContainer,
  staggerItemScale,
  easings,
  sectionViewport,
  sectionHeader,
  sectionHeaderLink,
  sectionContentScale,
} from '@/lib/motion';

interface Project {
  id: string;
  title: string;
  client: string;
  year: number;
  category: string;
  shortDescription: string;
  image: string;
  featured?: boolean;
  tags: string[];
  url?: string;
  github?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  language: string;
  t: (key: string) => string;
}

export function ProjectsSection({ projects, t }: ProjectsSectionProps) {
  const { isRTL } = useLanguage();
  const displayedProjects = projects.slice(0, 6);

  return (
    <section className="section-unified section-glass" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container-unified">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 md:mb-12 px-2">
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            <h2 className="title-section mb-3" style={{ color: 'var(--foreground)' }}>
              {t('home.projects.title') || (isRTL ? 'المشاريع الأخيرة' : 'Recent Projects')}
            </h2>
            <p className="text-subtitle" style={{ color: 'var(--muted-foreground)' }}>
              {t('home.projects.description') || (isRTL ? 'استكشف أحدث أعمالي والحلول الإبداعية' : 'Explore my recent work and creative solutions')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionHeaderLink}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            <Link href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary whitespace-nowrap px-4 py-2 rounded-full"
              style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
              <span>{t('common.viewAll') || (isRTL ? 'عرض الكل' : 'View All')}</span>
              <ArrowRight size={16} className={`transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </Link>
          </motion.div>
        </div>

        {/* Staggered Bento Grid */}
        <motion.div
          variants={sectionContentScale}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
        <motion.div
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-border rounded-3xl overflow-hidden border border-border/50 shadow-sm"
          style={{ backgroundColor: 'var(--border)' }}
        >
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItemScale}
              transition={{ duration: 0.5, ease: easings.smooth }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group relative flex flex-col h-full bg-card overflow-hidden hover:z-10"
                style={{ backgroundColor: 'var(--card)' }}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Chip */}
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md"
                      style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#000' }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 md:p-8 transition-colors group-hover:bg-accent/5">
                  <div className="flex items-center justify-between mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                    <span>{project.client}</span>
                    <span className="flex items-center gap-1">
                      {project.year}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-3 line-clamp-1 group-hover:text-primary transition-colors"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-sm line-clamp-2 mb-6 flex-1"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Footer / Tags */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="text-xs px-2 py-1 text-muted-foreground">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className={`p-2 rounded-full bg-secondary text-secondary-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground ${isRTL ? 'rotate-180' : ''}`}>
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

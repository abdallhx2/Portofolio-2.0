'use client';

import { projectsTranslations, ProjectTranslation } from '@/data/projects-translations';
import ProjectPageClient from './ProjectPageClient';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { language, t, isRTL } = useLanguage();
  const [project, setProject] = useState<ProjectTranslation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(({ slug }) => {
      const projects = projectsTranslations[language];
      const foundProject = projects.find(p => p.id === slug);

      if (foundProject) {
        setProject(foundProject);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    });
  }, [params, language]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div
          className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
          style={{ borderColor: 'var(--border)', borderTopColor: 'var(--primary)' }}
        />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <h1 className="title-section mb-4" style={{ color: 'var(--foreground)' }}>404</h1>
          <p className="text-body mb-8" style={{ color: 'var(--muted-foreground)' }}>
            {t('common.notFound') || 'Project not found'}
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-1"
            style={{ background: 'var(--primary)', color: 'white' }}
          >
            <ArrowLeft className="w-5 h-5" />
            {t('projects.allProjects') || 'All Projects'}
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectPageClient project={project} />;
}

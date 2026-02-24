'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import {
  HeroSection,
  FeaturedProjectsSection,
  BlogSection,
  CTASection,
  AboutSummaryV2,
  ServicesBento,
  ContactDialogProvider,
  PoetryScrollSection,
} from '@/components/home';

export default function Home() {
  const { t, isRTL, language } = useLanguage();
  const { personalInfo, featuredProjects, featuredBlogPosts } = useTranslatedData();

  return (
    <ContactDialogProvider>
      <div className="min-h-screen -mt-20 lg:-mt-24">

        {/* Hero Section */}
        <HeroSection
          personalInfo={personalInfo}
          language={language}
          isRTL={isRTL}
          t={t}
        />

        {/* About Me - Story Section */}
        <AboutSummaryV2 />

        {/* Poetry Verse - Full Page */}
        <PoetryScrollSection />

        {/* Everything after About — single wrapper scrolls over the sticky About */}
        <div className="relative z-20 rounded-t-3xl" style={{ backgroundColor: 'var(--section-bg)' }}>
          <ServicesBento />

          <FeaturedProjectsSection
            projects={featuredProjects}
            t={t}
          />

          <BlogSection
            posts={featuredBlogPosts}
            language={language}
            t={t}
          />

          <CTASection />
        </div>

      </div>
    </ContactDialogProvider>
  );
}

'use client';

import { blogPostsTranslations, BlogPostTranslation } from '@/data/blog-translations';
import BlogPostClient from './BlogPostClient';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { language, t, isRTL } = useLanguage();
  const [post, setPost] = useState<BlogPostTranslation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(({ slug }) => {
      const posts = blogPostsTranslations[language];
      const foundPost = posts.find(p => p.slug === slug || p.id === slug);

      if (foundPost) {
        setPost(foundPost);
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

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <h1 className="title-section mb-4" style={{ color: 'var(--foreground)' }}>404</h1>
          <p className="text-body mb-8" style={{ color: 'var(--muted-foreground)' }}>
            {t('common.notFound') || 'Post not found'}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:-translate-y-1"
            style={{ background: 'var(--primary)', color: 'white' }}
          >
            <ArrowLeft className="w-5 h-5" />
            {t('blog.backToBlog') || 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  return <BlogPostClient post={post} />;
}

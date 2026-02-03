'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Clock, Calendar, ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  sectionViewport,
  sectionHeader,
  sectionHeaderLink,
  sectionContentScale,
  fadeInUp,
  easings,
} from '@/lib/motion';

interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  featured?: boolean;
  publishedAt: string;
  readingTime?: string;
  readTime?: number;
  author: string | { name: string };
  tags?: string[];
  views?: number;
  likes?: number;
}

interface BlogSectionProps {
  posts: BlogPost[];
  language: string;
  t: (key: string) => string;
}

export function BlogSection({ posts, language, t }: BlogSectionProps) {
  const { isRTL } = useLanguage();
  const displayedPosts = posts.slice(0, 4);
  const heroPost = displayedPosts[0];
  const sidePosts = displayedPosts.slice(1);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(
      language === 'ar' ? 'ar-EG' : 'en-US',
      { day: 'numeric', month: 'long', year: 'numeric' }
    );

  const getReadTime = (post: BlogPost) =>
    post.readingTime || (post.readTime ? `${post.readTime} ${isRTL ? 'دقائق' : 'min'}` : `4 ${isRTL ? 'دقائق' : 'min'}`);

  const getAuthorName = (author: string | { name: string }) =>
    typeof author === 'string' ? author : author.name;

  if (!heroPost) return null;

  return (
    <section className="section-unified" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container-unified">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4" style={{ marginBottom: 'clamp(2.5rem, 1.5rem + 2vw, 3.5rem)' }}>
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            <h2 className="title-section mb-3" style={{ color: 'var(--foreground)' }}>
              {t('home.blog.title') || (isRTL ? 'أحدث المقالات' : 'Latest Articles')}
            </h2>
            <p className="text-subtitle" style={{ color: 'var(--muted-foreground)' }}>
              {t('home.blog.description') || (isRTL ? 'أفكار ورؤى حول التطوير' : 'Thoughts and insights on development')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionHeaderLink}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 whitespace-nowrap px-5 py-2.5 rounded-full"
              style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}
            >
              <span>{t('home.blog.viewAll') || (isRTL ? 'عرض الكل' : 'View All')}</span>
              <ArrowRight size={16} className={`transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
            </Link>
          </motion.div>
        </div>

        {/* Blog Content */}
        <motion.div
          variants={sectionContentScale}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          {/* Single post or multiple posts layout */}
          {sidePosts.length === 0 ? (
            /* Single Hero Post - Full width editorial card */
            <HeroCard post={heroPost} language={language} isRTL={isRTL} formatDate={formatDate} getReadTime={getReadTime} getAuthorName={getAuthorName} />
          ) : (
            /* Multiple Posts - Hero + Side list */
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Hero Post - Takes 3 cols */}
              <div className="lg:col-span-3">
                <HeroCard post={heroPost} language={language} isRTL={isRTL} formatDate={formatDate} getReadTime={getReadTime} getAuthorName={getAuthorName} />
              </div>

              {/* Side Posts - Takes 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {sidePosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    transition={{ duration: 0.5, ease: easings.smooth, delay: 0.1 * (index + 1) }}
                  >
                    <SideCard post={post} language={language} getReadTime={getReadTime} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Hero Card ─── */
function HeroCard({
  post,
  isRTL,
  formatDate,
  getReadTime,
  getAuthorName,
}: {
  post: BlogPost;
  language: string;
  isRTL: boolean;
  formatDate: (d: string) => string;
  getReadTime: (p: BlogPost) => string;
  getAuthorName: (a: string | { name: string }) => string;
}) {
  return (
    <Link
      href={`/blog/${post.slug || post.id}`}
      className="group relative flex flex-col md:flex-row h-full rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Image */}
      <div className="relative w-full md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[380px] overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--secondary)' }}
          >
            <BookOpen size={48} style={{ color: 'var(--muted-foreground)' }} />
          </div>
        )}

        {/* Category floating badge */}
        <div className="absolute top-4 start-4">
          <span
            className="px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-md"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground, #fff)',
            }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center w-full md:w-1/2" style={{ padding: 'clamp(1.5rem, 1rem + 1.5vw, 2.5rem)' }}>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {formatDate(post.publishedAt)}
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: 'var(--border)' }}
          />
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {getReadTime(post)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold mb-4 leading-tight transition-colors duration-300 group-hover:text-primary"
          style={{ color: 'var(--foreground)', fontSize: 'clamp(1.4rem, 1rem + 1vw, 1.875rem)' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="leading-relaxed mb-6 line-clamp-3"
          style={{ color: 'var(--muted-foreground)', fontSize: 'clamp(0.9375rem, 0.85rem + 0.2vw, 1rem)' }}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
            {getAuthorName(post.author)}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300"
            style={{ color: 'var(--primary)' }}
          >
            {isRTL ? 'اقرأ المقال' : 'Read Article'}
            <ArrowUpRight
              size={15}
              className={`transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Side Card ─── */
function SideCard({
  post,
  language,
  getReadTime,
}: {
  post: BlogPost;
  language: string;
  getReadTime: (p: BlogPost) => string;
}) {
  return (
    <Link
      href={`/blog/${post.slug || post.id}`}
      className="group flex gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 rounded-lg overflow-hidden w-[clamp(6.5rem,5.5rem+1vw,7rem)] h-[clamp(6.5rem,5.5rem+1vw,7rem)]">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--secondary)' }}
          >
            <BookOpen size={20} style={{ color: 'var(--muted-foreground)' }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <span
          className="text-xs font-semibold mb-1.5"
          style={{ color: 'var(--primary)' }}
        >
          {post.category}
        </span>
        <h4
          className="font-bold line-clamp-2 mb-2 leading-snug transition-colors duration-300 group-hover:text-primary"
          style={{ color: 'var(--foreground)', fontSize: 'clamp(0.9375rem, 0.85rem + 0.2vw, 1rem)' }}
        >
          {post.title}
        </h4>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.publishedAt).toLocaleDateString(
              language === 'ar' ? 'ar-EG' : 'en-US',
              { day: 'numeric', month: 'short' }
            )}
          </span>
          <span
            className="w-0.5 h-0.5 rounded-full"
            style={{ backgroundColor: 'var(--muted-foreground)' }}
          />
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {getReadTime(post)}
          </span>
        </div>
      </div>
    </Link>
  );
}

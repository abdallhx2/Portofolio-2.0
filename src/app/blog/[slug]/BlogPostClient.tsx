'use client';

import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import { useState } from 'react';
import { easings } from '@/lib/motion';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string | { name: string };
  publishedAt: string;
  readingTime?: string;
  readTime?: number;
  image?: string;
  views?: number;
  likes?: number;
}

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { t, language, isRTL } = useLanguage();
  const { blogPosts: translatedBlogPosts } = useTranslatedData();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const authorName = typeof post.author === 'string' ? post.author : post.author.name;

  const relatedPosts = translatedBlogPosts
    .filter(p => (p.id !== post.id && p.slug !== post.slug) && p.category === post.category)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'gregory'
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--background)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto" style={{ padding: '0 var(--section-px)' }}>

        {/* Blog Hero — back + actions + image + meta merged */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.decelerate }}
          className="pb-6"
          style={{ paddingTop: 'var(--section-py)' }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="relative aspect-[2/1] sm:aspect-[16/9]">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0.05) 100%)'
                  }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.3) 100%)',
                }}
              />

              {/* Top bar: Back + Actions */}
              <div className="absolute top-0 left-0 right-0 p-4 md:p-5 flex items-center justify-between">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium backdrop-blur-md transition-all hover:scale-105"
                  style={{ background: 'rgba(0,0,0,0.35)', color: 'white' }}
                >
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  {t('blog.backToBlog') || 'Back to Blog'}
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 rounded-lg backdrop-blur-md transition-all hover:scale-110"
                    style={{ background: isLiked ? 'var(--primary)' : 'rgba(0,0,0,0.35)', color: 'white' }}
                  >
                    <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="p-2 rounded-lg backdrop-blur-md transition-all hover:scale-110"
                    style={{ background: isBookmarked ? 'var(--primary)' : 'rgba(0,0,0,0.35)', color: 'white' }}
                  >
                    <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    className="p-2 rounded-lg backdrop-blur-md transition-all hover:scale-110"
                    style={{ background: 'rgba(0,0,0,0.35)', color: 'white' }}
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </div>

              {/* Bottom: Title + meta */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-body-sm px-2.5 py-0.5 rounded-full font-medium backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                    {post.category}
                  </span>
                  <span className="text-body-sm text-white/70 flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="text-body-sm text-white/70 flex items-center gap-1">
                    <Clock size={12} />
                    {post.readingTime || (post.readTime ? `${post.readTime} ${t('blog.minRead') || 'min'}` : '')}
                  </span>
                </div>
                <h1 className="title-section-sm text-white">{post.title}</h1>
              </div>
            </div>
          </div>

          {/* Tags — below image */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            {post.tags.slice(0, 6).map((tag: string) => (
              <span
                key={tag}
                className="text-body-sm px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Article Content */}
        <div className="pb-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: easings.decelerate }}
          >
            <div
              className="prose prose-lg dark:prose-invert max-w-none markdown-content rounded-xl"
              style={{
                backgroundColor: 'var(--card)',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                border: '1px solid var(--border)'
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({children}) => (
                    <h1 className="font-bold mt-8 mb-5 scroll-mt-20" style={{ fontSize: 'var(--text-section)', color: 'var(--foreground)' }}>
                      {children}
                    </h1>
                  ),
                  h2: ({children}) => (
                    <h2 className="font-bold mt-8 mb-4 scroll-mt-20" style={{ fontSize: 'var(--text-section-sm)', color: 'var(--foreground)' }}>
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="font-bold mt-6 mb-3 scroll-mt-20" style={{ fontSize: 'var(--text-card)', color: 'var(--foreground)' }}>
                      {children}
                    </h3>
                  ),
                  p: ({children}) => (
                    <p className="mb-4 leading-relaxed text-body" style={{ color: 'var(--foreground)' }}>
                      {children}
                    </p>
                  ),
                  ul: ({children}) => <ul className="space-y-2 list-disc pl-5 mb-4">{children}</ul>,
                  ol: ({children}) => <ol className="space-y-2 list-decimal pl-5 mb-4">{children}</ol>,
                  li: ({children}) => <li className="text-body" style={{ color: 'var(--foreground)' }}>{children}</li>,
                  blockquote: ({children}) => (
                    <blockquote
                      className="border-l-4 pl-4 py-3 mb-6 italic rounded-r-lg"
                      style={{
                        borderColor: 'var(--primary)',
                        backgroundColor: 'var(--primary-soft)',
                        color: 'var(--muted-foreground)'
                      }}
                    >
                      {children}
                    </blockquote>
                  ),
                  code: ({children, className}) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code
                          className="px-1.5 py-0.5 rounded text-body-sm font-mono"
                          style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className} style={{ color: 'var(--foreground)' }}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({children}) => (
                    <pre
                      className="p-4 rounded-lg overflow-x-auto mb-6 text-body-sm"
                      style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                    >
                      {children}
                    </pre>
                  ),
                  a: ({children, href}) => (
                    <a
                      href={href}
                      className="underline transition-colors font-medium"
                      style={{ color: 'var(--primary)' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({children}) => <strong className="font-semibold" style={{ color: 'var(--foreground)' }}>{children}</strong>,
                  em: ({children}) => <em className="italic" style={{ color: 'var(--foreground)' }}>{children}</em>,
                  img: ({src, alt}) => (
                    <div className="my-6 rounded-lg overflow-hidden">
                      <Image
                        src={typeof src === 'string' ? src : ''}
                        alt={alt || ''}
                        width={800}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  ),
                  table: ({children}) => (
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse" style={{ borderColor: 'var(--border)' }}>
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({children}) => (
                    <th className="border px-3 py-2 font-semibold text-left text-body-sm" style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--primary-soft)',
                      color: 'var(--foreground)'
                    }}>
                      {children}
                    </th>
                  ),
                  td: ({children}) => (
                    <td className="border px-3 py-2 text-body-sm" style={{
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)'
                    }}>
                      {children}
                    </td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>

        {/* Actions Bar */}
        <div className="pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: easings.decelerate }}
            className="section-glass-dark rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                {t('blog.wasHelpful') || 'Was this helpful?'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: isLiked ? 'var(--primary)' : 'var(--primary-soft)',
                    color: isLiked ? 'white' : 'var(--foreground)'
                  }}
                >
                  <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                  {t('common.like') || 'Like'}
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: isBookmarked ? 'var(--primary)' : 'var(--primary-soft)',
                    color: isBookmarked ? 'white' : 'var(--foreground)'
                  }}
                >
                  <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                  {t('common.bookmark') || 'Bookmark'}
                </button>
              </div>
            </div>

            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm font-medium transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            >
              <Share2 size={14} />
              {t('common.share') || 'Share'}
            </button>
          </motion.div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pb-8">
            <h2 className="title-section-sm mb-6" style={{ color: 'var(--foreground)' }}>
              {t('blog.relatedPosts') || 'Related Posts'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.08, ease: easings.smooth }}
                >
                  <Link
                    href={`/blog/${relatedPost.slug || relatedPost.id}`}
                    className="group block h-full overflow-hidden rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {relatedPost.image ? (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.05) 100%)'
                          }}
                        >
                          <span className="text-body font-medium" style={{ color: 'var(--primary)' }}>
                            {relatedPost.category}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="px-2.5 py-1 rounded-md text-body-sm font-medium backdrop-blur-md"
                          style={{
                            backgroundColor: 'var(--card)',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border)'
                          }}
                        >
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                      <div className="flex items-center justify-between mb-2 text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(relatedPost.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {relatedPost.readTime ? `${relatedPost.readTime} ${t('blog.minRead') || 'min'}` : ''}
                        </span>
                      </div>

                      <h3 className="text-body font-semibold line-clamp-2 mb-1" style={{ color: 'var(--foreground)' }}>
                        {relatedPost.title}
                      </h3>

                      <p className="text-body-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div style={{ paddingBottom: 'var(--section-py)' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: easings.decelerate }}
            className="flex items-center justify-between pt-6"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <Link
              href="/blog"
              className="section-glass inline-flex items-center gap-2 px-4 py-2 rounded-xl text-body-sm transition-all hover:-translate-y-0.5"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {isRTL ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
              {t('blog.allArticles') || 'All Articles'}
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-body-sm font-medium transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            >
              {t('blog.browseMore') || 'Browse More'}
              {isRTL ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

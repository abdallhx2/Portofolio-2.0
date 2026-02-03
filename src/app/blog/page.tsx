'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar, Search, Filter, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import { easings } from '@/lib/motion';

export default function BlogPage() {
  const { t, isRTL, language } = useLanguage();
  const { blogCategories, getBlogPostsByCategory } = useTranslatedData();
  const [activeCategory, setActiveCategory] = useState(blogCategories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = getBlogPostsByCategory(activeCategory).filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'gregory'
    });
  };

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
              {t('blog.title')}
            </h1>
            <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
              {t('blog.description')}
            </p>
          </motion.div>
        </div>

        {/* Search + Filters */}
        <div className="pb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: easings.decelerate }}
            className="flex flex-col gap-4"
          >
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  [isRTL ? 'right' : 'left']: '0.875rem',
                  color: 'var(--muted-foreground)'
                }}
              />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg text-body-sm transition-all focus:outline-none focus:ring-2"
                style={{
                  paddingLeft: isRTL ? '1rem' : '2.75rem',
                  paddingRight: isRTL ? '2.75rem' : '1rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  '--tw-ring-color': 'var(--primary-soft)',
                } as React.CSSProperties}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 -translate-y-1/2 p-1 rounded-md transition-all hover:scale-110"
                  style={{
                    [isRTL ? 'left' : 'right']: '0.625rem',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => (
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
                      layoutId="activeBlogFilter"
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
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Posts */}
        <div style={{ paddingBottom: 'var(--section-py)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 25, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.06, duration: 0.35, ease: easings.smooth }}
                >
                  <Link
                    href={`/blog/${post.slug || post.id}`}
                    className="group block h-full overflow-hidden rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.05) 100%)'
                          }}
                        >
                          <span className="text-body font-semibold" style={{ color: 'var(--primary)' }}>
                            {post.category}
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="px-2.5 py-1 rounded-md text-body-sm font-medium backdrop-blur-md"
                          style={{
                            backgroundColor: 'var(--card)',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border)'
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                      {/* Meta */}
                      <div className="flex items-center justify-between mb-2 text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} />
                          <span>{post.readTime} {t('blog.readTime')}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-body font-semibold mb-2 line-clamp-2" style={{ color: 'var(--foreground)' }}>
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-body-sm line-clamp-2 mb-3" style={{ color: 'var(--muted-foreground)' }}>
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
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
                      )}

                      {/* Footer */}
                      <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                        <span
                          className="flex-1 text-center text-body-sm font-medium py-2 rounded-lg"
                          style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                        >
                          {t('blog.readArticle')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="mb-4 opacity-30">
                <Filter size={48} className="mx-auto" style={{ color: 'var(--muted-foreground)' }} />
              </div>
              <h3 className="text-body font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                {t('blog.noPostsFound')}
              </h3>
              <p className="text-body-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                {t('blog.noPostsDesc')}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-body-sm px-4 py-2 rounded-lg font-medium inline-flex items-center gap-1.5"
                  style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                >
                  <X size={14} />
                  {t('blog.clearSearch') || 'Clear Search'}
                </button>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

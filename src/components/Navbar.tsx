'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const getNavigationItems = (t: (key: string) => string) => [
  { href: '/', label: t('nav.home') },
  { href: '/projects', label: t('nav.projects') },
  { href: '/blog', label: t('nav.blog') },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { t, language, setLanguage, isRTL } = useLanguage();
  const { themeMode, toggleTheme } = useTheme();

  const navigationItems = getNavigationItems(t);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActivePath = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          delay: 0.2
        }}
        className="fixed top-6 inset-x-0 max-w-2xl mx-auto z-50 hidden lg:block px-4"
      >
        <nav
          className={`rounded-full border shadow-lg flex items-center justify-between px-8 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Nav Links */}
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium cursor-pointer transition-opacity hover:opacity-80"
                style={{ color: isActivePath(item.href) ? 'var(--primary)' : 'var(--foreground)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary)';
                e.currentTarget.style.color = 'var(--muted-foreground)';
              }}
              title={themeMode === 'dark' ? t('theme.lightMode') || 'Light Mode' : t('theme.darkMode') || 'Dark Mode'}
            >
              {themeMode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 font-bold text-xs"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary)';
                e.currentTarget.style.color = 'var(--muted-foreground)';
              }}
              title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              {language === 'en' ? 'ع' : 'EN'}
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Navbar — same pill style as desktop */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="lg:hidden fixed top-3 inset-x-0 mx-auto z-50 px-3 max-w-md"
      >
        <nav
          className={`rounded-full border shadow-lg flex items-center justify-between px-4 py-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Nav Links as text */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium cursor-pointer transition-opacity hover:opacity-80"
                style={{ color: isActivePath(item.href) ? 'var(--primary)' : 'var(--foreground)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--muted-foreground)',
              }}
            >
              {language === 'en' ? 'ع' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--muted-foreground)',
              }}
            >
              {themeMode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </nav>
      </motion.div>
    </>
  );
}

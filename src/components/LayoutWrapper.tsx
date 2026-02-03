'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ReactNode, useEffect } from 'react';
import LayoutEnhancer from './LayoutEnhancer';
import ResponsiveHelper from './ResponsiveHelper';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isRTL, language } = useLanguage();

  useEffect(() => {
    // Direction is set by the inline script in layout.tsx on first load.
    // On language *change* (not first load), update the document attributes.
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // Layout: adjust main margin when sidebar is present
    let rafId: number;

    const updateLayout = () => {
      rafId = requestAnimationFrame(() => {
        const main = document.querySelector('main');
        const sidebar = document.querySelector('[data-sidebar]');

        if (main) {
          main.style.transition = 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

          if (window.innerWidth >= 1024 && sidebar) {
            const sidebarWidth = getComputedStyle(sidebar).width || '20rem';
            if (isRTL) {
              main.style.marginRight = sidebarWidth;
              main.style.marginLeft = '0';
            } else {
              main.style.marginLeft = sidebarWidth;
              main.style.marginRight = '0';
            }
          } else {
            main.style.marginLeft = '0';
            main.style.marginRight = '0';
          }
        }
      });
    };

    updateLayout();

    window.addEventListener('resize', updateLayout);
    window.addEventListener('orientationchange', updateLayout);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('orientationchange', updateLayout);
    };
  }, [language, isRTL]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)'
      }}
    >
      <LayoutEnhancer />
      <ResponsiveHelper className="min-h-screen">
        <div className="relative">
          {children}
        </div>
      </ResponsiveHelper>
    </div>
  );
}

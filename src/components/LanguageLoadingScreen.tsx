'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageLoadingScreen() {
  const { isLanguageChanging, language } = useLanguage();

  if (!isLanguageChanging) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div
        className="rounded-xl p-6 shadow-xl flex flex-col items-center gap-4 min-w-[200px]"
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Spinner */}
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-0 rounded-full border-[3px] border-t-transparent animate-spin"
            style={{ borderColor: 'var(--border)', borderTopColor: 'transparent' }}
          />
          <div
            className="absolute inset-0 rounded-full border-[3px] border-t-transparent animate-spin"
            style={{
              borderColor: 'transparent',
              borderTopColor: 'var(--primary)',
              animationDuration: '0.6s',
            }}
          />
        </div>

        {/* Language indicator */}
        <div className="flex items-center gap-3" dir="ltr">
          <span
            className="text-body-sm px-2.5 py-1 rounded-md font-medium transition-all"
            style={{
              backgroundColor: language === 'en' ? 'var(--primary)' : 'var(--background)',
              color: language === 'en' ? 'white' : 'var(--muted-foreground)',
            }}
          >
            EN
          </span>
          <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>⇄</span>
          <span
            className="text-body-sm px-2.5 py-1 rounded-md font-medium transition-all"
            style={{
              backgroundColor: language === 'ar' ? 'var(--primary)' : 'var(--background)',
              color: language === 'ar' ? 'white' : 'var(--muted-foreground)',
            }}
          >
            ع
          </span>
        </div>
      </div>
    </div>
  );
}

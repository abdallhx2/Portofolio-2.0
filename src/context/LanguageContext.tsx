'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Language } from '@/translations';

declare global {
  interface Window {
    __INITIAL_LANG__?: string;
    __INITIAL_THEME__?: string;
    __INITIAL_COLOR_SCHEME__?: string;
  }
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  isRTL: boolean;
  t: (key: string) => string;
  isLanguageChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Always start with 'en' for SSR/hydration consistency,
  // then sync to stored language in useEffect
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  // After hydration, sync to the stored language
  useEffect(() => {
    const stored =
      (window.__INITIAL_LANG__ as Language) ||
      (localStorage.getItem('language') as Language) ||
      'en';
    if (stored !== language) {
      setLanguage(stored);
      document.documentElement.dir = stored === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = stored;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = async (lang: Language) => {
    if (lang === language) return;

    setIsLanguageChanging(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }

    setTimeout(() => {
      setIsLanguageChanging(false);
    }, 300);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleLanguageChange,
        isRTL: language === 'ar',
        t,
        isLanguageChanging,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
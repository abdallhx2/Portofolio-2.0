'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorScheme, ThemeMode, applyColorScheme } from '@/data/colors';

interface ThemeContextType {
  colorScheme: ColorScheme;
  themeMode: ThemeMode;
  setColorScheme: (scheme: ColorScheme) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Start with defaults for SSR/hydration consistency
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  // After hydration, sync to stored values
  useEffect(() => {
    const storedScheme =
      (window.__INITIAL_COLOR_SCHEME__ as ColorScheme) ||
      (localStorage.getItem('colorScheme') as ColorScheme) ||
      'default';
    const storedMode =
      (window.__INITIAL_THEME__ as ThemeMode) ||
      (localStorage.getItem('themeMode') as ThemeMode) ||
      'dark';

    setColorScheme(storedScheme);
    setThemeMode(storedMode);
    applyColorScheme(storedScheme, storedMode);

    if (storedMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Apply on subsequent changes
  useEffect(() => {
    applyColorScheme(colorScheme, themeMode);

    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorScheme, themeMode]);

  const handleColorSchemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('colorScheme', scheme);
      applyColorScheme(scheme, themeMode);
    }
  };

  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
      applyColorScheme(colorScheme, mode);

      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    handleThemeModeChange(newMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        themeMode,
        setColorScheme: handleColorSchemeChange,
        setThemeMode: handleThemeModeChange,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

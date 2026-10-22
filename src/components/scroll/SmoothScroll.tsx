'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** يرجع نسخة Lenis الحالية (أو null عند تفعيل تقليل الحركة) */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * تمرير ناعم على مستوى الموقع كامل، مربوط بـ GSAP ScrollTrigger
 * عشان كل الأنيميشن المرتبطة بالتمرير تمشي على نفس الإيقاع.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // اللمس يبقى أصلي في الجوال — أسلس وأخف على الأجهزة
      syncTouch: false,
    });

    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add('lenis-active');
    setLenis(instance);

    // تحديث القياسات بعد تحميل الخطوط والصور
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      document.documentElement.classList.remove('lenis-active');
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

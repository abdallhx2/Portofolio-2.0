'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { springs } from '@/lib/motion';
import { useContactDialog } from '@/components/home/ContactDialog';

export function CTASection() {
  const { language, isRTL } = useLanguage();
  const { open: openDialog } = useContactDialog();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  // Flip words
  const flipWords =
    language === 'ar'
      ? ['موقع؟', 'تطبيق؟', 'متجر؟', 'مشروع؟']
      : ['Website?', 'App?', 'Store?', 'Project?'];
  const staticText = language === 'ar' ? 'في بالك' : 'Got a';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flipWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [flipWords.length]);

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart={isDark ? 'rgb(10, 8, 16)' : 'rgb(235, 232, 240)'}
      gradientBackgroundEnd={isDark ? 'rgb(14, 10, 22)' : 'rgb(242, 240, 248)'}
      firstColor={isDark ? '42, 34, 55' : '208, 196, 225'}
      secondColor={isDark ? '55, 38, 68' : '218, 202, 235'}
      thirdColor={isDark ? '38, 30, 50' : '212, 200, 228'}
      fourthColor={isDark ? '45, 36, 58' : '210, 198, 226'}
      fifthColor={isDark ? '40, 32, 52' : '206, 196, 222'}
      pointerColor={isDark ? '80, 48, 110' : '170, 145, 205'}
      size="80%"
      blendingValue="hard-light"
      interactive={true}
      containerClassName="!h-[40vh] !w-full"
      className="relative flex flex-col items-center justify-center h-full"
    >
      <div className="relative z-10 flex items-center justify-center w-full h-full" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div
          className="flex flex-col items-center justify-center"
          style={{ gap: 'clamp(2.5rem, 2rem + 1.5vw, 3rem)', padding: 'clamp(2.5rem, 1.5rem + 2vw, 3.5rem) clamp(2rem, 1rem + 3vw, 4rem)' }}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Heading */}
          <h2
            className="flex items-baseline justify-center font-black tracking-tight"
            style={{ gap: 'clamp(1rem, 0.75rem + 0.5vw, 1.25rem)', fontSize: 'clamp(3.25rem, 1.5rem + 5vw, 6rem)', color: 'var(--foreground)' }}
          >
            <span className="shrink-0">{staticText}</span>
            <span className="relative inline-flex" style={{ minWidth: 'clamp(160px, 80px + 12vw, 280px)' }}>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentIndex}
                  initial={{ y: -40, filter: 'blur(10px)', opacity: 0 }}
                  animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                  exit={{ y: 50, filter: 'blur(10px)', opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="inline-block whitespace-nowrap"
                  style={{ color: 'var(--primary)' }}
                >
                  {flipWords[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          {/* CTA Button — opens shared contact dialog */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5, ...springs.snappy }}
          >
            <button
              onClick={openDialog}
              className="group inline-flex items-center gap-3 rounded-full border-2 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                padding: 'clamp(1rem, 0.8rem + 0.5vw, 1.25rem) clamp(2.5rem, 2rem + 1vw, 3rem)',
                fontSize: 'clamp(1.125rem, 1rem + 0.3vw, 1.25rem)',
                borderColor: 'var(--foreground)',
                color: 'var(--foreground)',
                borderRadius: '9999px',
                background: 'transparent',
              }}
            >
              <span>{language === 'ar' ? 'تواصل الآن' : 'Get In Touch'}</span>
              <ArrowRight
                size={22}
                className={`transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
              />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </BackgroundGradientAnimation>
  );
}

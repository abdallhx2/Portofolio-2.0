import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

import { ExternalLink, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { SiReact, SiNextdotjs, SiFlutter, SiNodedotjs, SiPython, SiTypescript, SiFirebase, SiTensorflow, SiTailwindcss, SiDocker, SiGit, SiMongodb, SiPostgresql, SiFigma, SiVercel, SiOpenai } from 'react-icons/si';
import { TextIconMarquee } from '@/components/ui/scroll-text-marquee';
import { LiquidGradientButton, generateColorsFromPrimary } from '@/components/LiquidGradient';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { MorphingText } from '@/registry/magicui/morphing-text';
import { easings, springs, rtlX } from '@/lib/motion';
import { useTheme } from '@/context/ThemeContext';
import { useContactDialog } from '@/components/home/ContactDialog';

const helloTexts = [
  "Hello",      // English
  "أهلاً",       // Arabic
  "Bonjour",    // French
  "你好",        // Chinese
  "Hola",       // Spanish
  "こんにちは",   // Japanese
];

interface PersonalInfo {
  name: string;
  title: string;
  shortBio: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  language: string;
  isRTL: boolean;
  t: (key: string) => string;
}

const techStack = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Docker', icon: SiDocker },
  { name: 'Git', icon: SiGit },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Figma', icon: SiFigma },
  { name: 'Vercel', icon: SiVercel },
  { name: 'OpenAI', icon: SiOpenai }
];

// Helper to convert rgb to hex
function rgbToHexInternal(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function HeroSection({ personalInfo, language, isRTL, t }: HeroSectionProps) {
  const { open: openContactDialog } = useContactDialog();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const [primaryColor, setPrimaryColor] = useState<string>('#7c3aed');

  // Watch for theme changes and update primary color (debounced, no temp DOM elements)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updatePrimaryColor = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const cssVar = computedStyle.getPropertyValue('--primary').trim();

      if (!cssVar) return;

      if (cssVar.startsWith('#')) {
        setPrimaryColor(cssVar);
        return;
      }

      // Parse rgb/rgba directly without creating temp DOM elements
      const rgbMatch = cssVar.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        const hex = rgbToHexInternal(
          parseInt(rgbMatch[1]),
          parseInt(rgbMatch[2]),
          parseInt(rgbMatch[3])
        );
        setPrimaryColor(hex);
      }
    };

    updatePrimaryColor();

    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updatePrimaryColor, 100);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class', 'data-theme'],
    });

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Generate colors from primary for child components that need them
  useMemo(() => {
    return generateColorsFromPrimary(primaryColor);
  }, [primaryColor]);

  // Social icons with varied entry directions
  const socialEntries = [
    { key: 'github', link: personalInfo.socialLinks.github, Icon: Github, initial: { opacity: 0, x: rtlX(-25, isRTL) }, delay: 0.85 },
    { key: 'linkedin', link: personalInfo.socialLinks.linkedin, Icon: Linkedin, initial: { opacity: 0, y: 20 }, delay: 0.95 },
    { key: 'twitter', link: personalInfo.socialLinks.twitter, Icon: Twitter, initial: { opacity: 0, x: rtlX(25, isRTL) }, delay: 1.05 },
    { key: 'instagram', link: personalInfo.socialLinks.instagram, Icon: Instagram, initial: { opacity: 0, y: -20 }, delay: 1.15 },
  ];

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
      containerClassName="!h-screen overflow-hidden md:overflow-visible md:sticky top-0 z-0"
      className="relative h-full"
    >
      {/* Main content - centered over full hero height */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container-unified text-center space-y-4 md:space-y-8">

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: easings.decelerate }}
            dir="ltr"
            style={{ color: 'var(--primary)', textShadow: '0 4px 30px rgba(var(--primary-rgb), 0.25)', marginBottom: 'clamp(0rem, -3rem + 8vw, 7rem)' }}
          >
            <MorphingText
              texts={helloTexts}
              className="max-w-none w-full title-hero tracking-tight h-[clamp(11rem,6rem+10vw,17rem)]"
            />
          </motion.div>

          {/* Name */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: easings.decelerate }}
            className="font-bold tracking-tight"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-marhey)', fontSize: 'clamp(2.5rem, 1.5rem + 2.5vw, 3.75rem)' }}
          >
            {personalInfo.name}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: easings.smooth }}
            className={`leading-relaxed max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}
            style={{ color: 'var(--muted-foreground)', fontSize: 'clamp(1.1rem, 0.9rem + 0.5vw, 1.25rem)' }}
          >
            {language === 'ar'
              ? 'مهندس برمجيات سعودي خبير في تقنيات الذكاء الاصطناعي و النماذج اللغوية الكبيرة وتطبيقاتها في مختلف الأنظمة'
              : 'A Saudi software engineer proficient in building software and an expert in Large Language Model technologies and their applications in various systems'}
          </motion.p>

          {/* CTA & Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center pt-2 md:pt-6" style={{ gap: 'clamp(1rem, 0.75rem + 1.5vw, 2rem)' }}>
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.5, ...springs.snappy }}
            >
              <LiquidGradientButton
                onClick={() => openContactDialog()}
                className="py-[clamp(1rem,0.8rem+0.5vw,1.25rem)] px-[clamp(2.5rem,2rem+1vw,3rem)]"
              >
                <span className="flex items-center gap-3 font-semibold" style={{ fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)' }}>
                  <span>{t('home.hero.getInTouch') || 'خلّنا نتواصل'}</span>
                  <ExternalLink className="w-[clamp(1.25rem,1rem+0.5vw,1.5rem)] h-[clamp(1.25rem,1rem+0.5vw,1.5rem)]" />
                </span>
              </LiquidGradientButton>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialEntries.map(({ key, link, Icon, initial, delay }) =>
                link ? (
                  <motion.div
                    key={key}
                    initial={initial}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay, duration: 0.5, ...springs.gentle }}
                  >
                    <Link href={link} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center justify-center w-[clamp(2.75rem,2.5rem+0.5vw,3rem)] h-[clamp(2.75rem,2.5rem+0.5vw,3rem)] rounded-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:border-transparent"
                      style={{
                        borderColor: 'var(--primary)',
                        color: 'var(--muted-foreground)',
                      }}>
                      <Icon className="w-[clamp(1.125rem,0.9rem+0.5vw,1.25rem)] h-[clamp(1.125rem,0.9rem+0.5vw,1.25rem)] transition-colors duration-300 group-hover:text-primary" />
                    </Link>
                  </motion.div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Scroll Marquee - Crossed X Layout */}
      <div
        className="absolute bottom-0 w-full z-0 overflow-hidden pointer-events-none"
        style={{ transform: 'translateY(clamp(-1rem, -0.5rem - 1vw, -0.75rem))' }}
      >
        <div
          className="relative w-full"
          style={{ height: 'clamp(14rem, 8rem + 10vw, 22rem)', clipPath: 'inset(-50% 0px)' }}
          dir="ltr"
        >
          <div className="absolute inset-0 flex items-center justify-center">

            {/* First Strip - Rotated Positive */}
            <motion.div
              initial={{ opacity: 0, x: rtlX(-80, isRTL) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: easings.decelerate }}
              className="absolute w-[120%] transform rotate-6 border-foreground shadow-sm z-10 origin-center"
              style={{
                backgroundColor: 'var(--card)',
                padding: 'clamp(0.5rem, 0.2rem + 0.6vw, 1rem) 0',
                borderTopWidth: 'clamp(1px, 0.15vw, 2px)',
                borderBottomWidth: 'clamp(1px, 0.15vw, 2px)',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
              }}
            >
              <TextIconMarquee
                icons={techStack}
                baseVelocity={1.5}
                iconClassName="text-muted-foreground w-[clamp(1.5rem,0.8rem+1.2vw,2.5rem)] h-[clamp(1.5rem,0.8rem+1.2vw,2.5rem)] mr-[clamp(0.5rem,0.25rem+0.3vw,0.75rem)]"
                textClassName="text-[clamp(0.8rem,0.4rem+0.6vw,1.25rem)]"
                gap="clamp(16px, 8px + 1.2vw, 40px)"
              />
            </motion.div>

            {/* Second Strip - Rotated Negative */}
            <motion.div
              initial={{ opacity: 0, x: rtlX(80, isRTL) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: easings.decelerate }}
              className="absolute w-[120%] transform -rotate-6 border-foreground shadow-sm z-20 origin-center"
              style={{
                backgroundColor: 'var(--card)',
                padding: 'clamp(0.5rem, 0.2rem + 0.6vw, 1rem) 0',
                borderTopWidth: 'clamp(1px, 0.15vw, 2px)',
                borderBottomWidth: 'clamp(1px, 0.15vw, 2px)',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
              }}
            >
              <TextIconMarquee
                icons={[...techStack].reverse()}
                baseVelocity={-1.5}
                iconClassName="text-muted-foreground w-[clamp(1.5rem,0.8rem+1.2vw,2.5rem)] h-[clamp(1.5rem,0.8rem+1.2vw,2.5rem)] mr-[clamp(0.5rem,0.25rem+0.3vw,0.75rem)]"
                textClassName="text-[clamp(0.8rem,0.4rem+0.6vw,1.25rem)]"
                gap="clamp(16px, 8px + 1.2vw, 40px)"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}

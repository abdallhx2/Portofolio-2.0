/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function FadeIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '',
  threshold = 0.1
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            // Enhanced animation with spring easing
            element.style.animation = `fadeIn${direction.charAt(0).toUpperCase() + direction.slice(1)} ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`;
            element.style.transform = 'translateZ(0)'; // Hardware acceleration
          }
        });
      },
      { threshold, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [direction, delay, duration, threshold]);

  return (
    <div ref={ref} className={`opacity-0 will-change-transform ${className}`}>
      {children}
    </div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ end, duration = 3.5, suffix = '', className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && ref.current && !hasAnimated) {
            const element = ref.current;
            const startTime = Date.now();
            const endTime = startTime + duration * 1000;

            setHasAnimated(true);

            const updateCount = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / (endTime - startTime), 1);
              
              // Use slower easing function for longer animation
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.floor(easeOutCubic * end);
              
              element.textContent = `${currentCount}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              }
            };

            updateCount();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, suffix, hasAnimated]);

  return (
    <span 
      ref={ref} 
      className={`${className} font-mono tabular-nums`}
    >
      0{suffix}
    </span>
  );
}

interface ScrollingTechStackProps {
  techStack: Array<{ name: string; icon: LucideIcon | React.ComponentType; color?: string }>;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  isRTL?: boolean;
}

export function ScrollingTechStack({
  techStack,
  speed = 30,
  direction = 'right',
  className = ''
}: ScrollingTechStackProps) {
  // Create copies for seamless loop (2x is enough with CSS animation)
  const infiniteStack = [...techStack, ...techStack];

  return (
    <div className={`overflow-hidden relative ${className}`} style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
      <div
        className="flex items-center gap-4 will-change-transform"
        style={{
          animation: `scroll-infinite-${direction} ${speed}s linear infinite`,
          width: 'max-content'
        }}
      >
        {infiniteStack.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm whitespace-nowrap min-w-max"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
          >
            <div className="flex-shrink-0">
              {React.createElement(tech.icon as any, { size: 14, style: { color: tech.color || 'var(--primary)' } })}
            </div>
            <span className="font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DualScrollingIconsProps {
  techStack: Array<{ name: string; icon: LucideIcon | React.ComponentType; color?: string }>;
  speed?: number;
  className?: string;
  iconSize?: number;
}

export function DualScrollingIcons({
  techStack,
  speed = 25,
  className = '',
  iconSize = 28
}: DualScrollingIconsProps) {
  // Split tech stack into two rows
  const midPoint = Math.ceil(techStack.length / 2);
  const topRow = techStack.slice(0, midPoint);
  const bottomRow = techStack.slice(midPoint);

  // Create copies for seamless loop (3x is enough with CSS animation)
  const infiniteTopRow = [...topRow, ...topRow, ...topRow];
  const infiniteBottomRow = [...bottomRow, ...bottomRow, ...bottomRow];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Top Row - Scrolls Left */}
      <div
        className="overflow-hidden relative"
        style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      >
        <div
          className="flex items-center gap-5 will-change-transform"
          style={{
            animation: `scroll-infinite-left ${speed}s linear infinite`,
            width: 'max-content'
          }}
        >
          {infiniteTopRow.map((tech, index) => (
            <div
              key={`top-${tech.name}-${index}`}
              className="flex items-center justify-center p-3 rounded-xl border transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
              title={tech.name}
            >
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                {React.createElement(tech.icon as any, {
                  size: iconSize,
                  style: { color: tech.color || 'var(--primary)' }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Scrolls Right */}
      <div
        className="overflow-hidden relative"
        style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      >
        <div
          className="flex items-center gap-5 will-change-transform"
          style={{
            animation: `scroll-infinite-right ${speed}s linear infinite`,
            width: 'max-content'
          }}
        >
          {infiniteBottomRow.map((tech, index) => (
            <div
              key={`bottom-${tech.name}-${index}`}
              className="flex items-center justify-center p-3 rounded-xl border transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
              title={tech.name}
            >
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                {React.createElement(tech.icon as any, {
                  size: iconSize,
                  style: { color: tech.color || 'var(--primary)' }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface InteractiveStatProps {
  number: string;
  label: string;
  delay?: number;
  className?: string;
}

export function InteractiveStat({ number, label, delay = 0, className = '' }: InteractiveStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && ref.current && !hasAnimated) {
            const element = ref.current;
            setHasAnimated(true);
            setTimeout(() => {
              element.style.animation = 'stat-reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both';
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, hasAnimated]);

  return (
    <div 
      ref={ref}
      className={`text-center will-change-transform ${className}`}
      style={{ opacity: 0 }}
    >
      <div className="relative overflow-hidden rounded-lg p-2">
        <div 
          className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold relative z-10" 
          style={{ color: 'var(--foreground)' }}
        >
          {number}
        </div>
      </div>
      <div 
        className="text-xs sm:text-sm lg:text-base xl:text-lg" 
        style={{ color: 'var(--muted-foreground)' }}
      >
        {label}
      </div>
    </div>
  );
}

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypingEffect({ text, speed = 100, delay = 0, className = '' }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setTimeout(() => {
              setStarted(true);
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, started]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <div ref={ref} className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingElement({ children, delay = 0, className = '' }: FloatingElementProps) {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  // تتبع الرؤية
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: '100px'
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // إيقاف الحركة عندما لا يكون مرئياً
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const updateTransform = () => {
      if (ref.current && isVisible) {
        const scrolled = window.pageYOffset;

        // تحسين: فقط التحديث إذا تغير الموقع
        if (Math.abs(scrolled - lastScrollY.current) > 1) {
          lastScrollY.current = scrolled;
          const rate = scrolled * -speed;
          ref.current.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    rafRef.current = requestAnimationFrame(updateTransform);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, isVisible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: isVisible ? 'transform' : 'auto' }}
    >
      {children}
    </div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerChildren({ children, staggerDelay = 0.1, className = '' }: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const children = Array.from(element.children) as HTMLElement[];
            
            children.forEach((child, index) => {
              child.style.opacity = '0';
              child.style.transform = 'translateY(20px)';
              child.style.transition = 'none';
              
              setTimeout(() => {
                child.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, index * staggerDelay * 1000);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [staggerDelay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

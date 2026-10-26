'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Github, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  tags: string[];
  image: string;
  year: number;
  client: string;
  url?: string;
  github?: string;
}

interface FeaturedProjectsSectionProps {
  projects: Project[];
  t: (key: string) => string;
}

/** مدة عرض كل مشروع قبل الانتقال التلقائي (ثانية) */
const AUTOPLAY_SECONDS = 7;

const pad = (n: number) => String(n).padStart(2, '0');

const hostOf = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return null;
  }
};

export function FeaturedProjectsSection({ projects, t }: FeaturedProjectsSectionProps) {
  const { isRTL } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef(0);
  const dirRef = useRef<1 | -1>(1);

  const go = useCallback(
    (index: number, dir?: 1 | -1) => {
      if (!projects.length) return;
      const next = (index + projects.length) % projects.length;
      setActive((cur) => {
        if (next === cur) return cur;
        dirRef.current = dir ?? (next > cur ? 1 : -1);
        prevRef.current = cur;
        return next;
      });
    },
    [projects.length]
  );
  const handleNext = useCallback(() => go(active + 1, 1), [go, active]);
  const handlePrev = useCallback(() => go(active - 1, -1), [go, active]);

  // التشغيل التلقائي يتوقف إذا القسم خارج الشاشة
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => setInView(self.isActive),
      });

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(sectionRef);
        gsap.from(q('[data-fp-reveal]'), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      });
    },
    { scope: sectionRef }
  );

  // انتقال المشروع: مسح الصورة الجديدة فوق القديمة + دخول النصوص
  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const slides = q<HTMLElement>('[data-slide]');
      const prev = prevRef.current;
      if (!slides.length) return;

      slides.forEach((el, i) => {
        gsap.set(el, { zIndex: i === active ? 3 : i === prev ? 2 : 1, autoAlpha: i === active || i === prev ? 1 : 0 });
      });
      if (prev === active) return;

      // الاتجاه البصري يراعي العربي (من اليمين لليسار)
      const fromRight = (dirRef.current === 1) !== isRTL;
      const startClip = fromRight ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      tl.fromTo(slides[active], { clipPath: startClip }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduce ? 0 : 0.9 })
        .fromTo(q(`[data-slide="${active}"] img`), { scale: 1.18 }, { scale: 1, duration: reduce ? 0 : 1.2, ease: 'power3.out' }, 0)
        .fromTo(
          q('[data-info-item]'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: reduce ? 0 : 0.6, stagger: 0.06, ease: 'power3.out' },
          0.15
        )
        .fromTo(q('[data-big-index]'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: reduce ? 0 : 0.8, ease: 'power3.out' }, 0.1);
    },
    { scope: sectionRef, dependencies: [active, isRTL] }
  );

  // ميلان ثلاثي الأبعاد خفيف للإطار مع حركة الماوس
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const rx = gsap.quickTo(stage, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(stage, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  if (!projects.length) return null;

  const current = projects[active];
  const host = hostOf(current.url);
  const running = inView && !paused;
  const PrevIcon = isRTL ? ArrowRight : ArrowLeft;
  const NextIcon = isRTL ? ArrowLeft : ArrowRight;

  const navBtn =
    'group/nav flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2';

  return (
    <section ref={sectionRef} className="section-unified overflow-x-clip" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container-unified">
        {/* ── الرأس ── */}
        <div data-fp-reveal className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)' }}>
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: 'var(--primary)' }}
            >
              <span className="h-px w-8" style={{ backgroundColor: 'var(--primary)' }} />
              {isRTL ? 'أعمال مختارة' : 'Selected Work'}
            </span>
            <h2 className="title-section mb-2" style={{ color: 'var(--foreground)' }}>
              {t('home.featuredWork.title') || (isRTL ? 'الأعمال المميزة' : 'Featured Work')}
            </h2>
            <p className="text-subtitle" style={{ color: 'var(--muted-foreground)' }}>
              {t('home.featuredWork.description') || (isRTL ? 'عرض لأحدث مشاريعي' : 'A showcase of my latest projects')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className={navBtn}
              style={{ borderColor: 'color-mix(in srgb, var(--foreground) 18%, transparent)', color: 'var(--foreground)' }}
              aria-label={isRTL ? 'المشروع السابق' : 'Previous project'}
            >
              <PrevIcon className="h-5 w-5 transition-transform duration-300 group-hover/nav:-translate-x-0.5 rtl:group-hover/nav:translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              className={`${navBtn} border-transparent shadow-lg`}
              style={{ backgroundColor: 'var(--primary)', color: '#fff', boxShadow: '0 10px 30px -10px var(--primary)' }}
              aria-label={isRTL ? 'المشروع التالي' : 'Next project'}
            >
              <NextIcon className="h-5 w-5 transition-transform duration-300 group-hover/nav:translate-x-0.5 rtl:group-hover/nav:-translate-x-0.5" />
            </button>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 ms-2 text-sm font-semibold underline-offset-4 hover:underline"
              style={{ color: 'var(--foreground)' }}
            >
              {isRTL ? 'كل المشاريع' : 'All projects'}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        {/* ── المسرح ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 items-center"
          style={{ gap: 'clamp(2rem, 1rem + 3vw, 4rem)' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* الإطار */}
          <div data-fp-reveal className="lg:col-span-7 relative [perspective:1400px]">
            {/* رقم ضخم خلف الإطار */}
            <span
              data-big-index
              aria-hidden
              className="pointer-events-none absolute -top-[0.45em] end-2 z-0 select-none font-black leading-none"
              style={{
                fontSize: 'clamp(5rem, 3rem + 9vw, 11rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px color-mix(in srgb, var(--foreground) 16%, transparent)',
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
              dir="ltr"
            >
              {pad(active + 1)}
            </span>
            {/* هالة لونية */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[8%] -z-0 rounded-full blur-[80px] opacity-30"
              style={{ backgroundColor: 'var(--primary)' }}
            />

            <div
              ref={stageRef}
              className="relative z-10 rounded-[1.75rem] border p-2 shadow-2xl will-change-transform [transform-style:preserve-3d]"
              style={{
                borderColor: 'color-mix(in srgb, var(--foreground) 12%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--card) 85%, transparent)',
                boxShadow: '0 40px 80px -30px rgba(0,0,0,0.45)',
              }}
            >
              {/* شريط المتصفح */}
              <div className="flex items-center gap-3 px-3 pt-1 pb-2.5" dir="ltr">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div
                  className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-full px-3 py-1 text-[11px]"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 7%, transparent)', color: 'var(--muted-foreground)' }}
                >
                  <Globe className="h-3 w-3 shrink-0" />
                  <span className="truncate">{host ?? `abdullah.dev/projects/${current.id}`}</span>
                </div>
                <span className="w-[42px]" />
              </div>

              {/* الصور */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]" style={{ backgroundColor: 'var(--background)' }}>
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    data-slide={index}
                    className="absolute inset-0"
                    style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 3 : 1 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-top"
                      draggable={false}
                      priority={index === 0}
                    />
                  </div>
                ))}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
                />
                <span
                  className="absolute bottom-3 start-3 z-10 rounded-full px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
                >
                  {current.client}
                </span>
              </div>
            </div>
          </div>

          {/* المعلومات */}
          <div data-fp-reveal className="lg:col-span-5 flex flex-col">
            <div data-info-item className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)', color: 'var(--primary)' }}
              >
                {current.category}
              </span>
              <span className="text-xs font-medium tabular-nums" style={{ color: 'var(--muted-foreground)' }}>
                {current.year}
              </span>
            </div>

            <h3
              data-info-item
              className="font-bold leading-tight mb-4"
              style={{ color: 'var(--foreground)', fontSize: 'clamp(1.6rem, 1.2rem + 1.2vw, 2.4rem)' }}
            >
              {current.title}
            </h3>

            <p data-info-item className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)', fontSize: 'clamp(1rem, 0.95rem + 0.2vw, 1.1rem)' }}>
              {current.shortDescription}
            </p>

            <ul data-info-item className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
              {current.tags.slice(0, 5).map((tag) => (
                <li key={tag} dir="ltr" className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  <span style={{ color: 'var(--primary)' }}>#</span>
                  {tag}
                </li>
              ))}
            </ul>

            <div data-info-item className="flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${current.id}`}
                className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full py-3 ps-6 pe-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark, var(--primary)))',
                  boxShadow: '0 12px 30px -12px var(--primary)',
                }}
              >
                <span>{isRTL ? 'تفاصيل المشروع' : 'View case study'}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/cta:rotate-45">
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </span>
              </Link>

              {current.url ? (
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]"
                  style={{ borderColor: 'color-mix(in srgb, var(--foreground) 20%, transparent)', color: 'var(--foreground)' }}
                >
                  <Globe className="h-4 w-4" />
                  {isRTL ? 'زيارة الموقع' : 'Live site'}
                </a>
              ) : current.github ? (
                <a
                  href={current.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]"
                  style={{ borderColor: 'color-mix(in srgb, var(--foreground) 20%, transparent)', color: 'var(--foreground)' }}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* ── شريط المشاريع مع مؤشر التقدم ── */}
        <div
          data-fp-reveal
          className="mt-10 lg:mt-14 -mx-[var(--section-px)] px-[var(--section-px)] flex gap-3 overflow-x-auto snap-x pb-2 [scrollbar-width:none] sm:grid sm:overflow-visible sm:mx-0 sm:px-0"
          style={{ gridTemplateColumns: `repeat(${projects.length}, minmax(0, 1fr))` }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {projects.map((project, index) => {
            const isActive = index === active;
            return (
              <button
                key={project.id}
                onClick={() => go(index)}
                className="group/thumb relative flex min-w-[220px] sm:min-w-0 snap-start items-center gap-3 overflow-hidden rounded-2xl border p-2.5 text-start transition-all duration-300"
                style={{
                  borderColor: isActive ? 'color-mix(in srgb, var(--primary) 55%, transparent)' : 'color-mix(in srgb, var(--foreground) 10%, transparent)',
                  backgroundColor: isActive ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'transparent',
                }}
                aria-label={project.title}
                aria-current={isActive}
              >
                <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="64px"
                    className={`object-cover transition-all duration-500 ${isActive ? '' : 'grayscale opacity-60 group-hover/thumb:grayscale-0 group-hover/thumb:opacity-100'}`}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] tabular-nums" style={{ color: 'var(--muted-foreground)' }}>
                    {pad(index + 1)}
                  </span>
                  <span
                    className="block truncate text-sm font-semibold"
                    style={{ color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                  >
                    {project.title.split(' - ')[0]}
                  </span>
                </span>

                {/* مؤشر الوقت — نهايته تنقل للمشروع التالي */}
                {isActive && (
                  <span
                    key={`progress-${active}`}
                    className="absolute bottom-0 start-0 h-[3px] w-full origin-left rtl:origin-right"
                    style={{
                      backgroundColor: 'var(--primary)',
                      animation: `fp-progress ${AUTOPLAY_SECONDS}s linear forwards`,
                      animationPlayState: running ? 'running' : 'paused',
                    }}
                    onAnimationEnd={handleNext}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

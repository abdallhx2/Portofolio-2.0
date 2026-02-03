import type { Variants, Transition } from 'motion/react';

// ─── Easing Curves ───
export const easings = {
  smooth: [0.25, 0.4, 0.25, 1] as const,
  decelerate: [0.0, 0.0, 0.2, 1] as const,
  accelerate: [0.4, 0.0, 1, 1] as const,
} as const;

export const springs = {
  snappy: { type: 'spring' as const, stiffness: 300, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
};

// ─── Viewport Defaults ───
export const viewportDefaults = {
  once: true,
  margin: '-50px' as `${number}px`,
};

// ─── RTL Helper ───
export const rtlX = (value: number, isRTL: boolean): number =>
  isRTL ? -value : value;

// ─── Reusable Variants ───
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const fadeInHorizontal = (fromX: number, isRTL: boolean): Variants => ({
  hidden: { opacity: 0, x: rtlX(fromX, isRTL) },
  visible: { opacity: 1, x: 0 },
});

// ─── Stagger Variants ───
export const staggerContainer = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// ─── Transition Presets ───
export const transitions = {
  fast: { duration: 0.4, ease: easings.smooth } as Transition,
  normal: { duration: 0.6, ease: easings.smooth } as Transition,
  slow: { duration: 0.8, ease: easings.decelerate } as Transition,
};

// ─── Section-Level Scroll-Triggered Presets ───
// Unified viewport trigger point for all sections (triggers when 100px inside viewport)
export const sectionViewport = {
  once: true,
  margin: '-100px 0px' as `${number}px`,
};

// Section header: title + subtitle enter together
export const sectionHeader: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easings.decelerate },
  },
};

// Section header link (e.g. "View All") enters slightly after
export const sectionHeaderLink: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easings.smooth, delay: 0.25 },
  },
};

// Section content block: the main body of each section
export const sectionContent: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easings.decelerate, delay: 0.15 },
  },
};

// Section content with scale (for grids / cards container)
export const sectionContentScale: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: easings.decelerate, delay: 0.15 },
  },
};

'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

type ColorKey =
  | 'color1'
  | 'color2'
  | 'color3'
  | 'color4'
  | 'color5'
  | 'color6'
  | 'color7'
  | 'color8'
  | 'color9'
  | 'color10'
  | 'color11'
  | 'color12'
  | 'color13'
  | 'color14'
  | 'color15'
  | 'color16'
  | 'color17';

export type Colors = Record<ColorKey, string>;

const svgOrder = [
  'svg1',
  'svg2',
  'svg3',
  'svg4',
  'svg3',
  'svg2',
  'svg1',
] as const;

type SvgKey = (typeof svgOrder)[number];

type Stop = {
  offset: number;
  stopColor: string;
};

type SvgState = {
  gradientTransform: string;
  stops: Stop[];
};

type SvgStates = Record<SvgKey, SvgState>;

const createStopsArray = (
  svgStates: SvgStates,
  svgOrder: readonly SvgKey[],
  maxStops: number
): Stop[][] => {
  const stopsArray: Stop[][] = [];
  for (let i = 0; i < maxStops; i++) {
    const stopConfigurations = svgOrder.map((svgKey) => {
      const svg = svgStates[svgKey];
      return svg.stops[i] || svg.stops[svg.stops.length - 1];
    });
    stopsArray.push(stopConfigurations);
  }
  return stopsArray;
};

type GradientSvgProps = {
  className: string;
  isHovered: boolean;
  colors: Colors;
  isVisible: boolean;
  uniqueId: string;
};

const GradientSvg: React.FC<GradientSvgProps> = ({
  className,
  isHovered,
  colors,
  isVisible,
  uniqueId,
}) => {
  const svgStates: SvgStates = useMemo(() => ({
    svg1: {
      gradientTransform:
        'translate(287.5 280) rotate(-29.0546) scale(689.807 1000)',
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color3 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.537556, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color8 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg2: {
      gradientTransform:
        'translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)',
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.104167, stopColor: colors.color12 },
        { offset: 0.182292, stopColor: colors.color13 },
        { offset: 0.28125, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.453125, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.75, stopColor: colors.color14 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color1 },
      ],
    },
    svg3: {
      gradientTransform:
        'translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)',
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.307292, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.442708, stopColor: colors.color15 },
        { offset: 0.537556, stopColor: colors.color16 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color17 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg4: {
      gradientTransform:
        'translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)',
      stops: [
        { offset: 0.109375, stopColor: colors.color11 },
        { offset: 0.171875, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color13 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
  }), [colors]);

  const maxStops = Math.max(
    ...Object.values(svgStates).map((svg) => svg.stops.length)
  );
  const stopsAnimationArray = createStopsArray(svgStates, svgOrder, maxStops);
  const gradientTransform = svgOrder.map(
    (svgKey) => svgStates[svgKey].gradientTransform
  );

  // Initial gradientTransform value
  const initialGradientTransform = svgStates.svg1.gradientTransform;

  // إيقاف الحركة إذا لم يكن مرئياً
  const animationDuration = isVisible ? (isHovered ? 50 : 10) : 0;

  return (
    <svg
      className={className}
      width='1030'
      height='280'
      viewBox='0 0 1030 280'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width='1030'
        height='280'
        rx='140'
        fill={`url(#${uniqueId})`}
      />
      <defs>
        <motion.radialGradient
          id={uniqueId}
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          initial={{ gradientTransform: initialGradientTransform }}
          animate={isVisible ? {
            gradientTransform: gradientTransform,
            transition: {
              duration: animationDuration,
              repeat: Infinity,
              ease: 'linear'
            },
          } : { gradientTransform: initialGradientTransform }}
        >
          {stopsAnimationArray.map((stopConfigs, index) => (
            <AnimatePresence key={index}>
              <motion.stop
                initial={{
                  offset: stopConfigs[0].offset,
                  stopColor: stopConfigs[0].stopColor,
                }}
                animate={isVisible ? {
                  offset: stopConfigs.map((config) => config.offset),
                  stopColor: stopConfigs.map((config) => config.stopColor),
                } : {
                  offset: stopConfigs[0].offset,
                  stopColor: stopConfigs[0].stopColor,
                }}
                transition={{
                  duration: isVisible ? 0 : 0,
                  ease: 'linear',
                  repeat: isVisible ? Infinity : 0,
                }}
              />
            </AnimatePresence>
          ))}
        </motion.radialGradient>
      </defs>
    </svg>
  );
};

type LiquidProps = {
  isHovered: boolean;
  colors: Colors;
  buttonType?: boolean;
};

export const Liquid: React.FC<LiquidProps> = ({
  isHovered,
  colors,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // تتبع الرؤية لإيقاف الحركات
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // تقليل عدد SVGs من 7 إلى 4 لتحسين الأداء
  const svgConfigs = useMemo(() => [
    { index: 0, size: 'small', className: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference' },
    { index: 1, size: 'small', className: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg] mix-blend-difference' },
    { index: 2, size: 'large', className: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg] mix-blend-difference' },
    { index: 3, size: 'large', className: 'top-1/2 left-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180 mix-blend-hard-light' },
  ], []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {svgConfigs.map((config) => (
        <div
          key={config.index}
          className={`absolute ${
            config.size === 'small' ? 'w-[443px] h-[121px]' : 'w-[756px] h-[207px]'
          } ${config.className}`}
          style={{ willChange: isVisible ? 'transform' : 'auto' }}
        >
          <GradientSvg
            className='w-full h-full'
            isHovered={isHovered}
            colors={colors}
            isVisible={isVisible}
            uniqueId={`liquid-gradient-${config.index}`}
          />
        </div>
      ))}
    </div>
  );
};

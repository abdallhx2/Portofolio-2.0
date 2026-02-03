'use client';

import { ReactNode, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Liquid, type Colors } from '@/components/ui/liquid-gradient';

// دالة لتحويل hex إلى RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// دالة لتحويل RGB إلى hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// دالة لمزج لونين
function mixColors(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1;

  return rgbToHex(
    rgb1.r + (rgb2.r - rgb1.r) * ratio,
    rgb1.g + (rgb2.g - rgb1.g) * ratio,
    rgb1.b + (rgb2.b - rgb1.b) * ratio
  );
}

// دالة لتفتيح اللون
function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  return rgbToHex(
    rgb.r + (255 - rgb.r) * percent,
    rgb.g + (255 - rgb.g) * percent,
    rgb.b + (255 - rgb.b) * percent
  );
}

// دالة لتغميق اللون
function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  return rgbToHex(
    rgb.r * (1 - percent),
    rgb.g * (1 - percent),
    rgb.b * (1 - percent)
  );
}

// توليد الألوان من اللون الأساسي
function generateColorsFromPrimary(primaryColor: string): Colors {
  return {
    color1: primaryColor,
    color2: lightenColor(primaryColor, 0.1),
    color3: lightenColor(primaryColor, 0.2),
    color4: lightenColor(primaryColor, 0.35),
    color5: lightenColor(primaryColor, 0.5),
    color6: mixColors(primaryColor, '#6366f1', 0.3),
    color7: mixColors(primaryColor, '#818cf8', 0.4),
    color8: lightenColor(primaryColor, 0.4),
    color9: lightenColor(primaryColor, 0.55),
    color10: lightenColor(primaryColor, 0.7),
    color11: lightenColor(primaryColor, 0.85),
    color12: darkenColor(primaryColor, 0.15),
    color13: darkenColor(primaryColor, 0.25),
    color14: primaryColor,
    color15: lightenColor(primaryColor, 0.1),
    color16: lightenColor(primaryColor, 0.2),
    color17: lightenColor(primaryColor, 0.35),
  };
}

interface LiquidGradientButtonProps {
  children: ReactNode;
  className?: string;
  colors?: Colors;
  href?: string;
  onClick?: () => void;
}

export function LiquidGradientButton({
  children,
  className = '',
  colors,
  href,
  onClick,
}: LiquidGradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<string>('#7c3aed');

  // قراءة لون النظام الأساسي من CSS variables
  useEffect(() => {
    const updatePrimaryColor = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const cssVar = computedStyle.getPropertyValue('--primary').trim();

      if (cssVar && cssVar.startsWith('#')) {
        setPrimaryColor(cssVar);
      } else if (cssVar) {
        // محاولة تحويل اللون إذا لم يكن hex
        const tempEl = document.createElement('div');
        tempEl.style.color = cssVar;
        document.body.appendChild(tempEl);
        const computedColor = getComputedStyle(tempEl).color;
        document.body.removeChild(tempEl);

        // تحويل rgb إلى hex
        const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          const hex = rgbToHex(
            parseInt(rgbMatch[1]),
            parseInt(rgbMatch[2]),
            parseInt(rgbMatch[3])
          );
          setPrimaryColor(hex);
        }
      }
    };

    updatePrimaryColor();

    // مراقبة تغييرات الثيم
    const observer = new MutationObserver(updatePrimaryColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // توليد الألوان بناءً على اللون الأساسي
  const dynamicColors = useMemo(() => {
    if (colors) return colors;
    return generateColorsFromPrimary(primaryColor);
  }, [colors, primaryColor]);

  const buttonContent = (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
      }}
    >
      {/* Liquid Gradient Background */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <Liquid isHovered={isHovered} colors={dynamicColors} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button">
      {buttonContent}
    </button>
  );
}

export { type Colors, generateColorsFromPrimary };
export default LiquidGradientButton;

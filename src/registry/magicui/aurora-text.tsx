"use client";

import React, { useState, useEffect, useMemo } from "react";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(
    rgb.r + (255 - rgb.r) * percent,
    rgb.g + (255 - rgb.g) * percent,
    rgb.b + (255 - rgb.b) * percent
  );
}

function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(
    rgb.r * (1 - percent),
    rgb.g * (1 - percent),
    rgb.b * (1 - percent)
  );
}

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

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export function AuroraText({
  children,
  className = "",
  colors,
  speed = 3,
}: AuroraTextProps) {
  const [primaryColor, setPrimaryColor] = useState<string>('#7c3aed');

  useEffect(() => {
    const updatePrimaryColor = () => {
      const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      if (cssVar && cssVar.startsWith('#')) {
        setPrimaryColor(cssVar);
      } else if (cssVar) {
        const tempEl = document.createElement('div');
        tempEl.style.color = cssVar;
        document.body.appendChild(tempEl);
        const computed = getComputedStyle(tempEl).color;
        document.body.removeChild(tempEl);
        const m = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (m) setPrimaryColor(rgbToHex(parseInt(m[1]), parseInt(m[2]), parseInt(m[3])));
      }
    };

    updatePrimaryColor();

    const observer = new MutationObserver(updatePrimaryColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const gradientColors = useMemo(() => {
    if (colors) return colors;
    return [
      primaryColor,
      lightenColor(primaryColor, 0.2),
      mixColors(primaryColor, '#6366f1', 0.3),
      lightenColor(primaryColor, 0.4),
      darkenColor(primaryColor, 0.15),
      primaryColor,
    ];
  }, [colors, primaryColor]);

  return (
    <span
      className={`aurora-text-gradient ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradientColors.join(", ")})`,
        backgroundSize: "400% 400%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animationDuration: `${speed}s`,
      }}
    >
      {children}
    </span>
  );
}

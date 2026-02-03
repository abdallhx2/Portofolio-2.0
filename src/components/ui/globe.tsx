"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { useTheme } from "@/context/ThemeContext";

interface GlobeProps {
  className?: string;
  size?: number;
}

export function Globe({ className, size: propSize }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  // استخدام حجم ثابت أو من props
  const canvasSize = propSize || 400;
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  // تتبع الرؤية
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // إنشاء الكوكب
  const initGlobe = useCallback(() => {
    if (!canvasRef.current || !isVisible) {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      return;
    }

    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: pixelRatio,
      width: canvasSize * pixelRatio,
      height: canvasSize * pixelRatio,
      phi: phiRef.current,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: isDark ? [0.2, 0.2, 0.2] : [0.85, 0.85, 0.85],
      markerColor: isDark ? [0.5, 0.5, 0.5] : [0.4, 0.4, 0.4],
      glowColor: isDark ? [0.2, 0.2, 0.2] : [0.8, 0.8, 0.8],
      markers: [
        { location: [24.7136, 46.6753], size: 0.08 }, // Riyadh (highlighted)
        { location: [37.7595, -122.4367], size: 0.04 },
        { location: [40.7128, -74.006], size: 0.04 },
        { location: [51.5074, -0.1278], size: 0.04 },
        { location: [35.6762, 139.6503], size: 0.04 },
        { location: [25.2048, 55.2708], size: 0.04 },
      ],
      onRender: (state) => {
        if (isVisible) {
          state.phi = phiRef.current;
          phiRef.current += 0.004;
        }
      },
    });

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [isVisible, isDark, canvasSize, pixelRatio]);

  useEffect(() => {
    return initGlobe();
  }, [initGlobe]);

  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <canvas
        ref={canvasRef}
        width={canvasSize * pixelRatio}
        height={canvasSize * pixelRatio}
        style={{
          width: canvasSize,
          height: canvasSize,
          contain: 'layout paint size',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </div>
  );
}

export default Globe;

"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const curRef = useRef({ x: 0, y: 0 });
  const tgRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    el.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    el.style.setProperty("--first-color", firstColor);
    el.style.setProperty("--second-color", secondColor);
    el.style.setProperty("--third-color", thirdColor);
    el.style.setProperty("--fourth-color", fourthColor);
    el.style.setProperty("--fifth-color", fifthColor);
    el.style.setProperty("--pointer-color", pointerColor);
    el.style.setProperty("--size", size);
    el.style.setProperty("--blending-value", blendingValue);
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  useEffect(() => {
    if (!interactive) return;
    let rafId: number;
    function animate() {
      const cur = curRef.current;
      const tg = tgRef.current;
      cur.x += (tg.x - cur.x) / 20;
      cur.y += (tg.y - cur.y) / 20;
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(cur.x)}px, ${Math.round(cur.y)}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [interactive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      tgRef.current.x = event.clientX - rect.left;
      tgRef.current.y = event.clientY - rect.top;
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      className={cn(
        "h-screen w-full relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "gradients-container h-full w-full blur-lg",
            isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
          )}
        >
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:center_center]`,
              `animate-first`,
              `opacity-100`
            )}
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%-400px)]`,
              `animate-second`,
              `opacity-100`
            )}
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%+400px)]`,
              `animate-third`,
              `opacity-100`
            )}
          ></div>
          {interactive && (
            <div
              ref={interactiveRef}
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
                `opacity-70`
              )}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

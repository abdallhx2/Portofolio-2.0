'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlareCard({ children, className }: GlareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setGlarePosition({ x, y });

    // Calculate rotation based on mouse position
    const rotateX = ((y - 50) / 50) * -10;
    const rotateY = ((x - 50) / 50) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out',
        className
      )}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        }}
      />

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 30px rgba(var(--primary-rgb), 0.3)`,
        }}
      />

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}

export default GlareCard;

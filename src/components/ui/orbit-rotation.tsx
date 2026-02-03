"use client"

import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OrbitIcon {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  name?: string
  color?: string
}

interface OrbitRotationProps {
  icons?: OrbitIcon[]
  orbitCount?: number
  orbitGap?: number
  centerIcon?: OrbitIcon
  centerImage?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}

export function OrbitRotation({
  icons = [],
  orbitCount = 3,
  orbitGap = 6,
  centerIcon,
  centerImage,
  className,
  size = "md",
  ...props
}: OrbitRotationProps) {
  const iconsPerOrbit = Math.ceil(icons.length / orbitCount)

  // Center image sizes
  const centerSizeClasses = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-56 h-56",
    xl: "w-32 h-32",
    "2xl": "w-80 h-80",
    "3xl": "w-96 h-96",
  }

  // Base orbit size (must be larger than center to wrap around it)
  const baseOrbitSizes = {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 10,
    "2xl": 26,
    "3xl": 30,
  }

  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-14 h-14",
    "2xl": "w-40 h-40",
    "3xl": "w-48 h-48",
  }

  const orbitIconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    "2xl": "w-12 h-12",
    "3xl": "w-12 h-12",
  }

  const baseOrbit = baseOrbitSizes[size]

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {/* Center - Image or Icon */}
        {(centerImage || centerIcon) && (
          <div
            className={cn(
              "flex items-center justify-center rounded-full border-2 shadow-2xl backdrop-blur-sm overflow-hidden z-10",
              centerSizeClasses[size]
            )}
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)'
            }}
          >
            {centerImage ? (
              <Image
                src={centerImage}
                alt="Profile"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            ) : centerIcon ? (
              <centerIcon.Icon
                className={cn(iconSizeClasses[size])}
                style={{ color: 'var(--muted-foreground)' }}
                {...({ strokeWidth: 1.5 } as Record<string, unknown>)}
              />
            ) : null}
          </div>
        )}

        {/* Generate Orbits */}
        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const orbitSize = `${baseOrbit + orbitGap * (orbitIdx + 1)}rem`
          const animationDuration = `${15 + orbitIdx * 8}s`
          const direction = orbitIdx % 2 === 0 ? 'normal' : 'reverse'

          return (
            <div
              key={orbitIdx}
              className="absolute rounded-full border-2 border-dotted"
              style={{
                width: orbitSize,
                height: orbitSize,
                borderColor: 'color-mix(in srgb, var(--foreground) 25%, transparent)',
                animation: `orbit-spin ${animationDuration} linear infinite ${direction}`,
              }}
            >
              {icons
                .slice(
                  orbitIdx * iconsPerOrbit,
                  orbitIdx * iconsPerOrbit + iconsPerOrbit
                )
                .map((iconConfig, iconIdx) => {
                  const angleStep = (2 * Math.PI) / Math.min(iconsPerOrbit, icons.length - orbitIdx * iconsPerOrbit)
                  const angle = iconIdx * angleStep
                  const x = (50 + 50 * Math.cos(angle)).toFixed(4)
                  const y = (50 + 50 * Math.sin(angle)).toFixed(4)

                  return (
                    <div
                      key={iconIdx}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="rounded-full border p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                        style={{
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          animation: `orbit-spin ${animationDuration} linear infinite ${direction === 'normal' ? 'reverse' : 'normal'}`,
                        }}
                        title={iconConfig.name}
                      >
                        <iconConfig.Icon
                          className={cn(orbitIconSizeClasses[size])}
                          style={{ color: 'var(--muted-foreground)' }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

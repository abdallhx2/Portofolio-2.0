"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "transition-bg relative flex flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      {/* Aurora layer — pure neutrals only (no color → no olive from mix-blend-difference) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg,var(--g600)_10%,var(--g400)_15%,var(--g300)_20%,var(--g200)_25%,var(--g500)_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,transparent_10%,transparent_12%,var(--black)_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,transparent_10%,transparent_12%,var(--white)_16%)",

            "--g200": "#e5e5e5",
            "--g300": "#d4d4d4",
            "--g400": "#a3a3a3",
            "--g500": "#737373",
            "--g600": "#525252",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-30 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--g600)_10%,var(--g400)_15%,var(--g300)_20%,var(--g200)_25%,var(--g500)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        ></div>
      </div>

      {/* Primary color hint — separate layer, no blend modes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, var(--primary) 0%, transparent 60%)",
        }}
      />

      {children}
    </div>
  );
};

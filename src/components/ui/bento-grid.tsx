'use client';

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:shadow-xl",
        "border flex flex-col justify-between space-y-4",
        className
      )}
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {header}
      <div className="transition duration-200">
        {icon}
        <div
          className="font-semibold text-base md:text-lg mt-2 mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </div>
        <div
          className="text-sm leading-relaxed"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

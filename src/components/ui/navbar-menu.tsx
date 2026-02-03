"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  const content = (
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer hover:opacity-[0.9]"
      style={{ color: 'var(--foreground)' }}
    >
      {item}
    </motion.p>
  );

  // If no children, render as a simple link
  if (!children && href) {
    return (
      <Link href={href} className="relative">
        {content}
      </Link>
    );
  }

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {href ? <Link href={href}>{content}</Link> : content}
      {active !== null && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="rounded-2xl overflow-hidden border shadow-xl"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={`relative rounded-full border shadow-lg flex justify-center items-center space-x-4 px-8 py-4 ${className || ''}`}
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
          {title}
        </h4>
        <p className="text-sm max-w-[10rem]" style={{ color: 'var(--muted-foreground)' }}>
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
  return (
    <Link
      href={href}
      {...rest}
      className="hover:opacity-80 transition-opacity"
      style={{ color: 'var(--muted-foreground)' }}
    >
      {children}
    </Link>
  );
};

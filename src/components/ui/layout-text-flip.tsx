"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "",
  words = [],
  duration = 3000,
  className,
  wordsClassName,
}: {
  text?: string;
  words: string[];
  duration?: number;
  className?: string;
  wordsClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <>
      {text && (
        <motion.span
          layoutId="subtext"
          className={cn("font-bold tracking-tight", className)}
        >
          {text}
        </motion.span>
      )}

      <motion.span
        layout
        className={cn(
          "relative inline-block overflow-hidden rounded-lg px-4 py-2 font-bold tracking-tight",
          wordsClassName
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-block whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};

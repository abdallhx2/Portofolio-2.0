'use client';

import { motion } from 'motion/react';

const VERSE_FIRST = 'إذا غامرتَ في شرفٍ مرومِ';
const VERSE_SECOND = 'فلا تقنعْ بما دونَ النجومِ';

export function PoetryScrollSection() {
  return (
    <section
      className="relative z-10 py-16 sm:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      <div
        className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 w-full px-4"
        dir="rtl"
      >
        {/* First hemistich */}
        <motion.p
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
          className="font-bold text-center whitespace-nowrap select-none"
          style={{
            fontFamily: 'var(--font-marhey)',
            fontSize: 'clamp(2rem, 6vw, 6rem)',
            color: 'var(--foreground)',
          }}
        >
          {VERSE_FIRST}
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-12 sm:w-20" style={{ backgroundColor: 'var(--primary)' }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
          <div className="h-px w-12 sm:w-20" style={{ backgroundColor: 'var(--primary)' }} />
        </motion.div>

        {/* Second hemistich */}
        <motion.p
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1], delay: 0.2 }}
          className="font-bold text-center whitespace-nowrap select-none"
          style={{
            fontFamily: 'var(--font-marhey)',
            fontSize: 'clamp(2rem, 6vw, 6rem)',
            color: 'var(--primary)',
          }}
        >
          {VERSE_SECOND}
        </motion.p>

        {/* Attribution */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm sm:text-base mt-4"
          style={{
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-marhey)',
          }}
        >
          — المتنبي
        </motion.span>
      </div>
    </section>
  );
}

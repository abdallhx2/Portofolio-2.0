'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

interface ServicesGridProps {
  className?: string;
  showHeader?: boolean;
  maxItems?: number;
}


export function ServicesGrid({
  className = '',
  showHeader = true,
  maxItems,
}: ServicesGridProps) {
  const { t, isRTL } = useLanguage();
  const { services } = useTranslatedData();

  if (!services || services.length === 0) {
    return null;
  }

  const displayedServices = maxItems ? services.slice(0, maxItems) : services;

  const getSpanClass = (index: number, total: number) => {
    if (index === 0) return "sm:col-span-2 lg:col-span-2";
    if (index === total - 1 && total > 3) return "sm:col-span-2 lg:col-span-1";
    if (index === 3) return "lg:col-span-2";
    return "";
  };

  return (
    <section
      className={`section-unified ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container-unified">
        {showHeader && (
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div className="max-w-2xl">
              <h2 className="title-section mb-3" style={{ color: 'var(--foreground)' }}>
                {t('home.servicesTitle') || 'Services I Provide'}
              </h2>
              <p className="text-subtitle" style={{ color: 'var(--muted-foreground)' }}>
                {t('home.servicesDesc') ||
                  'Pushing the limits of innovation with services that redefine possibilities.'}
              </p>
            </div>
          </div>
        )}

        <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
                ease: 'easeOut',
              }}
              className={getSpanClass(index, displayedServices.length)}
            >
              <BentoGridItem
                title={service.title}
                description={service.features.slice(0, 3).join(' • ')}
                header={
                  <div className="flex flex-1 w-full h-40 min-h-[10rem] rounded-xl overflow-hidden relative">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                }
                className="h-full"
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

export default ServicesGrid;

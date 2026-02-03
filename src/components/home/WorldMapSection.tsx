"use client";

import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { FadeIn } from "@/components/Animations";

export function WorldMapSection() {
  const { isRTL, language } = useLanguage();

  const subtitle =
    language === "ar"
      ? "أشتغل عن بُعد مع عملاء من مختلف أنحاء العالم، وأقدم حلول تقنية بجودة عالية بغض النظر عن الموقع."
      : "I work remotely with clients across the globe, delivering quality solutions regardless of location.";

  return (
    <section className="py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-7xl mx-auto text-center section-padding">
        <FadeIn direction="up" duration={0.8}>
          <p className="title-section font-bold" style={{ color: "var(--foreground)" }}>
            {language === "en" ? (
              <>
                Available{" "}
                <span style={{ color: "var(--primary)" }}>
                  {"Worldwide".split("").map((char, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </>
            ) : (
              <>
                متاح{" "}
                <span style={{ color: "var(--primary)" }}>
                  {"حول العالم".split("").map((char, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ x: 10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </>
            )}
          </p>
        </FadeIn>
        <FadeIn direction="up" duration={0.8} delay={0.2}>
          <p
            className="text-body max-w-2xl mx-auto py-4"
            style={{ color: "var(--muted)" }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {subtitle}
          </p>
        </FadeIn>
      </div>
      <FadeIn direction="up" duration={1} delay={0.4}>
        <WorldMap
          lineColor="var(--primary)"
          dots={[
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
              end: { lat: 51.5074, lng: -0.1278 },   // London
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
              end: { lat: 40.7128, lng: -74.006 },   // New York
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
              end: { lat: 35.6762, lng: 139.6503 },  // Tokyo
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
              end: { lat: -33.8688, lng: 151.2093 }, // Sydney
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
              end: { lat: 52.52, lng: 13.405 },      // Berlin
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil
            },
          ]}
        />
      </FadeIn>
    </section>
  );
}

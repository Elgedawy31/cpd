"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Scroll-based resize effect
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!heroRef.current) return;

        const scrollY = window.scrollY;

        // Calculate scroll progress (0 = top of hero, 1 = scrolled past hero)
        // Start resizing after 50px scroll, complete at 500px
        const scrollStart = 50;
        const scrollEnd = 500;
        const scrollDistance = Math.max(0, scrollY - scrollStart);
        const maxScroll = scrollEnd - scrollStart;

        // Clamp progress between 0 and 1
        const progress = Math.min(1, scrollDistance / maxScroll);

        // Apply smooth easing (cubic-bezier for professional feel)
        const easedProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        setScrollProgress(easedProgress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Calculate dynamic values based on scroll progress
  // Keep fixed height to prevent layout shifts
  const initialHeight = 100; // 100vh (fixed)

  // Scale factor for video (starts at 1, scales down)
  const initialScale = 1;
  const finalScale = 0.85;
  const currentScale = initialScale - (initialScale - finalScale) * scrollProgress;

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative w-full overflow-hidden  ${locale === "ar" ? "text-right" : "text-left"
        }`}
      style={{
        height: `${initialHeight}vh`,
        minHeight: `${initialHeight}vh`,
      }}
    >
      {/* Background Video */}
      <div
        className="absolute top-0 left-0 w-full h-full -z-10 origin-center transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${currentScale})`,
          willChange: "transform",
          height: "100%",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-bg.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay Content */}
      <div
        className="relative z-10 container mx-auto px-4 lg:px-0 flex flex-col justify-center"
        style={{
          height: "100%",
        }}
      >
        <p className="text-white text-sm font-bold mb-2">
          {t("sharedVision")}
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-4 leading-tight transition-all duration-300 ease-out">
          {t("title")}
        </h1>

        <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl font-medium transition-all duration-300 ease-out">
          {t("subtitle1")}
        </p>

        <div className="flex gap-4">
          <a
            href={`/${locale}/#about`}
            className="px-6 py-3 bg-white text-primary rounded-md font-semibold text-lg hover:opacity-70 transition-opacity duration-300"
          >
            {t("buttonPrimary")}
          </a>
        </div>
      </div>
    </section>
  );
}

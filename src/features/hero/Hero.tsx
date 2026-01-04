"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);

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
      className={`relative w-full overflow-hidden  ${
        locale === "ar" ? "text-right" : "text-left"
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
        {/* Fallback image - shown behind video as backup */}
        <Image
          src="/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
          priority
          aria-hidden="true"
        />
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
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 flex flex-col justify-center"
        style={{
          height: "100%",
        }}
      >
        <p data-aos="fade-up" className="text-white text-sm font-bold mb-2">
          {t("sharedVision")}
        </p>
        <h1  
        data-aos-delay='300'
          data-aos="fade-up" 
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-4 leading-tight transition-all duration-300 ease-out"
         
        >
          {t("title")}
        </h1>

        <p  
          data-aos="fade-up" 
          data-aos-delay='600' 
          className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl font-medium transition-all duration-300 ease-out"
        
        >
          {t("subtitle1")}
        </p>

        <div data-aos="fade-up" data-aos-delay='900' className="flex gap-4">
          <a 
            href={`/${locale}/#about`}
            className="px-6 py-3 bg-primary text-white rounded-md font-semibold text-lg hover:bg-primary-700 transition-colors duration-300"
          >
            {t("buttonPrimary")}
          </a>
        </div>
      </div>
    </section>
  );
}

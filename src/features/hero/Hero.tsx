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
        <h1  
          data-aos="fade-up" 
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-300 ease-out"
          style={{
            transform: `translateY(${scrollProgress * -20}px)`,
            opacity: 1 - scrollProgress * 0.3,
          }}
        >
          {t("title")}
        </h1>

        <p  
          data-aos="fade-up" 
          data-delay='200' 
          className="text-white/80 text-md md:text-lg ps-2 mb-3 max-w-xl font-bold transition-all duration-300 ease-out"
          style={{
            transform: `translateY(${scrollProgress * -15}px)`,
            opacity: 1 - scrollProgress * 0.4,
          }}
        >
          {t("subtitle1")}
        </p>
      </div>

      {/* Stats Section */}
      {/* <div
        data-aos="fade-up" 
        data-aos-delay="600"
        ref={ref}
        className="absolute bottom-0 w-full bg-black/50 backdrop-blur-md transition-all duration-300 ease-out"
        style={{
          paddingTop: `${32 - scrollProgress * 16}px`,
          paddingBottom: `${32 - scrollProgress * 16}px`,
          opacity: scrollProgress > 0.7 ? 0 : 1,
          transform: `translateY(${scrollProgress * 20}px)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-2 sm:grid-cols-5 gap-6 text-center text-white">
          
          
          {stats.map((stat)=>(
             <div key={stat}  className="flex flex-col gap-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary-200">
                +
                {inView ? (
                  <CountUp
                    start={0}
                    end={Number(t(`stats.${stat}.value`))}
                    duration={5.5}
                    separator=","
                  />
                ) : (
                  0
                )}
              </p>
              <p className="text-sm  uppercase tracking-wide">
                {t(`stats.${stat}.label`)}
              </p>
            </div>
          ))}
           
        </div>
      </div> */}
    </section>
  );
}
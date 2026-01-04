"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Expanded stats data
  const stats = [
   'Countries',
   'Clients',
   'Employees',
   'ProjectsCompleted',
   'Companies'
  ];
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);

  // Scroll-based resize effect with smooth interpolation
  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;

    const smoothEaseInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!heroRef.current) return;

        const scrollY = window.scrollY;
        
        // Calculate scroll progress with larger range for smoother transition
        // Start resizing after 0px scroll, complete at 800px for smoother effect
        const scrollStart = 0;
        const scrollEnd = 800;
        const scrollDistance = Math.max(0, scrollY - scrollStart);
        const maxScroll = scrollEnd - scrollStart;
        
        // Clamp progress between 0 and 1
        const rawProgress = Math.min(1, scrollDistance / maxScroll);
        
        // Apply smooth easing function
        targetProgress = smoothEaseInOutCubic(rawProgress);
      });
    };

    // Smooth interpolation loop for ultra-smooth transitions
    const interpolateProgress = () => {
      // Smooth interpolation factor (lower = smoother but slower response)
      const interpolationFactor = 0.15;
      
      // Gradually move current progress towards target
      currentProgress += (targetProgress - currentProgress) * interpolationFactor;
      
      // Apply additional smoothing with ease-in-out
      const smoothedProgress = smoothEaseInOutCubic(currentProgress);
      setScrollProgress(smoothedProgress);
      
      rafRef.current = requestAnimationFrame(interpolateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    interpolateProgress(); // Start interpolation loop

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // Calculate dynamic values based on scroll progress
  const initialHeight = 100; // 100vh
  const finalHeight = 40; // 40vh
  const currentHeight = initialHeight - (initialHeight - finalHeight) * scrollProgress;
  
  // Scale factor for video (starts at 1, scales down)
  const initialScale = 1;
  const finalScale = 0.85;
  const currentScale = initialScale - (initialScale - finalScale) * scrollProgress;

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative w-full overflow-hidden ${
        locale === "ar" ? "text-right" : "text-left"
      }`}
      style={{
        height: `${currentHeight}vh`,
        minHeight: `${currentHeight}vh`,
        willChange: "height",
        transition: "none", // Remove CSS transition for smoother JS control
      }}
    >
      {/* Background Video */}
      <div 
        className="absolute top-0 left-0 w-full h-full -z-10 origin-center"
        style={{
          transform: `scale(${currentScale})`,
          willChange: "transform",
          height: "100%",
          transition: "none", // Remove CSS transition for smoother JS control
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
          paddingTop: `${20 + scrollProgress * 10}px`,
          paddingBottom: `${20 + scrollProgress * 10}px`,
          transition: "none", // Remove CSS transition for smoother JS control
        }}
      >
        <h1  
          data-aos="fade-up" 
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          style={{
            transform: `translateY(${scrollProgress * -20}px)`,
            opacity: 1 - scrollProgress * 0.3,
            transition: "none", // Remove CSS transition for smoother JS control
          }}
        >
          {t("title")}
        </h1>

        <p  
          data-aos="fade-up" 
          data-delay='200' 
          className="text-white/80 text-md md:text-lg ps-2 mb-3 max-w-xl font-bold"
          style={{
            transform: `translateY(${scrollProgress * -15}px)`,
            opacity: 1 - scrollProgress * 0.4,
            transition: "none", // Remove CSS transition for smoother JS control
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

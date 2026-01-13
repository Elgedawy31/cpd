"use client";

import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function OurPartners() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [allLogos, setAllLogos] = useState<{ logo: string; isValid: boolean }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPartnerLogos();
  }, []);

  function getPartnerLogos() {
    const logos = [] as { logo: string; isValid: boolean }[];
    // Start from 2 since Image_01.png doesn't exist, go up to 41
    for (let i = 2; i <= 41; i++) {
      const twoDigit = String(i).padStart(2, "0");
      logos.push({ logo: `/ourPartners/Image_${twoDigit}.png`, isValid: true });
    }
    setAllLogos(logos);
  }

  const handleImageError = (logoPath: string) => {
    setAllLogos((prev) => {
      return prev.map((logo) => 
        logo.logo === logoPath ? { ...logo, isValid: false } : logo
      );
    });
  };

  // Filter out invalid logos and group into pages of 12 (4x3 grid)
  const validLogos = allLogos.filter((logo) => logo.isValid);
  const logosPerPage = 12;
  const totalPages = Math.ceil(validLogos.length / logosPerPage);
  const currentLogos = validLogos.slice(
    currentPage * logosPerPage,
    (currentPage + 1) * logosPerPage
  );

  // Auto-advance pages every 1 second
  useEffect(() => {
    if (totalPages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      if (isRTL) handlePrev();
      else handleNext();
    }
    if (isRightSwipe) {
      if (isRTL) handleNext();
      else handlePrev();
    }
  };

  return (
    <section
      id="partners"
      className="relative w-full py-8 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60"
    >
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div
            className={`${isRTL ? "lg:order-2" : "lg:order-1"} max-w-2xl`}
          >
            {/* Top Label */}
            <div className="mb-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                {t("title").toUpperCase()}
              </span>
            </div>
            
            {/* Main Headline */}
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4 leading-tight"
            >
              {t("subtitle")}
            </h2>
            
            {/* Descriptive Paragraph */}
            <p
              className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed whitespace-pre-line "
            >
              {t("description")}
            </p>
          </div>

          {/* Right Side - Logo Grid with Swipe */}
          <div
            className={`relative ${isRTL ? "lg:order-1" : "lg:order-2"}`}
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Logo Grid - Fixed height to prevent layout shift (4 columns x 3 rows = 12 logos) */}
            <div className="grid grid-cols-4 grid-rows-3 gap-3 relative h-[312px]">
              {Array.from({ length: 12 }).map((_, index) => {
                const logo = currentLogos[index];
                if (!logo) {
                  return <div key={`${currentPage}-${index}`} className="invisible" />;
                }
                return (
                  <div
                    key={`${currentPage}-${index}`}
                    className="relative bg-white border border-border rounded-lg p-2 h-24 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-105"
                  >
                    <Image
                      src={logo.logo}
                      alt={`Partner ${currentPage * logosPerPage + index + 1}`}
                      fill
                      className="object-contain p-1.5"
                      sizes="(max-width: 768px) 25vw, 100px"
                      loading="lazy"
                      onError={() => handleImageError(logo.logo)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

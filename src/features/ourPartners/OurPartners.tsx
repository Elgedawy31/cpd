"use client";

import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OurPartners() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [allLogos, setAllLogos] = useState<{ logo: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPartnerLogos();
  }, []);

  function getPartnerLogos() {
    const logos = [] as { logo: string }[];
    for (let i = 1; i <= 40; i++) {
      const twoDigit = String(i).padStart(2, "0");
      logos.push({ logo: `/ourPartners/Image_${twoDigit}.png` });
    }
    setAllLogos(logos);
  }

  // Group logos into pages of 9 (3x3 grid)
  const logosPerPage = 9;
  const totalPages = Math.ceil(allLogos.length / logosPerPage);
  const currentLogos = allLogos.slice(
    currentPage * logosPerPage,
    (currentPage + 1) * logosPerPage
  );

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
      className="relative w-full py-16 bg-white"
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
          <div className={`${isRTL ? "lg:order-2" : "lg:order-1"} max-w-2xl`}>
            {/* Top Label */}
            <div className="mb-3">
              <span className="text-xs sm:text-sm font-normal uppercase tracking-wider text-foreground">
                {t("title").toUpperCase()}
              </span>
            </div>
            
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
              {t("subtitle")}
            </h2>
            
            {/* Descriptive Paragraph */}
            <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
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
            {/* Navigation Buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted transition-colors"
                aria-label="Previous"
              >
                {isRTL ? (
                  <ChevronRight className="w-5 h-5 text-foreground" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                )}
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted transition-colors"
                aria-label="Next"
              >
                {isRTL ? (
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>

            {/* Logo Grid */}
            <div className="grid grid-cols-3 gap-4 relative">
              {currentLogos.map((logo, index) => (
                <div
                  key={`${currentPage}-${index}`}
                  className="relative bg-white border border-border rounded-lg p-4 aspect-square flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-105 animate-fade-in"
                >
                  <Image
                    src={logo.logo}
                    alt={`Partner ${currentPage * logosPerPage + index + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 33vw, 150px"
                    loading="lazy"
                  />
                </div>
              ))}
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

"use client";

import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CustomHeader from "@/components/CustomHeader";
import Image from "next/image";

export default function OurPartners() {
  const t = useTranslations("Partners");
  const locale = useLocale(); 
  const isRTL = locale === "ar"; 
  
  const [cards, setCards] = useState<{ logo: string }[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, mirror: false });
    getPartnerLogos();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const win = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: { timeout?: number }
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setIsIdle(true), {
        timeout: 1200,
      });
      return () => win.cancelIdleCallback && win.cancelIdleCallback(id);
    }
    const t = window.setTimeout(() => setIsIdle(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  function getPartnerLogos() {
    const logos = [] as { logo: string }[];
    for (let i = 1; i <= 40; i++) {
      const twoDigit = String(i).padStart(2, "0");
      logos.push({ logo: `/ourPartners/Image_${twoDigit}.png` });
    }
    setCards(logos);
  }

  return (
    <section
      id="partners"
      className="relative w-full py-8 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60"
      ref={sectionRef}
    >
      <CustomHeader title={t("title")} subTitle={t("subtitle")} />

      <div 
    data-aos="fade-up"
    className="container mx-auto px-6 lg:px-12 overflow-hidden" style={{ contentVisibility: "auto", containIntrinsicSize: "300px" }}>
        {isInView && isIdle ? (
          <div
            className={`flex ${
              isRTL ? "animate-scroll-rtl" : "animate-scroll-ltr"
            } gap-10 whitespace-nowrap`}
          >
            {[...cards, ...cards].map((card, index) => (
              <div key={index} className="inline-block mx-6">
                <div className="border-b border-border p-3 rounded-xl shadow-md bg-card transition-all duration-100">
                  <div className="relative w-[120px] h-[100px] flex items-center justify-center">
                    <Image
                      src={card.logo}
                      alt={`partner ${index + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                      decoding="async"
                      unoptimized
                      sizes="120px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[140px] w-full" />
        )}

        <style jsx>{`
          @keyframes scroll-ltr {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scroll-rtl {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(50%);
            }
          }

          .animate-scroll-ltr {
            display: inline-flex;
            animation: scroll-ltr 60s linear infinite;
            width: max-content;
          }

          .animate-scroll-rtl {
            display: inline-flex;
            animation: scroll-rtl 60s linear infinite;
            width: max-content;
          }
        `}</style>
      </div>
    </section>
  );
}

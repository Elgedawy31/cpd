"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";
import VerticalSlider from "@/components/VerticalSlider";
import CustomHeader from "@/components/CustomHeader";
import AOS from "aos";
import "aos/dist/aos.css";

type BusinessArea = {
  name: string;
  tags: string[];
  image: string;
};

export default function BusinessAreas() {
  const t = useTranslations("businessAreas");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const areas: BusinessArea[] = t.raw("areas");

  const sliderItems = areas.map((area, index) => ({
    id: `area-${index}`,
    label: area.name,
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeArea = areas[activeIndex] ?? areas[0];

  // Check URL hash for area index on mount and when hash changes
  useEffect(() => {
    const checkHashForArea = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash.includes("businessAreas")) {
          // Remove # from hash and split
          const hashWithoutHash = hash.replace('#', '');
          const parts = hashWithoutHash.split("?");
          if (parts.length > 1) {
            const urlParams = new URLSearchParams(parts[1]);
            const areaIndex = urlParams.get("area");
            if (areaIndex !== null) {
              const index = parseInt(areaIndex, 10);
              if (!isNaN(index) && index >= 0 && index < areas.length) {
                setActiveIndex(index);
              }
            }
          }
        }
      }
    };

    checkHashForArea();

    // Listen for hash changes
    const handleHashChange = () => {
      checkHashForArea();
    };

    // Listen for custom businessAreaChange event
    const handleBusinessAreaChange = (event: CustomEvent<{ index: number }>) => {
      const index = event.detail.index;
      if (index >= 0 && index < areas.length) {
        setActiveIndex(index);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("businessAreaChange", handleBusinessAreaChange as EventListener);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("businessAreaChange", handleBusinessAreaChange as EventListener);
    };
  }, [areas.length]);

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true, 
      mirror: false,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Re-trigger animations when active area changes
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
      // Force re-animation for dynamic content
      const animatedElements = document.querySelectorAll('[data-aos-once="false"]');
      animatedElements.forEach((el) => {
        el.classList.remove('aos-animate');
      });
      AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section
      id="businessAreas"
      className="relative w-full py-8 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div data-aos="fade-down" data-aos-duration="800">
          <CustomHeader title={t("title")} subTitle={t("subtitle")} />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,1fr)] items-center">
          {/* Left: Image + content, driven by activeIndex */}
          <div
            key={`image-container-${activeIndex}`}
            data-aos={isRTL ? "fade-left" : "fade-right"}
            data-aos-duration="1000"
            data-aos-delay="200"
            className="relative overflow-hidden rounded-3xl bg-black/5 shadow-lg min-h-[320px] lg:min-h-[420px]"
          >
            {/* Background image (placeholder for now) */}
            <Image
              src={activeArea?.image ?? "/area.webp"}
              alt={activeArea?.name ?? "Business area"}
              fill
              priority={false}
              className="object-cover transition-opacity duration-500"
            />
            {/* Gradient overlay for text readability */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/35 to-black/5 " />

            {/* Foreground content */}
            <div
              key={`content-${activeIndex}`}
              className="relative z-10 flex flex-col min-h-[320px] lg:min-h-[420px] justify-end p-6 sm:p-8 lg:p-10 text-white"
            >
              <div
                className="space-y-3 sm:space-y-4"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
                data-aos-once="false"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                  {t("title")}
                </p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                  {activeArea?.name}
                </h3>
              </div>

              {/* Tags row */}
              <div
                key={`tags-${activeIndex}`}
                className="mt-6 flex flex-wrap gap-2 max-w-3xl"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="500"
                data-aos-once="false"
              >
                {activeArea?.tags.map((tag, idx) => (
                  <span
                    key={`${activeIndex}-${idx}`}
                    className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs sm:text-sm uppercase tracking-wide text-white/90 backdrop-blur-sm"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay={`${600 + idx * 50}`}
                    data-aos-once="false"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Vertical slider with area labels */}
          <div
            className="relative"
            data-aos={isRTL ? "fade-right" : "fade-left"}
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <VerticalSlider
              items={sliderItems}
              activeIndex={activeIndex}
              onItemChange={setActiveIndex}
              autoAdvance={true}
              autoAdvanceInterval={6000}
              isRTL={isRTL}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

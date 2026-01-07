"use client";

import { useTranslations, useLocale } from "next-intl";
import { useMemo, useState } from "react";
import Image from "next/image";
import VerticalSlider from "@/components/VerticalSlider";
import CustomHeader from "@/components/CustomHeader";

type BusinessArea = {
  name: string;
  tags: string[];
};

export default function BusinessAreas() {
  const t = useTranslations("businessAreas");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Base area labels from translations
  const areasRaw = t.raw("areas") as Array<{
    name: string;
    description?: string;
  }>;

  // UI model with placeholder tags for now (you can customize later)
  const areas: BusinessArea[] = useMemo(
    () =>
      areasRaw.map((area, index) => ({
        name: area.name,
        tags: [
          `${area.name} Tag 1`,
          `${area.name} Tag 2`,
          `${area.name} Tag 3`,
        ].slice(0, 3 - (index % 2)), // just to vary count a bit
      })),
    [areasRaw]
  );

  const sliderItems = areas.map((area, index) => ({
    id: `area-${index}`,
    label: area.name,
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeArea = areas[activeIndex] ?? areas[0];

  return (
    <section
      id="businessAreas"
      className="relative w-full py-20 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <CustomHeader title={t("title")} subTitle={t("subtitle")} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] items-stretch">
          {/* Left: Image + content, driven by activeIndex */}
          <div className="relative overflow-hidden rounded-3xl bg-black/5 shadow-lg min-h-[320px] lg:min-h-[420px]">
            {/* Background image (placeholder for now) */}
            <Image
              src="/area.webp"
              alt={activeArea?.name ?? "Business area"}
              fill
              priority={false}
              className="object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/35 to-black/5" />

            {/* Foreground content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10 text-white">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                  {t("title")}
                </p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                  {activeArea?.name}
                </h3>
              </div>

              {/* Tags row */}
              <div className="mt-6 flex flex-wrap gap-2 max-w-3xl">
                {activeArea?.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs sm:text-sm uppercase tracking-wide text-white/90 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Vertical slider with area labels */}
          <div className="relative">
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

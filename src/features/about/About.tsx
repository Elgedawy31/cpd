"use client";

import { useTranslations, useLocale } from "next-intl";
import { useMemo, useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import HorizontalSlider from "@/components/HorizontalSlider";
import Image from "next/image";

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Sections for About / Mission / Vision (can be extended later)
  const sections = useMemo(
    () => [
      {
        id: "about",
        label: t("aboutTitle"),
        title: t("aboutTitle"),
        description: t("aboutDescription"),
        image: "/About.jpg", // placeholder image
      },
      {
        id: "mission",
        label: t("missionTitle"),
        title: t("missionTitle"),
        description: t("missionDescription"),
        image: "/Mission.jpg", // placeholder image
      },
      {
        id: "vision",
        label: t("visionTitle"),
        title: t("visionTitle"),
        description: t("visionDescription"),
        image: "/Vision.jpg", // placeholder image
      },
    ],
    [t]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex] ?? sections[0];

  return (
    <section
      id="about"
      className={`relative w-full bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 py-8 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div>
          <CustomHeader title={t("title")} subTitle={t("subtitle")} />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5 items-start">
          {/* Left: Image that changes with active section */}
          <div
            key={`image-${activeIndex}`}
            className="relative h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden rounded-xl bg-black/5 shadow-lg lg:col-span-3"
          >
            <Image
              src={activeSection.image}
              alt={activeSection.title}
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10" />

            <div 
              key={`image-title-${activeIndex}`}
              className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 text-white"
            >
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {activeSection.title}
              </h3>
            </div>
          </div>

          {/* Right: Horizontal slider on top, text below */}
          <div
            className={`${isRTL ? "lg:order-first" : ""} space-y-8 lg:col-span-2`}
          >
            {/* Text content */}
            <div className="space-y-4">
              <h2 
                key={`title-${activeIndex}`}
                className="text-3xl font-bold text-foreground"
              >
                {activeSection.title}
              </h2>
              <p 
                key={`description-${activeIndex}`}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              >
                {activeSection.description}
              </p>
            </div>

            <div>
              <HorizontalSlider
                items={sections.map((section) => ({
                  id: section.id,
                  label: section.label,
                }))}
                activeIndex={activeIndex}
                onItemChange={setActiveIndex}
                autoAdvance={true}
                autoAdvanceInterval={6000}
                isRTL={isRTL}
                className="w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


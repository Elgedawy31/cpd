"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import HorizontalImageSlider from "@/components/HorizontalImageSlider";
import VerticalSlider from "@/components/VerticalSlider";
import CustomHeader from "@/components/CustomHeader";

// Filter options (ENERGY, METAL CASTING, etc.)
const filterOptions = [
  { id: "energy", label: "ENERGY" },
  { id: "metalCasting", label: "METAL CASTING" },
] as const;

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [activeFilter, setActiveFilter] = useState(0);

  // Image slider items (Mission and Vision)
  const imageSliderItems = useMemo(
    () => [
      {
        id: "mission",
        image: "/area.webp", // Placeholder - you can change this
        title: t("missionTitle"),
      },
      {
        id: "vision",
        image: "/area.webp", // Placeholder - you can change this
        title: t("visionTitle"),
      },
    ],
    [t]
  );

  // Vertical slider items for filter
  const filterSliderItems = filterOptions.map((option) => ({
    id: option.id,
    label: option.label,
  }));

  // Get current statistics based on active filter
  const currentStats = useMemo(() => {
    const filterKey = filterOptions[activeFilter]?.id as "energy" | "metalCasting";
    return t.raw(`stats.${filterKey}`) as {
      patents: string;
      years: string;
      countries: string;
      pounds: string;
    };
  }, [activeFilter, t]);

  return (
    <section
      id="about"
      className={`relative w-full bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 py-16 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <CustomHeader title={t("title")} subTitle={t("subtitle")} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-stretch">
          {/* Left: Horizontal Image Slider */}
          <div className={`${isRTL ? "lg:order-2" : "lg:order-1"} h-[400px] lg:h-[500px]`}>
            <HorizontalImageSlider
              items={imageSliderItems}
              autoAdvance={true}
              autoAdvanceInterval={6000}
              isRTL={isRTL}
              className="h-full"
            />
          </div>

          {/* Right: Text Content with Filter and Statistics */}
          <div className={`${isRTL ? "lg:order-1" : "lg:order-2"} space-y-8`}>
            {/* Mission Content */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                {t("missionTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("missionMain")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("missionDetail1")}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("missionDetail2")}
                </p>
              </div>
            </div>

            {/* Filter Selector */}
            <div className="mt-8">
              <VerticalSlider
                items={filterSliderItems}
                activeIndex={activeFilter}
                onItemChange={setActiveFilter}
                autoAdvance={false}
                isRTL={isRTL}
                className="min-h-[120px]"
              />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {currentStats?.patents || "0"}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  PATENTS
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {currentStats?.years || "0"}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  YEARS
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {currentStats?.countries || "0"}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  COUNTRIES
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {currentStats?.pounds || "0"}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  POUNDS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

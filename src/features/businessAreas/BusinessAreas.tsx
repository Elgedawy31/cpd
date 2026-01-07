"use client";

import { useTranslations, useLocale } from "next-intl";
import VerticalSlider from "@/components/VerticalSlider";
import CustomHeader from "@/components/CustomHeader";

export default function BusinessAreas() {
  const t = useTranslations("businessAreas");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const areas = t.raw("areas") as Array<{
    name: string;
    description?: string;
  }>;

  const sliderItems = areas.map((area, index) => ({
    id: `area-${index}`,
    label: area.name,
  }));

  return (
    <section
      id="businessAreas"
      className="relative w-full py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <CustomHeader title={t("title")} subTitle={t("subtitle")} />

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative min-h-[600px]">
            <VerticalSlider
              items={sliderItems}
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


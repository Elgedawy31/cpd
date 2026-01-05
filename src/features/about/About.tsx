"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import About_lottie_1 from "./About_lottie_1";
import About_lottie_2 from "./About_lottie_2";
import CustomHeader from "@/components/CustomHeader";

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);

  const items = [
    {
      key: "vision",
      title: t("visionTitle"),
      description: t("visionDescription"),
      img: "/vision.jpg",
    },
    {
      key: "mission",
      title: t("missionTitle"),
      description: t("missionDescription"),
      img: "/mission.jpg",
    },
  ];

  return (
    <section
    id="about"
      className={`relative w-full bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 py-8 ${
        locale === "ar" ? "text-right" : "text-left"
      }`}
    >
      <CustomHeader title={t('title')} subTitle={t('subtitle')} />

      {/* Vision + Mission Sections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-0">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={item.key}
              data-aos="fade-up"
              data-aos-delay={idx * 200}
              className={`flex flex-col md:flex-row items-center gap-6 ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="relative w-full md:w-1/2   rounded-2xl overflow-hidden shadow-xl">
                {idx === 0 ? <About_lottie_2 /> : <About_lottie_1 />}
              </div>

              {/* Text */}
              <div className="md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="max-w-5xl mx-auto mt-24 px-6 lg:px-12 text-center"
      >
        <h3 className="text-3xl font-bold text-primary mb-6">
          {t("expertiseTitle")}
        </h3>
        <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
          {t("expertiseDescription")}
        </p>
      </div>
    </section>
  );
}

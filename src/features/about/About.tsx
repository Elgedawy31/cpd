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

     
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ShieldCheck,
  Building2,
  Laptop,
  BrainCircuit,
  Layers3,
} from "lucide-react";
import CustomHeader from "@/components/CustomHeader";

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);

  const cards = [
    {
      key: "risk",
      title: t("risk.title"),
      description: t("risk.description"),
      icon: (
        <ShieldCheck className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
      ),
    },
    {
      key: "facade",
      title: t("facade.title"),
      description: t("facade.description"),
      icon: (
        <Building2 className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
      ),
    },
    {
      key: "softwareDistribution",
      title: t("softwareDistribution.title"),
      description: t("softwareDistribution.description"),
      icon: (
        <Laptop className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
      ),
    },
    {
      key: "softwareSolutions",
      title: t("softwareSolutions.title"),
      description: t("softwareSolutions.description"),
      icon: (
        <BrainCircuit className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
      ),
    },
    {
      key: "integratedEngineering",
      title: t("integratedEngineering.title"),
      description: t("integratedEngineering.description"),
      icon: (
        <Layers3 className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
      ),
    },
  ];

  return (
    <section
      id="why-us"
      className="relative w-full py-8 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 "
    >
           <CustomHeader title={t('title')} subTitle={t('subtitle')} />

      <div
        data-aos="fade-up"
        className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-10 sm:grid-cols-1 lg:grid-cols-2"
      >
        {cards.map((card) => (
          <div
            key={card.key}
            className="group relative bg-card border border-border rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 text-left hover:bg-primary/5 hover:-translate-y-2"
          >
            <div className="flex flex-col items-start space-y-4">
              {card.icon}
              <h3 className="text-2xl font-bold text-primary group-hover:text-primary-700 transition-colors duration-500">
                {card.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed text-base sm:text-lg group-hover:text-foreground transition-colors duration-500">
                {card.description}
              </p>
            </div>
            <button className="mt-6 px-5 py-2 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-500">
              {t("learnMore")}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

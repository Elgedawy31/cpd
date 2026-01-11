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
import WhyChooseUsCard from "@/components/WhyChooseUsCard";

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true, 
      mirror: false,
      offset: 100,
      easing: 'ease-out-cubic'
    });
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
      <div data-aos="fade-down" data-aos-duration="800">
        <CustomHeader title={t('title')} subTitle={t('subtitle')} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-10 sm:grid-cols-1 lg:grid-cols-2">
        {cards.map((card, index) => (
          <div
            key={card.key}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={index * 150}
          >
            <WhyChooseUsCard
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

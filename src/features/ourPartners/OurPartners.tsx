"use client";

import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CustomHeader from "@/components/CustomHeader";
import Image from "next/image";

export default function OurPartners() {
  const t = useTranslations("Partners");
  const locale = useLocale(); 
  const isRTL = locale === "ar"; 
  
  const [cards, setCards] = useState<{ logo: string }[]>([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
    getPartnerLogos();
  }, []);

  function getPartnerLogos() {
    const logos = [];
    for (let index = 1; index <= 40; index++) {
      logos.push({
        logo: `/ourPartners/Image_${index < 9 ? "0" : ""}${index + 1}.png`,
      });
    }
    setCards(logos);
  }

  return (
    <section
      id="partners"
      className="relative w-full py-8 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60"
    >
      <CustomHeader title={t("title")} subTitle={t("subtitle")} />

      <div className="container mx-auto px-6 lg:px-12 overflow-hidden">
        <div
          className={`flex ${
            isRTL ? "animate-scroll-rtl" : "animate-scroll-ltr"
          } gap-10 whitespace-nowrap`}
        >
          {[...cards, ...cards].map((card, index) => (
            <div
              key={index}
              className="inline-block mx-6"
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration={`${(index + 1) * 150}`}
            >
              <div className="border-b border-border p-3 rounded-xl shadow-md bg-card transition-all duration-100">
                <div className="relative w-[120px] h-[100px] flex items-center justify-center">
                  <Image
                    src={card.logo}
                    alt={`partner ${index + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

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

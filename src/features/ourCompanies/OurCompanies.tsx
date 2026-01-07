"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

type CompanyCard = {
  key: string;
  title: string;
  description: string;
  url: string;
  logo: string;
};

export default function OurCompanies() {
  const t = useTranslations("companies");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [selectedCompany, setSelectedCompany] = useState<CompanyCard | null>(null);

  const cards: CompanyCard[] = [
    {
      key: "cpv",
      title: t("cpv.title"),
      description: t("cpv.description"),
      url: "https://cpvarabia.com/",
      logo: "/ourCompanies/cpv-logo.png",
    },
    {
      key: "domApp",
      title: t("domApp.title"),
      description: t("domApp.description"),
      url: "https://www.domapphub.com/",
      logo: "/ourCompanies/domApp-logo.png",
    },
    {
      key: "domeFdh",
      title: t("domeFdh.title"),
      description: t("domeFdh.description"),
      url: "https://www.domefdh.com/",
      logo: "/ourCompanies/Dome.png",
    },
    {
      key: "designalEngineering",
      title: t("designalEngineering.title"),
      description: t("designalEngineering.description"),
      url: "https://www.designal.cc/",
      logo: "/ourCompanies/designalEngineering.png",
    },
    {
      key: "dlalat",
      title: t("dlalat.title"),
      description: t("dlalat.description"),
      url: "https://www.dlalat.com/",
      logo: "/ourCompanies/dlalatDark.png",
    },
  ];

  const handleCardClick = (card: CompanyCard) => {
    if (selectedCompany?.key === card.key) {
      setSelectedCompany(null);
    } else {
      setSelectedCompany(card);
    }
  };

  const handleClosePanel = () => {
    setSelectedCompany(null);
  };

  return (
    <section
      id="companies"
      className="relative w-full py-8 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 "
    >
      <CustomHeader title={t("title")} subTitle={t("subtitle")} />
      
      <div className="max-w-7xl  mx-auto px-6 lg:px-12">
        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.key}
              onClick={() => handleCardClick(card)}
              className={`
                relative  rounded-xl p-6 
                hover:shadow-lg
                border border-primary/10
                cursor-pointer transition-all duration-300 ease-in-out 
                hover:scale-[1.02]
                ${selectedCompany?.key === card.key 
                  ? " scale-[1.02] border-primary/20" 
                  : ""
                }
              `}
            >
              {/* Logo Container */}
              <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                <Image
                  src={card.logo}
                  alt={card.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              {/* Interaction Indicator */}
              <div className="flex justify-end mt-auto pt-2">
                {selectedCompany?.key === card.key ? (
                  <div className="h-0.5 w-5 bg-primary rounded-full" />
                ) : (
                  <Plus className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Detail Card */}
        <div
          className={`
            relative bg-primary-100/90 border border-border rounded-xl shadow-lg
            transition-all duration-500 ease-in-out overflow-hidden
            ${selectedCompany 
              ? "max-h-[500px] opacity-100 mt-8" 
              : "max-h-0 opacity-0 mt-0"
            }
          `}
        >
          {selectedCompany && (
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Close Button */}
                <button
                  onClick={handleClosePanel}
                  className={`
                    absolute top-4 ${isRTL ? "left-4" : "right-4"}
                    w-8 h-8 flex items-center justify-center
                    rounded-full bg-background/80 hover:bg-background
                    transition-colors duration-200
                    border border-border z-10
                  `}
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>

                {/* Left Side - Logo and Name */}
                <div className={`
                  flex flex-col items-center lg:items-start
                  ${isRTL ? "lg:ml-8" : "lg:mr-8"}
                  shrink-0
                  ${isRTL ? "lg:order-2" : "lg:order-1"}
                `}>
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src={selectedCompany.logo}
                      alt={selectedCompany.title}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                </div>

                {/* Right Side - Description and Link */}
                <div className={`
                  flex-1 flex flex-col justify-between
                  ${isRTL ? "lg:order-1" : "lg:order-2"}
                `}>
                  <div>
                    <h4 className="text-2xl font-semibold text-foreground mb-4">
                      {selectedCompany.title}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {selectedCompany.description}
                    </p>
                  </div>
                  
                  <a
                    href={selectedCompany.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center gap-2
                      text-base font-medium text-primary
                      hover:opacity-75 transition-opacity duration-200
                      group
                    `}
                  >
                    <span>{t("visit")}</span>
                    {isRTL ? (
                      <ChevronLeft className="w-5 h-5 transition-transform group-hover:translate-x-[-4px]" />
                    ) : (
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    )}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

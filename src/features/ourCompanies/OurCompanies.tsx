"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import CustomHeader from "@/components/CustomHeader";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const cards: CompanyCard[] = useMemo(() => [
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
  ], [t]);

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

  // Check URL hash for company key on mount and when hash changes
  useEffect(() => {
    const checkHashForCompany = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash.includes("companies")) {
          // Remove # from hash and split
          const hashWithoutHash = hash.replace('#', '');
          const parts = hashWithoutHash.split("?");
          if (parts.length > 1) {
            const urlParams = new URLSearchParams(parts[1]);
            const companyKey = urlParams.get("company");
            if (companyKey) {
              const company = cards.find(card => card.key === companyKey);
              if (company) {
                setSelectedCompany(company);
              }
            }
          }
        }
      }
    };

    checkHashForCompany();

    // Listen for hash changes
    const handleHashChange = () => {
      checkHashForCompany();
    };

    // Listen for custom companyChange event
    const handleCompanyChange = (event: CustomEvent<{ key: string }>) => {
      const companyKey = event.detail.key;
      const company = cards.find(card => card.key === companyKey);
      if (company) {
        setSelectedCompany(company);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("companyChange", handleCompanyChange as EventListener);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("companyChange", handleCompanyChange as EventListener);
    };
  }, [cards]);

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true, 
      mirror: false,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Re-trigger animations when selected company changes
  useEffect(() => {
    if (selectedCompany) {
      const timer = setTimeout(() => {
        AOS.refresh();
        const animatedElements = document.querySelectorAll('[data-aos-once="false"]');
        animatedElements.forEach((el) => {
          el.classList.remove('aos-animate');
        });
        AOS.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedCompany]);

  return (
    <section
      id="companies"
      className="relative w-full py-8 bg-linear-to-b from-primary-50/60 via-primary-100 to-primary-50/60 "
    >
      <div data-aos="fade-down" data-aos-duration="800">
        <CustomHeader title={t("title")} subTitle={t("subtitle")} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {cards.map((card, index) => (
            <div
              key={card.key}
              onClick={() => handleCardClick(card)}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
              className={`
                relative rounded-xl p-6 
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
          key={`detail-${selectedCompany?.key || 'none'}`}
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
                  data-aos="fade-in"
                  data-aos-duration="600"
                  data-aos-delay="200"
                  data-aos-once="false"
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
                <div
                  data-aos={isRTL ? "fade-left" : "fade-right"}
                  data-aos-duration="800"
                  data-aos-delay="300"
                  data-aos-once="false"
                  className={`
                    flex flex-col items-center lg:items-start
                    ${isRTL ? "lg:ml-8" : "lg:mr-8"}
                    shrink-0
                    ${isRTL ? "lg:order-2" : "lg:order-1"}
                  `}
                >
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
                <div
                  data-aos={isRTL ? "fade-right" : "fade-left"}
                  data-aos-duration="800"
                  data-aos-delay="400"
                  data-aos-once="false"
                  className={`
                    flex-1 flex flex-col justify-between
                    ${isRTL ? "lg:order-1" : "lg:order-2"}
                  `}
                >
                  <div>
                    <h4
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="500"
                      data-aos-once="false"
                      className="text-2xl font-semibold text-foreground mb-4"
                    >
                      {selectedCompany.title}
                    </h4>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="600"
                      data-aos-once="false"
                      className="text-base text-muted-foreground leading-relaxed mb-6"
                    >
                      {selectedCompany.description}
                    </p>
                  </div>
                  
                  <a
                    href={selectedCompany.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="700"
                    data-aos-once="false"
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

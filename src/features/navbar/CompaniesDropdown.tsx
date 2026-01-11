"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface CompaniesDropdownProps {
  isOpen: boolean;
  isRTL: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onCompanyClick?: (companyKey: string) => void;
}

export default function CompaniesDropdown({
  isOpen,
  isRTL,
  onMouseEnter,
  onMouseLeave,
  onCompanyClick,
}: CompaniesDropdownProps) {
  const t = useTranslations("navbar");
  const tCompanies = useTranslations("companies");

  const companies = [
    { 
      key: "cpv", 
      logo: "/ourCompanies/cpv-logo.png",
      url: "https://cpvarabia.com/"
    },
    { 
      key: "domApp", 
      logo: "/ourCompanies/domApp-logo.png",
      url: "https://www.domapphub.com/"
    },
    { 
      key: "domeFdh", 
      logo: "/ourCompanies/Dome.png",
      url: "https://www.domefdh.com/"
    },
    { 
      key: "designalEngineering", 
      logo: "/ourCompanies/designalEngineering.png",
      url: "https://www.designal.cc/"
    },
    { 
      key: "dlalat", 
      logo: "/ourCompanies/dlalatDark.png",
      url: "https://www.dlalat.com/"
    },
  ];

  const handleCompanyClick = (companyKey: string, companyUrl: string) => {
    // Open company URL in new window
    window.open(companyUrl, '_blank', 'noopener,noreferrer');
    
    // Scroll to companies section
    const element = document.getElementById("companies");
    if (element) {
      const navbarHeight = 80;
      const rect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + currentScrollY;
      const offsetPosition = elementTop - navbarHeight;
      
      // Set hash with company key
      window.location.hash = `companies?company=${companyKey}`;
      
      // Dispatch custom event to notify OurCompanies component
      window.dispatchEvent(new CustomEvent('companyChange', { detail: { key: companyKey } }));
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      
      // Call the callback if provided
      onCompanyClick?.(companyKey);
      
      // Close dropdown
      onMouseLeave();
    }
  };

  return (
    <div
      className={`absolute top-full left-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden z-50 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transform: isOpen
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-8px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="p-8">
        {/* Header */}
        <h3
          className={`text-2xl font-bold text-foreground mb-3 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("companiesTitle")}
        </h3>
        <p
          className={`text-sm text-muted-foreground leading-relaxed mb-6 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("companiesDescription")}
        </p>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-5 gap-4">
          {companies.map((company, index) => (
            <div
              key={company.key}
              onClick={() => handleCompanyClick(company.key, company.url)}
              className="relative h-[70px] bg-gray-50 rounded-lg overflow-hidden group/item transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-100 cursor-pointer"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen
                  ? "translateY(0) scale(1)"
                  : "translateY(10px) scale(0.95)",
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${
                  index * 60
                }ms`,
              }}
            >
              <Image
                src={company.logo}
                alt={tCompanies(`${company.key}.title`)}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover/item:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

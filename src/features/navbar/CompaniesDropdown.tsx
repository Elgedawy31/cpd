"use client";

import Image from "next/image";

interface CompaniesDropdownProps {
  isOpen: boolean;
  isRTL: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function CompaniesDropdown({
  isOpen,
  isRTL,
  onMouseEnter,
  onMouseLeave,
}: CompaniesDropdownProps) {
  const companyLogos = [
    "/ourCompanies/cpv-logo.png",
    "/ourCompanies/domApp-logo.png",
    "/ourCompanies/Dome.png",
    "/ourCompanies/designalEngineering.png",
    "/ourCompanies/dlalatDark.png",
  ];

  return (
    <div
      className={`absolute top-full ${isRTL ? 'right-0' : 'left-1/2'} mt-2 w-[700px] bg-white rounded-xl shadow-2xl overflow-hidden z-50 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transform: isOpen 
          ? (isRTL ? 'translateY(0)' : 'translate(-50%, 0)')
          : (isRTL ? 'translateY(-8px)' : 'translate(-50%, -8px)'),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="p-4">
        {/* Company Logos Grid */}
        <div className="grid grid-cols-5 gap-4">
          {companyLogos.map((imageSrc, index) => (
            <div
              key={index}
              className="relative h-[70px] bg-gray-50 rounded-lg overflow-hidden group/item transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-100"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(10px) scale(0.95)',
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
              }}
            >
              <Image
                src={imageSrc}
                alt={`Company ${index + 1}`}
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


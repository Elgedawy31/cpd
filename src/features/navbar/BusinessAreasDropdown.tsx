"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface BusinessAreasDropdownProps {
  isOpen: boolean;
  isRTL: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function BusinessAreasDropdown({
  isOpen,
  isRTL,
  onMouseEnter,
  onMouseLeave,
}: BusinessAreasDropdownProps) {
  const t = useTranslations("navbar");

  const partnerImages = [
    "/ourPartners/Image_02.png",
    "/ourPartners/Image_03.png",
    "/ourPartners/Image_05.png",
    "/ourPartners/Image_07.png",
    "/ourPartners/Image_08.png",
  ];

  return (
    <div
      className={`absolute top-full ${isRTL ? 'right-0' : 'left-1/2'} mt-2 w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden z-50 ${
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
      <div className="p-8">
        {/* Header */}
        <h3 className={`text-2xl font-bold text-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("businessAreasTitle")}
        </h3>
        <p className={`text-sm text-muted-foreground leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("businessAreasDescription")}
        </p>
        
        {/* Partner Images Grid */}
        <div className="grid grid-cols-5 gap-4">
          {partnerImages.map((imageSrc, index) => (
            <div
              key={index}
              className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group/item transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-100"
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
                alt={`Partner ${index + 1}`}
                fill
                className="object-contain p-3 transition-transform duration-300 group-hover/item:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Arrow indicator */}
      <div 
        className={`absolute -top-2 ${isRTL ? 'right-8' : 'left-1/2 -translate-x-1/2'} w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200`}
      ></div>
    </div>
  );
}


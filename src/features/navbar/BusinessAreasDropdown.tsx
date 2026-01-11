"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface BusinessAreasDropdownProps {
  isOpen: boolean;
  isRTL: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onAreaClick?: (areaIndex: number) => void;
}

export default function BusinessAreasDropdown({
  isOpen,
  isRTL,
  onMouseEnter,
  onMouseLeave,
  onAreaClick,
}: BusinessAreasDropdownProps) {
  const t = useTranslations("navbar");
  const tBusinessAreas = useTranslations("businessAreas");

  const businessAreas = tBusinessAreas.raw("areas") as Array<{
    name: string;
    tags: string[];
    image: string;
  }>;

  const handleAreaClick = (index: number) => {
    // Scroll to businessAreas section
    const element = document.getElementById("businessAreas");
    if (element) {
      const navbarHeight = 80;
      const rect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + currentScrollY;
      const offsetPosition = elementTop - navbarHeight;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      
      // Set hash with area index
      window.history.pushState(null, '', `#businessAreas?area=${index}`);
      
      // Call the callback if provided
      onAreaClick?.(index);
      
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
                 ? 'translateX(-50%) translateY(0)'
                 : 'translateX(-50%) translateY(-8px)',
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
        
        {/* Business Areas Images Grid */}
        <div className="grid grid-cols-5 gap-4">
          {businessAreas.map((area, index) => (
            <div
              key={area.name}
              onClick={() => handleAreaClick(index)}
              className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group/item transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-100 cursor-pointer"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(10px) scale(0.95)',
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
              }}
            >
              <Image
                src={area.image}
                alt={area.name}
                fill
                className="object-cover transition-transform duration-300 group-hover/item:scale-105"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              {/* Area name in bottom left */}
              <div className={`absolute bottom-0 left-0 right-0 p-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="text-xs font-semibold text-white drop-shadow-lg line-clamp-2">
                  {area.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    </div>
  );
}


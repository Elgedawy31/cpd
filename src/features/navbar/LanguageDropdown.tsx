"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Globe } from "lucide-react";

interface LanguageDropdownProps {
  scrolled: boolean;
  isRTL: boolean;
}

export default function LanguageDropdown({ scrolled, isRTL }: LanguageDropdownProps) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { locale: "en", label: "English", flag: "/en.png" },
    { locale: "ar", label: "العربية", flag: "/ar.png" },
  ];

  const currentLang = isRTL ? "ar" : "en";
  const currentLangData = languages.find(lang => lang.locale === currentLang);

  const handleLangChange = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|ar)/, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors duration-300 ${
          isOpen ? "bg-white/10" : ""
        } ${
          scrolled 
            ? "text-foreground hover:bg-muted" 
            : "text-white hover:bg-white/10"
        }`} 
      >
        {currentLangData && (
          <Image src={currentLangData.flag} alt={currentLangData.label} width={20} height={20} className="rounded-full" />
        )}
        <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
        <Globe className="w-4 h-4" />
      </button>

      <div
        className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-[180px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 ease-in-out z-50 ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
        style={{
          transformOrigin: isRTL ? 'top left' : 'top right',
        }}
      >
        <ul className="py-1">
          {languages.map((lang) => (
            <li key={lang.locale}>
              <button
                onClick={() => handleLangChange(lang.locale)}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-gray-100 ${currentLang === lang.locale ? "bg-gray-50" : ""}`}
              >
                <Image src={lang.flag} alt={lang.label} width={20} height={20} className="rounded-full" />
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


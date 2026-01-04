"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Search, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [showBusinessAreasDropdown, setShowBusinessAreasDropdown] = useState(false);

  const isRTL = pathname?.startsWith("/ar");

  const links = useMemo(() => [
    { id: "companies", label: t("companies") || "Our Companies" },
    { id: "businessAreas", label: t("businessAreas") || "Business areas" },
    { id: "partners", label: t("partners") },
    { id: "about", label: t("about") },
    { id: "contact", label: t("contact") },
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      // Change to white background after scrolling 50px
      setScrolled(currentScroll > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect active section using Intersection Observer
  useEffect(() => {
    const checkIfInHero = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const heroElement = document.getElementById("hero");
      
      if (heroElement) {
        const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
        // If scrolled less than 30% of hero height, we're in hero section
        return scrollY < heroBottom * 0.3;
      }
      return false;
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // If in hero section, clear active link
      if (checkIfInHero()) {
        setActiveLink("");
        return;
      }

      // Otherwise, find the active section
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scroll to check if we're back in hero section
    const handleScroll = () => {
      if (checkIfInHero()) {
        setActiveLink("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    if (checkIfInHero()) {
      setActiveLink("");
    }

    // Also check hash on mount (but only if not in hero)
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1);
      if (hash && links.some((link) => link.id === hash)) {
        // Delay to ensure DOM is ready
        setTimeout(() => {
          if (!checkIfInHero()) {
            setActiveLink(hash);
          }
        }, 100);
      }
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  // Scroll to section with navbar offset
  const scrollToSection = (linkId: string) => {
    const element = document.getElementById(linkId);
    if (element) {
      const navbarHeight = 80; // Height of navbar (h-20 = 80px)
      
      // Get current position
      const rect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + currentScrollY;
      const offsetPosition = elementTop - navbarHeight;
      
      // Scroll to position with offset
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      
      // Update URL hash
      window.history.pushState(null, '', `#${linkId}`);
    }
  };

  // Handle navigation link click with scroll offset
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkId: string) => {
    e.preventDefault();
    scrollToSection(linkId);
  };

  // Toggle language
  const handleLangToggle = () => {
    const newLang = isRTL ? "en" : "ar";
    const newPath = pathname.replace(/^\/(en|ar)/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="w-full p-4 flex justify-between items-center h-20">
        {/* Logo */}
        <Link
          href={`/${isRTL ? "ar" : "en"}#home`}
          className="flex items-center"
        >
          <div className="relative w-[170px] h-[70px] flex items-center justify-center">
            <Image
              src={scrolled ? `/cpdLogoDark.png` : `/cpdLogo.png`}
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Links and Icons - Right Side */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation Links */}
          <ul className="flex items-center space-x-10">
            {links.map((link) => {
              const isActive = activeLink === link.id;
              const isBusinessAreas = link.id === "businessAreas";
              
              return (
                <li 
                  key={link.id} 
                  className="relative group"
                  onMouseEnter={() => isBusinessAreas && setShowBusinessAreasDropdown(true)}
                  onMouseLeave={() => isBusinessAreas && setShowBusinessAreasDropdown(false)}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`text-base font-semibold transition-all duration-300 ${
                      scrolled ? "text-foreground" : "text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                  <span className={`absolute left-0 -bottom-1 bg-primary transition-all duration-300 h-0.5 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                  
                  {/* Business Areas Dropdown */}
                  {isBusinessAreas && (
                    <div
                      className={`absolute top-full ${isRTL ? 'right-0' : 'left-1/2'} mt-2 w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden z-50 ${
                        showBusinessAreasDropdown
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
                      }`}
                      onMouseEnter={() => setShowBusinessAreasDropdown(true)}
                      onMouseLeave={() => setShowBusinessAreasDropdown(false)}
                      style={{
                        transform: showBusinessAreasDropdown 
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
                          {[
                            "/ourPartners/Image_02.png",
                            "/ourPartners/Image_03.png",
                            "/ourPartners/Image_05.png",
                            "/ourPartners/Image_07.png",
                            "/ourPartners/Image_08.png",
                          ].map((imageSrc, index) => (
                            <div
                              key={index}
                              className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group/item transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-100"
                              style={{
                                opacity: showBusinessAreasDropdown ? 1 : 0,
                                transform: showBusinessAreasDropdown 
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
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button
            className={`transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

            {/* Language Toggle Button Desktop */}
            <button
              onClick={handleLangToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors duration-300 ${
                scrolled 
                  ? "text-foreground hover:bg-muted" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{isRTL ? "EN" : "AR"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden flex items-center transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-20 left-0 w-full bg-white shadow-lg overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-1 p-6">
          {links.map((link) => {
            const isActive = activeLink === link.id;
            const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setIsOpen(false);
              
              // Small delay to allow menu to close before scrolling
              setTimeout(() => {
                scrollToSection(link.id);
              }, 200);
            };
            
            return (
              <li key={link.id} className="group relative overflow-hidden">
                <a
                  href={`#${link.id}`}
                  onClick={handleMobileClick}
                  className="block text-foreground font-medium py-3 transform transition-all duration-300 group-hover:pl-2"
                >
                  {link.label}
                </a>
                <span className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </li>
            );
          })}

          {/* Language Toggle Button Mobile */}
          <li className="pt-4">
            <button
              onClick={handleLangToggle}
              className="w-full px-4 py-2 flex items-center gap-2 justify-center rounded-lg border border-primary text-foreground font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              {isRTL ? "EN" : "AR"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

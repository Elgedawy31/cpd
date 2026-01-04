"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import NavbarLogo from "./NavbarLogo";
import NavLink from "./NavLink";
import BusinessAreasDropdown from "./BusinessAreasDropdown";
import CompaniesDropdown from "./CompaniesDropdown";
import NavbarActions from "./NavbarActions";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [showBusinessAreasDropdown, setShowBusinessAreasDropdown] = useState(false);
  const [showCompaniesDropdown, setShowCompaniesDropdown] = useState(false);

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
        <NavbarLogo isRTL={isRTL} scrolled={scrolled} />

        {/* Desktop Links and Icons - Right Side */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation Links */}
          <ul className="flex items-center space-x-10">
            {links.map((link) => {
              const isActive = activeLink === link.id;
              const isBusinessAreas = link.id === "businessAreas";
              const isCompanies = link.id === "companies";
              
              return (
                <NavLink
                  key={link.id}
                  linkId={link.id}
                  label={link.label}
                  isActive={isActive}
                  scrolled={scrolled}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  onMouseEnter={() => {
                    if (isBusinessAreas) setShowBusinessAreasDropdown(true);
                    if (isCompanies) setShowCompaniesDropdown(true);
                  }}
                  onMouseLeave={() => {
                    if (isBusinessAreas) setShowBusinessAreasDropdown(false);
                    if (isCompanies) setShowCompaniesDropdown(false);
                  }}
                >
                  {/* Business Areas Dropdown */}
                  {isBusinessAreas && (
                    <BusinessAreasDropdown
                      isOpen={showBusinessAreasDropdown}
                      isRTL={isRTL}
                      onMouseEnter={() => setShowBusinessAreasDropdown(true)}
                      onMouseLeave={() => setShowBusinessAreasDropdown(false)}
                    />
                  )}
                  
                  {/* Companies Dropdown */}
                  {isCompanies && (
                    <CompaniesDropdown
                      isOpen={showCompaniesDropdown}
                      isRTL={isRTL}
                      onMouseEnter={() => setShowCompaniesDropdown(true)}
                      onMouseLeave={() => setShowCompaniesDropdown(false)}
                    />
                  )}
                </NavLink>
              );
            })}
          </ul>

          {/* Right Side Icons */}
          <NavbarActions
            scrolled={scrolled}
            isRTL={isRTL}
            onLangToggle={handleLangToggle}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isOpen}
          links={links}
          activeLink={activeLink}
          isRTL={isRTL}
          scrolled={scrolled}
          onToggle={() => setIsOpen(!isOpen)}
          onLinkClick={scrollToSection}
          onLangToggle={handleLangToggle}
        />
      </div>
    </nav>
  );
}

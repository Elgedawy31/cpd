"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      // Change to white background after scrolling 50px
      setScrolled(currentScroll > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRTL = pathname?.startsWith("/ar");

  const links = [
    { id: "hero", label: t("home") },
    { id: "about", label: t("about") },
    { id: "companies", label: t("companies") },
    { id: "partners", label: t("partners") },
    { id: "contact", label: t("contact") },
  ];

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
            {links.map((link) => (
              <li key={link.id} className="relative group">
                <a
                  href={`#${link.id}`}
                  className={`text-base font-semibold transition-colors duration-300 ${
                    scrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  {link.label}
                </a>
                <span className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-primary" : "bg-white"
                }`}></span>
              </li>
            ))}
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
          {links.map((link) => (
            <li key={link.id} className="group relative overflow-hidden">
              <a
                href={`#${link.id}`}
                className="block text-foreground font-medium py-3 transform transition-all duration-300 group-hover:pl-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

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

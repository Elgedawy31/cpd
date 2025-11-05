"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false); // ✅ لمتابعة إذا تعدى 100vh

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setScrollingUp(currentScroll < lastScroll || currentScroll < 100);
      setLastScroll(currentScroll);

      // ✅ لو عدى 100vh غيّر الحالة
      setScrolled(currentScroll > window.innerHeight * 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

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
      className={`fixed w-full z-50 transition-transform duration-300 backdrop-blur-3xl ${
        scrollingUp ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href={`/${isRTL ? "ar" : "en"}#home`}
          className={`text-2xl font-bold transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-white"
          }`} 
        >
          Logo
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <li key={link.id} className="relative group">
              <a
                href={`#${link.id}`}
                className={`font-bold transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
              </a>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* Language Toggle Button Desktop */}
          <li>
            <button
              onClick={handleLangToggle}
              className={`ml-4 px-4 py-2 flex items-center gap-2 rounded-lg border border-primary font-semibold hover:bg-primary hover:scale-105 transition-transform duration-300 ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              <Globe className="w-4 h-4" />
              {isRTL ? "EN" : "AR"}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden flex items-center ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle Menu</span>
          <div className="w-6 h-6 relative">
            <span
              className={`block absolute h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 top-2.5" : "top-1"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "top-3"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 top-2.5" : "top-5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-surface overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 p-6">
          {links.map((link) => (
            <li key={link.id} className="group relative overflow-hidden">
              <a
                href={`#${link.id}`}
                className="block text-foreground font-medium py-2 transform transition-all duration-300 group-hover:pl-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* Language Toggle Button Mobile */}
          <li>
            <button
              onClick={handleLangToggle}
              className="w-full px-4 py-2 flex items-center gap-2 justify-center rounded-lg border border-primary text-foreground font-semibold hover:bg-primary hover:text-white hover:scale-105 transition-transform duration-300"
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

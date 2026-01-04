"use client";

import { Globe, Menu, X } from "lucide-react";

interface Link {
  id: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  links: Link[];
  activeLink: string;
  isRTL: boolean;
  scrolled: boolean;
  onToggle: () => void;
  onLinkClick: (linkId: string) => void;
  onLangToggle: () => void;
}

export default function MobileMenu({
  isOpen,
  links,
  activeLink,
  isRTL,
  scrolled,
  onToggle,
  onLinkClick,
  onLangToggle,
}: MobileMenuProps) {
  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, linkId: string) => {
    e.preventDefault();
    onToggle();
    
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      onLinkClick(linkId);
    }, 200);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={`md:hidden flex items-center transition-colors duration-300 ${
          scrolled ? "text-foreground" : "text-white"
        }`}
        onClick={onToggle}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-20 left-0 w-full bg-white shadow-lg overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-1 p-6">
          {links.map((link) => {
            const isActive = activeLink === link.id;
            
            return (
              <li key={link.id} className="group relative overflow-hidden">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleMobileClick(e, link.id)}
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
              onClick={onLangToggle}
              className="w-full px-4 py-2 flex items-center gap-2 justify-center rounded-lg border border-primary text-foreground font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              {isRTL ? "EN" : "AR"}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}


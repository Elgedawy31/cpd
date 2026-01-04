"use client";

import { ReactNode, useRef } from "react";

interface NavLinkProps {
  linkId: string;
  label: string;
  isActive: boolean;
  scrolled: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: ReactNode;
  disableHoverBorder?: boolean; // New prop
}

export default function NavLink({
  linkId,
  label,
  isActive,
  scrolled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  disableHoverBorder,
}: NavLinkProps) {
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      onMouseLeave?.();
      hoverTimeout.current = null;
    }, 200);
  };

  return (
    <li 
      className="relative group overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={`#${linkId}`}
        onClick={onClick}
        className={`text-base font-semibold transition-all duration-300 ${
          scrolled ? "text-foreground" : "text-white"
        }`}
      >
        {label}
      </a>
      <span className={`absolute left-0 -bottom-1 ${!scrolled && isActive ? "bg-white" : "bg-primary"} transition-all duration-300 h-0.5 ${
             isActive ? "w-full" : (disableHoverBorder ? "w-0" : "w-0 group-hover:w-full")
           }`}></span>
             {children}
           </li>
         );
}
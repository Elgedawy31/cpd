"use client";

import { ReactNode } from "react";

interface NavLinkProps {
  linkId: string;
  label: string;
  isActive: boolean;
  scrolled: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: ReactNode;
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
}: NavLinkProps) {
  return (
    <li 
      className="relative group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
      <span className={`absolute left-0 -bottom-1 bg-primary transition-all duration-300 h-0.5 ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`}></span>
      {children}
    </li>
  );
}


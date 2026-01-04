"use client";

import { Globe } from "lucide-react";

interface NavbarActionsProps {
  scrolled: boolean;
  isRTL: boolean;
  onLangToggle: () => void;
}

export default function NavbarActions({
  scrolled,
  isRTL,
  onLangToggle,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Language Toggle Button Desktop */}
      <button
        onClick={onLangToggle}
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
  );
}


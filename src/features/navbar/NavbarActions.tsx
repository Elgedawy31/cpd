"use client";

import LanguageDropdown from "./LanguageDropdown";

interface NavbarActionsProps {
  scrolled: boolean;
  isRTL: boolean;
}

export default function NavbarActions({
  scrolled,
  isRTL,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Language Toggle Button Desktop */}
      <LanguageDropdown scrolled={scrolled} isRTL={isRTL} />
    </div>
  );
}


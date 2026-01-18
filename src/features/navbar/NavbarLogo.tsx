"use client";

import Link from "next/link";
import Image from "next/image";

interface NavbarLogoProps {
  isRTL: boolean;
  scrolled: boolean;
}

export default function NavbarLogo({ isRTL, scrolled }: NavbarLogoProps) {
  return (
    <Link
      href={`/${isRTL ? "ar" : "en"}#home`}
      className="flex items-center"
    >
      <div className="relative w-[170px] h-[70px] flex items-center justify-center  right-12 md:right-0">
        <Image
          src={scrolled ? `/cpdLogoDark.png` : `/cpdLogo.png`}
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </Link>
  );
}


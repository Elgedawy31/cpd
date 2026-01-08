"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Hide after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Remove from DOM after fade out animation completes
      setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match the transition duration
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-primary transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-[300px] h-[150px] animate-bounce-splash">
        <Image
          src="/cpdLogo.png"
          alt="CPD Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
          className="drop-shadow-lg"
        />
      </div>
    </div>
  );
}


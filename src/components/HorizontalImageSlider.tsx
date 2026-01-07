"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface HorizontalImageSliderItem {
  id: string;
  image: string;
  title?: string;
  text?: string;
}

interface HorizontalImageSliderProps {
  items: HorizontalImageSliderItem[];
  activeIndex?: number;
  onItemChange?: (index: number) => void;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  className?: string;
  isRTL?: boolean;
}

export default function HorizontalImageSlider({
  items,
  activeIndex: controlledActiveIndex,
  onItemChange,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  className = "",
  isRTL = false,
}: HorizontalImageSliderProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeIndexRef = useRef(0);

  const activeIndex =
    controlledActiveIndex !== undefined
      ? controlledActiveIndex
      : internalActiveIndex;

  // Keep ref in sync with latest active index to avoid stale closures
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!autoAdvance || items.length === 0) return;

    // Reset progress when active index changes
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // Progress animation (0 to 100% over the interval duration)
    const progressStep = 100 / (autoAdvanceInterval / 50); // Update every 50ms
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = Math.min(prev + progressStep, 100);

        // When progress reaches 100%, move to next item and reset ONCE
        if (nextProgress >= 100) {
          const currentIndex = activeIndexRef.current;
          const nextIndex = (currentIndex + 1) % items.length;

          if (controlledActiveIndex === undefined) {
            setInternalActiveIndex(nextIndex);
            onItemChange?.(nextIndex);
          } else {
            // In controlled mode, defer parent state update
            window.setTimeout(() => {
              onItemChange?.(nextIndex);
            }, 0);
          }

          return 0;
        }

        return nextProgress;
      });
    }, 50);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [autoAdvance, autoAdvanceInterval, items.length, controlledActiveIndex, onItemChange]);

  const handleItemClick = (index: number) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    setProgress(0);
    onItemChange?.(index);
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title || `Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Optional overlay text */}
            {(item.title || item.text) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center text-white px-6">
                  {item.title && (
                    <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                  )}
                  {item.text && (
                    <p className="text-lg">{item.text}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/30 z-20 transition-all duration-75 ease-linear"
          style={{
            width: `${progress}%`,
          }}
        />
      )}
    </div>
  );
}


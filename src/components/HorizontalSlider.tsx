"use client";

import { useEffect, useRef, useState } from "react";

interface HorizontalSliderItem {
  id: string;
  label: string;
}

interface HorizontalSliderProps {
  items: HorizontalSliderItem[];
  activeIndex?: number;
  onItemChange?: (index: number) => void;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  className?: string;
  isRTL?: boolean;
}

export default function HorizontalSlider({
  items,
  activeIndex: controlledActiveIndex,
  onItemChange,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  className = "",
  isRTL = false,
}: HorizontalSliderProps) {
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

  // Auto-advance logic with horizontal progress bar
  useEffect(() => {
    if (!autoAdvance || items.length === 0) return;

    // Reset progress when active index / items change
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    const progressStep = 100 / (autoAdvanceInterval / 50); // update every 50ms
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + progressStep, 100);

        // When progress reaches 100%, move marker to next item and reset ONCE
        if (next >= 100) {
          const current = activeIndexRef.current;
          const nextIndex = (current + 1) % items.length;

          if (controlledActiveIndex === undefined) {
            setInternalActiveIndex(nextIndex);
          }

          // Defer parent state update to avoid React warning:
          // "Cannot update a component while rendering a different component"
          window.setTimeout(() => {
            onItemChange?.(nextIndex);
          }, 0);

          return 0;
        }

        return next;
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

  // Calculate positions for the horizontal indicator
  // Distribute markers evenly from left (0%) to right (100%)
  const step = items.length > 1 ? 100 / (items.length - 1) : 0;
  const baseLeft = step * activeIndex;

  // Custom per-step offsets for fine visual alignment with labels.
  // You can tweak these numbers later similar to VerticalSlider.
  // Example for up to 7 items: index -> offset in percentage points.
  const markerOffsets: number[] = [8, -9, -2, -3, -4, -5, -6];
  const customOffset = markerOffsets[activeIndex] ?? 0;

  const markerLeft = Math.min(100, Math.max(0, baseLeft + customOffset));

  return (
    <div className={`w-full ${className}`}>
      {/* Horizontal Progress Line + Marker */}
      <div className="relative h-8 mb-4">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-muted-foreground/20" />

        {/* Progress bar */}
        {progress > 0 && (
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-foreground/50 transition-all duration-75 ease-linear"
            style={{
              width: `${progress}%`,
            }}
          />
        )}

        {/* Active item marker (square) */}
        <div
          className="absolute top-1/2 w-3 h-3 bg-foreground transition-all duration-500 ease-out"
          style={{
            left: `${markerLeft}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Items Row */}
      <div
        className={`flex items-center justify-between gap-4 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(index)}
              className={`
                group relative text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide
                transition-all duration-300
                ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/70 hover:text-foreground"
                }
              `}
            >
              <span
                className={`
                  inline-block transition-transform duration-300
                  ${isActive ? "scale-100" : "scale-95 group-hover:scale-100"}
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}



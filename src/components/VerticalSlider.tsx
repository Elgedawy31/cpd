"use client";

import { useEffect, useState, useRef } from "react";

interface VerticalSliderItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface VerticalSliderProps {
  items: VerticalSliderItem[];
  activeIndex?: number;
  onItemChange?: (index: number) => void;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  className?: string;
  isRTL?: boolean;
}

export default function VerticalSlider({
  items,
  activeIndex: controlledActiveIndex,
  onItemChange,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  className = "",
  isRTL = false,
}: VerticalSliderProps) {
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

        // When progress reaches 100%, move marker to next item and reset ONCE
        if (nextProgress >= 100) {
          const currentIndex = activeIndexRef.current;
          const nextIndex = (currentIndex + 1) % items.length;

          if (controlledActiveIndex === undefined) {
            setInternalActiveIndex(nextIndex);
          }
          onItemChange?.(nextIndex);

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

  // Calculate positions for the progress indicator
  // Distribute markers evenly from top (0%) to bottom (100%)
  const step = items.length > 1 ? 100 / (items.length - 1) : 0;
  const baseTop = step * activeIndex;

  // Custom per-step offsets for fine visual alignment with labels.
  // You can tweak these numbers later if you change fonts/spacing.
  // Example for up to 7 items: index -> offset in percentage points.
  const markerOffsets: number[] = [2, 0.5, -1, -2, -3.5, -4.5, -6];
  const customOffset = markerOffsets[activeIndex] ?? 0;

  const markerTop = Math.min(100, Math.max(0, baseTop + customOffset));
  // Progress from top (0%) to bottom (100%)
  const progressHeight = progress; // 0–100

  return (
    <div className={`relative flex ${isRTL ? "flex-row-reverse" : "flex-row"} items-start ${className}`}>
      {/* Vertical Progress Line */}
      <div className={`relative ${isRTL ? "ml-8" : "mr-8"} shrink-0`}>
        {/* Container for the line - approximate height based on items */}
        <div
          className="relative"
          style={{
            minHeight: `${items.length * 56}px`,
          }}
        >
          {/* Background Line - subtle light gray (full height) */}
          <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-border/60" />

          {/* Active item square marker - aligned with top of text */}
          <div
            className="absolute w-3 h-3 bg-foreground transition-all duration-500 ease-out"
            style={{
              top: `${markerTop}%`,
              left: "0",
              transform: "translate(-50%, 0)",
            }}
          />

          {/* Progress Bar - extends from active item down to next item */}
          {progress > 0 && (
            <div
              className="absolute left-0 w-0.5 bg-foreground/50 transition-all duration-75 ease-linear"
              style={{
                top: "0%",
                height: `${progressHeight}%`,
                transform: "translateX(-50%)",
              }}
            />
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 space-y-8">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(index)}
              className={`
                group cursor-pointer transition-all duration-500 ease-out
                ${isActive 
                  ? "opacity-100" 
                  : "opacity-50 hover:opacity-75"
                }
                ${isRTL 
                  ? isActive ? "translate-x-0" : "hover:-translate-x-1"
                  : isActive ? "translate-x-0" : "hover:translate-x-1"
                }
              `}
            >
              <div
                className={`
                  text-xl font-bold uppercase tracking-wider mb-2
                  transition-all duration-500
                  ${isActive 
                    ? "text-foreground scale-100 font-bold" 
                    : "text-muted-foreground/60 scale-95 group-hover:scale-100 font-semibold"
                  }
                `}
              >
                {item.label}
              </div>
              {item.content && (
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-out
                    ${isActive 
                      ? "max-h-96 opacity-100 mt-3" 
                      : "max-h-0 opacity-0 mt-0"
                    }
                  `}
                >
                  <div className="text-base text-muted-foreground leading-relaxed">
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


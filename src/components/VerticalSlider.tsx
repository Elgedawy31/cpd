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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex =
    controlledActiveIndex !== undefined
      ? controlledActiveIndex
      : internalActiveIndex;

  useEffect(() => {
    if (!autoAdvance || items.length === 0) return;

    // Reset progress when active index changes
    setProgress(0);

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // Progress animation (0 to 100% over the interval duration)
    const progressStep = 100 / (autoAdvanceInterval / 50); // Update every 50ms
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return Math.min(prev + progressStep, 100);
      });
    }, 50);

    // Auto-advance to next item
    intervalRef.current = setInterval(() => {
      if (controlledActiveIndex === undefined) {
        setInternalActiveIndex((prev) => {
          const next = (prev + 1) % items.length;
          onItemChange?.(next);
          return next;
        });
      } else {
        const next = (activeIndex + 1) % items.length;
        onItemChange?.(next);
      }
    }, autoAdvanceInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [
    activeIndex,
    autoAdvance,
    autoAdvanceInterval,
    items.length,
    controlledActiveIndex,
    onItemChange,
  ]);

  const handleItemClick = (index: number) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    setProgress(0);
    onItemChange?.(index);
  };

  // Calculate positions for the progress indicator
  // Each item takes equal space, accounting for spacing
  const itemHeight = 100 / items.length; // Percentage height per item
  // Position square at the top of the label (not centered)
  // Add small offset to align with text baseline (approximately 5% of item height for text top)
  const textTopOffset = itemHeight * 0.1; // Small offset to align with top of text
  const indicatorTop = activeIndex * itemHeight + textTopOffset;
  
  // Calculate progress bar: from active item to next item (or end)
  const nextItemTop = activeIndex < items.length - 1 
    ? (activeIndex + 1) * itemHeight + textTopOffset
    : 100; // If last item, go to end
  const progressBarHeight = nextItemTop - indicatorTop;
  const progressBarCurrentHeight = (progress / 100) * progressBarHeight;
  
  // For filled background, go to the top of active item
  const filledHeight = indicatorTop;

  return (
    <div className={`relative flex ${isRTL ? "flex-row-reverse" : "flex-row"} items-start ${className}`}>
      {/* Vertical Progress Line */}
      <div className={`relative ${isRTL ? "ml-8" : "mr-8"} shrink-0`}>
        {/* Container for the line - height based on number of items */}
        <div
          className="relative"
          style={{
            minHeight: `${items.length * 72}px`,
          }}
        >
          {/* Background Line - subtle light gray (full height) */}
          <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-border/60" />

          {/* Filled Background - from top to active item (like current section) */}
          <div
            className="absolute left-0 w-0.5 bg-foreground transition-all duration-500 ease-out"
            style={{
              top: "0%",
              height: `${filledHeight}%`,
            }}
          />

          {/* Active item square marker - aligned with top of text */}
          <div
            className="absolute w-3 h-3 bg-foreground transition-all duration-500 ease-out"
            style={{
              top: `${indicatorTop}%`,
              left: "0",
              transform: "translate(-50%, 0)",
            }}
          />

          {/* Progress Bar - extends from active item down to next item */}
          {progress > 0 && (
            <div
              className="absolute left-0 w-0.5 bg-foreground/50 transition-all duration-75 ease-linear"
              style={{
                top: `${indicatorTop}%`,
                height: `${progressBarCurrentHeight}%`,
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


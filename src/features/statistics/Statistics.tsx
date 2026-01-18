"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Users,
  Globe,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  prefix?: string;
  icon: React.ReactNode;
}

export default function StatisticsSection() {
  const t = useTranslations("hero.stats");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get stats from translations with icons
  const stats: StatItem[] = [
    {
      label: t("Companies.label"),
      value: parseInt(t("Companies.value")),
      prefix: "+",
      icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    },
    {
      label: t("ProjectsCompleted.label"),
      value: parseInt(t("ProjectsCompleted.value")),
      prefix: "+",
      icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    },
    {
      label: t("Employees.label"),
      value: parseInt(t("Employees.value")),
      prefix: "+",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    },
    {
      label: t("Countries.label"),
      value: parseInt(t("Countries.value")),
      prefix: "+",
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    },
    {
      label: t("Clients.label"),
      value: parseInt(t("Clients.value")),
      prefix: "+",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    },
  ];

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString(locale === "ar" ? "ar-SA" : "en-US");
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-linear-to-b from-white via-primary-50/40 to-white pb-16 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-0 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-8">
          {stats.map((stat, index) => {
            const isLastCard = index === stats.length - 1;
            const isAloneInLastRow = isLastCard && stats.length % 2 !== 0;
            return (
              <StatCard
                key={index}
                label={stat.label}
                targetValue={stat.value}
                prefix={stat.prefix}
                formatNumber={formatNumber}
                index={index}
                isRTL={isRTL}
                shouldAnimate={hasAnimated}
                icon={stat.icon}
                isAloneInLastRow={isAloneInLastRow}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  label: string;
  targetValue: number;
  prefix?: string;
  formatNumber: (num: number) => string;
  index: number;
  isRTL: boolean;
  shouldAnimate: boolean;
  icon: React.ReactNode;
  isAloneInLastRow?: boolean;
}

function StatCard({
  label,
  targetValue,
  prefix = "",
  formatNumber,
  isRTL,
  shouldAnimate,
  icon,
  isAloneInLastRow = false,
}: StatCardProps) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const duration = 2500;

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(0);
      return;
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * targetValue);

      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      startTimeRef.current = null;
    };
  }, [targetValue, duration, shouldAnimate]);

  return (
    <div className={`group relative ${isAloneInLastRow ? "col-span-2 lg:col-span-1" : ""}`}>
      {/* Main Card */}
      <div
        className={`
          relative h-full
          bg-white
          rounded-xl p-3 sm:p-4 lg:p-5
          border border-primary-100/50
          shadow-sm
          transition-all duration-300 ease-out
          hover:shadow-md
          hover:border-primary-200/60
          hover:bg-primary-50/30
          overflow-hidden
          ${isAloneInLastRow ? "flex flex-col items-center text-center" : ""}
        `}
      >
        {/* Subtle hover background */}
        <div
          className={`
            absolute inset-0 bg-linear-to-br from-primary-50/0 to-primary-100/0
            group-hover:from-primary-50/40 group-hover:to-primary-100/20
            transition-all duration-300
            pointer-events-none
          `}
        />

        {/* Icon Container */}
        <div className={`relative z-10 mb-2 sm:mb-3 lg:mb-4 ${isAloneInLastRow ? "mx-auto" : ""}`}>
          <div
            className={`
              inline-flex items-center justify-center
              w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg
              bg-primary-50
              text-primary
              group-hover:bg-primary-100
              group-hover:scale-105
              transition-all duration-300
            `}
          >
            {icon}
          </div>
        </div>

        {/* Number */}
        <div className={`relative z-10 mb-1 sm:mb-2 ${isAloneInLastRow ? "w-full" : ""}`}>
          <div
            className={`
              text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold
              text-primary
              leading-none
              ${isAloneInLastRow ? "text-center" : isRTL ? "text-right" : "text-left"}
            `}
          >
            <span className="text-primary-400/70 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              {prefix}
            </span>
            <span className="tabular-nums tracking-tight">
              {formatNumber(count)}
            </span>
          </div>
        </div>

        {/* Label */}
        <div className={`relative z-10 ${isAloneInLastRow ? "w-full" : ""}`}>
          <div
            className={`
              text-xs sm:text-sm md:text-base
              text-muted-foreground
              font-medium
              leading-snug
              group-hover:text-foreground
              transition-colors duration-300
              ${isAloneInLastRow ? "text-center" : isRTL ? "text-right" : "text-left"}
            `}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface WhyChooseUsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function WhyChooseUsCard({
  icon,
  title,
  description,
}: WhyChooseUsCardProps) {
  return (
    <div className="relative flex flex-col items-start p-3 sm:p-4 md:p-5 lg:p-6 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl border border-white/20 transition-all duration-700 hover:shadow-primary/30 hover:scale-[1.03] group overflow-hidden animate-fade-in cursor-pointer">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
      <div className="relative z-10 w-full">
        <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 p-1.5 sm:p-2 md:p-3 lg:p-4">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-foreground mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 leading-tight group-hover:text-primary transition-colors duration-700">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}


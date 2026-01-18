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
    <div className="relative flex flex-col items-start p-4 sm:p-5 md:p-6 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 transition-all duration-700 hover:shadow-primary/30 hover:scale-[1.03] group overflow-hidden animate-fade-in cursor-pointer">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
      <div className="relative z-10 w-full">
        <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground mb-2 sm:mb-3 md:mb-4 leading-tight group-hover:text-primary transition-colors duration-700">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}


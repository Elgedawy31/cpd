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
    <div className="flex flex-col items-start p-6 bg-background rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
      <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}


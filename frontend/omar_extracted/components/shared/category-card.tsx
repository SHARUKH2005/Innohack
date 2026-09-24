"use client";

import { ReactNode } from "react";
import { 
  Code, ImageIcon, BarChart3, PieChart, 
  Monitor, Beaker, Globe, Heart 
} from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  gradient: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryCard({
  name,
  count,
  gradient,
  icon,
  isSelected,
  onClick
}: CategoryCardProps) {
  const renderIcon = (): ReactNode => {
    const iconProps = { className: "h-8 w-8 mb-2" };
    
    switch(icon) {
      case "Code":
        return <Code {...iconProps} />;
      case "Image":
        return <ImageIcon {...iconProps} />;
      case "BarChart3":
        return <BarChart3 {...iconProps} />;
      case "PieChart":
        return <PieChart {...iconProps} />;
      case "Monitor":
        return <Monitor {...iconProps} />;
      case "Beaker":
        return <Beaker {...iconProps} />;
      case "Globe":
        return <Globe {...iconProps} />;
      case "Heart":
        return <Heart {...iconProps} />;
      default:
        return <Code {...iconProps} />;
    }
  };

  // Define background color based on category for consistent appearance
  let bgClass = "bg-blue-600";
  
  // Handle specific gradients for unique category colors
  if (gradient === "from-blue-500 to-purple-600") {
    bgClass = "bg-blue-600"; // Programming
  } else if (gradient === "from-pink-500 to-red-500") {
    bgClass = "bg-pink-600"; // Design
  } else if (gradient === "from-green-500 to-teal-500") {
    bgClass = "bg-green-600"; // Business
  } else if (gradient === "from-yellow-500 to-orange-500") {
    bgClass = "bg-yellow-500"; // Marketing
  } else if (gradient === "from-indigo-500 to-blue-600") {
    bgClass = "bg-indigo-600"; // IT & Software
  } else if (gradient === "from-purple-500 to-violet-600") {
    bgClass = "bg-purple-600"; // Science
  } else if (gradient === "from-emerald-500 to-green-600") {
    bgClass = "bg-emerald-600"; // Languages
  } else if (gradient === "from-red-500 to-rose-600") {
    bgClass = "bg-red-600"; // Health & Fitness
  } 
  // Fallbacks for any other gradients
  else if (gradient.includes("blue")) {
    bgClass = "bg-blue-600";
  } else if (gradient.includes("pink")) {
    bgClass = "bg-pink-600";
  } else if (gradient.includes("red") && !gradient.includes("rose")) {
    bgClass = "bg-red-600";
  } else if (gradient.includes("green")) {
    bgClass = "bg-green-600";
  } else if (gradient.includes("teal")) {
    bgClass = "bg-teal-600";
  } else if (gradient.includes("yellow")) {
    bgClass = "bg-yellow-500";
  } else if (gradient.includes("orange")) {
    bgClass = "bg-orange-500";
  } else if (gradient.includes("indigo")) {
    bgClass = "bg-indigo-600";
  } else if (gradient.includes("purple")) {
    bgClass = "bg-purple-600";
  } else if (gradient.includes("violet")) {
    bgClass = "bg-violet-600";
  } else if (gradient.includes("emerald")) {
    bgClass = "bg-emerald-600";
  } else if (gradient.includes("rose")) {
    bgClass = "bg-rose-600";
  }

  return (
    <div 
      onClick={onClick}
      className={`
        ${bgClass} bg-gradient-to-br ${gradient} rounded-lg p-3 text-white 
        flex flex-col items-center justify-center h-24 w-full
        hover:shadow-lg transition-all cursor-pointer
        ${isSelected ? 'ring-2 ring-primary ring-opacity-75' : ''}
      `}
    >
      {renderIcon()}
      <span className="text-sm font-medium text-center truncate w-full">{name}</span>
      <span className="text-xs opacity-75">{count} courses</span>
    </div>
  );
}

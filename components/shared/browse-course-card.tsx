"use client";

import { useState, useEffect } from 'react';
import { Clock, Bookmark, BookmarkCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface BrowseCourseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  totalHours: number;
  rating: number;
  price: number;
  discountedPrice: number | null;
  gradient: string;
  featured: string | null;
  onFavoriteToggle: (id: string, isFavorited: boolean) => void;
  initialFavorited?: boolean;
}

export function BrowseCourseCard({
  id,
  title,
  description,
  category,
  categoryLabel,
  totalHours,
  rating,
  price,
  discountedPrice,
  gradient = "from-blue-500 to-purple-600",
  featured,
  onFavoriteToggle,
  initialFavorited = false,
}: BrowseCourseCardProps) {
  const [favorited, setFavorited] = useState(initialFavorited);

  useEffect(() => {
    setFavorited(initialFavorited);
  }, [initialFavorited]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !favorited;
    setFavorited(newState);
    onFavoriteToggle(id, newState);
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
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-40 ${bgClass} bg-gradient-to-br ${gradient} relative`}>
        {featured && (
          <span className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full font-medium">
            {featured.charAt(0).toUpperCase() + featured.slice(1)}
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {categoryLabel}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{totalHours}h total</span>
          </div>
          <div className="flex items-center text-sm">
            {discountedPrice !== null ? (
              <>
                <span className="text-muted-foreground line-through mr-2">
                  ${price}
                </span>
                <span className="text-foreground font-semibold">
                  ${discountedPrice}
                </span>
                <span className="ml-2 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-md">
                  {Math.round(((price - discountedPrice) / price) * 100)}% off
                </span>
              </>
            ) : (
              <span className="text-foreground font-semibold">
                ${price}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <Link href={`/courses/${id}`} className="flex-1">
            <Button className="w-full">View Course</Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleFavorite}
            className={favorited ? "text-primary" : ""}
          >
            {favorited ? 
              <BookmarkCheck className="h-5 w-5" /> : 
              <Bookmark className="h-5 w-5" />
            }
          </Button>
        </div>
      </div>
    </div>
  );
}

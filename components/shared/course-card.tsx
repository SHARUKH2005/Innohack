"use client";

import { useState } from 'react';
import { Clock, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  hoursLeft: number;
  gradient: string;
  href?: string;
  statusLabel?: string;
  statusColor?: string;
}

export function CourseCard({
  id,
  title,
  description,
  progress,
  hoursLeft,
  gradient = "from-blue-500 to-purple-600",
  href = `/courses/${id}`,
  statusLabel,
  statusColor,
}: CourseCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  return (
    <Link href={href}>
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className={`h-40 bg-gradient-to-br ${gradient} relative`}>
          {statusLabel && (
            <span className={`absolute top-2 right-2 ${statusColor || 'bg-yellow-500 text-yellow-900'} text-xs px-2 py-1 rounded-full font-medium`}>
              {statusLabel}
            </span>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
            {description}
          </p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">Progress: {progress}%</span>
            <span className="text-sm text-muted-foreground">{hoursLeft}h left</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex space-x-3">
            <Button 
              className="flex-1" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = href;
              }}
            >
              {progress > 0 ? "Continue Learning" : "Start Learning"}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleBookmark}
              className="transition-colors"
            >
              {bookmarked ? 
                <BookmarkCheck className="h-4 w-4 text-primary" /> : 
                <Bookmark className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

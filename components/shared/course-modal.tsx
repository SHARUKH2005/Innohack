"use client";

import { Clock, BarChart, Award, Calendar, Star, Users, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface CourseModalProps {
  id: string;
  title: string;
  description: string;
  categoryLabel: string;
  totalHours: number;
  rating: number;
  price: number;
  discountedPrice: number | null;
  gradient: string;
  featured: string | null;
  skillLevel: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseModal({
  id,
  title,
  description,
  categoryLabel,
  totalHours,
  rating,
  price,
  discountedPrice,
  gradient,
  featured,
  skillLevel,
  isOpen,
  onClose
}: CourseModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

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
  
  // Mock data for curriculum sections and lessons
  const curriculum = [
    {
      title: "Getting Started",
      lessons: [
        { title: "Introduction to the Course", duration: "5:25" },
        { title: "Setting Up Your Environment", duration: "10:15" },
        { title: "Course Overview", duration: "8:30" }
      ]
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Understanding the Basics", duration: "15:45" },
        { title: "Building Your First Project", duration: "22:10" },
        { title: "Best Practices", duration: "14:30" },
        { title: "Advanced Techniques", duration: "18:20" }
      ]
    },
    {
      title: "Real-World Applications",
      lessons: [
        { title: "Case Study 1", duration: "20:15" },
        { title: "Case Study 2", duration: "18:40" },
        { title: "Final Project", duration: "30:00" }
      ]
    }
  ];
  
  // Mock reviews
  const reviews = [
    {
      name: "Sarah Johnson",
      date: "June 15, 2025",
      rating: 5,
      comment: "This course exceeded my expectations. The instructor was knowledgeable and the content was well-structured."
    },
    {
      name: "Michael Chen",
      date: "May 28, 2025",
      rating: 4,
      comment: "Very practical course with lots of hands-on examples. Would recommend to others looking to build their skills."
    },
    {
      name: "Emma Wilson",
      date: "July 2, 2025",
      rating: 5,
      comment: "Excellent course! I've learned so much and applied it directly to my work. The instructor was responsive to questions too."
    }
  ];
  
  // Format skill level with proper capitalization
  const formattedSkillLevel = skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className={`${bgClass} bg-gradient-to-br ${gradient} p-8 text-white`}>
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                {categoryLabel}
              </span>
              {featured && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  {featured.charAt(0).toUpperCase() + featured.slice(1)}
                </span>
              )}
            </div>
            <DialogTitle className="text-3xl font-bold mt-4">{title}</DialogTitle>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300 mr-1" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-white/70 ml-1">({reviews.length} reviews)</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                <span>2,540 students</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-1" />
                <span>{formattedSkillLevel}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{totalHours} hours</span>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        {/* Course Tabs */}
        <div className="border-b border-border">
          <div className="flex px-6">
            <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'curriculum' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">About This Course</h3>
              <p className="text-muted-foreground mb-6">{description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What You&apos;ll Learn</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Master all the core concepts covered in the course</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Build real-world projects with practical applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Understand advanced techniques and best practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gain the skills needed for professional development</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Course Includes</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Play className="h-5 w-5 text-primary mr-2" />
                      <span>{totalHours} hours of video content</span>
                    </li>
                    <li className="flex items-center">
                      <BarChart className="h-5 w-5 text-primary mr-2" />
                      <span>15 practical exercises</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-5 border border-border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {discountedPrice !== null ? (
                        <>
                          <span className="text-muted-foreground line-through mr-2">
                            ${price}
                          </span>
                          <span>${discountedPrice}</span>
                        </>
                      ) : (
                        <span>${price}</span>
                      )}
                    </h3>
                    {discountedPrice !== null && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-md">
                        {Math.round(((price - discountedPrice) / price) * 100)}% off
                      </span>
                    )}
                  </div>
                  <Button className="px-8">Enroll Now</Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
              <p className="text-muted-foreground mb-6">
                {curriculum.reduce((total, section) => total + section.lessons.length, 0)} lessons • 
                {totalHours} hours total length
              </p>
              
              <div className="space-y-4">
                {curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-border rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-secondary/50">
                      <h4 className="font-semibold">{section.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <Play className="h-4 w-4 text-primary mr-3" />
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{reviews.length} reviews</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-1">
                      <div className="w-10 text-sm text-muted-foreground">{star} stars</div>
                      <div className="flex-1 mx-2 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ 
                            width: `${(reviews.filter(r => r.rating === star).length / reviews.length) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm text-muted-foreground">
                        {reviews.filter(r => r.rating === star).length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-0">
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center my-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                    </div>
                    <p className="text-sm mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

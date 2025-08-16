"use client";

import { Award, Calendar, Star, Users, Play, CheckCircle, Download, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface CompletedCourseModalProps {
  id: string;
  title: string;
  description: string;
  categoryLabel: string;
  totalHours: number;
  completionDate: string;
  rating: number;
  gradient: string;
  featured: string | null;
  skillLevel: string;
  certificateId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CompletedCourseModal({
  id,
  title,
  description,
  categoryLabel,
  totalHours,
  completionDate,
  rating,
  gradient,
  featured,
  skillLevel,
  certificateId,
  isOpen,
  onClose
}: CompletedCourseModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'certificate'>('overview');
  const [userRating, setUserRating] = useState<number>(0);

  // Define background color based on category for consistent appearance
  let bgClass = "bg-green-600";
  
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
  }
  
  // Mock data for curriculum sections and lessons
  const curriculum = [
    {
      title: "Getting Started",
      lessons: [
        { title: "Introduction to the Course", duration: "5:25", completed: true },
        { title: "Setting Up Your Environment", duration: "10:15", completed: true },
        { title: "Course Overview", duration: "8:30", completed: true }
      ]
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Understanding the Basics", duration: "15:45", completed: true },
        { title: "Building Your First Project", duration: "22:10", completed: true },
        { title: "Best Practices", duration: "14:30", completed: true },
        { title: "Advanced Techniques", duration: "18:20", completed: true }
      ]
    },
    {
      title: "Real-World Applications",
      lessons: [
        { title: "Case Study 1", duration: "20:15", completed: true },
        { title: "Case Study 2", duration: "18:40", completed: true },
        { title: "Final Project", duration: "30:00", completed: true }
      ]
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
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-600 text-white">
                Completed
              </span>
            </div>
            <DialogTitle className="text-3xl font-bold mt-4">{title}</DialogTitle>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300 mr-1" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-1" />
                <span>{formattedSkillLevel}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-1" />
                <span>Completed on {completionDate}</span>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        {/* Completion banner */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4">
          <div className="flex items-center justify-center">
            <div className="bg-green-100 dark:bg-green-800/40 p-2 rounded-full mr-3">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400">Course Completed!</h3>
              <p className="text-sm text-green-700 dark:text-green-500">
                Congratulations on completing this course.
              </p>
            </div>
            <Button variant="outline" className="ml-auto" onClick={() => setActiveTab('certificate')}>
              View Certificate
            </Button>
          </div>
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
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'certificate' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('certificate')}
            >
              Certificate
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              {!userRating && (
                <div className="mb-6 p-4 bg-secondary/50 border border-border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Rate This Course</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your feedback helps us improve and helps other students choose the right courses.
                  </p>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="p-1"
                        >
                          <Star 
                            className={`h-8 w-8 ${star <= userRating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                          />
                        </button>
                      ))}
                    </div>
                    <Button className="w-full md:w-auto">Submit Rating</Button>
                  </div>
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-4">About This Course</h3>
              <p className="text-muted-foreground mb-6">{description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What You&apos;ve Learned</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Mastered all the core concepts covered in the course</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Built real-world projects with practical applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Understood advanced techniques and best practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gained the skills needed for professional development</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Course Summary</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Play className="h-5 w-5 text-primary mr-2" />
                        <span>Total video content</span>
                      </div>
                      <span>{totalHours} hours</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-2" />
                        <span>Lessons completed</span>
                      </div>
                      <span>{curriculum.reduce((total, section) => total + section.lessons.length, 0)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <span>Completion date</span>
                      </div>
                      <span>{completionDate}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-2" />
                        <span>Certificate earned</span>
                      </div>
                      <span className="text-green-600 dark:text-green-400">Yes</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <Button 
                  onClick={() => setActiveTab('curriculum')}
                  className="flex items-center" 
                  variant="outline"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Review Course Content
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discuss
                  </Button>
                  <Button onClick={() => setActiveTab('certificate')} className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Get Certificate
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
              <p className="text-muted-foreground mb-6">
                You have completed all {curriculum.reduce((total, section) => total + section.lessons.length, 0)} lessons in this course.
                You can revisit any lesson at any time.
              </p>
              
              <div className="space-y-4">
                {curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-border rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-secondary/50">
                      <div className="flex items-center">
                        <h4 className="font-semibold">{section.title}</h4>
                        <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex justify-between items-center hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-3" />
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button>Review Course</Button>
              </div>
            </div>
          )}
          
          {/* Certificate Tab */}
          {activeTab === 'certificate' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Certificate</h3>
              <p className="text-muted-foreground mb-6">
                This certificate verifies that you have successfully completed the {title} course.
              </p>
              
              <div className="border-4 border-double border-gray-300 dark:border-gray-600 p-8 mb-6 bg-white dark:bg-gray-800">
                <div className="text-center">
                  <div className="mb-6">
                    <Award className="h-16 w-16 mx-auto text-green-600 dark:text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
                  <p className="text-lg mb-6">This is to certify that</p>
                  <p className="text-xl font-medium mb-4">John Doe</p>
                  <p className="text-lg mb-6">has successfully completed the course</p>
                  <p className="text-xl font-bold mb-6">{title}</p>
                  <div className="mb-6">
                    <p className="text-lg">{completionDate}</p>
                    <p className="text-sm text-muted-foreground">Completion Date</p>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <div className="text-left">
                      <p className="text-sm">Certificate ID</p>
                      <p className="text-xs text-muted-foreground">{certificateId || 'CERT-2025-08-12345'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Course Instructor</p>
                      <p className="text-sm text-muted-foreground">Dr. Jane Smith</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate (PDF)
                </Button>
                <Button variant="outline" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

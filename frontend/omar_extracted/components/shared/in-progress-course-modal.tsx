"use client";

import { Clock, BarChart, Award, Calendar, Star, Users, Play, CheckCircle, Book, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface InProgressCourseModalProps {
  id: string;
  title: string;
  description: string;
  categoryLabel: string;
  totalHours: number;
  hoursLeft: number;
  completionPercentage: number;
  lessonsCompleted: number;
  totalLessons: number;
  rating: number;
  gradient: string;
  featured: string | null;
  skillLevel: string;
  lastLesson: string;
  lastActivity: string;
  isOpen: boolean;
  onClose: () => void;
}

export function InProgressCourseModal({
  id,
  title,
  description,
  categoryLabel,
  totalHours,
  hoursLeft,
  completionPercentage,
  lessonsCompleted,
  totalLessons,
  rating,
  gradient,
  featured,
  skillLevel,
  lastLesson,
  lastActivity,
  isOpen,
  onClose
}: InProgressCourseModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'notes'>('overview');

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
  } else if (gradient === "from-orange-500 to-red-600") {
    bgClass = "bg-orange-600"; // Design
  }
  
  // Mock data for curriculum sections and lessons
  const curriculum = [
    {
      title: "Getting Started",
      completed: true,
      lessons: [
        { title: "Introduction to the Course", duration: "5:25", completed: true },
        { title: "Setting Up Your Environment", duration: "10:15", completed: true },
        { title: "Course Overview", duration: "8:30", completed: true }
      ]
    },
    {
      title: "Core Concepts",
      completed: false,
      lessons: [
        { title: "Understanding the Basics", duration: "15:45", completed: true },
        { title: "Building Your First Project", duration: "22:10", completed: true },
        { title: "Best Practices", duration: "14:30", completed: false },
        { title: "Advanced Techniques", duration: "18:20", completed: false }
      ]
    },
    {
      title: "Real-World Applications",
      completed: false,
      lessons: [
        { title: "Case Study 1", duration: "20:15", completed: false },
        { title: "Case Study 2", duration: "18:40", completed: false },
        { title: "Final Project", duration: "30:00", completed: false }
      ]
    }
  ];
  
  // Mock notes data
  const notes = [
    {
      id: 1,
      lessonTitle: "Building Your First Project",
      content: "Remember to initialize the project with npm init before installing dependencies. Important commands: npm install react react-dom, npx create-react-app my-app",
      timestamp: "August 10, 2025"
    },
    {
      id: 2,
      lessonTitle: "Understanding the Basics",
      content: "React components can be functional (using hooks) or class-based. Hooks were introduced in React 16.8. The most commonly used hooks are useState and useEffect.",
      timestamp: "August 5, 2025"
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
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500 text-yellow-900">
                In Progress
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
                <Clock className="h-5 w-5 mr-1" />
                <span>{totalHours} hours total</span>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        {/* Progress bar */}
        <div className="bg-secondary/30 px-8 py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{completionPercentage}% Complete</span>
            <span className="text-sm text-muted-foreground">{lessonsCompleted}/{totalLessons} lessons</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="flex justify-between mt-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>About {hoursLeft} hours left</span>
            </div>
            <div>Last activity: {lastActivity}</div>
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
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'notes' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('notes')}
            >
              My Notes
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg">
                <h3 className="text-lg font-semibold flex items-center text-yellow-800 dark:text-yellow-400 mb-2">
                  <Play className="h-5 w-5 mr-2" />
                  Continue where you left off
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-4">
                  You were last watching: <strong>{lastLesson}</strong>
                </p>
                <Button className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600">
                  Continue Learning
                </Button>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">About This Course</h3>
              <p className="text-muted-foreground mb-6">{description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <h4 className="font-semibold mb-2">Your Progress</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Book className="h-5 w-5 text-primary mr-2" />
                        <span>Lessons completed</span>
                      </div>
                      <span className="font-medium">{lessonsCompleted}/{totalLessons}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary mr-2" />
                        <span>Hours spent</span>
                      </div>
                      <span className="font-medium">{(totalHours - hoursLeft).toFixed(1)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-2" />
                        <span>Notes taken</span>
                      </div>
                      <span className="font-medium">{notes.length}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <span>Last activity</span>
                      </div>
                      <span className="font-medium">{lastActivity}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
              <p className="text-muted-foreground mb-6">
                {lessonsCompleted}/{totalLessons} lessons completed •
                {hoursLeft} hours remaining
              </p>
              
              <div className="space-y-4">
                {curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-border rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-secondary/50">
                      <div className="flex items-center">
                        <h4 className="font-semibold">{section.title}</h4>
                        {section.completed && (
                          <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {section.lessons.filter(l => l.completed).length}/{section.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex justify-between items-center hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center">
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-3" />
                            ) : (
                              <Play className="h-4 w-4 text-primary mr-3" />
                            )}
                            <span className={lesson.completed ? "text-muted-foreground" : ""}>{lesson.title}</span>
                            {lesson.title === lastLesson && !lesson.completed && (
                              <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                                In progress
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button size="lg">Continue Learning</Button>
              </div>
            </div>
          )}
          
          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">My Notes</h3>
              
              {notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="border border-border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{note.lessonTitle}</h4>
                        <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.content}</p>
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium">No notes yet</h4>
                  <p className="text-muted-foreground mt-2 mb-6">
                    You haven&apos;t added any notes for this course yet.
                    Take notes while watching lessons to help remember key points.
                  </p>
                  <Button>Start Adding Notes</Button>
                </div>
              )}
              
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

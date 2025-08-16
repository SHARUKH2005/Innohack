"use client"

import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, BookOpen, Calendar, CheckCircle, Clock, Target, X } from "lucide-react"
import { useState } from "react"

// Define the structure for a learning goal
interface LearningGoal {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  progressLabel?: string;
  timeLeft: string;
  color: string;
  textColor?: string;
  iconBg?: string;
  startDate?: string;
  endDate?: string;
  milestones?: Array<{
    title: string;
    completed: boolean;
    dueDate?: string;
  }>;
  relatedResources?: Array<{
    title: string;
    type: string;
    completed: boolean;
  }>;
  notes?: string;
}

interface ActiveGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId?: number | null;
}

export const ActiveGoalModal = ({
  isOpen,
  onClose,
  goalId
}: ActiveGoalModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for goals - in a real app, this would come from your backend
  const goals: LearningGoal[] = [
    {
      id: 1,
      title: "Complete React Course",
      description: "Finish all lessons by August 25",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      progress: 75,
      progressLabel: "24 of 32 lessons",
      timeLeft: "10 days left",
      color: "bg-primary",
      textColor: "text-primary",
      startDate: "July 15, 2025",
      endDate: "August 25, 2025",
      milestones: [
        { title: "Complete React Fundamentals section", completed: true, dueDate: "July 25, 2025" },
        { title: "Complete React Hooks section", completed: true, dueDate: "August 5, 2025" },
        { title: "Complete React Router section", completed: false, dueDate: "August 15, 2025" },
        { title: "Complete Final Project", completed: false, dueDate: "August 25, 2025" }
      ],
      relatedResources: [
        { title: "React Fundamentals", type: "Course", completed: true },
        { title: "Advanced React Patterns", type: "Article", completed: true },
        { title: "React Router Documentation", type: "Documentation", completed: false },
        { title: "Building a React App", type: "Project", completed: false }
      ],
      notes: "Need to focus more on the Router section this week to stay on track. The final project will require integrating state management."
    },
    {
      id: 2,
      title: "Study 2 hours daily",
      description: "Maintain consistent study schedule",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      progress: 40,
      progressLabel: "12 of 30 days",
      timeLeft: "18 days left",
      color: "bg-yellow-500",
      textColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
      startDate: "July 25, 2025",
      endDate: "August 30, 2025",
      milestones: [
        { title: "Week 1: 7 consecutive days", completed: true },
        { title: "Week 2: 7 consecutive days", completed: true },
        { title: "Week 3: 7 consecutive days", completed: false },
        { title: "Week 4: 7 consecutive days", completed: false }
      ],
      relatedResources: [
        { title: "Effective Study Techniques", type: "Article", completed: true },
        { title: "Time Management for Learning", type: "Video", completed: true },
        { title: "Pomodoro Timer App", type: "Tool", completed: true }
      ],
      notes: "Been doing well with morning study sessions. Need to be more consistent on weekends."
    },
    {
      id: 3,
      title: "Complete 5 Courses",
      description: "By the end of this quarter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      progress: 40,
      progressLabel: "2 of 5 courses",
      timeLeft: "45 days left",
      color: "bg-green-500",
      textColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/20",
      startDate: "July 1, 2025",
      endDate: "September 30, 2025",
      milestones: [
        { title: "HTML & CSS Basics", completed: true, dueDate: "July 15, 2025" },
        { title: "JavaScript Fundamentals", completed: true, dueDate: "August 15, 2025" },
        { title: "React Basics", completed: false, dueDate: "September 1, 2025" },
        { title: "Node.js Basics", completed: false, dueDate: "September 15, 2025" },
        { title: "Full Stack Project", completed: false, dueDate: "September 30, 2025" }
      ],
      relatedResources: [
        { title: "HTML & CSS Basics", type: "Course", completed: true },
        { title: "JavaScript Fundamentals", type: "Course", completed: true },
        { title: "React Basics", type: "Course", completed: false },
        { title: "Node.js Basics", type: "Course", completed: false },
        { title: "Full Stack Project", type: "Project", completed: false }
      ],
      notes: "On track to complete all courses by end of quarter. May need to allocate more time for the project."
    }
  ];

  // Find the selected goal
  const selectedGoal = goals.find(goal => goal.id === goalId);

  if (!selectedGoal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${selectedGoal.iconBg || 'bg-primary/10'} rounded-full`}>
              {selectedGoal.icon}
            </div>
            <DialogTitle className="text-xl font-bold">{selectedGoal.title}</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground ml-11">
            {selectedGoal.description}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue="overview" 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-6">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="milestones" className="flex-1">Milestones</TabsTrigger>
              <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 pt-4 max-h-[60vh] overflow-y-auto">
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Progress bar */}
              <div className="bg-muted/20 p-4 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className={`text-sm ${selectedGoal.textColor || "text-primary"}`}>{selectedGoal.progress}%</span>
                </div>
                <Progress value={selectedGoal.progress} className="h-2" />
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedGoal.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedGoal.progressLabel}</span>
                  </div>
                </div>
              </div>
              
              {/* Timeline section */}
              <div>
                <h3 className="text-sm font-medium mb-3">Timeline</h3>
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Start Date</div>
                      <div className="font-medium mt-1">{selectedGoal.startDate}</div>
                    </div>
                    
                    <div className="h-px flex-1 bg-border mx-4 relative">
                      <div 
                        className={`${selectedGoal.color} h-full`}
                        style={{width: `${selectedGoal.progress}%`}}
                      />
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 ${selectedGoal.color} w-3 h-3 rounded-full border-2 border-background`}
                        style={{left: `${selectedGoal.progress}%`}}
                      />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">End Date</div>
                      <div className="font-medium mt-1">{selectedGoal.endDate}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notes section */}
              {selectedGoal.notes && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Notes</h3>
                  <div className="bg-muted/20 p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">{selectedGoal.notes}</p>
                  </div>
                </div>
              )}
              
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/20 p-4 rounded-lg border border-border text-center">
                  <Calendar className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="font-medium mt-1">30 days</div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border text-center">
                  <Target className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Target</div>
                  <div className="font-medium mt-1">{selectedGoal.progressLabel?.split(' of ')[1] || "100%"}</div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border text-center">
                  <ArrowUpRight className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Daily Goal</div>
                  <div className="font-medium mt-1">2 hrs</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4 mt-0">
              <h3 className="text-sm font-medium mb-3">Progress Milestones</h3>
              
              {selectedGoal.milestones && selectedGoal.milestones.length > 0 ? (
                <div className="space-y-3">
                  {selectedGoal.milestones.map((milestone, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${milestone.completed ? 'bg-muted/30' : 'bg-muted/10'} border-border flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${milestone.completed ? 'bg-green-500' : 'border-2 border-muted-foreground'}`}>
                          {milestone.completed && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {milestone.title}
                          </div>
                          {milestone.dueDate && (
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due {milestone.dueDate}
                            </div>
                          )}
                        </div>
                      </div>
                      {milestone.completed ? (
                        <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No milestones defined for this goal.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 mt-0">
              <h3 className="text-sm font-medium mb-3">Related Resources</h3>
              
              {selectedGoal.relatedResources && selectedGoal.relatedResources.length > 0 ? (
                <div className="space-y-3">
                  {selectedGoal.relatedResources.map((resource, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border border-border bg-card flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${
                          resource.type === 'Course' ? 'bg-blue-100 dark:bg-blue-900/20' : 
                          resource.type === 'Article' ? 'bg-purple-100 dark:bg-purple-900/20' : 
                          resource.type === 'Video' ? 'bg-red-100 dark:bg-red-900/20' : 
                          resource.type === 'Project' ? 'bg-green-100 dark:bg-green-900/20' : 
                          'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <BookOpen className={`h-4 w-4 ${
                            resource.type === 'Course' ? 'text-blue-600 dark:text-blue-400' : 
                            resource.type === 'Article' ? 'text-purple-600 dark:text-purple-400' : 
                            resource.type === 'Video' ? 'text-red-600 dark:text-red-400' : 
                            resource.type === 'Project' ? 'text-green-600 dark:text-green-400' : 
                            'text-gray-600 dark:text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${resource.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {resource.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {resource.type}
                          </div>
                        </div>
                      </div>
                      
                      {resource.completed ? (
                        <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <Button variant="outline" size="sm" className="h-8">
                          Access
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No resources attached to this goal.</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter className="p-6 pt-0 flex justify-end">
          <div className="space-x-2">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
              Delete Goal
            </Button>
            <Button>
              Edit Goal
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

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
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useState } from "react"

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoalModal = ({
  isOpen,
  onClose,
}: GoalModalProps) => {
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [goalType, setGoalType] = useState('course');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would save the goal
    // For now, just close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Set New Learning Goal</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new learning goal to stay motivated and track your progress.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="goal-type" className="text-sm font-medium">
                Goal Type
              </label>
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant={goalType === 'course' ? 'default' : 'outline'} 
                  className="flex-1"
                  onClick={() => setGoalType('course')}
                >
                  Course Completion
                </Button>
                <Button 
                  type="button"
                  variant={goalType === 'habit' ? 'default' : 'outline'} 
                  className="flex-1"
                  onClick={() => setGoalType('habit')}
                >
                  Learning Habit
                </Button>
                <Button 
                  type="button"
                  variant={goalType === 'milestone' ? 'default' : 'outline'} 
                  className="flex-1"
                  onClick={() => setGoalType('milestone')}
                >
                  Milestone
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="goal-title" className="text-sm font-medium">
                Goal Title
              </label>
              <Input 
                id="goal-title"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder={
                  goalType === 'course' 
                    ? "e.g., Complete React Course" 
                    : goalType === 'habit' 
                    ? "e.g., Study 2 hours daily" 
                    : "e.g., Complete 5 Courses"
                }
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="goal-description" className="text-sm font-medium">
                Description
              </label>
              <Input 
                id="goal-description"
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
                placeholder={
                  goalType === 'course' 
                    ? "e.g., Finish all lessons of React Fundamentals" 
                    : goalType === 'habit' 
                    ? "e.g., Maintain consistent study schedule" 
                    : "e.g., By the end of this quarter"
                }
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="goal-deadline" className="text-sm font-medium">
                Deadline or Duration
              </label>
              <Input 
                id="goal-deadline"
                type="text"
                value={goalDeadline}
                onChange={(e) => setGoalDeadline(e.target.value)}
                placeholder={
                  goalType === 'course' 
                    ? "e.g., August 25, 2025" 
                    : goalType === 'habit' 
                    ? "e.g., 30 days" 
                    : "e.g., 90 days"
                }
                required
              />
            </div>
            
            {goalType === 'milestone' && (
              <div className="space-y-2">
                <label htmlFor="goal-target" className="text-sm font-medium">
                  Target Number
                </label>
                <Input 
                  id="goal-target"
                  type="number"
                  placeholder="e.g., 5"
                  min="1"
                  required
                />
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="submit">
              Create Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

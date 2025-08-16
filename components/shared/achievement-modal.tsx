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
import { X } from "lucide-react"

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  totalRequired?: number;
}

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementModal = ({
  isOpen,
  onClose,
  achievements
}: AchievementModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">All Achievements</DialogTitle>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-muted-foreground">
            Track your learning accomplishments and unlock new achievements as you progress.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-2 grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-lg p-6 flex flex-col items-center justify-center text-center ${achievement.color} text-white ${!achievement.earned ? 'opacity-30' : ''}`}
            >
              <div className="mb-3">{achievement.icon}</div>
              <h3 className="font-medium mb-2">{achievement.name}</h3>
              <p className="text-sm opacity-90 mb-4">{achievement.description}</p>
              
              {achievement.progress !== undefined && achievement.totalRequired !== undefined && (
                <div className="w-full mb-3">
                  <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                    <div 
                      className="bg-white h-2 rounded-full" 
                      style={{ width: `${(achievement.progress / achievement.totalRequired) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs opacity-80">{achievement.progress}/{achievement.totalRequired} completed</p>
                </div>
              )}
              
              {achievement.earned ? (
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  {achievement.earnedDate ? `Earned ${achievement.earnedDate}` : 'Earned'}
                </span>
              ) : (
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Not yet earned</span>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="p-6 pt-0">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

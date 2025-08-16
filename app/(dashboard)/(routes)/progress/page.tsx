"use client"

import { UserButton } from "@clerk/nextjs"
import { BookOpen, BarChart3, Calendar, ArrowUpRight, Sun, Moon, CheckSquare, Award, Zap, Compass, X, Clock, BookOpen as BookIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import modals with dynamic import to avoid hydration issues
const AchievementModal = dynamic(() => import("@/components/shared/achievement-modal").then(mod => ({ default: mod.AchievementModal })), { 
  ssr: false 
})

const GoalModal = dynamic(() => import("@/components/shared/goal-modal").then(mod => ({ default: mod.GoalModal })), { 
  ssr: false 
})

const ActiveGoalModal = dynamic(() => import("@/components/shared/active-goal-modal").then(mod => ({ default: mod.ActiveGoalModal })), { 
  ssr: false 
})

// Define the event type
type LearningEvent = {
  day: number;
  month: string;
  title: string;
  hours: number;
  lessons: number;
  notes: string;
  category: string;
  planned?: boolean;
};

// Client-side only component to fix hydration issues
const EventDetailPopup = dynamic(() => Promise.resolve(({ 
  event, 
  onClose 
}: { 
  event: LearningEvent; 
  onClose: () => void 
}) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.day} {event.month}, 2025</p>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              event.category === "React Fundamentals" ? "bg-blue-500" : 
              event.category === "Node.js Backend" ? "bg-indigo-500" : 
              event.category === "Advanced JavaScript" ? "bg-yellow-500" : 
              event.category === "UI/UX Design" ? "bg-orange-500" : "bg-green-500"
            }`} />
            <span>{event.category}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pb-4">
            <div className="p-3 bg-muted/50 rounded-md">
              <div className="flex items-center text-sm mb-1">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Hours</span>
              </div>
              <p className="text-lg font-medium">{event.hours}</p>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-md">
              <div className="flex items-center text-sm mb-1">
                <BookIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Lessons</span>
              </div>
              <p className="text-lg font-medium">{event.lessons}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Notes</h4>
            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">{event.notes}</p>
          </div>
          
          {event.planned ? (
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="mr-2" onClick={onClose}>Cancel</Button>
              <Button onClick={onClose}>Start Learning</Button>
            </div>
          ) : (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}), { ssr: false })

// Define the achievement type
type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  totalRequired?: number;
};

export default function ProgressPage() {
  // State for time period filter, event popup, and month/week navigation
  const [timePeriod, setTimePeriod] = useState<"weekly" | "monthly" | "allTime">("monthly")
  const [selectedEvent, setSelectedEvent] = useState<LearningEvent | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [currentMonth, setCurrentMonth] = useState("Aug")
  const [currentWeek, setCurrentWeek] = useState<"week1" | "week2" | "week3" | "week4">("week3")
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null)
  // Fixed to 2025 as per requirement
  const currentYear = 2025
  
  // Achievement data
  const achievements: Achievement[] = [
    { 
      id: "early-bird", 
      name: "Early Bird", 
      description: "Complete 5 lessons before 9am", 
      color: "bg-gradient-to-br from-yellow-400 to-orange-500", 
      icon: <Sun className="h-6 w-6" />, 
      earned: true,
      earnedDate: "Aug 10, 2025",
      progress: 5,
      totalRequired: 5
    },
    { 
      id: "night-owl", 
      name: "Night Owl", 
      description: "Study for 2 hours after 10pm", 
      color: "bg-gradient-to-br from-indigo-500 to-blue-600", 
      icon: <Moon className="h-6 w-6" />, 
      earned: true,
      earnedDate: "Jul 15, 2025",
      progress: 2,
      totalRequired: 2
    },
    { 
      id: "consistent", 
      name: "Consistent", 
      description: "Study for 7 days in a row", 
      color: "bg-gradient-to-br from-green-400 to-teal-500", 
      icon: <Calendar className="h-6 w-6" />, 
      earned: true,
      earnedDate: "Aug 7, 2025",
      progress: 7,
      totalRequired: 7
    },
    { 
      id: "perfectionist", 
      name: "Perfectionist", 
      description: "Score 100% on 3 quizzes", 
      color: "bg-gradient-to-br from-purple-400 to-pink-500", 
      icon: <Award className="h-6 w-6" />, 
      earned: true,
      earnedDate: "Jul 30, 2025",
      progress: 3,
      totalRequired: 3
    },
    { 
      id: "speed-demon", 
      name: "Speed Demon", 
      description: "Complete a course in record time", 
      color: "bg-gradient-to-br from-red-400 to-pink-600", 
      icon: <Zap className="h-6 w-6" />, 
      earned: false,
      progress: 0,
      totalRequired: 1
    },
    { 
      id: "explorer", 
      name: "Explorer", 
      description: "Try courses from 5 categories", 
      color: "bg-gradient-to-br from-blue-400 to-emerald-500", 
      icon: <Compass className="h-6 w-6" />, 
      earned: false,
      progress: 4,
      totalRequired: 5
    },
    {
      id: "marathon",
      name: "Marathon Learner",
      description: "Study for 4 hours in one session",
      color: "bg-gradient-to-br from-orange-300 to-red-500",
      icon: <Award className="h-6 w-6" />,
      earned: true,
      earnedDate: "Jul 22, 2025",
      progress: 4,
      totalRequired: 4
    },
    {
      id: "weekend-warrior",
      name: "Weekend Warrior",
      description: "Complete 10 lessons on weekends",
      color: "bg-gradient-to-br from-violet-400 to-indigo-600",
      icon: <Award className="h-6 w-6" />,
      earned: true,
      earnedDate: "Jun 15, 2025",
      progress: 10,
      totalRequired: 10
    },
    {
      id: "challenge-master",
      name: "Challenge Master",
      description: "Complete 3 coding challenges",
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
      icon: <Award className="h-6 w-6" />,
      earned: false,
      progress: 1,
      totalRequired: 3
    },
    {
      id: "team-player",
      name: "Team Player",
      description: "Participate in 2 group projects",
      color: "bg-gradient-to-br from-pink-400 to-purple-600",
      icon: <Award className="h-6 w-6" />,
      earned: false,
      progress: 0,
      totalRequired: 2
    },
    {
      id: "feedback-champion",
      name: "Feedback Champion",
      description: "Provide feedback on 5 courses",
      color: "bg-gradient-to-br from-amber-400 to-orange-600",
      icon: <Award className="h-6 w-6" />,
      earned: true,
      earnedDate: "Aug 1, 2025",
      progress: 5,
      totalRequired: 5
    },
    {
      id: "early-adopter",
      name: "Early Adopter",
      description: "Try a new course within a week of launch",
      color: "bg-gradient-to-br from-lime-400 to-green-600",
      icon: <Award className="h-6 w-6" />,
      earned: true,
      earnedDate: "Jun 28, 2025",
      progress: 1,
      totalRequired: 1
    }
  ]
  
  // Only render client-side components after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Example learning events data - would come from API in real app
  // Define weekly events by month and week
  const weeklyEventsByMonth = {
    // June weekly events
    "Jun": {
      "week1": [
        { day: 1, month: "Jun", title: "IDE Setup", hours: 0.8, lessons: 2, notes: "Setting up development environment", category: "Advanced JavaScript" },
        { day: 2, month: "Jun", title: "Development Tools", hours: 0.9, lessons: 3, notes: "Introduction to Git and GitHub", category: "Advanced JavaScript" },
        { day: 3, month: "Jun", title: "Web Dev Basics", hours: 1.3, lessons: 2, notes: "Web development fundamentals", category: "UI/UX Design" },
        { day: 5, month: "Jun", title: "Web Dev Intro", hours: 1.0, lessons: 2, notes: "Introduction to web development", category: "UI/UX Design" },
        { day: 7, month: "Jun", title: "Terminal Basics", hours: 0.7, lessons: 1, notes: "Command line interface basics", category: "Node.js Backend" }
      ],
      "week2": [
        { day: 8, month: "Jun", title: "Text Editors", hours: 0.6, lessons: 1, notes: "VS Code tips and tricks", category: "Advanced JavaScript" },
        { day: 9, month: "Jun", title: "Computer Basics", hours: 1.5, lessons: 3, notes: "How computers work", category: "Advanced JavaScript" },
        { day: 10, month: "Jun", title: "Binary Concepts", hours: 0.8, lessons: 1, notes: "Understanding binary", category: "Advanced JavaScript" },
        { day: 12, month: "Jun", title: "Network Fundamentals", hours: 1.0, lessons: 2, notes: "Network architecture basics", category: "Node.js Backend" },
        { day: 14, month: "Jun", title: "Internet Fundamentals", hours: 1.2, lessons: 2, notes: "How the internet works", category: "Node.js Backend" }
      ],
      "week3": [
        { day: 15, month: "Jun", title: "Problem Solving", hours: 1.3, lessons: 3, notes: "Algorithmic thinking", category: "Advanced JavaScript" },
        { day: 17, month: "Jun", title: "Computational Thinking", hours: 1.2, lessons: 2, notes: "Breaking down problems", category: "Advanced JavaScript" },
        { day: 18, month: "Jun", title: "Data Structures Intro", hours: 1.5, lessons: 3, notes: "Basic data structures", category: "Advanced JavaScript" },
        { day: 20, month: "Jun", title: "Logic & Algorithms", hours: 2.0, lessons: 4, notes: "Basic problem solving", category: "Advanced JavaScript" },
        { day: 21, month: "Jun", title: "UI Concepts", hours: 0.8, lessons: 2, notes: "User interface concepts", category: "UI/UX Design" }
      ],
      "week4": [
        { day: 22, month: "Jun", title: "UX Principles", hours: 1.0, lessons: 2, notes: "User experience basics", category: "UI/UX Design" },
        { day: 24, month: "Jun", title: "Color Theory", hours: 0.5, lessons: 1, notes: "Color in design", category: "UI/UX Design" },
        { day: 25, month: "Jun", title: "Design Principles", hours: 1.5, lessons: 3, notes: "Basic visual design", category: "UI/UX Design" },
        { day: 27, month: "Jun", title: "Typography", hours: 0.7, lessons: 1, notes: "Typography principles", category: "UI/UX Design" },
        { day: 28, month: "Jun", title: "Web Standards", hours: 1.1, lessons: 2, notes: "Web standards and accessibility", category: "UI/UX Design" }
      ]
    },
    // July weekly events
    "Jul": {
      "week1": [
        { day: 1, month: "Jul", title: "HTML Introduction", hours: 1.2, lessons: 3, notes: "Basic HTML tags and structure", category: "UI/UX Design" },
        { day: 2, month: "Jul", title: "HTML Forms", hours: 0.9, lessons: 2, notes: "Creating forms in HTML", category: "UI/UX Design" },
        { day: 3, month: "Jul", title: "HTML Semantics", hours: 1.1, lessons: 2, notes: "Semantic HTML elements", category: "UI/UX Design" },
        { day: 5, month: "Jul", title: "Programming Basics", hours: 1.5, lessons: 4, notes: "Variables, loops and functions", category: "Advanced JavaScript" },
        { day: 7, month: "Jul", title: "CSS Introduction", hours: 1.0, lessons: 2, notes: "Basic CSS styling", category: "CSS Animations" }
      ],
      "week2": [
        { day: 8, month: "Jul", title: "HTML Structure", hours: 1.2, lessons: 3, notes: "Document structure and elements", category: "UI/UX Design" },
        { day: 10, month: "Jul", title: "CSS Intro", hours: 1.0, lessons: 2, notes: "Basic styling concepts", category: "CSS Animations" },
        { day: 11, month: "Jul", title: "CSS Layouts", hours: 1.3, lessons: 3, notes: "Box model and layout", category: "CSS Animations" },
        { day: 12, month: "Jul", title: "CSS Flexbox", hours: 1.5, lessons: 3, notes: "Flexible box layouts", category: "CSS Animations" },
        { day: 14, month: "Jul", title: "CSS Grid Intro", hours: 1.2, lessons: 2, notes: "Grid layout basics", category: "CSS Animations" }
      ],
      "week3": [
        { day: 15, month: "Jul", title: "JavaScript Intro", hours: 1.5, lessons: 4, notes: "Variables, loops and functions", category: "Advanced JavaScript" },
        { day: 16, month: "Jul", title: "JavaScript Functions", hours: 1.3, lessons: 3, notes: "Function types and scope", category: "Advanced JavaScript" },
        { day: 18, month: "Jul", title: "HTML Fundamentals", hours: 2.0, lessons: 5, notes: "Semantic HTML and accessibility", category: "UI/UX Design" },
        { day: 19, month: "Jul", title: "JavaScript Objects", hours: 1.2, lessons: 3, notes: "Working with objects", category: "Advanced JavaScript" },
        { day: 21, month: "Jul", title: "JavaScript Arrays", hours: 1.0, lessons: 2, notes: "Array methods", category: "Advanced JavaScript" }
      ],
      "week4": [
        { day: 22, month: "Jul", title: "CSS Basics", hours: 1.8, lessons: 4, notes: "Selectors and layouts", category: "CSS Animations" },
        { day: 24, month: "Jul", title: "CSS Transitions", hours: 1.2, lessons: 2, notes: "Creating smooth transitions", category: "CSS Animations" },
        { day: 25, month: "Jul", title: "JavaScript DOM", hours: 2.5, lessons: 6, notes: "DOM manipulation and events", category: "Advanced JavaScript" },
        { day: 27, month: "Jul", title: "API Basics", hours: 1.0, lessons: 2, notes: "Understanding APIs", category: "Node.js Backend" },
        { day: 28, month: "Jul", title: "HTTP & APIs", hours: 1.2, lessons: 3, notes: "RESTful services and fetch API", category: "Node.js Backend" }
      ]
    },
    // August weekly events
    "Aug": {
      "week1": [
        { day: 1, month: "Aug", title: "React Introduction", hours: 1.0, lessons: 2, notes: "Started React fundamentals course", category: "React Fundamentals" },
        { day: 2, month: "Aug", title: "React JSX", hours: 0.8, lessons: 2, notes: "JSX syntax and expressions", category: "React Fundamentals" },
        { day: 3, month: "Aug", title: "JavaScript ES6", hours: 2.2, lessons: 5, notes: "Learned about arrow functions and destructuring", category: "Advanced JavaScript" },
        { day: 5, month: "Aug", title: "Node.js Basics", hours: 1.5, lessons: 3, notes: "Set up first Node.js server", category: "Node.js Backend" },
        { day: 7, month: "Aug", title: "UI Principles", hours: 0.5, lessons: 1, notes: "Color theory and typography", category: "UI/UX Design" }
      ],
      "week2": [
        { day: 8, month: "Aug", title: "React Props", hours: 1.0, lessons: 2, notes: "Component props and data flow", category: "React Fundamentals" },
        { day: 9, month: "Aug", title: "React Components", hours: 1.2, lessons: 3, notes: "Completed lessons on component lifecycle and hooks", category: "React Fundamentals" },
        { day: 10, month: "Aug", title: "React State Management", hours: 0.8, lessons: 2, notes: "Learned about Context API and useReducer", category: "React Fundamentals" },
        { day: 11, month: "Aug", title: "CSS Grid Layout", hours: 1.5, lessons: 4, notes: "Practiced creating responsive grid layouts", category: "CSS Animations" },
        { day: 12, month: "Aug", title: "Node.js Routing", hours: 2.3, lessons: 3, notes: "Built Express routes for REST API", category: "Node.js Backend" }
      ],
      "week3": [
        { day: 13, month: "Aug", title: "User Authentication", hours: 1.8, lessons: 2, notes: "Implemented JWT token-based auth flow", category: "Node.js Backend" },
        { day: 14, month: "Aug", title: "Design Systems", hours: 1.0, lessons: 2, notes: "Studied component design principles", category: "UI/UX Design" },
        { day: 15, month: "Aug", title: "JavaScript Promises", hours: 2.5, lessons: 3, notes: "Deep dive into async/await patterns", category: "Advanced JavaScript" },
        { day: 16, month: "Aug", title: "React Hooks", hours: 1.3, lessons: 2, notes: "useState and useEffect deep dive", category: "React Fundamentals" },
        { day: 17, month: "Aug", title: "CSS Animations", hours: 0, lessons: 0, notes: "Planned: Animation principles", category: "CSS Animations", planned: true }
      ],
      "week4": [
        { day: 19, month: "Aug", title: "React Router", hours: 0, lessons: 0, notes: "Planned: Client-side routing", category: "React Fundamentals", planned: true },
        { day: 21, month: "Aug", title: "API Testing", hours: 0, lessons: 0, notes: "Planned: Jest and Supertest", category: "Node.js Backend", planned: true },
        { day: 22, month: "Aug", title: "Redux Basics", hours: 0, lessons: 0, notes: "Planned: State management with Redux", category: "React Fundamentals", planned: true },
        { day: 24, month: "Aug", title: "GraphQL Intro", hours: 0, lessons: 0, notes: "Planned: Introduction to GraphQL", category: "Node.js Backend", planned: true },
        { day: 26, month: "Aug", title: "Deployment", hours: 0, lessons: 0, notes: "Planned: Deploying web applications", category: "Node.js Backend", planned: true }
      ]
    },
    // September weekly events (all planned)
    "Sep": {
      "week1": [
        { day: 2, month: "Sep", title: "React Hooks Deep Dive", hours: 0, lessons: 0, notes: "Planned: Advanced hooks patterns", category: "React Fundamentals", planned: true },
        { day: 3, month: "Sep", title: "Custom Hooks", hours: 0, lessons: 0, notes: "Planned: Building reusable hooks", category: "React Fundamentals", planned: true },
        { day: 4, month: "Sep", title: "Performance Optimization", hours: 0, lessons: 0, notes: "Planned: React performance", category: "React Fundamentals", planned: true },
        { day: 5, month: "Sep", title: "Database Design", hours: 0, lessons: 0, notes: "Planned: SQL & NoSQL concepts", category: "Node.js Backend", planned: true },
        { day: 6, month: "Sep", title: "MongoDB Basics", hours: 0, lessons: 0, notes: "Planned: MongoDB CRUD operations", category: "Node.js Backend", planned: true }
      ],
      "week2": [
        { day: 9, month: "Sep", title: "PostgreSQL", hours: 0, lessons: 0, notes: "Planned: Relational database concepts", category: "Node.js Backend", planned: true },
        { day: 10, month: "Sep", title: "Responsive Design", hours: 0, lessons: 0, notes: "Planned: Mobile-first approaches", category: "CSS Animations", planned: true },
        { day: 11, month: "Sep", title: "Media Queries", hours: 0, lessons: 0, notes: "Planned: Advanced responsive techniques", category: "CSS Animations", planned: true },
        { day: 12, month: "Sep", title: "Advanced CSS", hours: 0, lessons: 0, notes: "Planned: CSS variables and functions", category: "CSS Animations", planned: true },
        { day: 13, month: "Sep", title: "SASS/SCSS", hours: 0, lessons: 0, notes: "Planned: CSS preprocessors", category: "CSS Animations", planned: true }
      ],
      "week3": [
        { day: 15, month: "Sep", title: "State Management", hours: 0, lessons: 0, notes: "Planned: Redux & Context API", category: "React Fundamentals", planned: true },
        { day: 17, month: "Sep", title: "Redux Middleware", hours: 0, lessons: 0, notes: "Planned: Thunk and Saga", category: "React Fundamentals", planned: true },
        { day: 18, month: "Sep", title: "React Query", hours: 0, lessons: 0, notes: "Planned: Data fetching with React Query", category: "React Fundamentals", planned: true },
        { day: 19, month: "Sep", title: "Testing Intro", hours: 0, lessons: 0, notes: "Planned: Testing principles", category: "Advanced JavaScript", planned: true },
        { day: 20, month: "Sep", title: "Testing Strategies", hours: 0, lessons: 0, notes: "Planned: Unit & integration testing", category: "Advanced JavaScript", planned: true }
      ],
      "week4": [
        { day: 23, month: "Sep", title: "Jest", hours: 0, lessons: 0, notes: "Planned: Testing with Jest", category: "Advanced JavaScript", planned: true },
        { day: 24, month: "Sep", title: "React Testing Library", hours: 0, lessons: 0, notes: "Planned: Component testing", category: "React Fundamentals", planned: true },
        { day: 26, month: "Sep", title: "TypeScript Basics", hours: 0, lessons: 0, notes: "Planned: TypeScript introduction", category: "Advanced JavaScript", planned: true },
        { day: 27, month: "Sep", title: "TypeScript with React", hours: 0, lessons: 0, notes: "Planned: React and TypeScript", category: "React Fundamentals", planned: true },
        { day: 30, month: "Sep", title: "Next.js Intro", hours: 0, lessons: 0, notes: "Planned: Next.js fundamentals", category: "React Fundamentals", planned: true }
      ]
    }
  };
  
  // Current weekly events based on selected month and week
  const weeklyEvents = weeklyEventsByMonth[currentMonth]?.[currentWeek] || weeklyEventsByMonth["Aug"]["week3"];
  
  // Earlier August events
  const earlyAugustEvents = [
    { day: 1, month: "Aug", title: "React Introduction", hours: 1.0, lessons: 2, notes: "Started React fundamentals course", category: "React Fundamentals" },
    { day: 3, month: "Aug", title: "JavaScript ES6", hours: 2.2, lessons: 5, notes: "Learned about arrow functions and destructuring", category: "Advanced JavaScript" },
    { day: 5, month: "Aug", title: "Node.js Basics", hours: 1.5, lessons: 3, notes: "Set up first Node.js server", category: "Node.js Backend" },
    { day: 7, month: "Aug", title: "UI Principles", hours: 0.5, lessons: 1, notes: "Color theory and typography", category: "UI/UX Design" },
  ]
  
  // Future events
  const futureEvents = [
    { day: 17, month: "Aug", title: "CSS Animations", hours: 0, lessons: 0, notes: "Planned: Animation principles", category: "CSS Animations", planned: true },
    { day: 19, month: "Aug", title: "React Router", hours: 0, lessons: 0, notes: "Planned: Client-side routing", category: "React Fundamentals", planned: true },
    { day: 21, month: "Aug", title: "API Testing", hours: 0, lessons: 0, notes: "Planned: Jest and Supertest", category: "Node.js Backend", planned: true },
  ]
  
  // July events
  const julyEvents = [
    { day: 5, month: "Jul", title: "Programming Basics", hours: 1.5, lessons: 4, notes: "Variables, loops and functions", category: "Advanced JavaScript" },
    { day: 8, month: "Jul", title: "HTML Structure", hours: 1.2, lessons: 3, notes: "Document structure and elements", category: "UI/UX Design" },
    { day: 10, month: "Jul", title: "CSS Intro", hours: 1.0, lessons: 2, notes: "Basic styling concepts", category: "CSS Animations" },
    { day: 15, month: "Jul", title: "JavaScript Intro", hours: 1.5, lessons: 4, notes: "Variables, loops and functions", category: "Advanced JavaScript" },
    { day: 18, month: "Jul", title: "HTML Fundamentals", hours: 2.0, lessons: 5, notes: "Semantic HTML and accessibility", category: "UI/UX Design" },
    { day: 22, month: "Jul", title: "CSS Basics", hours: 1.8, lessons: 4, notes: "Selectors and layouts", category: "CSS Animations" },
    { day: 25, month: "Jul", title: "JavaScript DOM", hours: 2.5, lessons: 6, notes: "DOM manipulation and events", category: "Advanced JavaScript" },
    { day: 28, month: "Jul", title: "HTTP & APIs", hours: 1.2, lessons: 3, notes: "RESTful services and fetch API", category: "Node.js Backend" },
  ]
  
  // June events
  const juneEvents = [
    { day: 5, month: "Jun", title: "Web Dev Intro", hours: 1.0, lessons: 2, notes: "Introduction to web development", category: "UI/UX Design" },
    { day: 9, month: "Jun", title: "Computer Basics", hours: 1.5, lessons: 3, notes: "How computers work", category: "Advanced JavaScript" },
    { day: 14, month: "Jun", title: "Internet Fundamentals", hours: 1.2, lessons: 2, notes: "How the internet works", category: "Node.js Backend" },
    { day: 20, month: "Jun", title: "Logic & Algorithms", hours: 2.0, lessons: 4, notes: "Basic problem solving", category: "Advanced JavaScript" },
    { day: 25, month: "Jun", title: "Design Principles", hours: 1.5, lessons: 3, notes: "Basic visual design", category: "UI/UX Design" },
  ]
  
  // September planned events
  const septemberEvents = [
    { day: 2, month: "Sep", title: "React Hooks Deep Dive", hours: 0, lessons: 0, notes: "Planned: Advanced hooks patterns", category: "React Fundamentals", planned: true },
    { day: 5, month: "Sep", title: "Database Design", hours: 0, lessons: 0, notes: "Planned: SQL & NoSQL concepts", category: "Node.js Backend", planned: true },
    { day: 10, month: "Sep", title: "Responsive Design", hours: 0, lessons: 0, notes: "Planned: Mobile-first approaches", category: "CSS Animations", planned: true },
    { day: 15, month: "Sep", title: "State Management", hours: 0, lessons: 0, notes: "Planned: Redux & Context API", category: "React Fundamentals", planned: true },
    { day: 20, month: "Sep", title: "Testing Strategies", hours: 0, lessons: 0, notes: "Planned: Unit & integration testing", category: "Advanced JavaScript", planned: true },
  ]
  
  // Map of events by month for easily accessing events
  const eventsByMonth = {
    "Jun": juneEvents,
    "Jul": julyEvents,
    "Aug": [...earlyAugustEvents, ...weeklyEvents, ...futureEvents],
    "Sep": septemberEvents
  }
  
  // Combine events for different views
  const learningEvents = {
    weekly: weeklyEvents,
    monthly: eventsByMonth[currentMonth] || [...earlyAugustEvents, ...weeklyEvents, ...futureEvents],
    allTime: [...juneEvents, ...julyEvents, ...earlyAugustEvents, ...weeklyEvents, ...futureEvents, ...septemberEvents]
  }
  
  return (
    <div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Learning Progress</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Track your learning journey, monitor your achievements, and set goals to keep yourself motivated.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className={`flex items-center ${timePeriod === "weekly" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setTimePeriod("weekly")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Weekly
            </Button>
            <Button 
              variant="outline" 
              className={`flex items-center ${timePeriod === "monthly" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setTimePeriod("monthly")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Monthly
            </Button>
            <Button 
              variant="outline" 
              className={`flex items-center ${timePeriod === "allTime" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setTimePeriod("allTime")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              All time
            </Button>
          </div>
        </div>
        
        {/* Activity Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Activity Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {timePeriod === "weekly" ? "11.1" : 
                     timePeriod === "monthly" && currentMonth === "Jun" ? "21.4" :
                     timePeriod === "monthly" && currentMonth === "Jul" ? "25.4" :
                     timePeriod === "monthly" && currentMonth === "Aug" ? "11.1" :
                     timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                     "65.5"} hrs
                  </p>
                  <p className="text-sm text-muted-foreground">Total Learning Time</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>
                  {timePeriod === "weekly" ? "8" : 
                   timePeriod === "monthly" && currentMonth === "Jun" ? "New" :
                   timePeriod === "monthly" && currentMonth === "Jul" ? "38" :
                   timePeriod === "monthly" && currentMonth === "Aug" ? "12" :
                   timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                   "15"}% increase from {timePeriod === "weekly" ? "last week" : "last month"}
                </span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {timePeriod === "weekly" ? "2" : 
                     timePeriod === "monthly" && currentMonth === "Jun" ? "3" :
                     timePeriod === "monthly" && currentMonth === "Jul" ? "4" :
                     timePeriod === "monthly" && currentMonth === "Aug" ? "2" :
                     timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                     "9"}
                  </p>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>
                  {timePeriod === "weekly" ? "1" : 
                   timePeriod === "monthly" && currentMonth === "Jun" ? "New" :
                   timePeriod === "monthly" && currentMonth === "Jul" ? "2" :
                   timePeriod === "monthly" && currentMonth === "Aug" ? "1" :
                   timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                   "4"} more than {timePeriod === "weekly" ? "last week" : "last month"}
                </span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {timePeriod === "weekly" ? "17" : 
                     timePeriod === "monthly" && currentMonth === "Jun" ? "42" :
                     timePeriod === "monthly" && currentMonth === "Jul" ? "58" :
                     timePeriod === "monthly" && currentMonth === "Aug" ? "17" :
                     timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                     "132"}
                  </p>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>
                  {timePeriod === "weekly" ? "4" : 
                   timePeriod === "monthly" && currentMonth === "Jun" ? "New" :
                   timePeriod === "monthly" && currentMonth === "Jul" ? "6" :
                   timePeriod === "monthly" && currentMonth === "Aug" ? "3" :
                   timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                   "14"} more than {timePeriod === "weekly" ? "last week" : "last month"}
                </span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {timePeriod === "weekly" ? "4.9" : 
                     timePeriod === "monthly" && currentMonth === "Jun" ? "4.5" :
                     timePeriod === "monthly" && currentMonth === "Jul" ? "4.7" :
                     timePeriod === "monthly" && currentMonth === "Aug" ? "4.9" :
                     timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                     "4.7"}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Rating Given</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>
                  {timePeriod === "weekly" ? "0.3" : 
                   timePeriod === "monthly" && currentMonth === "Jun" ? "New" :
                   timePeriod === "monthly" && currentMonth === "Jul" ? "0.1" :
                   timePeriod === "monthly" && currentMonth === "Aug" ? "0.2" :
                   timePeriod === "monthly" && currentMonth === "Sep" ? "0" :
                   "0.1"} higher than {timePeriod === "weekly" ? "last week" : "last month"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Activity Calendar */}
        <section className="mb-10 p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Learning Activity</h2>
          
          {/* Weekly View */}
          {timePeriod === "weekly" && (
            <div className="space-y-4">
              {/* Week navigation - only arrows, no dropdowns */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => {
                    // Logic for previous week or month
                    const weeks = ["week1", "week2", "week3", "week4"];
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    
                    const currentWeekIndex = weeks.indexOf(currentWeek);
                    const currentMonthIndex = months.indexOf(currentMonth);
                    
                    if (currentWeekIndex > 0) {
                      // Go to previous week in same month
                      setCurrentWeek(weeks[currentWeekIndex - 1]);
                    } else if (currentMonthIndex > 0 && weeklyEventsByMonth[months[currentMonthIndex - 1]]) {
                      // Go to last week of previous month
                      setCurrentMonth(months[currentMonthIndex - 1]);
                      setCurrentWeek("week4");
                    }
                  }}
                  disabled={currentMonth === "Jun" && currentWeek === "week1"}
                  className={`p-2 rounded-md transition-colors ${currentMonth === "Jun" && currentWeek === "week1" ? "text-muted-foreground opacity-50" : "hover:bg-muted"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex items-center justify-center">
                  <div className="text-lg font-medium">
                    {/* Display current month and week number */}
                    {currentMonth} - {currentWeek === "week1" ? "Week 1" : 
                    currentWeek === "week2" ? "Week 2" : 
                    currentWeek === "week3" ? "Week 3" : 
                    "Week 4"}
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    // Logic for next week or month
                    const weeks = ["week1", "week2", "week3", "week4"];
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    
                    const currentWeekIndex = weeks.indexOf(currentWeek);
                    const currentMonthIndex = months.indexOf(currentMonth);
                    
                    if (currentWeekIndex < 3) {
                      // Go to next week in same month
                      setCurrentWeek(weeks[currentWeekIndex + 1]);
                    } else if (currentMonthIndex < months.length - 1 && weeklyEventsByMonth[months[currentMonthIndex + 1]]) {
                      // Go to first week of next month
                      setCurrentMonth(months[currentMonthIndex + 1]);
                      setCurrentWeek("week1");
                    }
                  }}
                  disabled={currentMonth === "Sep" && currentWeek === "week4"}
                  className={`p-2 rounded-md transition-colors ${currentMonth === "Sep" && currentWeek === "week4" ? "text-muted-foreground opacity-50" : "hover:bg-muted"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Week date range header */}
              <div className="text-sm text-muted-foreground mb-4">
                {currentWeek === "week1" ? "1-7" : 
                 currentWeek === "week2" ? "8-14" : 
                 currentWeek === "week3" ? "15-21" : 
                 "22-30"} {currentMonth} 2025
              </div>
              
              {/* Weekly timeline view */}
              {weeklyEvents && weeklyEvents.length > 0 ? (
                <div className="space-y-3">
                  {weeklyEvents.map((event, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedEvent(event)}
                      className={`flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors ${isMounted ? 'cursor-pointer' : ''} ${event.planned ? 'opacity-60' : ''}`}
                    >
                      <div className="w-16 text-center">
                        <div className="text-xs font-medium text-primary">{event.day} {event.month}</div>
                        <div className="text-[10px] text-muted-foreground">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][(event.day + 1) % 7]}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full mx-2 ${event.category === "React Fundamentals" ? "bg-blue-500" : 
                        event.category === "Node.js Backend" ? "bg-indigo-500" : 
                        event.category === "Advanced JavaScript" ? "bg-yellow-500" : 
                        event.category === "UI/UX Design" ? "bg-orange-500" : "bg-green-500"}`} />
                      <div className="flex-grow">
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.category}</div>
                      </div>
                      <div className="flex flex-col items-end text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{event.hours}h</span>
                        </div>
                        <div className="flex items-center mt-0.5">
                          <BookIcon className="h-3 w-3 mr-1" />
                          <span>{event.lessons} lessons</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center justify-center py-10 px-4">
                  <div className="p-4 bg-muted/50 rounded-full mb-4">
                    <Calendar className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">No learning activity found</h3>
                  <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
                    There are no learning activities recorded for {currentWeek === "week1" ? "Week 1" : 
                    currentWeek === "week2" ? "Week 2" : 
                    currentWeek === "week3" ? "Week 3" : 
                    "Week 4"} of {currentMonth} 2025.
                  </p>
                  <Button className="mt-4" onClick={() => {setCurrentMonth("Aug"); setCurrentWeek("week3");}}>
                    View Current Week
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Monthly View */}
          {timePeriod === "monthly" && (
            <div className="mb-4">
              {/* Month navigation - arrows only for 2025 */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => {
                    // Logic to go to previous month (within 2025 only)
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const currentIndex = months.indexOf(currentMonth);
                    if (currentIndex > 0) {
                      setCurrentMonth(months[currentIndex - 1]);
                    }
                  }}
                  disabled={currentMonth === "Jan"}
                  className={`p-2 rounded-md transition-colors ${currentMonth === "Jan" ? "text-muted-foreground opacity-50" : "hover:bg-muted"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-lg font-medium">{currentMonth} 2025</div>
                </div>
                
                <button 
                  onClick={() => {
                    // Logic to go to next month (within 2025 only)
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const currentIndex = months.indexOf(currentMonth);
                    if (currentIndex < months.length - 1) {
                      setCurrentMonth(months[currentIndex + 1]);
                    }
                  }}
                  disabled={currentMonth === "Dec"}
                  className={`p-2 rounded-md transition-colors ${currentMonth === "Dec" ? "text-muted-foreground opacity-50" : "hover:bg-muted"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div>
                {/* Week days header */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar body */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Calculate month layout */}
                {(() => {
                  // Helper function to get the first day of month (0 = Sunday, 1 = Monday, etc.)
                  const getFirstDayOfMonth = (month, year) => {
                    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
                    return new Date(year, monthIndex, 1).getDay();
                  };
                  
                  // Helper function to get number of days in month
                  const getDaysInMonth = (month, year) => {
                    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
                    return new Date(year, monthIndex + 1, 0).getDate();
                  };
                  
                  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
                  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
                  const today = new Date();
                  const currentRealDay = today.getDate();
                  const currentRealMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][today.getMonth()];
                  const currentRealYear = today.getFullYear();
                  
                  // Render empty cells for start of month
                  const emptyStartCells = Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-start-${i}`} className="h-20 rounded-md"></div>
                  ));
                  
                  // Render days of month
                  const dayCells = Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const isCurrentDay = currentRealDay === day && currentRealMonth === currentMonth && currentRealYear === 2025;
                    const isPastDay = (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(currentMonth) < 
                                      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf("Aug")) ||
                                     (currentMonth === "Aug" && day <= 15);
                    
                    // Find events for this day
                    const dayEvents = learningEvents.monthly.filter(event => event.day === day && event.month === currentMonth);
                    const hasEvents = dayEvents.length > 0;
                    const isPlannedDay = dayEvents.some(event => event.planned);
                    
                    return (
                      <div 
                        key={`day-${day}`} 
                        className={`h-20 rounded-md flex flex-col p-1 border ${isCurrentDay ? 'border-primary' : 'border-border'} ${isPastDay ? '' : 'opacity-60'}`}
                      >
                        <span className={`text-xs font-medium ${isCurrentDay ? 'text-primary' : 'text-muted-foreground'}`}>
                          {day}
                        </span>
                        
                        {/* Events for the day */}
                        <div className="flex-grow overflow-hidden">
                          {hasEvents && dayEvents.map((event, i) => (
                            <div 
                              key={i}
                              onClick={() => setSelectedEvent(event)}
                              className={`text-xs mt-0.5 px-1 py-0.5 rounded truncate ${isMounted ? 'cursor-pointer' : ''} 
                                ${event.category === "React Fundamentals" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300" : 
                                event.category === "Node.js Backend" ? "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300" : 
                                event.category === "Advanced JavaScript" ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300" : 
                                event.category === "UI/UX Design" ? "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300" : 
                                "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"} 
                                ${event.planned ? 'border border-dashed' : ''}`}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                  
                  // Return combined cells
                  return [...emptyStartCells, ...dayCells];
                })()}
                </div>
              </div>
              
              {/* No data message */}
              {(!eventsByMonth[currentMonth] || eventsByMonth[currentMonth].length === 0) && (
                <div className="mt-8 flex flex-col items-center justify-center py-10 px-4">
                  <div className="p-4 bg-muted/50 rounded-full mb-4">
                    <Calendar className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">No learning activity found</h3>
                  <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
                    There are no learning activities recorded for {currentMonth} 2025. 
                    Use the arrows above to navigate to months with activity or plan new lessons.
                  </p>
                  <Button className="mt-4" onClick={() => setCurrentMonth("Aug")}>
                    View Current Month
                  </Button>
                </div>
              )}
              
              {/* Only show legend if there's data */}
              {eventsByMonth[currentMonth] && eventsByMonth[currentMonth].length > 0 && (
                <div className="mt-4 flex flex-col items-center">
                  <div className="text-xs text-muted-foreground grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-1 bg-blue-100 dark:bg-blue-900/20 rounded-sm"></div>
                      <span>React</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-1 bg-indigo-100 dark:bg-indigo-900/20 rounded-sm"></div>
                      <span>Node.js</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-1 bg-yellow-100 dark:bg-yellow-900/20 rounded-sm"></div>
                      <span>JavaScript</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-1 bg-orange-100 dark:bg-orange-900/20 rounded-sm"></div>
                      <span>UI/UX</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 mr-1 bg-green-100 dark:bg-green-900/20 rounded-sm"></div>
                      <span>CSS</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* All Time View */}
          {timePeriod === "allTime" && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">June - September 2025</div>
              
              {/* Monthly activity chart */}
              <div className="h-72 bg-muted/10 border border-border rounded-lg p-4 relative">
                {/* Background grid lines */}
                <div className="absolute inset-0 grid grid-cols-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={`grid-line-${i}`} className="border-t border-border w-full absolute" style={{ bottom: `${i * 25}%` }}></div>
                  ))}
                </div>
                
                <div className="h-full flex items-end justify-between">
                {[
                  {
                    month: "Jun", 
                    data: [
                      { week: "Week 1", hours: 4.7, color: "from-orange-400 to-orange-500", lessons: 10 },
                      { week: "Week 2", hours: 5.1, color: "from-orange-500 to-orange-600", lessons: 9 },
                      { week: "Week 3", hours: 6.8, color: "from-orange-600 to-orange-700", lessons: 14 },
                      { week: "Week 4", hours: 4.8, color: "from-orange-700 to-orange-800", lessons: 9 }
                    ]
                  },
                  {
                    month: "Jul", 
                    data: [
                      { week: "Week 1", hours: 4.7, color: "from-blue-400 to-blue-500", lessons: 11 },
                      { week: "Week 2", hours: 6.0, color: "from-blue-500 to-blue-600", lessons: 13 },
                      { week: "Week 3", hours: 7.0, color: "from-blue-600 to-blue-700", lessons: 17 },
                      { week: "Week 4", hours: 7.7, color: "from-blue-700 to-blue-800", lessons: 17 }
                    ]
                  },
                  {
                    month: "Aug", 
                    data: [
                      { week: "Week 1", hours: 6.0, color: "from-green-400 to-green-500", lessons: 13 },
                      { week: "Week 2", hours: 6.8, color: "from-green-500 to-green-600", lessons: 14 },
                      { week: "Week 3", hours: 6.6, color: "from-green-600 to-green-700", lessons: 9, current: true },
                      { week: "Week 4", hours: 0, color: "from-green-300 to-green-400", lessons: 0, future: true }
                    ]
                  },
                  {
                    month: "Sep", 
                    data: [
                      { week: "Week 1", hours: 0, color: "from-purple-300 to-purple-400", lessons: 0, future: true },
                      { week: "Week 2", hours: 0, color: "from-purple-400 to-purple-500", lessons: 0, future: true },
                      { week: "Week 3", hours: 0, color: "from-purple-500 to-purple-600", lessons: 0, future: true },
                      { week: "Week 4", hours: 0, color: "from-purple-600 to-purple-700", lessons: 0, future: true }
                    ]
                  }
                ].map((monthData, monthIndex) => (
                  <div key={monthIndex} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-around">
                      {monthData.data.map((weekData, weekIndex) => {
                        // Ensure minimum height for visibility
                        const heightPercentage = Math.max(5, (weekData.hours / 10) * 85);
                        const lessonHeight = Math.max(5, (weekData.lessons / 20) * 85);
                        
                        return (
                          <div key={`${monthData.month}-${weekData.week}`} className="flex flex-col items-center mx-1 group cursor-pointer relative">
                            {/* Tooltip on hover - only rendered client-side with key to ensure hydration matches */}
                            <div key={isMounted ? 'mounted' : 'not-mounted'} className="relative">
                              {isMounted && (
                                <div className="absolute bottom-full mb-2 bg-background border border-border rounded-md p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 min-w-[120px]">
                                  <p className="text-xs font-medium">{monthData.month} - {weekData.week}</p>
                                  <div className="flex justify-between text-xs mt-1">
                                    <span className="text-muted-foreground">Hours:</span>
                                    <span>{weekData.hours}</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Lessons:</span>
                                    <span>{weekData.lessons}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Bar chart */}
                            <div className="flex items-end space-x-1">
                              {/* Hours bar */}
                              <div 
                                className={`w-7 rounded-t bg-gradient-to-b ${weekData.future ? 'from-primary/30 to-primary/20' : weekData.current ? 'from-primary to-primary' : weekData.color}`}
                                style={{ 
                                  height: `${heightPercentage}%`,
                                  minHeight: '8px',
                                  boxShadow: weekData.current ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                                }}
                              >
                                {/* Add a shine effect to current week */}
                                {weekData.current && (
                                  <div className="h-full w-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                                )}
                              </div>
                              
                              {/* Lessons bar */}
                              <div 
                                className={`w-3 rounded-t bg-gradient-to-b ${weekData.future ? 'from-green-300/30 to-green-300/20' : 'from-green-500 to-green-600'}`}
                                style={{ 
                                  height: `${lessonHeight}%`,
                                  minHeight: '6px'
                                }}
                              ></div>
                            </div>
                            
                            <div className="mt-2 text-xs font-medium text-muted-foreground">
                              {weekIndex === 0 ? `${monthData.month}-W1` : weekIndex === 3 ? `${monthData.month}-W4` : ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 text-xs font-medium text-foreground">{monthData.month}</div>
                  </div>
                ))}
                </div>
              </div>
              
              {/* Chart Legend */}
              <div className="flex justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 bg-gradient-to-b from-blue-500 to-blue-600 rounded-sm"></div>
                  <span className="text-xs text-muted-foreground">Hours Studied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 bg-gradient-to-b from-green-500 to-green-600 rounded-sm"></div>
                  <span className="text-xs text-muted-foreground">Lessons Completed</span>
                </div>
              </div>
              
              {/* Summary stats for all time */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/10 border border-border p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Hours</div>
                  <div className="text-2xl font-semibold mt-1">65.5</div>
                </div>
                <div className="bg-muted/10 border border-border p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                  <div className="text-2xl font-semibold mt-1">132</div>
                </div>
                <div className="bg-muted/10 border border-border p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Best Week</div>
                  <div className="text-2xl font-semibold mt-1">7.7 hrs</div>
                </div>
              </div>
              
              <div className="bg-muted/10 border border-border p-4 rounded-lg">
                <h3 className="text-sm font-medium">Learning Highlights</h3>
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>Web Development</span>
                      </div>
                      <span className="text-muted-foreground">35.4 hrs</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '54%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span>Data Science</span>
                      </div>
                      <span className="text-muted-foreground">19.6 hrs</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                        <span>Design Principles</span>
                      </div>
                      <span className="text-muted-foreground">10.5 hrs</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full rounded-full" style={{ width: '16%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Event Detail Popup - Using dynamic import to prevent hydration issues */}
          {selectedEvent && (
            <EventDetailPopup 
              event={selectedEvent} 
              onClose={() => setSelectedEvent(null)} 
            />
          )}
          
        </section>

        {/* Course Progress */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Course Progress</h2>
          <div className="space-y-4">
            {[
              { name: "React Fundamentals", progress: 75, color: "bg-blue-500", remaining: "3h left", lessons: "24/32 lessons" },
              { name: "UI/UX Design", progress: 20, color: "bg-orange-500", remaining: "12h left", lessons: "8/40 lessons" },
              { name: "Node.js Backend", progress: 45, color: "bg-indigo-500", remaining: "8h left", lessons: "15/32 lessons" },
              { name: "Advanced JavaScript", progress: 90, color: "bg-yellow-500", remaining: "1h left", lessons: "27/30 lessons" },
              { name: "CSS Animations", progress: 60, color: "bg-green-500", remaining: "4h left", lessons: "12/20 lessons" }
            ].map((course, index) => (
              <div key={index} className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{course.name}</h3>
                  <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div className={`${course.color} h-2 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{course.lessons}</span>
                  <span>{course.remaining}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Achievement Badges */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Your Achievements</h2>
            <Button 
              variant="link" 
              className="text-primary"
              onClick={() => setIsAchievementsModalOpen(true)}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {achievements.slice(0, 6).map((achievement, index) => (
              <div 
                key={achievement.id} 
                className={`${index > 3 ? 'opacity-30' : ''} rounded-lg p-4 flex flex-col items-center justify-center text-center ${achievement.color} text-white aspect-square hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={() => setIsAchievementsModalOpen(true)}
              >
                <div className="mb-2">{achievement.icon}</div>
                <h3 className="font-medium text-sm mb-1">{achievement.name}</h3>
                <p className="text-xs opacity-90">{achievement.description}</p>
                {achievement.earned && index <= 3 && (
                  <span className="mt-2 px-2 py-0.5 bg-white/20 rounded-full text-[10px]">Earned</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Achievement Modal */}
          <AchievementModal 
            isOpen={isAchievementsModalOpen}
            onClose={() => setIsAchievementsModalOpen(false)}
            achievements={achievements}
          />
        </section>

        {/* Learning Goals */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Your Learning Goals</h2>
            <Button onClick={() => setIsGoalModalOpen(true)}>Set New Goal</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
                timeLeft: "10 days left",
                color: "bg-primary"
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
                iconBg: "bg-yellow-100 dark:bg-yellow-900/20"
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
                iconBg: "bg-green-100 dark:bg-green-900/20"
              }
            ].map((goal) => (
              <div 
                key={goal.id}
                className="bg-card rounded-lg border border-border p-6 transition-all hover:shadow-md cursor-pointer"
                onClick={() => setSelectedGoal(goal.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-foreground">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                  </div>
                  <div className={`p-2 ${goal.iconBg || 'bg-primary/10'} rounded-full`}>
                    {goal.icon}
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div className={`${goal.color} h-2 rounded-full`} style={{ width: `${goal.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={goal.textColor || "text-primary font-medium"}>
                    {goal.progressLabel || `${goal.progress}% complete`}
                  </span>
                  <span className="text-muted-foreground">{goal.timeLeft}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Goal Modals */}
          <GoalModal 
            isOpen={isGoalModalOpen}
            onClose={() => setIsGoalModalOpen(false)}
          />
          
          {/* Active Goal Detail Modal */}
          <ActiveGoalModal 
            isOpen={selectedGoal !== null}
            onClose={() => setSelectedGoal(null)}
            goalId={selectedGoal}
          />
        </section>
      </main>
    </div>
  )
}

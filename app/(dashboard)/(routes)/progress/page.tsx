"use client"

import { UserButton } from "@clerk/nextjs"
import { BookOpen, BarChart3, Calendar, ArrowUpRight, Sun, Moon, CheckSquare, Award, Zap, Compass, X, Clock, BookOpen as BookIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function ProgressPage() {
  // State for time period filter and event popup
  const [timePeriod, setTimePeriod] = useState("monthly")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Only render client-side components after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Example learning events data - would come from API in real app
  // Define weekly events first
  const weeklyEvents = [
    { day: 9, month: "Aug", title: "React Components", hours: 1.2, lessons: 3, notes: "Completed lessons on component lifecycle and hooks", category: "React Fundamentals" },
    { day: 10, month: "Aug", title: "React State Management", hours: 0.8, lessons: 2, notes: "Learned about Context API and useReducer", category: "React Fundamentals" },
    { day: 11, month: "Aug", title: "CSS Grid Layout", hours: 1.5, lessons: 4, notes: "Practiced creating responsive grid layouts", category: "CSS Animations" },
    { day: 12, month: "Aug", title: "Node.js Routing", hours: 2.3, lessons: 3, notes: "Built Express routes for REST API", category: "Node.js Backend" },
    { day: 13, month: "Aug", title: "User Authentication", hours: 1.8, lessons: 2, notes: "Implemented JWT token-based auth flow", category: "Node.js Backend" },
    { day: 14, month: "Aug", title: "Design Systems", hours: 1.0, lessons: 2, notes: "Studied component design principles", category: "UI/UX Design" },
    { day: 15, month: "Aug", title: "JavaScript Promises", hours: 2.5, lessons: 3, notes: "Deep dive into async/await patterns", category: "Advanced JavaScript" },
  ]
  
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
    { day: 15, month: "Jul", title: "Programming Basics", hours: 1.5, lessons: 4, notes: "Variables, loops and functions", category: "Advanced JavaScript" },
    { day: 18, month: "Jul", title: "HTML Fundamentals", hours: 2.0, lessons: 5, notes: "Semantic HTML and accessibility", category: "UI/UX Design" },
    { day: 22, month: "Jul", title: "CSS Basics", hours: 1.8, lessons: 4, notes: "Selectors and layouts", category: "CSS Animations" },
    { day: 25, month: "Jul", title: "JavaScript DOM", hours: 2.5, lessons: 6, notes: "DOM manipulation and events", category: "Advanced JavaScript" },
    { day: 28, month: "Jul", title: "HTTP & APIs", hours: 1.2, lessons: 3, notes: "RESTful services and fetch API", category: "Node.js Backend" },
  ]
  
  // Combine events for different views
  const learningEvents = {
    weekly: weeklyEvents,
    monthly: [...earlyAugustEvents, ...weeklyEvents, ...futureEvents],
    allTime: [...julyEvents, ...earlyAugustEvents, ...weeklyEvents, ...futureEvents]
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
                    {timePeriod === "weekly" ? "11.1" : timePeriod === "monthly" ? "42" : "78.5"} hrs
                  </p>
                  <p className="text-sm text-muted-foreground">Total Learning Time</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>
                  {timePeriod === "weekly" ? "8" : timePeriod === "monthly" ? "12" : "15"}% increase from {timePeriod === "weekly" ? "last week" : timePeriod === "monthly" ? "last month" : "last quarter"}
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
                    {timePeriod === "weekly" ? "2" : timePeriod === "monthly" ? "8" : "15"}
                  </p>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>{timePeriod === "weekly" ? "1" : timePeriod === "monthly" ? "2" : "4"} more than {timePeriod === "weekly" ? "last week" : timePeriod === "monthly" ? "last month" : "last quarter"}</span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {timePeriod === "weekly" ? "17" : timePeriod === "monthly" ? "32" : "56"}
                  </p>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>{timePeriod === "weekly" ? "4" : timePeriod === "monthly" ? "8" : "14"} more than {timePeriod === "weekly" ? "last week" : timePeriod === "monthly" ? "last month" : "last quarter"}</span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {timePeriod === "weekly" ? "4.9" : timePeriod === "monthly" ? "4.8" : "4.7"}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Rating Given</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>{timePeriod === "weekly" ? "0.3" : timePeriod === "monthly" ? "0.2" : "0.1"} higher than {timePeriod === "weekly" ? "last week" : timePeriod === "monthly" ? "last month" : "last quarter"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Activity Calendar */}
        <section className="mb-10 p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Learning Activity</h2>
          <div className="flex items-center mb-6">
            <div className="flex items-center text-sm mr-4">
              <span className="w-3 h-3 inline-block bg-primary rounded-full mr-1"></span>
              <span className="text-muted-foreground">Hours Studied</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-3 h-3 inline-block bg-green-500 rounded-full mr-1"></span>
              <span className="text-muted-foreground">Completed Lessons</span>
            </div>
          </div>
          
          {/* Weekly View */}
          {timePeriod === "weekly" && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">August 9-15, 2025</div>
              
              {/* Weekly timeline view */}
              <div className="space-y-3">
                {learningEvents.weekly.map((event, index) => (
                  <div 
                    key={index}
                    onClick={() => isMounted && setSelectedEvent(event)}
                    className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
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
            </div>
          )}
          
          {/* Monthly View */}
          {timePeriod === "monthly" && (
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">August 2025</div>
              
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
                  {/* Empty spaces for start of month */}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={`empty-start-${i}`} className="h-20 rounded-md"></div>
                  ))}
                  
                  {/* Calendar days */}
                  {Array.from({ length: 31 }).map((_, index) => {
                    const day = index + 1;
                    const isCurrentDay = day === 15;
                    const isPastDay = day <= 15;
                    
                    // Find events for this day
                    const dayEvents = learningEvents.monthly.filter(event => event.day === day && event.month === "Aug");
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
                              onClick={() => isMounted && setSelectedEvent(event)}
                              className={`text-xs mt-0.5 px-1 py-0.5 rounded truncate cursor-pointer 
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
                  })}
                </div>
              </div>
              
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
            </div>
          )}
          
          {/* All Time View */}
          {timePeriod === "allTime" && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">July - August 2025</div>
              
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
                    month: "Jul", 
                    data: [
                      { week: "Week 1", hours: 4.5, color: "from-blue-500 to-blue-600", lessons: 8 },
                      { week: "Week 2", hours: 6.2, color: "from-indigo-500 to-indigo-600", lessons: 12 },
                      { week: "Week 3", hours: 5.8, color: "from-purple-500 to-purple-600", lessons: 10 },
                      { week: "Week 4", hours: 8.0, color: "from-pink-500 to-pink-600", lessons: 14 }
                    ]
                  },
                  {
                    month: "Aug", 
                    data: [
                      { week: "Week 1", hours: 6.8, color: "from-green-500 to-green-600", lessons: 11 },
                      { week: "Week 2", hours: 7.5, color: "from-teal-500 to-teal-600", lessons: 13 },
                      { week: "Week 3", hours: 9.3, color: "from-cyan-500 to-cyan-600", lessons: 16, current: true },
                      { week: "Week 4", hours: 2.5, color: "from-blue-300 to-blue-400", lessons: 4, future: true }
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
                            {/* Tooltip on hover - only rendered on client-side */}
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
              
              {/* All time stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200 dark:border-blue-900/40">
                  <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/50"></div>
                  <div className="relative">
                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-3" />
                    <p className="text-2xl font-bold">42 hours</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Study Time</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-lg overflow-hidden relative bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-200 dark:border-green-900/40">
                  <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/50"></div>
                  <div className="relative">
                    <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400 mb-3" />
                    <p className="text-2xl font-bold">32 lessons</p>
                    <p className="text-sm text-muted-foreground mt-1">Lessons Completed</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-lg overflow-hidden relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200 dark:border-purple-900/40">
                  <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/50"></div>
                  <div className="relative">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-3" />
                    <p className="text-2xl font-bold">18 sessions</p>
                    <p className="text-sm text-muted-foreground mt-1">Study Sessions</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-lg overflow-hidden relative bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-200 dark:border-amber-900/40">
                  <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/50"></div>
                  <div className="relative">
                    <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400 mb-3" />
                    <p className="text-2xl font-bold">7 days</p>
                    <p className="text-sm text-muted-foreground mt-1">Learning Streak</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Event Detail Popup - Only rendered on client-side */}
          {isMounted && selectedEvent && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedEvent.day} {selectedEvent.month}, 2025</p>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="rounded-full p-1 hover:bg-muted transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      selectedEvent.category === "React Fundamentals" ? "bg-blue-500" : 
                      selectedEvent.category === "Node.js Backend" ? "bg-indigo-500" : 
                      selectedEvent.category === "Advanced JavaScript" ? "bg-yellow-500" : 
                      selectedEvent.category === "UI/UX Design" ? "bg-orange-500" : "bg-green-500"
                    }`} />
                    <span>{selectedEvent.category}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pb-4">
                    <div className="p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center text-sm mb-1">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Hours</span>
                      </div>
                      <p className="text-lg font-medium">{selectedEvent.hours}</p>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center text-sm mb-1">
                        <BookIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Lessons</span>
                      </div>
                      <p className="text-lg font-medium">{selectedEvent.lessons}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">{selectedEvent.notes}</p>
                  </div>
                  
                  {selectedEvent.planned ? (
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" className="mr-2" onClick={() => setSelectedEvent(null)}>Cancel</Button>
                      <Button onClick={() => setSelectedEvent(null)}>Start Learning</Button>
                    </div>
                  ) : (
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Early Bird", desc: "Complete 5 lessons before 9am", color: "bg-gradient-to-br from-yellow-400 to-orange-500", icon: <Sun className="h-6 w-6" /> },
              { name: "Night Owl", desc: "Study for 2 hours after 10pm", color: "bg-gradient-to-br from-indigo-500 to-blue-600", icon: <Moon className="h-6 w-6" /> },
              { name: "Consistent", desc: "Study for 7 days in a row", color: "bg-gradient-to-br from-green-400 to-teal-500", icon: <Calendar className="h-6 w-6" /> },
              { name: "Perfectionist", desc: "Score 100% on 3 quizzes", color: "bg-gradient-to-br from-purple-400 to-pink-500", icon: <Award className="h-6 w-6" /> },
              { name: "Speed Demon", desc: "Complete a course in record time", color: "bg-gradient-to-br from-red-400 to-pink-600", icon: <Zap className="h-6 w-6" /> },
              { name: "Explorer", desc: "Try courses from 5 categories", color: "bg-gradient-to-br from-blue-400 to-emerald-500", icon: <Compass className="h-6 w-6" /> },
            ].map((badge, index) => (
              <div key={index} className={`${index > 3 ? 'opacity-30' : ''} rounded-lg p-4 flex flex-col items-center justify-center text-center ${badge.color} text-white aspect-square hover:shadow-lg transition-shadow`}>
                <div className="mb-2">{badge.icon}</div>
                <h3 className="font-medium text-sm mb-1">{badge.name}</h3>
                <p className="text-xs opacity-90">{badge.desc}</p>
                {index <= 3 && (
                  <span className="mt-2 px-2 py-0.5 bg-white/20 rounded-full text-[10px]">Earned</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Learning Goals */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Your Learning Goals</h2>
            <Button>Set New Goal</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-foreground">Complete React Course</h3>
                  <p className="text-sm text-muted-foreground mt-1">Finish all lessons by August 25</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary font-medium">75% complete</span>
                <span className="text-muted-foreground">10 days left</span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-foreground">Study 2 hours daily</h3>
                  <p className="text-sm text-muted-foreground mt-1">Maintain consistent study schedule</p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">12 of 30 days</span>
                <span className="text-muted-foreground">18 days left</span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-foreground">Complete 5 Courses</h3>
                  <p className="text-sm text-muted-foreground mt-1">By the end of this quarter</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600 dark:text-green-400 font-medium">2 of 5 courses</span>
                <span className="text-muted-foreground">45 days left</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

import { UserButton } from "@clerk/nextjs"
import { BookOpen, BarChart3, Calendar, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProgressPage() {
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
            <Button variant="outline" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Weekly
            </Button>
            <Button variant="outline" className="flex items-center bg-primary text-primary-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Monthly
            </Button>
            <Button variant="outline" className="flex items-center">
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
                  <p className="text-2xl font-bold text-foreground">42 hrs</p>
                  <p className="text-sm text-muted-foreground">Total Learning Time</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12% increase from last month</span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>2 more than last month</span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">32</p>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>8 more than last month</span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg. Rating Given</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>0.2 higher than last month</span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Time Chart */}
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
          <div className="h-64">
            {/* Simulated Chart - Would be replaced with a real chart component */}
            <div className="w-full h-full flex items-end">
              {Array.from({ length: 30 }).map((_, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end">
                  <div className="flex flex-col items-center mb-1">
                    <div className="w-full max-w-[10px] bg-primary rounded-t h-[20px]" style={{ 
                      height: `${Math.floor(Math.random() * 80) + 20}px`,
                      opacity: index > 23 ? 0.5 : 1,
                    }}></div>
                    <div className="w-full max-w-[10px] bg-green-500 rounded-t h-[20px] mt-0.5" style={{ 
                      height: `${Math.floor(Math.random() * 60) + 10}px`,
                      opacity: index > 23 ? 0.5 : 1,
                    }}></div>
                  </div>
                  {index % 5 === 0 && (
                    <span className="text-xs text-muted-foreground mt-1">{index + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-muted-foreground">Days of the Month</span>
          </div>
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
              { name: "Early Bird", desc: "Complete 5 lessons before 9am", color: "bg-gradient-to-br from-yellow-400 to-orange-500", icon: "☀️" },
              { name: "Night Owl", desc: "Study for 2 hours after 10pm", color: "bg-gradient-to-br from-indigo-500 to-blue-600", icon: "🌙" },
              { name: "Consistent", desc: "Study for 7 days in a row", color: "bg-gradient-to-br from-green-400 to-teal-500", icon: "📆" },
              { name: "Perfectionist", desc: "Score 100% on 3 quizzes", color: "bg-gradient-to-br from-purple-400 to-pink-500", icon: "🏆" },
              { name: "Speed Demon", desc: "Complete a course in record time", color: "bg-gradient-to-br from-red-400 to-pink-600", icon: "⚡" },
              { name: "Explorer", desc: "Try courses from 5 categories", color: "bg-gradient-to-br from-blue-400 to-emerald-500", icon: "🧭" },
            ].map((badge, index) => (
              <div key={index} className={`${index > 3 ? 'opacity-30' : ''} rounded-lg p-4 flex flex-col items-center justify-center text-center ${badge.color} text-white aspect-square hover:shadow-lg transition-shadow`}>
                <span className="text-2xl mb-2">{badge.icon}</span>
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

import { UserButton } from "@clerk/nextjs"
import { BookOpen, Bookmark, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
            <div className="flex items-center space-x-4">
              <select className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="recent">Recently Updated</option>
                <option value="a-z">A-Z</option>
                <option value="completion">Completion %</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Card - In Progress */}
            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <span className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">In Progress</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">React Fundamentals</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Master the basics of React and build modern web applications with hooks, context, and more.
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>3h left</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>75% complete</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1">Continue</Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Course Card - Completed */}
            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-green-500 to-teal-600 relative">
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">Completed</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">HTML & CSS Mastery</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Learn modern HTML5 and CSS3 techniques for building responsive and beautiful websites.
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>100% complete</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-green-600 dark:bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">Review</Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Card - In Progress */}
            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-orange-500 to-red-600 relative">
                <span className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">In Progress</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">UI/UX Design</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Learn design principles and create beautiful user interfaces that deliver exceptional user experiences.
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>12h left</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>20% complete</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1">Continue</Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Card - In Progress */}
            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-indigo-500 to-blue-600 relative">
                <span className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">In Progress</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Node.js Backend</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Build scalable backend applications with Node.js and Express. Learn RESTful API design and implementation.
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>8h left</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>45% complete</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1">Continue</Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

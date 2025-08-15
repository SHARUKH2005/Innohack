import { UserButton } from "@clerk/nextjs"
import { BookOpen, Users, BarChart3, Trophy, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Learnify</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              My Courses
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Browse
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Progress
            </a>
          </nav>

          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Welcome to your Learning Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master new skills, track your progress, and achieve your learning goals with our comprehensive platform.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">42h</p>
                  <p className="text-sm text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Browse Courses</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Discover new courses and expand your skillset with our curated content.
              </p>
              <Button className="w-full">Explore Courses</Button>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">View Progress</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Track your learning progress and see how far you&apos;ve come.
              </p>
              <Button variant="outline" className="w-full">Check Progress</Button>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Join Community</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Connect with fellow learners and share your knowledge.
              </p>
              <Button variant="secondary" className="w-full">Join Now</Button>
            </div>
          </div>
        </section>

        {/* Continue Learning Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Course Cards */}
            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">React Fundamentals</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Master the basics of React and build modern web applications.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Progress: 75%</span>
                  <span className="text-sm text-muted-foreground">3h left</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <Button className="w-full">Continue Learning</Button>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-green-500 to-teal-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Node.js Backend</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Build scalable backend applications with Node.js and Express.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Progress: 45%</span>
                  <span className="text-sm text-muted-foreground">8h left</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <Button className="w-full">Continue Learning</Button>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-orange-500 to-red-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">UI/UX Design</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Learn design principles and create beautiful user interfaces.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Progress: 20%</span>
                  <span className="text-sm text-muted-foreground">12h left</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <Button className="w-full">Continue Learning</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

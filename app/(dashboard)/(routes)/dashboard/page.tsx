import { UserButton } from "@clerk/nextjs";
import { Bell, BookOpen, Compass, Laptop, Users, BarChart3, Trophy, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CourseCard } from "@/components/shared/course-card";

// This is a copy of the main dashboard page, but at a different route
export default function DashboardPage() {
  return (
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
              <Link href="/browse">
                <Button className="w-full">Explore Courses</Button>
              </Link>
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
              <Link href="/progress">
                <Button variant="outline" className="w-full">Check Progress</Button>
              </Link>
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
              <Link href="/community">
                <Button variant="secondary" className="w-full">Join Now</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Continue Learning Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Continue Learning</h2>
            <Link href="/courses">
              <Button variant="outline" size="sm">
                View all courses
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              id="react-fundamentals"
              title="React Fundamentals"
              description="Master the basics of React and build modern web applications with hooks, context, and more."
              progress={75}
              hoursLeft={3}
              gradient="from-blue-500 to-purple-600"
              statusLabel="In Progress"
            />
            
            <CourseCard
              id="nodejs-backend"
              title="Node.js Backend"
              description="Build scalable backend applications with Node.js and Express. Learn RESTful API design and implementation."
              progress={45}
              hoursLeft={8}
              gradient="from-green-500 to-teal-600"
              statusLabel="In Progress"
            />
            
            <CourseCard
              id="uiux-design"
              title="UI/UX Design"
              description="Learn design principles and create beautiful user interfaces that deliver exceptional user experiences."
              progress={20}
              hoursLeft={12}
              gradient="from-orange-500 to-red-600"
              statusLabel="New"
            />
          </div>
        </section>
      </main>
  )
}

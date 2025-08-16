"use client";

import { UserButton } from "@clerk/nextjs"
import { BookOpen, Bookmark, Clock, CheckCircle, Search, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { useFavorites } from "@/lib/hooks/use-favorites"
import { CourseCard } from "@/components/shared/course-card"
import { useDebounce } from "@/lib/hooks/use-debounce"

// Import modals with dynamic import to avoid hydration issues
const InProgressCourseModal = dynamic(
  () => import("@/components/shared/in-progress-course-modal").then(mod => ({ default: mod.InProgressCourseModal })),
  { ssr: false }
)

const CompletedCourseModal = dynamic(
  () => import("@/components/shared/completed-course-modal").then(mod => ({ default: mod.CompletedCourseModal })),
  { ssr: false }
)

// Define course types
type CourseStatus = 'in-progress' | 'completed';
type SortOption = 'recent' | 'a-z' | 'completion';

// Mock course data
const inProgressCourses = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Master the basics of React and build modern web applications with hooks, context, and more.",
    categoryLabel: "Programming",
    hoursLeft: 3,
    completionPercentage: 75,
    lessonsCompleted: 24,
    totalLessons: 32,
    totalHours: 12,
    rating: 4.8,
    gradient: "from-blue-500 to-purple-600",
    featured: "bestseller",
    skillLevel: "intermediate",
    lastLesson: "Advanced Component Patterns",
    lastActivity: "August 10, 2025"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Learn design principles and create beautiful user interfaces that deliver exceptional user experiences.",
    categoryLabel: "Design",
    hoursLeft: 12,
    completionPercentage: 20,
    lessonsCompleted: 8,
    totalLessons: 40,
    totalHours: 15,
    rating: 4.7,
    gradient: "from-orange-500 to-red-600",
    featured: null,
    skillLevel: "beginner",
    lastLesson: "Introduction to User Research",
    lastActivity: "August 8, 2025"
  },
  {
    id: "node-backend",
    title: "Node.js Backend",
    description: "Build scalable backend applications with Node.js and Express. Learn RESTful API design and implementation.",
    categoryLabel: "IT & Software",
    hoursLeft: 8,
    completionPercentage: 45,
    lessonsCompleted: 15,
    totalLessons: 32,
    totalHours: 14,
    rating: 4.6,
    gradient: "from-indigo-500 to-blue-600",
    featured: "new",
    skillLevel: "intermediate",
    lastLesson: "Building RESTful APIs",
    lastActivity: "August 12, 2025"
  }
];

const completedCourses = [
  {
    id: "html-css-mastery",
    title: "HTML & CSS Mastery",
    description: "Learn modern HTML5 and CSS3 techniques for building responsive and beautiful websites.",
    categoryLabel: "Web Development",
    totalHours: 10,
    completionDate: "July 15, 2025",
    rating: 4.9,
    gradient: "from-green-500 to-teal-600",
    featured: null,
    skillLevel: "beginner",
    certificateId: "CERT-2025-07-12345"
  },
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    description: "A comprehensive introduction to JavaScript fundamentals, including variables, functions, and DOM manipulation.",
    categoryLabel: "Programming",
    totalHours: 8,
    completionDate: "June 22, 2025",
    rating: 4.7,
    gradient: "from-yellow-500 to-orange-500",
    featured: "top-rated",
    skillLevel: "beginner",
    certificateId: "CERT-2025-06-67890"
  }
];

// Get unique categories from all courses
const allCategories = Array.from(
  new Set([
    ...inProgressCourses.map(course => course.categoryLabel),
    ...completedCourses.map(course => course.categoryLabel)
  ])
);

// Get unique skill levels from all courses
const allSkillLevels = Array.from(
  new Set([
    ...inProgressCourses.map(course => course.skillLevel),
    ...completedCourses.map(course => course.skillLevel)
  ])
);

export default function CoursesPage() {
  // State for filters and sorting
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [skillLevelFilter, setSkillLevelFilter] = useState<string>('');
  
  // Debounce search query to prevent excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // State for selected course modals
  const [selectedInProgressCourse, setSelectedInProgressCourse] = useState<string | null>(null);
  const [selectedCompletedCourse, setSelectedCompletedCourse] = useState<string | null>(null);
  
  // Get the selected in-progress course details
  const selectedInProgressCourseDetails = inProgressCourses.find(course => course.id === selectedInProgressCourse);
  
  // Get the selected completed course details
  const selectedCompletedCourseDetails = completedCourses.find(course => course.id === selectedCompletedCourse);

  // Filter courses based on all filters
  const filteredCourses = useMemo(() => {
    // First filter by status
    let result = statusFilter === 'all' 
      ? [...inProgressCourses, ...completedCourses] 
      : statusFilter === 'in-progress' 
        ? inProgressCourses 
        : completedCourses;
    
    // Then apply category filter if selected
    if (categoryFilter) {
      result = result.filter(course => course.categoryLabel === categoryFilter);
    }
    
    // Apply skill level filter if selected
    if (skillLevelFilter) {
      result = result.filter(course => course.skillLevel === skillLevelFilter);
    }
    
    // Apply search filter if there is a query
    if (debouncedSearchQuery) {
      const lowercaseQuery = debouncedSearchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(lowercaseQuery) || 
        course.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply sorting
    if (sortBy === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'completion') {
      // For completed courses, completion is always 100%
      result.sort((a, b) => {
        const aCompletion = 'completionPercentage' in a ? a.completionPercentage : 100;
        const bCompletion = 'completionPercentage' in b ? b.completionPercentage : 100;
        return bCompletion - aCompletion; // Sort by completion percentage (descending)
      });
    } else if (sortBy === 'recent') {
      // Sort by lastActivity or completionDate
      result.sort((a, b) => {
        const aDate = 'lastActivity' in a ? new Date(a.lastActivity) : 
                      'completionDate' in a ? new Date(a.completionDate) : new Date(0);
        const bDate = 'lastActivity' in b ? new Date(b.lastActivity) : 
                      'completionDate' in b ? new Date(b.completionDate) : new Date(0);
        return bDate.getTime() - aDate.getTime(); // Most recent first
      });
    }
    
    return result;
  }, [statusFilter, categoryFilter, skillLevelFilter, debouncedSearchQuery, sortBy]);
  
  // Clear all filters function
  const clearFilters = () => {
    setStatusFilter('all');
    setCategoryFilter('');
    setSkillLevelFilter('');
    setSearchQuery('');
    setSortBy('recent');
  };
      
  return (
    <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-foreground">Courses</h1>
            <form className="flex items-center w-full md:w-auto max-w-md">
              <div className="relative w-full">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${debouncedSearchQuery ? 'text-primary' : 'text-muted-foreground'}`} />
                <input 
                  type="text" 
                  placeholder="Search your courses..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border ${debouncedSearchQuery ? 'border-primary' : 'border-border'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200`}
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'in-progress' | 'completed')}
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={skillLevelFilter}
                onChange={(e) => setSkillLevelFilter(e.target.value)}
              >
                <option value="">All Skill Levels</option>
                {allSkillLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="recent">Recently Updated</option>
                <option value="a-z">A-Z</option>
                <option value="completion">Completion %</option>
              </select>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => {
              // Check if it's an in-progress or completed course
              const isInProgress = 'completionPercentage' in course;
              
              if (isInProgress) {
                return (
                  <div key={course.id} onClick={() => setSelectedInProgressCourse(course.id)} className="cursor-pointer">
                    <CourseCard
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      progress={(course as typeof inProgressCourses[0]).completionPercentage}
                      hoursLeft={(course as typeof inProgressCourses[0]).hoursLeft}
                      gradient={course.gradient}
                      href={`/courses/${course.id}`}
                      statusLabel="In Progress"
                      statusColor="bg-yellow-500 text-yellow-900"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={course.id} onClick={() => setSelectedCompletedCourse(course.id)} className="cursor-pointer">
                    <CourseCard
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      progress={100}
                      hoursLeft={0}
                      gradient={course.gradient}
                      href={`/courses/${course.id}`}
                      statusLabel="Completed"
                      statusColor="bg-green-600 text-white"
                    />
                  </div>
                );
              }
            })}
          </div>
          
          {/* Course status */}
          <div className="mb-4 border-t border-border pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {debouncedSearchQuery
                  ? `Search Results${categoryFilter ? ` in ${categoryFilter}` : ''}`
                  : categoryFilter
                    ? `${categoryFilter} Courses`
                    : statusFilter === 'all'
                      ? 'All Courses'
                      : statusFilter === 'in-progress'
                        ? 'In Progress Courses'
                        : 'Completed Courses'
                }
              </h2>
              {debouncedSearchQuery && (
                <span className="text-sm text-muted-foreground">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'result' : 'results'} for &ldquo;{debouncedSearchQuery}&rdquo;
                </span>
              )}
            </div>
          </div>
          
          {/* No courses message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {debouncedSearchQuery 
                  ? `No courses found matching "${debouncedSearchQuery}". Try different search terms.`
                  : categoryFilter
                    ? `No ${statusFilter !== 'all' ? statusFilter + ' ' : ''}courses found in ${categoryFilter}.`
                    : statusFilter === 'in-progress'
                      ? "You don't have any courses in progress. Browse our catalog to start learning!"
                      : statusFilter === 'completed'
                        ? "You haven't completed any courses yet. Keep learning!"
                        : "No courses found with the current filters."
                }
              </p>
              <Button className="mt-6" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </section>
        
        {/* In Progress Course Modal */}
        {selectedInProgressCourseDetails && (
          <InProgressCourseModal
            id={selectedInProgressCourseDetails.id}
            title={selectedInProgressCourseDetails.title}
            description={selectedInProgressCourseDetails.description}
            categoryLabel={selectedInProgressCourseDetails.categoryLabel}
            totalHours={selectedInProgressCourseDetails.totalHours}
            hoursLeft={selectedInProgressCourseDetails.hoursLeft}
            completionPercentage={selectedInProgressCourseDetails.completionPercentage}
            lessonsCompleted={selectedInProgressCourseDetails.lessonsCompleted}
            totalLessons={selectedInProgressCourseDetails.totalLessons}
            rating={selectedInProgressCourseDetails.rating}
            gradient={selectedInProgressCourseDetails.gradient}
            featured={selectedInProgressCourseDetails.featured}
            skillLevel={selectedInProgressCourseDetails.skillLevel}
            lastLesson={selectedInProgressCourseDetails.lastLesson}
            lastActivity={selectedInProgressCourseDetails.lastActivity}
            isOpen={!!selectedInProgressCourse}
            onClose={() => setSelectedInProgressCourse(null)}
          />
        )}
        
        {/* Completed Course Modal */}
        {selectedCompletedCourseDetails && (
          <CompletedCourseModal
            id={selectedCompletedCourseDetails.id}
            title={selectedCompletedCourseDetails.title}
            description={selectedCompletedCourseDetails.description}
            categoryLabel={selectedCompletedCourseDetails.categoryLabel}
            totalHours={selectedCompletedCourseDetails.totalHours}
            completionDate={selectedCompletedCourseDetails.completionDate}
            rating={selectedCompletedCourseDetails.rating}
            gradient={selectedCompletedCourseDetails.gradient}
            featured={selectedCompletedCourseDetails.featured}
            skillLevel={selectedCompletedCourseDetails.skillLevel}
            certificateId={selectedCompletedCourseDetails.certificateId}
            isOpen={!!selectedCompletedCourse}
            onClose={() => setSelectedCompletedCourse(null)}
          />
        )}
      </main>
  )
}

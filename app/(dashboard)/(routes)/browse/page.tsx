import { UserButton } from "@clerk/nextjs"
import { BookOpen, Search, Filter, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BrowsePage() {
  return (
    <div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-foreground">Browse Courses</h1>
            <div className="flex items-center w-full md:w-auto max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-l-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button className="rounded-l-none">Search</Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <select className="bg-transparent focus:outline-none text-sm">
                <option value="">All Categories</option>
                <option value="development">Web Development</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="data-science">Data Science</option>
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select className="bg-transparent focus:outline-none text-sm">
                <option value="">Skill Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select className="bg-transparent focus:outline-none text-sm">
                <option value="">Duration</option>
                <option value="short">0-3 hours</option>
                <option value="medium">3-10 hours</option>
                <option value="long">10+ hours</option>
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select className="bg-transparent focus:outline-none text-sm">
                <option value="">Sort By</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="highest-rated">Highest Rated</option>
              </select>
            </div>
            
            <Button variant="outline" size="sm" className="ml-auto">Clear Filters</Button>
          </div>

          {/* Popular Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-sm font-medium">Programming</span>
              <span className="text-xs opacity-75 mt-1">126 courses</span>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg p-4 text-white flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Design</span>
              <span className="text-xs opacity-75 mt-1">98 courses</span>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-4 text-white flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">Business</span>
              <span className="text-xs opacity-75 mt-1">72 courses</span>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg p-4 text-white flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <span className="text-sm font-medium">Marketing</span>
              <span className="text-xs opacity-75 mt-1">64 courses</span>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg p-4 text-white flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">IT & Software</span>
              <span className="text-xs opacity-75 mt-1">113 courses</span>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg p-4 text-white flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-sm font-medium">Science</span>
              <span className="text-xs opacity-75 mt-1">58 courses</span>
            </div>
          </div>

          {/* Course Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-40 ${
                  index % 6 === 0 ? "bg-gradient-to-br from-blue-500 to-purple-600" :
                  index % 6 === 1 ? "bg-gradient-to-br from-pink-500 to-red-500" :
                  index % 6 === 2 ? "bg-gradient-to-br from-green-500 to-teal-500" :
                  index % 6 === 3 ? "bg-gradient-to-br from-yellow-500 to-orange-500" :
                  index % 6 === 4 ? "bg-gradient-to-br from-indigo-500 to-blue-600" :
                  "bg-gradient-to-br from-purple-500 to-violet-600"
                } relative`}>
                  <span className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {index % 3 === 0 ? "Bestseller" : index % 3 === 1 ? "New" : "Popular"}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {index % 6 === 0 ? "Web Development" :
                        index % 6 === 1 ? "Design" :
                        index % 6 === 2 ? "Business" :
                        index % 6 === 3 ? "Marketing" :
                        index % 6 === 4 ? "IT & Software" :
                        "Data Science"}
                    </span>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-1">{(4 + (index % 10) / 10).toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {[
                      "Advanced React and Redux",
                      "UI/UX Design Fundamentals",
                      "Digital Marketing Strategy",
                      "Full-Stack JavaScript Development",
                      "Python for Data Science",
                      "Machine Learning Essentials"
                    ][index % 6]}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {[
                      "Master advanced React patterns and Redux state management for building complex applications.",
                      "Learn design principles and create beautiful user interfaces that deliver exceptional experiences.",
                      "Develop comprehensive digital marketing strategies to grow your business online.",
                      "Build complete web applications using JavaScript, Node.js, and modern frameworks.",
                      "Use Python for data analysis, visualization, and building machine learning models.",
                      "Understanding machine learning algorithms and implementing them in real-world projects."
                    ][index % 6]}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{[12, 8, 15, 20, 10, 18][index % 6]}h total</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className={index % 3 === 0 ? "text-foreground font-semibold" : "text-muted-foreground line-through mr-2"}>
                        ${[129, 89, 149, 199, 119, 159][index % 6]}
                      </span>
                      {index % 3 === 0 && (
                        <span className="ml-2 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-md">
                          30% off
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="flex-1">View Course</Button>
                    <Button variant="outline" size="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center mt-10">
            <nav className="flex items-center">
              <Button variant="outline" size="sm" className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="mr-1 bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" size="sm" className="mr-1">2</Button>
              <Button variant="outline" size="sm" className="mr-1">3</Button>
              <span className="mx-1 text-muted-foreground">...</span>
              <Button variant="outline" size="sm" className="mr-1">12</Button>
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </nav>
          </div>
        </section>
      </main>
    </div>
  )
}

"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/shared/category-card";
import { BrowseCourseCard } from "@/components/shared/browse-course-card";
import { categories, courses, FilterOptions, filterAndPaginateCourses } from "@/lib/data";
import { useFavorites } from "@/lib/hooks/use-favorites";

export default function BrowsePage() {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  // Items per page
  const ITEMS_PER_PAGE = 6;
  
  // Get courses based on filters
  const [filteredCourses, setFilteredCourses] = useState<typeof courses>([]);
  
  // Use favorites hook
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  
  // Apply filters
  useEffect(() => {
    const result = filterAndPaginateCourses({
      category: selectedCategory,
      skillLevel,
      duration,
      sortBy,
      searchQuery,
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE
    });
    
    setFilteredCourses(result.courses);
    setTotalPages(result.pagination.totalPages);
    
    // Reset to page 1 when filters change
    if (currentPage !== 1 && result.pagination.totalPages < currentPage) {
      setCurrentPage(1);
    }
  }, [selectedCategory, skillLevel, duration, sortBy, searchQuery, currentPage]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset to page 1 when searching
    setCurrentPage(1);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('');
    setSkillLevel('');
    setDuration('');
    setSortBy('');
    setSearchQuery('');
    setCurrentPage(1);
  };
  
  // Handle category click
  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(prevCategory => prevCategory === slug ? '' : slug);
    setCurrentPage(1);
  };
  
  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-foreground">Browse Courses</h1>
            <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-l-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button type="submit" className="rounded-l-none">Search</Button>
            </form>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={skillLevel}
                onChange={(e) => {
                  setSkillLevel(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Skill Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Duration</option>
                <option value="short">0-3 hours</option>
                <option value="medium">3-10 hours</option>
                <option value="long">10+ hours</option>
              </select>
            </div>
            
            <div className="flex items-center bg-background border border-border rounded-md px-3 py-2">
              <select 
                className="bg-transparent focus:outline-none text-sm"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Sort By</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
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

          {/* Popular Categories - Horizontally Scrollable */}
          <div className="relative mb-6">
            {/* Left fade gradient for scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
            
            <div className="overflow-x-auto py-2 pb-4 hide-scrollbar">
              <div className="flex gap-3 min-w-min pl-8 pr-10">
                {categories.map((category) => (
                  <div key={category.slug} className="w-[130px] flex-shrink-0">
                    <CategoryCard
                      name={category.name}
                      count={category.count}
                      gradient={category.gradient}
                      icon={category.icon}
                      isSelected={selectedCategory === category.slug}
                      onClick={() => handleCategoryClick(category.slug)}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right fade gradient for scroll indication */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Course Listings - Title */}
          <div className="pt-2 border-t border-border mb-6">
            <h2 className="text-xl font-semibold mt-4">
              {selectedCategory 
                ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Selected'} Courses` 
                : 'Featured Courses'}
            </h2>
          </div>

          {/* Course Listings */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                // Find the category object for this course
                const categoryObj = categories.find(cat => cat.slug === course.category);
                
                return (
                  <BrowseCourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    category={course.category}
                    categoryLabel={categoryObj?.name || ''}
                    totalHours={course.totalHours}
                    rating={course.rating}
                    price={course.price}
                    discountedPrice={course.discountedPrice}
                    gradient={course.gradient}
                    featured={course.featured}
                    onFavoriteToggle={toggleFavorite}
                    initialFavorited={isFavorite(course.id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                {selectedCategory ? 
                  `No courses found for ${categories.find(c => c.slug === selectedCategory)?.name}. Try another category.` :
                  'Try adjusting your filters or search terms'}
              </p>
              <Button onClick={clearFilters} className="mt-4">Clear All Filters</Button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-10">
              <nav className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-1"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* First page */}
                {currentPage > 3 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-1" 
                    onClick={() => goToPage(1)}
                  >
                    1
                  </Button>
                )}
                
                {/* Ellipsis for skipped pages */}
                {currentPage > 4 && (
                  <span className="mx-1 text-muted-foreground">...</span>
                )}
                
                {/* Pages before current page */}
                {currentPage > 2 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-1" 
                    onClick={() => goToPage(currentPage - 2)}
                  >
                    {currentPage - 2}
                  </Button>
                )}
                
                {currentPage > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-1" 
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </Button>
                )}
                
                {/* Current page */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-1 bg-primary text-primary-foreground"
                >
                  {currentPage}
                </Button>
                
                {/* Pages after current page */}
                {currentPage < totalPages && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-1" 
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </Button>
                )}
                
                {currentPage < totalPages - 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-1" 
                    onClick={() => goToPage(currentPage + 2)}
                  >
                    {currentPage + 2}
                  </Button>
                )}
                
                {/* Ellipsis for skipped pages */}
                {currentPage < totalPages - 3 && (
                  <span className="mx-1 text-muted-foreground">...</span>
                )}
                
                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-1" 
                    onClick={() => goToPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

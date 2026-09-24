"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/shared/category-card";
import { BrowseCourseCard } from "@/components/shared/browse-course-card";
import { categories as staticCategories, FilterOptions, filterAndPaginateCourses } from "@/lib/data";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { getCategories, getCourses } from "@/lib/actions/courses";

export default function BrowsePage() {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  
  // Debounce search query to prevent excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Items per page
  const ITEMS_PER_PAGE = 6;
  
  // Get courses based on filters
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>(staticCategories);
  const [loading, setLoading] = useState(true);
  
  // Use favorites hook
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // Load categories
  useEffect(() => {
    async function loadCats() {
      const cats = await getCategories();
      if (cats && cats.length > 0) {
        // preserve the icon and gradient from static since DB might not have the right UI yet
        // or just use DB as is
        setDbCategories(cats);
      }
    }
    loadCats();
  }, []);
  
  // Apply filters
  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      // Wait for debounce
      
      const categoryObj = dbCategories.find(c => c.slug === selectedCategory);
      const categoryId = categoryObj?.id;
      
      const realCourses = await getCourses({
        title: debouncedSearchQuery,
        categoryId: categoryId,
      });

      // Simple client side filter for skill and duration for now
      let results = realCourses;
      
      if (skillLevel) {
        results = results.filter((c: any) => c.difficulty.toLowerCase() === skillLevel.toLowerCase());
      }
      
      // Pagination
      const total = results.length;
      const pages = Math.ceil(total / ITEMS_PER_PAGE);
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginated = results.slice(start, start + ITEMS_PER_PAGE);
      
      setFilteredCourses(paginated);
      setTotalPages(pages || 1);
      setTotalResults(total);
      setLoading(false);
      
      // Reset to page 1 when filters change and out of bounds
      if (currentPage !== 1 && pages < currentPage && pages > 0) {
        setCurrentPage(1);
      }
    }
    
    fetchCourses();
  }, [selectedCategory, skillLevel, duration, sortBy, debouncedSearchQuery, currentPage, dbCategories]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset to page 1 when searching explicitly via form submit
    setCurrentPage(1);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
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
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${debouncedSearchQuery ? 'text-primary' : 'text-muted-foreground'}`} />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentPage !== 1) setCurrentPage(1); // Reset to first page when typing
                  }}
                  className={`w-full pl-10 pr-10 py-2 border ${debouncedSearchQuery ? 'border-primary' : 'border-border'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200`}
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={clearSearch}
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
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Categories</option>
                {dbCategories.map((cat) => (
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
                {dbCategories.map((category) => (
                  <div key={category.slug} className="w-[130px] flex-shrink-0">
                    <CategoryCard
                      name={category.name}
                      count={category._count?.courses || 0}
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
            <div className="flex items-center justify-between mt-4">
              <h2 className="text-xl font-semibold">
                {debouncedSearchQuery
                  ? `Search Results${selectedCategory ? ` in ${dbCategories.find(c => c.slug === selectedCategory)?.name}` : ''}`
                  : selectedCategory
                    ? `${dbCategories.find(c => c.slug === selectedCategory)?.name || 'Selected'} Courses`
                    : 'Featured Courses'
                }
              </h2>
              {debouncedSearchQuery && (
                <span className="text-sm text-muted-foreground">
                  {totalResults} {totalResults === 1 ? 'result' : 'results'} for &ldquo;{debouncedSearchQuery}&rdquo;
                </span>
              )}
            </div>
          </div>

          {/* Course Listings */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                // Find the category object for this course
                const categoryObj = course.category;
                
                return (
                  <BrowseCourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    category={categoryObj?.slug || course.categoryId}
                    categoryLabel={categoryObj?.name || ''}
                    totalHours={course.totalHours}
                    rating={course.rating}
                    price={course.price}
                    discountedPrice={course.price > 0 ? null : 0} // temp logic for discount
                    gradient={course.gradient}
                    featured={course.featured}
                    skillLevel={course.difficulty.toLowerCase()}
                    searchQuery={debouncedSearchQuery}
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
                  `No courses found for ${dbCategories.find(c => c.slug === selectedCategory)?.name}. Try another category.` :
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

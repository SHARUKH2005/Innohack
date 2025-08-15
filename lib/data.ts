// Course data and categories for the browse page
export const categories = [
  { 
    name: "Programming", 
    slug: "programming", 
    count: 126, 
    icon: "Code",
    gradient: "from-blue-500 to-purple-600" 
  },
  { 
    name: "Design", 
    slug: "design", 
    count: 98, 
    icon: "Image",
    gradient: "from-pink-500 to-red-500" 
  },
  { 
    name: "Business", 
    slug: "business", 
    count: 72, 
    icon: "BarChart3",
    gradient: "from-green-500 to-teal-500" 
  },
  { 
    name: "Marketing", 
    slug: "marketing", 
    count: 64, 
    icon: "PieChart",
    gradient: "from-yellow-500 to-orange-500" 
  },
  { 
    name: "IT & Software", 
    slug: "it-software", 
    count: 113, 
    icon: "Monitor",
    gradient: "from-indigo-500 to-blue-600" 
  },
  { 
    name: "Science", 
    slug: "science", 
    count: 58, 
    icon: "Beaker",
    gradient: "from-purple-500 to-violet-600" 
  },
  { 
    name: "Languages", 
    slug: "languages", 
    count: 45, 
    icon: "Globe",
    gradient: "from-emerald-500 to-green-600" 
  },
  { 
    name: "Health & Fitness", 
    slug: "health-fitness", 
    count: 37, 
    icon: "Heart",
    gradient: "from-red-500 to-rose-600" 
  },
];

export const courses = [
  {
    id: "react-redux",
    title: "Advanced React and Redux",
    description: "Master advanced React patterns and Redux state management for building complex applications.",
    category: "programming",
    skillLevel: "advanced",
    duration: "long", // 0-3h = short, 3-10h = medium, 10h+ = long
    price: 129,
    discountedPrice: 89,
    totalHours: 12,
    rating: 4.8,
    featured: "bestseller",
    gradient: "from-blue-500 to-purple-600",
    popular: true
  },
  {
    id: "yoga-beginners",
    title: "Yoga for Beginners",
    description: "Start your yoga journey with proper techniques and mindful practices for physical and mental wellbeing.",
    category: "health-fitness",
    skillLevel: "beginner",
    duration: "medium",
    price: 69,
    discountedPrice: 49,
    totalHours: 8,
    rating: 4.7,
    featured: "new",
    gradient: "from-red-500 to-rose-600",
    popular: true
  },
  {
    id: "nutrition-fundamentals",
    title: "Nutrition Fundamentals",
    description: "Learn the principles of nutrition and how to create healthy eating habits for optimal health.",
    category: "health-fitness",
    skillLevel: "beginner",
    duration: "short",
    price: 59,
    discountedPrice: null,
    totalHours: 5,
    rating: 4.5,
    featured: null,
    gradient: "from-red-500 to-rose-600",
    popular: false
  },
  {
    id: "ux-design",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles and create beautiful user interfaces that deliver exceptional experiences.",
    category: "design",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: null,
    totalHours: 8,
    rating: 4.5,
    featured: null,
    gradient: "from-pink-500 to-red-500",
    popular: false
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Strategy",
    description: "Develop comprehensive digital marketing strategies to grow your business online.",
    category: "marketing",
    skillLevel: "intermediate",
    duration: "long",
    price: 149,
    discountedPrice: 99,
    totalHours: 15,
    rating: 4.7,
    featured: "popular",
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  {
    id: "fullstack-js",
    title: "Full-Stack JavaScript Development",
    description: "Build complete web applications using JavaScript, Node.js, and modern frameworks.",
    category: "programming",
    skillLevel: "intermediate",
    duration: "long",
    price: 199,
    discountedPrice: 139,
    totalHours: 20,
    rating: 4.9,
    featured: "bestseller",
    gradient: "from-blue-500 to-purple-600",
    popular: true
  },
  {
    id: "python-data",
    title: "Python for Data Science",
    description: "Use Python for data analysis, visualization, and building machine learning models.",
    category: "science",
    skillLevel: "intermediate",
    duration: "medium",
    price: 119,
    discountedPrice: null,
    totalHours: 10,
    rating: 4.6,
    featured: null,
    gradient: "from-purple-500 to-violet-600",
    popular: false
  },
  {
    id: "ml-essentials",
    title: "Machine Learning Essentials",
    description: "Understanding machine learning algorithms and implementing them in real-world projects.",
    category: "science",
    skillLevel: "advanced",
    duration: "long",
    price: 159,
    discountedPrice: null,
    totalHours: 18,
    rating: 4.8,
    featured: "new",
    gradient: "from-purple-500 to-violet-600",
    popular: true
  },
  {
    id: "graphic-design",
    title: "Graphic Design Masterclass",
    description: "Learn professional graphic design techniques for print and digital media.",
    category: "design",
    skillLevel: "beginner",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 9,
    rating: 4.4,
    featured: null,
    gradient: "from-pink-500 to-red-500",
    popular: false
  },
  {
    id: "web-dev-bootcamp",
    title: "Complete Web Development Bootcamp",
    description: "From HTML and CSS to advanced JavaScript frameworks - a complete web development journey.",
    category: "programming",
    skillLevel: "beginner",
    duration: "long",
    price: 179,
    discountedPrice: 119,
    totalHours: 22,
    rating: 4.9,
    featured: "bestseller",
    gradient: "from-blue-500 to-purple-600",
    popular: true
  },
  {
    id: "business-analytics",
    title: "Business Analytics & Intelligence",
    description: "Learn data-driven decision making using popular business analytics tools.",
    category: "business",
    skillLevel: "intermediate",
    duration: "medium",
    price: 129,
    discountedPrice: null,
    totalHours: 12,
    rating: 4.5,
    featured: null,
    gradient: "from-green-500 to-teal-500",
    popular: false
  },
  {
    id: "social-media-mktg",
    title: "Social Media Marketing",
    description: "Master social media strategies to grow your brand and engage with your audience.",
    category: "marketing",
    skillLevel: "beginner",
    duration: "short",
    price: 79,
    discountedPrice: 59,
    totalHours: 6,
    rating: 4.3,
    featured: "new",
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  {
    id: "cloud-computing",
    title: "AWS Cloud Computing",
    description: "Learn to design and deploy scalable applications on Amazon Web Services.",
    category: "it-software",
    skillLevel: "advanced",
    duration: "long",
    price: 169,
    discountedPrice: 129,
    totalHours: 16,
    rating: 4.7,
    featured: "popular",
    gradient: "from-indigo-500 to-blue-600",
    popular: false
  },
  {
    id: "spanish-beginner",
    title: "Spanish for Beginners",
    description: "Learn conversational Spanish with practical exercises and cultural insights.",
    category: "languages",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 10,
    rating: 4.6,
    featured: null,
    gradient: "from-emerald-500 to-green-600",
    popular: true
  },
  {
    id: "japanese-fundamentals",
    title: "Japanese Language Fundamentals",
    description: "Master the basics of Japanese language including hiragana, katakana, and essential phrases.",
    category: "languages",
    skillLevel: "beginner",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 12,
    rating: 4.8,
    featured: "popular",
    gradient: "from-emerald-500 to-green-600",
    popular: true
  },
  {
    id: "german-immersion",
    title: "German Immersion Course",
    description: "Comprehensive German language course with focus on practical conversation and cultural understanding.",
    category: "languages",
    skillLevel: "intermediate",
    duration: "long",
    price: 129,
    discountedPrice: null,
    totalHours: 15,
    rating: 4.7,
    featured: null,
    gradient: "from-emerald-500 to-green-600",
    popular: false
  },
  {
    id: "ios-development",
    title: "iOS App Development with Swift",
    description: "Build iOS apps from scratch using Swift and Xcode.",
    category: "programming",
    skillLevel: "intermediate",
    duration: "long",
    price: 149,
    discountedPrice: null,
    totalHours: 14,
    rating: 4.7,
    featured: null,
    gradient: "from-blue-500 to-purple-600",
    popular: false
  },
  {
    id: "photography-basics",
    title: "Photography Fundamentals",
    description: "Master the art of photography with practical techniques and composition rules.",
    category: "design",
    skillLevel: "beginner",
    duration: "short",
    price: 69,
    discountedPrice: 49,
    totalHours: 5,
    rating: 4.4,
    featured: null,
    gradient: "from-pink-500 to-red-500",
    popular: true
  },
  {
    id: "project-management",
    title: "Project Management Professional",
    description: "Learn project management methodologies and prepare for PMP certification.",
    category: "business",
    skillLevel: "advanced",
    duration: "long",
    price: 199,
    discountedPrice: 159,
    totalHours: 25,
    rating: 4.8,
    featured: "bestseller",
    gradient: "from-green-500 to-teal-500",
    popular: true
  },
  {
    id: "fitness-strength",
    title: "Strength Training Fundamentals",
    description: "Learn proper strength training techniques for building muscle and improving overall fitness.",
    category: "health-fitness",
    skillLevel: "beginner",
    duration: "medium",
    price: 79,
    discountedPrice: null,
    totalHours: 8,
    rating: 4.6,
    featured: null,
    gradient: "from-red-500 to-rose-600",
    popular: false
  }
];

// Helper function to filter and paginate courses
export type FilterOptions = {
  category?: string;
  skillLevel?: string;
  duration?: string;
  sortBy?: string;
  searchQuery?: string;
  page: number;
  itemsPerPage: number;
};

export function filterAndPaginateCourses(options: FilterOptions) {
  const { 
    category, 
    skillLevel, 
    duration, 
    sortBy,
    searchQuery,
    page = 1, 
    itemsPerPage = 6 
  } = options;

  // Apply filters
  let filteredCourses = [...courses];

  // Category filter
  if (category && category !== "all") {
    filteredCourses = filteredCourses.filter(course => course.category === category);
  }

  // Skill level filter
  if (skillLevel && skillLevel !== "all") {
    filteredCourses = filteredCourses.filter(course => course.skillLevel === skillLevel);
  }

  // Duration filter
  if (duration && duration !== "all") {
    filteredCourses = filteredCourses.filter(course => course.duration === duration);
  }

  // Search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query)
    );
  }

  // Sorting
  if (sortBy) {
    switch (sortBy) {
      case "popular":
        filteredCourses.sort((a, b) => (a.popular === b.popular) ? 0 : a.popular ? -1 : 1);
        break;
      case "newest":
        // For demo, we'll sort by id as we don't have a date field
        filteredCourses.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "highest-rated":
        filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filteredCourses.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        filteredCourses.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceB - priceA;
        });
        break;
    }
  }

  // Calculate pagination
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  return {
    courses: paginatedCourses,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems
    }
  };
}

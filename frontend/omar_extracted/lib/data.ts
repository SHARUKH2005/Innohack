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
  // Programming Courses - 10 total
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
  },
  
  // Additional Programming Courses (6 more to reach 10)
  {
    id: "python-programming",
    title: "Python Programming Mastery",
    description: "From beginner to expert - master Python programming with practical projects and exercises.",
    category: "programming",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 10,
    rating: 4.7,
    featured: "popular",
    gradient: "from-blue-500 to-purple-600",
    popular: true
  },
  {
    id: "java-programming",
    title: "Java Programming Fundamentals",
    description: "Learn Java from scratch and build robust applications with object-oriented programming.",
    category: "programming",
    skillLevel: "beginner",
    duration: "long",
    price: 99,
    discountedPrice: null,
    totalHours: 12,
    rating: 4.5,
    featured: null,
    gradient: "from-blue-500 to-purple-600",
    popular: false
  },
  {
    id: "flutter-dev",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, native apps for iOS and Android from a single codebase with Flutter and Dart.",
    category: "programming",
    skillLevel: "intermediate",
    duration: "medium",
    price: 129,
    discountedPrice: 99,
    totalHours: 9,
    rating: 4.8,
    featured: "new",
    gradient: "from-blue-500 to-purple-600",
    popular: true
  },
  {
    id: "golang-basics",
    title: "Go Programming Language",
    description: "Learn Go (Golang) for building efficient, reliable, and scalable server-side applications.",
    category: "programming",
    skillLevel: "intermediate",
    duration: "medium",
    price: 119,
    discountedPrice: 89,
    totalHours: 8,
    rating: 4.6,
    featured: null,
    gradient: "from-blue-500 to-purple-600",
    popular: false
  },
  {
    id: "rust-programming",
    title: "Rust for Systems Programming",
    description: "Master Rust, the most loved programming language for systems, with hands-on projects.",
    category: "programming",
    skillLevel: "advanced",
    duration: "long",
    price: 149,
    discountedPrice: null,
    totalHours: 15,
    rating: 4.9,
    featured: null,
    gradient: "from-blue-500 to-purple-600",
    popular: true
  },
  {
    id: "typescript-advanced",
    title: "Advanced TypeScript",
    description: "Take your TypeScript skills to the next level with advanced types, patterns and best practices.",
    category: "programming",
    skillLevel: "advanced",
    duration: "medium",
    price: 109,
    discountedPrice: 89,
    totalHours: 7,
    rating: 4.7,
    featured: null,
    gradient: "from-blue-500 to-purple-600",
    popular: false
  },
  
  // Additional Health & Fitness Courses (7 more to reach 10)
  {
    id: "hiit-workout",
    title: "High-Intensity Interval Training",
    description: "Master efficient HIIT workouts to maximize calorie burn and improve cardiovascular fitness.",
    category: "health-fitness",
    skillLevel: "intermediate",
    duration: "short",
    price: 49,
    discountedPrice: 39,
    totalHours: 3,
    rating: 4.7,
    featured: null,
    gradient: "from-red-500 to-rose-600",
    popular: true
  },
  {
    id: "meditation-mindfulness",
    title: "Meditation & Mindfulness",
    description: "Learn practical meditation techniques for reducing stress and improving mental well-being.",
    category: "health-fitness",
    skillLevel: "beginner",
    duration: "medium",
    price: 59,
    discountedPrice: null,
    totalHours: 6,
    rating: 4.9,
    featured: "popular",
    gradient: "from-red-500 to-rose-600",
    popular: true
  },
  {
    id: "pilates-essentials",
    title: "Pilates Essentials",
    description: "Core strengthening Pilates workouts for improved posture, flexibility, and overall fitness.",
    category: "health-fitness",
    skillLevel: "beginner",
    duration: "medium",
    price: 69,
    discountedPrice: 49,
    totalHours: 7,
    rating: 4.5,
    featured: null,
    gradient: "from-red-500 to-rose-600",
    popular: false
  },
  {
    id: "running-marathon",
    title: "Marathon Training Plan",
    description: "Comprehensive training program for preparing for your first marathon with expert guidance.",
    category: "health-fitness",
    skillLevel: "intermediate",
    duration: "long",
    price: 89,
    discountedPrice: null,
    totalHours: 12,
    rating: 4.8,
    featured: null,
    gradient: "from-red-500 to-rose-600",
    popular: false
  },
  {
    id: "healthy-cooking",
    title: "Healthy Cooking & Meal Prep",
    description: "Learn to prepare nutritious, delicious meals with effective meal planning strategies.",
    category: "health-fitness",
    skillLevel: "beginner",
    duration: "medium",
    price: 79,
    discountedPrice: 59,
    totalHours: 8,
    rating: 4.6,
    featured: null,
    gradient: "from-red-500 to-rose-600",
    popular: true
  },
  {
    id: "flexibility-training",
    title: "Flexibility & Mobility",
    description: "Improve your range of motion, prevent injuries, and enhance athletic performance.",
    category: "health-fitness",
    skillLevel: "beginner",
    duration: "short",
    price: 49,
    discountedPrice: null,
    totalHours: 4,
    rating: 4.5,
    featured: null,
    gradient: "from-red-500 to-rose-600",
    popular: false
  },
  {
    id: "weight-management",
    title: "Sustainable Weight Management",
    description: "Science-based approaches to healthy weight loss and long-term weight management.",
    category: "health-fitness",
    skillLevel: "intermediate",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 9,
    rating: 4.7,
    featured: "bestseller",
    gradient: "from-red-500 to-rose-600",
    popular: true
  },
  
  // Additional Design Courses (7 more to reach 10)
  {
    id: "figma-ui-design",
    title: "UI Design with Figma",
    description: "Master modern UI design principles and workflows using Figma's powerful design tools.",
    category: "design",
    skillLevel: "intermediate",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 8,
    rating: 4.8,
    featured: "popular",
    gradient: "from-pink-500 to-red-500",
    popular: true
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics & Animation",
    description: "Create stunning motion graphics and animations for video content and digital media.",
    category: "design",
    skillLevel: "intermediate",
    duration: "long",
    price: 129,
    discountedPrice: 99,
    totalHours: 14,
    rating: 4.7,
    featured: null,
    gradient: "from-pink-500 to-red-500",
    popular: true
  },
  {
    id: "illustrator-mastery",
    title: "Adobe Illustrator Mastery",
    description: "Learn vector graphic design from beginner to expert with Adobe Illustrator.",
    category: "design",
    skillLevel: "beginner",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 10,
    rating: 4.6,
    featured: null,
    gradient: "from-pink-500 to-red-500",
    popular: false
  },
  {
    id: "typography-design",
    title: "Typography in Design",
    description: "Master the art and science of typography to elevate your design projects.",
    category: "design",
    skillLevel: "intermediate",
    duration: "short",
    price: 59,
    discountedPrice: null,
    totalHours: 5,
    rating: 4.5,
    featured: null,
    gradient: "from-pink-500 to-red-500",
    popular: false
  },
  {
    id: "3d-modeling-basics",
    title: "3D Modeling Fundamentals",
    description: "Learn the foundations of 3D modeling and rendering for design projects.",
    category: "design",
    skillLevel: "beginner",
    duration: "long",
    price: 119,
    discountedPrice: 99,
    totalHours: 15,
    rating: 4.6,
    featured: "new",
    gradient: "from-pink-500 to-red-500",
    popular: true
  },
  {
    id: "branding-identity",
    title: "Brand Identity Design",
    description: "Create compelling brand identities with strategy-driven design principles.",
    category: "design",
    skillLevel: "advanced",
    duration: "medium",
    price: 149,
    discountedPrice: 119,
    totalHours: 12,
    rating: 4.9,
    featured: "bestseller",
    gradient: "from-pink-500 to-red-500",
    popular: true
  },
  {
    id: "web-design-principles",
    title: "Web Design Principles",
    description: "Learn the fundamental principles of effective and user-friendly web design.",
    category: "design",
    skillLevel: "beginner",
    duration: "medium",
    price: 79,
    discountedPrice: 59,
    totalHours: 8,
    rating: 4.4,
    featured: null,
    gradient: "from-pink-500 to-red-500",
    popular: false
  },
  
  // Additional Marketing Courses (8 more to reach 10)
  {
    id: "seo-fundamentals",
    title: "SEO Fundamentals",
    description: "Master search engine optimization to increase website visibility and organic traffic.",
    category: "marketing",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 8,
    rating: 4.6,
    featured: null,
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  {
    id: "email-marketing",
    title: "Email Marketing Mastery",
    description: "Build effective email campaigns to engage customers and drive conversions.",
    category: "marketing",
    skillLevel: "intermediate",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 7,
    rating: 4.5,
    featured: null,
    gradient: "from-yellow-500 to-orange-500",
    popular: false
  },
  {
    id: "content-strategy",
    title: "Content Marketing Strategy",
    description: "Develop and implement effective content strategies to attract and retain customers.",
    category: "marketing",
    skillLevel: "intermediate",
    duration: "medium",
    price: 119,
    discountedPrice: null,
    totalHours: 9,
    rating: 4.7,
    featured: null,
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  {
    id: "google-ads",
    title: "Google Ads & PPC",
    description: "Master pay-per-click advertising with Google Ads to drive targeted traffic.",
    category: "marketing",
    skillLevel: "intermediate",
    duration: "medium",
    price: 129,
    discountedPrice: 99,
    totalHours: 10,
    rating: 4.8,
    featured: "bestseller",
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  {
    id: "copywriting",
    title: "Persuasive Copywriting",
    description: "Write compelling copy that converts visitors into customers and drives action.",
    category: "marketing",
    skillLevel: "beginner",
    duration: "short",
    price: 69,
    discountedPrice: null,
    totalHours: 5,
    rating: 4.6,
    featured: null,
    gradient: "from-yellow-500 to-orange-500",
    popular: false
  },
  {
    id: "marketing-analytics",
    title: "Marketing Analytics",
    description: "Leverage data to measure, analyze and optimize your marketing performance.",
    category: "marketing",
    skillLevel: "advanced",
    duration: "long",
    price: 149,
    discountedPrice: 119,
    totalHours: 14,
    rating: 4.7,
    featured: "popular",
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  {
    id: "influencer-marketing",
    title: "Influencer Marketing",
    description: "Develop and execute successful influencer marketing campaigns for your brand.",
    category: "marketing",
    skillLevel: "intermediate",
    duration: "medium",
    price: 109,
    discountedPrice: 89,
    totalHours: 8,
    rating: 4.4,
    featured: null,
    gradient: "from-yellow-500 to-orange-500",
    popular: false
  },
  {
    id: "video-marketing",
    title: "Video Marketing",
    description: "Create effective video content to engage audiences across digital platforms.",
    category: "marketing",
    skillLevel: "intermediate",
    duration: "medium",
    price: 129,
    discountedPrice: 99,
    totalHours: 11,
    rating: 4.7,
    featured: "new",
    gradient: "from-yellow-500 to-orange-500",
    popular: true
  },
  
  // Additional IT & Software Courses (9 more to reach 10)
  {
    id: "devops-fundamentals",
    title: "DevOps Fundamentals",
    description: "Learn DevOps practices for streamlining development and operations workflows.",
    category: "it-software",
    skillLevel: "intermediate",
    duration: "medium",
    price: 129,
    discountedPrice: 99,
    totalHours: 10,
    rating: 4.6,
    featured: null,
    gradient: "from-indigo-500 to-blue-600",
    popular: true
  },
  {
    id: "cybersecurity-basics",
    title: "Cybersecurity Fundamentals",
    description: "Master essential cybersecurity concepts and practices to protect systems and data.",
    category: "it-software",
    skillLevel: "beginner",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 9,
    rating: 4.7,
    featured: "popular",
    gradient: "from-indigo-500 to-blue-600",
    popular: true
  },
  {
    id: "docker-containers",
    title: "Docker & Container Technology",
    description: "Master Docker and containerization for modern application deployment.",
    category: "it-software",
    skillLevel: "intermediate",
    duration: "medium",
    price: 119,
    discountedPrice: null,
    totalHours: 8,
    rating: 4.8,
    featured: null,
    gradient: "from-indigo-500 to-blue-600",
    popular: false
  },
  {
    id: "linux-administration",
    title: "Linux System Administration",
    description: "Learn to administer Linux systems for servers and enterprise environments.",
    category: "it-software",
    skillLevel: "intermediate",
    duration: "long",
    price: 139,
    discountedPrice: 119,
    totalHours: 15,
    rating: 4.6,
    featured: null,
    gradient: "from-indigo-500 to-blue-600",
    popular: true
  },
  {
    id: "azure-fundamentals",
    title: "Microsoft Azure Fundamentals",
    description: "Get started with Microsoft Azure cloud services and infrastructure.",
    category: "it-software",
    skillLevel: "beginner",
    duration: "medium",
    price: 109,
    discountedPrice: 89,
    totalHours: 10,
    rating: 4.5,
    featured: null,
    gradient: "from-indigo-500 to-blue-600",
    popular: false
  },
  {
    id: "kubernetes-mastery",
    title: "Kubernetes Mastery",
    description: "Deploy, manage and scale containerized applications with Kubernetes.",
    category: "it-software",
    skillLevel: "advanced",
    duration: "long",
    price: 159,
    discountedPrice: 129,
    totalHours: 16,
    rating: 4.9,
    featured: "bestseller",
    gradient: "from-indigo-500 to-blue-600",
    popular: true
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking",
    description: "Learn ethical hacking techniques to identify and address security vulnerabilities.",
    category: "it-software",
    skillLevel: "advanced",
    duration: "long",
    price: 179,
    discountedPrice: 149,
    totalHours: 20,
    rating: 4.8,
    featured: "popular",
    gradient: "from-indigo-500 to-blue-600",
    popular: true
  },
  {
    id: "network-security",
    title: "Network Security",
    description: "Master techniques to secure networks against threats and vulnerabilities.",
    category: "it-software",
    skillLevel: "intermediate",
    duration: "medium",
    price: 129,
    discountedPrice: null,
    totalHours: 12,
    rating: 4.7,
    featured: null,
    gradient: "from-indigo-500 to-blue-600",
    popular: false
  },
  {
    id: "database-design",
    title: "Database Design & SQL",
    description: "Learn to design efficient databases and master SQL for data management.",
    category: "it-software",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 9,
    rating: 4.6,
    featured: null,
    gradient: "from-indigo-500 to-blue-600",
    popular: true
  },
  
  // Additional Science Courses (8 more to reach 10)
  {
    id: "data-analytics",
    title: "Data Analytics Essentials",
    description: "Learn to analyze and interpret data to drive informed business decisions.",
    category: "science",
    skillLevel: "intermediate",
    duration: "medium",
    price: 119,
    discountedPrice: 99,
    totalHours: 10,
    rating: 4.7,
    featured: null,
    gradient: "from-purple-500 to-violet-600",
    popular: true
  },
  {
    id: "deep-learning",
    title: "Deep Learning Fundamentals",
    description: "Understand neural networks and deep learning algorithms for AI applications.",
    category: "science",
    skillLevel: "advanced",
    duration: "long",
    price: 149,
    discountedPrice: 129,
    totalHours: 16,
    rating: 4.8,
    featured: "popular",
    gradient: "from-purple-500 to-violet-600",
    popular: true
  },
  {
    id: "statistics-fundamentals",
    title: "Statistics for Data Science",
    description: "Master statistical methods essential for data analysis and machine learning.",
    category: "science",
    skillLevel: "beginner",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 9,
    rating: 4.6,
    featured: null,
    gradient: "from-purple-500 to-violet-600",
    popular: false
  },
  {
    id: "big-data-hadoop",
    title: "Big Data with Hadoop & Spark",
    description: "Learn to process and analyze large datasets with Hadoop and Spark frameworks.",
    category: "science",
    skillLevel: "intermediate",
    duration: "long",
    price: 139,
    discountedPrice: 109,
    totalHours: 14,
    rating: 4.7,
    featured: null,
    gradient: "from-purple-500 to-violet-600",
    popular: true
  },
  {
    id: "bioinformatics",
    title: "Introduction to Bioinformatics",
    description: "Apply computational methods to analyze biological data and solve biological problems.",
    category: "science",
    skillLevel: "intermediate",
    duration: "long",
    price: 129,
    discountedPrice: null,
    totalHours: 12,
    rating: 4.5,
    featured: null,
    gradient: "from-purple-500 to-violet-600",
    popular: false
  },
  {
    id: "physics-fundamentals",
    title: "Physics Fundamentals",
    description: "Understand core physics principles with practical examples and simulations.",
    category: "science",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 10,
    rating: 4.4,
    featured: null,
    gradient: "from-purple-500 to-violet-600",
    popular: false
  },
  {
    id: "astronomy-basics",
    title: "Introduction to Astronomy",
    description: "Explore the universe, celestial bodies, and the fundamentals of astronomy.",
    category: "science",
    skillLevel: "beginner",
    duration: "medium",
    price: 79,
    discountedPrice: null,
    totalHours: 8,
    rating: 4.9,
    featured: "bestseller",
    gradient: "from-purple-500 to-violet-600",
    popular: true
  },
  {
    id: "climate-science",
    title: "Climate Science & Sustainability",
    description: "Understand climate change science and explore sustainable solutions.",
    category: "science",
    skillLevel: "intermediate",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 9,
    rating: 4.7,
    featured: "new",
    gradient: "from-purple-500 to-violet-600",
    popular: true
  },
  
  // Additional Languages Courses (7 more to reach 10)
  {
    id: "french-beginner",
    title: "French for Beginners",
    description: "Start speaking French with confidence through conversation-focused lessons.",
    category: "languages",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 10,
    rating: 4.7,
    featured: null,
    gradient: "from-emerald-500 to-green-600",
    popular: true
  },
  {
    id: "mandarin-essentials",
    title: "Mandarin Chinese Essentials",
    description: "Learn Mandarin Chinese characters, pronunciation, and essential phrases.",
    category: "languages",
    skillLevel: "beginner",
    duration: "long",
    price: 119,
    discountedPrice: 99,
    totalHours: 15,
    rating: 4.8,
    featured: "popular",
    gradient: "from-emerald-500 to-green-600",
    popular: true
  },
  {
    id: "italian-basics",
    title: "Italian Language Basics",
    description: "Learn Italian vocabulary, grammar, and culture for beginners.",
    category: "languages",
    skillLevel: "beginner",
    duration: "medium",
    price: 79,
    discountedPrice: null,
    totalHours: 8,
    rating: 4.5,
    featured: null,
    gradient: "from-emerald-500 to-green-600",
    popular: false
  },
  {
    id: "arabic-introduction",
    title: "Introduction to Arabic",
    description: "Learn Arabic script, pronunciation, and fundamental conversation skills.",
    category: "languages",
    skillLevel: "beginner",
    duration: "long",
    price: 99,
    discountedPrice: 79,
    totalHours: 12,
    rating: 4.6,
    featured: null,
    gradient: "from-emerald-500 to-green-600",
    popular: false
  },
  {
    id: "russian-language",
    title: "Russian Language & Culture",
    description: "Master Russian alphabet, basic grammar, and essential vocabulary.",
    category: "languages",
    skillLevel: "beginner",
    duration: "medium",
    price: 89,
    discountedPrice: 69,
    totalHours: 10,
    rating: 4.5,
    featured: null,
    gradient: "from-emerald-500 to-green-600",
    popular: false
  },
  {
    id: "business-english",
    title: "Business English",
    description: "Improve your English communication skills for professional environments.",
    category: "languages",
    skillLevel: "intermediate",
    duration: "medium",
    price: 109,
    discountedPrice: 89,
    totalHours: 10,
    rating: 4.8,
    featured: "bestseller",
    gradient: "from-emerald-500 to-green-600",
    popular: true
  },
  {
    id: "portuguese-basics",
    title: "Brazilian Portuguese",
    description: "Learn Brazilian Portuguese vocabulary, grammar, and cultural insights.",
    category: "languages",
    skillLevel: "beginner",
    duration: "medium",
    price: 79,
    discountedPrice: 59,
    totalHours: 9,
    rating: 4.6,
    featured: "new",
    gradient: "from-emerald-500 to-green-600",
    popular: true
  },
  
  // Additional Business Courses (8 more to reach 10)
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Fundamentals",
    description: "Learn the essentials of starting and growing a successful business.",
    category: "business",
    skillLevel: "beginner",
    duration: "medium",
    price: 99,
    discountedPrice: 79,
    totalHours: 10,
    rating: 4.8,
    featured: "popular",
    gradient: "from-green-500 to-teal-500",
    popular: true
  },
  {
    id: "financial-management",
    title: "Financial Management",
    description: "Master the principles of effective financial management for business success.",
    category: "business",
    skillLevel: "intermediate",
    duration: "medium",
    price: 129,
    discountedPrice: 99,
    totalHours: 12,
    rating: 4.7,
    featured: null,
    gradient: "from-green-500 to-teal-500",
    popular: true
  },
  {
    id: "leadership-skills",
    title: "Leadership & Management Skills",
    description: "Develop essential leadership qualities to effectively manage teams and organizations.",
    category: "business",
    skillLevel: "intermediate",
    duration: "medium",
    price: 119,
    discountedPrice: null,
    totalHours: 10,
    rating: 4.9,
    featured: "bestseller",
    gradient: "from-green-500 to-teal-500",
    popular: true
  },
  {
    id: "sales-techniques",
    title: "Advanced Sales Techniques",
    description: "Learn proven sales strategies to boost conversions and business revenue.",
    category: "business",
    skillLevel: "intermediate",
    duration: "short",
    price: 89,
    discountedPrice: 69,
    totalHours: 6,
    rating: 4.6,
    featured: null,
    gradient: "from-green-500 to-teal-500",
    popular: false
  },
  {
    id: "business-strategy",
    title: "Business Strategy",
    description: "Develop effective business strategies for sustainable competitive advantage.",
    category: "business",
    skillLevel: "advanced",
    duration: "medium",
    price: 149,
    discountedPrice: 119,
    totalHours: 12,
    rating: 4.8,
    featured: "popular",
    gradient: "from-green-500 to-teal-500",
    popular: true
  },
  {
    id: "negotiation-skills",
    title: "Negotiation Skills",
    description: "Master the art of negotiation for business success and conflict resolution.",
    category: "business",
    skillLevel: "intermediate",
    duration: "short",
    price: 79,
    discountedPrice: null,
    totalHours: 5,
    rating: 4.7,
    featured: null,
    gradient: "from-green-500 to-teal-500",
    popular: false
  },
  {
    id: "agile-management",
    title: "Agile Project Management",
    description: "Lead projects using Agile methodologies for faster, more flexible delivery.",
    category: "business",
    skillLevel: "intermediate",
    duration: "medium",
    price: 109,
    discountedPrice: 89,
    totalHours: 8,
    rating: 4.6,
    featured: null,
    gradient: "from-green-500 to-teal-500",
    popular: true
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description: "Guide your organization through successful digital transformation initiatives.",
    category: "business",
    skillLevel: "advanced",
    duration: "long",
    price: 159,
    discountedPrice: 129,
    totalHours: 14,
    rating: 4.8,
    featured: "new",
    gradient: "from-green-500 to-teal-500",
    popular: true
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
    filteredCourses = filteredCourses.filter(course => {
      // Find the category object for this course to get the category name
      const categoryObj = categories.find(cat => cat.slug === course.category);
      const categoryName = categoryObj?.name.toLowerCase() || '';
      
      return course.title.toLowerCase().includes(query) || 
             course.description.toLowerCase().includes(query) ||
             categoryName.includes(query) ||
             course.skillLevel.toLowerCase().includes(query);
    });
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

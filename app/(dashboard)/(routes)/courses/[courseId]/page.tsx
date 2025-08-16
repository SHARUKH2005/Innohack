import { ArrowLeft, BookOpen, Clock, Star, MessageCircle, CheckSquare, Download, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface CourseParams {
  params: {
    courseId: string;
  }
}

export default function CourseDetails({ params }: CourseParams) {
  const { courseId } = params;
  
  // In a real application, we would fetch the course data based on courseId
  // For now, we'll use a mock object
  const course = {
    id: courseId,
    title: courseId === 'react-fundamentals' 
      ? "React Fundamentals" 
      : courseId === 'nodejs-backend'
        ? "Node.js Backend"
        : "UI/UX Design",
    description: "Learn the core concepts and build powerful applications with step-by-step tutorials and hands-on projects.",
    instructor: "Alex Johnson",
    totalLessons: 24,
    completedLessons: courseId === 'react-fundamentals' 
      ? 18 
      : courseId === 'nodejs-backend'
        ? 11
        : 5,
    totalHours: courseId === 'react-fundamentals' 
      ? 12 
      : courseId === 'nodejs-backend'
        ? 20
        : 15,
    rating: 4.8,
    reviews: 387,
    students: 12584,
    lastUpdated: "October 2023",
    gradient: courseId === 'react-fundamentals' 
      ? "from-blue-500 to-purple-600" 
      : courseId === 'nodejs-backend'
        ? "from-green-500 to-teal-600"
        : "from-orange-500 to-red-600",
    modules: [
      {
        id: "module-1",
        title: "Getting Started",
        description: "Introduction to the course and setup your development environment",
        duration: "45 min",
        lessons: [
          { id: "lesson-1-1", title: "Introduction", duration: "5 min", completed: true },
          { id: "lesson-1-2", title: "Setting Up Your Environment", duration: "15 min", completed: true },
          { id: "lesson-1-3", title: "Your First Project", duration: "25 min", completed: true },
        ]
      },
      {
        id: "module-2",
        title: "Core Concepts",
        description: "Learn the fundamental concepts and principles",
        duration: "3h 20min",
        lessons: [
          { id: "lesson-2-1", title: "Basic Principles", duration: "30 min", completed: true },
          { id: "lesson-2-2", title: "Building Blocks", duration: "45 min", completed: true },
          { id: "lesson-2-3", title: "Data Flow", duration: "40 min", completed: courseId === 'react-fundamentals' },
          { id: "lesson-2-4", title: "State Management", duration: "50 min", completed: courseId === 'react-fundamentals' },
          { id: "lesson-2-5", title: "Handling Events", duration: "35 min", completed: false }
        ]
      },
      {
        id: "module-3",
        title: "Advanced Techniques",
        description: "Master advanced patterns and optimize performance",
        duration: "4h 15min",
        lessons: [
          { id: "lesson-3-1", title: "Performance Optimization", duration: "55 min", completed: false },
          { id: "lesson-3-2", title: "Advanced Patterns", duration: "60 min", completed: false },
          { id: "lesson-3-3", title: "Testing Strategies", duration: "50 min", completed: false },
          { id: "lesson-3-4", title: "Deployment", duration: "45 min", completed: false },
          { id: "lesson-3-5", title: "Case Studies", duration: "55 min", completed: false }
        ]
      }
    ]
  };

  const progressPercentage = Math.round((course.completedLessons / course.totalLessons) * 100);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="mb-8">
        <Link href="/courses" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
        
        <div className={`h-48 bg-gradient-to-br ${course.gradient} rounded-lg mb-6 relative`}>
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h1 className="text-white text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-white/80 max-w-xl">{course.description}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-muted-foreground">({course.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span>{course.totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{course.totalHours} hours</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Resources
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{progressPercentage}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
      
      {/* Course Content Tabs */}
      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        
        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="py-4">
          <div className="space-y-6">
            {course.modules.map((module) => (
              <div key={module.id} className="border rounded-md overflow-hidden">
                <div className="bg-muted p-4">
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-sm">{module.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {module.duration}
                    </div>
                  </div>
                </div>
                
                <div className="divide-y">
                  {module.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={`p-4 flex items-center justify-between hover:bg-accent cursor-pointer ${lesson.completed ? 'bg-accent/30' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-1 ${lesson.completed ? 'text-primary bg-primary/10' : 'text-muted-foreground bg-muted'}`}>
                          {lesson.completed ? (
                            <CheckSquare className="h-5 w-5" />
                          ) : (
                            <BookOpen className="h-5 w-5" />
                          )}
                        </div>
                        <span className={lesson.completed ? 'font-medium' : ''}>{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        <Button variant={lesson.completed ? "outline" : "default"} size="sm">
                          {lesson.completed ? "Review" : "Start"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="py-4">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About this course</h3>
              <p className="text-muted-foreground">
                This comprehensive course will take you through everything you need to know to become proficient in {course.title}. 
                Whether you're a beginner or looking to refresh your knowledge, this course provides a structured learning path with 
                practical projects and real-world applications.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Build complete applications from scratch",
                  "Understand core principles and best practices",
                  "Implement advanced patterns and techniques",
                  "Optimize performance for real-world scenarios",
                  "Write clean, maintainable code",
                  "Debug common issues effectively",
                  "Deploy your applications to production",
                  "Stay updated with the latest trends"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">About the instructor</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-lg">{course.instructor}</h4>
                  <p className="text-muted-foreground mb-2">Senior Developer & Instructor</p>
                  <p className="text-sm">
                    Professional developer with over 10 years of experience in web and mobile application development.
                    Passionate about teaching and helping others grow their skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Discussions Tab */}
        <TabsContent value="discussions" className="py-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Course Discussions</h3>
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  id: "q1",
                  question: "How do I handle authentication in my application?",
                  author: "Jennifer Lee",
                  date: "2 days ago",
                  replies: 4
                },
                {
                  id: "q2",
                  question: "Is there a recommended architecture for large scale applications?",
                  author: "David Miller",
                  date: "1 week ago",
                  replies: 7
                },
                {
                  id: "q3",
                  question: "Error when trying to implement the techniques from Module 2",
                  author: "Ryan Cooper",
                  date: "3 days ago",
                  replies: 5
                }
              ].map((question) => (
                <div key={question.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-lg mb-2">{question.question}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{question.author}</span>
                      <span>•</span>
                      <span>{question.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{question.replies}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

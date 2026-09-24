import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Categories ────────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "programming" },
      update: {},
      create: { name: "Programming", slug: "programming", icon: "Code", gradient: "from-blue-500 to-purple-600" },
    }),
    prisma.category.upsert({
      where: { slug: "design" },
      update: {},
      create: { name: "Design", slug: "design", icon: "Palette", gradient: "from-pink-500 to-red-500" },
    }),
    prisma.category.upsert({
      where: { slug: "business" },
      update: {},
      create: { name: "Business", slug: "business", icon: "BarChart3", gradient: "from-green-500 to-teal-500" },
    }),
    prisma.category.upsert({
      where: { slug: "marketing" },
      update: {},
      create: { name: "Marketing", slug: "marketing", icon: "TrendingUp", gradient: "from-yellow-500 to-orange-500" },
    }),
    prisma.category.upsert({
      where: { slug: "it-software" },
      update: {},
      create: { name: "IT & Software", slug: "it-software", icon: "Monitor", gradient: "from-indigo-500 to-blue-600" },
    }),
    prisma.category.upsert({
      where: { slug: "science" },
      update: {},
      create: { name: "Science", slug: "science", icon: "Beaker", gradient: "from-purple-500 to-violet-600" },
    }),
    prisma.category.upsert({
      where: { slug: "languages" },
      update: {},
      create: { name: "Languages", slug: "languages", icon: "Globe", gradient: "from-emerald-500 to-green-600" },
    }),
    prisma.category.upsert({
      where: { slug: "health-fitness" },
      update: {},
      create: { name: "Health & Fitness", slug: "health-fitness", icon: "Heart", gradient: "from-red-500 to-rose-600" },
    }),
  ]);

  const [programming, design, business, marketing, itSoftware, science, languages, health] = categories;

  // ── Demo Instructor User ──────────────────────────────────────────────────
  const instructor = await prisma.user.upsert({
    where: { clerkId: "demo_instructor_001" },
    update: {},
    create: {
      clerkId: "demo_instructor_001",
      email: "instructor@blocklearnx.local",
      name: "Alex Johnson",
      avatarUrl: null,
      bio: "Senior software engineer with 10+ years of experience in web development.",
      role: "INSTRUCTOR",
    },
  });

  // ── Demo Student User ─────────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { clerkId: "demo_student_001" },
    update: {},
    create: {
      clerkId: "demo_student_001",
      email: "student@blocklearnx.local",
      name: "Demo Student",
      role: "STUDENT",
    },
  });

  // ── Demo Admin User ───────────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { clerkId: "demo_admin_001" },
    update: {},
    create: {
      clerkId: "demo_admin_001",
      email: "admin@blocklearnx.local",
      name: "Admin User",
      role: "ADMIN",
    },
  });

  // ── Helper to create a course with modules and lessons ───────────────────
  async function createCourse(data: {
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    gradient: string;
    categoryId: string;
    difficulty: string;
    totalHours: number;
    price: number;
    isFree: boolean;
    featured?: string;
    rating?: number;
    ratingCount?: number;
    modules: {
      title: string;
      description?: string;
      lessons: {
        title: string;
        type: string;
        description?: string;
        content?: string;
        videoUrl?: string;
        duration: number;
        isFree?: boolean;
      }[];
    }[];
    quizzes?: {
      title: string;
      passingScore: number;
      questions: {
        text: string;
        options: { text: string; isCorrect: boolean }[];
      }[];
    }[];
  }) {
    const course = await prisma.course.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        gradient: data.gradient,
        instructorId: instructor.id,
        categoryId: data.categoryId,
        difficulty: data.difficulty,
        totalHours: data.totalHours,
        price: data.price,
        isFree: data.isFree,
        isPublished: true,
        featured: data.featured ?? null,
        rating: data.rating ?? 0,
        ratingCount: data.ratingCount ?? 0,
      },
    });

    for (let mi = 0; mi < data.modules.length; mi++) {
      const modData = data.modules[mi];
      const mod = await prisma.module.create({
        data: {
          title: modData.title,
          description: modData.description,
          order: mi + 1,
          courseId: course.id,
        },
      });
      for (let li = 0; li < modData.lessons.length; li++) {
        const les = modData.lessons[li];
        await prisma.lesson.create({
          data: {
            title: les.title,
            description: les.description,
            type: les.type,
            content: les.content,
            videoUrl: les.videoUrl,
            duration: les.duration,
            order: li + 1,
            isFree: les.isFree ?? false,
            moduleId: mod.id,
          },
        });
      }
    }

    if (data.quizzes) {
      for (const qData of data.quizzes) {
        const quiz = await prisma.quiz.create({
          data: { title: qData.title, courseId: course.id, passingScore: qData.passingScore },
        });
        for (let qi = 0; qi < qData.questions.length; qi++) {
          const qst = qData.questions[qi];
          const question = await prisma.question.create({
            data: { text: qst.text, order: qi + 1, quizId: quiz.id },
          });
          for (const opt of qst.options) {
            await prisma.quizOption.create({
              data: { text: opt.text, isCorrect: opt.isCorrect, questionId: question.id },
            });
          }
        }
      }
    }

    return course;
  }

  // ── Course 1: React Fundamentals ─────────────────────────────────────────
  await createCourse({
    title: "React Fundamentals",
    slug: "react-fundamentals",
    description: "Master the basics of React and build modern web applications with hooks, context, and more. This course covers everything from JSX to advanced patterns used in production apps.",
    shortDescription: "Master React from scratch with hooks, context, and real-world projects.",
    gradient: "from-blue-500 to-purple-600",
    categoryId: programming.id,
    difficulty: "INTERMEDIATE",
    totalHours: 12,
    price: 89,
    isFree: false,
    featured: "bestseller",
    rating: 4.8,
    ratingCount: 1240,
    modules: [
      {
        title: "Getting Started with React",
        description: "Introduction to React and setting up your development environment.",
        lessons: [
          { title: "What is React and Why Use It?", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15, isFree: true, description: "Overview of React and its ecosystem." },
          { title: "Setting Up Your Environment", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 12, isFree: true, description: "Install Node.js, create-react-app, and VS Code extensions." },
          { title: "Your First React Component", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18, description: "Build and render your first React component." },
          { title: "JSX Deep Dive", type: "TEXT", duration: 10, content: "# JSX Deep Dive\n\nJSX is a syntax extension for JavaScript. It lets you write HTML-like markup inside a JavaScript file.\n\n## Key Rules\n1. Return a single root element\n2. Close all tags\n3. Use camelCase for most attributes\n\n```jsx\nfunction Welcome() {\n  return (\n    <div className=\"container\">\n      <h1>Hello, BlockLearnX!</h1>\n    </div>\n  );\n}\n```" },
        ],
      },
      {
        title: "React Hooks",
        description: "Master useState, useEffect, useContext, and custom hooks.",
        lessons: [
          { title: "useState — Managing State", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22, description: "Learn how to add state to functional components." },
          { title: "useEffect — Side Effects", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25, description: "Fetch data, subscribe to events, and manage lifecycle." },
          { title: "useContext — Global State", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, description: "Share state across components without prop drilling." },
          { title: "Building Custom Hooks", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18, description: "Extract reusable stateful logic into custom hooks." },
        ],
      },
      {
        title: "Advanced Component Patterns",
        description: "Higher-order components, render props, and composition.",
        lessons: [
          { title: "Component Composition", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, description: "Building flexible UIs through composition." },
          { title: "Higher-Order Components", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22, description: "Reusing component logic with HOCs." },
          { title: "Performance Optimization", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25, description: "useMemo, useCallback, and React.memo." },
          { title: "Final Project: Build a Dashboard", type: "TEXT", duration: 30, content: "# Final Project\n\nBuild a complete dashboard using everything you've learned:\n- Multiple components\n- State management with Context\n- Data fetching with useEffect\n- Performance optimization\n\nSubmit your GitHub repository link in the community discussion." },
        ],
      },
    ],
    quizzes: [
      {
        title: "React Hooks Quiz",
        passingScore: 70,
        questions: [
          { text: "Which hook is used to manage state in a functional component?", options: [{ text: "useEffect", isCorrect: false }, { text: "useState", isCorrect: true }, { text: "useContext", isCorrect: false }, { text: "useRef", isCorrect: false }] },
          { text: "When does useEffect run by default?", options: [{ text: "Only on mount", isCorrect: false }, { text: "Only on unmount", isCorrect: false }, { text: "After every render", isCorrect: true }, { text: "Never automatically", isCorrect: false }] },
          { text: "What does the dependency array in useEffect control?", options: [{ text: "The component's initial state", isCorrect: false }, { text: "When the effect re-runs", isCorrect: true }, { text: "The component's props", isCorrect: false }, { text: "The component's context", isCorrect: false }] },
          { text: "What is JSX?", options: [{ text: "A CSS framework", isCorrect: false }, { text: "A JavaScript runtime", isCorrect: false }, { text: "A syntax extension for JavaScript", isCorrect: true }, { text: "A testing library", isCorrect: false }] },
          { text: "How do you pass data from parent to child in React?", options: [{ text: "Via state", isCorrect: false }, { text: "Via props", isCorrect: true }, { text: "Via context only", isCorrect: false }, { text: "Via refs", isCorrect: false }] },
        ],
      },
    ],
  });

  // ── Course 2: Full-Stack JavaScript ──────────────────────────────────────
  await createCourse({
    title: "Full-Stack JavaScript Development",
    slug: "fullstack-javascript",
    description: "Build complete web applications using JavaScript on both frontend and backend. Covers Node.js, Express, MongoDB, and React in a cohesive full-stack workflow.",
    shortDescription: "Build complete apps with Node.js, Express, and React from scratch.",
    gradient: "from-green-500 to-teal-600",
    categoryId: programming.id,
    difficulty: "INTERMEDIATE",
    totalHours: 20,
    price: 139,
    isFree: false,
    featured: "bestseller",
    rating: 4.9,
    ratingCount: 2100,
    modules: [
      {
        title: "Node.js Fundamentals",
        lessons: [
          { title: "Introduction to Node.js", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 20, isFree: true },
          { title: "Modules and NPM", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 18 },
          { title: "File System & Streams", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 22 },
          { title: "Async JavaScript — Callbacks to Async/Await", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 25 },
        ],
      },
      {
        title: "Express.js & REST APIs",
        lessons: [
          { title: "Setting Up Express", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 15, isFree: true },
          { title: "Routing & Middleware", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 20 },
          { title: "Building a REST API", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 30 },
          { title: "Authentication with JWT", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 25 },
          { title: "Error Handling & Validation", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 18 },
        ],
      },
      {
        title: "React Frontend",
        lessons: [
          { title: "React with Vite", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 15 },
          { title: "Consuming REST APIs from React", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 22 },
          { title: "State Management with Zustand", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4", duration: 20 },
          { title: "Full-Stack Project: Task Manager", type: "TEXT", duration: 45, content: "# Final Project: Full-Stack Task Manager\n\nBuild a complete task management app with:\n- Node.js + Express backend\n- JWT authentication\n- React frontend\n- CRUD operations\n\nThis project will be your portfolio piece." },
        ],
      },
    ],
  });

  // ── Course 3: UI/UX Design ────────────────────────────────────────────────
  await createCourse({
    title: "UI/UX Design Fundamentals",
    slug: "uiux-design-fundamentals",
    description: "Learn design principles and create beautiful user interfaces that deliver exceptional experiences. Covers Figma, design systems, user research, and prototyping.",
    shortDescription: "Design beautiful, usable interfaces with Figma and modern UX principles.",
    gradient: "from-pink-500 to-red-500",
    categoryId: design.id,
    difficulty: "BEGINNER",
    totalHours: 8,
    price: 0,
    isFree: true,
    featured: "popular",
    rating: 4.7,
    ratingCount: 890,
    modules: [
      {
        title: "Design Principles",
        lessons: [
          { title: "Visual Hierarchy", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15, isFree: true },
          { title: "Color Theory", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18, isFree: true },
          { title: "Typography in UI", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 14 },
          { title: "Spacing and Layout", type: "TEXT", duration: 10, content: "# Spacing and Layout\n\nConsistent spacing makes your design feel professional.\n\n## The 8pt Grid System\nBase your spacing on multiples of 8: 8, 16, 24, 32, 40, 48...\n\n## Why it works\n- Divisible by 2 for half-step increments\n- Maps perfectly to most screen densities\n- Creates visual consistency automatically" },
        ],
      },
      {
        title: "Figma Essentials",
        lessons: [
          { title: "Figma Interface Tour", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, isFree: true },
          { title: "Components and Variants", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25 },
          { title: "Auto Layout", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
          { title: "Prototyping and Transitions", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
        ],
      },
    ],
  });

  // ── Course 4: Python for Data Science ────────────────────────────────────
  await createCourse({
    title: "Python for Data Science",
    slug: "python-data-science",
    description: "Use Python for data analysis, visualization, and building machine learning models. Master Pandas, NumPy, Matplotlib, and scikit-learn through hands-on projects.",
    shortDescription: "Analyze data and build ML models with Python, Pandas, and scikit-learn.",
    gradient: "from-purple-500 to-violet-600",
    categoryId: science.id,
    difficulty: "INTERMEDIATE",
    totalHours: 10,
    price: 119,
    isFree: false,
    rating: 4.6,
    ratingCount: 670,
    modules: [
      {
        title: "Python Data Tools",
        lessons: [
          { title: "NumPy Arrays", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, isFree: true },
          { title: "Pandas DataFrames", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25, isFree: true },
          { title: "Data Cleaning", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
          { title: "Data Visualization with Matplotlib", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20 },
        ],
      },
      {
        title: "Machine Learning Basics",
        lessons: [
          { title: "Introduction to ML", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15 },
          { title: "Linear Regression", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25 },
          { title: "Classification with scikit-learn", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 30 },
          { title: "Model Evaluation", type: "TEXT", duration: 15, content: "# Model Evaluation\n\n## Key Metrics\n- **Accuracy**: Overall correct predictions\n- **Precision**: True positives / (True positives + False positives)\n- **Recall**: True positives / (True positives + False negatives)\n- **F1-Score**: Harmonic mean of Precision and Recall\n\nAlways evaluate on a held-out test set, never on training data." },
        ],
      },
    ],
  });

  // ── Course 5: Digital Marketing ───────────────────────────────────────────
  await createCourse({
    title: "Digital Marketing Strategy",
    slug: "digital-marketing-strategy",
    description: "Develop comprehensive digital marketing strategies to grow your business online. Covers SEO, social media, email marketing, PPC, and analytics.",
    shortDescription: "Build a complete digital marketing strategy that drives real results.",
    gradient: "from-yellow-500 to-orange-500",
    categoryId: marketing.id,
    difficulty: "INTERMEDIATE",
    totalHours: 15,
    price: 99,
    isFree: false,
    featured: "popular",
    rating: 4.7,
    ratingCount: 1100,
    modules: [
      {
        title: "SEO Foundations",
        lessons: [
          { title: "How Search Engines Work", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15, isFree: true },
          { title: "Keyword Research", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, isFree: true },
          { title: "On-Page SEO", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
          { title: "Link Building Strategies", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
        ],
      },
      {
        title: "Social Media Marketing",
        lessons: [
          { title: "Platform Strategy (Instagram, LinkedIn, TikTok)", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25 },
          { title: "Content Calendar Planning", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
          { title: "Paid Social Advertising", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 30 },
          { title: "Analytics and Reporting", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20 },
        ],
      },
    ],
  });

  // ── Course 6: AWS Cloud Computing ─────────────────────────────────────────
  await createCourse({
    title: "AWS Cloud Computing",
    slug: "aws-cloud-computing",
    description: "Learn to design and deploy scalable applications on Amazon Web Services. Covers EC2, S3, Lambda, RDS, and best practices for cloud architecture.",
    shortDescription: "Deploy scalable apps on AWS with EC2, S3, Lambda, and RDS.",
    gradient: "from-indigo-500 to-blue-600",
    categoryId: itSoftware.id,
    difficulty: "ADVANCED",
    totalHours: 16,
    price: 129,
    isFree: false,
    featured: "popular",
    rating: 4.7,
    ratingCount: 780,
    modules: [
      {
        title: "AWS Core Services",
        lessons: [
          { title: "AWS Console & IAM", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, isFree: true },
          { title: "EC2 — Virtual Servers", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25, isFree: true },
          { title: "S3 — Object Storage", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
          { title: "VPC — Networking", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
        ],
      },
      {
        title: "Serverless & Databases",
        lessons: [
          { title: "AWS Lambda Functions", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 30 },
          { title: "API Gateway", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20 },
          { title: "RDS — Managed Databases", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25 },
          { title: "DynamoDB — NoSQL", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
        ],
      },
    ],
  });

  // ── Course 7: Project Management ──────────────────────────────────────────
  await createCourse({
    title: "Project Management Professional",
    slug: "project-management-professional",
    description: "Learn project management methodologies including Agile, Scrum, and PMP. Prepare for certification with real-world case studies and practical exercises.",
    shortDescription: "Master Agile, Scrum, and PMP methodologies for real-world project success.",
    gradient: "from-green-500 to-teal-500",
    categoryId: business.id,
    difficulty: "ADVANCED",
    totalHours: 25,
    price: 159,
    isFree: false,
    featured: "bestseller",
    rating: 4.8,
    ratingCount: 1560,
    modules: [
      {
        title: "Project Management Fundamentals",
        lessons: [
          { title: "What is Project Management?", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15, isFree: true },
          { title: "Project Lifecycle Phases", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, isFree: true },
          { title: "Stakeholder Management", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
          { title: "Risk Management", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
        ],
      },
      {
        title: "Agile & Scrum",
        lessons: [
          { title: "Agile Manifesto & Principles", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
          { title: "Scrum Framework", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25 },
          { title: "Sprint Planning & Retrospectives", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20 },
          { title: "Kanban Boards", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15 },
        ],
      },
    ],
  });

  // ── Course 8: Spanish for Beginners ──────────────────────────────────────
  await createCourse({
    title: "Spanish for Beginners",
    slug: "spanish-for-beginners",
    description: "Learn conversational Spanish with practical exercises and cultural insights. Covers pronunciation, essential vocabulary, grammar, and real conversations.",
    shortDescription: "Start speaking Spanish confidently with practical conversation skills.",
    gradient: "from-emerald-500 to-green-600",
    categoryId: languages.id,
    difficulty: "BEGINNER",
    totalHours: 10,
    price: 0,
    isFree: true,
    rating: 4.6,
    ratingCount: 530,
    modules: [
      {
        title: "Getting Started",
        lessons: [
          { title: "Spanish Pronunciation Guide", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 12, isFree: true },
          { title: "Basic Greetings & Introductions", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15, isFree: true },
          { title: "Numbers 1–100", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 10 },
          { title: "Colors and Descriptions", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 12 },
        ],
      },
      {
        title: "Essential Grammar",
        lessons: [
          { title: "Ser vs. Estar", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
          { title: "Present Tense Verbs", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
          { title: "Questions in Spanish", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15 },
          { title: "Common Phrases for Travel", type: "TEXT", duration: 10, content: "# Common Travel Phrases\n\n| Spanish | English |\n|---------|----------|\n| ¿Dónde está...? | Where is...? |\n| ¿Cuánto cuesta? | How much does it cost? |\n| Una mesa para dos | A table for two |\n| La cuenta, por favor | The bill, please |\n| ¿Habla inglés? | Do you speak English? |" },
        ],
      },
    ],
  });

  // ── Course 9: Yoga for Beginners ──────────────────────────────────────────
  await createCourse({
    title: "Yoga for Beginners",
    slug: "yoga-for-beginners",
    description: "Start your yoga journey with proper techniques and mindful practices for physical and mental wellbeing. Covers foundational poses, breathing, and meditation.",
    shortDescription: "Begin your yoga practice with safe, guided instruction for all levels.",
    gradient: "from-red-500 to-rose-600",
    categoryId: health.id,
    difficulty: "BEGINNER",
    totalHours: 8,
    price: 0,
    isFree: true,
    featured: "new",
    rating: 4.7,
    ratingCount: 410,
    modules: [
      {
        title: "Foundation Poses",
        lessons: [
          { title: "Mountain Pose & Breathing", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15, isFree: true },
          { title: "Sun Salutation Flow", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20, isFree: true },
          { title: "Warrior Series", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
          { title: "Balance Poses", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
        ],
      },
      {
        title: "Mindfulness & Meditation",
        lessons: [
          { title: "Pranayama Breathing", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15 },
          { title: "Guided Meditation (10 min)", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 12 },
          { title: "Yoga Nidra for Sleep", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20 },
          { title: "Building a Daily Practice", type: "TEXT", duration: 8, content: "# Building a Daily Yoga Practice\n\n## Start Small\n- 10–15 minutes per day is enough to begin\n- Morning practice energizes; evening practice relaxes\n\n## Consistency > Duration\nPractice 3 times per week consistently before adding more days.\n\n## Create Your Space\n- A quiet corner with a mat\n- Natural light if possible\n- Remove distractions" },
        ],
      },
    ],
  });

  // ── Course 10: TypeScript Advanced ────────────────────────────────────────
  await createCourse({
    title: "Advanced TypeScript",
    slug: "advanced-typescript",
    description: "Take your TypeScript skills to the next level with advanced types, generics, decorators, and architectural patterns used in large-scale applications.",
    shortDescription: "Master generics, utility types, decorators, and TypeScript architecture patterns.",
    gradient: "from-blue-600 to-indigo-700",
    categoryId: programming.id,
    difficulty: "ADVANCED",
    totalHours: 7,
    price: 89,
    isFree: false,
    rating: 4.7,
    ratingCount: 340,
    modules: [
      {
        title: "Advanced Types",
        lessons: [
          { title: "Generics Deep Dive", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 25, isFree: true },
          { title: "Conditional Types", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
          { title: "Mapped Types", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 20 },
          { title: "Template Literal Types", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 18 },
        ],
      },
      {
        title: "TypeScript in Practice",
        lessons: [
          { title: "Decorators", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 28 },
          { title: "Module Augmentation", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 15 },
          { title: "TypeScript with React", type: "VIDEO", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", duration: 22 },
          { title: "TypeScript Config Mastery", type: "TEXT", duration: 10, content: "# tsconfig.json Mastery\n\n## Key Options\n```json\n{\n  \"compilerOptions\": {\n    \"strict\": true,          // Enable all strict checks\n    \"noUncheckedIndexedAccess\": true, // Safer array/object access\n    \"exactOptionalPropertyTypes\": true,\n    \"noImplicitReturns\": true,\n    \"noFallthroughCasesInSwitch\": true\n  }\n}\n```\n\n`strict: true` enables 8 checks including `strictNullChecks` — always use it." },
        ],
      },
    ],
    quizzes: [
      {
        title: "TypeScript Generics Quiz",
        passingScore: 75,
        questions: [
          { text: "What is the purpose of generics in TypeScript?", options: [{ text: "To add runtime type checking", isCorrect: false }, { text: "To create reusable, type-safe components", isCorrect: true }, { text: "To replace interfaces", isCorrect: false }, { text: "To enable JavaScript interop", isCorrect: false }] },
          { text: "Which utility type makes all properties optional?", options: [{ text: "Required<T>", isCorrect: false }, { text: "Readonly<T>", isCorrect: false }, { text: "Partial<T>", isCorrect: true }, { text: "Pick<T, K>", isCorrect: false }] },
          { text: "What does `keyof T` produce?", options: [{ text: "All values of T", isCorrect: false }, { text: "A union of all property names of T", isCorrect: true }, { text: "An array of T's properties", isCorrect: false }, { text: "A copy of T", isCorrect: false }] },
        ],
      },
    ],
  });

  // ── Seed community discussions ────────────────────────────────────────────
  const demoStudent = await prisma.user.findUnique({ where: { clerkId: "demo_student_001" } });
  
  if (demoStudent) {
    const reactCourse = await prisma.course.findUnique({ where: { slug: "react-fundamentals" } });
    const tsCourse = await prisma.course.findUnique({ where: { slug: "advanced-typescript" } });

    const disc1 = await prisma.discussion.create({
      data: {
        title: "Best resources for learning React hooks?",
        content: "I've just completed the React Fundamentals course and I'm looking for additional resources to deepen my understanding of hooks. Any recommendations from the community?",
        authorId: demoStudent.id,
        courseId: reactCourse?.id,
        tags: JSON.stringify(["react", "hooks", "beginner"]),
        likes: 12,
        views: 87,
      },
    });

    await prisma.discussionReply.create({
      data: {
        content: "The official React docs are great! Also check out useHooks.com for custom hook recipes. The community there is very helpful.",
        authorId: instructor.id,
        discussionId: disc1.id,
        likes: 5,
      },
    });

    await prisma.discussion.create({
      data: {
        title: "How to handle async operations in useEffect correctly?",
        content: "I keep seeing issues with async functions inside useEffect. What's the proper pattern to avoid memory leaks and stale closures?",
        authorId: demoStudent.id,
        courseId: reactCourse?.id,
        tags: JSON.stringify(["react", "async", "useEffect"]),
        likes: 24,
        views: 156,
      },
    });

    await prisma.discussion.create({
      data: {
        title: "TypeScript generics are confusing — help!",
        content: "I'm working through the Advanced TypeScript course and the generics section is really challenging. Can someone explain contravariance vs covariance in simple terms?",
        authorId: demoStudent.id,
        courseId: tsCourse?.id,
        tags: JSON.stringify(["typescript", "generics"]),
        likes: 8,
        views: 52,
      },
    });

    await prisma.discussion.create({
      data: {
        title: "Introduce yourself! 👋",
        content: "Welcome to the BlockLearnX community! Share where you're from, what you're learning, and what your goals are. Let's connect!",
        authorId: instructor.id,
        tags: JSON.stringify(["community", "introductions"]),
        likes: 45,
        views: 312,
        isPinned: true,
      },
    });
  }

  console.log("✅ Seed complete!");
  console.log(`   📚 ${await prisma.course.count()} courses`);
  console.log(`   📁 ${await prisma.module.count()} modules`);
  console.log(`   📝 ${await prisma.lesson.count()} lessons`);
  console.log(`   ❓ ${await prisma.quiz.count()} quizzes`);
  console.log(`   👥 ${await prisma.user.count()} users`);
  console.log(`   🗨️ ${await prisma.discussion.count()} discussions`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

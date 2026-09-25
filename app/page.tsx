"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Users, 
  IndianRupee, 
  Plus, 
  Settings, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Search, 
  X, 
  Check, 
  GraduationCap, 
  Coins,
  Upload,
  Layers,
  Award,
  MoreVertical,
  Trash2,
  FileCode,
  FileText,
  HelpCircle,
  Video,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Play,
  Save,
  Eye,
  FileUp,
  Film,
  CheckCircle,
  AlertCircle,
  Cpu,
  Bot,
  ArrowDown,
  ShieldCheck,
  Code,
  Sliders,
  Send,
  UserCheck,
  Globe,
  ArrowRight,
  BarChart3,
  Activity,
  PieChart,
  Download,
  Flame,
  FileCheck,
  Wallet,
  CreditCard,
  ArrowUpRight,
  Receipt,
  DollarSign
} from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import dynamic from "next/dynamic";

const BlockchainPanel = dynamic(
  () => import("@/components/blockchain/BlockchainPanel").then(m => ({ default: m.BlockchainPanel })),
  { ssr: false }
);
const VideoRecorder = dynamic(
  () => import("@/components/course/VideoRecorder").then(m => ({ default: m.VideoRecorder })),
  { ssr: false }
);

export type CourseStatus = "Draft" | "Pending Approval" | "Published";

export interface CourseRevenueItem {
  id: string;
  course: string;
  sales: number;
  revenue: number;
  percentage: number;
  category: string;
  unitPrice: number;
}

export interface TransactionRecord {
  id: string;
  txHash: string;
  course: string;
  learner: string;
  amount: number;
  method: "UPI" | "USDC / Web3" | "Card";
  date: string;
  status: "Completed" | "Settled";
}

export interface LearnerRecord {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  score: number;
  status: "Completed" | "Learning" | "Dropped";
  tokensEarned: number;
  lastActive: string;
  quizScore: number;
  assignmentScore: number;
}

export interface RewardConfig {
  lessonCompletion: number;
  quizPass: number;
  assignmentPass: number;
  courseCompletion: number;
}

export interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  marks: number;
}

export interface QuizItem {
  id: string;
  title: string;
  questions: QuestionItem[];
  questionsCount: number;
  totalMarks: number;
  rewardMX: number;
}

export interface LessonItem {
  id: string;
  title: string;
  description?: string;
  videoName?: string;
  resourcePdfName?: string;
  type: "video" | "reading" | "lab";
  duration: string;
}

export interface AssignmentPart {
  id: string;
  partNumber: number;
  title: string;
  submissionType: "code" | "pdf" | "video" | "contract_address";
  instructions: string;
  maxMarks: number;
  aiRubric: string;
  starterCode?: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  placement: "module_end" | "attached_lesson" | "mid_course";
  attachedLessonId?: string;
  parts: AssignmentPart[];
  maxMarks: number;
  passingMarks: number;
  aiEvaluation: boolean;
  rewardMX: number;
  rubric?: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  lessons: LessonItem[];
  quizzes: QuizItem[];
  assignments: AssignmentItem[];
}

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  price: number;
  rewardTokens: number;
  rewardConfig: RewardConfig;
  thumbnail: string;
  learners: number;
  status: CourseStatus;
  adminFeedback?: string;
  rating: number;
  updatedAt: string;
  modules: ModuleItem[];
}

const DEFAULT_REWARDS: RewardConfig = {
  lessonCompletion: 5,
  quizPass: 10,
  assignmentPass: 50,
  courseCompletion: 100,
};

const DEFAULT_BLOCKCHAIN_MODULES: ModuleItem[] = [
  {
    id: "mod-1",
    title: "Module 1",
    lessons: [
      { 
        id: "les-1", 
        title: "Lesson 1: What is Blockchain?", 
        description: "Blockchain is a decentralized, distributed, and immutable digital ledger technology that records transactions across a network of computers.",
        videoName: "what_is_blockchain_hd.mp4",
        resourcePdfName: "module1_blockchain_intro.pdf",
        type: "video", 
        duration: "20 minutes" 
      },
      { 
        id: "les-2", 
        title: "Lesson 2: Blocks & Hashes", 
        description: "Deep dive into cryptographic hashing algorithms (SHA-256), block headers, and merkle roots.",
        videoName: "blocks_and_hashes.mp4",
        resourcePdfName: "cryptography_basics.pdf",
        type: "video", 
        duration: "18 minutes" 
      },
    ],
    quizzes: [
      { 
        id: "quiz-1", 
        title: "Quiz: Blockchain Basics", 
        questions: [
          {
            id: "q-1",
            question: "What is a blockchain?",
            options: [
              "Centralized database",
              "Distributed ledger",
              "Email system",
              "Operating system"
            ],
            correctIndex: 1,
            marks: 10
          }
        ],
        questionsCount: 1, 
        totalMarks: 10,
        rewardMX: 10 
      },
    ],
    assignments: [],
  },
  {
    id: "mod-2",
    title: "Module 2",
    lessons: [
      { 
        id: "les-3", 
        title: "Lesson 3: Wallets", 
        description: "Understanding asymmetric key cryptography, public addresses, seed phrases, and HD wallet derivation paths.",
        videoName: "crypto_wallets_guide.mp4",
        type: "video", 
        duration: "15 minutes" 
      },
      { 
        id: "les-4", 
        title: "Lesson 4: Transactions", 
        description: "How Ethereum and EVM transactions are signed, nonce ordering, gas fees (EIP-1559), and mempool lifecycle.",
        videoName: "transactions_and_gas.mp4",
        type: "video", 
        duration: "20 minutes" 
      },
    ],
    quizzes: [
      { 
        id: "quiz-2", 
        title: "Quiz: Wallets & Signatures", 
        questions: [
          {
            id: "q-2",
            question: "What is required to sign an Ethereum transaction?",
            options: ["Public Address", "Private Key", "Miner Nonce", "IP Address"],
            correctIndex: 1,
            marks: 10
          }
        ],
        questionsCount: 1, 
        totalMarks: 10,
        rewardMX: 10 
      },
    ],
    assignments: [],
  },
  {
    id: "mod-3",
    title: "Module 3",
    lessons: [
      { 
        id: "les-5", 
        title: "Lesson 5: Smart Contracts", 
        description: "Turing-complete smart contracts in Solidity: structure, storage vs memory, functions, and events.",
        type: "lab", 
        duration: "35 minutes" 
      },
    ],
    quizzes: [],
    assignments: [
      { 
        id: "assign-1", 
        title: "Assignment: Build a Simple Smart Contract", 
        description: "Create a Solidity contract that stores and retrieves a user's name.",
        maxMarks: 100,
        passingMarks: 60,
        aiEvaluation: true,
        rewardMX: 50,
        rubric: "Solidity 0.8.20+, gas-optimized getter/setter, input validation"
      },
    ],
  },
];

const INITIAL_COURSES: CourseItem[] = [
  {
    id: "blockchain-fundamentals",
    title: "Blockchain Fundamentals",
    description: "Learn blockchain from basics to smart contracts, consensus protocols, and Web3 security.",
    category: "Blockchain",
    level: "Beginner",
    price: 999,
    rewardTokens: 100,
    rewardConfig: DEFAULT_REWARDS,
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=340&fit=crop&auto=format",
    learners: 128,
    status: "Published",
    rating: 4.9,
    updatedAt: "2 days ago",
    modules: DEFAULT_BLOCKCHAIN_MODULES,
  },
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Introduction to neural networks, prompt engineering, LLM architectures, and autonomous AI agents.",
    category: "Artificial Intelligence",
    level: "Beginner",
    price: 799,
    rewardTokens: 80,
    rewardConfig: DEFAULT_REWARDS,
    thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=340&fit=crop&auto=format",
    learners: 76,
    status: "Draft",
    rating: 4.8,
    updatedAt: "Just now",
    modules: [],
  },
  {
    id: "smart-contract-security",
    title: "Smart Contract Security & Auditing",
    description: "Master formal verification, reentrancy defense, and live vulnerability exploit prevention on EVM.",
    category: "Security",
    level: "Advanced",
    price: 1499,
    rewardTokens: 250,
    rewardConfig: DEFAULT_REWARDS,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop&auto=format",
    learners: 54,
    status: "Pending Approval",
    rating: 4.95,
    updatedAt: "1 week ago",
    modules: [],
  },
];

const DEFAULT_LEARNERS: LearnerRecord[] = [
  {
    id: "l-1",
    name: "Arun",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    progress: 100,
    score: 92,
    status: "Completed",
    tokensEarned: 100,
    lastActive: "2 hours ago",
    quizScore: 94,
    assignmentScore: 90
  },
  {
    id: "l-2",
    name: "Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    progress: 70,
    score: 81,
    status: "Learning",
    tokensEarned: 70,
    lastActive: "5 hours ago",
    quizScore: 84,
    assignmentScore: 78
  },
  {
    id: "l-3",
    name: "Priya",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    progress: 40,
    score: 75,
    status: "Learning",
    tokensEarned: 40,
    lastActive: "1 day ago",
    quizScore: 78,
    assignmentScore: 72
  },
  {
    id: "l-4",
    name: "Rohan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    progress: 100,
    score: 96,
    status: "Completed",
    tokensEarned: 100,
    lastActive: "3 days ago",
    quizScore: 98,
    assignmentScore: 94
  },
  {
    id: "l-5",
    name: "Sneha",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    progress: 15,
    score: 58,
    status: "Dropped",
    tokensEarned: 10,
    lastActive: "2 weeks ago",
    quizScore: 60,
    assignmentScore: 56
  },
  {
    id: "l-6",
    name: "Vikram",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    progress: 85,
    score: 88,
    status: "Learning",
    tokensEarned: 85,
    lastActive: "4 hours ago",
    quizScore: 88,
    assignmentScore: 88
  }
];

const REVENUE_BREAKDOWN: CourseRevenueItem[] = [
  {
    id: "rev-1",
    course: "Blockchain Basics",
    sales: 80,
    revenue: 79920,
    percentage: 64,
    category: "Blockchain",
    unitPrice: 999
  },
  {
    id: "rev-2",
    course: "Web3 Development",
    sales: 45,
    revenue: 44955,
    percentage: 36,
    category: "Smart Contracts",
    unitPrice: 999
  }
];

const DUMMY_TRANSACTIONS: TransactionRecord[] = [
  { id: "tx-101", txHash: "0x7f9a...3b21", course: "Blockchain Basics", learner: "Arun Kumar", amount: 999, method: "UPI", date: "Just now", status: "Completed" },
  { id: "tx-102", txHash: "0x3e1c...99a4", course: "Web3 Development", learner: "Sneha Patel", amount: 999, method: "USDC / Web3", date: "25 mins ago", status: "Settled" },
  { id: "tx-103", txHash: "0x91d2...a841", course: "Blockchain Basics", learner: "Rohan Verma", amount: 999, method: "UPI", date: "1 hour ago", status: "Completed" },
  { id: "tx-104", txHash: "0x82cb...f120", course: "Blockchain Basics", learner: "Priya Sharma", amount: 999, method: "Card", date: "3 hours ago", status: "Completed" },
  { id: "tx-105", txHash: "0x44fa...77cd", course: "Web3 Development", learner: "Vikram Malhotra", amount: 999, method: "USDC / Web3", date: "5 hours ago", status: "Settled" },
];

export default function ProviderPortalPage() {
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [filter, setFilter] = useState<"All" | "Published" | "Pending Approval" | "Draft">("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Navigation: Dashboard vs Course Builder vs Analytics vs Revenue
  const [activeView, setActiveView] = useState<"dashboard" | "builder" | "analytics" | "revenue" | "blockchain">("dashboard");
  const [currentBuilderCourse, setCurrentBuilderCourse] = useState<CourseItem>(courses[0]);
  const [selectedAnalyticsCourse, setSelectedAnalyticsCourse] = useState<CourseItem>(courses[0]);

  // Step 10 Revenue state
  const [revenueItems, setRevenueItems] = useState<CourseRevenueItem[]>(REVENUE_BREAKDOWN);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(DUMMY_TRANSACTIONS);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);

  // Step 9 Learner analytics state
  const [learners, setLearners] = useState<LearnerRecord[]>(DEFAULT_LEARNERS);
  const [learnerFilter, setLearnerFilter] = useState<"All" | "Completed" | "Learning" | "Dropped">("All");
  const [learnerSearchQuery, setLearnerSearchQuery] = useState("");

  // Step 2 Create Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("Blockchain Fundamentals");
  const [formDescription, setFormDescription] = useState("Learn blockchain from basics to smart contracts, consensus protocols, and Web3 security.");
  const [formCategory, setFormCategory] = useState("Blockchain");
  const [formLevel, setFormLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "All Levels">("Beginner");
  const [formPrice, setFormPrice] = useState("999");
  const [formRewardTokens, setFormRewardTokens] = useState("100");
  const [formThumbnail, setFormThumbnail] = useState("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=340&fit=crop&auto=format");
  const [customThumbnailName, setCustomThumbnailName] = useState("");

  // Modals state
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false);
  const [isAddAssignmentModalOpen, setIsAddAssignmentModalOpen] = useState(false);
  const [isRewardConfigModalOpen, setIsRewardConfigModalOpen] = useState(false);
  const [isAdminApprovalModalOpen, setIsAdminApprovalModalOpen] = useState(false);

  const [selectedLessonPreview, setSelectedLessonPreview] = useState<LessonItem | null>(null);
  const [previewQuiz, setPreviewQuiz] = useState<QuizItem | null>(null);
  const [previewAssignment, setPreviewAssignment] = useState<AssignmentItem | null>(null);

  // Step 7 — Reward Configuration state
  const [rewardLesson, setRewardLesson] = useState(5);
  const [rewardQuiz, setRewardQuiz] = useState(10);
  const [rewardAssignment, setRewardAssignment] = useState(50);
  const [rewardCourse, setRewardCourse] = useState(100);

  // Step 4 — Add Lesson Form state
  const [targetModuleId, setTargetModuleId] = useState<string>("mod-1");
  const [lessonTitle, setLessonTitle] = useState("What is Blockchain?");
  const [lessonDescription, setLessonDescription] = useState("Blockchain is a decentralized, distributed, and immutable digital ledger technology.");
  const [lessonDuration, setLessonDuration] = useState("20 minutes");
  const [lessonVideoName, setLessonVideoName] = useState("what_is_blockchain_intro.mp4");
  const [lessonPdfName, setLessonPdfName] = useState("blockchain_basics_guide.pdf");
  const [lessonVideoBlobUrl, setLessonVideoBlobUrl] = useState<string | null>(null); // recorded/uploaded blob

  // Step 5 — Create Quiz Form state
  const [quizTitle, setQuizTitle] = useState("Quiz: Blockchain Basics");
  const [quizQuestions, setQuizQuestions] = useState<QuestionItem[]>([
    {
      id: "q-1",
      question: "What is a blockchain?",
      options: [
        "Centralized database",
        "Distributed ledger",
        "Email system",
        "Operating system"
      ],
      correctIndex: 1,
      marks: 10
    }
  ]);
  const [quizRewardMX, setQuizRewardMX] = useState("10");
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null); // null = new quiz

  // Step 6 — Create Assignment Form state (Fully customizable multi-part assignments)
  const [assignmentTitle, setAssignmentTitle] = useState("Smart Contract Audit & Deployment");
  const [assignmentDescription, setAssignmentDescription] = useState("Multi-part practical assignment: Submit your Solidity code, security audit report, and live deployment tx hash.");
  const [assignmentPlacement, setAssignmentPlacement] = useState<"module_end" | "attached_lesson" | "mid_course">("module_end");
  const [assignmentAttachedLessonId, setAssignmentAttachedLessonId] = useState<string>("");
  const [assignmentPassingMarks, setAssignmentPassingMarks] = useState("60");
  const [assignmentAiEnabled, setAssignmentAiEnabled] = useState(true);
  const [assignmentRewardMX, setAssignmentRewardMX] = useState("50");
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null);

  const [assignmentParts, setAssignmentParts] = useState<AssignmentPart[]>([
    {
      id: "part-1",
      partNumber: 1,
      title: "Part 1: Smart Contract Code Implementation",
      submissionType: "code",
      instructions: "Write an EVM-compatible ERC-20 staking contract with rewards distribution mechanism.",
      maxMarks: 50,
      aiRubric: "Syntax correctness, gas optimization, safe math usage, reentrancy guards",
      starterCode: "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract StakingVault {\n  // Implement staking logic here\n}",
    },
    {
      id: "part-2",
      partNumber: 2,
      title: "Part 2: Security Audit Report",
      submissionType: "pdf",
      instructions: "Perform a static analysis & manual audit of your contract. Submit report in PDF format.",
      maxMarks: 30,
      aiRubric: "Identification of vulnerability vectors, Slither tool results, mitigation recommendations",
    },
    {
      id: "part-3",
      partNumber: 3,
      title: "Part 3: Video Demonstration & Live Tx Hash",
      submissionType: "video",
      instructions: "Record a short 2-minute video walkthrough of your deployed contract interacting on testnet.",
      maxMarks: 20,
      aiRubric: "Clarity of demonstration, verified transaction hash link on Etherscan/Blockscout",
    },
  ]);

  // Other item form states
  const [newModuleName, setNewModuleName] = useState("");

  // Filtered courses for Dashboard
  const filteredCourses = courses.filter((c) => {
    const matchesFilter = filter === "All" ? true : c.status === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Derived metrics
  const totalCourses = courses.length;
  const publishedCourses = courses.filter((c) => c.status === "Published").length;
  const pendingCourses = courses.filter((c) => c.status === "Pending Approval").length;
  const totalLearners = 128;
  const totalRevenue = 45000;

  // Direct Provider Publishing (No Admin Approval Required)
  const handleTogglePublish = (courseId: string) => {
    const updatedCourses = courses.map((c) => {
      if (c.id === courseId) {
        const nextStatus: CourseStatus = c.status === "Published" ? "Draft" : "Published";
        return { ...c, status: nextStatus };
      }
      return c;
    });

    setCourses(updatedCourses);
    if (currentBuilderCourse.id === courseId) {
      const nextStatus: CourseStatus = currentBuilderCourse.status === "Published" ? "Draft" : "Published";
      setCurrentBuilderCourse({ ...currentBuilderCourse, status: nextStatus });
    }

    const currentStatus = courses.find((c) => c.id === courseId)?.status;
    if (currentStatus === "Published") {
      alert(`Course moved back to "Draft" mode.`);
    } else {
      alert(`🚀 Course published live directly! Learners can now enroll and attempt lessons.`);
    }
  };

  const updateBuilderCourse = (updated: CourseItem) => {
    setCurrentBuilderCourse(updated);
    setCourses(courses.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteModule = (modId: string) => {
    const updated = {
      ...currentBuilderCourse,
      modules: currentBuilderCourse.modules.filter((m) => m.id !== modId),
    };
    updateBuilderCourse(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <Navbar />

      {/* ========================================================================= */}
      {/* 1. VIEW: PROVIDER DASHBOARD (WITH STEP 8 WORKFLOW TRACKER)                */}
      {/* ========================================================================= */}
      {activeView === "dashboard" && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 bg-blue-100/70 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  Instructor Portal
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Provider
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                Provider Dashboard
              </h1>
              <p className="text-slate-600 text-base sm:text-lg font-medium mt-1">
                Welcome, <span className="font-bold text-blue-600">Omar 👋</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedAnalyticsCourse(courses[0]);
                  setActiveView("analytics");
                }}
                className="px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 shadow-sm transition-all flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => setActiveView("revenue")}
                className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 shadow-sm transition-all flex items-center gap-2"
              >
                <IndianRupee className="w-4 h-4 text-amber-600" />
                <span>Step 10 Revenue (₹124,875)</span>
              </button>

              <button
                onClick={() => setActiveView("blockchain")}
                className="px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs rounded-xl border border-purple-300 shadow-sm transition-all flex items-center gap-2"
              >
                <Coins className="w-4 h-4 text-purple-600" />
                <span>⛓ Blockchain</span>
              </button>

              <button
                onClick={() => setIsAdminApprovalModalOpen(true)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Desk ({pendingCourses})</span>
              </button>

              <button
                onClick={() => {
                  setFormTitle("Blockchain Fundamentals");
                  setFormDescription("Learn blockchain from basics to smart contracts, consensus protocols, and Web3 security.");
                  setFormCategory("Blockchain");
                  setFormLevel("Beginner");
                  setFormPrice("999");
                  setFormRewardTokens("100");
                  setIsCreateModalOpen(true);
                }}
                className="px-6 py-3 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                <span>Create Course</span>
              </button>
            </div>
          </div>

          {/* STEP 8: WORKFLOW BANNER (PROVIDER -> ADMIN -> LEARNER) */}
          <div className="my-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Publishing Lifecycle Workflow</h4>
                  <p className="text-xs text-slate-500">Course Provider → Admin Review → Published to Learners</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">1. Draft</span>
                <span className="text-slate-300">→</span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">2. Pending Approval</span>
                <span className="text-slate-300">→</span>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-lg">3. Admin Approval</span>
                <span className="text-slate-300">→</span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">4. Published Live</span>
              </div>
            </div>
          </div>

          {/* METRIC STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Total Courses</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">{totalCourses}</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">All time</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Published Courses</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-emerald-600">{publishedCourses}</span>
                <span className="text-xs font-bold text-slate-400">of {totalCourses} live</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Total Learners</span>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">{totalLearners}</span>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +24%
                </span>
              </div>
            </div>

            <div
              onClick={() => setActiveView("revenue")}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide group-hover:text-amber-700">Total Revenue</span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <IndianRupee className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-amber-900">₹124,875</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  125 sales
                </span>
              </div>
            </div>
          </div>

          {/* MY COURSES SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">My Courses</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Manage your curriculum, enrollment fees, reward tokens, and live learner statistics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search course..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 w-44 sm:w-56"
                  />
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  {(["All", "Published", "Pending Approval", "Draft"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filter === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-200 relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-900">{course.title}</h3>
                        
                        {/* Status Badges */}
                        {course.status === "Published" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Published
                          </span>
                        )}
                        {course.status === "Pending Approval" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600 animate-spin" /> Pending Approval
                          </span>
                        )}
                        {course.status === "Draft" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
                            Draft
                          </span>
                        )}

                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                          {course.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 text-slate-700">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <strong className="text-slate-900">{course.learners}</strong> learners
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                          <strong className="text-slate-900">₹{course.price}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                          <Coins className="w-3.5 h-3.5 text-amber-500" />
                          {course.rewardConfig?.courseCompletion || 100} MX Bounty
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Workflow Triggers */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    
                    {course.status === "Draft" && (
                      <button
                        onClick={() => handleSubmitForApproval(course.id)}
                        className="px-4 py-2.5 bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>[Publish Course]</span>
                      </button>
                    )}

                    {course.status === "Pending Approval" && (
                      <button
                        onClick={() => setIsAdminApprovalModalOpen(true)}
                        className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Admin Review</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedAnalyticsCourse(course);
                        setActiveView("analytics");
                      }}
                      className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Analytics</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentBuilderCourse(course);
                        setRewardLesson(course.rewardConfig?.lessonCompletion || 5);
                        setRewardQuiz(course.rewardConfig?.quizPass || 10);
                        setRewardAssignment(course.rewardConfig?.assignmentPass || 50);
                        setRewardCourse(course.rewardConfig?.courseCompletion || 100);
                        setActiveView("builder");
                      }}
                      className={`px-5 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 ${
                        course.status === "Published" 
                          ? "bg-slate-900 hover:bg-slate-800 text-white" 
                          : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {course.status === "Published" ? (
                        <>
                          <Settings className="w-3.5 h-3.5" />
                          <span>Manage</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Builder</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW: COURSE BUILDER (WITH STEP 8 PUBLISH WORKFLOW)                    */}
      {/* ========================================================================= */}
      {activeView === "builder" && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* BUILDER NAVIGATION HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <button
                onClick={() => setActiveView("dashboard")}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Provider Dashboard
              </button>

              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  {currentBuilderCourse.title}
                </h1>
                
                {/* Status Badges */}
                {currentBuilderCourse.status === "Published" && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Published Live
                  </span>
                )}
                {currentBuilderCourse.status === "Published" ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Published Live
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
                    Draft Mode
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Structure your modules, video lessons, quizzes, and publish your course directly to learners.
              </p>
            </div>

            {/* Top Toolbar Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* DIRECT PROVIDER PUBLISH BUTTON */}
              <button
                onClick={() => handleTogglePublish(currentBuilderCourse.id)}
                className={`px-5 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
                  currentBuilderCourse.status === "Published"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-[#0056D2] hover:bg-[#00419e] text-white"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {currentBuilderCourse.status === "Published" ? "✓ Published Live (Unpublish)" : "🚀 Publish Course Direct"}
                </span>
              </button>

              <button
                onClick={() => setIsRewardConfigModalOpen(true)}
                className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Coins className="w-4 h-4 text-amber-600" />
                <span>Rewards ({currentBuilderCourse.rewardConfig?.courseCompletion || 100} MX)</span>
              </button>

              <button
                onClick={() => {
                  setNewModuleName(`Module ${currentBuilderCourse.modules.length + 1}`);
                  setIsAddModuleModalOpen(true);
                }}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Module</span>
              </button>
            </div>
          </div>

          {/* WORKFLOW VISUAL STATUS STEPPER (DIRECT PROVIDER PIPELINE) */}
          <div className="my-6 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
              Course Publishing Pipeline Status:
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className={`p-4 rounded-xl border text-center transition-all ${
                currentBuilderCourse.status === "Draft"
                  ? "bg-blue-50 border-blue-300 text-blue-900 font-black shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                <span className="text-[11px] uppercase tracking-wide block text-slate-400">Step 1</span>
                <span className="text-sm font-bold mt-0.5 block">1. Draft &amp; Structure Content</span>
              </div>

              <div className={`p-4 rounded-xl border text-center transition-all ${
                currentBuilderCourse.status === "Published"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-black shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                <span className="text-[11px] uppercase tracking-wide block text-slate-400">Step 2</span>
                <span className="text-sm font-bold mt-0.5 block">2. Published Live to Learner Catalog</span>
              </div>

            </div>
          </div>

          {/* COURSE BUILDER TREE STRUCTURE */}
          <div className="mt-8 space-y-6">
            
            {currentBuilderCourse.modules.map((module, modIndex) => (
              <div
                key={module.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
              >
                
                {/* MODULE HEADER BAR */}
                <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                      {modIndex + 1}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">
                        {module.title}
                      </h2>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {module.lessons.length} Lessons • {module.quizzes.length} Quizzes • {module.assignments.length} Assignments
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setTargetModuleId(module.id);
                        setIsAddLessonModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Lesson
                    </button>

                    <button
                      onClick={() => {
                        setTargetModuleId(module.id);
                        setEditingQuizId(null);
                        setQuizTitle("Quiz: " + module.title);
                        setQuizQuestions([{ id: "q-" + Date.now(), question: "", options: ["", "", "", ""], correctIndex: 0, marks: 10 }]);
                        setQuizRewardMX("10");
                        setIsAddQuizModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Quiz
                    </button>

                    <button
                      onClick={() => {
                        setTargetModuleId(module.id);
                        setIsAddAssignmentModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Assignment
                    </button>

                    <button
                      onClick={() => deleteModule(module.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors ml-2"
                      title="Delete Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* MODULE TREE ITEMS */}
                <div className="p-6 font-mono text-sm">
                  <div className="space-y-3">
                    
                    {/* 1. Lessons Tree Items */}
                    {module.lessons.map((lesson, idx) => {
                      const isLastItem = 
                        idx === module.lessons.length - 1 &&
                        module.quizzes.length === 0 &&
                        module.assignments.length === 0;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setSelectedLessonPreview(lesson)}
                          className="flex items-center justify-between group py-2 px-3 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 font-sans">
                            <span className="text-slate-400 font-mono text-xs select-none">
                              {isLastItem ? "└──" : "├──"}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center shrink-0 border border-blue-100">
                              <Video className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {lesson.title}
                                </span>
                                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                  {lesson.duration}
                                </span>
                                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                  +{currentBuilderCourse.rewardConfig?.lessonCompletion || 5} MX
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const updated = {
                                  ...currentBuilderCourse,
                                  modules: currentBuilderCourse.modules.map((m) =>
                                    m.id === module.id
                                      ? { ...m, lessons: m.lessons.filter((l) => l.id !== lesson.id) }
                                      : m
                                  ),
                                };
                                updateBuilderCourse(updated);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* 2. Quizzes Tree Items (Step 5) */}
                    {module.quizzes.map((quiz, qIdx) => {
                      const isLastItem = 
                        qIdx === module.quizzes.length - 1 &&
                        module.assignments.length === 0;

                      return (
                        <div
                          key={quiz.id}
                          className="flex items-center justify-between group py-2 px-3 rounded-xl hover:bg-amber-50/70 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 font-sans">
                            <span className="text-slate-400 font-mono text-xs select-none">
                              {isLastItem ? "└──" : "├──"}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                              <HelpCircle className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                                  {quiz.title}
                                </span>
                                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                                  {quiz.questionsCount} Qs • {quiz.totalMarks || 10} Marks
                                </span>
                                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                  +{currentBuilderCourse.rewardConfig?.quizPass || 10} MX
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Pre-populate quiz form with this quiz's data
                                setEditingQuizId(quiz.id);
                                setTargetModuleId(module.id);
                                setQuizTitle(quiz.title);
                                setQuizQuestions(quiz.questions && quiz.questions.length > 0 ? quiz.questions : [
                                  { id: "q-" + Date.now(), question: "", options: ["", "", "", ""], correctIndex: 0, marks: 10 }
                                ]);
                                setQuizRewardMX(String(quiz.rewardMX || 10));
                                setIsAddQuizModalOpen(true);
                              }}
                              className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-all"
                            >
                              <Edit3 className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const updated = {
                                  ...currentBuilderCourse,
                                  modules: currentBuilderCourse.modules.map((m) =>
                                    m.id === module.id
                                      ? { ...m, quizzes: m.quizzes.filter((q) => q.id !== quiz.id) }
                                      : m
                                  ),
                                };
                                updateBuilderCourse(updated);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* 3. Assignments Tree Items (Step 6) */}
                    {module.assignments.map((assignment, aIdx) => {
                      const isLastItem = aIdx === module.assignments.length - 1;

                      return (
                        <div
                          key={assignment.id}
                          onClick={() => setPreviewAssignment(assignment)}
                          className="flex items-center justify-between group py-2 px-3 rounded-xl hover:bg-purple-50/80 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 font-sans">
                            <span className="text-slate-400 font-mono text-xs select-none">
                              {isLastItem ? "└──" : "├──"}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
                                  {assignment.title}
                                </span>
                                <span className="text-[11px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" /> AI Evaluated ({assignment.maxMarks} Marks)
                                </span>
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                  +{currentBuilderCourse.rewardConfig?.assignmentPass || 50} MX Payout
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-purple-700 group-hover:underline">
                              Test AI Flow →
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const updated = {
                                  ...currentBuilderCourse,
                                  modules: currentBuilderCourse.modules.map((m) =>
                                    m.id === module.id
                                      ? { ...m, assignments: m.assignments.filter((a) => a.id !== assignment.id) }
                                      : m
                                  ),
                                };
                                updateBuilderCourse(updated);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>

              </div>
            ))}

            {/* Bottom Quick-Add Toolbar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 pb-12">
              
              {currentBuilderCourse.status === "Draft" ? (
                <button
                  onClick={() => handleSubmitForApproval(currentBuilderCourse.id)}
                  className="px-7 py-3 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>[Publish Course]</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsAdminApprovalModalOpen(true)}
                  className="px-7 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>[Admin Approval Desk]</span>
                </button>
              )}

              <button
                onClick={() => setIsRewardConfigModalOpen(true)}
                className="px-6 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Coins className="w-4 h-4 text-amber-600" />
                <span>[Configure Rewards]</span>
              </button>

              <button
                onClick={() => {
                  setNewModuleName(`Module ${currentBuilderCourse.modules.length + 1}`);
                  setIsAddModuleModalOpen(true);
                }}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>[+ Add Module]</span>
              </button>

              <button
                onClick={() => {
                  if (currentBuilderCourse.modules.length > 0) {
                    setTargetModuleId(currentBuilderCourse.modules[0].id);
                  }
                  setIsAddLessonModalOpen(true);
                }}
                className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-blue-600" />
                <span>[+ Add Lesson]</span>
              </button>

              <button
                onClick={() => {
                  if (currentBuilderCourse.modules.length > 0) {
                    setTargetModuleId(currentBuilderCourse.modules[0].id);
                  }
                  setIsAddQuizModalOpen(true);
                }}
                className="px-6 py-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-amber-600" />
                <span>[+ Add Quiz]</span>
              </button>
            </div>

          </div>

        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. VIEW: COURSE ANALYTICS (STEP 9)                                        */}
      {/* ========================================================================= */}
      {activeView === "analytics" && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* HEADER & COURSE SELECTOR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <button
                onClick={() => setActiveView("dashboard")}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </button>

              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  Course Analytics
                </h1>
                <span className="px-3 py-1 bg-blue-100 text-[#0056D2] font-black text-xs rounded-full uppercase tracking-wider">
                  Step 9 Live Metrics
                </span>
              </div>
              <p className="text-sm text-slate-600 font-bold mt-1">
                Course: <span className="text-[#0056D2]">{selectedAnalyticsCourse.title}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCurrentBuilderCourse(selectedAnalyticsCourse);
                  setActiveView("builder");
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Open in Builder</span>
              </button>
              <button
                onClick={() => alert("Downloading comprehensive learner performance analytics CSV report...")}
                className="px-4 py-2.5 bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* STEP 9: 7 CORE KPI METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
            
            {/* Total Learners */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Learners</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">128</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">+18 this month</span>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Completed</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black text-emerald-600">72</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">56.25% Completion</span>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">In Progress</span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black text-amber-600">41</span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">32.03% Active</span>
              </div>
            </div>

            {/* Dropped */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Dropped</span>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black text-slate-600">15</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">11.72% Dropoff</span>
              </div>
            </div>

          </div>

          {/* SECONDARY ROW: SCORES & REVENUE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            
            {/* Average Quiz Score */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 rounded-3xl border border-blue-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">Average Quiz Score</span>
                  <div className="text-3xl sm:text-4xl font-black text-blue-700 mt-2">82%</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                  <HelpCircle className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-blue-200/60 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                </div>
                <p className="text-xs text-blue-800 font-semibold mt-2">
                  Target pass threshold: 70% • <strong>+12% Above Average</strong>
                </p>
              </div>
            </div>

            {/* Average Assignment Score */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50/50 p-6 rounded-3xl border border-purple-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">Average Assignment</span>
                  <div className="text-3xl sm:text-4xl font-black text-purple-700 mt-2">78%</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20">
                  <Bot className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-purple-200/60 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="text-xs text-purple-800 font-semibold mt-2">
                  AI Evaluated Smart Contract submissions • <strong>60% Pass Mark</strong>
                </p>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 rounded-3xl border border-amber-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">Course Revenue</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-900 mt-2">₹45,000</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-900 pt-2 border-t border-amber-200/60">
                <span>128 Enrolled @ ₹999</span>
                <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-amber-300 text-amber-800">
                  <Coins className="w-3.5 h-3.5 text-amber-600" /> 14,200 MX Bounty Distributed
                </span>
              </div>
            </div>

          </div>

          {/* LEARNER PROGRESS FUNNEL BAR */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Learner Retention & Funnel Distribution</h3>
                <p className="text-xs text-slate-500">Real-time status breakdown across all 128 registered learners</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-700"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Completed (72)</span>
                <span className="flex items-center gap-1.5 text-amber-700"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Learning (41)</span>
                <span className="flex items-center gap-1.5 text-slate-600"><span className="w-3 h-3 rounded-full bg-slate-400"></span> Dropped (15)</span>
              </div>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div className="bg-emerald-500 h-full" style={{ width: "56.25%" }} title="Completed: 72 (56.25%)"></div>
              <div className="bg-amber-400 h-full" style={{ width: "32.03%" }} title="In Progress: 41 (32.03%)"></div>
              <div className="bg-slate-300 h-full" style={{ width: "11.72%" }} title="Dropped: 15 (11.72%)"></div>
            </div>
          </div>

          {/* STEP 9: LEARNER DETAILS TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Learner Details</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Individual learner progress, quiz scores, AI assignment evaluations, and MX token rewards.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search learner..."
                    value={learnerSearchQuery}
                    onChange={(e) => setLearnerSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 w-44 sm:w-52 font-medium"
                  />
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  {(["All", "Completed", "Learning", "Dropped"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setLearnerFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        learnerFilter === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Learner</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">MX Tokens</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {learners
                    .filter((l) => {
                      const matchesTab = learnerFilter === "All" ? true : l.status === learnerFilter;
                      const matchesSearch = l.name.toLowerCase().includes(learnerSearchQuery.toLowerCase());
                      return matchesTab && matchesSearch;
                    })
                    .map((learner) => (
                      <tr key={learner.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        {/* Learner Name & Avatar */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={learner.avatar}
                              alt={learner.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
                            />
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{learner.name}</div>
                              <div className="text-[11px] text-slate-400 font-medium">Active {learner.lastActive}</div>
                            </div>
                          </div>
                        </td>

                        {/* Progress */}
                        <td className="px-6 py-4">
                          <div className="w-36">
                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                              <span>{learner.progress}%</span>
                              <span className="text-slate-400">{learner.progress === 100 ? "All Modules" : `${Math.round(learner.progress / 33)} / 3 Mods`}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-2 rounded-full ${
                                  learner.progress === 100
                                    ? "bg-emerald-500"
                                    : learner.progress >= 50
                                    ? "bg-blue-600"
                                    : "bg-amber-500"
                                }`}
                                style={{ width: `${learner.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* Score */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`text-base font-black ${
                              learner.score >= 90
                                ? "text-emerald-600"
                                : learner.score >= 75
                                ? "text-blue-700"
                                : "text-amber-700"
                            }`}>
                              {learner.score}
                            </span>
                            <span className="text-[11px] text-slate-400">/ 100</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                            Quiz: {learner.quizScore}% • AI Code: {learner.assignmentScore}%
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          {learner.status === "Completed" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Completed
                            </span>
                          )}
                          {learner.status === "Learning" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              Learning
                            </span>
                          )}
                          {learner.status === "Dropped" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-300">
                              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                              Dropped
                            </span>
                          )}
                        </td>

                        {/* MX Tokens */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black bg-amber-50 text-amber-900 border border-amber-200">
                            <Coins className="w-3.5 h-3.5 text-amber-600" />
                            +{learner.tokensEarned} MX
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => alert(`Viewing submission history for ${learner.name}:\n• Progress: ${learner.progress}%\n• Quiz Score: ${learner.quizScore}%\n• AI Smart Contract Assignment: ${learner.assignmentScore}%\n• MX Bounties Claimed: ${learner.tokensEarned} MX`)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                          >
                            Details
                          </button>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>

        </main>
      )}

      {/* ========================================================================= */}
      {/* 4. VIEW: REVENUE & FINANCIAL LEDGER (STEP 10)                             */}
      {/* ========================================================================= */}
      {activeView === "revenue" && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <button
                onClick={() => setActiveView("dashboard")}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </button>

              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  Course Revenue
                </h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-full uppercase tracking-wider">
                  Step 10 Earnings Ledger
                </span>
              </div>
              <p className="text-sm text-slate-600 font-medium mt-1">
                Real-time breakdown of course enrollments, sales volume, and simulated hackathon transactions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => alert("Simulated Payout: ₹124,875 successfully transferred to Provider's verified bank account / Web3 payout wallet!")}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Withdraw Payout (₹124,875)</span>
              </button>
              <button
                onClick={() => alert("Downloading official GST statement & revenue tax invoice...")}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Invoice</span>
              </button>
            </div>
          </div>

          {/* STEP 10: 4 FINANCIAL SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
            
            {/* Total Revenue: ₹124,875 */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-lg shadow-amber-500/20 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-100">Total Net Revenue</span>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black">₹124,875</div>
                <div className="text-xs font-semibold text-amber-100 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 125 Total Course Sales
                </div>
              </div>
            </div>

            {/* Blockchain Basics Revenue: ₹79,920 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Blockchain Basics</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700">64% Share</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">₹79,920</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">80 Sales @ ₹999/learner</div>
              </div>
            </div>

            {/* Web3 Development Revenue: ₹44,955 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Web3 Development</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700">36% Share</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">₹44,955</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">45 Sales @ ₹999/learner</div>
              </div>
            </div>

            {/* Average Order Value / Price */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avg Price / Sale</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">₹999</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">100% On-Chain Settled</div>
              </div>
            </div>

          </div>

          {/* STEP 10: COURSE REVENUE BREAKDOWN TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Revenue by Course</h2>
                <p className="text-xs text-slate-500 mt-0.5">Sales count, pricing, and gross revenue generated per course catalog.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                All-Time Sales Overview
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Sales</th>
                    <th className="px-6 py-4">Unit Price</th>
                    <th className="px-6 py-4">Revenue Share</th>
                    <th className="px-6 py-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  
                  {/* Row 1: Blockchain Basics */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Blockchain Basics</div>
                          <div className="text-xs text-slate-400 font-medium">Core Blockchain Curriculum</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">80</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">₹999</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "64%" }}></div>
                        </div>
                        <span className="text-xs font-bold text-blue-700">64%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-slate-900 text-base">
                      ₹79,920
                    </td>
                  </tr>

                  {/* Row 2: Web3 Development */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Web3 Development</div>
                          <div className="text-xs text-slate-400 font-medium">Smart Contracts & DApps</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">45</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">₹999</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "36%" }}></div>
                        </div>
                        <span className="text-xs font-bold text-purple-700">36%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-slate-900 text-base">
                      ₹44,955
                    </td>
                  </tr>

                  {/* TOTAL ROW */}
                  <tr className="bg-slate-50/80 font-black text-slate-900 border-t-2 border-slate-300">
                    <td className="px-6 py-4 uppercase text-xs tracking-wider text-slate-700">
                      Total
                    </td>
                    <td className="px-6 py-4 text-blue-700 text-base">
                      125
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-semibold text-xs">
                      Avg ₹999
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      100% Total Volume
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-700 text-xl font-black">
                      ₹124,875
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          {/* STEP 10: HACKATHON DUMMY TRANSACTIONS LEDGER */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-lg font-black text-slate-900">Recent Student Transactions</h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                    Hackathon Demo Ledger
                  </span>
                </div>
                <p className="text-xs text-slate-500">Simulated real-time enrollment purchases via UPI, Web3 Crypto, & Cards.</p>
              </div>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Auto-Settlement Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Tx ID / Hash</th>
                    <th className="px-6 py-3.5">Learner</th>
                    <th className="px-6 py-3.5">Course</th>
                    <th className="px-6 py-3.5">Method</th>
                    <th className="px-6 py-3.5">Timestamp</th>
                    <th className="px-6 py-3.5 text-right">Amount</th>
                    <th className="px-6 py-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-mono text-xs text-blue-600 font-bold">{tx.txHash}</td>
                      <td className="px-6 py-3.5 font-bold text-slate-900">{tx.learner}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">{tx.course}</td>
                      <td className="px-6 py-3.5">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                          {tx.method}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-500 text-xs">{tx.date}</td>
                      <td className="px-6 py-3.5 text-right font-black text-slate-900">₹{tx.amount}</td>
                      <td className="px-6 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. STEP 8 MODAL: ADMIN APPROVAL DESK (PROVIDER -> ADMIN -> LEARNER)      */}
      {/* ========================================================================= */}
      {isAdminApprovalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-150">
            
            <button
              onClick={() => setIsAdminApprovalModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shadow-sm">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Admin Review Desk</span>
                <h3 className="text-2xl font-black text-slate-900">Course Verification & Approval</h3>
              </div>
            </div>

            <div className="space-y-4">
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Workflow Transition</div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="p-2 bg-white rounded-lg border">1. Draft (Omar)</span>
                  <span>→</span>
                  <span className="p-2 bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-300">2. Pending Approval</span>
                  <span>→</span>
                  <span className="p-2 bg-emerald-100 text-emerald-900 font-bold rounded-lg border border-emerald-300">3. Published Live</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800">Courses Awaiting Admin Action:</h4>
                
                {courses.filter(c => c.status === "Pending Approval" || c.status === "Draft").map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{c.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Provider: Omar • {c.modules.length} Modules • Fee: ₹{c.price} • Reward Pool: {c.rewardConfig?.courseCompletion || 100} MX
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAdminReject(c.id)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                      >
                        Request Revisions
                      </button>
                      <button
                        onClick={() => handleAdminApprove(c.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Publish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setIsAdminApprovalModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Close Desk
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL: REWARD CONFIGURATION (STEP 7) */}
      {isRewardConfigModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
            <button onClick={() => setIsRewardConfigModalOpen(false)} className="absolute top-6 right-6 text-slate-400 p-1"><X className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Reward Configuration</h3>
            <p className="text-xs text-slate-500 mb-4">Define token rewards per milestone.</p>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-bold text-xs"><span>Lesson completion</span><span>{rewardLesson} MX</span></div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-bold text-xs"><span>Quiz pass</span><span>{rewardQuiz} MX</span></div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-bold text-xs"><span>Assignment pass</span><span>{rewardAssignment} MX</span></div>
              <div className="flex justify-between p-3 bg-amber-50 rounded-xl font-black text-xs text-amber-900"><span>Course completion</span><span>{rewardCourse} MX</span></div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsRewardConfigModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Close</button>
              <button onClick={() => { setIsRewardConfigModalOpen(false); alert("Saved!"); }} className="px-6 py-2.5 bg-[#0056D2] text-white font-bold text-xs rounded-xl">Save Rewards</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 MODAL: CREATE COURSE */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
            <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-6 right-6 text-slate-400 p-1"><X className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Create Course</h3>
            <form onSubmit={() => {
              const newC: CourseItem = {
                id: "course-" + Date.now(),
                title: formTitle.trim() || "New Course",
                description: formDescription.trim() || "Course details.",
                category: formCategory,
                level: formLevel,
                price: Number(formPrice) || 999,
                rewardTokens: Number(formRewardTokens) || 100,
                rewardConfig: DEFAULT_REWARDS,
                thumbnail: formThumbnail,
                learners: 0,
                status: "Draft",
                rating: 5.0,
                updatedAt: "Just now",
                modules: DEFAULT_BLOCKCHAIN_MODULES,
              };
              setCourses([newC, ...courses]);
              setIsCreateModalOpen(false);
              setCurrentBuilderCourse(newC);
              setActiveView("builder");
            }} className="space-y-4">
              <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold" />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#0056D2] text-white font-bold text-xs rounded-xl">Create & Open Builder</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD LESSON (STEP 4) — Video Record + Upload */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative border border-slate-100 my-8">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Add Lesson</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Upload your pre-recorded video file or attach a video link, then fill in the lesson details.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAddLessonModalOpen(false);
                  setLessonVideoBlobUrl(null);
                }}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Video Uploader */}
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-2">
                  📹 Pre-Recorded Lesson Video
                </label>
                <VideoRecorder
                  onVideoReady={(file, url, durationSec) => {
                    setLessonVideoName(file.name);
                    setLessonVideoBlobUrl(url);
                    const mins = Math.floor(durationSec / 60);
                    const secs = durationSec % 60;
                    setLessonDuration(
                      mins > 0 ? `${mins} minute${mins > 1 ? "s" : ""}${secs > 0 ? ` ${secs}s` : ""}` : `${secs} seconds`
                    );
                  }}
                  onUpload={(file, url) => {
                    setLessonVideoName(file.name);
                    setLessonVideoBlobUrl(url);
                  }}
                />
                {lessonVideoBlobUrl && (
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" /> Video ready: <span className="font-semibold text-slate-600 truncate max-w-xs">{lessonVideoName}</span>
                  </div>
                )}
              </div>

              {/* Lesson Details */}
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">Lesson Title</label>
                <input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="e.g. What is Blockchain?"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={lessonDescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                  placeholder="Describe what this lesson covers..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">Duration</label>
                  <input
                    type="text"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    placeholder="e.g. 20 minutes"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                    📎 Resource PDF <span className="text-slate-400 font-medium normal-case">(optional)</span>
                  </label>
                  <label className="flex items-center gap-2 w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{lessonPdfName || "Choose PDF..."}</span>
                    <input
                      type="file"
                      accept=".pdf"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setLessonPdfName(f.name);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsAddLessonModalOpen(false); setLessonVideoBlobUrl(null); }}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!lessonTitle.trim()) return;
                    const newL: LessonItem = {
                      id: "les-" + Date.now(),
                      title: lessonTitle.trim(),
                      description: lessonDescription.trim(),
                      videoName: lessonVideoName || "lecture.mp4",
                      resourcePdfName: lessonPdfName,
                      duration: lessonDuration.trim() || "20 minutes",
                      type: "video",
                    };
                    const updated = {
                      ...currentBuilderCourse,
                      modules: currentBuilderCourse.modules.map(m =>
                        m.id === targetModuleId ? { ...m, lessons: [...m.lessons, newL] } : m
                      ),
                    };
                    updateBuilderCourse(updated);
                    setIsAddLessonModalOpen(false);
                    setLessonVideoBlobUrl(null);
                  }}
                  className="px-7 py-2.5 bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  Save Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT QUIZ (STEP 5) — Fully Editable by Course Provider */}
      {isAddQuizModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
            <button onClick={() => { setIsAddQuizModalOpen(false); setEditingQuizId(null); }} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1"><X className="w-5 h-5" /></button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">{editingQuizId ? "Edit Quiz" : "Create Quiz"}</h3>
                <p className="text-xs text-slate-500 mt-0.5">You are the course provider — all fields are fully editable.</p>
              </div>
            </div>

            {/* Quiz Title + Reward */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Quiz Title</label>
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="e.g. Quiz: Blockchain Basics"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>
              <div className="w-28">
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Reward MX</label>
                <div className="relative">
                  <input
                    type="number"
                    value={quizRewardMX}
                    onChange={(e) => setQuizRewardMX(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm font-bold text-amber-900 focus:outline-none focus:border-amber-400"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-amber-600">MX</span>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-5 max-h-[52vh] overflow-y-auto pr-1">
              {quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 relative group">
                  
                  {/* Question header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Question {qIdx + 1}</span>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-500">Marks</label>
                      <input
                        type="number"
                        value={q.marks}
                        min="1"
                        onChange={(e) => {
                          const updated = quizQuestions.map((item, i) =>
                            i === qIdx ? { ...item, marks: Number(e.target.value) } : item
                          );
                          setQuizQuestions(updated);
                        }}
                        className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-xs font-bold text-center bg-white"
                      />
                      {quizQuestions.length > 1 && (
                        <button
                          onClick={() => setQuizQuestions(quizQuestions.filter((_, i) => i !== qIdx))}
                          className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                          title="Remove question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question text */}
                  <textarea
                    rows={2}
                    value={q.question}
                    onChange={(e) => {
                      const updated = quizQuestions.map((item, i) =>
                        i === qIdx ? { ...item, question: e.target.value } : item
                      );
                      setQuizQuestions(updated);
                    }}
                    placeholder="Enter your question here..."
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold resize-none focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 mb-3"
                  />

                  {/* Answer Options */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Options — click the circle to mark correct answer</label>
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        {/* Correct answer radio */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = quizQuestions.map((item, i) =>
                              i === qIdx ? { ...item, correctIndex: oIdx } : item
                            );
                            setQuizQuestions(updated);
                          }}
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                            q.correctIndex === oIdx
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 hover:border-emerald-400"
                          }`}
                        >
                          {q.correctIndex === oIdx && (
                            <span className="w-2 h-2 rounded-full bg-white block" />
                          )}
                        </button>

                        {/* Option text */}
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...q.options];
                            newOpts[oIdx] = e.target.value;
                            const updated = quizQuestions.map((item, i) =>
                              i === qIdx ? { ...item, options: newOpts } : item
                            );
                            setQuizQuestions(updated);
                          }}
                          placeholder={`Option ${oIdx + 1}`}
                          className={`flex-1 px-3 py-2 border rounded-xl text-sm transition-all focus:outline-none ${
                            q.correctIndex === oIdx
                              ? "border-emerald-300 bg-emerald-50/60 text-emerald-900 font-bold focus:ring-2 focus:ring-emerald-100"
                              : "border-slate-200 bg-white text-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-50"
                          }`}
                        />

                        {/* Correct badge */}
                        {q.correctIndex === oIdx && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg shrink-0">
                            ✓ Correct
                          </span>
                        )}

                        {/* Remove option (min 2) */}
                        {q.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newOpts = q.options.filter((_, i) => i !== oIdx);
                              const newCorrect = q.correctIndex >= newOpts.length ? 0 : q.correctIndex === oIdx ? 0 : q.correctIndex > oIdx ? q.correctIndex - 1 : q.correctIndex;
                              const updated = quizQuestions.map((item, i) =>
                                i === qIdx ? { ...item, options: newOpts, correctIndex: newCorrect } : item
                              );
                              setQuizQuestions(updated);
                            }}
                            className="text-slate-300 hover:text-red-400 transition-colors p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Add option button */}
                    {q.options.length < 6 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = quizQuestions.map((item, i) =>
                            i === qIdx ? { ...item, options: [...item.options, ""] } : item
                          );
                          setQuizQuestions(updated);
                        }}
                        className="text-xs text-slate-400 hover:text-amber-600 font-bold flex items-center gap-1 mt-1 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add option
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Question */}
            <button
              type="button"
              onClick={() => setQuizQuestions([
                ...quizQuestions,
                { id: "q-" + Date.now(), question: "", options: ["", "", "", ""], correctIndex: 0, marks: 10 }
              ])}
              className="mt-4 w-full py-3 border-2 border-dashed border-amber-300 rounded-2xl text-amber-700 hover:bg-amber-50 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>

            {/* Summary bar */}
            <div className="mt-4 flex items-center justify-between px-4 py-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
              <span>{quizQuestions.length} Question{quizQuestions.length !== 1 ? "s" : ""}</span>
              <span>Total Marks: {quizQuestions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0)}</span>
              <span>Reward: +{quizRewardMX} MX on Pass</span>
            </div>

            {/* Footer Buttons */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => { setIsAddQuizModalOpen(false); setEditingQuizId(null); }}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const totalMarks = quizQuestions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);
                  if (editingQuizId) {
                    // Update existing quiz
                    const updatedCourse = {
                      ...currentBuilderCourse,
                      modules: currentBuilderCourse.modules.map((m) =>
                        m.id === targetModuleId
                          ? {
                              ...m,
                              quizzes: m.quizzes.map((q) =>
                                q.id === editingQuizId
                                  ? {
                                      ...q,
                                      title: quizTitle,
                                      questions: quizQuestions,
                                      questionsCount: quizQuestions.length,
                                      totalMarks,
                                      rewardMX: Number(quizRewardMX) || 10,
                                    }
                                  : q
                              ),
                            }
                          : m
                      ),
                    };
                    updateBuilderCourse(updatedCourse);
                  } else {
                    // Add new quiz
                    const newQuiz: QuizItem = {
                      id: "quiz-" + Date.now(),
                      title: quizTitle || "New Quiz",
                      questions: quizQuestions,
                      questionsCount: quizQuestions.length,
                      totalMarks,
                      rewardMX: Number(quizRewardMX) || 10,
                    };
                    const updatedCourse = {
                      ...currentBuilderCourse,
                      modules: currentBuilderCourse.modules.map((m) =>
                        m.id === targetModuleId ? { ...m, quizzes: [...m.quizzes, newQuiz] } : m
                      ),
                    };
                    updateBuilderCourse(updatedCourse);
                  }
                  setIsAddQuizModalOpen(false);
                  setEditingQuizId(null);
                }}
                className="px-7 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                {editingQuizId ? "Save Changes" : "Save Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT MULTI-PART ASSIGNMENT (STEP 6) — Course Provider Custom Parts & Placement */}
      {isAddAssignmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
            <button
              onClick={() => {
                setIsAddAssignmentModalOpen(false);
                setEditingAssignmentId(null);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {editingAssignmentId ? "Edit Multi-Part Assignment" : "Create Multi-Part Assignment"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  As Course Provider, you decide how many assignment parts exist, their submission type, and where they are placed.
                </p>
              </div>
            </div>

            <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-2">
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Assignment Title</label>
                  <input
                    type="text"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    placeholder="e.g. Smart Contract Security Audit & Deployment"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Assignment Placement</label>
                  <select
                    value={assignmentPlacement}
                    onChange={(e) => setAssignmentPlacement(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-400"
                  >
                    <option value="module_end">End of Module Assignment</option>
                    <option value="attached_lesson">Attached to Specific Lesson</option>
                    <option value="mid_course">Mid-Course Checkpoint Milestone</option>
                  </select>
                </div>
              </div>

              {/* Lesson attachment selector if placement === 'attached_lesson' */}
              {assignmentPlacement === "attached_lesson" && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Attach to Lesson</label>
                  <select
                    value={assignmentAttachedLessonId}
                    onChange={(e) => setAssignmentAttachedLessonId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl text-xs font-bold text-purple-900 focus:outline-none"
                  >
                    <option value="">Select a lesson in this module...</option>
                    {currentBuilderCourse.modules
                      .find((m) => m.id === targetModuleId)
                      ?.lessons.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.title} ({l.duration})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Overview Description</label>
                <textarea
                  rows={2}
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                  placeholder="Explain what the learner must accomplish in this assignment..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Marks & Rewards */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-purple-50/60 border border-purple-200 rounded-2xl">
                <div>
                  <label className="block text-[11px] font-bold text-purple-900 uppercase">Passing Threshold</label>
                  <input
                    type="number"
                    value={assignmentPassingMarks}
                    onChange={(e) => setAssignmentPassingMarks(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-bold text-purple-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-purple-900 uppercase">Reward MX Tokens</label>
                  <input
                    type="number"
                    value={assignmentRewardMX}
                    onChange={(e) => setAssignmentRewardMX(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-bold text-purple-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-purple-900 uppercase">Total Max Marks</label>
                  <div className="mt-2 text-sm font-black text-purple-900">
                    {assignmentParts.reduce((sum, p) => sum + (Number(p.maxMarks) || 0), 0)} Marks
                  </div>
                </div>
              </div>

              {/* Multi-Part Assignment Sections Header */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                      Assignment Parts &amp; Submissions ({assignmentParts.length} Parts)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Configure custom parts, submission types (Code, PDF, Video, Tx Hash), and AI evaluation rubrics.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nextNum = assignmentParts.length + 1;
                      setAssignmentParts([
                        ...assignmentParts,
                        {
                          id: "part-" + Date.now(),
                          partNumber: nextNum,
                          title: `Part ${nextNum}: New Task Section`,
                          submissionType: "code",
                          instructions: "Enter instructions for this part...",
                          maxMarks: 20,
                          aiRubric: "AI evaluation criteria for this section...",
                        },
                      ]);
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Part
                  </button>
                </div>

                <div className="space-y-4">
                  {assignmentParts.map((part, pIdx) => (
                    <div key={part.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-purple-700 uppercase tracking-wider">
                          Part {pIdx + 1} Configuration
                        </span>
                        {assignmentParts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setAssignmentParts(assignmentParts.filter((_, i) => i !== pIdx))}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600">Part Section Title</label>
                          <input
                            type="text"
                            value={part.title}
                            onChange={(e) => {
                              const updated = assignmentParts.map((item, i) =>
                                i === pIdx ? { ...item, title: e.target.value } : item
                              );
                              setAssignmentParts(updated);
                            }}
                            className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600">Submission Format</label>
                          <select
                            value={part.submissionType}
                            onChange={(e) => {
                              const updated = assignmentParts.map((item, i) =>
                                i === pIdx ? { ...item, submissionType: e.target.value as any } : item
                              );
                              setAssignmentParts(updated);
                            }}
                            className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                          >
                            <option value="code">💻 EVM / Solidity Code Snippet</option>
                            <option value="pdf">📄 PDF Report / Document</option>
                            <option value="video">📹 Recorded Video Demo</option>
                            <option value="contract_address">🔗 Deployed Contract Tx Hash</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="md:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-600">Instructions for Learner</label>
                          <textarea
                            rows={2}
                            value={part.instructions}
                            onChange={(e) => {
                              const updated = assignmentParts.map((item, i) =>
                                i === pIdx ? { ...item, instructions: e.target.value } : item
                              );
                              setAssignmentParts(updated);
                            }}
                            className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600">Marks</label>
                          <input
                            type="number"
                            value={part.maxMarks}
                            onChange={(e) => {
                              const updated = assignmentParts.map((item, i) =>
                                i === pIdx ? { ...item, maxMarks: Number(e.target.value) } : item
                              );
                              setAssignmentParts(updated);
                            }}
                            className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-purple-700">🤖 AI Evaluation Criteria &amp; Rubric</label>
                        <input
                          type="text"
                          value={part.aiRubric}
                          onChange={(e) => {
                            const updated = assignmentParts.map((item, i) =>
                              i === pIdx ? { ...item, aiRubric: e.target.value } : item
                            );
                            setAssignmentParts(updated);
                          }}
                          placeholder="e.g. Check for reentrancy protection, gas usage under 200k, and correct modifier syntax..."
                          className="w-full mt-1 px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl text-xs text-purple-900 font-medium"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsAddAssignmentModalOpen(false);
                  setEditingAssignmentId(null);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const totalMarks = assignmentParts.reduce((sum, p) => sum + (Number(p.maxMarks) || 0), 0);
                  const newAssignment: AssignmentItem = {
                    id: editingAssignmentId || "assign-" + Date.now(),
                    title: assignmentTitle || "New Assignment",
                    description: assignmentDescription || "Assignment overview.",
                    placement: assignmentPlacement,
                    attachedLessonId: assignmentAttachedLessonId,
                    parts: assignmentParts,
                    maxMarks: totalMarks,
                    passingMarks: Number(assignmentPassingMarks) || 60,
                    aiEvaluation: true,
                    rewardMX: Number(assignmentRewardMX) || 50,
                    rubric: assignmentParts.map((p) => p.aiRubric).join(" | "),
                  };

                  const updatedCourse = {
                    ...currentBuilderCourse,
                    modules: currentBuilderCourse.modules.map((m) =>
                      m.id === targetModuleId ? { ...m, assignments: [...m.assignments.filter(a => a.id !== newAssignment.id), newAssignment] } : m
                    ),
                  };
                  updateBuilderCourse(updatedCourse);
                  setIsAddAssignmentModalOpen(false);
                  setEditingAssignmentId(null);
                }}
                className="px-7 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Save Multi-Part Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD MODULE */}
      {isAddModuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-3">Add New Module</h3>
            <input type="text" placeholder="e.g. Module 4" value={newModuleName} onChange={(e) => setNewModuleName(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAddModuleModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
              <button onClick={() => {
                if (!newModuleName.trim()) return;
                const newMod: ModuleItem = { id: "mod-" + Date.now(), title: newModuleName.trim(), lessons: [], quizzes: [], assignments: [] };
                updateBuilderCourse({ ...currentBuilderCourse, modules: [...currentBuilderCourse.modules, newMod] });
                setNewModuleName("");
                setIsAddModuleModalOpen(false);
              }} className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl">+ Add Module</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOCKCHAIN VIEW                                                            */}
      {/* ========================================================================= */}
      {activeView === "blockchain" && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
            <button
              onClick={() => setActiveView("dashboard")}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900">⛓ Blockchain Integration</h1>
              <p className="text-sm text-slate-500 mt-0.5">Smart contracts deployed on Hardhat localhost · Chain ID 31337</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl p-5 text-white shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">MX Token (ERC-20)</div>
              <div className="text-lg font-black">0x5FbDB2315...80aa3</div>
              <div className="text-xs opacity-70 mt-1">1,000,000 MX Initial Supply · Reward Token</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl p-5 text-white shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">CertificateNFT (Soulbound)</div>
              <div className="text-lg font-black">0xe7f1725E7...0512</div>
              <div className="text-xs opacity-70 mt-1">Non-transferable · ERC-721 Completion NFT</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-5 text-white shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">CourseRegistry (Escrow)</div>
              <div className="text-lg font-black">0x9fE46736...fa6e0</div>
              <div className="text-xs opacity-70 mt-1">90/10 Provider/Platform Split · Publishing</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Coins className="w-4 h-4 text-amber-500" /> Reward Flow</h3>
              <div className="space-y-3">
                {[
                  { label: "Lesson Completion", tokens: 5, color: "bg-blue-100 text-blue-800" },
                  { label: "Quiz Pass", tokens: 10, color: "bg-emerald-100 text-emerald-800" },
                  { label: "Assignment Pass", tokens: 50, color: "bg-orange-100 text-orange-800" },
                  { label: "Course Completion", tokens: 100, color: "bg-purple-100 text-purple-800" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${item.color}`}>+{item.tokens} MX</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-blue-500" /> On-Chain Workflow</h3>
              <div className="space-y-3">
                {[
                  { step: "1", label: "Learner submits assignment", icon: "📝", color: "bg-slate-100" },
                  { step: "2", label: "AI evaluates & scores", icon: "🤖", color: "bg-blue-50" },
                  { step: "3", label: "Score generated on-chain", icon: "📊", color: "bg-emerald-50" },
                  { step: "4", label: "Reward calculated", icon: "🧮", color: "bg-amber-50" },
                  { step: "5", label: "MX tokens minted to learner", icon: "🪙", color: "bg-purple-50" },
                  { step: "6", label: "Soulbound certificate issued", icon: "🎓", color: "bg-indigo-50" },
                ].map(item => (
                  <div key={item.step} className={`flex items-center gap-3 p-3 ${item.color} rounded-xl`}>
                    <span className="text-base">{item.icon}</span>
                    <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                    <span className="ml-auto text-xs font-bold text-slate-400">Step {item.step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <BlockchainPanel />

          <div className="mt-6 p-5 bg-slate-900 rounded-2xl text-slate-300 text-xs font-mono">
            <div className="text-slate-400 mb-3 font-bold text-[10px] uppercase tracking-widest">API Endpoints · Backend Blockchain Routes</div>
            <div className="space-y-1.5">
              <div><span className="text-emerald-400">GET</span>  /api/blockchain/status</div>
              <div><span className="text-emerald-400">GET</span>  /api/blockchain/balance/:address</div>
              <div><span className="text-blue-400">POST</span> /api/blockchain/mint-reward</div>
              <div><span className="text-blue-400">POST</span> /api/blockchain/mint-certificate</div>
              <div><span className="text-emerald-400">GET</span>  /api/blockchain/certificates/:address</div>
              <div><span className="text-blue-400">POST</span> /api/blockchain/courses/register</div>
              <div><span className="text-blue-400">POST</span> /api/blockchain/courses/:courseId/approve</div>
              <div><span className="text-emerald-400">GET</span>  /api/blockchain/courses/:courseId</div>
            </div>
          </div>
        </main>
      )}

    </div>
  );
}

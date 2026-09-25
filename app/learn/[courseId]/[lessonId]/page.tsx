"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Download,
  Eye,
  Sparkles,
  Coins,
  Bot,
  Send,
  Copy,
  Check,
  Award,
  ExternalLink,
  BookOpen,
  Share2,
  HelpCircle,
  Code,
  StickyNote,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";
import {
  getLesson,
  getSurroundingLessons,
  loadCourseProgress,
  saveLessonCompletion,
  LessonResource,
} from "@/lib/learning-data";
import { LearningSidebar } from "@/components/learning/learning-sidebar";
import { VideoPlayer } from "@/components/learning/video-player";
import { PdfPreviewModal } from "@/components/learning/pdf-preview-modal";
import { RewardModal } from "@/components/learning/reward-modal";
import { Confetti } from "@/components/learning/confetti";

export default function LearningPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = (params?.courseId as string) || "solidity-fundamentals";
  const lessonId = (params?.lessonId as string) || "what-is-solidity";

  // Data queries
  const lessonData = getLesson(courseId, lessonId);
  const surrounding = getSurroundingLessons(courseId, lessonId);

  // States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "resources" | "quiz" | "ai-tutor">("content");

  // Progress states
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [totalEarnedMX, setTotalEarnedMX] = useState<number>(0);

  // Video completion state
  const [videoEnded, setVideoEnded] = useState<boolean>(false);

  // Modals & Certificate Flow States
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previewResource, setPreviewResource] = useState<LessonResource | null>(null);

  // Certificate Eligibility & Form States
  const [showCertDetailsModal, setShowCertDetailsModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [studentNameInput, setStudentNameInput] = useState("");
  const [assessmentScore, setAssessmentScore] = useState<number>(95);
  const [assessmentIdVal, setAssessmentIdVal] = useState<string>("");
  const [certIssuing, setCertIssuing] = useState(false);
  const [certIssuedResult, setCertIssuedResult] = useState<any>(null);

  // Code copy feedback
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // AI Tutor Q&A state
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiChat, setAiChat] = useState<{ role: "user" | "assistant"; text: string }[]>([
    {
      role: "assistant",
      text: `Hello! I'm your Web3 AI Learning Assistant for "${lessonData?.lesson.title || "this lesson"}". Ask me any question about the concepts, EVM behavior, or code syntax!`,
    },
  ]);
  const [aiThinking, setAiThinking] = useState(false);

  // Notes state
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);

  // Load real backend progress & user balance on mount / route change
  useEffect(() => {
    async function init() {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      let userId: string | null = null;

      // 1. Determine authenticated or active student ID
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          userId = user.id;
          setStudentNameInput(user.user_metadata?.full_name || user.email?.split("@")[0] || "Student Learner");
        } else {
          const res = await fetch(`${BACKEND_URL}/api/users`);
          if (res.ok) {
            const users = await res.json();
            if (Array.isArray(users) && users.length > 0) {
              userId = users[0].id;
              setStudentNameInput(users[0].name || "Student Learner");
            }
          }
        }
      } catch (e) {
        console.error("Error retrieving user identity:", e);
        setStudentNameInput("Student Learner");
      }

      // 2. Fetch real lesson progress from Supabase backend & merge with local cache
      const localProgress = loadCourseProgress(courseId);
      let realCompletedIds: string[] = Array.from(new Set(localProgress.completedLessons));

      if (userId) {
        try {
          const pRes = await fetch(`${BACKEND_URL}/api/progress/${userId}/${courseId}`);
          if (pRes.ok) {
            const pData = await pRes.json();
            if (Array.isArray(pData)) {
              const dbCompleted = pData
                .filter((p: any) => p.completed)
                .map((p: any) => p.lesson_id);
              realCompletedIds = Array.from(new Set([...realCompletedIds, ...dbCompleted]));
            }
          }
        } catch (e) {
          console.error("Error fetching lesson progress from backend:", e);
        }
      }

      setCompletedLessonIds(realCompletedIds);

      // 3. Fetch real user MX balance from backend/blockchain
      if (userId) {
        try {
          const bRes = await fetch(`${BACKEND_URL}/api/users/${userId}/balance`);
          if (bRes.ok) {
            const bData = await bRes.json();
            setTotalEarnedMX(Math.round(Number(bData.balance) || 0));
          }
        } catch (e) {
          console.error("Error fetching user MX balance:", e);
        }
      }

      // 4. Video completion state for current lesson
      if (lessonData) {
        const currentSlug = lessonData.lesson.slug;
        const currentId = lessonData.lesson.id;
        const isComp = realCompletedIds.includes(currentSlug) || realCompletedIds.includes(currentId);
        setVideoEnded(isComp);
      } else {
        setVideoEnded(false);
      }
    }

    init();

    // Reset quiz state on lesson change
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setQuizIsCorrect(false);
  }, [courseId, lessonId]);

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-xl font-bold text-slate-800">Lesson Not Found</p>
          <p className="text-xs text-slate-500">
            The requested course unit could not be located in our verified syllabus.
          </p>
          <Button asChild className="bg-[#0056D2] text-white">
            <Link href="/courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { lesson, curriculum } = lessonData;
  const isLessonCompleted =
    completedLessonIds.includes(lesson.id) || completedLessonIds.includes(lesson.slug);

  // Lesson & Module position calculations
  const isLastLessonOfCourse = surrounding.nextLesson === null;
  const currentModuleObj = curriculum.modules.find(m => m.id === `mod-${lesson.moduleIndex}`) || curriculum.modules[(lesson.moduleIndex || 1) - 1];
  const currentModuleLessons = currentModuleObj ? currentModuleObj.lessons : [];
  const isLastLessonOfModule = currentModuleLessons.length > 0 && (currentModuleLessons[currentModuleLessons.length - 1].slug === lesson.slug || currentModuleLessons[currentModuleLessons.length - 1].id === lesson.id);

  // Handle Video Ended Callback
  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  // Handle Complete Lesson action
  const handleCompleteLesson = async (): Promise<boolean> => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    let userId: string | null = null;

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || null;

      if (!userId) {
        const res = await fetch(`${BACKEND_URL}/api/users`);
        if (res.ok) {
          const users = await res.json();
          if (Array.isArray(users) && users.length > 0) {
            userId = users[0].id;
          }
        }
      }

      if (userId) {
        console.log("COMPLETION REQUEST sent for lesson:", lesson.slug);
        const compRes = await fetch(`${BACKEND_URL}/api/progress/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            courseId,
            lessonId: lesson.slug,
          }),
        });

        if (compRes.ok) {
          const compData = await compRes.json();
          console.log("COMPLETION RESPONSE:", compData);
        } else {
          console.error("COMPLETION RESPONSE ERROR:", await compRes.text());
        }
      }
    } catch (e) {
      console.error("Failed to sync progress with backend API:", e);
    }

    setCompletedLessonIds((prev) => Array.from(new Set([...prev, lesson.slug, lesson.id])));
    saveLessonCompletion(courseId, lesson.slug, 0);
    saveLessonCompletion(courseId, lesson.id, 0);
    setShowConfetti(true);
    return true;
  };

  // Handle Main Continue Action
  const handleContinueAction = async () => {
    console.log("▶ CURRENT LESSON:", lesson.slug);
    console.log("▶ NEXT LESSON:", surrounding.nextLesson?.slug || "NONE (Last Lesson Of Course)");

    await handleCompleteLesson();

    // Check if this was the final lesson of the entire course (all 3 modules finished)
    if (isLastLessonOfCourse) {
      console.log("▶ Last lesson of course finished. Checking assessment status...");
      try {
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        let userId = user?.id;

        if (!userId) {
          const uRes = await fetch(`${BACKEND_URL}/api/users`);
          if (uRes.ok) {
            const users = await uRes.json();
            if (Array.isArray(users) && users.length > 0) userId = users[0].id;
          }
        }

        if (userId) {
          const aRes = await fetch(`${BACKEND_URL}/api/assessments/user/${userId}/course/${courseId}`);
          if (aRes.ok) {
            const aData = await aRes.json();
            if (aData.passed && aData.assessment) {
              setAssessmentScore(aData.assessment.score || 95);
              setAssessmentIdVal(aData.assessment.id);
              setShowCertDetailsModal(true);
              return;
            }
          }
        }
      } catch (e) {
        console.error("Failed to check assessment status:", e);
      }

      // If assessment not passed or error, show assessment required modal
      setShowAssessmentModal(true);
      return;
    }

    // Move to next lesson
    if (surrounding.nextLesson) {
      const targetUrl = `/learn/${courseId}/${surrounding.nextLesson.slug}`;
      console.log("▶ NAVIGATION TARGET:", targetUrl);
      router.push(targetUrl);
    } else {
      console.warn("No next lesson found for course:", courseId);
    }
  };

  // Generate Blockchain Certificate Handler
  const handleIssueCertificate = async () => {
    setCertIssuing(true);
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      let userId = user?.id;

      if (!userId) {
        const uRes = await fetch(`${BACKEND_URL}/api/users`);
        if (uRes.ok) {
          const users = await uRes.json();
          if (Array.isArray(users) && users.length > 0) userId = users[0].id;
        }
      }

      const studentNameInput = prompt("Please enter your full name as you would like it to appear on your official certificate:", "Sharukh Sameer");
      if (!studentNameInput || !studentNameInput.trim()) {
        setCertIssuing(false);
        return;
      }

      const verificationCode = `BLX-CERT-${Date.now().toString(36).toUpperCase()}`;

      const res = await fetch(`${BACKEND_URL}/api/certificates/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          courseId,
          assessmentId: assessmentIdVal || "solidity-final-exam",
          verificationCode,
          studentName: studentNameInput.trim(),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setCertIssuedResult(result);
      } else {
        const err = await res.json();
        alert(`Certificate issuance notice: ${err.error || "Please complete final exam first"}`);
      }
    } catch (e) {
      console.error("Failed to issue certificate:", e);
      alert("Certificate issuance failed. Please check network connection.");
    } finally {
      setCertIssuing(false);
    }
  };

  const handleNextLesson = () => {
    if (surrounding.nextLesson) {
      router.push(`/learn/${courseId}/${surrounding.nextLesson.slug}`);
    }
  };

  // Handle Quiz Submission
  const handleQuizSubmit = () => {
    if (selectedQuizOption === null || !lesson.quiz) return;
    const correct = selectedQuizOption === lesson.quiz.correctAnswer;
    setQuizIsCorrect(correct);
    setQuizSubmitted(true);

    if (correct && !isLessonCompleted) {
      // Auto complete lesson on passing quiz
      handleCompleteLesson();
    }
  };

  // Handle AI Tutor Question
  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || aiThinking) return;

    const userQ = aiQuestion.trim();
    setAiChat((prev) => [...prev, { role: "user", text: userQ }]);
    setAiQuestion("");
    setAiThinking(true);

    setTimeout(() => {
      let aiReply = `Great question regarding "${lesson.title}". In Solidity 0.8.x and the EVM architecture, state transitions must always be verified deterministically. Remember to prioritize the Checks-Effects-Interactions pattern when dealing with external interactions!`;

      const lower = userQ.toLowerCase();
      if (lower.includes("gas") || lower.includes("cost")) {
        aiReply = `Regarding gas optimization: storage writes (SSTORE) are the most expensive operations (~20,000 gas for cold slot initialization). Using 'calldata' for read-only external parameters and packing variables into 32-byte slots will drastically lower execution costs.`;
      } else if (lower.includes("reentrancy") || lower.includes("attack") || lower.includes("hack")) {
        aiReply = `To prevent reentrancy attacks, always apply the Checks-Effects-Interactions (CEI) principle: update your internal balances/state BEFORE invoking external calls or transferring native tokens. Additionally, use OpenZeppelin's ReentrancyGuard mutex.`;
      } else if (lower.includes("solidity") || lower.includes("evm")) {
        aiReply = `The Ethereum Virtual Machine (EVM) operates on 256-bit stack words. Solidity compiles into EVM bytecode that every validating node executes across the network to maintain consensus.`;
      }

      setAiChat((prev) => [...prev, { role: "assistant", text: aiReply }]);
      setAiThinking(false);
    }, 900);
  };

  // Save notes
  const handleSaveNotes = (val: string) => {
    setNotes(val);
    localStorage.setItem(`notes_${courseId}_${lessonId}`, val);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleCopyCode = () => {
    if (lesson.codeSnippet?.code) {
      navigator.clipboard?.writeText(lesson.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900 text-slate-800">

      {/* ── TOP NAV BAR (Compact, Distraction-Free Player Header) ── */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4 shrink-0 z-30">

        {/* Left: Brand + Course breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => {
              // Mobile drawer or desktop sidebar toggle
              if (window.innerWidth < 1024) {
                setMobileDrawerOpen(!mobileDrawerOpen);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Toggle Curriculum Sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link href="/" className="shrink-0 hidden sm:flex items-center">
            <Logo height={32} width={140} />
          </Link>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          {/* Current Lesson Breadcrumb */}
          <div className="min-w-0 flex items-center gap-2">
            <Link
              href={`/courses/${curriculum.courseId}`}
              className="text-xs text-slate-400 hover:text-white truncate hidden md:inline"
            >
              {curriculum.courseTitle}
            </Link>
            <span className="text-slate-600 hidden md:inline">/</span>
            <span className="text-xs font-semibold text-white truncate">
              {lesson.lessonIndex}. {lesson.title}
            </span>
          </div>
        </div>

        {/* Right: Balance + Navigation Arrows */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* User Reward MX Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono">
            <Coins className="h-3.5 w-3.5 fill-amber-400" />
            <span>+{totalEarnedMX} MX</span>
          </div>

          {/* Prev Lesson Button */}
          {surrounding.prevLesson ? (
            <Link
              href={`/learn/${courseId}/${surrounding.prevLesson.slug}`}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title={`Previous: ${surrounding.prevLesson.title}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <button
              disabled
              className="p-1.5 rounded-lg bg-slate-800/40 text-slate-600 cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Next Lesson Button */}
          {surrounding.nextLesson ? (
            <Link
              href={`/learn/${courseId}/${surrounding.nextLesson.slug}`}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title={`Next: ${surrounding.nextLesson.title}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              disabled
              className="p-1.5 rounded-lg bg-slate-800/40 text-slate-600 cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* ── MAIN BODY: SIDEBAR + CONTENT ── */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ── LEFT: LESSONS SIDEBAR ── */}
        {sidebarOpen && (
          <div className="hidden lg:block h-full shrink-0 min-h-0 overflow-hidden">
            <LearningSidebar
              curriculum={curriculum}
              currentLessonId={lesson.slug}
              completedLessonIds={completedLessonIds}
              totalEarnedMX={totalEarnedMX}
              isOpen={true}
            />
          </div>
        )}

        {/* Mobile Drawer Sidebar */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative z-10 w-80 max-w-[85vw] h-full bg-white shadow-2xl">
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
              <LearningSidebar
                curriculum={curriculum}
                currentLessonId={lesson.slug}
                completedLessonIds={completedLessonIds}
                totalEarnedMX={totalEarnedMX}
                isOpen={true}
                onCloseMobile={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        )}

        {/* ── RIGHT: MAIN LEARNING WORKSPACE ── */}
        <main className="flex-1 overflow-y-auto bg-slate-900 flex flex-col justify-between">

          <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto w-full">

            {/* 1. VIDEO PLAYER SECTION */}
            <section className="space-y-4">
              <VideoPlayer
                lesson={lesson}
                isCompleted={isLessonCompleted}
                onLessonCompletePrompt={handleCompleteLesson}
                onVideoEnded={handleVideoEnded}
              />
            </section>

            {/* 2. LESSON TABS: Content, PDF/Resources, Quiz, AI Tutor */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* Tab navigation headers */}
              <div className="flex items-center border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "content"
                      ? "border-[#0056D2] text-[#0056D2] bg-white rounded-t-lg"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Lesson Content</span>
                </button>

                <button
                  onClick={() => setActiveTab("resources")}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "resources"
                      ? "border-[#0056D2] text-[#0056D2] bg-white rounded-t-lg"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>PDF &amp; Resources ({lesson.resources.length})</span>
                </button>

                {lesson.quiz && (
                  <button
                    onClick={() => setActiveTab("quiz")}
                    className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "quiz"
                        ? "border-[#0056D2] text-[#0056D2] bg-white rounded-t-lg"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Knowledge Check</span>
                    {quizIsCorrect && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                )}

                <button
                  onClick={() => setActiveTab("ai-tutor")}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "ai-tutor"
                      ? "border-[#0056D2] text-[#0056D2] bg-white rounded-t-lg"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <Bot className="h-4 w-4 text-purple-600" />
                  <span>AI Learning Assistant</span>
                </button>
              </div>

              {/* Tab Content Panes */}
              <div className="p-6 sm:p-8">

                {/* ── TAB 1: LESSON CONTENT ── */}
                {activeTab === "content" && (
                  <div className="space-y-6">

                    {/* Lesson Title & Summary */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#0056D2]">
                          {lesson.moduleTitle}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          Lesson {lesson.lessonIndex} of {surrounding.totalLessons}
                        </span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {lesson.title}
                      </h1>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {lesson.summary}
                      </p>
                    </div>

                    {/* Key Takeaways Box */}
                    {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                          <Sparkles className="h-4 w-4 text-amber-500" />
                          <span>Key Takeaways for This Unit</span>
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {lesson.keyTakeaways.map((takeaway, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0056D2] mt-1.5 shrink-0" />
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interactive Code Snippet (if available) */}
                    {lesson.codeSnippet && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <Code className="h-4 w-4 text-[#0056D2]" />
                            {lesson.codeSnippet.filename || "Solidity Source Code"}
                          </span>
                          <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-1.5 text-xs font-semibold text-[#0056D2] hover:text-[#00419e] transition-colors"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                            <span>{lesson.codeSnippet.filename}</span>
                            <span className="uppercase text-amber-400">{lesson.codeSnippet.language}</span>
                          </div>
                          <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                            <code>{lesson.codeSnippet.code}</code>
                          </pre>
                        </div>

                        {lesson.codeSnippet.explanation && (
                          <p className="text-xs text-slate-500 italic">
                            💡 {lesson.codeSnippet.explanation}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Detailed Reading Text */}
                    <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-6">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: lesson.content
                            .replace(/### (.*?)\n/g, '<h3 class="text-lg font-black text-slate-900 mt-4 mb-2">$1</h3>')
                            .replace(/#### (.*?)\n/g, '<h4 class="text-sm font-bold text-slate-800 mt-3 mb-1.5">$1</h4>')
                            .replace(/- \*\*(.*?)\*\*: (.*?)\n/g, '<li class="ml-4 mb-1"><strong>$1</strong>: $2</li>')
                            .replace(/\n\n/g, '<p class="mb-3">')
                        }}
                      />
                    </div>

                    {/* Personal Notes Scratchpad */}
                    <div className="border-t border-slate-100 pt-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <StickyNote className="h-4 w-4 text-amber-500" />
                          Personal Lesson Notes (Auto-Saved)
                        </span>
                        {notesSaved && (
                          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> Saved
                          </span>
                        )}
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => handleSaveNotes(e.target.value)}
                        placeholder="Write down your insights, question marks, or code reflections..."
                        rows={3}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0056D2] focus:bg-white transition-colors"
                      />
                    </div>

                  </div>
                )}

                {/* ── TAB 2: PDF & RESOURCES ── */}
                {activeTab === "resources" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Downloadable PDF &amp; Study Assets
                      </h3>
                      <p className="text-xs text-slate-500">
                        Official instructor reference materials, slides, and cheat sheets for this unit.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {lesson.resources.map((res) => (
                        <div
                          key={res.id}
                          className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/30 transition-all flex flex-col justify-between group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="p-2 rounded-lg bg-white border border-slate-200 text-[#0056D2] shadow-2xs">
                                <FileText className="h-5 w-5" />
                              </div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 text-slate-700">
                                {res.type}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0056D2] transition-colors">
                              {res.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2">
                              {res.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-200/80 mt-3 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-medium">{res.size}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setPreviewResource(res)}
                                className="h-8 px-2.5 text-xs font-semibold gap-1"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                Preview
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => setPreviewResource(res)}
                                className="h-8 px-3 text-xs font-semibold bg-[#0056D2] hover:bg-[#00419e] text-white gap-1"
                              >
                                <Download className="h-3.5 w-3.5" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* External Useful Links */}
                    <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-blue-900">Official Ethereum &amp; Solidity Documentation</p>
                        <p className="text-[11px] text-slate-500">Access official specifications, opcodes breakdown, and compiler notes.</p>
                      </div>
                      <a
                        href="https://docs.soliditylang.org"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-xs font-bold text-[#0056D2] hover:bg-blue-50 transition-colors shrink-0"
                      >
                        <span>Visit Docs</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {/* ── TAB 3: KNOWLEDGE CHECK (QUIZ) ── */}
                {activeTab === "quiz" && lesson.quiz && (
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                        Check Your Understanding
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        {lesson.quiz.question}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Select the correct answer below to test your mastery and verify completion.
                      </p>
                    </div>

                    {/* Quiz options */}
                    <div className="space-y-2.5">
                      {lesson.quiz.options.map((option, idx) => {
                        const isSelected = selectedQuizOption === idx;
                        const showCorrectness = quizSubmitted;
                        const isThisCorrect = idx === lesson.quiz?.correctAnswer;

                        let optionStyle = "border-slate-200 hover:border-slate-300 bg-white text-slate-800";
                        if (isSelected && !showCorrectness) {
                          optionStyle = "border-[#0056D2] bg-blue-50/60 text-[#0056D2] font-semibold";
                        } else if (showCorrectness) {
                          if (isThisCorrect) {
                            optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                          } else if (isSelected && !isThisCorrect) {
                            optionStyle = "border-red-400 bg-red-50 text-red-900";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={quizSubmitted}
                            onClick={() => setSelectedQuizOption(idx)}
                            className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                          >
                            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1 pt-0.5">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit / Results */}
                    {quizSubmitted ? (
                      <div
                        className={`p-4 rounded-xl border text-xs space-y-1.5 ${quizIsCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-red-50 border-red-200 text-red-900"
                          }`}
                      >
                        <p className="font-bold flex items-center gap-1.5 text-sm">
                          {quizIsCorrect ? "🎉 Correct Answer!" : "❌ Incorrect, Review Concept"}
                        </p>
                        <p className="leading-relaxed">{lesson.quiz.explanation}</p>
                        {!quizIsCorrect && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setQuizSubmitted(false);
                              setSelectedQuizOption(null);
                            }}
                            className="mt-2 text-xs"
                          >
                            Try Again
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button
                        onClick={handleQuizSubmit}
                        disabled={selectedQuizOption === null}
                        className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs px-6 py-2.5 h-auto rounded-xl shadow-md"
                      >
                        Submit Answer
                      </Button>
                    )}

                    {/* Certification Quiz Banner */}
                    <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      <div>
                        <p className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-[#0056D2]" />
                          Ready for the Course Certification Quiz?
                        </p>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Test your full knowledge under timed exam conditions and earn an additional +50 MX bounty.
                        </p>
                      </div>
                      <Button asChild className="bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold shadow-xs">
                        <Link href={`/quiz/${courseId}-quiz`}>
                          Take Certification Quiz (+50 MX) →
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* ── TAB 4: AI LEARNING ASSISTANT ── */}
                {activeTab === "ai-tutor" && (
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          BlockLearnX AI Tutor
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Trained on Ethereum Improvement Proposals (EIPs) and smart contract security audit reports.
                        </p>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                      {aiChat.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex gap-3 text-xs leading-relaxed ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                          {msg.role === "assistant" && (
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                              AI
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-2xl max-w-[85%] ${msg.role === "user"
                                ? "bg-[#0056D2] text-white rounded-br-xs"
                                : "bg-slate-100 text-slate-800 rounded-bl-xs"
                              }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {aiThinking && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                          <span>AI Tutor is reasoning through blockchain concepts...</span>
                        </div>
                      )}
                    </div>

                    {/* Suggested prompt chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {[
                        "Explain CEI pattern simply",
                        "Why is SSTORE expensive?",
                        "What is calldata vs memory?",
                      ].map((promptText) => (
                        <button
                          key={promptText}
                          onClick={() => {
                            setAiQuestion(promptText);
                          }}
                          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] transition-colors"
                        >
                          + {promptText}
                        </button>
                      ))}
                    </div>

                    {/* Question input form */}
                    <form onSubmit={handleAskAI} className="flex gap-2">
                      <input
                        type="text"
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        placeholder="Ask a question about this lesson..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-[#0056D2] focus:bg-white"
                      />
                      <Button
                        type="submit"
                        disabled={!aiQuestion.trim() || aiThinking}
                        className="bg-[#0056D2] hover:bg-[#00419e] text-white px-4 rounded-xl"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                )}

              </div>
            </section>

          </div>

          {/* ── 3. BOTTOM STICKY ACTION BAR: [Complete Lesson & Earn +15 MX] ── */}
          <footer className="sticky bottom-0 bg-white border-t border-slate-200 px-4 sm:px-8 py-3.5 shadow-lg z-20">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">

              {/* Prev Lesson */}
              <div>
                {surrounding.prevLesson ? (
                  <Button
                    asChild
                    variant="outline"
                    className="border-slate-300 text-slate-700 font-semibold text-xs h-10 px-4"
                  >
                    <Link href={`/learn/${courseId}/${surrounding.prevLesson.slug}`}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous Lesson
                    </Link>
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="outline"
                    className="border-slate-200 text-slate-400 text-xs h-10 px-4 opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    First Lesson
                  </Button>
                )}
              </div>

              {/* Central Main Action Button: [Dynamic Continue Action after Video Ends] */}
              <div className="flex items-center gap-3">
                {(!videoEnded && !isLessonCompleted) ? (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs border border-slate-200">
                    <Clock className="h-4 w-4 text-amber-500 animate-pulse" />
                    <span>Watch video to finish lesson &amp; continue</span>
                  </div>
                ) : (
                  <Button
                    id="complete-lesson-btn"
                    onClick={handleContinueAction}
                    className="bg-gradient-to-r from-[#0056D2] to-blue-600 hover:from-[#00419e] hover:to-blue-700 text-white font-black text-xs sm:text-sm h-11 px-6 sm:px-8 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <span>
                      {isLastLessonOfCourse
                        ? "Complete Course & Verify Certificate Eligibility →"
                        : isLastLessonOfModule
                        ? "Complete Module & Continue →"
                        : "Continue to Next Lesson →"}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Next Lesson */}
              <div>
                {surrounding.nextLesson ? (
                  <Button
                    asChild
                    variant="outline"
                    className="border-slate-300 text-slate-700 font-semibold text-xs h-10 px-4"
                  >
                    <Link href={`/learn/${courseId}/${surrounding.nextLesson.slug}`}>
                      Next Lesson
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs h-10 px-4"
                  >
                    <Link href="/dashboard">
                      <Award className="h-4 w-4 mr-1.5" />
                      View Final NFT Degree
                    </Link>
                  </Button>
                )}
              </div>

            </div>
          </footer>

        </main>
      </div>

      {/* ── CELEBRATION MODALS & OVERLAYS ── */}
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      <RewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        lesson={lesson}
        curriculum={curriculum}
        nextLesson={surrounding.nextLesson}
        completedCount={completedLessonIds.length}
        totalLessons={surrounding.totalLessons}
        onContinueNext={handleNextLesson}
      />

      <PdfPreviewModal
        resource={previewResource}
        isOpen={!!previewResource}
        onClose={() => setPreviewResource(null)}
      />

      {/* ── MODAL: CERTIFICATE DETAILS & CONFIRMATION ── */}
      {showCertDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10 pointer-events-none" />

            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-50 text-[#0056D2] border border-blue-100 shadow-2xs">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Certificate &amp; Sepolia NFT Minting
                  </h3>
                  <p className="text-xs text-slate-500">
                    Confirm your details to generate your verified Sepolia NFT Certificate.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCertDetailsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {certIssuedResult ? (
              /* Success View */
              <div className="space-y-5 text-center py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900">
                    🎉 Certificate &amp; NFT Minted!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your blockchain certificate and NFT have been deployed to Ethereum Sepolia &amp; uploaded to IPFS.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Certificate ID:</span>
                    <span className="font-bold text-slate-900">{certIssuedResult.certificate?.certificate_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Token ID:</span>
                    <span className="font-bold text-[#0056D2]">#{certIssuedResult.certificate?.token_id || "1"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Network:</span>
                    <span className="font-bold text-purple-700">Ethereum Sepolia</span>
                  </div>
                  {certIssuedResult.certificate?.tx_hash && (
                    <div className="flex justify-between truncate">
                      <span className="text-slate-500">Tx Hash:</span>
                      <span className="text-slate-700 font-sans truncate max-w-[180px]">{certIssuedResult.certificate.tx_hash}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <Button
                    asChild
                    className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs h-11 rounded-xl shadow-md w-full"
                  >
                    <Link href={`/verify/certificate/${certIssuedResult.certificate?.certificate_id}`}>
                      View &amp; Verify On-Chain Certificate →
                    </Link>
                  </Button>
                  {certIssuedResult.certificate?.tx_hash && (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${certIssuedResult.certificate.tx_hash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0056D2] py-1"
                    >
                      <span>View Sepolia Etherscan Transaction</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              /* Input Form View */
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Student Full Name (Printed on Certificate)
                  </label>
                  <input
                    type="text"
                    value={studentNameInput}
                    onChange={(e) => setStudentNameInput(e.target.value)}
                    placeholder="Enter full legal name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900 focus:bg-white focus:border-[#0056D2] focus:outline-none transition-colors"
                  />
                  <p className="text-[11px] text-slate-400">
                    Prefilled from your verified student profile. You can edit before minting.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Course Name</span>
                    <span className="font-bold text-slate-900 truncate block mt-0.5">{curriculum.courseTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Assessment Score</span>
                    <span className="font-bold text-emerald-600 block mt-0.5">{assessmentScore}% Passed</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs leading-relaxed space-y-1">
                  <p className="font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    Blockchain &amp; IPFS Verification
                  </p>
                  <p className="text-amber-800/90 text-[11px]">
                    Token ID, Smart Contract Address, Sepolia Tx Hash, QR Code, and IPFS Metadata CIDs will be generated automatically and etched onto the certificate SVG.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={() => setShowCertDetailsModal(false)}
                    className="text-slate-600 text-xs h-11 px-5 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleIssueCertificate}
                    disabled={certIssuing || !studentNameInput.trim()}
                    className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs h-11 px-6 rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2"
                  >
                    {certIssuing ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Generating &amp; Minting Certificate...</span>
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4" />
                        <span>Generate &amp; Mint Blockchain Certificate</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL: ASSESSMENT REQUIRED ── */}
      {showAssessmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-8 space-y-5 text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Award className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">
                Final Assessment Required
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have finished all 3 modules in this course! To receive your official Sepolia Blockchain Certificate NFT, you must complete and pass the final course assessment.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-left text-xs space-y-1.5 text-blue-950">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#0056D2]" />
                Assessment Criteria
              </p>
              <ul className="list-disc list-inside text-slate-700 text-[11px] space-y-1">
                <li>Evaluated by Gemini AI evaluation engine</li>
                <li>Passing score threshold: 70% or higher</li>
                <li>Unlocks +50 MX token reward + Sepolia Certificate NFT</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                asChild
                className="bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs h-11 rounded-xl shadow-md w-full"
              >
                <Link href={`/assessment/${courseId}-final-exam`}>
                  Take Final Course Assessment Now →
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowAssessmentModal(false)}
                className="text-slate-500 hover:text-slate-800 text-xs h-9"
              >
                Back to Lessons
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

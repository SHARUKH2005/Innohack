"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAllCourseLessons } from "@/lib/learning-data";

export default function CourseLearnRedirect() {
  const params = useParams();
  const router = useRouter();
  const courseId = (params?.courseId as string) || "solidity-fundamentals";

  useEffect(() => {
    const lessons = getAllCourseLessons(courseId);
    if (lessons.length > 0) {
      router.replace(`/learn/${courseId}/${lessons[0].slug}`);
    } else {
      router.replace(`/courses/${courseId}`);
    }
  }, [courseId, router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#0056D2] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-300">Loading course curriculum...</p>
      </div>
    </div>
  );
}

import { supabase } from "../config/supabase";

export async function getCertificateData(
  userId: string,
  courseId: string,
  assessmentId: string
) {
  const [
    { data: user, error: userError },
    { data: course, error: courseError },
    { data: assessment, error: assessmentError },
  ] = await Promise.all([
    supabase
      .from("users")
      .select("id, name, wallet_address")
      .eq("id", userId)
      .single(),

    supabase
      .from("courses")
      .select("id, title")
      .eq("id", courseId)
      .single(),

    supabase
      .from("assessments")
      .select("id, score, status, evaluated_at")
      .eq("id", assessmentId)
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single(),
  ]);

  if (userError) {
    throw new Error(`Unable to fetch student: ${userError.message}`);
  }

  if (courseError) {
    throw new Error(`Unable to fetch course: ${courseError.message}`);
  }

  if (assessmentError) {
    throw new Error(
      `Unable to fetch assessment: ${assessmentError.message}`
    );
  }

  if (!user?.wallet_address) {
    throw new Error("Student wallet address not found");
  }

  if (assessment.score === null || assessment.score === undefined) {
    throw new Error("Assessment score is not available");
  }

  return {
    userId: user.id,
    studentName: user.name,
    walletAddress: user.wallet_address,

    courseId: course.id,
    courseName: course.title,

    assessmentId: assessment.id,
    score: Number(assessment.score),
    status: assessment.status,
    evaluatedAt: assessment.evaluated_at,
  };
}
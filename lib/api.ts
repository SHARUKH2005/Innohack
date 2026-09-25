/**
 * BlockLearnX API Client
 * Communicates with the backend Express API at http://localhost:5000
 */

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API Error ${res.status}: ${await res.text()}`);
  return res.json();
}

// ── Users ──────────────────────────────────────────────
export const usersApi = {
  getProfile: (userId: string) => apiFetch(`/users/${userId}`),
  updateProfile: (userId: string, data: Record<string, unknown>) =>
    apiFetch(`/users/${userId}`, { method: "PUT", body: JSON.stringify(data) }),
};

// ── Courses ────────────────────────────────────────────
export const coursesApi = {
  list: (params?: { category?: string; search?: string; level?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch(`/courses${qs ? `?${qs}` : ""}`);
  },
  get: (courseId: string) => apiFetch(`/courses/${courseId}`),
  create: (data: Record<string, unknown>) =>
    apiFetch("/courses", { method: "POST", body: JSON.stringify(data) }),
  update: (courseId: string, data: Record<string, unknown>) =>
    apiFetch(`/courses/${courseId}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (courseId: string) =>
    apiFetch(`/courses/${courseId}`, { method: "DELETE" }),
};

// ── Enrollments ────────────────────────────────────────
export const enrollmentsApi = {
  list: (userId: string) => apiFetch(`/enrollments?userId=${userId}`),
  enroll: (userId: string, courseId: string) =>
    apiFetch("/enrollments", { method: "POST", body: JSON.stringify({ userId, courseId }) }),
  unenroll: (enrollmentId: string) =>
    apiFetch(`/enrollments/${enrollmentId}`, { method: "DELETE" }),
};

// ── Progress ───────────────────────────────────────────
export const progressApi = {
  get: (userId: string, courseId?: string) =>
    apiFetch(`/progress?userId=${userId}${courseId ? `&courseId=${courseId}` : ""}`),
  update: (data: { userId: string; courseId: string; lessonId: string; completed: boolean }) =>
    apiFetch("/progress", { method: "POST", body: JSON.stringify(data) }),
};

// ── Assessments ────────────────────────────────────────
export const assessmentsApi = {
  get: (courseId: string) => apiFetch(`/assessments/${courseId}`),
  submit: (data: { courseId: string; userId: string; answers: Record<string, string> }) =>
    apiFetch("/assessments/submit", { method: "POST", body: JSON.stringify(data) }),
};

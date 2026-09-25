"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Plus, Trash2, Upload, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = ["Basic Info", "Curriculum", "Pricing", "Publish"];

const CATEGORIES = ["Blockchain", "Frontend", "Backend", "Design", "Data Science", "DevOps"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

type Lesson = { id: string; title: string; duration: string; type: "video" | "quiz" | "reading" };
type Module = { id: string; title: string; lessons: Lesson[] };

export default function CreateCoursePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    language: "English",
    tags: "",
    price: "",
    isFree: false,
    requirements: "",
    objectives: "",
  });
  const [modules, setModules] = useState<Module[]>([
    { id: "m1", title: "Module 1: Introduction", lessons: [{ id: "l1", title: "Welcome", duration: "5 min", type: "video" }] },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: string, val: string | boolean) => setForm((p) => ({ ...p, [key]: val }));

  const addModule = () => {
    const id = `m${Date.now()}`;
    setModules((p) => [...p, { id, title: `Module ${p.length + 1}`, lessons: [] }]);
  };

  const addLesson = (modId: string) => {
    const lid = `l${Date.now()}`;
    setModules((p) => p.map((m) => m.id === modId ? { ...m, lessons: [...m.lessons, { id: lid, title: "New Lesson", duration: "10 min", type: "video" }] } : m));
  };

  const removeModule = (modId: string) => setModules((p) => p.filter((m) => m.id !== modId));

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    router.push("/provider/courses");
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <p className="text-muted-foreground mt-1">Build and publish your course to learners worldwide</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => i <= step && setStep(i)}
              className={`flex items-center gap-2 text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? "bg-emerald-500 text-white" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden sm:block">{s}</span>
            </button>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Basic Info */}
      {step === 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-lg">Basic Information</h2>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Course Title *</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g., Solidity Smart Contracts Masterclass" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Description *</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} placeholder="Describe what learners will achieve..." className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Category *</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Level *</label>
              <select value={form.level} onChange={(e) => update("level", e.target.value)} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">Select level</option>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Learning Objectives</label>
            <textarea value={form.objectives} onChange={(e) => update("objectives", e.target.value)} rows={3} placeholder="What will students be able to do after this course? (one per line)" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>
        </div>
      )}

      {/* Step 1: Curriculum */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Course Curriculum</h2>
            <Button onClick={addModule} size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Module
            </Button>
          </div>

          {modules.map((mod, mi) => (
            <div key={mod.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
                <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">{mi + 1}</div>
                <input
                  value={mod.title}
                  onChange={(e) => setModules((p) => p.map((m) => m.id === mod.id ? { ...m, title: e.target.value } : m))}
                  className="flex-1 bg-transparent text-sm font-medium focus:outline-none"
                />
                <button onClick={() => removeModule(mod.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3 space-y-2">
                {mod.lessons.map((lesson, li) => (
                  <div key={lesson.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/20">
                    <span className="text-xs text-muted-foreground w-4">{li + 1}.</span>
                    <input
                      value={lesson.title}
                      onChange={(e) => setModules((p) => p.map((m) => m.id === mod.id ? { ...m, lessons: m.lessons.map((l) => l.id === lesson.id ? { ...l, title: e.target.value } : l) } : m))}
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                    <select
                      value={lesson.type}
                      onChange={(e) => setModules((p) => p.map((m) => m.id === mod.id ? { ...m, lessons: m.lessons.map((l) => l.id === lesson.id ? { ...l, type: e.target.value as Lesson["type"] } : l) } : m))}
                      className="text-xs bg-background border border-border rounded px-2 py-1"
                    >
                      <option value="video">Video</option>
                      <option value="quiz">Quiz</option>
                      <option value="reading">Reading</option>
                    </select>
                    <input value={lesson.duration} onChange={(e) => setModules((p) => p.map((m) => m.id === mod.id ? { ...m, lessons: m.lessons.map((l) => l.id === lesson.id ? { ...l, duration: e.target.value } : l) } : m))} className="w-16 text-xs bg-background border border-border rounded px-2 py-1 text-center" />
                  </div>
                ))}
                <button onClick={() => addLesson(mod.id)} className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground border border-dashed border-border rounded-lg transition-colors hover:border-primary/50">
                  <Plus className="h-3.5 w-3.5" /> Add Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Pricing */}
      {step === 2 && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-lg">Pricing</h2>

          <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
            <input type="checkbox" checked={form.isFree} onChange={(e) => update("isFree", e.target.checked)} className="rounded" />
            <div>
              <div className="font-medium">Free Course</div>
              <div className="text-sm text-muted-foreground">Make this course free for all learners</div>
            </div>
          </label>

          {!form.isFree && (
            <div>
              <label className="text-sm font-medium mb-1.5 block">Price (USD) *</label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="49.99" min="0" step="0.01" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          )}

          <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground">
            <strong>Note:</strong> Learners who complete this course will earn MX reward tokens. Set a competitive price and watch your enrollment grow!
          </div>
        </div>
      )}

      {/* Step 3: Publish */}
      {step === 3 && (
        <div className="bg-card border border-border rounded-2xl p-6 text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ready to Publish?</h2>
          <p className="text-muted-foreground mb-6">Review your course details before making it live for learners.</p>

          <div className="bg-muted/30 rounded-xl p-5 text-left mb-6 space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span className="font-medium">{form.title || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-medium">{form.category || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Level</span><span className="font-medium">{form.level || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Modules</span><span className="font-medium">{modules.length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-medium">{form.isFree ? "Free" : form.price ? `$${form.price}` : "—"}</span></div>
          </div>

          <Button onClick={handleSubmit} disabled={submitting} size="lg" className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white gap-2">
            {submitting ? "Publishing..." : "Publish Course 🚀"}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 && (
          <Button onClick={() => setStep((s) => s + 1)} className="gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </main>
  );
}

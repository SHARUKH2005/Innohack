"use client";

import { useState, useEffect } from "react";
import { User, Edit3, Github, Twitter, Linkedin, Globe, Save, Camera, BookOpen, Award, Coins, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_PROFILE = {
  name: "Alex Johnson",
  username: "alex_j",
  email: "alex@example.com",
  bio: "Full-stack developer learning Web3 technologies. Passionate about decentralized education and blockchain development.",
  avatar: null,
  location: "San Francisco, CA",
  website: "https://alexj.dev",
  twitter: "@alexj_dev",
  github: "alexj",
  linkedin: "alexjohnson",
  joinDate: "June 2025",
  stats: { coursesCompleted: 3, hoursLearned: 68, certificates: 2, mxEarned: 420, streak: 12 },
  skills: ["React", "TypeScript", "Node.js", "Solidity", "CSS", "PostgreSQL"],
  achievements: ["Early Bird", "Night Owl", "Marathon Learner", "Consistent", "Weekend Warrior"],
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [draft, setDraft] = useState(MOCK_PROFILE);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = profile.name.split(" ").map((n) => n[0]).join("");

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left sidebar — profile card */}
        <div className="md:col-span-1 space-y-4">
          {/* Avatar + name card */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {initials}
              </div>
              {editing && (
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <div className="text-sm text-muted-foreground mt-0.5">@{profile.username}</div>
            <div className="text-sm text-muted-foreground mt-1">{profile.location}</div>
            <div className="mt-3 text-sm text-muted-foreground leading-relaxed">{profile.bio}</div>

            {/* Socials */}
            <div className="flex justify-center gap-3 mt-4">
              {profile.github && (
                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile.twitter && (
                <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>

            <Button className="w-full mt-4 gap-2" variant={editing ? "outline" : "default"} onClick={() => editing ? handleSave() : setEditing(true)}>
              {editing ? <><Save className="h-4 w-4" /> Save Profile</> : <><Edit3 className="h-4 w-4" /> Edit Profile</>}
            </Button>
            {saved && <div className="text-xs text-emerald-500 mt-2">✓ Profile saved</div>}
          </div>

          {/* Stats */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Learning Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Courses Completed", value: profile.stats.coursesCompleted, icon: <BookOpen className="h-4 w-4 text-blue-500" /> },
                { label: "Hours Learned", value: `${profile.stats.hoursLearned}h`, icon: <Star className="h-4 w-4 text-amber-500" /> },
                { label: "Certificates", value: profile.stats.certificates, icon: <Award className="h-4 w-4 text-emerald-500" /> },
                { label: "MX Earned", value: `${profile.stats.mxEarned} MX`, icon: <Coins className="h-4 w-4 text-orange-500" /> },
                { label: "Study Streak", value: `${profile.stats.streak} days 🔥`, icon: null },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {s.icon}
                    {s.label}
                  </div>
                  <div className="text-sm font-semibold">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — edit form + achievements */}
        <div className="md:col-span-2 space-y-4">
          {/* Edit form */}
          {editing && (
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-5">Edit Profile</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Username", key: "username", type: "text" },
                  { label: "Location", key: "location", type: "text" },
                  { label: "Website", key: "website", type: "url" },
                  { label: "Twitter", key: "twitter", type: "text" },
                  { label: "GitHub", key: "github", type: "text" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={(draft as Record<string, string>)[field.key]}
                      onChange={(e) => setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-1.5 block">Bio</label>
                  <textarea
                    value={draft.bio}
                    onChange={(e) => setDraft((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Achievements */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Achievements</h3>
            <div className="flex flex-wrap gap-3">
              {profile.achievements.map((a) => (
                <div key={a} className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent courses */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Learning Portfolio</h3>
            <div className="space-y-3">
              {[
                { name: "Solidity Smart Contracts", grade: "A+", date: "Aug 15, 2025", gradient: "from-violet-500 to-purple-600", certified: true },
                { name: "Advanced JavaScript", grade: "A", date: "Jul 20, 2025", gradient: "from-amber-500 to-orange-600", certified: true },
                { name: "React Fundamentals", grade: "In Progress", date: "Current", gradient: "from-blue-500 to-indigo-600", certified: false },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}>
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.date}</div>
                  </div>
                  <div className={`text-sm font-bold ${c.grade === "In Progress" ? "text-amber-500" : "text-emerald-500"}`}>
                    {c.grade}
                  </div>
                  {c.certified && <Award className="h-4 w-4 text-amber-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

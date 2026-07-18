"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, BookOpen, Bookmark, CheckCircle, RotateCcw, PenTool, RefreshCw, Star, Trash2, Edit2, Check, User } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { useUserStore } from "@/lib/store";
import { PRE_POPULATED_TOPICS } from "@/lib/topics-data";

export default function DashboardPage() {
  const { store, isLoaded, toggleBookmark, saveNote, updateProfileName, resetProgress } = useUserStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <RefreshCw size={24} className="animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  const handleStartEditName = () => {
    setNameInput(store.profile.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    updateProfileName(nameInput);
    setIsEditingName(false);
  };

  // Experience level bounds
  const currentXP = store.profile.exp;
  const level = Math.floor(currentXP / 500) + 1;
  const xpNeeded = 500;
  const currentLevelProgress = currentXP % 500;
  const pct = (currentLevelProgress / xpNeeded) * 100;

  // Certificates capability (unlocked at Lvl 2 / 500 XP)
  const isUnlockedCert = currentXP >= 500;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 bg-background relative">
          <div className="max-w-4xl mx-auto space-y-8 pb-16">
            
            {/* Header Title */}
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">Academy Classroom</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Track your software engineering status, notes, quiz scores, and certificate awards.</p>
            </div>

            {/* Profile Level Section */}
            <div className="p-6 border border-border bg-card rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <User size={32} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    {isEditingName ? (
                      <div className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="bg-muted border border-border rounded px-2 py-0.5 text-sm text-foreground outline-none focus:border-blue-500"
                        />
                        <button onClick={handleSaveName} className="p-1 text-emerald-500 hover:bg-muted rounded">
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-lg font-bold text-foreground">{store.profile.name}</h2>
                        <button onClick={handleStartEditName} className="p-1 text-muted-foreground hover:text-foreground">
                          <Edit2 size={12} />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-semibold text-blue-500">{store.profile.title}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span className="text-muted-foreground">{store.profile.rank}</span>
                  </div>
                </div>
              </div>

              {/* XP Progression Gauge */}
              <div className="flex-1 max-w-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Level {level} Experience</span>
                  <span className="text-foreground">{currentLevelProgress} / {xpNeeded} XP</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border/50">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Badges Collection */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Acquired Badges</h3>
              <div className="flex flex-wrap gap-2">
                {store.profile.badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm"
                  >
                    <Star size={12} className="fill-current animate-pulse" />
                    <span>{badge}</span>
                  </div>
                ))}
                {store.profile.badges.length === 0 && (
                  <div className="text-xs text-muted-foreground py-2 italic">Earn experience to unlock achievements.</div>
                )}
              </div>
            </div>

            {/* Certificate Award Sandbox */}
            <div className="p-6 border border-border bg-gradient-to-tr from-amber-500/5 to-yellow-500/5 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground flex items-center space-x-1.5">
                    <Award size={18} className="text-amber-500" />
                    <span>Competency Certificate Registry</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">Earn at least 500 XP to qualify and generate your print-ready certificate.</p>
                </div>
                <div className="text-xs font-bold text-amber-500 uppercase bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/10">
                  {isUnlockedCert ? "Qualified" : "Locked (Need 500 XP)"}
                </div>
              </div>

              {isUnlockedCert ? (
                <div className="space-y-4 pt-2">
                  <button
                    onClick={() => setShowCertificate(!showCertificate)}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all"
                  >
                    {showCertificate ? "Hide Certificate Document" : "Render Certificate"}
                  </button>

                  {/* Render Printable Certificate Panel */}
                  {showCertificate && (
                    <div className="p-8 border-4 border-double border-amber-500 bg-white text-slate-900 rounded-xl space-y-6 text-center max-w-xl mx-auto shadow-2xl animate-in zoom-in-95 duration-200">
                      <div className="flex justify-center">
                        <Award size={64} className="text-amber-500 animate-spin-slow" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-3xl font-extrabold tracking-wide uppercase">Certificate of Competency</h4>
                        <p className="text-xs font-serif uppercase tracking-widest text-slate-500">This recognizes that</p>
                      </div>
                      <div className="border-b-2 border-slate-900 max-w-xs mx-auto pb-1.5">
                        <span className="font-serif text-2xl font-bold italic">{store.profile.name}</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        <p>has demonstrated technical proficiency across fundamental subjects of Information Technology in the Tech World Academy.</p>
                        <p className="font-semibold text-slate-800">Title Earned: {store.profile.title}</p>
                      </div>
                      <div className="pt-4 flex justify-between items-end text-[10px] text-slate-400 font-mono">
                        <div>ID: TW-CERT-{Math.floor(Math.random() * 100000)}</div>
                        <div className="font-serif italic text-slate-700 border-t border-slate-300 pt-1.5 px-4 font-bold">Tech World Academy Registrar</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full bg-muted/40 rounded-xl p-4 text-center text-xs text-muted-foreground border border-dashed">
                  Finish topic quizzes and mark learning logs complete to gain another {500 - currentXP} XP.
                </div>
              )}
            </div>

            {/* Bookmarks, Notes, and Quiz Lists tabs grid */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Left Grid: Bookmarked Topics */}
              <div className="p-6 border border-border bg-card rounded-2xl shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-foreground flex items-center space-x-1.5">
                  <Bookmark size={16} className="text-blue-500" />
                  <span>Saved Bookmarks</span>
                </h3>
                <div className="space-y-2">
                  {store.bookmarks.map(bSlug => {
                    const matched = PRE_POPULATED_TOPICS[bSlug];
                    const title = matched ? matched.title : bSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                    return (
                      <div key={bSlug} className="flex items-center justify-between p-3 bg-muted/20 border border-border rounded-xl">
                        <Link href={`/topics/${bSlug}`} className="text-xs font-bold hover:text-blue-500 truncate max-w-[200px]">
                          {title}
                        </Link>
                        <button onClick={() => toggleBookmark(bSlug)} className="text-[10px] text-rose-500 font-bold hover:underline">
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  {store.bookmarks.length === 0 && (
                    <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                      No bookmarks saved yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Grid: Quiz History */}
              <div className="p-6 border border-border bg-card rounded-2xl shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-foreground flex items-center space-x-1.5">
                  <CheckCircle size={16} className="text-emerald-500" />
                  <span>Exam Scores</span>
                </h3>
                <div className="space-y-2">
                  {Object.entries(store.quizScores).map(([qSlug, record]) => {
                    const matched = PRE_POPULATED_TOPICS[qSlug];
                    const title = matched ? matched.title : qSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                    const percentage = Math.round((record.score / record.total) * 100);
                    return (
                      <div key={qSlug} className="flex items-center justify-between p-3 bg-muted/20 border border-border rounded-xl">
                        <div className="space-y-1">
                          <Link href={`/topics/${qSlug}`} className="text-xs font-bold hover:text-blue-500 block truncate max-w-[180px]">
                            {title}
                          </Link>
                          <span className="text-[10px] text-muted-foreground">Checked on {record.date}</span>
                        </div>
                        <div className={`text-xs font-bold ${percentage >= 70 ? "text-emerald-500" : "text-amber-500"}`}>
                          {record.score} / {record.total} ({percentage}%)
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(store.quizScores).length === 0 && (
                    <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                      No exams completed yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Archive */}
            <div className="p-6 border border-border bg-card rounded-2xl shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center space-x-1.5">
                <PenTool size={16} className="text-blue-500" />
                <span>My Notes Archive</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(store.notes).map(([nSlug, text]) => {
                  const matched = PRE_POPULATED_TOPICS[nSlug];
                  const title = matched ? matched.title : nSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                  return (
                    <div key={nSlug} className="p-4 border border-border bg-muted/25 rounded-xl space-y-2">
                      <div className="flex items-center justify-between border-b border-border pb-1.5">
                        <Link href={`/topics/${nSlug}`} className="text-xs font-bold text-blue-500 hover:underline">
                          {title}
                        </Link>
                        <button onClick={() => saveNote(nSlug, "")} className="text-[10px] text-rose-500 hover:underline flex items-center space-x-0.5">
                          <Trash2 size={10} />
                          <span>Delete</span>
                        </button>
                      </div>
                      <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">{text}</p>
                    </div>
                  );
                })}
                {Object.keys(store.notes).length === 0 && (
                  <div className="p-8 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                    No custom study notes taken yet. Use the notes pad on any subject guide to take down remarks.
                  </div>
                )}
              </div>
            </div>

            {/* Reset option */}
            <div className="flex justify-end">
              <button
                onClick={resetProgress}
                className="px-4 py-2 border border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10 text-xs font-bold rounded-lg transition-all"
              >
                Reset Academy Progress
              </button>
            </div>
          </div>
        </main>
      </div>

      <ChatWidget activeTopic="Academy Dashboard" />
    </div>
  );
}

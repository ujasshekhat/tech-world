"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Bookmark, CheckSquare, BookOpen, Layers, Terminal, ShieldAlert, Award, FileCode2, ClipboardList, PenTool, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Flashcards } from "@/components/docs/Flashcards";
import { InteractiveQuiz } from "@/components/docs/InteractiveQuiz";
import { getTopicData } from "@/lib/topics-data";
import { useUserStore } from "@/lib/store";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type TabType = "docs" | "architecture" | "code" | "guidelines" | "interactive" | "qa";

export default function TopicPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const topic = getTopicData(slug);
  const { store, toggleBookmark, toggleCompleted, saveNote, submitQuizScore, isLoaded } = useUserStore();

  const [activeTab, setActiveTab] = useState<TabType>("docs");
  const [localNote, setLocalNote] = useState("");
  const [noteSavedMsg, setNoteSavedMsg] = useState(false);

  const isBookmarked = store.bookmarks.includes(slug);
  const isCompleted = store.completedTopics.includes(slug);
  const savedNoteContent = store.notes[slug] || "";
  const quizRecord = store.quizScores[slug];

  useEffect(() => {
    if (isLoaded) {
      setLocalNote(savedNoteContent);
    }
  }, [isLoaded, savedNoteContent]);

  const handleSaveNoteLocal = () => {
    saveNote(slug, localNote);
    setNoteSavedMsg(true);
    setTimeout(() => setNoteSavedMsg(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 bg-background relative">
          <div className="max-w-4xl mx-auto space-y-8 pb-16">
            
            {/* Navigation & Utilities Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
                <ChevronRight size={12} />
                <span className="font-medium">{topic.category}</span>
                <ChevronRight size={12} />
                <span className="font-semibold text-foreground truncate max-w-[200px]">{topic.title}</span>
              </div>

              {/* Interaction Panel */}
              <div className="flex items-center space-x-2 self-start sm:self-auto">
                {/* Bookmark Toggle */}
                <button
                  onClick={() => toggleBookmark(slug)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    isBookmarked
                      ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "border-border bg-card hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <Bookmark size={14} className={isBookmarked ? "fill-current" : ""} />
                  <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </button>

                {/* Mark Completed Toggle */}
                <button
                  onClick={() => toggleCompleted(slug)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    isCompleted
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-border bg-card hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <CheckSquare size={14} />
                  <span>{isCompleted ? "Completed" : "Mark as Completed"}</span>
                </button>
              </div>
            </div>

            <Link href="/" className="inline-flex items-center space-x-1 text-xs text-blue-500 font-bold hover:underline mb-2">
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>

            {/* Title Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/5 px-2.5 py-1 rounded border border-blue-500/10 w-fit">
                <BookOpen size={12} />
                <span>{topic.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">{topic.title}</h1>
              <p className="text-base text-foreground font-semibold leading-relaxed border-l-4 border-blue-500 pl-4 py-1.5 bg-muted/30 rounded-r-xl">
                {topic.definition}
              </p>
            </div>

            {/* Content Tabs Navigation */}
            <div className="flex items-center space-x-1 p-1 bg-muted border border-border rounded-xl overflow-x-auto whitespace-nowrap scrollbar-none shadow-sm">
              {(["docs", "architecture", "code", "guidelines", "interactive", "qa"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? "bg-card text-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "docs" ? "1. Explanations" :
                   tab === "architecture" ? "2. Architecture" :
                   tab === "code" ? "3. Implementation" :
                   tab === "guidelines" ? "4. Best Practices" :
                   tab === "interactive" ? "5. Practice Sandbox" :
                   "6. FAQs & Prep"}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm min-h-[400px]">
              
              {/* Tab 1: Explanations */}
              {activeTab === "docs" && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">Beginner Explanation</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{topic.beginnerExplanation}</p>
                  </div>

                  <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500">Real-World Analogy</h4>
                    <p className="text-xs text-foreground leading-relaxed italic">"{topic.analogy}"</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">Advanced Explanation</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{topic.advancedExplanation}</p>
                  </div>

                  <hr className="border-border" />

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Historical Origin</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{topic.history}</p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Why it Exists</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{topic.whyExists}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Architecture */}
              {activeTab === "architecture" && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">Core Components & Building Blocks</h3>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {topic.components.map((comp, idx) => (
                        <li key={idx} className="p-3 bg-muted/40 rounded-xl text-xs text-foreground flex items-center space-x-2 border border-border/50">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">System Architecture Model</h3>
                    <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-900 leading-normal">
                      {topic.architecture}
                    </pre>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">Internal Execution Flow</h3>
                    <div className="space-y-3 pl-3 border-l-2 border-border/80">
                      {topic.workflow.map((flow, idx) => (
                        <div key={idx} className="relative pl-6">
                          <div className="absolute left-[-23px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                            {idx + 1}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{flow}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Implementation */}
              {activeTab === "code" && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">Installation & Configuration</h3>
                    <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-900 leading-normal">
                      {topic.setupGuide}
                    </pre>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">Recommended Folder Structure</h3>
                    <pre className="p-4 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto border border-slate-900 leading-normal">
                      {topic.folderStructure}
                    </pre>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">Code Showcase</h3>
                    <CodeBlock
                      code={topic.codeExample.code}
                      language={topic.codeExample.language}
                      explanation={topic.codeExample.explanation}
                    />
                  </div>
                </div>
              )}

              {/* Tab 4: Guidelines & Best Practices */}
              {activeTab === "guidelines" && (
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-5 border border-emerald-500/10 bg-emerald-500/5 rounded-2xl space-y-3">
                      <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                        <CheckSquare size={16} />
                        <span>Core Advantages</span>
                      </h4>
                      <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside">
                        {topic.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                      </ul>
                    </div>

                    <div className="p-5 border border-rose-500/10 bg-rose-500/5 rounded-2xl space-y-3">
                      <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
                        <ShieldAlert size={16} />
                        <span>Core Limitations</span>
                      </h4>
                      <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside">
                        {topic.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-foreground uppercase tracking-wide">Comparison Analysis</h3>
                    <div className="border border-border rounded-xl overflow-hidden shadow-sm text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted border-b border-border text-foreground font-semibold">
                            {topic.comparisonTable.headers.map((h, i) => (
                              <th key={i} className="px-4 py-2.5 text-left">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {topic.comparisonTable.rows.map((row, idx) => (
                            <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                              {row.map((cell, i) => (
                                <td key={i} className="px-4 py-2.5 text-muted-foreground">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <hr className="border-border" />

                  <div className="space-y-4">
                    {[
                      { title: "Security Considerations", items: topic.security, color: "text-amber-500" },
                      { title: "Performance Guidelines", items: topic.performance, color: "text-blue-500" },
                      { title: "Error Handling Strategies", items: topic.errorHandling, color: "text-indigo-500" },
                      { title: "Common Implementation Mistakes", items: topic.commonMistakes, color: "text-rose-500" }
                    ].map((sec, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${sec.color}`}>
                          {sec.title}
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1 pl-4 list-disc">
                          {sec.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Practice Sandbox */}
              {activeTab === "interactive" && (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="text-center max-w-md mx-auto space-y-2">
                      <h3 className="text-lg font-bold text-foreground">Interactive MCQ Testing</h3>
                      <p className="text-xs text-muted-foreground">Verify your knowledge and increase your developer XP level instantly.</p>
                      {quizRecord && (
                        <div className="inline-block text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full">
                          Passed on {quizRecord.date}: {quizRecord.score}/{quizRecord.total} Correct
                        </div>
                      )}
                    </div>
                    <InteractiveQuiz
                      topicSlug={slug}
                      mcqs={topic.mcqs}
                      onSubmitScore={(score, total) => submitQuizScore(slug, score, total)}
                    />
                  </div>

                  <hr className="border-border" />

                  <div className="space-y-4">
                    <div className="text-center max-w-md mx-auto space-y-2">
                      <h3 className="text-lg font-bold text-foreground">Active Recall Cards</h3>
                      <p className="text-xs text-muted-foreground">Test your memory on terminology and low-level concepts.</p>
                    </div>
                    {/* Create mock flashcard array from terminology and key concepts */}
                    <Flashcards
                      cards={[
                        ...topic.terminology.map(t => ({ front: `What is the definition of "${t.term}"?`, back: t.definition })),
                        { front: `What does this topic establish under real-world analogies?`, back: topic.analogy }
                      ]}
                    />
                  </div>

                  <hr className="border-border" />

                  <div className="space-y-6">
                    <div className="text-center max-w-md mx-auto space-y-2">
                      <h3 className="text-lg font-bold text-foreground">Practice Labs</h3>
                      <p className="text-xs text-muted-foreground">Try your hands on code assignments and local setups.</p>
                    </div>
                    <div className="space-y-4">
                      {topic.exercises.map((exe, i) => (
                        <div key={i} className="p-5 border border-border bg-muted/20 rounded-2xl space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500">Exercise: {exe.title}</h4>
                          <p className="text-xs text-foreground leading-normal">{exe.problem}</p>
                          <details className="text-xs">
                            <summary className="cursor-pointer text-[10px] font-bold text-indigo-500 hover:underline">Reveal Solution</summary>
                            <pre className="mt-2 p-3 rounded-lg bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto leading-normal">
                              {exe.solution}
                            </pre>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: FAQs & Interview Prep */}
              {activeTab === "qa" && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center space-x-2">
                      <GraduationCap size={18} className="text-blue-500" />
                      <span>Academic & Industry Prep QA</span>
                    </h3>
                    <div className="space-y-4">
                      {topic.questions.map((q, i) => (
                        <div key={i} className="p-4 border border-border bg-muted/20 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                              q.type === "interview" ? "bg-amber-500/10 text-amber-500" : "bg-purple-500/10 text-purple-500"
                            }`}>
                              {q.type} Question
                            </span>
                          </div>
                          <p className="text-xs font-bold text-foreground leading-normal">Q: {q.question}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">A: {q.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                      {topic.faqs.map((faq, i) => (
                        <div key={i} className="space-y-1">
                          <h4 className="text-xs font-bold text-foreground">Q: {faq.question}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 border border-border bg-slate-950 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Cheat Sheet & Revision Notes</h4>
                    <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc">
                      {topic.cheatSheet.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Note taking widget */}
            <div className="p-6 border border-border bg-card rounded-2xl shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center space-x-1.5">
                <PenTool size={16} className="text-blue-500" />
                <span>My Learning Notes</span>
              </h3>
              <textarea
                placeholder="Write down key points, commands, or details to remember..."
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                className="w-full min-h-[100px] bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl p-3.5 text-xs text-foreground placeholder:text-muted-foreground transition-colors"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Notes are auto-saved in your client-side LocalStorage.</span>
                <button
                  onClick={handleSaveNoteLocal}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-all flex items-center space-x-1"
                >
                  <span>Save Note</span>
                </button>
              </div>
              {noteSavedMsg && (
                <div className="text-emerald-500 text-[10px] font-semibold text-right animate-pulse">Notes saved successfully!</div>
              )}
            </div>

            {/* Related/Next topics recommendation */}
            <div className="p-6 border border-border bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest leading-none">Recommended Next Subject</span>
                <h3 className="text-base font-bold text-foreground">{topic.nextTopic.title}</h3>
                <p className="text-xs text-muted-foreground">Move to the next structural guide in this track.</p>
              </div>
              <Link
                href={`/topics/${topic.nextTopic.slug}`}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 hover:scale-102 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center space-x-1 shadow shadow-blue-500/20"
              >
                <span>Launch Guide</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </main>
      </div>

      <ChatWidget activeTopic={topic.title} />
    </div>
  );
}

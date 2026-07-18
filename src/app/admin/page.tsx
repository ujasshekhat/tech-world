"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, Plus, ArrowLeft, RefreshCw, CheckCircle, Database } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CATEGORIES } from "@/lib/topics-data";
import { TopicData } from "@/lib/types";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [definition, setDefinition] = useState("");
  const [beginner, setBeginner] = useState("");
  const [advanced, setAdvanced] = useState("");
  const [analogy, setAnalogy] = useState("");
  const [historyText, setHistoryText] = useState("");
  const [whyExistsText, setWhyExistsText] = useState("");
  const [code, setCode] = useState("");
  
  // MCQ Question
  const [mcqQuestion, setMcqQuestion] = useState("");
  const [mcqOptions, setMcqOptions] = useState("Option A, Option B, Option C, Option D");
  const [mcqAnswerIdx, setMcqAnswerIdx] = useState(0);
  const [mcqExplanation, setMcqExplanation] = useState("");

  const [published, setPublished] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !definition.trim()) return;

    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const newTopic: TopicData = {
      slug,
      title,
      category,
      icon: "BookOpen",
      definition,
      beginnerExplanation: beginner || "This is a dynamic beginner explanation.",
      advancedExplanation: advanced || "This is a dynamic advanced architectural explanation.",
      history: historyText || "Introduced in recent engineering cycles.",
      whyExists: whyExistsText || "Created to abstract low-level components.",
      coreConcepts: ["Modular Design", "Reliable Pipelines"],
      terminology: [
        { term: "Instantiation", definition: "Allocation of resources." }
      ],
      internalWorking: "Runs compiler pipelines and executes scheduler loops.",
      architecture: "+-----------------+\n|  Request Core   |\n+-----------------+",
      workflow: ["Boot systems", "Process payload", "Log monitor specs"],
      components: ["Scheduler Engine", "Thread Regulator"],
      analogy: analogy || "Like a coordinator distributing mail packets.",
      useCases: ["Microservices", "Orchestrated containers"],
      setupGuide: `npm install ${slug}-core`,
      folderStructure: `${slug}-app/\n├── src/\n└── package.json`,
      codeExample: {
        language: "javascript",
        code: code || `// Custom ${title} logic\nconsole.log("Running...");`,
        explanation: ["Line 1: Logs launch message."]
      },
      security: ["Validate payload inputs."],
      performance: ["Local cache filters."],
      errorHandling: ["Try-catch safety frames."],
      bestPractices: ["Keep configs external."],
      commonMistakes: ["Leaving open connections."],
      advantages: ["Fast scaling"],
      disadvantages: ["Minor overhead"],
      comparisonTable: {
        headers: ["Metric", "CMS Subject", "Other Options"],
        rows: [["Speed", "Optimized", "Unregulated"]]
      },
      faqs: [{ question: "Is this dynamic?", answer: "Yes, registered via the Admin CMS." }],
      questions: [{ type: "interview", question: "Why deploy this?", answer: "To decouple execution threads." }],
      mcqs: [
        {
          question: mcqQuestion || "Which of the following is correct?",
          options: mcqOptions.split(",").map(o => o.trim()),
          answerIndex: mcqAnswerIdx,
          explanation: mcqExplanation || "Correct selection based on specification rules."
        }
      ],
      exercises: [{ title: "Mock setup", problem: "Run code sandbox.", solution: "success" }],
      miniProject: { title: "Monitor tool", description: "Logs updates.", steps: ["Create script"] },
      majorProject: { title: "Orchestrator Node", description: "Balances queues.", steps: ["Create balance loops"] },
      cheatSheet: ["Install modules", "Initialize Service"],
      revisionNotes: "Focus on clean architecture constraints.",
      summary: "Standard modular system design.",
      keyTakeaways: ["Decoupling is critical."],
      resources: ["Tech Encyclopedia Guide"],
      relatedTopics: [{ title: "Software Engineering", slug: "software-engineering" }],
      nextTopic: { title: "Software Engineering", slug: "software-architecture" }
    };

    // Save custom topic inside local storage
    const customStr = localStorage.getItem("tech_world_custom_topics");
    let customs: Record<string, TopicData> = {};
    if (customStr) {
      try {
        customs = JSON.parse(customStr);
      } catch (e) {}
    }
    customs[slug] = newTopic;
    localStorage.setItem("tech_world_custom_topics", JSON.stringify(customs));

    // Also register inside subcategory mapping dynamically to show up in Sidebar!
    const customListStr = localStorage.getItem("tech_world_custom_topics_list");
    let list: { title: string; slug: string; category: string }[] = [];
    if (customListStr) {
      try {
        list = JSON.parse(customListStr);
      } catch (e) {}
    }
    if (!list.some(item => item.slug === slug)) {
      list.push({ title, slug, category });
      localStorage.setItem("tech_world_custom_topics_list", JSON.stringify(list));
    }

    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setTitle("");
      setDefinition("");
      setBeginner("");
      setAdvanced("");
      setAnalogy("");
      setHistoryText("");
      setWhyExistsText("");
      setCode("");
      setMcqQuestion("");
      setMcqExplanation("");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-2xl mx-auto space-y-8 pb-16">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center space-x-2">
                <Settings className="text-blue-500" />
                <div>
                  <h1 className="text-xl font-extrabold text-foreground">Admin CMS Simulator</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">Dynamically register custom topics to the encyclopedia.</p>
                </div>
              </div>
              <Link href="/" className="inline-flex items-center space-x-1 text-xs text-blue-500 font-bold hover:underline">
                <ArrowLeft size={12} />
                <span>Overview</span>
              </Link>
            </div>

            {/* CMS Form */}
            <form onSubmit={handlePublish} className="space-y-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Docker Containers"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Category Domain</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Standard Reference Definition</label>
                <textarea
                  required
                  placeholder="Define this subject topic in 1-2 sentence parameters."
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  className="w-full min-h-[60px] bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl p-3 text-xs text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Beginner Analogy</label>
                  <textarea
                    placeholder="Provide a real-world simple analogy."
                    value={analogy}
                    onChange={(e) => setAnalogy(e.target.value)}
                    className="w-full min-h-[80px] bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl p-3 text-xs text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Beginner Explanation</label>
                  <textarea
                    placeholder="Explain to a layman student."
                    value={beginner}
                    onChange={(e) => setBeginner(e.target.value)}
                    className="w-full min-h-[80px] bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl p-3 text-xs text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Advanced Architectural Mechanics</label>
                <textarea
                  placeholder="Explain from a principal designer's perspective..."
                  value={advanced}
                  onChange={(e) => setAdvanced(e.target.value)}
                  className="w-full min-h-[80px] bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl p-3 text-xs text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Historical Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Created by Solomon Hykes in 2013"
                    value={historyText}
                    onChange={(e) => setHistoryText(e.target.value)}
                    className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Why it Exists</label>
                  <input
                    type="text"
                    placeholder="e.g. Decouple host systems from code environments"
                    value={whyExistsText}
                    onChange={(e) => setWhyExistsText(e.target.value)}
                    className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Code Showcase (Javascript)</label>
                <textarea
                  placeholder="// Sample implementation code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full min-h-[80px] bg-slate-950 p-3 rounded-xl border border-slate-900 font-mono text-xs text-emerald-400 focus:outline-none"
                />
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <h4 className="text-xs font-bold text-foreground flex items-center space-x-1">
                  <Database size={14} className="text-blue-500" />
                  <span>Associated Practice MCQ</span>
                </h4>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Question Statement</label>
                  <input
                    type="text"
                    placeholder="e.g. What command runs a detached container?"
                    value={mcqQuestion}
                    onChange={(e) => setMcqQuestion(e.target.value)}
                    className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Options (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="docker run -d, docker exec, docker build, docker init"
                      value={mcqOptions}
                      onChange={(e) => setMcqOptions(e.target.value)}
                      className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Correct Answer Index (0-3)</label>
                    <input
                      type="number"
                      min={0}
                      max={3}
                      value={mcqAnswerIdx}
                      onChange={(e) => setMcqAnswerIdx(parseInt(e.target.value) || 0)}
                      className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Question Explanation</label>
                  <input
                    type="text"
                    placeholder="Explain why the selected option is correct..."
                    value={mcqExplanation}
                    onChange={(e) => setMcqExplanation(e.target.value)}
                    className="w-full bg-muted/40 border border-border focus:border-blue-500 outline-none rounded-xl px-3.5 py-2 text-xs text-foreground"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {published ? (
                  <div className="flex items-center space-x-1.5 text-emerald-500 text-xs font-bold animate-pulse">
                    <CheckCircle size={16} />
                    <span>Topic Registered Successfully!</span>
                  </div>
                ) : (
                  <div />
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-500/10"
                >
                  Publish Subject Guide
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <ChatWidget activeTopic="CMS Portal" />
    </div>
  );
}

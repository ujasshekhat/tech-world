"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Terminal, BookOpen, GraduationCap, ChevronRight, Award, Flame, Star, Shield, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CATEGORIES } from "@/lib/topics-data";
import { Icon } from "@/components/ui/Icon";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | "core" | "advanced">("all");

  const displayedCategories = activeTab === "all"
    ? CATEGORIES.slice(0, 12)
    : activeTab === "core"
      ? CATEGORIES.filter(c => ["computer-fundamentals", "programming-languages", "web-development", "dsa", "databases", "operating-systems", "computer-networks"].includes(c.id))
      : CATEGORIES.filter(c => ["compiler-design", "system-design", "cloud-computing", "devops", "cybersecurity", "artificial-intelligence", "blockchain", "ui-ux"].includes(c.id));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 bg-background relative tech-grid">
          {/* Glowing Background Orbs */}
          <div className="absolute top-12 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

          <div className="max-w-5xl mx-auto space-y-16 relative">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 text-xs font-semibold">
                <Flame size={12} className="animate-bounce" />
                <span>Modern Technical Encyclopedia v1.0</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-foreground">
                Master the Art of{" "}
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
                  Information Technology
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Unlock detailed references, visual workflows, interactive quizzes, flashcards, and a code playground for 30+ IT categories from beginner to architect levels.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <Link
                  href="/topics/react-components"
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 hover:scale-102 transition-all duration-200 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25"
                >
                  <span>Explore React Guide</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/playground"
                  className="flex items-center space-x-2 px-6 py-3 border border-border bg-card hover:bg-muted text-foreground font-semibold rounded-xl text-sm transition-all"
                >
                  <Terminal size={16} className="text-blue-500" />
                  <span>Code Sandbox</span>
                </Link>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Encyclopedia Subjects", count: "30+", desc: "Beginner to Expert level templates" },
                { title: "Interactive Quizzes", count: "100+", desc: "With automated feedback & XP" },
                { title: "Code Sandboxes", count: "HTML/JS", desc: "Compile and execute in browser" },
                { title: "Developer Experience", count: "5 Levels", desc: "Earn titles, badges and certs" }
              ].map((stat, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2 hover:border-blue-500/20 transition-all duration-200">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{stat.count}</div>
                  <div className="text-xs font-bold text-blue-500 uppercase tracking-wide leading-none">{stat.title}</div>
                  <p className="text-[11px] text-muted-foreground leading-tight">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Featured Showcase Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">Featured Subject Guides</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Start with one of our highly detailed pre-populated guides.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Feature 1 React */}
                <div className="group relative border border-border bg-card rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-500/20 transition-all duration-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <Cpu size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-blue-500 transition-colors">React Component Model</h3>
                      <span className="inline-block text-[10px] font-semibold text-blue-500 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">Frontend Development</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Deep dive into props, state synchronization, JSX parsing, Virtual DOM reconciliation algorithms, and component hooks.
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      href="/topics/react-components"
                      className="flex items-center space-x-1.5 text-xs font-bold text-blue-500 hover:text-blue-600"
                    >
                      <span>Access Guide</span>
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Feature 2 TCP/IP */}
                <div className="group relative border border-border bg-card rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-500/20 transition-all duration-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                      <Terminal size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-500 transition-colors">TCP/IP Suite</h3>
                      <span className="inline-block text-[10px] font-semibold text-indigo-500 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">Computer Networks</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Examine layering architectures, 3-way handshakes, sequencing timers, sliding window configurations, and packet routes.
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      href="/topics/tcp-ip-suite"
                      className="flex items-center space-x-1.5 text-xs font-bold text-indigo-500 hover:text-indigo-600"
                    >
                      <span>Access Guide</span>
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Grid (Interactive Search Explorer) */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">Explore Categories</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Browse through our 30+ comprehensive IT learning domains.</p>
                </div>
                {/* Tabs */}
                <div className="flex items-center space-x-1 p-1 rounded-xl bg-muted border border-border self-start">
                  {(["all", "core", "advanced"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                        activeTab === tab
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedCategories.map(category => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group border border-border bg-card/50 hover:bg-card rounded-2xl p-5 shadow-sm hover:shadow hover:border-blue-500/20 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/5 text-blue-500 group-hover:bg-blue-500/10 group-hover:scale-105 transition-all">
                        <Icon name={category.icon} size={20} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <div className="pt-4 flex items-center space-x-1 text-[11px] font-bold text-muted-foreground group-hover:text-blue-500 transition-colors">
                      <span>Browse Subject</span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Embedded Floating AI Widget */}
      <ChatWidget activeTopic="Tech World" />
    </div>
  );
}

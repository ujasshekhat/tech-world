"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, Clock, User, ArrowLeft, Search, Heart, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/ai/ChatWidget";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  likes: number;
}

const POSTS: BlogPost[] = [
  {
    id: "nextjs-15-tailwind-v4",
    title: "Next.js 15 and Tailwind CSS v4: The Future of Web Development",
    excerpt: "Explore the new compiler setups, CSS-only configurations, and hydration safety measures shipped in Next.js 15.",
    content: "Next.js 15 introduces full support for React 19 features including Server Actions, the new React Compiler (which automates useMemo and useCallback optimization), and async route parameters. Coupled with Tailwind CSS v4, styling becomes faster and more modular. Tailwind v4 ditches configuration files in favor of standard CSS `@import 'tailwindcss';` stylesheets, custom `@theme` variables, and faster Rust-based compilation. This drastically lowers client build times and increases styling flexibility.",
    author: "Elena Vance (Principal Architect)",
    date: "July 15, 2026",
    readTime: "5 min read",
    category: "Web Development",
    likes: 42
  },
  {
    id: "demystifying-http3-quic",
    title: "Demystifying HTTP/3: How QUIC is Accelerating the Web",
    excerpt: "Understand how HTTP/3 resolves Head-of-line blocking using UDP connection multiplexing and connection migration.",
    content: "HTTP/3 solves the foundational Head-of-Line blocking issue of TCP connections. By utilizing QUIC (Quick UDP Internet Connections) under the hood, HTTP/3 allows multiple parallel streams to run concurrently over a single UDP connection. If packet drops occur in Stream A, Stream B remains unaffected and continues to buffer. Furthermore, QUIC introduces Connection IDs which enable connection migration: you can switch from Wi-Fi to cellular data without dropping your active connection socket!",
    author: "Bob Kahn (Networks Specialist)",
    date: "June 28, 2026",
    readTime: "8 min read",
    category: "Computer Networks",
    likes: 56
  },
  {
    id: "transformer-attention-mechanics",
    title: "Understanding Self-Attention in Transformer Architectures",
    excerpt: "A low-level breakdown of queries, keys, and values that power modern LLMs.",
    content: "At the core of all modern Large Language Models is the Transformer architecture, powered by the Self-Attention mechanism. Instead of processing text sequentially like RNNs, attention calculations process entire context arrays in parallel. By projecting tokens into Query, Key, and Value vectors, the model computes dot-product similarity scores. These scores determine the relevance of each word relative to every other word in the sequence, allowing the model to capture deep semantic dependencies.",
    author: "Dr. Alan Turing (AI Researcher)",
    date: "May 14, 2026",
    readTime: "12 min read",
    category: "Artificial Intelligence",
    likes: 98
  }
];

export default function BlogPage() {
  const [searchVal, setSearchVal] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [likesState, setLikesState] = useState<Record<string, number>>({
    "nextjs-15-tailwind-v4": 42,
    "demystifying-http3-quic": 56,
    "transformer-attention-mechanics": 98
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesState(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const filteredPosts = POSTS.filter(
    p =>
      p.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      p.category.toLowerCase().includes(searchVal.toLowerCase()) ||
      p.content.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 bg-background relative">
          <div className="max-w-3xl mx-auto space-y-8 pb-16">
            
            {/* Header */}
            <div>
              <h1 className="text-2xl font-extrabold text-foreground flex items-center space-x-2">
                <BookOpen className="text-blue-500" />
                <span>Tech World Journal</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">Insights, updates, and deep architecture breakdowns from our engineering team.</p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search blog articles..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-card border border-border focus:border-blue-500 outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>

            {/* Articles List / Reading space */}
            <div className="space-y-6">
              {expandedPostId ? (
                /* Full Post view */
                (() => {
                  const post = POSTS.find(p => p.id === expandedPostId)!;
                  return (
                    <div className="border border-border bg-card rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
                      <button
                        onClick={() => setExpandedPostId(null)}
                        className="inline-flex items-center space-x-1 text-xs text-blue-500 font-bold hover:underline"
                      >
                        <ArrowLeft size={14} />
                        <span>Back to Articles</span>
                      </button>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-500 uppercase tracking-wider bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10 w-fit">
                          {post.category}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                          {post.title}
                        </h2>
                        
                        <div className="flex flex-wrap gap-4 text-[11px] text-muted-foreground font-medium pt-2 border-b border-border pb-4">
                          <div className="flex items-center space-x-1">
                            <User size={12} />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-medium">
                        {post.content}
                      </p>

                      <div className="flex justify-between items-center border-t border-border pt-4">
                        <button
                          onClick={(e) => handleLike(post.id, e)}
                          className="flex items-center space-x-1.5 px-4 py-2 border border-border bg-card hover:bg-muted text-xs font-bold rounded-xl transition-all"
                        >
                          <Heart size={14} className="text-rose-500 fill-current" />
                          <span>{likesState[post.id]} Likes</span>
                        </button>
                        <span className="text-[10px] text-muted-foreground">Thank you for reading the Journal!</span>
                      </div>
                    </div>
                  );
                })()
              ) : (
                /* Articles Grid list */
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <div
                      key={post.id}
                      onClick={() => setExpandedPostId(post.id)}
                      className="group border border-border bg-card hover:bg-card/50 rounded-2xl p-6 shadow-sm hover:shadow hover:border-blue-500/20 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-block text-[10px] font-bold text-blue-500 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-foreground group-hover:text-blue-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-6">
                        <div className="flex items-center space-x-2 text-[10px] text-muted-foreground font-medium">
                          <User size={12} />
                          <span>{post.author}</span>
                        </div>
                        <button
                          onClick={(e) => handleLike(post.id, e)}
                          className="flex items-center space-x-1 px-2.5 py-1 hover:bg-muted rounded-lg text-[10px] font-bold text-muted-foreground hover:text-foreground transition-all"
                        >
                          <Heart size={12} className="text-rose-500" />
                          <span>{likesState[post.id]}</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredPosts.length === 0 && (
                    <div className="p-8 text-center text-xs text-muted-foreground border border-dashed rounded-2xl bg-card">
                      No journal articles match your query.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ChatWidget activeTopic="Encyclopedia Blog" />
    </div>
  );
}

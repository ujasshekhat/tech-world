"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, BookOpen, GraduationCap, Cpu, Layers } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CATEGORIES, SUB_CATEGORIES } from "@/lib/topics-data";
import { Icon } from "@/components/ui/Icon";

interface Props {
  slug: string;
}

export default function CategoryPageClient({ slug }: Props) {
  const categoryId = slug;
  
  const category = CATEGORIES.find(c => c.id === categoryId);
  const subcategories = SUB_CATEGORIES[categoryId] || [];

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Category Not Found</h1>
            <p className="text-muted-foreground text-sm">The category you are looking for does not exist.</p>
            <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 bg-background tech-grid">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Breadcrumbs & Back */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-foreground">{category.name}</span>
            </div>

            <Link href="/" className="inline-flex items-center space-x-1 text-xs text-blue-500 font-bold hover:underline mb-2">
              <ArrowLeft size={14} />
              <span>Back to Overview</span>
            </Link>

            {/* Category Header Banner */}
            <div className="p-8 rounded-3xl border border-border bg-gradient-to-r from-blue-500/10 to-indigo-500/10 relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-sm">
              <div className="space-y-3 relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <Icon name={category.icon} size={24} />
                </div>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{category.name}</h1>
                <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                  Deepen your understanding of {category.name} with standard reference definitions, line-by-line coding sandboxes, active recall cards, and performance guidelines.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold bg-card px-4 py-2 border border-border rounded-xl self-start sm:self-center shadow-sm">
                <Layers size={14} className="text-blue-500" />
                <span>{subcategories.reduce((acc, curr) => acc + curr.topics.length, 0)} Guides Available</span>
              </div>
            </div>

            {/* Topics Sections */}
            {subcategories.length > 0 ? (
              <div className="space-y-8">
                {subcategories.map((sub, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-lg font-extrabold text-foreground border-b border-border pb-2 flex items-center space-x-2">
                      <BookOpen size={18} className="text-blue-500" />
                      <span>{sub.title}</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {sub.topics.map(topic => (
                        <Link
                          key={topic.slug}
                          href={`/topics/${topic.slug}`}
                          className="group p-5 border border-border bg-card/50 hover:bg-card rounded-2xl shadow-sm hover:shadow hover:border-blue-500/20 transition-all duration-200 flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors">
                              {topic.title}
                            </h3>
                            <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wide">
                              Subject Guide
                            </span>
                          </div>
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
                            <ChevronRight size={16} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* If no subcategories are registered yet, generate standard topics */
              <div className="space-y-4">
                <h2 className="text-lg font-extrabold text-foreground border-b border-border pb-2">
                  Standard Guides
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: `Core ${category.name} Principles`, slug: `${category.id}-core-principles` },
                    { title: `Advanced ${category.name} Design`, slug: `${category.id}-advanced-design` },
                    { title: `${category.name} Architectures`, slug: `${category.id}-architectures` },
                    { title: `${category.name} Implementation`, slug: `${category.id}-implementation` }
                  ].map(topic => (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="group p-5 border border-border bg-card/50 hover:bg-card rounded-2xl shadow-sm hover:shadow hover:border-blue-500/20 transition-all duration-200 flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors">
                          {topic.title}
                        </h3>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wide">
                          Dynamic Subject Guide
                        </span>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <ChatWidget activeTopic={category.name} />
    </div>
  );
}

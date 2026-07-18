"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronDown, BookOpen, Settings, BarChart2, MessageSquare, Map, HelpCircle, Terminal, Home } from "lucide-react";
import { CATEGORIES, SUB_CATEGORIES } from "@/lib/topics-data";
import { Icon } from "../ui/Icon";

export function Sidebar() {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "frontend-development": true,
    "computer-networks": true,
    "dsa": true
  });
  const [customTopics, setCustomTopics] = useState<{ title: string; slug: string; category: string }[]>([]);

  React.useEffect(() => {
    const listStr = localStorage.getItem("tech_world_custom_topics_list");
    if (listStr) {
      try {
        setCustomTopics(JSON.parse(listStr));
      } catch (e) {}
    }
  }, [pathname]);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <aside className="w-64 border-r border-border bg-card/30 backdrop-blur-md hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 space-y-6">
      {/* Platform Navigation */}
      <div className="space-y-1">
        <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Platform
        </div>
        <Link
          href="/"
          className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            pathname === "/"
              ? "bg-blue-500/10 text-blue-500"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Home size={18} />
          <span>Overview</span>
        </Link>
        <Link
          href="/dashboard"
          className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            pathname === "/dashboard"
              ? "bg-blue-500/10 text-blue-500"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <BarChart2 size={18} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/playground"
          className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            pathname === "/playground"
              ? "bg-blue-500/10 text-blue-500"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Terminal size={18} />
          <span>Code Sandbox</span>
        </Link>
        <Link
          href="/admin"
          className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            pathname === "/admin"
              ? "bg-blue-500/10 text-blue-500"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Settings size={18} />
          <span>CMS Creator</span>
        </Link>
      </div>

      <hr className="border-border" />

      {/* Encyclopedia Subjects */}
      <div className="space-y-2 flex-1">
        <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Encyclopedia
        </div>
        <div className="space-y-1">
          {CATEGORIES.map(category => {
            const hasSubcategories = !!SUB_CATEGORIES[category.id];
            const isExpanded = expandedCategories[category.id];
            
            return (
              <div key={category.id} className="space-y-1">
                {hasSubcategories ? (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={category.icon} className="text-muted-foreground group-hover:text-foreground" size={18} />
                      <span className="truncate max-w-[140px] text-left">{category.name}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                ) : (
                  <Link
                    href={`/categories/${category.id}`}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      pathname === `/categories/${category.id}`
                        ? "bg-blue-500/10 text-blue-500"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon name={category.icon} size={18} />
                    <span className="truncate max-w-[170px]">{category.name}</span>
                  </Link>
                )}

                {/* Sub-topics list */}
                {hasSubcategories && isExpanded && (
                  <div className="pl-9 space-y-1 pr-1 border-l border-border/50 ml-5 animate-in slide-in-from-top-1 duration-100">
                    {SUB_CATEGORIES[category.id].map(sub => (
                      <div key={sub.title} className="space-y-1">
                        <div className="text-[10px] font-semibold text-muted-foreground/80 uppercase tracking-wider py-1 select-none">
                          {sub.title}
                        </div>
                        {sub.topics.map(topic => {
                          const isActive = pathname === `/topics/${topic.slug}`;
                          return (
                            <Link
                              key={topic.slug}
                              href={`/topics/${topic.slug}`}
                              className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all truncate ${
                                isActive
                                  ? "bg-blue-500/10 text-blue-500 font-semibold"
                                  : "text-muted-foreground/90 hover:bg-muted/50 hover:text-foreground"
                              }`}
                            >
                              {topic.title}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                    {/* Custom CMS Guides */}
                    {customTopics.some(t => CATEGORIES.find(c => c.id === category.id)?.name === t.category) && (
                      <div className="space-y-1 mt-2 border-t border-border/30 pt-2">
                        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider py-1 select-none">
                          Custom CMS Guides
                        </div>
                        {customTopics
                          .filter(t => CATEGORIES.find(c => c.id === category.id)?.name === t.category)
                          .map(topic => {
                            const isActive = pathname === `/topics/${topic.slug}`;
                            return (
                              <Link
                                key={topic.slug}
                                href={`/topics/${topic.slug}`}
                                className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all truncate ${
                                  isActive
                                    ? "bg-blue-500/10 text-blue-500 font-semibold"
                                    : "text-muted-foreground/90 hover:bg-muted/50 hover:text-foreground"
                                }`}
                              >
                                {topic.title}
                              </Link>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

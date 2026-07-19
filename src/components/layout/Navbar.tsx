"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sun, Moon, Search, Cpu, BookOpen, Terminal, GraduationCap, X, User, LogIn, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/lib/store";
import { PRE_POPULATED_TOPICS, SUB_CATEGORIES } from "@/lib/topics-data";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { store } = useUserStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ title: string; slug: string; category: string }[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    if (supabase) {
      supabase.auth.getUser().then((res: any) => {
        setSupabaseUser(res.data?.user ?? null);
      });
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setSupabaseUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle escape key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results: { title: string; slug: string; category: string }[] = [];

    // Search in pre-populated
    Object.values(PRE_POPULATED_TOPICS).forEach(topic => {
      if (topic.title.toLowerCase().includes(q) || topic.category.toLowerCase().includes(q)) {
        results.push({ title: topic.title, slug: topic.slug, category: topic.category });
      }
    });

    // Search in category lists
    Object.entries(SUB_CATEGORIES).forEach(([catKey, subcategories]) => {
      subcategories.forEach(sub => {
        sub.topics.forEach(t => {
          if (
            t.title.toLowerCase().includes(q) &&
            !results.some(r => r.slug === t.slug)
          ) {
            results.push({
              title: t.title,
              slug: t.slug,
              category: catKey.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
            });
          }
        });
      });
    });

    setSearchResults(results.slice(0, 5));
  }, [searchQuery]);

  const navigateToTopic = (slug: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/topics/${slug}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <img
              src="/ujascode-logo.jpg"
              alt="UjasCode Logo"
              className="h-10 w-10 rounded-xl object-cover shadow-lg"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                UJASCODE
              </span>
              <span className="text-[9px] font-semibold text-muted-foreground tracking-widest uppercase">
                Code • Learn • Innovate
              </span>
            </div>
          </Link>

          {/* Center search bar (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center justify-between rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-all duration-200 hover:border-blue-500/30"
            >
              <div className="flex items-center space-x-2">
                <Search size={16} />
                <span>Search topics, categories, roadmaps...</span>
              </div>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">Ctrl</span>K
              </kbd>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="/playground"
                className="flex items-center space-x-1.5 text-sm font-medium hover:text-blue-500 transition-colors"
              >
                <Terminal size={16} />
                <span>Playground</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center space-x-1.5 text-sm font-medium hover:text-blue-500 transition-colors"
              >
                <GraduationCap size={16} />
                <span>Academy</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center space-x-1.5 text-sm font-medium hover:text-blue-500 transition-colors"
              >
                <BookOpen size={16} />
                <span>Blog</span>
              </Link>
            </nav>

            <span className="hidden lg:inline h-5 w-px bg-border" />

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground md:hidden"
            >
              <Search size={20} />
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl border border-border bg-card hover:bg-muted hover:border-blue-500/20 text-foreground transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
              </button>
            )}

            {/* Auth widget */}
            {!mounted ? (
              <div className="h-9 w-20 rounded-xl bg-muted animate-pulse" />
            ) : supabaseUser ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-muted border border-transparent hover:border-border transition-all duration-200"
                >
                  {supabaseUser.user_metadata?.avatar_url ? (
                    <Image
                      src={supabaseUser.user_metadata.avatar_url}
                      alt={supabaseUser.user_metadata?.full_name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-blue-500/30"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600">
                      <User size={16} />
                    </div>
                  )}
                  <div className="hidden sm:block text-left text-xs pr-1">
                    <p className="font-semibold leading-tight text-foreground truncate max-w-[80px]">
                      {supabaseUser.user_metadata?.full_name?.split(" ")[0] || "User"}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-none">Synced ✓</p>
                  </div>
                </Link>
                <button
                  onClick={async () => { await supabase.auth.signOut(); router.refresh(); }}
                  title="Sign out"
                  className="p-2 rounded-xl border border-border hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-500 text-muted-foreground transition-all duration-200"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={async () => {
                  await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: { redirectTo: `${window.location.origin}/api/auth/callback` }
                  });
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold transition-all duration-200 shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-700"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="hidden sm:inline">Sign in with Google</span>
                <span className="sm:hidden"><LogIn size={15} /></span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Palette Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
              <div className="flex items-center space-x-2 flex-1">
                <Search size={18} className="text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search encyclopedia topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Matches
                  </div>
                  {searchResults.map((res) => (
                    <button
                      key={res.slug}
                      onClick={() => navigateToTopic(res.slug)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 text-left transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-3">
                        <BookOpen size={16} className="text-blue-500" />
                        <div>
                          <div className="text-sm font-semibold text-foreground">{res.title}</div>
                          <div className="text-[11px] text-muted-foreground">{res.category}</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-medium">Topic</span>
                    </button>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No matching topics found for "{searchQuery}".
                  <div className="mt-2 text-xs">
                    Try searching for <span className="underline cursor-pointer" onClick={() => setSearchQuery("React")}>React</span> or <span className="underline cursor-pointer" onClick={() => setSearchQuery("TCP")}>TCP</span>.
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground px-1">
                    Popular Searches
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateToTopic("react-components")}
                      className="flex items-center space-x-2 p-2 rounded-xl border border-border hover:bg-muted hover:border-blue-500/20 text-left transition-all"
                    >
                      <Cpu size={14} className="text-blue-500" />
                      <span className="text-xs font-medium">React Component Model</span>
                    </button>
                    <button
                      onClick={() => navigateToTopic("tcp-ip-suite")}
                      className="flex items-center space-x-2 p-2 rounded-xl border border-border hover:bg-muted hover:border-blue-500/20 text-left transition-all"
                    >
                      <Terminal size={14} className="text-indigo-500" />
                      <span className="text-xs font-medium">TCP/IP Suite</span>
                    </button>
                    <button
                      onClick={() => navigateToTopic("binary-search-tree")}
                      className="flex items-center space-x-2 p-2 rounded-xl border border-border hover:bg-muted hover:border-blue-500/20 text-left transition-all"
                    >
                      <BookOpen size={14} className="text-emerald-500" />
                      <span className="text-xs font-medium">Binary Search Tree</span>
                    </button>
                    <button
                      onClick={() => navigateToTopic("postgresql-architecture")}
                      className="flex items-center space-x-2 p-2 rounded-xl border border-border hover:bg-muted hover:border-blue-500/20 text-left transition-all"
                    >
                      <GraduationCap size={14} className="text-amber-500" />
                      <span className="text-xs font-medium">PostgreSQL Architecture</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserProgress } from "./types";
import type { User } from "@supabase/supabase-js";

const DEFAULT_PROFILE = {
  name: "Ujas",
  title: "Full Stack Developer",
  exp: 0,
  rank: "Developer (Lvl 1)",
  badges: ["Hello World"]
};

const DEFAULT_STORE: UserProgress = {
  completedTopics: [],
  bookmarks: [],
  notes: {},
  quizScores: {},
  profile: DEFAULT_PROFILE
};

const LS_KEY = "tech_world_user_store";

function calculateRankAndTitle(exp: number) {
  const level = Math.floor(exp / 500) + 1;
  let rank = `Novice (Lvl ${level})`;
  let title = "Junior Developer";

  if (exp >= 3000) {
    rank = `Elite Architect (Lvl ${level})`;
    title = "Principal Engineer";
  } else if (exp >= 1500) {
    rank = `Systems Expert (Lvl ${level})`;
    title = "Senior Developer";
  } else if (exp >= 500) {
    rank = `Code Artisan (Lvl ${level})`;
    title = "Mid-Level Developer";
  }

  const badges = ["Hello World"];
  if (exp >= 500) badges.push("Stack Master");
  if (exp >= 1500) badges.push("Systems Guru");
  if (exp >= 3000) badges.push("Polymath");

  return { rank, title, badges };
}

function loadFromLS(): UserProgress {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) return JSON.parse(saved) as UserProgress;
  } catch (_) {}
  return DEFAULT_STORE;
}

function saveToLS(data: UserProgress) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch (_) {}
}

export function useUserStore() {
  const [store, setStore] = useState<UserProgress>(DEFAULT_STORE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  // Init: load from localStorage first, then sync with Supabase if logged in
  useEffect(() => {
    const local = loadFromLS();
    setStore(local);

    if (supabase) {
      supabase.auth.getUser().then((res: any) => {
        setUser(res.data?.user ?? null);
        setIsLoaded(true);
      });

      const subscription = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user ?? null);
      });

      return () => {
        subscription.data.subscription.unsubscribe();
      };
    } else {
      setIsLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync Supabase data on login or local progress setup
  useEffect(() => {
    if (user && supabase) {
      supabase
        .from("user_progress")
        .select("data")
        .eq("user_id", user.id)
        .maybeSingle()
        .then((res: any) => {
          if (res.data?.data) {
            const remoteData = res.data.data as UserProgress;
            setStore(remoteData);
            saveToLS(remoteData);
          } else {
            // No remote data yet, push local data to initialize database
            const local = loadFromLS();
            supabase.from("user_progress").upsert({
              user_id: user.id,
              data: local,
              updated_at: new Date().toISOString()
            }, { onConflict: "user_id" }).then((res: any) => {
              if (res?.error) console.error("Supabase init error:", res.error.message);
            });
          }
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Persist to localStorage + Supabase
  const persist = useCallback((next: UserProgress) => {
    setStore(next);
    saveToLS(next);

    if (user && supabase) {
      supabase.from("user_progress").upsert({
        user_id: user.id,
        data: next,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" }).then((res: any) => {
        if (res?.error) console.error("Supabase sync error:", res.error.message);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggleBookmark = useCallback((slug: string) => {
    setStore(prev => {
      const next: UserProgress = {
        ...prev,
        bookmarks: prev.bookmarks.includes(slug)
          ? prev.bookmarks.filter(s => s !== slug)
          : [...prev.bookmarks, slug]
      };
      saveToLS(next);
      return next;
    });
  }, []);

  const toggleCompleted = useCallback((slug: string) => {
    setStore(prev => {
      const isCompleted = prev.completedTopics.includes(slug);
      const completedTopics = isCompleted
        ? prev.completedTopics.filter(s => s !== slug)
        : [...prev.completedTopics, slug];
      const newExp = Math.max(0, prev.profile.exp + (isCompleted ? -100 : 100));
      const { rank, title, badges } = calculateRankAndTitle(newExp);
      const next: UserProgress = {
        ...prev,
        completedTopics,
        profile: { ...prev.profile, exp: newExp, rank, title, badges }
      };
      saveToLS(next);
      if (user && supabase) {
        supabase.from("user_progress").upsert(
          { user_id: user.id, data: next, updated_at: new Date().toISOString() },
          { onConflict: "user_id" }
        ).then((res: any) => { if (res?.error) console.error(res.error?.message); });
      }
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const saveNote = useCallback((slug: string, content: string) => {
    setStore(prev => {
      const notes = { ...prev.notes };
      if (!content.trim()) delete notes[slug];
      else notes[slug] = content;
      const next: UserProgress = { ...prev, notes };
      saveToLS(next);
      return next;
    });
  }, []);

  const submitQuizScore = useCallback((slug: string, score: number, total: number) => {
    setStore(prev => {
      const existing = prev.quizScores[slug];
      const scoreDiff = score - (existing?.score ?? 0);
      const newExp = prev.profile.exp + (scoreDiff > 0 ? scoreDiff * 50 : 0);
      const { rank, title, badges } = calculateRankAndTitle(newExp);
      const next: UserProgress = {
        ...prev,
        quizScores: { ...prev.quizScores, [slug]: { score, total, date: new Date().toLocaleDateString() } },
        profile: { ...prev.profile, exp: newExp, rank, title, badges }
      };
      saveToLS(next);
      return next;
    });
  }, []);

  const updateProfileName = useCallback((newName: string) => {
    setStore(prev => {
      const next: UserProgress = {
        ...prev,
        profile: { ...prev.profile, name: newName || "Ujas" }
      };
      saveToLS(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(LS_KEY);
    setStore(DEFAULT_STORE);
  }, []);

  return {
    store,
    isLoaded,
    user,
    toggleBookmark,
    toggleCompleted,
    saveNote,
    submitQuizScore,
    updateProfileName,
    resetProgress,
    persist
  };
}
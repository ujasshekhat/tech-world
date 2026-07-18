"use client";

import { useState, useEffect } from "react";
import { UserProgress } from "./types";

const DEFAULT_PROFILE = {
  name: "Tech Explorer",
  title: "Junior Developer",
  exp: 0,
  rank: "Novice (Lvl 1)",
  badges: ["Hello World"]
};

const DEFAULT_STORE: UserProgress = {
  completedTopics: [],
  bookmarks: [],
  notes: {},
  quizScores: {},
  profile: DEFAULT_PROFILE
};

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

  // Badges calculation
  const badges = ["Hello World"];
  if (exp >= 500) badges.push("Stack Master");
  if (exp >= 1500) badges.push("Systems Guru");
  if (exp >= 3000) badges.push("Polymath");

  return { rank, title, badges };
}

export function useUserStore() {
  const [store, setStore] = useState<UserProgress>(DEFAULT_STORE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tech_world_user_store");
    if (saved) {
      try {
        setStore(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user store", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveStore = (newStore: UserProgress) => {
    setStore(newStore);
    localStorage.setItem("tech_world_user_store", JSON.stringify(newStore));
  };

  const toggleBookmark = (slug: string) => {
    const bookmarks = store.bookmarks.includes(slug)
      ? store.bookmarks.filter(s => s !== slug)
      : [...store.bookmarks, slug];
    saveStore({ ...store, bookmarks });
  };

  const toggleCompleted = (slug: string) => {
    const isCompleted = store.completedTopics.includes(slug);
    const completedTopics = isCompleted
      ? store.completedTopics.filter(s => s !== slug)
      : [...store.completedTopics, slug];

    // Award 100 EXP on completion, subtract on uncompletion
    const expChange = isCompleted ? -100 : 100;
    const newExp = Math.max(0, store.profile.exp + expChange);
    const { rank, title, badges } = calculateRankAndTitle(newExp);

    saveStore({
      ...store,
      completedTopics,
      profile: {
        ...store.profile,
        exp: newExp,
        rank,
        title,
        badges
      }
    });
  };

  const saveNote = (slug: string, content: string) => {
    const notes = { ...store.notes };
    if (!content.trim()) {
      delete notes[slug];
    } else {
      notes[slug] = content;
    }
    saveStore({ ...store, notes });
  };

  const submitQuizScore = (slug: string, score: number, total: number) => {
    const existing = store.quizScores[slug];
    const prevScore = existing ? existing.score : 0;
    const scoreDiff = score - prevScore;

    // Award 50 EXP per net new correct answer
    const expGain = scoreDiff > 0 ? scoreDiff * 50 : 0;
    const newExp = store.profile.exp + expGain;
    const { rank, title, badges } = calculateRankAndTitle(newExp);

    const quizScores = {
      ...store.quizScores,
      [slug]: {
        score,
        total,
        date: new Date().toLocaleDateString()
      }
    };

    saveStore({
      ...store,
      quizScores,
      profile: {
        ...store.profile,
        exp: newExp,
        rank,
        title,
        badges
      }
    });
  };

  const updateProfileName = (newName: string) => {
    saveStore({
      ...store,
      profile: {
        ...store.profile,
        name: newName || "Tech Explorer"
      }
    });
  };

  const resetProgress = () => {
    saveStore(DEFAULT_STORE);
  };

  return {
    store,
    isLoaded,
    toggleBookmark,
    toggleCompleted,
    saveNote,
    submitQuizScore,
    updateProfileName,
    resetProgress
  };
}

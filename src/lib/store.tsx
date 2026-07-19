"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { UserProgress } from "./types";

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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase auth and load user data
  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);

      // Listen for auth changes
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          // User signed out, reset to defaults but keep local copy
          setStore(DEFAULT_STORE);
        }
      });

      // Load initial data if user exists
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        // No user logged in, load from localStorage
        loadFromLocalStorage();
        setIsLoaded(true);
        setLoading(false);
      }

      return () => subscription.unsubscribe();
    });
  }, []);

  // Load user data from Supabase
  const loadUserData = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error fetching user profile:', error);
        // Fallback to localStorage
        loadFromLocalStorage();
      } else if (data) {
        // Found user data in database
        setStore(data);
      } else {
        // No existing profile, create one from localStorage or defaults
        const localData = loadFromLocalStorage();
        if (localData !== DEFAULT_STORE) {
          // Save local data to database
          await saveUserData(localData);
        }
        setStore(localData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      loadFromLocalStorage();
    } finally {
      setIsLoaded(true);
      setLoading(false);
    }
  }, []);

  // Load data from localStorage
  const loadFromLocalStorage = useCallback((): UserProgress => {
    try {
      const saved = localStorage.getItem("tech_world_user_store");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse user store from localStorage", e);
    }
    return DEFAULT_STORE;
  }, []);

  // Save data to both localStorage and Supabase
  const saveStore = useCallback(async (newStore: UserProgress) => {
    setStore(newStore);

    // Save to localStorage immediately for responsiveness
    try {
      localStorage.setItem("tech_world_user_store", JSON.stringify(newStore));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }

    // Save to Supabase if user is logged in
    if (user) {
      try {
        await saveUserData(newStore);
      } catch (e) {
        console.error("Failed to save to Supabase", e);
        // Don't update state here as localStorage save succeeded
      }
    }
  }, [user]);

  // Save user data to Supabase
  const saveUserData = useCallback(async (userData: UserProgress) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        ...userData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: ['id']
      });

    if (error) throw error;
  }, [user]);

  const toggleBookmark = useCallback(async (slug: string) => {
    await saveStore(prev => {
      const bookmarks = prev.bookmarks.includes(slug)
        ? prev.bookmarks.filter(s => s !== slug)
        : [...prev.bookmarks, slug];
      return { ...prev, bookmarks };
    });
  }, []);

  const toggleCompleted = useCallback(async (slug: string) => {
    await saveStore(async prev => {
      const isCompleted = prev.completedTopics.includes(slug);
      const completedTopics = isCompleted
        ? prev.completedTopics.filter(s => s !== slug)
        : [...prev.completedTopics, slug];

      // Award 100 EXP on completion, subtract on uncompletion
      const expChange = isCompleted ? -100 : 100;
      const newExp = Math.max(0, prev.profile.exp + expChange);
      const { rank, title, badges } = calculateRankAndTitle(newExp);

      return {
        ...prev,
        completedTopics,
        profile: {
          ...prev.profile,
          exp: newExp,
          rank,
          title,
          badges
        }
      };
    });
  }, []);

  const saveNote = useCallback(async (slug: string, content: string) => {
    await saveStore(prev => {
      const notes = { ...prev.notes };
      if (!content.trim()) {
        delete notes[slug];
      } else {
        notes[slug] = content;
      }
      return { ...prev, notes };
    });
  }, []);

  const submitQuizScore = useCallback(async (slug: string, score: number, total: number) => {
    await saveStore(async prev => {
      const existing = prev.quizScores[slug];
      const prevScore = existing ? existing.score : 0;
      const scoreDiff = score - prevScore;

      // Award 50 EXP per net new correct answer
      const expGain = scoreDiff > 0 ? scoreDiff * 50 : 0;
      const newExp = prev.profile.exp + expGain;
      const { rank, title, badges } = calculateRankAndTitle(newExp);

      const quizScores = {
        ...prev.quizScores,
        [slug]: {
          score,
          total,
          date: new Date().toLocaleDateString()
        }
      };

      return {
        ...prev,
        quizScores,
        profile: {
          ...prev.profile,
          exp: newExp,
          rank,
          title,
          badges
        }
      };
    });
  }, []);

  const updateProfileName = useCallback(async (newName: string) => {
    await saveStore(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: newName || "Ujas"
      }
    }));
  }, []);

  const resetProgress = useCallback(async () => {
    // Clear localStorage
    localStorage.removeItem("tech_world_user_store");

    // Reset in database if user is logged in
    if (user) {
      try {
        await supabase
          .from('user_profiles')
          .update({
            ...DEFAULT_STORE,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error resetting progress in database:', error);
      }
    }

    setStore(DEFAULT_STORE);
  }, [user]);

  return {
    store,
    isLoaded,
    loading,
    user,
    toggleBookmark,
    toggleCompleted,
    saveNote,
    submitQuizScore,
    updateProfileName,
    resetProgress
  };
}
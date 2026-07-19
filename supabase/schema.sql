-- Supabase Schema for User Profiles
-- Run this in the Supabase SQL editor to create the necessary table

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  completedTopics TEXT[] DEFAULT '{}',
  bookmarks TEXT[] DEFAULT '{}',
  notes JSONB DEFAULT '{}'::jsonb,
  quizScores JSONB DEFAULT '{}'::jsonb,
  profile JSONB DEFAULT '{
    "name": "Ujas",
    "title": "Full Stack Developer",
    "exp": 0,
    "rank": "Developer (Lvl 1)",
    "badges": ["Hello World"]
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable real-time subscriptions for this table (optional but useful)
alter publication supabase_realtime add table user_profiles;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON user_profiles(id);
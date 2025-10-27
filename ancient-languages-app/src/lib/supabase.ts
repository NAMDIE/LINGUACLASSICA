import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hxqqswjevxuollcgxbzg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cXFzd2pldnh1b2xsY2d4YnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MjM0NTYsImV4cCI6MjA3NzA5OTQ1Nn0.3h_4qaTXeptaeKAap_ckOVYxq4i4lCdDK3CSknNbhRY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  user_profiles: {
    id: string;
    username: string | null;
    level: number;
    total_xp: number;
    current_streak: number;
    longest_streak: number;
    last_practice_date: string | null;
    preferred_language: string;
    dark_mode: boolean;
    created_at: string;
    updated_at: string;
  };
  exercises: {
    id: number;
    language: string;
    difficulty_level: string;
    exercise_code: string;
    title: string;
    original_text: string;
    english_translation: string;
    vocabulary: any;
    grammar_notes: string;
    cultural_context: string;
    word_count: number;
    author: string;
    work: string;
    created_at: string;
  };
  user_progress: {
    id: number;
    user_id: string;
    exercise_id: number;
    completed_at: string;
    xp_earned: number;
    accuracy_percentage: number | null;
  };
  achievements: {
    id: number;
    achievement_code: string;
    name: string;
    description: string;
    icon_name: string;
    category: string;
    unlock_criteria: any;
    xp_reward: number;
    created_at: string;
  };
  user_achievements: {
    id: number;
    user_id: string;
    achievement_id: number;
    earned_at: string;
  };
  leaderboard_entries: {
    id: number;
    user_id: string;
    week_start_date: string;
    total_xp: number;
    exercises_completed: number;
    rank: number | null;
    created_at: string;
    updated_at: string;
  };
  daily_stats: {
    id: number;
    user_id: string;
    practice_date: string;
    xp_earned: number;
    exercises_completed: number;
    minutes_practiced: number;
    streak_day: number;
    created_at: string;
  };
};

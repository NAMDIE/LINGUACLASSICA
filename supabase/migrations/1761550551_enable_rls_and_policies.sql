-- Migration: enable_rls_and_policies
-- Created at: 1761550551

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- User profiles: users can read and update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Exercises: everyone can read (public content)
CREATE POLICY "Anyone can view exercises" ON exercises
  FOR SELECT TO anon, authenticated USING (true);

-- User progress: users can read and write their own progress
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Achievements: everyone can read (public content)
CREATE POLICY "Anyone can view achievements" ON achievements
  FOR SELECT TO anon, authenticated USING (true);

-- User achievements: users can view their own achievements
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can earn achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Leaderboard: everyone can read
CREATE POLICY "Anyone can view leaderboard" ON leaderboard_entries
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Users can update leaderboard" ON leaderboard_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can modify leaderboard" ON leaderboard_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- Daily stats: users can read and write their own stats
CREATE POLICY "Users can view own daily stats" ON daily_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert daily stats" ON daily_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update daily stats" ON daily_stats
  FOR UPDATE USING (auth.uid() = user_id);;
-- Load achievement definitions (32 total as per spec)

INSERT INTO achievements (achievement_code, name, description, icon_name, category, unlock_criteria, xp_reward) VALUES
-- Foundation Practice Badges
('first_steps', 'First Steps', 'Complete your first exercise', 'award', 'foundation', '{"exercises_completed": 1}', 10),
('week_warrior', 'Week Warrior', 'Practice for 7 consecutive days', 'calendar', 'streaks', '{"streak_days": 7}', 50),
('dedicated_learner', 'Dedicated Learner', 'Complete 10 exercises', 'book-open', 'foundation', '{"exercises_completed": 10}', 25),
('century_club', 'Century Club', 'Complete 100 exercises', 'trophy', 'foundation', '{"exercises_completed": 100}', 100),

-- Streak Badges
('fire_starter', 'Fire Starter', 'Achieve a 3-day streak', 'flame', 'streaks', '{"streak_days": 3}', 15),
('unstoppable', 'Unstoppable', 'Achieve a 30-day streak', 'zap', 'streaks', '{"streak_days": 30}', 150),
('legendary', 'Legendary Scholar', 'Achieve a 100-day streak', 'crown', 'streaks', '{"streak_days": 100}', 500),
('year_master', 'Year Master', 'Achieve a 365-day streak', 'star', 'streaks', '{"streak_days": 365}', 1000),

-- Grammar Mastery Badges
('grammar_novice', 'Grammar Novice', 'Master 5 grammar concepts', 'book', 'grammar', '{"grammar_concepts": 5}', 30),
('syntax_sage', 'Syntax Sage', 'Master 15 grammar concepts', 'scroll', 'grammar', '{"grammar_concepts": 15}', 75),
('grammar_master', 'Grammar Master', 'Master 30 grammar concepts', 'graduation-cap', 'grammar', '{"grammar_concepts": 30}', 150),

-- Language-Specific Paths
('latin_explorer', 'Latin Explorer', 'Complete 10 Latin exercises', 'globe', 'latin', '{"latin_exercises": 10}', 25),
('latin_scholar', 'Latin Scholar', 'Complete 50 Latin exercises', 'book-marked', 'latin', '{"latin_exercises": 50}', 100),
('latin_master', 'Latin Master', 'Complete all Latin beginner exercises', 'medal', 'latin', '{"latin_beginner_complete": true}', 200),
('greek_explorer', 'Greek Explorer', 'Complete 10 Greek exercises', 'compass', 'greek', '{"greek_exercises": 10}', 25),
('greek_scholar', 'Greek Scholar', 'Complete 50 Greek exercises', 'bookmark', 'greek', '{"greek_exercises": 50}', 100),
('greek_master', 'Greek Master', 'Complete all Greek beginner exercises', 'award', 'greek', '{"greek_beginner_complete": true}', 200),

-- Cultural Literacy Badges
('culture_curious', 'Culture Curious', 'Read 5 cultural context notes', 'eye', 'cultural', '{"cultural_notes_read": 5}', 20),
('historian', 'Historian', 'Read 20 cultural context notes', 'library', 'cultural', '{"cultural_notes_read": 20}', 60),
('classicist', 'Classicist', 'Read 50 cultural context notes', 'landmark', 'cultural', '{"cultural_notes_read": 50}', 120),

-- Difficulty Level Badges
('beginner_complete', 'Beginner Complete', 'Finish all beginner exercises', 'check-circle', 'level', '{"beginner_complete": true}', 100),
('intermediate_complete', 'Intermediate Complete', 'Finish all intermediate exercises', 'check-circle-2', 'level', '{"intermediate_complete": true}', 200),
('advanced_complete', 'Advanced Complete', 'Finish all advanced exercises', 'shield-check', 'level', '{"advanced_complete": true}', 300),
('expert_complete', 'Expert Complete', 'Finish all expert exercises', 'sword', 'level', '{"expert_complete": true}', 400),
('master_complete', 'Master Complete', 'Finish all master exercises', 'crown', 'level', '{"master_complete": true}', 500),

-- XP and Level Badges
('xp_1000', 'XP Collector', 'Earn 1,000 total XP', 'coins', 'xp', '{"total_xp": 1000}', 50),
('xp_5000', 'XP Hoarder', 'Earn 5,000 total XP', 'gem', 'xp', '{"total_xp": 5000}', 150),
('xp_10000', 'XP Legend', 'Earn 10,000 total XP', 'diamond', 'xp', '{"total_xp": 10000}', 300),
('level_10', 'Level 10 Scholar', 'Reach level 10', 'trending-up', 'level', '{"level": 10}', 100),
('level_20', 'Level 20 Expert', 'Reach level 20', 'arrow-up', 'level', '{"level": 20}', 250),

-- Special Achievements
('perfect_week', 'Perfect Week', 'Score 100% on 7 exercises in a week', 'star', 'special', '{"perfect_scores_week": 7}', 75),
('polyglot', 'Polyglot', 'Complete exercises in both Latin and Greek', 'languages', 'special', '{"both_languages": true}', 100),
('night_owl', 'Night Owl', 'Practice after 10 PM on 5 days', 'moon', 'special', '{"night_sessions": 5}', 50);

CREATE TABLE daily_stats (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    practice_date DATE NOT NULL,
    xp_earned INTEGER DEFAULT 0,
    exercises_completed INTEGER DEFAULT 0,
    minutes_practiced INTEGER DEFAULT 0,
    streak_day INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id,
    practice_date)
);
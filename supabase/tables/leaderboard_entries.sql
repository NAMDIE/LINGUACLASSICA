CREATE TABLE leaderboard_entries (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    week_start_date DATE NOT NULL,
    total_xp INTEGER DEFAULT 0,
    exercises_completed INTEGER DEFAULT 0,
    rank INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id,
    week_start_date)
);
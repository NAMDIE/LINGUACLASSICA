CREATE TABLE user_achievements (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    achievement_id INTEGER NOT NULL,
    earned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id,
    achievement_id)
);
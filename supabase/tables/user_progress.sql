CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    exercise_id INTEGER NOT NULL,
    completed_at TIMESTAMP DEFAULT NOW(),
    xp_earned INTEGER DEFAULT 0,
    accuracy_percentage INTEGER
);
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    achievement_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    category VARCHAR(50),
    unlock_criteria JSONB,
    xp_reward INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
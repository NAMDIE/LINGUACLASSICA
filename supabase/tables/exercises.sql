CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    language VARCHAR(10) NOT NULL,
    difficulty_level VARCHAR(20) NOT NULL,
    exercise_code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(200),
    original_text TEXT NOT NULL,
    english_translation TEXT NOT NULL,
    vocabulary JSONB,
    grammar_notes TEXT,
    cultural_context TEXT,
    word_count INTEGER,
    author VARCHAR(100),
    work VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);
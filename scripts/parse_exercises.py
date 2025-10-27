#!/usr/bin/env python3
"""
Parse Latin and Greek exercise content databases and generate SQL insert statements.
"""

import re
import json

def parse_vocabulary(vocab_text):
    """Parse vocabulary section into JSON structure."""
    vocab = {}
    lines = vocab_text.strip().split('\n')
    for line in lines:
        if line.strip().startswith('-'):
            # Format: - word - meaning (grammar)
            match = re.match(r'-\s+(\S+)\s+-\s+(.+?)\s+\((.+?)\)', line.strip())
            if match:
                word, meaning, grammar = match.groups()
                vocab[word] = {"meaning": meaning, "grammar": grammar}
    return vocab

def parse_exercise_block(block, language):
    """Parse a single exercise block."""
    lines = block.split('\n')
    
    # Extract exercise code and title from header (### CODE: Title)
    header_match = re.match(r'###\s+([A-Z]+-[0-9]+):\s+\[(.+?)\]', lines[0])
    if not header_match:
        return None
    
    exercise_code, title = header_match.groups()
    
    # Determine difficulty from code prefix
    difficulty_map = {
        'BEG': 'beginner',
        'INT': 'intermediate',
        'ADV': 'advanced',
        'EXP': 'expert',
        'MAST': 'master'
    }
    difficulty_prefix = exercise_code.split('-')[0] if '-' in exercise_code else 'BEG'
    difficulty = difficulty_map.get(difficulty_prefix, 'beginner')
    
    # Extract original text (between ``` markers)
    original_text = ""
    in_code_block = False
    for line in lines:
        if line.strip() == '```' and not in_code_block:
            in_code_block = True
            continue
        elif line.strip() == '```' and in_code_block:
            break
        elif in_code_block:
            original_text += line.strip() + ' '
    original_text = original_text.strip()
    
    # Extract English translation
    translation = ""
    for i, line in enumerate(lines):
        if '**English Translation:**' in line:
            # Translation is typically on next line in quotes
            if i + 1 < len(lines):
                trans_line = lines[i + 1].strip()
                translation = trans_line.strip('"')
    
    # Extract vocabulary
    vocab_text = ""
    in_vocab = False
    for line in lines:
        if '**Vocabulary:**' in line:
            in_vocab = True
            continue
        elif in_vocab and line.strip().startswith('**'):
            break
        elif in_vocab:
            vocab_text += line + '\n'
    
    vocabulary = parse_vocabulary(vocab_text)
    
    # Extract grammar notes
    grammar_notes = ""
    in_grammar = False
    for line in lines:
        if '**Grammar Notes:**' in line:
            in_grammar = True
            continue
        elif in_grammar and line.strip().startswith('**'):
            break
        elif in_grammar and line.strip():
            grammar_notes += line.strip() + ' '
    grammar_notes = grammar_notes.strip()
    
    # Extract cultural context
    cultural_context = ""
    in_cultural = False
    for line in lines:
        if '**Cultural Context:**' in line:
            in_cultural = True
            continue
        elif in_cultural and line.strip().startswith('**'):
            break
        elif in_cultural and line.strip():
            cultural_context += line.strip() + ' '
    cultural_context = cultural_context.strip()
    
    # Extract word count
    word_count = 0
    for line in lines:
        if '**Word Count:**' in line:
            match = re.search(r'(\d+)', line)
            if match:
                word_count = int(match.group(1))
        elif 'Word Count:' in line:
            match = re.search(r'(\d+)', line)
            if match:
                word_count = int(match.group(1))
    
    # Extract author and work (if present in the title or context)
    author = ""
    work = ""
    
    # Try to extract from title
    if '[' in title and ']' not in title:
        # Title format like "Catullus Poem 1"
        parts = title.split()
        if len(parts) >= 2:
            author = parts[0]
            work = ' '.join(parts[1:])
    
    # Look for author/work in lines
    for line in lines:
        if 'Author:' in line or 'author:' in line.lower():
            author = re.sub(r'.*[Aa]uthor:\s*', '', line).strip()
        if 'Work:' in line or 'work:' in line.lower():
            work = re.sub(r'.*[Ww]ork:\s*', '', line).strip()
    
    # If still empty, try to infer from context
    if not author:
        context_lower = cultural_context.lower()
        if 'catullus' in context_lower:
            author = 'Catullus'
        elif 'vergil' in context_lower or 'virgil' in context_lower:
            author = 'Vergil'
        elif 'ovid' in context_lower:
            author = 'Ovid'
        elif 'caesar' in context_lower:
            author = 'Caesar'
        elif 'homer' in context_lower:
            author = 'Homer'
        elif 'plato' in context_lower:
            author = 'Plato'
        elif 'thucydides' in context_lower:
            author = 'Thucydides'
        elif 'sophocles' in context_lower:
            author = 'Sophocles'
        elif 'herodotus' in context_lower:
            author = 'Herodotus'
    
    if not work:
        if 'aeneid' in cultural_context.lower() or 'aeneid' in title.lower():
            work = 'Aeneid'
        elif 'metamorphoses' in cultural_context.lower():
            work = 'Metamorphoses'
        elif 'gallic war' in cultural_context.lower():
            work = 'De Bello Gallico'
        elif 'poem' in title.lower():
            work = 'Poems'
        elif 'odyssey' in cultural_context.lower():
            work = 'Odyssey'
        elif 'apology' in title.lower() or 'apology' in cultural_context.lower():
            work = 'Apology'
        elif 'republic' in cultural_context.lower():
            work = 'Republic'
    
    return {
        'language': language,
        'difficulty_level': difficulty,
        'exercise_code': exercise_code,
        'title': title,
        'original_text': original_text,
        'english_translation': translation,
        'vocabulary': vocabulary,
        'grammar_notes': grammar_notes,
        'cultural_context': cultural_context,
        'word_count': word_count if word_count > 0 else len(original_text.split()),
        'author': author or 'Classical Author',
        'work': work or 'Classical Work'
    }

def parse_content_file(filepath, language):
    """Parse an entire content file and extract all exercises."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into exercise blocks using the ### CODE: pattern
    exercise_blocks = re.split(r'\n(?=### [A-Z]+-[0-9]+:)', content)
    
    exercises = []
    for block in exercise_blocks:
        if block.strip().startswith('###'):
            exercise = parse_exercise_block(block, language)
            if exercise and exercise['original_text']:
                exercises.append(exercise)
    
    return exercises

def generate_sql_insert(exercise):
    """Generate SQL INSERT statement for an exercise."""
    # Escape single quotes in strings
    def escape_sql(s):
        if s is None:
            return ''
        return str(s).replace("'", "''")
    
    vocab_json = json.dumps(exercise['vocabulary']).replace("'", "''")
    
    sql = f"""INSERT INTO exercises (language, difficulty_level, exercise_code, title, original_text, english_translation, vocabulary, grammar_notes, cultural_context, word_count, author, work) VALUES
('{exercise['language']}', '{exercise['difficulty_level']}', '{exercise['exercise_code']}', '{escape_sql(exercise['title'])}', '{escape_sql(exercise['original_text'])}', '{escape_sql(exercise['english_translation'])}', '{vocab_json}', '{escape_sql(exercise['grammar_notes'])}', '{escape_sql(exercise['cultural_context'])}', {exercise['word_count']}, '{escape_sql(exercise['author'])}', '{escape_sql(exercise['work'])}');"""
    
    return sql

if __name__ == '__main__':
    # Parse Latin exercises
    print("Parsing Latin exercises...")
    latin_exercises = parse_content_file('/workspace/docs/latin_content/latin_content_database.md', 'latin')
    print(f"Found {len(latin_exercises)} Latin exercises")
    
    # Parse Greek exercises
    print("Parsing Greek exercises...")
    greek_exercises = parse_content_file('/workspace/docs/greek_content/greek_content_database.md', 'greek')
    print(f"Found {len(greek_exercises)} Greek exercises")
    
    # Generate SQL file
    with open('/workspace/scripts/load_all_exercises.sql', 'w', encoding='utf-8') as f:
        f.write("-- Auto-generated exercise data\n")
        f.write("-- Delete existing sample data first\n")
        f.write("DELETE FROM user_progress;\n")
        f.write("DELETE FROM exercises;\n\n")
        
        f.write("-- Insert Latin exercises\n")
        for exercise in latin_exercises:
            f.write(generate_sql_insert(exercise) + '\n')
        
        f.write("\n-- Insert Greek exercises\n")
        for exercise in greek_exercises:
            f.write(generate_sql_insert(exercise) + '\n')
    
    print(f"\nGenerated SQL file with {len(latin_exercises) + len(greek_exercises)} total exercises")
    print("Output: /workspace/scripts/load_all_exercises.sql")

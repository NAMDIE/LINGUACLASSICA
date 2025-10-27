#!/usr/bin/env python3
"""
Load all Latin and Greek exercises into Supabase database using REST API
Handles both Latin format (### CODE:) and Greek format (### Exercise N:)
"""

import re
import json
import requests
from pathlib import Path

# Supabase configuration
SUPABASE_URL = 'https://hxqqswjevxuollcgxbzg.supabase.co'
SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cXFzd2pldnh1b2xsY2d4YnpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTUyMzQ1NiwiZXhwIjoyMDc3MDk5NDU2fQ.z1R7KvQ9NiABVBIT1iIEiKURFqkmeb9Ip7X-iNN-mGo'

def parse_vocabulary_latin(vocab_text):
    """Parse Latin vocabulary format: - word - meaning (grammar)"""
    vocab = {}
    lines = vocab_text.strip().split('\n')
    for line in lines:
        if line.strip().startswith('-'):
            match = re.match(r'-\s+(\S+)\s+-\s+(.+?)\s+\((.+?)\)', line.strip())
            if match:
                word, meaning, grammar = match.groups()
                vocab[word] = {"meaning": meaning, "grammar": grammar}
    return vocab

def parse_vocabulary_greek(vocab_text):
    """Parse Greek vocabulary format: - word (meaning, grammar)"""
    vocab = {}
    lines = vocab_text.strip().split('\n')
    for line in lines:
        if line.strip().startswith('-'):
            # Try format: - word (meaning, grammar)
            match1 = re.match(r'-\s+(\S+)\s+\((.+?),\s*(.+?)\)', line.strip())
            if match1:
                word, meaning, grammar = match1.groups()
                vocab[word] = {"meaning": meaning.strip(), "grammar": grammar.strip()}
            else:
                # Alternative format: - word - meaning (grammar)
                match2 = re.match(r'-\s+(\S+)\s+-\s+(.+?)\s+\((.+?)\)', line.strip())
                if match2:
                    word, meaning, grammar = match2.groups()
                    vocab[word] = {"meaning": meaning.strip(), "grammar": grammar.strip()}
    return vocab

def parse_latin_exercise_block(block):
    """Parse Latin exercise format: ### CODE: [Title]"""
    lines = block.split('\n')
    
    # Extract exercise code and title from header
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
    difficulty_prefix = exercise_code.split('-')[0]
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
            if i + 1 < len(lines):
                translation = lines[i + 1].strip().strip('"')
    
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
    
    vocabulary = parse_vocabulary_latin(vocab_text)
    
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
        if '**Word Count:**' in line or 'Word Count:' in line:
            match = re.search(r'(\d+)', line)
            if match:
                word_count = int(match.group(1))
    
    # Extract author and work
    author = infer_author(cultural_context + title)
    work = infer_work(cultural_context + title)
    
    if not original_text:
        return None
    
    return {
        'language': 'latin',
        'difficulty_level': difficulty,
        'exercise_code': exercise_code,
        'title': title,
        'original_text': original_text,
        'english_translation': translation,
        'vocabulary': vocabulary,
        'grammar_notes': grammar_notes,
        'cultural_context': cultural_context,
        'word_count': word_count if word_count > 0 else len(original_text.split()),
        'author': author,
        'work': work
    }

def parse_greek_exercise_block(block, exercise_number):
    """Parse Greek exercise format: ### Exercise N: Author - Title"""
    lines = block.split('\n')
    
    # Extract title from header
    header_match = re.match(r'###\s+Exercise\s+(\d+):\s+(.+)', lines[0])
    if not header_match:
        return None
    
    num, title = header_match.groups()
    
    # Generate exercise code based on word count or position
    # Extract word count first to determine difficulty
    word_count = 0
    for line in lines:
        if '**Word Count:**' in line or '- **Word Count:**' in line:
            match = re.search(r'(\d+)', line)
            if match:
                word_count = int(match.group(1))
                break
    
    # Determine difficulty from word count (Greek exercises use this approach)
    if word_count <= 5:
        difficulty = 'beginner'
        prefix = 'BEG'
    elif word_count <= 12:
        difficulty = 'intermediate'
        prefix = 'INT'
    elif word_count <= 20:
        difficulty = 'advanced'
        prefix = 'ADV'
    elif word_count <= 30:
        difficulty = 'expert'
        prefix = 'EXP'
    else:
        difficulty = 'master'
        prefix = 'MAST'
    
    exercise_code = f'GR-{prefix}-{num.zfill(3)}'
    
    # Extract Greek text
    original_text = ""
    for line in lines:
        if '**Greek Text:**' in line or '- **Greek Text:**' in line:
            # Text might be on same line or next line
            text = line.split('**Greek Text:**')[-1].strip()
            if text:
                original_text = text
            break
    
    # If not found inline, check next lines
    if not original_text:
        in_greek = False
        for line in lines:
            if '**Greek Text:**' in line or '- **Greek Text:**' in line:
                in_greek = True
                continue
            elif in_greek and ('**English Translation:**' in line or '- **English Translation:**' in line):
                break
            elif in_greek and line.strip():
                original_text += line.strip() + ' '
        original_text = original_text.strip()
    
    # Extract English translation
    translation = ""
    for line in lines:
        if '**English Translation:**' in line or '- **English Translation:**' in line:
            text = line.split('**English Translation:**')[-1].strip().strip('"')
            if text:
                translation = text
            break
    
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
    
    vocabulary = parse_vocabulary_greek(vocab_text)
    
    # Extract grammar notes
    grammar_notes = ""
    for line in lines:
        if '**Grammar Notes:**' in line or '- **Grammar Notes:**' in line:
            text = line.split('**Grammar Notes:**')[-1].strip()
            if text:
                grammar_notes = text
            break
    
    # Extract cultural context
    cultural_context = ""
    for line in lines:
        if '**Cultural Context:**' in line or '- **Cultural Context:**' in line:
            text = line.split('**Cultural Context:**')[-1].strip()
            if text:
                cultural_context = text
            break
    
    # Extract author and work
    author = infer_author(cultural_context + title)
    work = infer_work(cultural_context + title)
    
    if not original_text:
        return None
    
    return {
        'language': 'greek',
        'difficulty_level': difficulty,
        'exercise_code': exercise_code,
        'title': title,
        'original_text': original_text,
        'english_translation': translation,
        'vocabulary': vocabulary,
        'grammar_notes': grammar_notes,
        'cultural_context': cultural_context,
        'word_count': word_count if word_count > 0 else len(original_text.split()),
        'author': author,
        'work': work
    }

def infer_author(context_text):
    """Infer author from context"""
    context_lower = context_text.lower()
    if 'catullus' in context_lower:
        return 'Catullus'
    elif 'vergil' in context_lower or 'virgil' in context_lower:
        return 'Vergil'
    elif 'ovid' in context_lower:
        return 'Ovid'
    elif 'caesar' in context_lower:
        return 'Caesar'
    elif 'homer' in context_lower:
        return 'Homer'
    elif 'plato' in context_lower:
        return 'Plato'
    elif 'aristotle' in context_lower:
        return 'Aristotle'
    elif 'thucydides' in context_lower:
        return 'Thucydides'
    elif 'sophocles' in context_lower:
        return 'Sophocles'
    elif 'herodotus' in context_lower:
        return 'Herodotus'
    elif 'xenophon' in context_lower:
        return 'Xenophon'
    elif 'euripides' in context_lower:
        return 'Euripides'
    elif 'demosthenes' in context_lower:
        return 'Demosthenes'
    return 'Classical Author'

def infer_work(context_text):
    """Infer work from context"""
    context_lower = context_text.lower()
    if 'aeneid' in context_lower:
        return 'Aeneid'
    elif 'metamorphoses' in context_lower:
        return 'Metamorphoses'
    elif 'gallic war' in context_lower:
        return 'De Bello Gallico'
    elif 'odyssey' in context_lower:
        return 'Odyssey'
    elif 'iliad' in context_lower:
        return 'Iliad'
    elif 'apology' in context_lower:
        return 'Apology'
    elif 'republic' in context_lower:
        return 'Republic'
    elif 'euthyphro' in context_lower:
        return 'Euthyphro'
    elif 'histories' in context_lower or 'history' in context_lower:
        return 'Histories'
    elif 'poem' in context_lower:
        return 'Poems'
    return 'Classical Work'

def parse_latin_content(filepath):
    """Parse Latin content file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into exercise blocks
    exercise_blocks = re.split(r'\n(?=### [A-Z]+-[0-9]+:)', content)
    
    exercises = []
    for block in exercise_blocks:
        if block.strip().startswith('###') and re.match(r'###\s+[A-Z]+-[0-9]+:', block):
            exercise = parse_latin_exercise_block(block)
            if exercise and exercise['original_text']:
                exercises.append(exercise)
    
    return exercises

def parse_greek_content(filepath):
    """Parse Greek content file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into exercise blocks
    exercise_blocks = re.split(r'\n(?=### Exercise \d+:)', content)
    
    exercises = []
    exercise_num = 1
    for block in exercise_blocks:
        if block.strip().startswith('### Exercise'):
            exercise = parse_greek_exercise_block(block, exercise_num)
            if exercise and exercise['original_text']:
                exercises.append(exercise)
                exercise_num += 1
    
    return exercises

def delete_all_exercises():
    """Delete all existing exercises from database."""
    url = f'{SUPABASE_URL}/rest/v1/exercises'
    headers = {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': f'Bearer {SUPABASE_SERVICE_ROLE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    }
    
    # First, get all existing exercise IDs
    get_response = requests.get(f'{url}?select=id', headers=headers)
    if get_response.status_code == 200:
        exercises = get_response.json()
        if len(exercises) > 0:
            print(f'   Found {len(exercises)} existing exercises to delete...')
            # Delete using ID greater than 0 (all records)
            response = requests.delete(f'{url}?id=gt.0', headers=headers)
            if response.status_code in [200, 204]:
                print('✅ Existing exercises cleared')
                return True
            else:
                print(f'⚠️  Bulk delete failed: {response.status_code}')
                return False
        else:
            print('✅ No existing exercises to clear')
            return True
    else:
        print(f'⚠️  Could not check existing exercises')
        return False

def insert_exercises_batch(exercises_batch):
    """Insert a batch of exercises using Supabase REST API."""
    url = f'{SUPABASE_URL}/rest/v1/exercises'
    headers = {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': f'Bearer {SUPABASE_SERVICE_ROLE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    }
    
    response = requests.post(url, headers=headers, json=exercises_batch)
    
    if response.status_code in [200, 201]:
        return True, None
    else:
        return False, f'{response.status_code} - {response.text}'

def main():
    print('🚀 Starting exercise loading process...\n')
    
    # Parse Latin exercises
    print('📖 Parsing Latin exercises...')
    latin_path = Path('/workspace/docs/latin_content/latin_content_database.md')
    latin_exercises = parse_latin_content(latin_path)
    print(f'✅ Found {len(latin_exercises)} Latin exercises\n')
    
    # Parse Greek exercises
    print('📖 Parsing Greek exercises...')
    greek_path = Path('/workspace/docs/greek_content/greek_content_database.md')
    greek_exercises = parse_greek_content(greek_path)
    print(f'✅ Found {len(greek_exercises)} Greek exercises\n')
    
    all_exercises = latin_exercises + greek_exercises
    print(f'📊 Total exercises to load: {len(all_exercises)}\n')
    
    # Delete existing exercises
    print('🗑️  Clearing existing exercises...')
    delete_all_exercises()
    print()
    
    # Insert exercises in batches of 50
    BATCH_SIZE = 50
    success_count = 0
    error_count = 0
    errors = []
    
    for i in range(0, len(all_exercises), BATCH_SIZE):
        batch = all_exercises[i:i + BATCH_SIZE]
        batch_num = (i // BATCH_SIZE) + 1
        total_batches = (len(all_exercises) + BATCH_SIZE - 1) // BATCH_SIZE
        
        print(f'📦 Inserting batch {batch_num}/{total_batches} ({len(batch)} exercises)...')
        
        success, error = insert_exercises_batch(batch)
        
        if success:
            print(f'✅ Batch {batch_num} inserted successfully')
            success_count += len(batch)
        else:
            print(f'❌ Error in batch {batch_num}: {error[:100]}...')
            errors.append(f'Batch {batch_num}: {error}')
            error_count += len(batch)
    
    print('\n' + '='*50)
    print('📊 FINAL RESULTS:')
    print(f'✅ Successfully inserted: {success_count} exercises')
    print(f'❌ Failed: {error_count} exercises')
    if len(all_exercises) > 0:
        print(f'📈 Success rate: {(success_count / len(all_exercises) * 100):.1f}%')
    print('='*50)
    
    if errors and len(errors) <= 3:
        print('\n❌ Errors encountered:')
        for err in errors:
            print(f'  - {err[:200]}')
    
    # Verify count in database
    url = f'{SUPABASE_URL}/rest/v1/exercises'
    headers = {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': f'Bearer {SUPABASE_SERVICE_ROLE_KEY}',
        'Prefer': 'count=exact'
    }
    response = requests.get(f'{url}?select=id', headers=headers)
    if response.status_code == 200:
        count = response.headers.get('Content-Range', '').split('/')[-1]
        print(f'\n🔍 Verification: Database now contains {count} exercises')

if __name__ == '__main__':
    main()

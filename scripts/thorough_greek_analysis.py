#!/usr/bin/env python3
"""Comprehensive Greek exercise search - look for ALL possible exercise formats."""

import re

# Read the entire file
with open('/workspace/docs/greek_content/greek_content_database.md', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

print("=" * 70)
print("COMPREHENSIVE GREEK EXERCISE SEARCH")
print("=" * 70)

# Search for ALL possible exercise indicators
patterns = {
    '### Exercise N:': r'^###\s+Exercise\s+(\d+):\s*(.*)$',
    '## Exercise N:': r'^##\s+Exercise\s+(\d+):\s*(.*)$',
    '**Exercise N**': r'^\*\*Exercise\s+(\d+)\*\*',
    'Exercise N:': r'^Exercise\s+(\d+):\s*(.*)$',
    '### N.': r'^###\s+(\d+)\.\s+(.*)$',
    '## N.': r'^##\s+(\d+)\.\s+(.*)$',
}

all_exercises = []

for pattern_name, pattern in patterns.items():
    matches = re.finditer(pattern, content, re.MULTILINE)
    for match in matches:
        line_num = content[:match.start()].count('\n') + 1
        all_exercises.append({
            'pattern': pattern_name,
            'line': line_num,
            'number': int(match.group(1)),
            'text': match.group(0)[:80]
        })

# Sort by line number
all_exercises.sort(key=lambda x: x['line'])

print(f"\nTotal exercise markers found: {len(all_exercises)}")

if all_exercises:
    numbers = [ex['number'] for ex in all_exercises]
    print(f"Exercise numbers range: {min(numbers)} to {max(numbers)}")
    print(f"\nFirst 10 exercises found:")
    for ex in all_exercises[:10]:
        print(f"  Line {ex['line']}: Exercise {ex['number']} ({ex['pattern']})")
    
    print(f"\nLast 10 exercises found:")
    for ex in all_exercises[-10:]:
        print(f"  Line {ex['line']}: Exercise {ex['number']} ({ex['pattern']})")

# Search for Greek text blocks that might be exercises without numbers
print("\n" + "=" * 70)
print("SEARCHING FOR UNNUMBERED GREEK TEXT BLOCKS")
print("=" * 70)

# Find all Greek text markers
greek_blocks = []
for i, line in enumerate(lines):
    if '**Greek Text:**' in line or 'Greek Text:' in line:
        # Get surrounding context
        start = max(0, i - 5)
        end = min(len(lines), i + 20)
        context = '\n'.join(lines[start:end])
        
        # Check if this is part of a numbered exercise
        has_exercise_num = bool(re.search(r'Exercise\s+\d+', context))
        
        if not has_exercise_num:
            greek_blocks.append({
                'line': i + 1,
                'context': context[:200]
            })

print(f"\nGreek text blocks without exercise numbers: {len(greek_blocks)}")
if greek_blocks:
    print("\nFirst 3 unnumbered Greek text blocks:")
    for block in greek_blocks[:3]:
        print(f"\n  Line {block['line']}:")
        print(f"  {block['context'][:150]}...")

# Count total Greek Text markers
greek_text_count = content.count('**Greek Text:**') + content.count('- **Greek Text:**')
print(f"\n" + "=" * 70)
print(f"Total '**Greek Text:**' markers in file: {greek_text_count}")
print("=" * 70)

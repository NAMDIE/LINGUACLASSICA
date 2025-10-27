#!/usr/bin/env python3
import re

with open('/workspace/docs/greek_content/greek_content_database.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in file: {len(lines)}")

# Count exercise headers
exercise_count = 0
for i, line in enumerate(lines):
    if line.startswith('### Exercise '):
        exercise_count += 1
        if exercise_count <= 10 or exercise_count >= 136:  # Show first 10 and last 10
            print(f"Line {i+1}: {line.strip()}")

print(f"\nTotal exercises found: {exercise_count}")

# Count Greek Text markers
greek_text_count = 0
for line in lines:
    if '**Greek Text:**' in line:
        greek_text_count += 1

print(f"Total '**Greek Text:**' markers: {greek_text_count}")

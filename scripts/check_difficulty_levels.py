#!/usr/bin/env python3
"""Search for difficulty level indicators in Greek exercise database."""

import re

# Read the file
with open('/workspace/docs/greek_content/greek_content_database.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all difficulty level headers
patterns = [
    r'^###\s+(Beginner|Intermediate|Advanced|Expert|Master)\s+Level',
    r'^##\s+(Beginner|Intermediate|Advanced|Expert|Master)\s+Level',
]

output = []
output.append("=== DIFFICULTY LEVEL SECTIONS ===\n\n")

for pattern in patterns:
    matches = re.finditer(pattern, content, re.MULTILINE | re.IGNORECASE)
    for match in matches:
        line_num = content[:match.start()].count('\n') + 1
        output.append(f"Line {line_num}: {match.group()}\n")

# Also search for level indicators in exercise sections
output.append("\n=== SEARCHING FOR BEGINNER/INTERMEDIATE EXERCISES ===\n\n")

# Get all exercises with their context
exercise_pattern = re.compile(r'^###\s+Exercise\s+(\d+):\s+(.*)$', re.MULTILINE)
matches = exercise_pattern.finditer(content)

for match in matches:
    num = match.group(1)
    title = match.group(2)
    
    # Get context around this exercise (500 chars before and after)
    start = max(0, match.start() - 500)
    end = min(len(content), match.end() + 500)
    context = content[start:end].lower()
    
    # Check if this is a beginner or intermediate exercise
    if any(word in context for word in ['beginner', 'intermediate']):
        output.append(f"Exercise {num}: {title}\n")
        output.append(f"  Context contains: {', '.join([w for w in ['beginner', 'intermediate', 'advanced', 'expert', 'master'] if w in context])}\n")

# Write results
with open('/workspace/difficulty_analysis.txt', 'w', encoding='utf-8') as f:
    f.write(''.join(output))

print("Difficulty analysis complete")

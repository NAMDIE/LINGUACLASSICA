#!/usr/bin/env python3
"""Search for alternative exercise formats in Greek database."""

import re

# Read the file
with open('/workspace/docs/greek_content/greek_content_database.md', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

output = []

# Search for different exercise header patterns
patterns = [
    r'^###\s+Exercise\s+\d+',  # ### Exercise N
    r'^\*\*Exercise\s+\d+',     # **Exercise N**
    r'^##\s+Exercise\s+\d+',    # ## Exercise N
    r'^Exercise\s+\d+:',        # Exercise N:
    r'^\d+\.\s+',               # 1. numbered list
]

output.append("=== SEARCHING FOR EXERCISE FORMATS ===\n\n")

for i, pattern in enumerate(patterns):
    matches = re.findall(pattern, content, re.MULTILINE)
    output.append(f"Pattern {i+1} ({pattern}): {len(matches)} matches\n")
    if matches and len(matches) < 100:
        for j, match in enumerate(matches[:10]):
            output.append(f"  {match}\n")

# Look for the first occurrence of Greek Text in the document
output.append("\n=== FIRST OCCURRENCES OF KEY MARKERS ===\n\n")

markers = ['**Greek Text:**', '**English Translation:**', '**Vocabulary:**']
for marker in markers:
    idx = content.find(marker)
    if idx != -1:
        line_num = content[:idx].count('\n') + 1
        context_start = max(0, idx - 100)
        context_end = min(len(content), idx + 100)
        context = content[context_start:context_end]
        output.append(f"{marker} first appears at line {line_num}\n")
        output.append(f"Context: ...{context}...\n\n")

# Write results
with open('/workspace/format_analysis.txt', 'w', encoding='utf-8') as f:
    f.write(''.join(output))

print("Format analysis complete")

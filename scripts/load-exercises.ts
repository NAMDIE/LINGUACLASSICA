#!/usr/bin/env ts-node
/**
 * Load all Latin and Greek exercises into Supabase database
 * Uses batch inserts with the Supabase client for reliable data loading
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Supabase configuration
const SUPABASE_URL = 'https://hxqqswjevxuollcgxbzg.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cXFzd2pldnh1b2xsY2d4YnpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTUyMzQ1NiwiZXhwIjoyMDc3MDk5NDU2fQ.z1R7KvQ9NiABVBIT1iIEiKURFqkmeb9Ip7X-iNN-mGo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface Exercise {
  language: string;
  difficulty_level: string;
  exercise_code: string;
  title: string;
  original_text: string;
  english_translation: string;
  vocabulary: Record<string, { meaning: string; grammar: string }>;
  grammar_notes: string;
  cultural_context: string;
  word_count: number;
  author: string;
  work: string;
}

function parseVocabulary(vocabText: string): Record<string, { meaning: string; grammar: string }> {
  const vocab: Record<string, { meaning: string; grammar: string }> = {};
  const lines = vocabText.trim().split('\n');
  
  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      // Format: - word - meaning (grammar)
      const match = line.trim().match(/-\s+(\S+)\s+-\s+(.+?)\s+\((.+?)\)/);
      if (match) {
        const [, word, meaning, grammar] = match;
        vocab[word] = { meaning, grammar };
      }
    }
  }
  
  return vocab;
}

function parseExerciseBlock(block: string, language: string): Exercise | null {
  const lines = block.split('\n');
  
  // Extract exercise code and title from header (### CODE: Title)
  const headerMatch = lines[0].match(/###\s+([A-Z]+-[0-9]+):\s+\[(.+?)\]/);
  if (!headerMatch) {
    return null;
  }
  
  const [, exerciseCode, title] = headerMatch;
  
  // Determine difficulty from code prefix
  const difficultyMap: Record<string, string> = {
    'BEG': 'beginner',
    'INT': 'intermediate',
    'ADV': 'advanced',
    'EXP': 'expert',
    'MAST': 'master'
  };
  
  const difficultyPrefix = exerciseCode.split('-')[0];
  const difficulty = difficultyMap[difficultyPrefix] || 'beginner';
  
  // Extract original text (between ``` markers)
  let originalText = '';
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim() === '```' && !inCodeBlock) {
      inCodeBlock = true;
      continue;
    } else if (line.trim() === '```' && inCodeBlock) {
      break;
    } else if (inCodeBlock) {
      originalText += line.trim() + ' ';
    }
  }
  originalText = originalText.trim();
  
  // Extract English translation
  let translation = '';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('**English Translation:**')) {
      if (i + 1 < lines.length) {
        translation = lines[i + 1].trim().replace(/^"|"$/g, '');
      }
    }
  }
  
  // Extract vocabulary
  let vocabText = '';
  let inVocab = false;
  for (const line of lines) {
    if (line.includes('**Vocabulary:**')) {
      inVocab = true;
      continue;
    } else if (inVocab && line.trim().startsWith('**')) {
      break;
    } else if (inVocab) {
      vocabText += line + '\n';
    }
  }
  
  const vocabulary = parseVocabulary(vocabText);
  
  // Extract grammar notes
  let grammarNotes = '';
  let inGrammar = false;
  for (const line of lines) {
    if (line.includes('**Grammar Notes:**')) {
      inGrammar = true;
      continue;
    } else if (inGrammar && line.trim().startsWith('**')) {
      break;
    } else if (inGrammar && line.trim()) {
      grammarNotes += line.trim() + ' ';
    }
  }
  grammarNotes = grammarNotes.trim();
  
  // Extract cultural context
  let culturalContext = '';
  let inCultural = false;
  for (const line of lines) {
    if (line.includes('**Cultural Context:**')) {
      inCultural = true;
      continue;
    } else if (inCultural && line.trim().startsWith('**')) {
      break;
    } else if (inCultural && line.trim()) {
      culturalContext += line.trim() + ' ';
    }
  }
  culturalContext = culturalContext.trim();
  
  // Extract word count
  let wordCount = 0;
  for (const line of lines) {
    if (line.includes('**Word Count:**') || line.includes('Word Count:')) {
      const match = line.match(/(\d+)/);
      if (match) {
        wordCount = parseInt(match[1]);
      }
    }
  }
  
  // Extract author and work
  let author = '';
  let work = '';
  
  // Look for author/work in lines
  for (const line of lines) {
    if (line.toLowerCase().includes('author:')) {
      author = line.replace(/.*[Aa]uthor:\s*/, '').trim();
    }
    if (line.toLowerCase().includes('work:')) {
      work = line.replace(/.*[Ww]ork:\s*/, '').trim();
    }
  }
  
  // Infer from context if not found
  if (!author) {
    const contextLower = culturalContext.toLowerCase();
    if (contextLower.includes('catullus')) author = 'Catullus';
    else if (contextLower.includes('vergil') || contextLower.includes('virgil')) author = 'Vergil';
    else if (contextLower.includes('ovid')) author = 'Ovid';
    else if (contextLower.includes('caesar')) author = 'Caesar';
    else if (contextLower.includes('homer')) author = 'Homer';
    else if (contextLower.includes('plato')) author = 'Plato';
    else if (contextLower.includes('thucydides')) author = 'Thucydides';
    else if (contextLower.includes('sophocles')) author = 'Sophocles';
    else if (contextLower.includes('herodotus')) author = 'Herodotus';
  }
  
  if (!work) {
    const contextLower = (culturalContext + title).toLowerCase();
    if (contextLower.includes('aeneid')) work = 'Aeneid';
    else if (contextLower.includes('metamorphoses')) work = 'Metamorphoses';
    else if (contextLower.includes('gallic war')) work = 'De Bello Gallico';
    else if (contextLower.includes('poem')) work = 'Poems';
    else if (contextLower.includes('odyssey')) work = 'Odyssey';
    else if (contextLower.includes('apology')) work = 'Apology';
    else if (contextLower.includes('republic')) work = 'Republic';
  }
  
  if (!originalText) {
    return null;
  }
  
  return {
    language,
    difficulty_level: difficulty,
    exercise_code: exerciseCode,
    title,
    original_text: originalText,
    english_translation: translation,
    vocabulary,
    grammar_notes: grammarNotes,
    cultural_context: culturalContext,
    word_count: wordCount > 0 ? wordCount : originalText.split(/\s+/).length,
    author: author || 'Classical Author',
    work: work || 'Classical Work'
  };
}

function parseContentFile(filepath: string, language: string): Exercise[] {
  const content = fs.readFileSync(filepath, 'utf-8');
  
  // Split into exercise blocks using the ### CODE: pattern
  const exerciseBlocks = content.split(/\n(?=### [A-Z]+-[0-9]+:)/);
  
  const exercises: Exercise[] = [];
  for (const block of exerciseBlocks) {
    if (block.trim().startsWith('###')) {
      const exercise = parseExerciseBlock(block, language);
      if (exercise && exercise.original_text) {
        exercises.push(exercise);
      }
    }
  }
  
  return exercises;
}

async function loadExercises() {
  console.log('🚀 Starting exercise loading process...\n');
  
  // Parse Latin exercises
  console.log('📖 Parsing Latin exercises...');
  const latinPath = path.join(__dirname, '../docs/latin_content/latin_content_database.md');
  const latinExercises = parseContentFile(latinPath, 'latin');
  console.log(`✅ Found ${latinExercises.length} Latin exercises\n`);
  
  // Parse Greek exercises
  console.log('📖 Parsing Greek exercises...');
  const greekPath = path.join(__dirname, '../docs/greek_content/greek_content_database.md');
  const greekExercises = parseContentFile(greekPath, 'greek');
  console.log(`✅ Found ${greekExercises.length} Greek exercises\n`);
  
  const allExercises = [...latinExercises, ...greekExercises];
  console.log(`📊 Total exercises to load: ${allExercises.length}\n`);
  
  // Delete existing exercises
  console.log('🗑️  Clearing existing exercises...');
  const { error: deleteError } = await supabase
    .from('exercises')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
  
  if (deleteError) {
    console.error('❌ Error deleting existing exercises:', deleteError);
    process.exit(1);
  }
  console.log('✅ Existing exercises cleared\n');
  
  // Insert exercises in batches of 50
  const BATCH_SIZE = 50;
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < allExercises.length; i += BATCH_SIZE) {
    const batch = allExercises.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(allExercises.length / BATCH_SIZE);
    
    console.log(`📦 Inserting batch ${batchNum}/${totalBatches} (${batch.length} exercises)...`);
    
    const { data, error } = await supabase
      .from('exercises')
      .insert(batch)
      .select();
    
    if (error) {
      console.error(`❌ Error in batch ${batchNum}:`, error.message);
      errorCount += batch.length;
    } else {
      console.log(`✅ Batch ${batchNum} inserted successfully`);
      successCount += batch.length;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 FINAL RESULTS:');
  console.log(`✅ Successfully inserted: ${successCount} exercises`);
  console.log(`❌ Failed: ${errorCount} exercises`);
  console.log(`📈 Success rate: ${((successCount / allExercises.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(50));
  
  // Verify count in database
  const { count } = await supabase
    .from('exercises')
    .select('*', { count: 'exact', head: true });
  
  console.log(`\n🔍 Verification: Database now contains ${count} exercises`);
}

// Run the script
loadExercises().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

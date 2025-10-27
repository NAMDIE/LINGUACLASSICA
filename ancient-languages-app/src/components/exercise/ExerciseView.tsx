import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff, BookMarked, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ExerciseViewProps {
  language: 'latin' | 'greek';
  userProfile: any;
  onProfileUpdate: () => void;
}

interface Exercise {
  id: number;
  language: string;
  difficulty_level: string;
  exercise_code: string;
  title: string;
  original_text: string;
  english_translation: string;
  vocabulary: any;
  grammar_notes: string;
  cultural_context: string;
  word_count: number;
  author: string;
  work: string;
}

const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert', 'master'];

export default function ExerciseView({ language, userProfile, onProfileUpdate }: ExerciseViewProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [showTranslation, setShowTranslation] = useState(false);
  const [showGrammar, setShowGrammar] = useState(false);
  const [showCultural, setShowCultural] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    loadExercises();
    setCurrentIndex(0);
    setShowTranslation(false);
  }, [language, selectedDifficulty]);

  // Auto-adjust difficulty when switching to Greek (Greek only has Advanced+)
  useEffect(() => {
    if (language === 'greek' && (selectedDifficulty === 'beginner' || selectedDifficulty === 'intermediate')) {
      setSelectedDifficulty('advanced');
    }
  }, [language]);

  async function loadExercises() {
    setLoading(true);
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('language', language)
      .eq('difficulty_level', selectedDifficulty)
      .order('id');

    if (error) {
      console.error('Error loading exercises:', error);
    } else {
      setExercises(data || []);
    }
    setLoading(false);
  }

  async function handleCompleteExercise() {
    if (!userProfile?.id || completing) return;

    const currentExercise = exercises[currentIndex];
    if (!currentExercise) return;

    setCompleting(true);

    try {
      // Calculate XP based on difficulty
      const xpByDifficulty: Record<string, number> = {
        beginner: 10,
        intermediate: 20,
        advanced: 30,
        expert: 40,
        master: 50
      };
      const xpEarned = xpByDifficulty[selectedDifficulty] || 10;

      // Record progress
      await supabase.from('user_progress').insert({
        user_id: userProfile.id,
        exercise_id: currentExercise.id,
        xp_earned: xpEarned,
        accuracy_percentage: 100
      });

      // Update user profile
      const newTotalXp = userProfile.total_xp + xpEarned;
      const newLevel = Math.floor(newTotalXp / 100) + 1;

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      const lastPractice = userProfile.last_practice_date;
      let newStreak = userProfile.current_streak;

      if (lastPractice !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastPractice === yesterdayStr) {
          newStreak += 1;
        } else if (!lastPractice) {
          newStreak = 1;
        } else {
          newStreak = 1;
        }
      }

      await supabase
        .from('user_profiles')
        .update({
          total_xp: newTotalXp,
          level: newLevel,
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, userProfile.longest_streak),
          last_practice_date: today,
          updated_at: new Date().toISOString()
        })
        .eq('id', userProfile.id);

      // Update daily stats
      await supabase
        .from('daily_stats')
        .upsert({
          user_id: userProfile.id,
          practice_date: today,
          xp_earned: xpEarned,
          exercises_completed: 1,
          streak_day: newStreak
        }, {
          onConflict: 'user_id,practice_date',
          ignoreDuplicates: false
        });

      // Refresh profile
      onProfileUpdate();

      // Move to next exercise
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowTranslation(false);
        setShowGrammar(false);
        setShowCultural(false);
      }
    } catch (error) {
      console.error('Error completing exercise:', error);
    } finally {
      setCompleting(false);
    }
  }

  const currentExercise = exercises[currentIndex];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 dark:border-amber-400 mx-auto"></div>
          <p className="mt-4 text-stone-600 dark:text-gray-400">Loading exercises...</p>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-amber-200 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-gray-100 mb-4">No Exercises Found</h2>
          <p className="text-stone-600 dark:text-gray-400 mb-4">
            No exercises available for {language === 'greek' ? 'Greek' : 'Latin'} at the {selectedDifficulty} level.
          </p>
          {language === 'greek' && (selectedDifficulty === 'beginner' || selectedDifficulty === 'intermediate') && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 mt-4">
              <p className="text-amber-800 dark:text-amber-400 font-medium">
                💡 Greek exercises start at Advanced level. Please select Advanced, Expert, or Master difficulty above.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const vocabulary = currentExercise.vocabulary || {};

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Difficulty Selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {DIFFICULTY_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedDifficulty(level)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              selectedDifficulty === level
                ? 'bg-amber-600 dark:bg-amber-500 text-white'
                : 'bg-white dark:bg-gray-700 text-stone-600 dark:text-gray-300 border border-stone-300 dark:border-gray-600 hover:bg-stone-50 dark:hover:bg-gray-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Exercise Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-serif font-bold">{currentExercise.title}</h2>
              <p className="text-amber-100 mt-1">
                {currentExercise.author} - {currentExercise.work}
              </p>
            </div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium capitalize">
              {currentExercise.difficulty_level}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-amber-100">
            <span>{currentIndex + 1} of {exercises.length}</span>
            <span>•</span>
            <span>{currentExercise.word_count} words</span>
          </div>
        </div>

        {/* Original Text */}
        <div className="p-8">
          <h3 className="text-sm font-semibold text-stone-600 dark:text-gray-400 uppercase tracking-wide mb-4">
            Original Text
          </h3>
          <div className="text-2xl leading-relaxed text-stone-800 dark:text-gray-100 font-serif mb-6">
            {currentExercise.original_text.split(' ').map((word, i) => {
              const cleanWord = word.replace(/[.,;:!?]/g, '').toLowerCase();
              const hasVocab = vocabulary[cleanWord] || vocabulary[word.toLowerCase()];
              
              return (
                <span
                  key={i}
                  className={`relative ${hasVocab ? 'cursor-help hover:text-amber-600 dark:hover:text-amber-400 transition-colors underline decoration-dotted decoration-amber-400/50 dark:decoration-amber-500/50' : ''}`}
                  onMouseEnter={() => hasVocab && setHoveredWord(cleanWord)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word}{' '}
                  {hoveredWord === cleanWord && vocabulary[cleanWord] && (
                    <span className="absolute left-0 top-full mt-2 z-10 bg-stone-800 dark:bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl border border-stone-700 dark:border-gray-600 whitespace-nowrap">
                      <div className="font-bold text-amber-400">{vocabulary[cleanWord].meaning}</div>
                      <div className="text-xs text-stone-300 dark:text-gray-400">{vocabulary[cleanWord].grammar}</div>
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          {/* Translation Toggle */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium mb-6"
          >
            {showTranslation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span>{showTranslation ? 'Hide' : 'Show'} Translation</span>
          </button>

          {showTranslation && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 mb-6 border border-amber-200 dark:border-amber-800/50">
              <h3 className="text-sm font-semibold text-stone-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                English Translation
              </h3>
              <p className="text-lg text-stone-700 dark:text-gray-300 leading-relaxed">
                {currentExercise.english_translation}
              </p>
            </div>
          )}

          {/* Grammar Notes */}
          <div className="mb-6">
            <button
              onClick={() => setShowGrammar(!showGrammar)}
              className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium mb-3"
            >
              <BookMarked className="w-5 h-5" />
              <span>{showGrammar ? 'Hide' : 'Show'} Grammar Notes</span>
            </button>
            {showGrammar && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800/50">
                <p className="text-stone-700 dark:text-gray-300 leading-relaxed">{currentExercise.grammar_notes}</p>
              </div>
            )}
          </div>

          {/* Cultural Context */}
          <div className="mb-6">
            <button
              onClick={() => setShowCultural(!showCultural)}
              className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium mb-3"
            >
              <Info className="w-5 h-5" />
              <span>{showCultural ? 'Hide' : 'Show'} Cultural Context</span>
            </button>
            {showCultural && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800/50">
                <p className="text-stone-700 dark:text-gray-300 leading-relaxed">{currentExercise.cultural_context}</p>
              </div>
            )}
          </div>

          {/* Complete Exercise Button */}
          <button
            onClick={handleCompleteExercise}
            disabled={completing}
            className="w-full px-6 py-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {completing ? 'Completing...' : 'Mark as Complete'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setShowTranslation(false);
              setShowGrammar(false);
              setShowCultural(false);
            }
          }}
          disabled={currentIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-stone-300 dark:border-gray-600 text-stone-600 dark:text-gray-300 hover:bg-stone-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => {
            if (currentIndex < exercises.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setShowTranslation(false);
              setShowGrammar(false);
              setShowCultural(false);
            }
          }}
          disabled={currentIndex === exercises.length - 1}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-stone-300 dark:border-gray-600 text-stone-600 dark:text-gray-300 hover:bg-stone-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

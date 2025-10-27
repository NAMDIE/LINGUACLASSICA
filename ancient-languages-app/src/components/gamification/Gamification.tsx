import { useState, useEffect } from 'react';
import { Trophy, Award, Star, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface GamificationProps {
  userProfile: any;
}

export default function Gamification({ userProfile }: GamificationProps) {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    loadAchievements();
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (userProfile?.id) {
      loadUserAchievements();
    }
  }, [userProfile]);

  async function loadAchievements() {
    const { data } = await supabase
      .from('achievements')
      .select('*')
      .order('category, xp_reward');

    if (data) {
      setAchievements(data);
    }
  }

  async function loadUserAchievements() {
    if (!userProfile?.id) return;

    const { data } = await supabase
      .from('user_achievements')
      .select('achievement_id, earned_at')
      .eq('user_id', userProfile.id);

    if (data) {
      setUserAchievements(data);
    }
  }

  async function loadLeaderboard() {
    const { data } = await supabase
      .from('user_profiles')
      .select('id, username, total_xp, level, current_streak')
      .order('total_xp', { ascending: false })
      .limit(10);

    if (data) {
      setLeaderboard(data);
    }
  }

  const earnedAchievementIds = new Set(userAchievements.map(ua => ua.achievement_id));

  // Group achievements by category
  const achievementsByCategory: Record<string, any[]> = achievements.reduce((acc: Record<string, any[]>, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {});

  const categoryIcons: Record<string, any> = {
    foundation: '🎯',
    streaks: '🔥',
    grammar: '📚',
    latin: '🏛️',
    greek: '🏺',
    cultural: '🎭',
    level: '⭐',
    xp: '💎',
    special: '✨'
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-serif font-bold text-stone-800 dark:text-gray-100 mb-8">Achievements & Leaderboard</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Achievements Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-200 dark:border-gray-700 p-6 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-gray-100">Your Badges</h2>
            </div>

            <div className="mb-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-amber-100">Badges Earned</div>
                  <div className="text-3xl font-bold">{userAchievements.length}</div>
                </div>
                <div>
                  <div className="text-sm text-amber-100">Total Badges</div>
                  <div className="text-3xl font-bold">{achievements.length}</div>
                </div>
                <div>
                  <div className="text-sm text-amber-100">Progress</div>
                  <div className="text-3xl font-bold">
                    {achievements.length > 0 ? Math.round((userAchievements.length / achievements.length) * 100) : 0}%
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Categories */}
            <div className="space-y-6">
              {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-3 flex items-center space-x-2">
                    <span>{categoryIcons[category] || '🏅'}</span>
                    <span>{category}</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categoryAchievements.map((achievement) => {
                      const isEarned = earnedAchievementIds.has(achievement.id);
                      return (
                        <div
                          key={achievement.id}
                          className={`rounded-lg p-4 border-2 transition-all ${
                            isEarned
                              ? 'bg-amber-50 border-amber-400 shadow-md'
                              : 'bg-stone-50 border-stone-200 opacity-60'
                          }`}
                        >
                          <div className="text-3xl mb-2">{isEarned ? '🏆' : '🔒'}</div>
                          <div className="text-sm font-semibold text-stone-800 mb-1">{achievement.name}</div>
                          <div className="text-xs text-stone-600 mb-2">{achievement.description}</div>
                          <div className="text-xs text-amber-700 font-semibold">+{achievement.xp_reward} XP</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-200 dark:border-gray-700 p-6 sticky top-20">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-gray-100">Top Learners</h2>
            </div>

            <div className="space-y-3">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = entry.id === userProfile?.id;
                const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null;

                return (
                  <div
                    key={entry.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      isCurrentUser ? 'bg-amber-100 border-2 border-amber-400' : 'bg-stone-50'
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 text-center">
                      {medal ? (
                        <span className="text-2xl">{medal}</span>
                      ) : (
                        <span className="text-sm font-semibold text-stone-600">#{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-stone-800 truncate">
                        {entry.username || 'Anonymous'}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs text-amber-700">(You)</span>
                        )}
                      </div>
                      <div className="text-xs text-stone-600">
                        Level {entry.level} • {entry.current_streak} day streak
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-bold text-amber-600">{entry.total_xp}</div>
                        <div className="text-xs text-stone-500">XP</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {userProfile && !leaderboard.some(e => e.id === userProfile.id) && (
              <div className="mt-4 pt-4 border-t border-stone-200">
                <div className="text-xs text-stone-500 mb-2 text-center">Your Ranking</div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-100 border-2 border-amber-400">
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-sm font-semibold text-stone-600">-</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-stone-800">
                      {userProfile.username || 'You'}
                    </div>
                    <div className="text-xs text-stone-600">
                      Level {userProfile.level} • {userProfile.current_streak} day streak
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-600">{userProfile.total_xp}</div>
                      <div className="text-xs text-stone-500">XP</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Award, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface DashboardProps {
  userProfile: any;
}

export default function Dashboard({ userProfile }: DashboardProps) {
  const [stats, setStats] = useState({
    totalExercises: 0,
    totalMinutes: 0,
    avgAccuracy: 100,
    latinExercises: 0,
    greekExercises: 0
  });
  const [dailyStats, setDailyStats] = useState<any[]>([]);

  useEffect(() => {
    if (userProfile?.id) {
      loadStats();
    }
  }, [userProfile]);

  async function loadStats() {
    if (!userProfile?.id) return;

    // Load total exercises completed
    const { data: progress } = await supabase
      .from('user_progress')
      .select('exercise_id, exercises(language)')
      .eq('user_id', userProfile.id);

    if (progress) {
      const total = progress.length;
      const latin = progress.filter((p: any) => p.exercises?.language === 'latin').length;
      const greek = progress.filter((p: any) => p.exercises?.language === 'greek').length;

      setStats(prev => ({
        ...prev,
        totalExercises: total,
        latinExercises: latin,
        greekExercises: greek
      }));
    }

    // Load daily stats for calendar
    const { data: daily } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('user_id', userProfile.id)
      .order('practice_date', { ascending: false })
      .limit(90);

    if (daily) {
      setDailyStats(daily);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-serif font-bold text-stone-800 dark:text-gray-100 mb-8">Your Progress</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-amber-600" />}
          label="Total XP"
          value={userProfile?.total_xp || 0}
          color="bg-amber-100"
        />
        <StatCard
          icon={<Award className="w-6 h-6 text-purple-600" />}
          label="Exercises Completed"
          value={stats.totalExercises}
          color="bg-purple-100"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6 text-blue-600" />}
          label="Current Streak"
          value={`${userProfile?.current_streak || 0} days`}
          color="bg-blue-100"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-green-600" />}
          label="Level"
          value={userProfile?.level || 1}
          color="bg-green-100"
        />
      </div>

      {/* Language Split */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-stone-800 dark:text-gray-100 mb-4">Language Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-stone-600">Latin</span>
                <span className="font-semibold text-stone-800">{stats.latinExercises} exercises</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all"
                  style={{ width: `${stats.totalExercises ? (stats.latinExercises / stats.totalExercises) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-stone-600">Greek</span>
                <span className="font-semibold text-stone-800">{stats.greekExercises} exercises</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${stats.totalExercises ? (stats.greekExercises / stats.totalExercises) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {dailyStats.slice(0, 5).map((day, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-stone-600">
                  {new Date(day.practice_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-stone-800">
                    {day.exercises_completed} exercises
                  </span>
                  <span className="text-sm text-amber-600 font-semibold">
                    +{day.xp_earned} XP
                  </span>
                </div>
              </div>
            ))}
            {dailyStats.length === 0 && (
              <p className="text-sm text-stone-500">No activity yet. Start learning!</p>
            )}
          </div>
        </div>
      </div>

      {/* Practice Calendar (Simplified) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-stone-800 dark:text-gray-100 mb-4">Practice Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (27 - i));
            const dateStr = date.toISOString().split('T')[0];
            const dayStat = dailyStats.find(s => s.practice_date === dateStr);
            const intensity = dayStat ? Math.min(dayStat.xp_earned / 50, 1) : 0;

            return (
              <div
                key={i}
                className={`aspect-square rounded ${
                  intensity > 0.7 ? 'bg-amber-600' :
                  intensity > 0.4 ? 'bg-amber-400' :
                  intensity > 0 ? 'bg-amber-200' :
                  'bg-stone-100 dark:bg-gray-700'
                }`}
                title={`${dateStr}: ${dayStat?.xp_earned || 0} XP`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end space-x-2 mt-4 text-xs text-stone-600 dark:text-gray-400">
          <span>Less</span>
          <div className="w-3 h-3 bg-stone-100 dark:bg-gray-700 rounded"></div>
          <div className="w-3 h-3 bg-amber-200 rounded"></div>
          <div className="w-3 h-3 bg-amber-400 rounded"></div>
          <div className="w-3 h-3 bg-amber-600 rounded"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-gray-700">
      <div className={`${color} dark:opacity-80 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-sm text-stone-600 dark:text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-bold text-stone-800 dark:text-gray-100">{value}</div>
    </div>
  );
}

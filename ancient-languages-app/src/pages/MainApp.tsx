import { useState, useEffect } from 'react';
import { BookOpen, Trophy, BarChart3, User, LogOut, Flame, Star, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import ExerciseView from '@/components/exercise/ExerciseView';
import Dashboard from '@/components/dashboard/Dashboard';
import Gamification from '@/components/gamification/Gamification';

type Section = 'exercises' | 'dashboard' | 'gamification' | 'profile';

export default function MainApp() {
  const { user, signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [currentSection, setCurrentSection] = useState<Section>('exercises');
  const [selectedLanguage, setSelectedLanguage] = useState<'latin' | 'greek'>('latin');
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  async function loadUserProfile() {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading profile:', error);
    } else if (data) {
      setUserProfile(data);
      setSelectedLanguage(data.preferred_language as 'latin' | 'greek');
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-amber-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-serif font-bold text-stone-800 dark:text-gray-100">Lingua Antiqua</span>
            </div>

            {/* Dark Mode Toggle & Language Selector */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-stone-100 dark:bg-gray-700 hover:bg-stone-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-stone-600" />
                )}
              </button>

              <div className="hidden sm:flex space-x-2 bg-stone-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setSelectedLanguage('latin')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedLanguage === 'latin'
                    ? 'bg-white dark:bg-gray-600 text-amber-700 dark:text-amber-400 shadow-sm'
                    : 'text-stone-600 dark:text-gray-300 hover:text-stone-800 dark:hover:text-gray-100'
                }`}
              >
                Latin
              </button>
              <button
                onClick={() => setSelectedLanguage('greek')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedLanguage === 'greek'
                    ? 'bg-white dark:bg-gray-600 text-amber-700 dark:text-amber-400 shadow-sm'
                    : 'text-stone-600 dark:text-gray-300 hover:text-stone-800 dark:hover:text-gray-100'
                }`}
              >
                Greek
              </button>
              </div>
            </div>

            {/* User Stats Quick View */}
            {userProfile && (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                  <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                  <span className="text-sm font-semibold text-stone-800 dark:text-gray-200">{userProfile.current_streak} day streak</span>
                </div>
                <div className="flex items-center space-x-2 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-semibold text-stone-800 dark:text-gray-200">{userProfile.total_xp} XP</span>
                </div>
                <div className="text-sm text-stone-600 dark:text-gray-400">
                  Level {userProfile.level}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex md:w-64 bg-white dark:bg-gray-800 border-r border-amber-200 dark:border-gray-700 flex-col">
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavButton
              icon={<BookOpen className="w-5 h-5" />}
              label="Learn"
              active={currentSection === 'exercises'}
              onClick={() => setCurrentSection('exercises')}
            />
            <NavButton
              icon={<BarChart3 className="w-5 h-5" />}
              label="Progress"
              active={currentSection === 'dashboard'}
              onClick={() => setCurrentSection('dashboard')}
            />
            <NavButton
              icon={<Trophy className="w-5 h-5" />}
              label="Achievements"
              active={currentSection === 'gamification'}
              onClick={() => setCurrentSection('gamification')}
            />
            <NavButton
              icon={<User className="w-5 h-5" />}
              label="Profile"
              active={currentSection === 'profile'}
              onClick={() => setCurrentSection('profile')}
            />
          </nav>

          <div className="p-4 border-t border-amber-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-stone-600 dark:text-gray-400 hover:text-stone-800 dark:hover:text-gray-200 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {currentSection === 'exercises' && (
            <ExerciseView language={selectedLanguage} userProfile={userProfile} onProfileUpdate={loadUserProfile} />
          )}
          {currentSection === 'dashboard' && (
            <Dashboard userProfile={userProfile} />
          )}
          {currentSection === 'gamification' && (
            <Gamification userProfile={userProfile} />
          )}
          {currentSection === 'profile' && (
            <div className="max-w-4xl mx-auto p-8">
              <h1 className="text-3xl font-serif font-bold text-stone-800 dark:text-gray-100 mb-6">Profile</h1>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-gray-700">
                <p className="text-stone-600 dark:text-gray-300">Profile settings coming soon...</p>
                <p className="text-sm text-stone-500 dark:text-gray-400 mt-2">Email: {user?.email}</p>
                {userProfile && (
                  <p className="text-sm text-stone-500 dark:text-gray-400">Username: {userProfile.username}</p>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-amber-200 dark:border-gray-700 flex justify-around py-2">
          <MobileNavButton
            icon={<BookOpen className="w-6 h-6" />}
            label="Learn"
            active={currentSection === 'exercises'}
            onClick={() => setCurrentSection('exercises')}
          />
          <MobileNavButton
            icon={<BarChart3 className="w-6 h-6" />}
            label="Progress"
            active={currentSection === 'dashboard'}
            onClick={() => setCurrentSection('dashboard')}
          />
          <MobileNavButton
            icon={<Trophy className="w-6 h-6" />}
            label="Achievements"
            active={currentSection === 'gamification'}
            onClick={() => setCurrentSection('gamification')}
          />
          <MobileNavButton
            icon={<User className="w-6 h-6" />}
            label="Profile"
            active={currentSection === 'profile'}
            onClick={() => setCurrentSection('profile')}
          />
        </nav>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full transition-colors ${
        active
          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold'
          : 'text-stone-600 dark:text-gray-400 hover:bg-stone-100 dark:hover:bg-gray-700 hover:text-stone-800 dark:hover:text-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center px-4 py-2 ${
        active ? 'text-amber-600 dark:text-amber-400' : 'text-stone-500 dark:text-gray-400'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

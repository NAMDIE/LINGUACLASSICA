import { BookOpen, Sparkles, Trophy, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onEnter: () => void;
}

export default function LandingPage({ onGetStarted, onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-amber-200/50 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-serif font-bold text-stone-800 dark:text-gray-100">Lingua Antiqua</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-800 dark:text-gray-100 mb-6">
            Master Ancient Latin & Greek
          </h1>
          <p className="text-xl text-stone-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Immerse yourself in classical texts. Learn through authentic passages from Caesar, Vergil, Homer, and Plato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold text-lg hover:bg-amber-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={onEnter}
              className="px-8 py-4 bg-white dark:bg-gray-700 text-amber-700 dark:text-amber-400 border-2 border-amber-600 dark:border-amber-500 rounded-lg font-semibold text-lg hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors"
            >
              Explore Without Account
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-amber-600" />}
            title="310+ Exercises"
            description="Authentic texts from classical authors across 5 difficulty levels"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-amber-600" />}
            title="Interactive Learning"
            description="Hover vocabulary, grammar notes, and cultural context"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8 text-amber-600" />}
            title="Gamification"
            description="Earn XP, unlock badges, and climb leaderboards"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-amber-600" />}
            title="Track Progress"
            description="Visual analytics and daily practice streaks"
          />
        </div>

        {/* Language Showcase */}
        <div className="mt-24 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-amber-200 dark:border-gray-700">
            <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-gray-100 mb-4">Ancient Latin</h3>
            <div className="space-y-4">
              <p className="text-lg italic text-stone-700 dark:text-gray-300">
                "Arma virumque cano, Troiae qui primus ab oris..."
              </p>
              <p className="text-sm text-stone-600 dark:text-gray-400">
                From Vergil's Aeneid to Caesar's Gallic Wars, explore the language of Rome's greatest minds.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Caesar</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Vergil</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Ovid</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Catullus</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-amber-200 dark:border-gray-700">
            <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-gray-100 mb-4">Ancient Greek</h3>
            <div className="space-y-4">
              <p className="text-lg italic text-stone-700 dark:text-gray-300">
                "Ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον..."
              </p>
              <p className="text-sm text-stone-600 dark:text-gray-400">
                Journey through Homer's epics, Plato's philosophy, and the dramatic works of Sophocles.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Homer</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Plato</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Sophocles</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">Thucydides</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-amber-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-stone-800 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-sm text-stone-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

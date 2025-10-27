import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import LandingPage from '@/pages/LandingPage';
import MainApp from '@/pages/MainApp';
import AuthPage from '@/pages/AuthPage';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 dark:border-amber-400 mx-auto"></div>
          <p className="mt-4 text-stone-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && showAuthPage) {
    return <AuthPage onBack={() => setShowAuthPage(false)} />;
  }

  if (!user && !hasStarted) {
    return (
      <LandingPage 
        onGetStarted={() => setShowAuthPage(true)}
        onEnter={() => setHasStarted(true)}
      />
    );
  }

  return <MainApp />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

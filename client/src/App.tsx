import React from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import WorkoutPlanner from './components/WorkoutPlanner';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">GymBook</h1>
        <DarkModeToggle />
      </header>


      <main className="p-8">
        <WorkoutPlanner />
      </main>
    </div>
  );
};

export default App;

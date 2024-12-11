import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import DarkModeToggle from './components/DarkModeToggle';
import WorkoutPlanner from './components/WorkoutPlanner';
import WorkoutPlannerCustom from './components/WorkoutPlannerCustom';
import { Dumbbell } from 'lucide-react';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
        <header className="flex justify-between p-4">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Dumbbell className="h-6 w-6" /> {/* You can adjust the size using the `h-6 w-6` classes */}
            <span>GymBook</span>
          </h1>
          <div className="flex space-x-4">
            <Link to="/" className="btn btn-primary">Custom Workout</Link>
            <Link to="/c" className="btn btn-primary">Standard Workout</Link>
          </div>
          <DarkModeToggle />
        </header>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<WorkoutPlannerCustom />} />
            <Route path="/c" element={<WorkoutPlanner />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

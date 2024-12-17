import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';



import { Dumbbell, Moon, Sun } from 'lucide-react';

import WorkoutTrackershadcn from './components/workout-tracker';
import { ModeToggle } from './components/ModeToggle';
import Profile from './components/Pages/Profile';
import History from './components/Pages/History';
import Exercises from './components/Pages/Exercises';
import { Navbar } from './components/Navbar';





const App: React.FC = () => {
  return (

    <BrowserRouter>
      <Navbar />

      <main className="p-1 mb-14">
        <Routes>
          <Route path="/" element={<WorkoutTrackershadcn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </main>
    </BrowserRouter>

  );
};

export default App;

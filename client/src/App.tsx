import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

import WorkoutTrackershadcn from './components/Pages/workout-tracker';
import Profile from './components/Pages/Profile';
import History from './components/Pages/History';
import Exercises from './components/Pages/Exercises';
import { Navbar } from './components/Navbar';
import WorkoutState from './components/Pages/WorkoutState';





const App: React.FC = () => {
  return (

    <BrowserRouter>
      <Navbar />

      <main className="p-2.5 mb-32">


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

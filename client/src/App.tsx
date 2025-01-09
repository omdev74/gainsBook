import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

import WorkoutTrackershadcn from './components/Pages/workout-tracker';
import Profile from './components/Pages/Profile';
import History from './components/Pages/History';
import Exercises from './components/Pages/Exercises';
import { Navbar } from './components/Navbar';
import WorkoutState from './components/Pages/WorkoutState';
import Login01Page from './components/Pages/Login';
import SignUp01Page from './components/Pages/Signup';





const App: React.FC = () => {
  return (

    <BrowserRouter>
      <Navbar />

      <main className="">


        <Routes>
          <Route path="/" element={<WorkoutTrackershadcn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/login" element={<Login01Page />} />
          <Route path="/signup" element={<SignUp01Page />} />

          
        </Routes>
      </main>
    </BrowserRouter>

  );
};

export default App;

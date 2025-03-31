import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import WorkoutTrackershadcn from './components/Pages/workout-tracker';
import Home from './components/Pages/Home';
import History from './components/Pages/History';
import Exercises from './components/Pages/Exercises';
import { Navbar } from './components/Navbar';
import Login01Page from './components/Pages/Login';
import SignUp01Page from './components/Pages/Signup';
import Settings from './components/Pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import WorkoutHistoryCustom from './components/Pages/WorkoutHistoryCustom';
import WorkoutHistory from './components/Pages/History';
import Exercise from './components/Pages/Exercise';

import { WorkoutProvider, useWorkout } from './contexts/WorkoutContext';
import { AuthContext } from './contexts/AuthContext'; // Assuming AuthContext is used for authentication.
import Profile from './components/Pages/Profile';
import WorkoutPage from './components/Pages/Workout';
import NotFound from './components/Pages/NotFound';
import { Toaster } from './components/ui/toaster';


const App: React.FC = () => {
  return (
    <WorkoutProvider>
      <MainContent />
      <Toaster />
    </WorkoutProvider>
  );
};

const MainContent: React.FC = () => {
  const { workoutState } = useWorkout(); // Access workout state to check `ongoing`
  const { ongoing } = workoutState;

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {/* Conditionally render Navbar and WorkoutTracker based on authentication */}
      {isLoggedIn && <Navbar />}
      {isLoggedIn && ongoing && <WorkoutTrackershadcn />}

      <main className="sm:mt-16 mt-0 scroll-auto sm:mb-0 mb-32">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login01Page />} />
          <Route path="/signup" element={<SignUp01Page />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/workout" element={<WorkoutPage />} />

            <Route path="/history" element={<WorkoutHistoryCustom />} />
            <Route path="/historyd" element={<WorkoutHistory />} />
            <Route path="/exercisesyd" element={<Exercises />} />
            <Route path="/exercise/:id" element={<Exercise />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

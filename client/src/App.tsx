import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';

import WorkoutTrackershadcn from './components/Pages/workout-tracker';
import Profile from './components/Pages/Profile';
import History from './components/Pages/History';
import Exercises from './components/Pages/Exercises';
import { Navbar } from './components/Navbar';
import WorkoutState from './components/Pages/WorkoutState';
import Login01Page from './components/Pages/Login';
import SignUp01Page from './components/Pages/Signup';
import Settings from './components/Pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import WorkoutHistoryCustom from './components/Pages/WorkoutHistoryCustom';
import WorkoutHistory from './components/Pages/History';
import Exercise from './components/Pages/Exercise';
import ExercisesCustom from './components/Pages/ExercisesCustom';

const App: React.FC = () => {


  return (

    <>
      <Navbar />
      <main className="">
        <Routes>

          <Route path="/login" element={<Login01Page />} />
          <Route path="/signup" element={<SignUp01Page />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/settings" element={<Settings />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<WorkoutTrackershadcn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<WorkoutHistoryCustom />} />
            <Route path="/historyd" element={<WorkoutHistory />} />
            <Route path="/exercisesyd" element={<Exercises />} />

            <Route path="/exercises" element={<ExercisesCustom />} />

          </Route>
        </Routes>
      </main></>

  );
};

export default App;

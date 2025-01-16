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

const App: React.FC = () => {
  const location = useLocation();  // Get the current route
  console.log(location.pathname);

  return (

    <>
      <Navbar />
      <main className="">
        <Routes>

          <Route path="/login" element={<Login01Page />} />
          <Route path="/signup" element={<SignUp01Page />} />
          <Route path="/settings" element={<Settings />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<WorkoutTrackershadcn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/exercises" element={<Exercises />} />
          </Route>
        </Routes>
      </main></>

  );
};

export default App;

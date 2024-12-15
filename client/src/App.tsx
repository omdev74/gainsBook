import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';



import { Dumbbell, Moon, Sun } from 'lucide-react';

import WorkoutTrackershadcn from './components/workout-tracker';
import { ModeToggle } from './components/ModeToggle';



const App: React.FC = () => {
  return (

    <BrowserRouter>

      <header className="flex  justify-evenly p-4">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Dumbbell className="h-6 w-6 text-primary" /> {/* You can adjust the size using the `h-6 w-6` classes */}
          <span>GymBook</span>
        </h1>
        <div className="flex space-x-4">
          <Link to="/" className="btn btn-primary">Custom Workout</Link>
          <Link to="/d" className="btn btn-primary">Standard Workout</Link>
          <Link to="/c" className="btn btn-primary">Card Workout</Link>
          <Link to="/s" className="btn btn-primary">shadcn</Link>


        </div>
        <ModeToggle />
      </header>

      <main className="p-8">
        <Routes>
          <Route path="/" element={<WorkoutTrackershadcn />} />



        </Routes>
      </main>





    </BrowserRouter>

  );
};

export default App;

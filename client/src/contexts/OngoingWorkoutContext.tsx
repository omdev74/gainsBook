import React, { createContext, useContext, useEffect, useState } from 'react';
import { Workout } from '@shared/types/frontend';
import { useObjectId } from "@/hooks/useObjectId";
import { AuthContext } from './AuthContext';

interface OngoingWorkoutContextType {
    workoutState: WorkoutState;
    setWorkoutState: React.Dispatch<React.SetStateAction<WorkoutState>>;
    startWorkout: () => void;
    clearWorkout: () => void;
}

interface WorkoutState {
    ongoing: boolean;
    workout: Workout | null; // ← allow null
}

const OngoingWorkoutContext = createContext<OngoingWorkoutContextType | undefined>(undefined);

export const OngoingWorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [workoutState, setWorkoutState] = useState<WorkoutState>({
        ongoing: false,
        workout: null,
    });
    const newId = useObjectId(); // Create new ID each time
    const startWorkout = () => {

        const nowIso = new Date().toISOString();

        const newWorkout: Workout = {
            _id: newId,
            Title: `Test Workout ${Date.now()}`,
            userId: user?._id,
            date: nowIso,
            notes: "",
            items: [],
            TotalVolume: 0,
            TotalSets: 0,
            TotalExercises: 0,
            createdAt: nowIso,
            updatedAt: nowIso,
            __v: 0
        };

        setWorkoutState({
            ongoing: true,
            workout: newWorkout,
        });
    };

    const clearWorkout = () => {

        setWorkoutState({
            ongoing: false,
            workout: null,
        });
        console.log(`clearing workout ${workoutState.workout?.Title}`);
    };
    // ✅ Monitor changes to workout state
    useEffect(() => {
        if (workoutState.workout === null && workoutState.ongoing === false) {
            console.log("✅ Workout has been cleared.");
        }
    }, [workoutState]);
    return (
        <OngoingWorkoutContext.Provider value={{ workoutState, setWorkoutState, startWorkout, clearWorkout }}>
            {children}
        </OngoingWorkoutContext.Provider>
    );
};

export const useWorkout = (): OngoingWorkoutContextType => {
    const context = useContext(OngoingWorkoutContext);
    if (!context) {
        throw new Error('useWorkout must be used within an OngoingWorkoutProvider');
    }
    return context;
};

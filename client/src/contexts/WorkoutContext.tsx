import React, { createContext, useContext, useState } from 'react';

interface WorkoutContextType {
    workoutState: WorkoutState;
    setWorkoutState: React.Dispatch<React.SetStateAction<WorkoutState>>;
}

interface WorkoutState {
    ongoing: boolean;
    workout: any;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [workoutState, setWorkoutState] = useState<WorkoutState>({
        ongoing: false,
        workout: {
            id: 'workout_1',
            name: 'Full Body Workout',
            items: [
                {
                    id: "1",
                    name: "Bench Press",
                    sets: [
                        {
                            reps: 12,
                            weight: 50,
                            setType: "Normal",
                        },
                        {
                            reps: 10,
                            weight: 55,
                            setType: "Normal",
                        },
                        {
                            drops: [
                                { reps: 8, weight: 60 },
                                { reps: 8, weight: 60 },
                            ],
                            setType: "Drop",
                        },
                        {
                            drops: [
                                { reps: 4, weight: 70 },
                                { reps: 4, weight: 70 },
                            ],
                            setType: "Myorep",
                        },
                    ],
                },
                {
                    id: "2",
                    name: "Squat",
                    sets: [
                        {
                            drops: [{ reps: 8, weight: 60 }],
                            setType: "Drop",
                        },
                    ],
                },
                {
                    id: "3",
                    name: "Chest and Triceps Superset",
                    exercises: [
                        {
                            id: "1",
                            name: "Bench Press",
                            sets: [
                                {
                                    reps: 13,
                                    weight: 50,
                                    setType: "Normal",
                                },
                                {
                                    reps: 10,
                                    weight: 55,
                                    setType: "Normal",
                                },
                            ],
                        },
                        {
                            id: "2",
                            name: "Squat",
                            sets: [
                                {
                                    reps: 12,
                                    weight: 50,
                                    setType: "Normal",
                                },
                                {
                                    reps: 10,
                                    weight: 55,
                                    setType: "Normal",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    });

    return (
        <WorkoutContext.Provider value={{ workoutState, setWorkoutState }}>
            {children}
        </WorkoutContext.Provider>
    );
};

// Custom hook to access the workout context
export const useWorkout = (): WorkoutContextType => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error('useWorkout must be used within a WorkoutProvider');
    }
    return context;
};

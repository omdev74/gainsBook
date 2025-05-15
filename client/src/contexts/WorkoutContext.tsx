import React, { createContext, useContext, useState } from 'react';
import { Workout } from '@shared/types/frontend';
import { useObjectId } from "@/hooks/useObjectId";
import { AuthContext } from './AuthContext';

interface WorkoutContextType {
    workoutState: WorkoutState;
    setWorkoutState: React.Dispatch<React.SetStateAction<WorkoutState>>;
}

interface WorkoutState {
    ongoing: boolean;
    workout: Workout;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const newId = useObjectId();
    const { user } = useContext(AuthContext);
    const nowIso = new Date().toISOString();

    const [workoutState, setWorkoutState] = useState<WorkoutState>({
        ongoing: false,
        workout: {
            "_id": newId,
            "Title": `Test Workout ${Date.now()}`,
            "userId": user?._id,
            "date": nowIso,
            "notes": "Upper body workout focusing on chest and triceps.",
            "items": [
                {
                    "itemType": "Regular",
                    "itemData": {
                        "exercisesAndTheirSets": [
                            {
                                "exerciseRef": {
                                    "_id": "678ebf9115751d7decc978e1",
                                    "name": "Arnold Shoulder Press"
                                },
                                "exerciseType": "DefaultExercise",
                                "sets": [
                                    {
                                        "index": 1,
                                        "setType": "Normal",
                                        "reps": 12,
                                        "weight": 0,
                                        "volume": 0
                                    },
                                    {
                                        "index": 2,
                                        "setType": "Normal",
                                        "reps": 20,
                                        "weight": 100,
                                        "volume": 500
                                    },
                                    {
                                        "index": 3,
                                        "drops": [
                                            { reps: 8, weight: 60 },
                                            { reps: 8, weight: 60 },
                                            { reps: 6, weight: 100 },
                                        ],
                                        "setType": "Drop",
                                    },
                                ]
                            }
                        ]
                    },
                    "ExerciseNote": null,
                    "_id": "663e7b1f4e9a28a8e2d7e4a3"
                },
                {
                    "itemType": "Superset",
                    "itemData": {
                        "exercisesAndTheirSets": [
                            {
                                "exerciseRef": {
                                    "_id": "678ebf9115751d7decc978e1",
                                    "name": "Arnold Shoulder Press"
                                },
                                "exerciseType": "DefaultExercise",
                                "sets": [
                                    {
                                        "index": 1,
                                        "setType": "Normal",
                                        "reps": 10,
                                        "weight": 50,
                                        "volume": 500
                                    },
                                    {
                                        "index": 2,
                                        "setType": "Normal",
                                        "reps": 20,
                                        "weight": 100,
                                        "volume": 500
                                    },
                                    {
                                        "index": 3,
                                        "drops": [
                                            { reps: 8, weight: 60 },
                                            { reps: 8, weight: 60 },
                                        ],
                                        "setType": "Drop",
                                    },
                                ]
                            },
                            {
                                "exerciseRef": {
                                    "_id": "678ebf9115751d7decc978e3",
                                    "name": "Barbell Hack Squats"
                                },
                                "exerciseType": "CustomExercise",
                                "sets": [
                                    {
                                        "index": 1,
                                        "setType": "Normal",
                                        "reps": 10,
                                        "weight": 50,
                                        "volume": 500
                                    },
                                    {
                                        "index": 2,
                                        "drops": [
                                            { reps: 8, weight: 60 },
                                            { reps: 8, weight: 60 },
                                        ],
                                        "setType": "Drop",
                                    },
                                    {
                                        "index": 3,
                                        "drops": [
                                            { reps: 8, weight: 60 },
                                            { reps: 8, weight: 60 },
                                        ],
                                        "setType": "Drop",
                                    },
                                ]
                            }
                        ]
                    },
                    "ExerciseNote": null,
                    "_id": "663e7b1f4e9a28a8e2d7e4a4"
                }
            ],
            "TotalVolume": 500,
            "TotalSets": 500,
            "TotalExercises": 500,
            "createdAt": "2025-02-01T23:40:08.827Z",
            "updatedAt": "2025-02-01T23:40:08.827Z",
            "__v": 0
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

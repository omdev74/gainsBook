import React, { createContext, useContext, useState } from 'react';
import { WorkoutItem } from '@shared/types/workout';

interface WorkoutContextType {
    workout: any;
    setWorkout: React.Dispatch<React.SetStateAction<any>>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);


export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Sample workout data based on your types
    const [workout, setWorkout] = useState<any>({
        id: 'workout_1',
        name: 'Full Body Workout',
        items: [
            {
                "id": "1",
                "name": "Bench Press",
                "sets": [
                    {
                        "reps": 12,
                        "weight": 50,
                        "completed": true,
                        "setType": "Normal"
                    },
                    {
                        "reps": 10,
                        "weight": 55,
                        "completed": false,
                        "setType": "Normal"
                    },
                    {
                        "drops": [
                            {
                                "reps": 8,
                                "weight": 60
                            },
                            {
                                "reps": 8,
                                "weight": 60
                            }
                        ],
                        "completed": false,
                        "setType": "Drop"
                    },
                    {
                        "drops": [
                            {
                                "reps": 4,
                                "weight": 70
                            },
                            {
                                "reps": 4,
                                "weight": 70
                            }
                        ],
                        "completed": false,
                        "setType": "Myorep"
                    }
                ]
            },
            {
                "id": "2",
                "name": "Squat",
                "sets": [
                    {
                        "drops": [
                            {
                                "reps": 8,
                                "weight": 60
                            }
                        ],
                        "completed": false,
                        "setType": "Drop"
                    }
                ]
            },
            {
                "id": "3",
                "name": "Chest and Triceps Superset",
                "exercises": [
                    {
                        "id": "1",
                        "name": "Bench Press",
                        "sets": [
                            {
                                "reps": 12,
                                "weight": 50,
                                "completed": true,
                                "setType": "Normal"
                            },
                            {
                                "reps": 10,
                                "weight": 55,
                                "completed": false,
                                "setType": "Normal"
                            },
                            {
                                "drops": [
                                    {
                                        "reps": 8,
                                        "weight": 60
                                    }
                                ],
                                "completed": false,
                                "setType": "Drop"
                            },
                            {
                                "drops": [
                                    {
                                        "reps": 4,
                                        "weight": 70
                                    }
                                ],
                                "completed": false,
                                "setType": "Myorep"
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "name": "Squat",
                        "sets": [
                            {
                                "drops": [
                                    {
                                        "reps": 8,
                                        "weight": 60
                                    }
                                ],
                                "completed": false,
                                "setType": "Drop"
                            }
                        ]
                    }
                ]
            }
        ],
    });

    return (
        <WorkoutContext.Provider value={{ workout, setWorkout }}>
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

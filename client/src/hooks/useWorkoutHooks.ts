// useWorkoutHooks.ts
import { AuthContext } from '@/contexts/AuthContext';
import { useWorkout } from '@/contexts/OngoingWorkoutContext';
import { ExerciseSet, WorkoutSet } from '@shared/types/frontend';
import axios from 'axios';
import { useContext, useState } from 'react';
const backendURI = import.meta.env.VITE_BACKEND_URI;

export const useToggleOngoing = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const toggleOngoing = () => {
        setWorkoutState((prevState) => ({
            ...prevState,
            ongoing: !prevState.ongoing,
        }));
    };

    return toggleOngoing;
};

export const useUpdateNotes = () => {
    const { setWorkoutState } = useWorkout();

    const updateNotes = (newNotes: string) => {
        setWorkoutState((prevState) => {
            if (!prevState.workout) return prevState; // Do nothing if workout is null
            return {
                ...prevState,
                workout: {
                    ...prevState.workout,
                    notes: newNotes,
                },
            }
        });
    };

    return updateNotes;
};
export const useRemoveWorkoutItem = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const removeWorkoutItem = (itemId: string) => {
        setWorkoutState((prevState) => {
            if (!prevState.workout) return prevState; // Do nothing if workout is null
            return {
                ...prevState,
                workout: {
                    ...prevState.workout,
                    items: prevState.workout.items.filter((item) => item._id !== itemId),
                },
            }
        });
    };

    return removeWorkoutItem;
};

export const useAddWorkoutItem = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const addWorkoutItem = (newItem: any) => {
        setWorkoutState((prevState) => {
            if (!prevState.workout) return prevState; // Do nothing if workout is null
            return {
                ...prevState,
                workout: {
                    ...prevState.workout,
                    items: [...prevState.workout.items, newItem],
                },
            }
        });
    };

    return addWorkoutItem;
};



export const useAddEmptyNormalSet = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const addEmptyNormalSet = (itemId: string, exerciseRefIds: string[]) => {
        console.log("addEmptyNormalSet", itemId, exerciseRefIds);
        setWorkoutState((prevState) => {
            if (!prevState.workout) return prevState; // Do nothing if workout is null
            const updatedItems = prevState.workout.items.map((item) =>
                item._id === itemId && item.itemData
                    ? {
                        ...item,
                        itemData: {
                            ...item.itemData,
                            exercisesAndTheirSets: item.itemData.exercisesAndTheirSets.map(
                                (exercise) =>
                                    exerciseRefIds.includes(exercise.exerciseRef._id)
                                        ? {
                                            ...exercise,
                                            sets: [
                                                ...exercise.sets,
                                                {
                                                    index: exercise.sets.length + 1,
                                                    setType: "Normal",
                                                    reps: 0,
                                                    weight: 0,
                                                    volume: 0,
                                                } as WorkoutSet, // You can also cast to NormalSet if needed
                                            ],
                                        }
                                        : exercise
                            ),
                        },
                    }
                    : item
            );

            return {
                ...prevState,
                workout: {
                    ...prevState.workout,
                    items: updatedItems,
                },
            };
        });
    };

    return addEmptyNormalSet;
};

export const useAddEmptySpecialSet = () => {
    const { workoutState, setWorkoutState } = useWorkout();
    const addEmptySpecialSet = (itemId: string, exerciseRefId: string, shortText: string) => {
        console.log("addEmptySpecialSet", itemId, exerciseRefId, shortText);

        switch (shortText) {

            case "Warmup": setWorkoutState((prevState) => {
                if (!prevState.workout) return prevState; // Do nothing if workout is null
                const updatedItems = prevState.workout.items.map((item) =>
                    item._id === itemId && item.itemData
                        ? {
                            ...item,
                            itemData: {
                                ...item.itemData,
                                exercisesAndTheirSets: item.itemData.exercisesAndTheirSets.map(
                                    (exercise) =>
                                        exercise.exerciseRef._id === exerciseRefId
                                            ? {
                                                ...exercise,
                                                sets: [
                                                    ...exercise.sets,
                                                    {
                                                        index: exercise.sets.length + 1,
                                                        setType: shortText,
                                                        reps: 0,
                                                        weight: 0,
                                                        volume: 0,
                                                    } as WorkoutSet, // Explicitly cast to NormalSet
                                                ],
                                            }
                                            : exercise
                                ),
                            },
                        }
                        : item
                );

                return {
                    ...prevState,
                    workout: {
                        ...prevState.workout,
                        items: updatedItems,
                    },
                };
            });
                break
            case "Drop":
            case "Myorep": setWorkoutState((prevState) => {
                if (!prevState.workout) return prevState; // Do nothing if workout is null
                const updatedItems = prevState.workout.items.map((item) =>
                    item._id === itemId && item.itemData
                        ? {
                            ...item,
                            itemData: {
                                ...item.itemData,
                                exercisesAndTheirSets: item.itemData.exercisesAndTheirSets.map(
                                    (exercise) =>
                                        exercise.exerciseRef._id === exerciseRefId
                                            ? {
                                                ...exercise,
                                                sets: [
                                                    ...exercise.sets,
                                                    {
                                                        index: exercise.sets.length + 1,
                                                        setType: shortText,
                                                        drops: [{ reps: 0, weight: 0 }],
                                                        volume: 0,
                                                    } as WorkoutSet, // Explicitly cast to NormalSet
                                                ],
                                            }
                                            : exercise
                                ),
                            },
                        }
                        : item
                );

                return {
                    ...prevState,
                    workout: {
                        ...prevState.workout,
                        items: updatedItems,
                    },
                };
            });
                break;
            default: "Normal";
        }

    };

    return addEmptySpecialSet;
}

export function useDrawerToggle(defaultState: boolean = false) {
    const [isExpanded, setIsExpanded] = useState(defaultState);

    const toggle = () => setIsExpanded(prev => !prev);
    const collapse = () => setIsExpanded(false);
    const expand = () => setIsExpanded(true);

    return { isExpanded, setIsExpanded, toggle, collapse, expand };
}


export const useUploadWorkout = () => {
    const { token } = useContext(AuthContext);
    const { workoutState, setWorkoutState } = useWorkout();

    const uploadWorkout = async () => {
        try {
            const response = await axios.post(
                `${backendURI}/createworkout`,
                workoutState.workout, // Send actual workout data as body
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Workout uploaded successfully:", response.data);

            // Reset or mark workout as finished
            setWorkoutState({ ...workoutState, ongoing: false });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("An unknown error occurred.");
            }
        }
    };

    return uploadWorkout;
};

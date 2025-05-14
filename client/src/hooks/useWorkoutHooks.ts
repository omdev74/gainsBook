// useWorkoutHooks.ts
import { useWorkout } from '@/contexts/WorkoutContext';
import { ExerciseSet, WorkoutSet } from '@shared/types/frontend';
import { useContext } from 'react';


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
        setWorkoutState((prevState) => ({
            ...prevState,
            workout: {
                ...prevState.workout,
                notes: newNotes,
            },
        }));
    };

    return updateNotes;
};
export const useRemoveWorkoutItem = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const removeWorkoutItem = (itemId: string) => {
        setWorkoutState((prevState) => ({
            ...prevState,
            workout: {
                ...prevState.workout,
                items: prevState.workout.items.filter((item) => item._id !== itemId),
            },
        }));
    };

    return removeWorkoutItem;
};

export const useAddWorkoutItem = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const addWorkoutItem = (newItem: any) => {
        setWorkoutState((prevState) => ({
            ...prevState,
            workout: {
                ...prevState.workout,
                items: [...prevState.workout.items, newItem],
            },
        }));
    };

    return addWorkoutItem;
};

// export const useUpdateExercise = () => {
//     const { workoutState, setWorkoutState } = useWorkout();

//     const updateExercise = (itemId: string, updatedExerciseData: any) => {
//         setWorkoutState((prevState) => {
//             const updatedItems = prevState.workout.items.map((item) =>
//                 item._id === itemId
//                     ? {
//                         ...item,
//                         itemData: {
//                             ...item.itemData,
//                             exercisesAndTheirSets: item.itemData.exercisesAndTheirSets.map(
//                                 (exercise: ExerciseSet) =>
//                                     exercise.exerciseRef._id === updatedExerciseData.exerciseRef._id
//                                         ? { ...exercise, ...updatedExerciseData }
//                                         : exercise
//                             ),
//                         },
//                     }
//                     : item
//             );

//             return {
//                 ...prevState,
//                 workout: {
//                     ...prevState.workout,
//                     items: updatedItems,
//                 },
//             };
//         });
//     };

//     return updateExercise;
// };


export const useUpdateExerciseField = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const updateExerciseField = (
        itemId: string,
        exerciseRefId: string,
        setIndex: number,
        field: keyof WorkoutSet,
        newValue: any
    ) => {
        setWorkoutState((prevState) => {
            const updatedItems = prevState.workout.items.map((item) => {
                if (item._id !== itemId || !item.itemData) return item;

                const updatedExercises = item.itemData.exercisesAndTheirSets.map((exercise) => {
                    if (exercise.exerciseRef._id !== exerciseRefId) return exercise;

                    const updatedSets = exercise.sets.map((set, i) => {
                        if (i !== setIndex) return set;
                        return { ...set, [field]: newValue };
                    });

                    return { ...exercise, sets: updatedSets };
                });

                return {
                    ...item,
                    itemData: {
                        ...item.itemData,
                        exercisesAndTheirSets: updatedExercises,
                    },
                };
            });

            return {
                ...prevState,
                workout: {
                    ...prevState.workout,
                    items: updatedItems,
                },
            };
        });
    };

    return updateExerciseField;
};



export const useAddEmptyNormalSet = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const addEmptyNormalSet = (itemId: string, exerciseRefIds: string[]) => {
        console.log("addEmptyNormalSet", itemId, exerciseRefIds);
        setWorkoutState((prevState) => {
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
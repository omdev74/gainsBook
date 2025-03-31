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

export const useUpdateExercise = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const updateExercise = (itemId: string, updatedExerciseData: any) => {
        setWorkoutState((prevState) => {
            const updatedItems = prevState.workout.items.map((item) =>
                item._id === itemId
                    ? {
                        ...item,
                        itemData: {
                            ...item.itemData,
                            exercisesAndTheirSets: item.itemData.exercisesAndTheirSets.map(
                                (exercise: ExerciseSet) =>
                                    exercise.exerciseRef._id === updatedExerciseData.exerciseRef._id
                                        ? { ...exercise, ...updatedExerciseData }
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

    return updateExercise;
};


export const useAddEmptyNormalSet = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    const addEmptyNormalSet = (itemId: string, exerciseRefId: string) => {
        setWorkoutState((prevState) => {
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
                                                        setType: "Normal",
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
    };

    return addEmptyNormalSet;
};
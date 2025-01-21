import CustomExerciseModel from "../models/CustomExercise";
import DefaultExerciseModel from "../models/DefaultExercise";
import WorkoutModel from "../models/Workout";

import { Request, Response, NextFunction } from 'express';

const createSampleWorkout = async (req: Request, res: Response): Promise<any> => {
    try {
        // Fetch exercise references dynamically
        const defaultExercise1 = await DefaultExerciseModel.findOne({ name: "Push-Up" });
        const defaultExercise2 = await DefaultExerciseModel.findOne({ name: "Squat" });

        if (!defaultExercise1 || !defaultExercise2) {
            return res.status(404).json({ message: "Default exercises not found." });
        }

        const user = req.user as any;
        if (!user || !user.id) {
            return res.status(401).json({ message: "Unauthorized: User not found in request." });
        }
        // Example of a custom exercise (assuming you have a separate CustomExerciseModel)
        const customExercise1 = await DefaultExerciseModel.findOne({ name: "Lunges" });


        const workout = new WorkoutModel({
            userId: user.id, // Reference to user
            date: new Date(),
            notes: 'Upper body workout focusing on chest and triceps.',
            items: [
                {
                    itemType: 'Regular',
                    itemData: {
                        exercisesAndThereSets: [
                            {
                                exerciseRef: defaultExercise1._id, // Push-Up exercise reference
                                exerciseType: 'DefaultExercise',
                                sets: [
                                    {
                                        index: 1,
                                        setType: 'Normal',
                                        reps: 12,
                                        weight: 0,
                                        volume: 0, // Volume can be calculated dynamically
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    itemType: 'Superset',
                    itemData: {
                        exercisesAndThereSets: [
                            {
                                exerciseRef: defaultExercise2._id, // Squat exercise reference
                                exerciseType: 'DefaultExercise',
                                sets: [
                                    {
                                        index: 1,
                                        setType: 'Normal',
                                        reps: 10,
                                        weight: 50,
                                        volume: 500, // Example (reps * weight)
                                    },
                                ],
                            },
                            {
                                exerciseRef: customExercise1?._id || null, // Custom exercise (handle null safely)
                                exerciseType: 'CustomExercise',
                                sets: [
                                    {
                                        index: 1,
                                        setType: 'Normal',
                                        reps: 10,
                                        weight: 50,
                                        volume: 500, // Example (reps * weight)
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
            TotalVolume: 500,
            TotalSets: 500,
            TotalExercises: 500,
        });

        // Save Workout
        await workout.save();
        console.log('Workout created successfully');

        res.json({
            message: "Workout created successfully",
            workout: workout,
        });
    } catch (error) {
        console.error("Error creating workout:", error);
        res.status(500).json({ message: "Error creating workout" });
    }
};


const getWorkoutsByUserId = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = req.user as any; // Cast user to any if you're unsure of the type, otherwise define the correct type.

        if (!user || !user.id) {
            return res.status(401).json({ message: "Unauthorized: User not found in request." });
        }

        // Fetch workouts for the user
        const workouts = await WorkoutModel.find({ userId: user.id }).populate({
            path: 'items.itemData.exercisesAndThereSets.exerciseRef',
            select: 'name', // Specify fields to retrieve from the User model
        });

        for (const workout of workouts) {
            for (const item of workout.items) {
                if (item.itemData && item.itemData.exercisesAndThereSets) {
                    for (const exercise of item.itemData.exercisesAndThereSets) {
                        if (exercise.exerciseRef) {
                            if (exercise.exerciseType === "DefaultExercise") {
                                exercise.exerciseRef = await DefaultExerciseModel.findById(exercise.exerciseRef).select('name');
                            }
                            else {
                                exercise.exerciseRef = await CustomExerciseModel.findById(exercise.exerciseRef).select('name');
                            }

                        }
                    }
                }
            }
        }

        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ message: "No workouts found for this user." });
        }

        res.json({
            message: "Fetched workouts",
            workouts: workouts, // Send the fetched workouts in the response
        });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Error fetching workouts" });
    }
};


export { createSampleWorkout, getWorkoutsByUserId };

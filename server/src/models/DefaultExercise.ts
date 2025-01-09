// backend/models/Exercise.ts
import mongoose, { Schema } from 'mongoose';
import { Exercise } from '@shared/types/workout'; // Import shared types

export const DefaultExerciseSchema = new Schema<Exercise>({
    name: { type: String, required: true },
    difficulty: { type: String, required: true },  // Difficulty level of the exercise
    equipment: { type: String, required: true },   // Equipment used for the exercise
    instructions: { type: String, required: true }, // Instructions for the exercise
    muscle: { type: String, required: true },      // Target muscle group
    type: { type: String, required: true },        // Type of exercise ('strength', 'cardio', etc.)
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt


const DefaultExerciseModel = mongoose.model('Exercise', DefaultExerciseSchema);

export default DefaultExerciseModel;


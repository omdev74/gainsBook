
import mongoose, { Schema, Types } from 'mongoose';

export const CustomExerciseSchema = new Schema(
    {
        name: { type: String, required: true },
        equipment: { type: String, required: true }, // Equipment used for the exercise
        muscle: { type: String, required: true },    // Target muscle group
        type: { type: String, required: true },      // Type of exercise
        userId: { type: String, ref: 'User', required: true }, // Reference to the User who created it
    },
    { timestamps: true }
);

const CustomExerciseModel = mongoose.model('CustomExercise', CustomExerciseSchema);
export default CustomExerciseModel;

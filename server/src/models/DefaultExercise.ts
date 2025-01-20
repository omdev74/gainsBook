import mongoose from "mongoose";

// Define the schema for the exercise data
const ExerciseSchema = new mongoose.Schema(
    {
        uuid: { type: String, required: true, unique: true }, // Exercise unique ID
        name: { type: String, required: true }, // Name of the exercise
        category: {
            id: { type: Number, required: true },  // Category id
            name: { type: String, required: true },  // Category name
        },
        equipment: [
            {
                id: { type: Number, required: true }, // Equipment ID
                name: { type: String, required: true }, // Equipment name
            },
        ],
        muscles: [
            {
                id: { type: Number, required: true }, // Muscle ID
                name: { type: String, required: true }, // Primary muscle group
            },
        ],
        secondaryMuscles: [
            {
                id: { type: Number, required: true }, // Secondary muscle ID
                name: { type: String, required: true }, // Secondary muscle group
            },
        ],
        description: { type: String, required: true }, // Description of the exercise
        images: [
            {
                id: { type: Number, required: true }, // Image ID
                image: { type: String, required: true }, // Image URL
                isMain: { type: Boolean, required: true }, // Flag if it's the main image
            },
        ],
        videos: [
            {
                id: { type: Number, required: true }, // Video ID
                video: { type: String, required: true }, // Video URL
                isMain: { type: Boolean, required: true }, // Flag if it's the main video
            },
        ],
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the model
const DefaultExerciseModel = mongoose.model('DefaultExercise', ExerciseSchema);

export default DefaultExerciseModel;

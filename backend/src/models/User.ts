import mongoose, { Schema } from 'mongoose';

// Define User Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    customExercises: [{ type: Schema.Types.ObjectId, ref: "CustomExercise", default: [] }], // Default empty array
    role: { type: String, enum: ['trainer', 'client', 'user'], required: true },
    trainerId: { type: Schema.Types.ObjectId, ref: 'User', required: false },  // Reference to trainer (only for clients)
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout", default: [] }], // Default empty array
}, { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Create User Model
const User = mongoose.model('User', UserSchema);

export default User;

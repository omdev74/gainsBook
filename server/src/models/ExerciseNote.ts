import mongoose, { Schema, Types } from 'mongoose';

const ExerciseNote = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true }, // References the User collection
    exerciseId: { type: Types.ObjectId, required: true, refPath: 'exerciseType' }, // Dynamic reference
    exerciseType: {
      type: String,
      required: true,
      enum: ['DefaultExercise', 'CustomExercise'], // Specifies the possible models
    }, // Field to determine the type of exercise
    content: { type: String, required: true }, // The note's text content
  },
  { timestamps: true }
);

const NoteModel = mongoose.model('Note', ExerciseNote);
export default NoteModel;

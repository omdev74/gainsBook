import mongoose, { Schema, model } from 'mongoose';
import { ItemDataSchema } from './ItemData';


export const WorkoutSchema = new Schema(
  {
    Title: { type: String, default: `${Date.now()} workout` },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    items: [
      {
        itemType: {
          type: String,
          required: true,
          enum: ['Regular', 'Superset'],
        },
        itemData: ItemDataSchema,
        ExerciseNote: { type: Schema.Types.ObjectId, ref: "ExerciseNote", required: false, default: null, },


      },
    ],
    TotalVolume: { type: Number, required: true },
    TotalSets: { type: Number, required: true },
    TotalExercises: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create Mongoose Model
const Workout = model('Workout', WorkoutSchema);

export default Workout;

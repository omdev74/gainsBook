import mongoose, { Schema } from 'mongoose';
import { WorkoutSet } from "@shared/types/workout";
import { number } from 'zod';

// DropSchema for Myorep and Drop sets
const DropSchema = new Schema({
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
});

// SetSchema for individual sets in exercises or supersets
const SetSchema = new Schema<WorkoutSet>({
    index: { type: Number },
    setType: {
        type: String,
        enum: ["Normal", "Warmup", "Drop", "Myorep"],
        required: true,
    },
    reps: { type: Number },
    weight: { type: Number },
    volume: { type: Number },
    prevSetRef: { type: Schema.Types.ObjectId },
    drops: [DropSchema], // Only applicable to Drop and Myorep sets

});


export { SetSchema };

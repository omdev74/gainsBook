import { model, Schema } from "mongoose";
import { SetSchema } from "./Set";

// Superset schema to store supersets of exercises
const SupersetsSchema = new Schema({
    exercisesAndThereSets: [
        {

            exerciseRef: { type: Schema.Types.ObjectId, refPath: 'exerciseType', required: true },
            exerciseType: {
                type: String,
                enum: ['CustomExercise', 'DefaultExercise'],
                required: true,
            },
            sets: [SetSchema],
        },
    ],
});
export { SupersetsSchema };


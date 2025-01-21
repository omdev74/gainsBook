import { z } from 'zod';


// Define the Zod schema for individual sets
const SetSchema = z.object({
  setType: z.enum(["Normal", "Warmup", "Drop", "Myorep"]), // Ensuring valid set types
  reps: z.number().optional(),
  weight: z.number().optional(),
  volume: z.number().optional(),
  prevSetRef: z.string().optional(),
});

// Zod schema for exercises
const ExerciseSchema = z.object({
  name: z.string().min(1), // Exercise name should not be empty
  sets: z.array(SetSchema), // Sets array must follow the set schema
});

// Zod schema for the workout
const WorkoutSchema = z.object({
  items: z.array(
    z.object({
      exercises: z.array(ExerciseSchema),
    })
  ),
});

// Example of validating incoming request data
const validateWorkout = (data: any) => WorkoutSchema.safeParse(data);

export default validateWorkout; 
// Base Interfaces for Sets


interface BaseSet {
  index: number;
  setType: "Normal" | "Warmup" | "Drop" | "Myorep"; // Type of set
  volume?: number; // Pre-calculated volume (reps x weight, optional for client)
  prevSetRef?: string; // Reference to the previous set in the same index
}

interface RepetitiveSet extends BaseSet {
  reps: number; // Number of repetitions
  weight: number; // Weight used
}

interface DroppableSet extends BaseSet {
  drops: Array<{
    reps: number;
    weight: number;
  }>; // Drop sets with multiple drops
}

// Specific Set Types
export interface NormalSet extends RepetitiveSet {
  setType: "Normal";
}

export interface WarmupSet extends RepetitiveSet {
  setType: "Warmup";
}

export interface DropSet extends DroppableSet {
  setType: "Drop";
}

export interface MyorepSet extends DroppableSet {
  setType: "Myorep";
}

// Union Type for Workout Sets
export type WorkoutSet = NormalSet | WarmupSet | DropSet | MyorepSet;

// Exercise and Superset Structures
export interface Exercise {
  id: string; // Unique identifier for the exercise
  name: string; // Name of the exercise

  // Fields added to Exercise
  difficulty: string;  // Exercise difficulty (e.g. 'beginner', 'intermediate', 'advanced')
  equipment: string;   // Equipment used (e.g. 'barbell', 'dumbbells')
  instructions: string; // Instructions on how to perform the exercise
  muscle: string;      // The target muscle (e.g. 'chest', 'legs', 'abs')
  type: string;
}

export interface CustomExercise {
  name: string; // Name of the exercise
  equipment: string; // Equipment used for the exercise
  muscle: string; // Target muscle group
  type: string; // Type of exercise
  userId: string
}
export interface Superset {
  id: string; // Unique identifier for the superset
  name: string; // Name of the superset
  exercises: Exercise[]; // Array of exercises in this superset
}

// Union Type for Workout Items
export type WorkoutItem = Exercise | Superset;

// Metadata for Tracking Workouts
export interface WorkoutMetadata {
  id: string; // Unique identifier for the workout
  date: string; // Date of the workout
  notes?: string; // Optional notes for the workout
}


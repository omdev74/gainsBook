// In packages/shared/types/workout.ts

// Base Interfaces for Sets
interface BaseSet {
  setType: "Normal" | "Warmup" | "Drop" | "Myorep";
}

interface RepetitiveSet extends BaseSet {
  reps: number;
  weight: number;
}

interface DroppableSet extends BaseSet {
  drops: Array<{
    reps: number;
    weight: number;
  }>;
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
  id: string;
  name: string;
  sets: WorkoutSet[]; // An Exercise contains multiple sets
}

export interface Superset {
  id: string;
  name: string;
  exercises: Exercise[]; // A Superset contains multiple exercises
}

// Union Type for Workout Items
export type WorkoutItem = Exercise | Superset;

// Example Export for Other Modules
export const a = "Value";

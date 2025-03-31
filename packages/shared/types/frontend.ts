// Base Interfaces for Sets

interface BaseSet {
  index: number;
  setType: "Normal" | "Warmup" | "Drop" | "Myorep";
  volume?: number;
  prevSetRef?: string;
}

interface RepetitiveSet extends BaseSet {
  reps: number;
  weight: number;
}

interface DroppableSet extends BaseSet {
  drops: Array<{ reps: number; weight: number }>;
}

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

export type WorkoutSet = NormalSet | WarmupSet | DropSet | MyorepSet;

export interface ExerciseRef {
  _id: string;
  name: string;
}

export interface ExerciseSet {
  exerciseRef: ExerciseRef;
  exerciseType: "CustomExercise" | "DefaultExercise";
  sets: WorkoutSet[];
}

export interface RegularSets {
  exercisesAndTheirSets: ExerciseSet[];
}

export interface Exercise {
  id: string;
  name: string;
  difficulty: string;
  equipment: { id: number; name: string }[];
  instructions: string;
  muscle: { id: number; name: string }[];
  secondaryMuscles: { id: number; name: string }[];
  type: string;
  description: string;
  images: { id: number; image: string; isMain: boolean }[];
  videos: { id: number; video: string; isMain: boolean }[];
}

export interface CustomExercise {
  _id?: string;
  name: string;
  equipment: string;
  muscle: string;
  type: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Superset {
  exercisesAndTheirSets: ExerciseSet[];
}
export type WorkoutItem = {
  itemType: "Regular" | "Superset";
  _id: string;
  itemData: RegularSets | Superset;
  ExerciseNote?: string | null;
  [key: string]: unknown;
};

export interface Workout extends Record<string, unknown> {
  Title: string;
  userId: any;
  date: string;
  notes?: string;
  items: WorkoutItem[];
  TotalVolume: number;
  TotalSets: number;
  TotalExercises: number;
  createdAt: string;
  updatedAt: string;
  
}

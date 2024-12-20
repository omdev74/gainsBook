// In packages/shared/types/workout.ts
export interface NormalSet {
  reps: number;
  weight: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  previous: NormalSet[];
  sets: NormalSet[];
}

export interface Superset {
  id: string;
  name: string;
  exercises: Exercise[];
}

export type WorkoutItem = Exercise | Superset;



export const a = "Value";

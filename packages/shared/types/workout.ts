// In packages/shared/types/workout.ts
export interface NormalSet {
  reps: number;
  weight: number;
  completed: boolean;
  setType: "Normal"
}

export interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export interface Superset {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface DropSet {
  drops: [{
    reps: number;
    weight: number;
  }],
  completed: boolean;
  setType: "Drop"

}
export interface MyorepSet {
  drops: [{
    reps: number;
    weight: number;
  }],
  completed: boolean;
  setType: "Myorep"
}
export type WorkoutItem = Exercise | Superset;
export type WorkoutSet = NormalSet | DropSet | MyorepSet;




export const a = "Value";

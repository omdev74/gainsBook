"use client";
import { useWorkout } from "@/contexts/WorkoutContext";
import { Button } from "../ui/button";
import { Check, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ExercisesCustom from "./ExercisesCustom";
import WorkoutState from "./WorkoutState";
import EC_normal from "../ExerciseCard_normal";
import EC_superset from "../ExerciseCard_superset";

export default function WorkoutTrackershadcn() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { workoutState, setWorkoutState } = useWorkout();
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const { toast } = useToast();

  const handleCancelWorkout = () => {
    setWorkoutState({ ...workoutState, ongoing: false });
    toast({
      variant: "destructive",
      description: "Workout Cancelled",
    });
  };

  const handleAddExercise = () => {
    setIsAddingExercise(true);
  };

  const addExercisestoWorkout = (exercises: any) => {


    console.log("trying to add exercises to the workout", exercises);
  };

  // call back function in the ExercisesCustom
  const handleSelectedExercises = (exercises: any) => {
    addExercisestoWorkout(exercises); // Save selected exercises
    setIsAddingExercise(false); // Hide the selection component
  };

  return (
    <div className="relative">
      {/* Show Exercise Selection at the Top */}
      {isAddingExercise && (
        <div className="absolute top-0 left-0 w-full z-30 overflow-hidden h-[calc(100vh-4rem]" >
          <ExercisesCustom onSelectExercises={handleSelectedExercises} />
        </div>
      )}

      {/* Main Workout Tracker UI */}
      <div
        className={`fixed left-0 right-0 bg-background shadow-lg transition-all duration-500 ease-in-out z-20 ${isExpanded ? "sm:bottom-0 sm:h-[calc(100%-4rem)] bottom-16 h-[calc(100%-4rem)]" : "sm:bottom-0 bottom-16"
          }`}
        aria-expanded={isExpanded}
        role="region"
      >
        <div className="flex items-center justify-between p-3 sm:p-6 border-t">
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Morning Cardio</h2>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">00:45:30</span>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <Button
              variant="secondary"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              size="icon"
              onClick={handleCancelWorkout}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="hover:text-white hover:bg-green-600 text-green-600 transition-colors"
              onClick={() => console.log("Workout completed")}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse drawer" : "Expand drawer"}
            >
              {isExpanded ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
            </Button>
          </div>
        </div>


        <div className={`overflow-auto p-2.5 ${isExpanded ? "opacity-100 h-[calc(100%-5rem)]" : "opacity-0 h-0"} flex flex-col items-center space-y-6`}>
          {/* Workout content */}

          {workoutState.workout.items.map((item, index) => (
            item.itemType === "Regular" ? <EC_normal key={index} item={item} /> : null
          ))}

          {/* Buttons */}
          <div className="flex justify-between flex-col gap-2 w-full sm:w-1/3">
            <Button variant="ghost" className="transition-colors" onClick={handleAddExercise}>
              <Plus className="h-4 w-4" />
              <span>Add exercises</span>
            </Button>
            <Button variant="ghost" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors" onClick={handleCancelWorkout}>
              <X className="h-4 w-4" />
              <span>Cancel workout</span>
            </Button>
            <Button variant="ghost" className="text-green-600 hover:bg-green-600 hover:text-white transition-colors" onClick={() => console.log("Workout completed")}>
              <Check className="h-4 w-4" />
              <span>Complete workout</span>
            </Button>
          </div>
          <WorkoutState />
        </div>
      </div>
    </div>
  );
}

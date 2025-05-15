"use client";
import { useWorkout } from "@/contexts/OngoingWorkoutContext";
import { Button } from "../ui/button";
import { Check, ChevronDown, ChevronUp, Pencil, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ExercisesCustom from "./ExercisesCustom";
import WorkoutState from "./WorkoutState";
import EC_normal from "../ExerciseCard_normal";
import EC_superset from "../ExerciseCard_superset";
import { useAddWorkoutItem, useDrawerToggle, useUploadWorkout } from '@/hooks/useWorkoutHooks';
import { useLocation } from "react-router";
import { useObjectId } from "@/hooks/useObjectId";
import WorkoutTimer from "../WorkoutTimer";



export default function WorkoutTrackershadcn() {
  const getNewId = useObjectId();
  const addWorkoutItem = useAddWorkoutItem();
  const uploadWorkout = useUploadWorkout();


  const { isExpanded, toggle, collapse, expand } = useDrawerToggle();
  const { workoutState, setWorkoutState ,clearWorkout} = useWorkout();
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const { toast } = useToast();

  const location = useLocation();
  if (!workoutState.workout) return null;
  useEffect(() => {
    collapse();
  }, [location.pathname, workoutState.ongoing]);

  const handleCancelWorkout = () => {

    clearWorkout();
    toast({
      variant: "destructive",
      description: "Workout Cancelled",
    });
  };

  const handleCompleteWorkout = () => {
    try {
      uploadWorkout();
    } catch (error) {
      console.error("Error uploading workout:", error);
    } finally {
      setWorkoutState({ ...workoutState, ongoing: false });
      toast({
        variant: "success",
        description: "Workout Completed",
      });
    }
  };

  const handleAddExercise = () => {
    setIsAddingExercise(true);
  };

  const addExercisestoWorkoutAsIndividual = (exercises: any) => {
    if (!workoutState.workout) return;
    console.log("trying to add exercises to the workout as individual", exercises);

    // Ensure you capture the current length of items before starting
    const currentLength = workoutState.workout.items.length;

    const items = exercises.map((exercise: any, index: number) => ({
      itemType: 'Regular',
      itemData: {
        exercisesAndTheirSets: [
          {
            exerciseRef: { _id: exercise._id, name: exercise.name },
            exerciseType: exercise.exerciseType,
            sets: [
              {
                index: 1,
                setType: 'Normal',
                reps: 12,
                weight: 0,
                volume: 0, // Volume can be calculated dynamically
              },
            ],
          },
        ],
      },
      ExerciseNote: "Temporary Note",
      _id: getNewId, // Ensure each exercise gets a unique ID
    }));

    console.log(items);
    for (const item of items) {
      addWorkoutItem(item);
    }
  };
  const addExercisestoWorkoutAsSuperset = (exercises: any[]) => {
    console.log("trying to add exercises to the workout as superset", exercises);

    const exercisesAndTheirSets = exercises.map((exercise: any) => ({
      exerciseRef: {
        _id: exercise._id,
        name: exercise.name,
      },
      exerciseType: exercise.exerciseType,
      sets: [
        {
          index: 1,
          setType: "Normal",
          reps: 12,
          weight: 0,
          volume: 0,
        },
      ],
    }));

    const item = {
      itemType: "Superset",
      itemData: {
        exercisesAndTheirSets,
      },
      ExerciseNote: "Temporary Note",
      _id: getNewId,
    };

    console.log(item);
    addWorkoutItem(item);
  };

  // call back function in the ExercisesCustom
  const handleSelectedExercises = (exercises: any, asSuperset: boolean) => {
    asSuperset ? addExercisestoWorkoutAsSuperset(exercises) : addExercisestoWorkoutAsIndividual(exercises);
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
          <div className="flex flex-col items-center w-full">
            {/* <h2 className="text-sm font-medium text-muted-foreground mb-1">{workoutState.workout.Title}</h2> */}
            <input
              type="text"
              value={workoutState.workout.Title}
              onChange={(e) =>
                setWorkoutState((prev) => {
                  if (!prev.workout) return prev; // Do nothing if workout is null
                  return {
                    ...prev,
                    workout: {
                      ...prev.workout,
                      Title: e.target.value,
                    },
                  }
                })
              }
              onBlur={() => {
                if (!workoutState.workout) return;
                if (!workoutState.workout.Title.trim()) {
                  setWorkoutState((prev) => {
                    if (!prev.workout) return prev; // Do nothing if workout is null
                    return {
                      ...prev,
                      workout: {
                        ...prev.workout,
                        Title: `Test Workout ${prev.workout.date}`,
                      },
                    }
                  });
                }
              }}
              className="text-sm font-medium text-muted-foreground mb-1 bg-transparent focus:outline-none text-center w-full overflow-scroll"
              placeholder={`Test Workout ${workoutState.workout.date}`}
            />
            <Pencil
              className="h-3 w-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"

            />
            <div className="flex items-center space-x-2">
              <WorkoutTimer startDate={workoutState.workout.date} />
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
              onClick={toggle}
              aria-label={isExpanded ? "Collapse drawer" : "Expand drawer"}
            >
              {isExpanded ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
            </Button>
          </div>
        </div>


        <div className={`overflow-auto p-2.5 ${isExpanded ? "opacity-100 h-[calc(100%-5rem)]" : "opacity-0 h-0"} flex flex-col items-center space-y-6`}>
          {/* Workout content */}

          {workoutState.workout.items.map((item, index) => (
            item.itemType === "Regular" ? <EC_normal key={index} item={item} /> : <EC_superset key={index} item={item} />
          ))}

          {/* Buttons */}
          <div className="flex justify-between flex-col gap-2 w-full sm:w-1/3">
            <Button variant="secondary" className="transition-colors" onClick={handleAddExercise}>
              <Plus className="h-4 w-4" />
              <span>Add exercises</span>
            </Button>
            <Button variant="secondary" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors" onClick={handleCancelWorkout}>
              <X className="h-4 w-4" />
              <span>Cancel workout</span>
            </Button>
            <Button variant="secondary" className="text-green-600 hover:bg-green-600 hover:text-white transition-colors" onClick={handleCompleteWorkout}>
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

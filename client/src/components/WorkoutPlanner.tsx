"use client"
import { WorkoutItem, NormalSet } from "@shared/types/workout"
import { useState, useEffect } from "react"
import React from "react"

// Importing UI components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

// console.log(NormalSet);
// Custom TypeScript types to structure workout data


// Initial workout data to populate the planner
const initialWorkout: WorkoutItem[] = [
  {
    id: "ex1",
    name: "Bench Press",
    sets: [
      { reps: 10, weight: 135 },
      { reps: 8, weight: 145 },
      { reps: 6, weight: 155 },
    ],
  },
  {
    id: "ss1",
    name: "Pull & Push Superset",
    exercises: [
      {
        id: "ex2",
        name: "Pull-ups",
        sets: [
          { reps: 8, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 4, weight: 0 },
        ],
      },
      {
        id: "ex3",
        name: "Dips",
        sets: [
          { reps: 12, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 8, weight: 0 },
        ],
      },
    ],
  },
  {
    id: "ex4",
    name: "Squats",
    sets: [
      { reps: 8, weight: 185 },
      { reps: 8, weight: 185 },
      { reps: 8, weight: 185 },
      { reps: 8, weight: 185 },
    ],
  },
]

export default function WorkoutPlanner() {
  // State to manage the workout data
  const [workout, setWorkout] = useState<WorkoutItem[]>(initialWorkout)

  // State to ensure the component is mounted (to avoid hydration issues)
  const [mounted, setMounted] = useState(false)

  // Set the `mounted` state to true once the component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to update a specific set in the workout data
  const updateExercise = (
    exerciseId: string, // ID of the exercise to update
    setIndex: number,   // Index of the set to update
    field: keyof NormalSet,   // Field to update (reps or weight)
    value: number,      // New value
    supersetId?: string // ID of the superset, if applicable
  ) => {
    setWorkout((prev) =>
      // Iterate through each item in the workout
      prev.map((item) => {
        // Check if the item is a Superset and matches the supersetId
        if (supersetId && "exercises" in item && item.id === supersetId) {
          return {
            ...item,
            exercises: item.exercises.map((ex) =>
              // Check if the current exercise matches the exerciseId
              ex.id === exerciseId
                ? {
                  ...ex,
                  sets: ex.sets.map((set, idx) =>
                    // Update the specific set by index
                    idx === setIndex ? { ...set, [field]: value } : set
                  ),
                }
                : ex // Keep the other exercises unchanged
            ),
          }
        }
        // Check if the item is a standalone Exercise and matches the exerciseId
        else if (!supersetId && "sets" in item && item.id === exerciseId) {
          return {
            ...item,
            sets: item.sets.map((set, idx) =>
              // Update the specific set by index
              idx === setIndex ? { ...set, [field]: value } : set
            ),
          }
        }
        return item // Return the item unchanged if no match
      })
    )
  }

  // Prevent rendering until the component is mounted
  if (!mounted) return null

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Workout Planner</h1>
      </div>

      {/* Workout Table */}
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Exercise</TableHead>
            <TableHead className="w-[100px]">Set</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight (lbs)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Map through each workout item */}
          {workout.map((item) => (
            <>
              {"exercises" in item ? (
                <>
                  {/* Row for the Superset name */}
                  <TableRow key={item.id}>
                    <TableCell colSpan={4} className="font-bold bg-muted">
                      {item.name}
                    </TableCell>
                  </TableRow>
                  {/* Map through sets of the first exercise in the superset */}
                  {item.exercises[0].sets.map((_, setIndex) => (
                    <React.Fragment key={`${item.id}-set-${setIndex}`}>
                      {/* Map through each exercise in the superset */}
                      {item.exercises.map((exercise, exerciseIndex) => (
                        <TableRow key={`${exercise.id}-set-${setIndex}`}>
                          {/* Display the exercise name */}
                          <TableCell className={exerciseIndex === 1 ? "pl-8" : ""}>
                            {exercise.name}
                          </TableCell>
                          {/* Display the set number only for the first exercise */}
                          {exerciseIndex === 0 && (
                            <TableCell rowSpan={2}>{`Set ${setIndex + 1}`}</TableCell>
                          )}
                          {/* Input for reps */}
                          <TableCell>
                            <Input
                              type="number"
                              value={exercise.sets[setIndex].reps}
                              onChange={(e) =>
                                updateExercise(
                                  exercise.id,
                                  setIndex,
                                  "reps",
                                  parseInt(e.target.value),
                                  item.id
                                )
                              }
                              className="w-16"
                            />
                          </TableCell>
                          {/* Input for weight */}
                          <TableCell>
                            <Input
                              type="number"
                              value={exercise.sets[setIndex].weight}
                              onChange={(e) =>
                                updateExercise(
                                  exercise.id,
                                  setIndex,
                                  "weight",
                                  parseInt(e.target.value),
                                  item.id
                                )
                              }
                              className="w-16"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                // Render for standalone Exercises
                item.sets.map((set, setIndex) => (
                  <TableRow key={`${item.id}-set-${setIndex}`}>
                    {/* Display the exercise name only for the first set */}
                    {setIndex === 0 && (
                      <TableCell rowSpan={item.sets.length}>{item.name}</TableCell>
                    )}
                    {/* Display the set number */}
                    <TableCell>{`Set ${setIndex + 1}`}</TableCell>
                    {/* Input for reps */}
                    <TableCell>
                      <Input
                        type="number"
                        value={set.reps}
                        onChange={(e) =>
                          updateExercise(
                            item.id,
                            setIndex,
                            "reps",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16"
                      />
                    </TableCell>
                    {/* Input for weight */}
                    <TableCell>
                      <Input
                        type="number"
                        value={set.weight}
                        onChange={(e) =>
                          updateExercise(
                            item.id,
                            setIndex,
                            "weight",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

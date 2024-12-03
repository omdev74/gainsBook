"use client"

import { useState, useEffect } from "react"
import React from "react"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface Set {
  reps: number
  weight: number
}

interface Exercise {
  id: string
  name: string
  sets: Set[]
}

interface Superset {
  id: string
  name: string
  exercises: Exercise[]
}

interface MyoRep {
  id: string
  name: string
  exercises: Set[]
}
type WorkoutItem = Exercise | Superset
// type WorkoutItem = Exercise | Superset | MyoRep

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
  const [workout, setWorkout] = useState<WorkoutItem[]>(initialWorkout)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateExercise = (
    exerciseId: string,
    setIndex: number,
    field: keyof Set,
    value: number,
    supersetId?: string
  ) => {
    setWorkout((prev) =>
      prev.map((item) => {
        if (supersetId && "exercises" in item && item.id === supersetId) {
          return {
            ...item,
            exercises: item.exercises.map((ex) =>
              ex.id === exerciseId
                ? {
                  ...ex,
                  sets: ex.sets.map((set, idx) =>
                    idx === setIndex ? { ...set, [field]: value } : set
                  ),
                }
                : ex
            ),
          }
        } else if (!supersetId && "sets" in item && item.id === exerciseId) {
          return {
            ...item,
            sets: item.sets.map((set, idx) =>
              idx === setIndex ? { ...set, [field]: value } : set
            ),
          }
        }
        return item
      })
    )
  }

  if (!mounted) return null

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Workout Planner</h1>

      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Exercise</TableHead>
            <TableHead className="w-[100px]">Set</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight (lbs)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workout.map((item) => (
            <>
              {"exercises" in item ? (
                <>
                  <TableRow key={item.id}>
                    <TableCell colSpan={4} className="font-bold bg-muted">
                      {item.name}
                    </TableCell>
                  </TableRow>
                  {item.exercises[0].sets.map((_, setIndex) => (
                    <React.Fragment key={`${item.id}-set-${setIndex}`}>
                      {item.exercises.map((exercise, exerciseIndex) => (
                        <TableRow key={`${exercise.id}-set-${setIndex}`}>
                          <TableCell className={exerciseIndex === 1 ? "pl-8" : ""}>
                            {exercise.name}
                          </TableCell>
                          {exerciseIndex === 0 && (
                            <TableCell rowSpan={2}>{`Set ${setIndex + 1}`}</TableCell>
                          )}
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
                item.sets.map((set, setIndex) => (
                  <TableRow key={`${item.id}-set-${setIndex}`}>
                    {setIndex === 0 && (
                      <TableCell rowSpan={item.sets.length}>{item.name}</TableCell>
                    )}
                    <TableCell>{`Set ${setIndex + 1}`}</TableCell>
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


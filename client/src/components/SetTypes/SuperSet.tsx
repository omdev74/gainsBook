import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, X } from "lucide-react"

// Importing shared types for Exercise and Superset
import { Exercise, Superset as SupersetProps } from "@shared/types/workout"

// Superset Component: Handles the rendering and management of supersets in a workout routine
export default function Superset() {
  // State to manage sets of exercises in the superset
  const [sets, setSets] = useState<SupersetProps[]>([
    {
      id: "set-1",
      name: "Superset 1",
      exercises: [
        {
          id: "ex-1",
          name: "Pull-ups",
          previous: [
            { reps: 8, weight: 0, completed: true },
          ],
          sets: [],
        },
        {
          id: "ex-2",
          name: "Push-ups",
          previous: [
            { reps: 20, weight: 0, completed: true },
          ],
          sets: [],
        },
      ],
    },
  ])

  // Function to add a new set with default values
  const addSet = () => {
    setSets([
      ...sets,
      {
        id: `set-${sets.length + 1}`,
        name: `Superset ${sets.length + 1}`,
        exercises: sets[0].exercises.map((exercise) => ({
          ...exercise,
          id: `ex-${Math.random()}`,
          sets: [],
        })),
      },
    ])
  }

  // Function to update specific fields in an exercise
  const updateExercise = (
    setIndex: number,
    exerciseIndex: number,
    field: keyof Exercise,
    value: any
  ) => {
    const newSets = [...sets]
    newSets[setIndex].exercises[exerciseIndex][field] = value
    setSets(newSets)
  }

  // Function to remove a set based on its index
  const removeSet = (setIndex: number) => {
    const newSets = sets.filter((_, index) => index !== setIndex)
    setSets(newSets)
  }

  return (
    // Card component to structure the Superset UI
    <Card>
      {/* Header section with title and close button */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Superset</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      {/* Main content section displaying the sets and exercises */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Set</TableHead>
              <TableHead>Exercise</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead>Lbs</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sets.map((set, setIndex) => (
              // Loop through each set and its exercises
              <>
                {set.exercises.map((exercise, exerciseIndex) => (
                  <TableRow key={`${setIndex}-${exerciseIndex}`}>
                    {/* Display the set number for the first exercise only */}
                    {exerciseIndex === 0 && (
                      <TableCell
                        rowSpan={set.exercises.length}
                        className="align-middle text-center"
                      >
                        {setIndex + 1}
                      </TableCell>
                    )}

                    {/* Exercise details */}
                    <TableCell>{exercise.name}</TableCell>
                    <TableCell>
                      {/* Displaying previous stats */}
                      {exercise.previous
                        .map((prev) => `${prev.weight} lbs x ${prev.reps}`)
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      {/* Input for weight */}
                      <Input
                        type="number"
                        value={exercise.sets[0]?.weight || ""}
                        onChange={(e) =>
                          updateExercise(
                            setIndex,
                            exerciseIndex,
                            "sets",
                            [{ weight: parseInt(e.target.value), reps: 0, completed: false }]
                          )
                        }
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      {/* Input for reps */}
                      <Input
                        type="number"
                        value={exercise.sets[0]?.reps || ""}
                        onChange={(e) =>
                          updateExercise(
                            setIndex,
                            exerciseIndex,
                            "sets",
                            [{ reps: parseInt(e.target.value), weight: 0, completed: false }]
                          )
                        }
                        className="w-16"
                      />
                    </TableCell>

                    {/* Checkbox for marking completion */}

                    {/* Button to remove the set */}
                    {exerciseIndex === 0 && (

                      <TableCell className="text-right flex items-center space-x-2" rowSpan={set.exercises.length}  >
                        <Checkbox
                          checked={exercise.sets[0]?.completed || false}
                          onCheckedChange={(checked) =>
                            updateExercise(
                              setIndex,
                              exerciseIndex,
                              "sets",
                              [{ reps: 0, weight: 0, completed: checked as boolean }]
                            )
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeSet(setIndex)}

                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}

                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>

        {/* Button to add a new set */}
        <Button
          variant="outline"
          onClick={addSet}
          className="mt-4 bg-green-500 text-white hover:bg-green-600"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Set
        </Button>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"

import * as Types from "@shared/types/workout"
// Importing UI components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



// Initial workout data to populate the planner
const initialWorkout: Types.WorkoutItem[] = [
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


export default function WorkoutPlannerCustom() {
    // State to manage the workout data

    const [workout, setWorkout] = useState<Types.WorkoutItem[]>(initialWorkout)


    // State to ensure the component is mounted (to avoid hydration issues)
    const [mounted, setMounted] = useState(false)

    // Set the `mounted` state to true once the component is mounted
    useEffect(() => {
        setMounted(true)
    }, []);

    // Function to update a specific set in the workout data


    // Prevent rendering until the component is mounted


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
                    {workout.map((item) => {
                        console.log(item); // Log the workout item
                        return (
                            <>
                                {"exercises" in item ? (
                                    null
                                ) : (
                                    // it is a normal set
                                    item.sets.map((set, setIndex) => (
                                        <TableRow key={`${item.id}-set-${setIndex}`}>
                                            {/* Display the exercise name only for the first set */}
                                            {setIndex === 0 && (<TableCell rowSpan={item.sets.length}>{item.name}</TableCell>)}
                                            <TableCell>{`Set ${setIndex + 1}`}</TableCell>

                                        </TableRow>
                                    ))
                                )}
                            </>
                        );
                    })}

                </TableBody>
            </Table>
        </div>
    )
}

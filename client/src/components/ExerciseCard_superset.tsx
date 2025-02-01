import * as React from 'react';

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, X } from 'lucide-react'
import { useWorkout } from '@/contexts/WorkoutContext';
import { Exercise, WorkoutSet } from '@shared/types/workout';
import { Drawer, DrawerTitle, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';



interface ISuperEC_superset {
}

const EC_superset: React.FunctionComponent<ISuperEC_superset> = (props) => {
    const { workoutState, setWorkoutState } = useWorkout(); // 

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    // Handler for when an input in the child changes
    const inputchangeHandler = (index: number, field: string, newValue: any) => {
        // Safely check if 'sets' array exists
        if (!workoutState.workout.items[0].sets) {
            console.error("Sets array is not initialized");
            return;
        }

        const updatedSets = [...workoutState.workout.items[0].sets]; // Make a shallow copy of the sets

        if (updatedSets[index]) {
            // Check if the set at the specified index exists
            updatedSets[index] = {
                ...updatedSets[index],
                [field]: newValue, // Update the specific field in the set
            };
        } else {
            console.error("Set at index " + index + " does not exist");
            return;
        }

        // Update the parent state
        setWorkoutState({
            ...workoutState.workout,
            items: [
                {
                    ...workoutState.workout.items[0],
                    sets: updatedSets,
                },
            ],
        });
    };

    const addNormalSet = () => {
        // Ensure sets array is initialized properly
        if (!workoutState.workout.items[2].exercises) {
            console.error("Sets array is not initialized");
            return;
        }

        const newSet: WorkoutSet = {
            index: workoutState.workout.items[2].sets + 1,
            setType: "Normal", // Default set type
            reps: 0,           // Default value
            weight: 0,         // Default value
           
        };

        // Update the state to add the new set to the item with the name "Bench Press"
        setWorkoutState({
            ...workoutState.workout,
            items: workoutState.workout.items.map((item: any) =>
                item.name === "Bench Press"
                    ? { ...item, sets: [...item.sets, newSet] } // Add the new set to the "Bench Press" item
                    : item // Keep the rest of the items unchanged
            ),
        });
    };

    const addSpecialSet = (shortText: string) => {
        console.log(shortText);

        // Ensure sets array is initialized properly
        if (!workoutState.workout.items[0].sets) {
            console.error("Sets array is not initialized");
            return;
        }

        // Create the appropriate WorkoutSet based on shortText using switch
        let newSet: WorkoutSet | undefined;

        switch (shortText) {
            case "Drop":
            case "Myorep":
                newSet = {
                    index: workoutState.workout.items[0].sets + 1,
                    setType: shortText,   // Set the type directly
                    drops: [{
                        reps: 0,              // Default reps
                        weight: 0
                    }],            // Initialize with an empty drops array
                    
                };
                break;

            case "Warmup":
                newSet = {
                    index: workoutState.workout.items[0].sets + 1,
                    setType: shortText,   // Set the type directly
                    reps: 0,              // Default reps
                    weight: 0,            // Default weight
                    
                };
                break;

            default:
                console.error("Invalid special set type provided:", shortText);
                return;
        }

        // If a valid newSet was created, update the state
        if (newSet) {
            setWorkoutState({
                ...workoutState.workout,
                items: workoutState.workout.items.map((item: any) =>
                    item.name === "Bench Press"  // Specify which item to update
                        ? { ...item, sets: [...item.sets, newSet] }  // Add the new set to the "Bench Press" item
                        : item // Keep the rest of the items unchanged
                ),
            });
            toggleDrawer();
        }
    };

    const options = {
        Drop: { shortText: "Drop", color: "border-transparent text-primary-foreground bg-blue-600" },
        Warmup: { shortText: "Warmup", color: "border-transparent text-primary-foreground bg-yellow-600" },
        Myorep: { shortText: "Myorep", color: "border-transparent text-primary-foreground bg-red-600" },
    };

    useEffect(() => {
        // sanitation of data
        console.log(workoutState.workout.items[2]);
    }, []);
    return (
        <Card className="p-1 md:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                <CardTitle className="text-sm md:text-base font-medium">{workoutState.workout.items[2].name}</CardTitle>
                <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="sm: p-1">
                <Table className="w-full table-auto border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-14 text-xs md:text-sm px-2">Set</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Exercise</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Lbs</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Reps</TableHead>
                            <TableHead className="text-xs md:text-sm text-right px-2">Volume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                        {/* Loop through sets in the first exercise */}
                        {workoutState.workout.items[2].exercises[0].sets.map((set: WorkoutSet, index: number) => (
                            <>
                                {/* Render the first exercise's set */}
                                <TableRow key={`exercise-0-set-${index}`}>
                                    <TableCell
                                        className="relative cursor-pointer text-xs md:text-sm"
                                        rowSpan={workoutState.workout.items[2].exercises.length}
                                    >
                                        <span className="mr-2">{index + 1}</span>
                                    </TableCell>
                                    <TableCell>{workoutState.workout.items[2].exercises[0].name}</TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={workoutState.workout.items[2].exercises[0].sets[index]?.weight || ''}

                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={workoutState.workout.items[2].exercises[0].sets[index]?.reps || ''}

                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {workoutState.workout.items[2].exercises[0].sets[index]?.reps * workoutState.workout.items[2].exercises[0].sets[index]?.weight}
                                    </TableCell>
                                </TableRow>

                                {/* Render the second exercise's set for the same index */}
                                {workoutState.workout.items[2].exercises[1]?.sets[index] && (
                                    <TableRow key={`exercise-1-set-${index}`}>
                                        <TableCell>{workoutState.workout.items[2].exercises[1].name}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={workoutState.workout.items[2].exercises[1].sets[index]?.weight || ''}

                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={workoutState.workout.items[2].exercises[1].sets[index]?.reps || ''}

                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {workoutState.workout.items[2].exercises[1].sets[index]?.reps * workoutState.workout.items[2].exercises[1].sets[index]?.weight}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))}
                    </TableBody>


                </Table>



                {/* drawer for selecting special sets from options */}
                <Drawer open={isDrawerOpen} onClose={toggleDrawer}>

                    <DrawerContent className="sm:p-6 flex flex-col items-center justify-center">
                        <DrawerHeader>
                            <DrawerTitle>Select a Special Set Type</DrawerTitle>
                        </DrawerHeader>
                        <div className="w-full max-w-sm space-y-2">
                            {Object.entries(options).map(([key, option]) => (
                                <Button
                                    key={key}
                                    variant="outline"
                                    className={`w-full justify-start h-14 ${option.color}`}
                                    onClick={() => addSpecialSet(option.shortText)}
                                >
                                    <span className="flex-1 text-left">{option.shortText}</span>
                                </Button>
                            ))}
                        </div>

                        <DrawerFooter>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </CardContent>
            <CardFooter className='p-3 md:p-4 flex-col gap-6 text-xs md:text-sm' >
                <div className="w-full flex justify-evenly ">
                    <Button variant="default" className="text-xs md:text-sm" onClick={addNormalSet}>
                        <Plus className="h-4 w-4 mr-2" /> Add Set
                    </Button>

                </div>
                <div className="w-full flex justify-between text-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Total Volume</span>
                        <span className="font-medium">100 lbs</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Total Weight</span>
                        <span className="font-medium">100 lbs</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Total Reps</span>
                        <span className="font-medium">100 lbs</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default EC_superset;

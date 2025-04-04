import * as React from 'react';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp, EllipsisVertical, Plus, X } from 'lucide-react'
import { useWorkout } from '@/contexts/WorkoutContext';
import { WorkoutItem, WorkoutSet } from '@shared/types/frontend';
import Set from './Sets/Set';
import { Drawer, DrawerTitle, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { useAddWorkoutItem, useAddEmptyNormalSet } from '@/hooks/useWorkoutHooks';




interface IEC_normalProps {
    item: WorkoutItem
}



const EC_normal: React.FunctionComponent<IEC_normalProps> = (props) => {

    const addEmptyNormalSet = useAddEmptyNormalSet();
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    // Handler for when an input in the child changes
    const inputchangeHandler = (index: number, field: string, newValue: any) => {

        console.log(`inputchangeHandler ${index} ${field} ${newValue}`);
    };

    const addSpecialSet = (shortText: string) => {
        // console.log(shortText);

        // // Ensure sets array is initialized properly
        // if (!workoutState.workout.items[0].sets) {
        //     console.error("Sets array is not initialized");
        //     return;
        // }

        // // Create the appropriate WorkoutSet based on shortText using switch
        // let newSet: WorkoutSet | undefined;

        // switch (shortText) {
        //     case "Drop":
        //     case "Myorep":
        //         newSet = {
        //             index: workoutState.workout.items[0].sets + 1,
        //             setType: shortText,   // Set the type directly
        //             drops: [{
        //                 reps: 0,              // Default reps
        //                 weight: 0
        //             }],            // Initialize with an empty drops array

        //         };
        //         break;

        //     case "Warmup":
        //         newSet = {
        //             index: workoutState.workout.items[0].sets + 1,
        //             setType: shortText,   // Set the type directly
        //             reps: 0,              // Default reps
        //             weight: 0,            // Default weight

        //         };
        //         break;

        //     default:
        //         console.error("Invalid special set type provided:", shortText);
        //         return;
        // }

        // // If a valid newSet was created, update the state
        // if (newSet) {
        //     setWorkoutState({
        //         ...workoutState.workout,
        //         items: workoutState.workout.items.map((item: any) =>
        //             item.name === "Bench Press"  // Specify which item to update
        //                 ? { ...item, sets: [...item.sets, newSet] }  // Add the new set to the "Bench Press" item
        //                 : item // Keep the rest of the items unchanged
        //         ),
        //     });
        //     toggleDrawer();
        // }

        console.log(`addSpecialSet ${shortText}`);
    };

    const options = {
        Drop: { shortText: "Drop", color: "border-transparent text-primary-foreground bg-blue-600" },
        Warmup: { shortText: "Warmup", color: "border-transparent text-primary-foreground bg-yellow-600" },
        Myorep: { shortText: "Myorep", color: "border-transparent text-primary-foreground bg-red-600" },
    };
    return (
        <Card className="p-1 md:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                <CardTitle className="text-sm md:text-base font-medium">{props.item.itemData.exercisesAndTheirSets[0].exerciseRef.name}</CardTitle>
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label={isExpanded ? "Collapse drawer" : "Expand drawer"}
                    >
                        {isExpanded ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
                    </Button>
                    <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <EllipsisVertical className="h-4 w-4" />
                    </Button>
                </div>

            </CardHeader>
            <CardContent className="sm: p-1">
                <Table className="w-full table-auto border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-xs md:text-sm px-2">Set</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Previous</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Lbs</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Reps</TableHead>
                            <TableHead className="text-xs md:text-sm text-right px-2">Volume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                        {props.item.itemData.exercisesAndTheirSets[0].sets.map((set: WorkoutSet) => (
                            <Set set={set} index={set.index} inputchangeHandler={inputchangeHandler} key={set.index} />
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
                <div className="w-full flex flex-col justify-between gap-2">
                    <Button variant="secondary" className="text-xs md:text-sm " onClick={() => addEmptyNormalSet(props.item._id, props.item.itemData.exercisesAndTheirSets[0].exerciseRef._id)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Normal Set
                    </Button>

                    <Button variant="secondary" className="text-xs md:text-sm " onClick={toggleDrawer}>
                        <Plus className="h-4 w-4 mr-2" /> Add Special Set
                    </Button>
                </div>
                <div className="w-full flex justify-between text-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Total Volume</span>
                        <span className="text-2xl md:text-xl font-medium">100 lbs</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Total Weight</span>
                        <span className="text-2xl md:text-xl font-medium">100 lbs</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Total Reps</span>
                        <span className="text-2xl md:text-xl font-medium">100 lbs</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default EC_normal;



import * as React from 'react';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, X } from 'lucide-react'
import SetSelector from './ui/SetSelector';
import { useWorkout } from '@/contexts/WorkoutContext';
import { WorkoutSet } from '@shared/types/workout';
import Set from './Sets/Set';

import { Checkbox } from "@/components/ui/checkbox"


interface IEC_normalProps {
}



const EC_normal: React.FunctionComponent<IEC_normalProps> = (props) => {


    const { workout, setWorkout } = useWorkout();


    const updateSet = (index: number, field: string, newValue: {}) => {

    }

    // input value changed
    const valuechangeHandler = (index: number, completed: boolean, value: string | boolean) => {

    }



    const addSet = () => {

        // add this row
        // <TableRow key={index}>
        //     <SetSelector setNumber={index + 1} selectorChange={selectorChange}></SetSelector>
        //     <Set set={set} index={index + 1} valuechangeHandler={updateSet}></Set>
        //     <TableCell className="text-right">
        //         <Checkbox
        //             checked={set.completed}
        //             onCheckedChange={(checked) => valuechangeHandler(index, true, checked as boolean)}
        //         />
        //     </TableCell>
        // </TableRow>

    }

    return (
        <Card className="p-1 md:p-6"> {/* Increased padding for desktop */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                <CardTitle className="text-sm md:text-base font-medium">{workout.items[0].name}</CardTitle> {/* Larger title on desktop */}
                <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="sm: p-1 ">

                <Table className="w-full table-auto border-collapse" >
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-xs md:text-sm px-2">Set</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Previous</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Lbs</TableHead>
                            <TableHead className="text-xs md:text-sm px-2">Reps</TableHead>
                            <TableHead className="text-xs md:text-sm text-right px-2">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workout.items[0].sets.map((set: WorkoutSet, index: number) => (
                            set.setType === "Normal" ? (
                                <TableRow key={index}>
                                    <Set set={set} index={index} valuechangeHandler={updateSet} />
                                </TableRow>
                            ) : set.setType === "Drop" ? (<Set set={set} index={index} valuechangeHandler={updateSet} />) : set.setType === "Myorep" ? (<Set set={set} index={index} valuechangeHandler={updateSet} />) : null // Or you can return null if you don't want to render anything for "Normal" sets






                            // <TableRow key={index}>
                            //     <Set set={set} index={index} valuechangeHandler={updateSet} ></Set>

                            // </TableRow>
                        ))}
                    </TableBody>




                </Table>

                <Button variant="outline" className="mt-2 text-xs md:text-sm">
                    <Plus className="h-4 w-4 mr-2" onClick={addSet} /> Add Set
                </Button>
            </CardContent>
        </Card>


    )
};

export default EC_normal;



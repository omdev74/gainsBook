import * as React from 'react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, EllipsisVertical, Plus, X } from 'lucide-react';
import { useWorkout } from '@/contexts/WorkoutContext';
import { WorkoutItem, WorkoutSet } from '@shared/types/frontend';
import Set from './Sets/SuperSet';
import { Drawer, DrawerTitle, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { useAddEmptyNormalSet, useAddEmptySpecialSet } from '@/hooks/useWorkoutHooks';
import Superset from './Sets/SuperSet';

interface IEC_supersetProps {
  item: WorkoutItem;
}

const EC_superset: React.FunctionComponent<IEC_supersetProps> = (props) => {
  const addEmptyNormalSet = useAddEmptyNormalSet();
  const addSpecialSet = useAddEmptySpecialSet();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const inputchangeHandler = (index: number, field: string, newValue: any) => {
    console.log(`inputchangeHandler ${index} ${field} ${newValue}`);
  };

  const options = {
    Drop: { shortText: "Drop", color: "border-transparent text-primary-foreground bg-blue-600" },
    Warmup: { shortText: "Warmup", color: "border-transparent text-primary-foreground bg-yellow-600" },
    Myorep: { shortText: "Myorep", color: "border-transparent text-primary-foreground bg-red-600" },
  };

  return (
    <Card className="p-1 md:p-6 w-full max-w-6xl" >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
        <CardTitle className="text-sm md:text-base font-medium"><CardTitle className="text-sm md:text-base font-medium">
          {props.item.itemData.exercisesAndTheirSets.map((exerciseSet, index) =>
            exerciseSet.exerciseRef.name).join(' + ')}
        </CardTitle></CardTitle>
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

      <CardContent className="sm:p-1">
        <Table className="w-full table-auto border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-xs md:text-sm px-2">Set</TableHead>
              {/* <TableHead className="text-xs md:text-sm px-2">Previous</TableHead> */}
              <TableHead className="text-xs md:text-sm px-2">Exercise</TableHead>
              <TableHead className="text-xs md:text-sm px-2">Lbs</TableHead>
              <TableHead className="text-xs md:text-sm px-2">Reps</TableHead>
              <TableHead className="text-xs md:text-sm text-right px-2">Volume</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody className="text-xs">
            {props.item.itemData.exercisesAndTheirSets.map((exerciseSet, exerciseSetIndex) => (
              exerciseSet.sets.map((set: WorkoutSet, setIndex) => (
                <Superset
                  set={set}
                  index={set.index}
                  inputchangeHandler={inputchangeHandler}
                  key={`${exerciseSetIndex}-${setIndex}`}
                />
              ))
            ))}
            

          </TableBody> */}


          {/* <Superset
              sets={[props.item.itemData.exercisesAndTheirSets[0].sets[0], props.item.itemData.exercisesAndTheirSets[1].sets[0]]}
              index={1}
              inputchangeHandler={(setIndex, key, value) => {
                // Handle changes to each WorkoutSet within the superset
              }}
            /> */}


          <TableBody className="text-xs">
            {props.item.itemData.exercisesAndTheirSets[0].sets.map((_, setIndex) => {
              // Build superset group from all exercises at current setIndex
              const supersetGroup = props.item.itemData.exercisesAndTheirSets.map((exerciseSet) => {
                const set = exerciseSet.sets[setIndex];
                return {
                  ...set,
                  exerciseName: exerciseSet.exerciseRef?.name || "Unnamed Exercise",
                };
              });

              // Use the actual index from the first set (assumes they all share it)
              const displayedIndex = supersetGroup[0]?.index ?? setIndex + 1;

              return (
                <Superset
                  key={setIndex}
                  sets={supersetGroup}
                  index={displayedIndex}
                  inputchangeHandler={(innerIndex, key, value) => {
                    // Handle changes to each WorkoutSet within the superset
                  }}
                />
              );
            })}
          </TableBody>



        </Table>


        {/* Drawer for selecting special sets from options */}
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
                  onClick={() => addSpecialSet(props.item._id, props.item.itemData.exercisesAndTheirSets[0].exerciseRef._id, option.shortText)}
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

      <CardFooter className="p-3 md:p-4 flex-col gap-6 text-xs md:text-sm">
        <div className="w-full flex flex-col justify-between gap-2">
          <Button
            variant="secondary"
            className="text-xs md:text-sm"
            onClick={() => addEmptyNormalSet(props.item._id, props.item.itemData.exercisesAndTheirSets[0].exerciseRef._id)}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Normal Set
          </Button>

          <Button
            variant="secondary"
            className="text-xs md:text-sm"
            onClick={toggleDrawer}
          >
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
            <span className="text-2xl md:text-xl font-medium">100 reps</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EC_superset;

import * as React from 'react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, EllipsisVertical, MoreVertical, Plus, TrendingUp, X } from 'lucide-react';
import { useWorkout } from '@/contexts/WorkoutContext';
import { DroppableSet, NormalSet, RepetitiveSet, WarmupSet, WorkoutItem, WorkoutSet } from '@shared/types/frontend';
import Set from './Sets/SuperSet';
import { Drawer, DrawerTitle, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { useAddEmptyNormalSet, useAddEmptySpecialSet } from '@/hooks/useWorkoutHooks';
import Superset from './Sets/SuperSet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ProgressChart } from './ProgressChart';

interface IEC_supersetProps {
  item: WorkoutItem;
}

const EC_superset: React.FunctionComponent<IEC_supersetProps> = (props) => {
  const weights = props.item.itemData.exercisesAndTheirSets[0].sets
    .filter((set): set is NormalSet | WarmupSet => set.setType === "Normal" || set.setType === "Warmup")
    .map(set => set.weight)
  const volumes = props.item.itemData.exercisesAndTheirSets[0].sets
    .filter((set): set is NormalSet | WarmupSet => set.setType === "Normal" || set.setType === "Warmup")
    .map(set => set.weight * set.reps)
  const { workoutState, setWorkoutState } = useWorkout();
  const [showGraphs, setShowGraphs] = useState(false)
  const addEmptyNormalSet = useAddEmptyNormalSet();
  const addSpecialSet = useAddEmptySpecialSet();
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const inputChangeHandler = (
    itemId: string,
    exerciseIndex: number,
    setIndex: number,
    field: "reps" | "weight",
    value: number,
    dropIndex?: number
  ) => {
    console.log(`Input changed: itemId=${itemId}, exerciseName=${props.item.itemData.exercisesAndTheirSets[exerciseIndex].exerciseRef.name},exerciseIndex=${exerciseIndex}, setIndex=${setIndex}, field=${field}, value=${value}, dropIndex=${dropIndex}`);
    setWorkoutState((prevState) => {
      const newItems = [...prevState.workout.items];

      const workoutItem = newItems.find((item) => item._id === itemId);
      if (!workoutItem || !workoutItem.itemData) return prevState;

      const exerciseSet = workoutItem.itemData.exercisesAndTheirSets[exerciseIndex];

      // Adjust setIndex here to account for the 1-based index in the data
      const adjustedSetIndex = setIndex - 1; // Subtracting 1 for zero-based index

      const targetSet = exerciseSet.sets[adjustedSetIndex];

      if (targetSet.setType === "Normal" || targetSet.setType === "Warmup") {
        (targetSet as RepetitiveSet)[field] = value;
        (targetSet as RepetitiveSet).volume =
          (targetSet as RepetitiveSet).reps * (targetSet as RepetitiveSet).weight;
      } else if (targetSet.setType === "Drop" || targetSet.setType === "Myorep") {
        if (dropIndex !== undefined) {
          const drop = (targetSet as DroppableSet).drops[dropIndex];
          if (drop) {
            drop[field] = value;
          }
        }
      }

      return {
        ...prevState,
        workout: {
          ...prevState.workout,
          items: newItems,
        },
      };
    });
  };

  const options = {
    Drop: { shortText: "Drop", color: "border-transparent text-primary-foreground bg-blue-600" },
    Warmup: { shortText: "Warmup", color: "border-transparent text-primary-foreground bg-yellow-600" },
    Myorep: { shortText: "Myorep", color: "border-transparent text-primary-foreground bg-red-600" },
  };

  return (
    <Card className="p-1 md:p-6 w-full max-w-6xl" >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
        <CardTitle className="text-sm md:text-base font-medium whitespace-normal">
          {props.item.itemData.exercisesAndTheirSets.map((exerciseSet, index) =>
            exerciseSet.exerciseRef.name).join(' + ')}
        </CardTitle>
        <div className='min-w-[120px]'>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse drawer" : "Expand drawer"}
          >
            {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() =>
                addEmptyNormalSet(
                  props.item._id,
                  props.item.itemData.exercisesAndTheirSets.map(
                    (exercise) => exercise.exerciseRef._id
                  )
                )
              }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Normal Set
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowGraphs(!showGraphs)}>
                <TrendingUp className="h-4 w-4 mr-2" />
                {showGraphs ? "Hide Graphs" : "Show Graphs"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {isExpanded && (
        <>
          <CardContent className="p-1">
            <Table className="w-full table-auto border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm px-2">Set</TableHead>
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
                  const supersetGroup = props.item.itemData.exercisesAndTheirSets.map((exerciseSet, exerciseSetIndex) => {
                    const set = exerciseSet.sets[setIndex];
                    return {
                      ...set,
                      exerciseName: exerciseSet.exerciseRef?.name || "Unnamed Exercise",
                      exerciseSetIndex,
                    };
                  });

                  // Use the actual index from the first set (assumes they all share it)
                  const displayedIndex = supersetGroup[0]?.index ?? setIndex + 1;

                  return (
                    <Superset
                      itemId={props.item._id}
                      key={setIndex}
                      sets={supersetGroup}
                      index={displayedIndex}
                      inputchangeHandler={inputChangeHandler}
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
                onClick={() =>
                  addEmptyNormalSet(
                    props.item._id,
                    props.item.itemData.exercisesAndTheirSets.map(
                      (exercise) => exercise.exerciseRef._id
                    )
                  )
                }

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
              <Button
                variant="ghost"
                className="w-full mt-3 text-muted-foreground"
                onClick={() => setShowGraphs(!showGraphs)}
              >
                {showGraphs ? (

                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Progression Graphs
                  </>
                ) : (

                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show Progression Graphs
                  </>
                )}
              </Button>

              {/* Accordion for graphs */}
              {showGraphs && (
                <div className="mt-4 pt-4 border-t border-muted">
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-medium mb-2">Weight Progression:</div>
                      <ProgressChart currentValues={weights} previousValues={weights} label="lbs" />
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Volume Progression:</div>
                      <ProgressChart currentValues={volumes} previousValues={weights} label="lbs" />
                    </div>
                  </div>
                </div>
              )}
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
        </>
      )}
    </Card>
  );
};

export default EC_superset;

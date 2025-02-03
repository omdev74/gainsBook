"use client"
import { useWorkout, WorkoutProvider } from "@/contexts/WorkoutContext";
import EC_normal from "../ExerciseCard_normal"
import { Button } from "../ui/button";
import WorkoutState from "./WorkoutState";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import EC_superset from "../ExerciseCard_superset";
import React from "react";
import { useToast } from "@/hooks/use-toast"
export default function WorkoutTrackershadcn() {

  const [isExpanded, setIsExpanded] = React.useState(false)
  const { workoutState, setWorkoutState } = useWorkout();
  const { ongoing } = workoutState;
  const { toast } = useToast()
  const handleCancelWorkout = () => {
    setWorkoutState({ ...workoutState, ongoing: false });
    console.log("toasting");
    toast({
      variant: "destructive",
      description: "Workout Cancelled",
    })
  }

  return (



    <div
      className={`fixed left-0 right-0 bg-background shadow-lg transition-all duration-500 ease-in-out z-20 ${isExpanded
        ? "sm:bottom-0 sm:h-[calc(100%-4rem)] bottom-16 h-[calc(100%-4rem)] " // Expanded state
        : "sm:bottom-0 bottom-16 " // Collapsed state
        }`}
      aria-expanded={isExpanded}
      role="region"
    >
      <div className="flex items-center justify-between p-3 sm:p-6  border-t">
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">Morning Cardio</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">00:45:30</span>
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
            className=" hover:text-white hover:bg-green-600 text-green-600 transition-colors"
            onClick={() => console.log("Workout completed")}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse drawer" : "Expand drawer"}
          >
            {isExpanded ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
          </Button>

        </div>

      </div>
      <div
        className={`overflow-auto scroll-smooth p-2.5 ${isExpanded ? "opacity-100 h-[calc(100%-5rem)]" : "opacity-0 h-0"
          } flex flex-col items-center space-y-6`}
      >
        <div className="space-y-6">
          <EC_normal />
          <EC_superset />
        </div>
        <div className="flex justify-between flex-col w-full gap-2">
        <Button
          variant="destructive"
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          onClick={handleCancelWorkout}
        >
          <X className="h-4 w-4" />
          <span>Cancel workout</span>
        </Button>
        <Button
          variant="success"
          className="bg-green-500 text-white hover:bg-green-600 transition-colors"
          onClick={() => console.log("Workout completed")}
        >
          <Check className="h-4 w-4" />
          <span>Complete workout</span>
        </Button>
        </div>
        <WorkoutState />
      </div>
    </div>


  )
}


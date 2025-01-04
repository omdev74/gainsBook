"use client"
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import EC_normal from "../ExerciseCard_normal"
// import Superset from "./SetTypes/SuperSetComp"


import { WorkoutItem, Exercise, Superset, NormalSet, DropSet, MyorepSet } from "@shared/types/workout";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import WorkoutState from "./WorkoutState";
export default function WorkoutTrackershadcn() {


  return (
    <WorkoutProvider>
      <div className=" max-w-4xl mx-auto">
        <div className="space-y-6">
          <EC_normal />
          <WorkoutState />


          {/* <Superset /> */}
        </div>
      </div>
    </WorkoutProvider>
  )
}


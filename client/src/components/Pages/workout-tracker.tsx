"use client"
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import EC_normal from "../ExerciseCard_normal"
// import Superset from "./SetTypes/SuperSetComp"


import { WorkoutItem, Exercise, Superset, NormalSet, DropSet, MyorepSet } from "@shared/types/workout";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import WorkoutState from "./WorkoutState";
import { Check, X } from "lucide-react";
import Timer from "../Timer";
import EC_superset from "../ExerciseCard_superset";
export default function WorkoutTrackershadcn() {


  return (
    <WorkoutProvider>

      <div className=" max-w-4xl mx-auto p-2.5 mb-32">
        <div className="space-y-6">
          <Timer />
          <EC_normal />
          <EC_superset />

          <WorkoutState />


        </div>
      </div>
    </WorkoutProvider>
  )
}


"use client"


import NormalSet from "./SetTypes/normal-set"
import Superset from "./SetTypes/superset"


export default function WorkoutTrackershadcn() {


  return (
    <div className=" max-w-4xl mx-auto">
      <div className="space-y-6">
        <NormalSet />
        <NormalSet />
        <Superset />
      </div>
    </div>
  )
}


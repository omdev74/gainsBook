"use client"

import { useState } from "react"
import NormalSet from "./SetTypes/normal-set"
import Superset from "./SetTypes/SuperSet"


export default function WorkoutTrackershadcn() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <NormalSet />
        <NormalSet />
        <Superset />
      </div>
    </div>
  )
}


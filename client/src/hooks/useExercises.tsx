import { useState, useMemo } from "react"

type Exercise = {
  id: number
  name: string
  equipment: string
  muscle: string
  sets: number
  imageUrl: string
}

const mockExercises: Exercise[] = [
  {
    id: 1,
    name: "Push-ups",
    equipment: "Bodyweight",
    muscle: "Chest",
    sets: 3,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Squats",
    equipment: "Bodyweight",
    muscle: "Legs",
    sets: 4,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Dumbbell Curls",
    equipment: "Dumbbells",
    muscle: "Biceps",
    sets: 3,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Bench Press",
    equipment: "Barbell",
    muscle: "Chest",
    sets: 5,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Deadlifts",
    equipment: "Barbell",
    muscle: "Back",
    sets: 4,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Lat Pulldowns",
    equipment: "Cable Machine",
    muscle: "Back",
    sets: 3,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Leg Press",
    equipment: "Machine",
    muscle: "Legs",
    sets: 4,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Plank",
    equipment: "Bodyweight",
    muscle: "Core",
    sets: 2,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "Tricep Pushdowns",
    equipment: "Cable Machine",
    muscle: "Triceps",
    sets: 3,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 10,
    name: "Shoulder Press",
    equipment: "Dumbbells",
    muscle: "Shoulders",
    sets: 4,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

export function useExercises() {
  const [searchTerm, setSearchTerm] = useState("")
  const [equipmentFilter, setEquipmentFilter] = useState<string[]>([])
  const [muscleFilter, setMuscleFilter] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"name" | "sets">("name")

  const filteredAndSortedExercises = useMemo(() => {
    return mockExercises
      .filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (equipmentFilter.length === 0 || equipmentFilter.includes(exercise.equipment)) &&
          (muscleFilter.length === 0 || muscleFilter.includes(exercise.muscle)),
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        } else {
          return b.sets - a.sets
        }
      })
  }, [searchTerm, equipmentFilter, muscleFilter, sortBy])

  const uniqueEquipment = [...new Set(mockExercises.map((e) => e.equipment))]
  const uniqueMuscles = [...new Set(mockExercises.map((e) => e.muscle))]

  return {
    exercises: filteredAndSortedExercises,
    searchTerm,
    setSearchTerm,
    equipmentFilter,
    setEquipmentFilter,
    muscleFilter,
    setMuscleFilter,
    sortBy,
    setSortBy,
    uniqueEquipment,
    uniqueMuscles,
  }
}


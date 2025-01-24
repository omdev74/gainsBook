"use client"

import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useExercises } from "@/hooks/useExercises"
import { Dumbbell, Filter, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Loader from "../ui/loader"
import { NavLink } from "react-router"

export default function ExercisesCustom() {
    const {
        exercises,
        searchTerm,
        setSearchTerm,
        equipmentFilter,
        setEquipmentFilter,
        muscleFilter,
        setMuscleFilter,
        sortBy,
        setSortBy,
        loading,
        error,
        uniqueEquipment,
        uniqueMuscles,

    } = useExercises()

    const [activeFilter, setActiveFilter] = useState<"equipment" | "muscle">("equipment")

    const toggleFilter = (filter: string, type: "equipment" | "muscle") => {
        const setFilter = type === "equipment" ? setEquipmentFilter : setMuscleFilter
        const currentFilter = type === "equipment" ? equipmentFilter : muscleFilter
        setFilter(currentFilter.includes(filter) ? currentFilter.filter((f) => f !== filter) : [...currentFilter, filter])
    }


    return (
        <div className="flex flex-col h-screen">
            <div className="container mx-auto mb-0 px-4 py-8 pb-0 flex-shrink-0">
                <h1 className="text-3xl font-bold mb-8">Exercise Library</h1>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            type="search"
                            placeholder="Search exercises..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-2/3"
                        />
                        <div className="flex w-full sm:w-1/3 gap-2">
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="secondary" className="flex-1" onClick={() => setActiveFilter("muscle")}>
                                        <Filter className="mr-2 h-4 w-4" /> Muscles
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>Filter by Muscle</DrawerTitle>
                                        <DrawerDescription>Select the muscle groups you want to target</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="grid gap-4 p-4">
                                        {uniqueMuscles.map((muscle) => (
                                            <div key={muscle} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`muscle-${muscle}`}
                                                    checked={muscleFilter.includes(muscle)}
                                                    onCheckedChange={() => toggleFilter(muscle, "muscle")}
                                                />
                                                <Label htmlFor={`muscle-${muscle}`}>{muscle}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </DrawerContent>
                            </Drawer>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="secondary" className="flex-1" onClick={() => setActiveFilter("equipment")}>
                                        <Dumbbell className="mr-2 h-4 w-4" /> Equipment
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>Filter by Equipment</DrawerTitle>
                                        <DrawerDescription>Select the equipment you want to use</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="grid gap-4 p-4">
                                        {uniqueEquipment.map((equipment) => (
                                            <div key={equipment} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`equipment-${equipment}`}
                                                    checked={equipmentFilter.includes(equipment)}
                                                    onCheckedChange={() => toggleFilter(equipment, "equipment")}
                                                />
                                                <Label htmlFor={`equipment-${equipment}`}>{equipment}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                <ul className="container mx-auto px-4 py-4 space-y-4">


                    {loading ? (
                        <Loader />
                    ) : exercises && exercises.length > 0 ? (
                        <>{exercises.map((exercise) => (
                            <li
                                key={exercise.id}
                            >
                                <NavLink to={`/exercise/${exercise.id}`} className="flex w-full space-x-4 p-2  rounded-lg shadow-sm items-center" > {/* Use w-full for full width */}
                                    <Avatar className="">
                                        <AvatarImage />
                                        <AvatarFallback>
                                            {exercise.name.split(" ").slice(0, 2).map(word => word[0].toUpperCase()).join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-grow">
                                        <h2 className="text-lg font-semibold">{exercise.name}</h2>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            <Badge variant="secondary">{exercise.muscle}</Badge>

                                            {exercise.equipment.length > 0 ? (
                                                <Badge variant="outline">{exercise.equipment[0].name}</Badge>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">{exercise.sets} sets</div>
                                </NavLink>
                            </li>
                        ))
                        }</>
                    ) : exercises ? (
                        <p>{error}</p>
                    ) : null}
                </ul>
            </div>

        </div>
    )
}


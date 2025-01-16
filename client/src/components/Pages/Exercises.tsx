"use client"
const apiKey = import.meta.env.VITE_NINJA_API_KEY;

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

interface Exercise {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

const muscleGroups = [
    "abdominals",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps"
];

export default function Exercises() {
    const [exercises, setExercises] = useState<Record<string, Exercise[]>>({});

    console.log(exercises);

    useEffect(() => {
        const cachedExercises = localStorage.getItem("exercises");

        if (cachedExercises) {
            setExercises(JSON.parse(cachedExercises));
            console.log("it is cached");
        } else {
            const fetchExercisesForMuscleGroup = (muscle: string) =>
                axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
                    headers: {
                        "X-Api-Key": apiKey,
                    },
                })

            Promise.all(muscleGroups.map((muscle) => fetchExercisesForMuscleGroup(muscle)))
                .then((responses) => {
                    const groupedExercises: Record<string, Exercise[]> = {};
                    responses.forEach((res, index) => {
                        const muscle = muscleGroups[index];
                        groupedExercises[muscle] = res.data;
                    });

                    setExercises(groupedExercises);
                    localStorage.setItem("exercises", JSON.stringify(groupedExercises));
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });


            
        }

        return () => {
            console.log("Component unmounted");
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:px-6 lg:px-8 mb-32">
            <nav className="bg-background sticky top-0 left-0 right-0 sm:hidden flex justify-between items-center z-10 p-2.5">
                    <h2 className="text-xl font-bold md:mb-0 ">Exercise Groups</h2>
                    <NavLink to="/settings">
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </NavLink>

                </nav>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {muscleGroups.map((muscleGroup) => (
                    <AccordionItem key={muscleGroup} value={muscleGroup}>
                        <AccordionTrigger className="text-lg font-semibold">
                            {muscleGroup.replace("_", " ").charAt(0).toUpperCase() + muscleGroup.replace("_", " ").slice(1)} Exercises
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="flex flex-wrap gap-6 justify-center">
                                {exercises[muscleGroup]?.map((ex, index) => (
                                    <Card key={`${index}_${ex.name}`} className="bg-card flex flex-col w-full sm:w-1/3">
                                        <CardHeader>
                                            <CardTitle className="text-lg sm:text-xl">{ex.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 flex-1">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">{ex.type}</Badge>
                                                <Badge variant="secondary">{ex.muscle}</Badge>
                                                <Badge variant="secondary">{ex.equipment}</Badge>
                                                <Badge variant="secondary">{ex.difficulty}</Badge>
                                            </div>
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="instructions">
                                                    <AccordionTrigger>Instructions</AccordionTrigger>
                                                    <AccordionContent className="max-h-48 overflow-y-auto">
                                                        {ex.instructions}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}


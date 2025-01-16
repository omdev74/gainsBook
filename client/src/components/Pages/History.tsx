import { useState, useRef } from "react";
import { format, isSameDay, isSameSecond } from "date-fns";
import { CalendarIcon, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router";

// Mock data for workouts
const workouts = [
    { id: 1, name: "Full Body Workout", date: new Date(2024, 11, 15, 10, 30), exercises: ["Squats", "Bench Press", "Deadlifts"] },
    { id: 2, name: "Upper Body Focus", date: new Date(2024, 11, 14, 10, 30), exercises: ["Pull-ups", "Shoulder Press", "Bicep Curls"] },
    { id: 3, name: "Leg Day", date: new Date(2024, 11, 13, 11, 0), exercises: ["Leg Press", "Lunges", "Calf Raises"] },
    { id: 4, name: "Cardio Session", date: new Date(2024, 11, 12, 10, 30), exercises: ["Treadmill", "Jump Rope", "Burpees"] },
];

export default function WorkoutHistory() {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Scroll to the workout card when a date is selected
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            const dateKey = selectedDate.toDateString();
            const cardElement = cardRefs.current[dateKey];
            if (cardElement) {
                cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
                setIsDrawerOpen(false);
            }
        }
    };

    // Extract unique workout dates
    const workoutDates = workouts.map((workout) => workout.date);
    console.log(workoutDates);

    const modifiers = {
        hasWorkout: (date: Date) =>
            workoutDates.some((workoutDate) => isSameDay(workoutDate, date)),
    };


    return (
        <div className="mb-32">
            <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:px-6 lg:px-8 mb-32">
            <nav className="bg-background sticky top-0 left-0 right-0 sm:hidden flex justify-between items-center z-10 p-2.5">
                    <h2 className="text-xl font-bold md:mb-0 ">Workout History</h2>
                    <NavLink to="/settings">
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </NavLink>

                </nav>
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 hidden">Workout History</h1>
                <div className="mb-4 sm:mb-6">
                    <Drawer onOpenChange={setIsDrawerOpen} open={isDrawerOpen}>
                        <DrawerTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full sm:w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="sm:p-6 flex flex-col items-center justify-center">
                            <DrawerHeader>
                                <DrawerTitle>Select a Date</DrawerTitle>
                            </DrawerHeader>
                            <Calendar
                                mode="single"
                                selected={date}

                                onSelect={handleDateSelect}
                                initialFocus
                                fixedWeeks
                                showOutsideDays={false}
                                // custom dates rendering logic
                                modifiers={modifiers}
                                modifiersStyles={{
                                    hasWorkout: {
                                        color: "text-primary",
                                        fontWeight: "bold"
                                    }
                                }}
                                components={{
                                    DayContent: ({ date }) => (
                                        <div className="relative">
                                            <span>{date.getDate()}</span>
                                            {workoutDates.some((workoutDate) => isSameDay(workoutDate, date)) && (
                                                <div className="absolute bottom-'-.05' left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                                            )}
                                        </div>
                                    ),
                                }}

                            />
                            <DrawerFooter>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="space-y-4">
                    {workouts
                        .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort workouts descending
                        .map((workout) => {
                            const dateKey = workout.date.toDateString();
                            return (
                                <Card
                                    key={workout.id}
                                    className="bg-card"
                                    ref={(el) => (cardRefs.current[dateKey] = el)}
                                >
                                    <CardHeader>
                                        <CardTitle className="text-sm sm:text-base">
                                            {workout.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                                            {format(workout.date, "PPP h:mm a")}
                                        </p>
                                        <ul className="list-disc list-inside">
                                            {workout.exercises.map((exercise, index) => (
                                                <li
                                                    key={index}
                                                    className="text-xs sm:text-sm"
                                                >
                                                    {exercise}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

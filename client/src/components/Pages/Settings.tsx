"use client";

import LogoutButton from "../ui/logoutButton";
import { NavLink } from "react-router";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Settings } from "lucide-react";

import { useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"
import { ModeToggle } from "../ModeToggle";
import { useWorkout } from "@/contexts/OngoingWorkoutContext";

import { useObjectId } from "@/hooks/useObjectId";

const backendURI = import.meta.env.VITE_BACKEND_URI;

export default function SettingsPage() {
    const newId = useObjectId();
    const { user } = useContext(AuthContext);
    const nowIso = new Date().toISOString();
    const { token } = useContext(AuthContext);
    const [weightUnit, setWeightUnit] = useState("kg")
    const [distanceUnit, setDistanceUnit] = useState("km")
    const [sizeUnit, setSizeUnit] = useState("cm")
    const { logout } = useContext(AuthContext)
    const { workoutState, setWorkoutState } = useWorkout();


    const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await axios.post(
                `${backendURI}/createsampleworkout`,
                {}, // Body (if required, otherwise keep it empty)
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Add the token here
                    },
                }
            );


        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                console.error("Axios error:", error.response?.data || error.message);
            } else if (error instanceof Error) {
                // Handle generic errors
                console.error("Error:", error.message);
            } else {
                // Handle unknown errors
                console.error("An unknown error occurred.");
            }
        }
    };

    const startsampleworkout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setWorkoutState({
            workout: {
                "_id": newId,
                "Title": `Test Workout ${Date.now()}`,
                "userId": user?._id,
                "date": nowIso,
                "notes": "Upper body workout focusing on chest and triceps.",
                "items": [
                    {
                        "itemType": "Regular",
                        "itemData": {
                            "exercisesAndTheirSets": [
                                {
                                    "exerciseRef": {
                                        "_id": "678ebf9115751d7decc978e1",
                                        "name": "Arnold Shoulder Press"
                                    },
                                    "exerciseType": "DefaultExercise",
                                    "sets": [
                                        {
                                            "index": 1,
                                            "setType": "Normal",
                                            "reps": 12,
                                            "weight": 0,
                                            "volume": 0
                                        },
                                        {
                                            "index": 2,
                                            "setType": "Normal",
                                            "reps": 20,
                                            "weight": 100,
                                            "volume": 500
                                        },
                                        {
                                            "index": 3,
                                            "drops": [
                                                { reps: 8, weight: 60 },
                                                { reps: 8, weight: 60 },
                                                { reps: 6, weight: 100 },
                                            ],
                                            "setType": "Drop",
                                        },
                                    ]
                                }
                            ]
                        },
                        "ExerciseNote": null,
                        "_id": "663e7b1f4e9a28a8e2d7e4a3"
                    },
                    {
                        "itemType": "Superset",
                        "itemData": {
                            "exercisesAndTheirSets": [
                                {
                                    "exerciseRef": {
                                        "_id": "678ebf9115751d7decc978e1",
                                        "name": "Arnold Shoulder Press"
                                    },
                                    "exerciseType": "DefaultExercise",
                                    "sets": [
                                        {
                                            "index": 1,
                                            "setType": "Normal",
                                            "reps": 10,
                                            "weight": 50,
                                            "volume": 500
                                        },
                                        {
                                            "index": 2,
                                            "setType": "Normal",
                                            "reps": 20,
                                            "weight": 100,
                                            "volume": 500
                                        },
                                        {
                                            "index": 3,
                                            "drops": [
                                                { reps: 8, weight: 60 },
                                                { reps: 8, weight: 60 },
                                            ],
                                            "setType": "Drop",
                                        },
                                    ]
                                },
                                {
                                    "exerciseRef": {
                                        "_id": "678ebf9115751d7decc978e3",
                                        "name": "Barbell Hack Squats"
                                    },
                                    "exerciseType": "CustomExercise",
                                    "sets": [
                                        {
                                            "index": 1,
                                            "setType": "Normal",
                                            "reps": 10,
                                            "weight": 50,
                                            "volume": 500
                                        },
                                        {
                                            "index": 2,
                                            "drops": [
                                                { reps: 8, weight: 60 },
                                                { reps: 8, weight: 60 },
                                            ],
                                            "setType": "Drop",
                                        },
                                        {
                                            "index": 3,
                                            "drops": [
                                                { reps: 8, weight: 60 },
                                                { reps: 8, weight: 60 },
                                            ],
                                            "setType": "Drop",
                                        },
                                    ]
                                }
                            ]
                        },
                        "ExerciseNote": null,
                        "_id": "663e7b1f4e9a28a8e2d7e4a4"
                    }
                ],
                "TotalVolume": 500,
                "TotalSets": 500,
                "TotalExercises": 500,
                "createdAt": "2025-02-01T23:40:08.827Z",
                "updatedAt": "2025-02-01T23:40:08.827Z",
                "__v": 0
            }, ongoing: true
        });

    }
    return (
        <div className="mb-32">
            <nav className="bg-background sticky top-0 left-0 right-0 sm:hidden flex justify-between items-center z-10 p-2.5">

                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <NavLink to="/settings">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </NavLink>

            </nav>
            <div className="flex flex-col justify-between gap-6 mx-auto px-4 py-8 sm:max-w-4xl ">
                <div className="space-y-4">

                    <Button variant="outline" className="w-full" onClick={startsampleworkout}>
                        Start Sample Workout
                    </Button>
                    <Button
                        variant="outline" className="w-full"
                        asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button
                        variant="outline" className="w-full"
                        asChild>
                        <Link to="/signup">Register</Link>
                    </Button>
                    <Button
                        variant="outline" className="w-full"
                        asChild>
                        <Link to="/exercise">Exercise</Link>
                    </Button>
                    <Button
                        variant="outline" className="w-full"
                        onClick={onSubmitHandler}>SampleWorkout
                    </Button>

                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link to="/profile" className="flex justify-between items-center">
                            Profile
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                        <Link to="/change-password" className="flex justify-between items-center">
                            Change Password
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                        <Button variant="destructive" className="w-full" onClick={logout}>
                            Logout
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="weight-unit">Weight Unit</Label>
                            <Select value={weightUnit} onValueChange={setWeightUnit}>
                                <SelectTrigger id="weight-unit">
                                    <SelectValue placeholder="Select weight unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                    <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="distance-unit">Distance Unit</Label>
                            <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                                <SelectTrigger id="distance-unit">
                                    <SelectValue placeholder="Select distance unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="km">Kilometers (km)</SelectItem>
                                    <SelectItem value="mi">Miles (mi)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="size-unit">Size Unit</Label>
                            <Select value={sizeUnit} onValueChange={setSizeUnit}>
                                <SelectTrigger id="size-unit">
                                    <SelectValue placeholder="Select size unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                                    <SelectItem value="in">Inches (in)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="dark-mode">Dark Mode</Label>
                            <ModeToggle />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Integrations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link to="/connect/strava" className="flex justify-between items-center">
                            Connect to Strava
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                        <Link to="/connect/fitbit" className="flex justify-between items-center">
                            Connect to Fitbit
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                        <Link to="/connect/apple-health" className="flex justify-between items-center">
                            Connect to Apple Health
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Help & Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link to="/faq" className="flex justify-between items-center">
                            FAQ
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                        <Link to="/contact" className="flex justify-between items-center">
                            Contact Support
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                        <div className="space-y-2">
                            <Label>Social Handles</Label>
                            <div className="flex space-x-4">
                                <a
                                    href="https://twitter.com/workouttracker"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                >
                                    Twitter
                                </a>
                                <a
                                    href="https://instagram.com/workouttracker"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-500"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://facebook.com/workouttracker"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600"
                                >
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

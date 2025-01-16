"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { WeeklyChart } from "@/components/weekly-chart"
import { RecentWorkouts } from "@/components/recent-workouts"
import Anatomy from "../Anatomy";
import { NavLink } from "react-router";  // Use NavLink for active link

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";



export default function Profile() {
    const isLoggedIn = !!localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user") || '{}'); // Parse the string into an object

    if (user.name) {
        console.log(user.name);
    } else {
        console.error("User object is empty or does not have a 'name' property");
    }

    const handleMuscleClick = (e: any) => {
        console.log(e);

    }

    return (
        <div className="mb-32">
            <div className="container mx-auto px-4 py-8 flex flex-col">
                <nav className="bg-background sticky top-0 left-0 right-0 sm:hidden flex justify-between items-center z-10 p-2.5">
                    <h2 className="text-xl font-bold md:mb-0 ">Dashboard</h2>
                    <NavLink to="/settings">
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </NavLink>

                </nav>
                <div className="flex flex-col md:flex-row justify-between items-center ">
                    <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium">{user.name}</span>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@johndoe" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                </div>


                <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <WeeklyChart />
                        </CardContent>
                    </Card>
                    <Card>
                        <Anatomy />

                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Workouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RecentWorkouts />
                        </CardContent>
                    </Card>
                </div>



            </div>

        </div>
    )
}
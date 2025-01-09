"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { WeeklyChart } from "@/components/weekly-chart"
import { RecentWorkouts } from "@/components/recent-workouts"
import Anatomy from "../Anatomy";




export default function Profile() {

    const handleMuscleClick = (e: any) => {
        console.log(e);

    }

    return (
        <div className="mb-32">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center ">
                    <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium">John Doe</span>
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
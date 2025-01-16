"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { WeeklyChart } from "@/components/weekly-chart"
import { RecentWorkouts } from "@/components/recent-workouts"
import Anatomy from "../Anatomy";
import LogoutButton from "../ui/logoutButton"
import { NavLink } from "react-router"
import { Button } from "../ui/button"




export default function Settings() {

    const handleMuscleClick = (e: any) => {
        console.log(e);

    }

    return (
        <div className="mb-32">
            <div className="flex flex-col justify-between gap-2  mx-auto px-4 py-8">

                <LogoutButton />
                <NavLink to="/login">
                    <Button  >
                        Login
                    </Button>
                </NavLink>
                <NavLink to="/signup">
                    <Button>
                        Register
                    </Button>
                </NavLink>


            </div>

        </div>
    )
}
"use client";

import LogoutButton from "../ui/logoutButton";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const backendURI = import.meta.env.VITE_BACKEND_URI;

export default function Settings() {
    const { token } = useContext(AuthContext);

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

            console.log("Workout created successfully:", response.data);
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
    return (
        <div className="mb-32">
            <div className="flex flex-col justify-between gap-2 mx-auto px-4 py-8">
                <LogoutButton />
                <NavLink to="/login">
                    <Button>Login</Button>
                </NavLink>
                <NavLink to="/signup">
                    <Button>Register</Button>
                </NavLink>
                <NavLink to="/exercise">
                    <Button>Exercise</Button>
                </NavLink>
                <div>
                    <Button onClick={onSubmitHandler}>SampleWorkout</Button>
                </div>
            </div>
        </div>
    );
}

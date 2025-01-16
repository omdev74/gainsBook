"use client";


import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dumbbell } from "lucide-react";
const backednURI = import.meta.env.VITE_BACKEND_URI;


const formSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .max(50, "Name should not exceed 50 characters")
        .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long")
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});



const SignUp01Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            // Destructure the necessary fields
            const { email, password, name } = data;

            // Prepare the data to send to the backend
            const response = await fetch(`${backednURI}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }), // Send name, email, and password
            });

            // Handle response
            if (response.ok) {
                const result = await response.json();
                console.log("User registered successfully:", result);
                // You can navigate to a new page or show a success message
            } else {
                const error = await response.json();
                console.error("Registration failed:", error.message);
                // Handle the error (show the error message to the user)
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
            // Handle the error (show the error message to the user)
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xs w-full flex flex-col items-center">
                <Dumbbell className="h-6 w-6 text-primary" />
                <p className="mt-4 text-xl font-bold tracking-tight">
                    Log in to GainsBook
                </p>

                <Button className="mt-8 w-full gap-3" variant="secondary">
                    <GoogleLogo />
                    Continue with Google
                </Button>

                <div className="my-7 w-full flex items-center justify-center overflow-hidden">
                    <Separator />
                    <span className="text-sm px-2">OR</span>
                    <Separator />
                </div>

                <Form {...form}>
                    <form
                        className="w-full space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Name"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="mt-4 w-full">
                            Continue with Email
                        </Button>
                    </form>
                </Form>

                <p className="mt-5 text-sm text-center">
                    Already have an account?
                    <NavLink to="/login" className="ml-1 underline text-muted-foreground">
                        Log in
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

const GoogleLogo = () => (
    <svg
        width="1.2em"
        height="1.2em"
        id="icon-google"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block shrink-0 align-sub text-[inherit] size-lg"
    >
        <g clipPath="url(#clip0)">
            <path
                d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
                fill="#4285F4"
            ></path>
            <path
                d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
                fill="#34A853"
            ></path>
            <path
                d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
                fill="#FBBC04"
            ></path>
            <path
                d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
                fill="#EA4335"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="15.6825" height="16" fill="white"></rect>
            </clipPath>
        </defs>
    </svg>
);

export default SignUp01Page;

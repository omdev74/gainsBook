import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Flame, Settings } from "lucide-react"
import { NavLink } from "react-router"

export default function Profile() {
    // This data would typically come from an API or database
    const user = {
        name: "Jane Doe",
        username: "dasds",
        profileImage: "https://github.com/shadcn.png",
        followers: 1234,
        following: 567,
        streakDays: 15,
    }

    const recentWorkouts = [
        { id: 1, type: "Running", date: "2025-01-28", duration: "30 mins" },
        { id: 2, type: "Weight Training", date: "2025-01-26", duration: "45 mins" },
        { id: 3, type: "Yoga", date: "2025-01-24", duration: "60 mins" },
    ]

    return (
        <>
            <nav className="bg-background sticky top-0 left-0 right-0 sm:hidden flex justify-between items-center z-10 p-2.5">
                <h2 className="text-xl font-bold md:mb-0 ">Dashboard</h2>
                <NavLink to="/settings">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </NavLink>

            </nav>
            <div className="container mx-auto px-4 py-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* User Info Card */}
                    <Card className="md:col-span-1">
                        <CardHeader className="text-center">
                            <Avatar className="w-32 h-32 mx-auto">
                                <AvatarImage src={user.profileImage} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="mt-4">{user.name}</CardTitle>
                            <p className="text-muted-foreground">@{user.username}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-around text-center">
                                <div>
                                    <p className="font-bold">{user.followers}</p>
                                    <p className="text-muted-foreground">Followers</p>
                                </div>
                                <div>
                                    <p className="font-bold">{user.following}</p>
                                    <p className="text-muted-foreground">Following</p>
                                </div>
                            </div>
                            <Button className="w-full mt-4">Follow</Button>
                        </CardContent>
                    </Card>

                    {/* Streak and Recent Workouts */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Streak Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Flame className="mr-2 text-orange-500" />
                                    Current Streak
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">{user.streakDays} days</p>
                                <p className="text-muted-foreground">Keep it up!</p>
                            </CardContent>
                        </Card>

                        {/* Recent Workouts Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CalendarDays className="mr-2" />
                                    Recent Workouts
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {recentWorkouts.map((workout) => (
                                        <li key={workout.id} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{workout.type}</p>
                                                <p className="text-sm text-muted-foreground">{workout.date}</p>
                                            </div>
                                            <p>{workout.duration}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div></>
    )
}


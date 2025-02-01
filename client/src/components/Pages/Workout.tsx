import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dumbbell, FileText, Play, PlusCircle, Search, History } from "lucide-react"
import { useWorkout } from "@/contexts/WorkoutContext"


// This would typically come from an API or database
const savedSplits = [
    {
        id: 1,
        name: "My Full Body Split",
        workouts: [
            { id: 1, name: "Workout A" },
            { id: 2, name: "Workout B" },
            { id: 3, name: "Workout C" },
        ],
    },
    {
        id: 2,
        name: "My Upper/Lower Split",
        workouts: [
            { id: 4, name: "Upper Body" },
            { id: 5, name: "Lower Body" },
        ],
    },
]

export default function WorkoutPage() {
    const { workoutState, setWorkoutState } = useWorkout();
    const { ongoing } = workoutState;
    const handleNewWorkout = () => {

        console.log({ ...workoutState, ongoing: true });
        setWorkoutState({ ...workoutState, ongoing: true });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Workout</h1>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Start</CardTitle>
                        <CardDescription>Begin a new workout or use a previous one</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Button className="w-full" onClick={handleNewWorkout}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Empty Workout
                            </Button>
                            <Button variant="outline" className="w-full">
                                <History className="mr-2 h-4 w-4" /> From History
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Manage</CardTitle>
                        <CardDescription>Create splits and view exercises</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Button className="w-full" asChild>
                                <Link to="/newsplit">
                                    <FileText className="mr-2 h-4 w-4" /> New Split
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link to="/exercises">
                                    <Dumbbell className="mr-2 h-4 w-4" /> Exercises
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>My Splits</CardTitle>
                        <CardDescription>View and start your saved splits</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {savedSplits.map((split) => (
                                <AccordionItem key={split.id} value={`split-${split.id}`}>
                                    <AccordionTrigger>{split.name}</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2">
                                            {split.workouts.map((workout) => (
                                                <li key={workout.id}>
                                                    <Button variant="ghost" className="w-full justify-start">
                                                        <Play className="mr-2 h-4 w-4" /> {workout.name}
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Explore</CardTitle>
                        <CardDescription>Discover pre-created splits and workouts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link to="/explore">
                                <Search className="mr-2 h-4 w-4" /> Browse Splits and Workouts
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


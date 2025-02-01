import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
    return (
        <div className="container mx-auto flex items-center justify-center h-screen p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">404 - Page Not Found</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-center">
                        <img
                            src="/ep.svg"
                            alt="Exhausted person"
                            className="rounded-full"
                            width={200}
                            height={200}
                        />
                    </div>
                    <p className="text-xl font-semibold">Oops! Looks like you've hit your limit!</p>
                    <p className="text-muted-foreground">
                        This page doesn't exist. Maybe it's taking a rest day or it's passed out from an intense workout.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link to="/">Return to Home (Cool Down)</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}


import { useState, useRef, useEffect, useContext } from "react";
import { format, isSameDay } from "date-fns";
import { CalendarIcon, ChevronDown, ChevronUp, Clock, Settings, Timer, Trophy, Weight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { Badge } from "../ui/badge";

const backendURI = import.meta.env.VITE_BACKEND_URI;

export default function WorkoutHistoryCustom() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { token, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the workouts from the backend
    const fetchWorkouts = async () => {
      try {
        if (!token) {
          throw new Error("User is not logged in or token is missing");
        }

        const response = await axios.get(`${backendURI}/workouts`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        // Assuming response.data contains the workouts array
        if (response.status >= 200 && response.status < 300) {
          setWorkouts(response.data.workouts); // Store workouts in state
          console.log(response);
        } else {
          throw new Error("Failed to fetch workouts");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [token]);

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

  // Extract workout dates for modifier logic
  const workoutDates = workouts.map((workout:any) => new Date(workout.date));
  const [isExpanded, setIsExpanded] = useState(false)
  const modifiers = {
    hasWorkout: (date: Date) =>
      workoutDates.some((workoutDate) => isSameDay(workoutDate, date)),
  };

  return (
    <div className="mb-32">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:px-6 lg:px-8 mb-32">
        <nav className="bg-background sticky top-0 left-0 right-0 sm:hidden flex justify-between items-center z-10 p-2.5">
          <h2 className="text-2xl font-bold md:mb-0 ">Workout History</h2>
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
                className={cn("w-full sm:w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
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
                modifiers={modifiers}
                modifiersStyles={{
                  hasWorkout: {
                    color: "text-primary",
                    fontWeight: "bold",
                  },
                }}
              />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="space-y-4">
          {workouts
            .sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort workouts by date descending
            .map((workout:any) => {
              const dateKey = new Date(workout.date).toDateString();
              return (
                <Card key={workout._id} className="w-full  mx-auto hover:shadow-lg transition-shadow duration-300" ref={(el) => (cardRefs.current[dateKey] = el)}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg sm:text-xl font-bold">{workout.Title || "TITLE"}</CardTitle>
                      <Badge variant={"secondary"}>{` ${format(new Date(workout.date), "PPP")}`}</Badge>
                    </div>
                    <CardDescription className="mt-2">

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4"></Clock>
                          <span className="">{workout.duration || "00:00"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Weight className="w-4 h-4"></Weight>
                          <span className="">{`${workout.TotalVolume} lbs`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4"></Trophy>
                          <span className="">{workout.TotalSets}</span>
                        </div>
                      </div>
                    </CardDescription>

                  </CardHeader>
                  <CardContent className="pt-2">

                    {workout.items.map((item:any) => (
                      item.itemType === "Regular" ? <div key={item._id} className="mb-3 " >

                        <h4 className="text-sm font-semibold flex justify-between">
                          {/* <span>{item.itemData.exercisesAndTheirSets[0].exerciseRef.name}</span> */}
                          <span>{item.itemData.exercisesAndTheirSets[0].sets.length} sets</span>
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.itemData.exercisesAndTheirSets[0].sets.map((set:any, i:number) =>
                            `${set.reps}x${set.weight}${i < item.itemData.exercisesAndTheirSets[0].sets.length - 1 ? ', ' : ''}`
                          )}
                        </p>
                      </div> :
                        <div key={item._id} className="mb-4 text-red-500" >


                          {item.itemData.exercisesAndTheirSets.map((exercise:any, index:number) => (
                            <h4 className="text-sm font-semibold flex justify-between">
                              <span>{exercise.exerciseRef?.name ?? "NA"}</span>
                              <span>{exercise.sets.length} sets</span>
                            </h4>
                          ))}

                        </div>
                    ))}
                    {workout.items.length > 3 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Show More
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs sm:text-sm text-muted-foreground italic">{workout.notes}</p>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}

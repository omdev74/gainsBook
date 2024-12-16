import { format } from "date-fns"

const recentWorkouts = [
  { id: 1, name: "Full Body Workout", date: new Date(2023, 5, 15), duration: 60 },
  { id: 2, name: "Upper Body Focus", date: new Date(2023, 5, 14), duration: 45 },
  { id: 3, name: "Leg Day", date: new Date(2023, 5, 13), duration: 50 },
  { id: 4, name: "Cardio Session", date: new Date(2023, 5, 12), duration: 30 },
  { id: 5, name: "Core Workout", date: new Date(2023, 5, 11), duration: 40 },
  { id: 6, name: "HIIT Training", date: new Date(2023, 5, 10), duration: 35 },
  { id: 7, name: "Yoga Flow", date: new Date(2023, 5, 9), duration: 55 },
]

export function RecentWorkouts() {
  return (
    <div className="space-y-8">
      {recentWorkouts.map((workout) => (
        <div key={workout.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{workout.name}</p>
            <p className="text-sm text-muted-foreground">
              {format(workout.date, "MMM d, yyyy")} - {workout.duration} minutes
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}


"use client"

import { useEffect, useState } from 'react'
import { format, subDays } from 'date-fns'
import { PlayCircle, ClipboardList, BarChart, Trophy, Settings, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, AreaChart, Area } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { NavLink, useParams } from 'react-router'
import { Button } from '../ui/button'
import { useExercises } from '@/hooks/useExercises'
import Loader from '../ui/loader'
import { Badge } from '../ui/badge'

// Helper functions to generate random data
const generateRandomWorkouts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    date: format(subDays(new Date(), count - i - 1), 'MMM dd, yyyy'),
    sets: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => ({
      weight: Math.floor(Math.random() * 50) + 150,
      reps: Math.floor(Math.random() * 5) + 5,
    })),
    title: "WoroutName",
    notes: "Upper body workout focusing on chest and triceps."
  }))
}

const generateRandomChartData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - i - 1), 'MMM dd'),
    oneRM: Math.floor(Math.random() * 50) + 200,
    totalVolume: Math.floor(Math.random() * 2000) + 3000,
    bestSet: Math.floor(Math.random() * 5) + 8,
  }))
}

const workouts = generateRandomWorkouts(10)
const chartData = generateRandomChartData(13)

const currentRecords = {
  oneRM: { value: 275, date: '2023-07-15' },
  maxVolume: { value: 5000, date: '2023-06-30' },
  maxWeight: { value: 250, date: '2023-07-10' },
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const bestPerformances = [
  { date: '2023-07-15', type: '1RM', value: '275 lbs' },
  { date: '2023-06-30', type: 'Max Volume', value: '5000 lbs' },
  { date: '2023-07-10', type: 'Max Weight', value: '250 lbs' },
  { date: '2023-05-20', type: '1RM', value: '265 lbs' },
  { date: '2023-04-15', type: 'Max Volume', value: '4800 lbs' },
]

export default function Exercise() {

  const { id } = useParams();  // Get id from URL params
  const exerciseId = id || "6add5973-86d0-4543-928a-6bb8b3f34efc";
  const [exercise, setExercise] = useState<any>(null);
  const {
    getExerciseById,
    exercises,
    loading
  } = useExercises();

  useEffect(() => {

    const fetchExercise = async () => {
      // Log ID from URL params
      try {
        const data = await getExerciseById(exerciseId);  // Fetch exercise by ID
        setExercise(data);  // Set exercise data
        console.log(exercise);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }

    };

    if (!loading) {
      fetchExercise();  // Run the fetch exercise function
    }

  }, [id, exercise, exercises]);  // Dependency on id, so it runs when id changes

  if (loading) {
    return <Loader />;
  }

  if (!exercise) {
    return <>No Exercise</>;
  }


  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:px-6 lg:px-8 mb-32">
      <nav className="bg-background sticky top-0 left-0 right-0 sm:hidden flex justify-between items-center z-10 p-2.5">
        <button onClick={() => window.history.back()} className="flex items-center">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold md:mb-0">{exercise.name ?? null}</h2>
        <NavLink to="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </NavLink>
      </nav>

      <Tabs defaultValue="history" >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">
            <PlayCircle className="w-4 h-4 mr-2" />
            About
          </TabsTrigger>
          <TabsTrigger value="history">
            <ClipboardList className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="charts">
            <BarChart className="w-4 h-4 mr-2" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="records">
            <Trophy className="w-4 h-4 mr-2" />
            Records
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="space-y-4">
            {exercise.imageUrl ? (
              <div className='flex w-full justify-center'>
                <img
                  src={exercise.imageUrl.image}
                  alt="Exercise Image"
                  className={`w-full h-auto rounded-lg ${exercise.imageUrl.image.endsWith('.png') ? 'bg-gray-200' : ''}`}
                />
              </div>
            ) : null}
            <div>
              <h3 className="text-lg font-semibold mb-2">How to Perform a {exercise.name ?? null}</h3>
              <div className="description" dangerouslySetInnerHTML={{ __html: exercise.description }} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="space-y-6">
            {workouts.map((workout, index) => (
              <Card key={index} className='p-0 w-full  mx-auto hover:shadow-lg transition-shadow duration-300'>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg sm:text-xl font-bold">{workout.title || "TITLE"}</CardTitle>
                    <Badge variant={"secondary"}>{` ${format(new Date(workout.date), "PPP")}`}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Set</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead className='text-right'>Reps</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workout.sets.map((set, setIndex) => (
                        <TableRow key={setIndex}>
                          <TableCell>{setIndex + 1}</TableCell>
                          <TableCell>{set.weight} lbs</TableCell>
                          <TableCell className='text-right'>{set.reps}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <p className="text-xs sm:text-sm text-muted-foreground italic">{workout.notes}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <div className="space-y-8">
            <div className="">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress area</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ChartContainer
                    config={chartConfig}
                  >
                    <AreaChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 0,
                      }}
                    >
                      <XAxis dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis domain={['dataMin-20', 'dataMax+20']} hide />
                      <defs>
                        <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="oneRM"
                        type="natural"
                        fill="url(#fillTime)"
                        fillOpacity={0.4}
                        stroke="var(--color-mobile)"
                        dot={{
                          fill: "hsl(var(--primary))",
                        }}
                        activeDot={{
                          r: 6,
                        }} >
                        <LabelList
                          position="top"
                          offset={12}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Area>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        formatter={(value) => (
                          <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                            Time in bed
                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                              {value}
                              <span className="font-normal text-muted-foreground">
                                hr
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <LineChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        top: 20,
                        left: 20,
                        right: 20,
                      }}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis domain={['dataMin-20', 'dataMax+20']} hide={true} />

                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Line
                        dataKey="oneRM"
                        type="natural"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{
                          fill: "hsl(var(--primary))",
                        }}
                        activeDot={{
                          r: 6,
                        }} >
                        <LabelList
                          position="top"
                          offset={12}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Line>
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <Card>
                <CardHeader>
                  <CardTitle>Total Volume Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <LineChart data={chartData} accessibilityLayer margin={{
                      top: 20,
                      left: 20,
                      right: 20,
                    }}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis domain={['dataMin-500', 'dataMax+500']} hide={true} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Line dataKey="totalVolume" type="natural"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{
                          fill: "hsl(var(--primary))",
                        }}
                        activeDot={{
                          r: 6,
                        }} >
                        <LabelList
                          position="top"
                          offset={12}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Line>
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <Card>
                <CardHeader>
                  <CardTitle>Best Set (Reps) Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <RechartsBarChart data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis hide={true} domain={['dataMin-2', 'dataMax+2']} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Bar dataKey="bestSet"
                        fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary"
                      >
                        <LabelList
                          position="top"
                          offset={12}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Bar>
                    </RechartsBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="records">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Current Personal Records</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(currentRecords).map(([key, record]) => (
                  <Card key={key}>
                    <CardHeader>
                      <CardTitle className="text-sm">{key === 'oneRM' ? '1RM' : key === 'maxVolume' ? 'Max Volume' : 'Max Weight'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{record.value} {key === 'maxVolume' ? 'lbs' : 'lb'}</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(record.date), 'MMMM d, yyyy')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Best Performances</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bestPerformances.map((performance, index) => (
                    <TableRow key={index}>
                      <TableCell>{format(new Date(performance.date), 'MMMM d, yyyy')}</TableCell>
                      <TableCell>{performance.type}</TableCell>
                      <TableCell>{performance.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

    </div >

  )
}


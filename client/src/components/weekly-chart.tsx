"use client"

import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig
const data = [
    { name: "Mon", workouts: 3 },
    { name: "Tue", workouts: 2 },
    { name: "Wed", workouts: 4 },
    { name: "Thu", workouts: 3 },
    { name: "Fri", workouts: 5 },
    { name: "Sat", workouts: 2 },
    { name: "Sun", workouts: 1 },
]

export function WeeklyChart() {
    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>

                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />

                <Bar dataKey="workouts" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" >
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}


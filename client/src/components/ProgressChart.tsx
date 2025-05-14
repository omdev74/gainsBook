"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"

interface ProgressChartProps {
  currentValues: number[]
  previousValues: number[]
  label?: string
  height?: number
}

export function ProgressChart({ currentValues, previousValues, label = "", height = 200 }: ProgressChartProps) {
  // Format data for Recharts
  const data = currentValues.map((value, index) => {
    const prevValue = previousValues[index] || 0
    const percentChange = prevValue ? ((value - prevValue) / prevValue) * 100 : 0

    return {
      set: `Set ${index + 1}`,
      current: value || 0,
      previous: prevValue || 0,
      percentChange: percentChange.toFixed(1),
    }
  })

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const current = payload[0].value
      const previous = payload[1]?.value || 0
      const percentChange = ((current - previous) / (previous || 1)) * 100

      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-blue-500">
            Current: {current} {current ? label : ""}
          </p>
          {previous > 0 && (
            <p className="text-gray-500">
              Previous: {previous} {previous ? label : ""}
            </p>
          )}
          {current > 0 && previous > 0 && (
            <p className={percentChange > 0 ? "text-green-500" : percentChange < 0 ? "text-red-500" : "text-gray-500"}>
              Change: {percentChange > 0 ? "+" : ""}
              {percentChange.toFixed(1)}%
            </p>
          )}
        </div>
      )
    }
    return null
  }

  // Custom label for percentage changes
  const renderPercentChangeLabel = (props: any) => {
    const { x, y, value, index } = props

    if (!value || value === 0 || !previousValues[index] || previousValues[index] === 0) {
      return null
    }

    const percentChange = Number.parseFloat(data[index].percentChange)

    if (isNaN(percentChange)) return null

    let color = "text-gray-500"
    let icon = <ArrowRight className="h-3 w-3 inline" />

    if (percentChange > 0) {
      color = "text-green-500"
      icon = <ArrowUp className="h-3 w-3 inline" />
    } else if (percentChange < 0) {
      color = "text-red-500"
      icon = <ArrowDown className="h-3 w-3 inline" />
    }

    return (
      <g transform={`translate(${x},${y - 20})`}>
        <text
          x={0}
          y={0}
          dy={-4}
          textAnchor="middle"
          fill={percentChange > 0 ? "#10b981" : percentChange < 0 ? "#ef4444" : "#9ca3af"}
          className="text-xs font-medium"
        >
          {percentChange > 0 ? "+" : ""}
          {percentChange}%
        </text>
      </g>
    )
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="set" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Previous workout line */}
          <Line
            type="monotone"
            dataKey="previous"
            stroke="#9ca3af"
            strokeWidth={2}
            dot={{ r: 4 }}
            name={`Previous ${label}`}
          />

          {/* Current workout line */}
          <Line
            type="monotone"
            dataKey="current"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 5, fill: "#3b82f6" }}
            // label={renderPercentChangeLabel}
            name={`Current ${label}`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

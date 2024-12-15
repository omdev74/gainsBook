import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, X } from 'lucide-react'

interface Set {
  previous: string;
  weight: string;
  reps: string;
  completed: boolean;
}

export default function NormalSet() {
  const [sets, setSets] = useState<Set[]>([
    { previous: "135 x 10", weight: "", reps: "", completed: false },
    { previous: "145 x 8", weight: "", reps: "", completed: false },
    { previous: "155 x 6", weight: "", reps: "", completed: false },
  ])

  const addSet = () => {
    setSets([...sets, { previous: "", weight: "", reps: "", completed: false }])
  }

  const updateSet = (index: number, field: keyof Set, value: string | boolean) => {
    const newSets = [...sets]
    newSets[index][field] = value
    setSets(newSets)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Bench Press</CardTitle>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Set</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead>Lbs</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets.map((set, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{set.previous}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(index, "weight", e.target.value)}
                    className="w-16"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(index, "reps", e.target.value)}
                    className="w-16"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Checkbox
                    checked={set.completed}
                    onCheckedChange={(checked) => updateSet(index, "completed", checked as boolean)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" onClick={addSet} className="mt-4">
          <Plus className="h-4 w-4 mr-2" /> Add Set
        </Button>
      </CardContent>
    </Card>
  )
}


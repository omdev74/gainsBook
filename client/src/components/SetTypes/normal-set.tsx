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
    <Card className="p-1 md:p-6"> {/* Increased padding for desktop */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm md:text-base font-medium">Bench Press</CardTitle> {/* Larger title on desktop */}
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="sm: p-1 ">
        <div className="overflow-x-auto">
          <Table className="min-w-full" >
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-xs md:text-sm px-2">Set</TableHead>
                <TableHead className="text-xs md:text-sm px-2">Previous</TableHead>
                <TableHead className="text-xs md:text-sm px-2">Lbs</TableHead>
                <TableHead className="text-xs md:text-sm px-2">Reps</TableHead>
                <TableHead className="text-xs md:text-sm text-right px-2">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sets.map((set, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs md:text-sm">{index + 1}</TableCell>
                  <TableCell className="text-xs md:text-sm">{set.previous}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={set.weight}
                      onChange={(e) => updateSet(index, "weight", e.target.value)}
                      className="w-12 md:w-16 text-xs md:text-sm"  // Smaller input on mobile
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={set.reps}
                      onChange={(e) => updateSet(index, "reps", e.target.value)}
                      className="w-12 md:w-16 text-xs md:text-sm"  // Smaller input on mobile
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
        </div>
        <Button variant="outline" onClick={addSet} className="mt-2 text-xs md:text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add Set
        </Button>
      </CardContent>
    </Card>


  )
}


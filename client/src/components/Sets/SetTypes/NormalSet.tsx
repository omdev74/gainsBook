import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, X } from 'lucide-react'


export default function NormalSet() {


  return (

    <TableBody>
      {sets.map((set, index) => (
        <TableRow key={index}>
          <TableCell className="text-xs md:text-sm">{index + 1}</TableCell>
          {/* prev data from the server */}
          <TableCell className="text-xs md:text-sm"></TableCell>
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



  )
}


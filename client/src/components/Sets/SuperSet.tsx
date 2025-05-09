import * as React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { InputCustom } from "../ui/InputCustom";
import {
  WorkoutSet,
  NormalSet,
  WarmupSet,
  DropSet,
  MyorepSet,
} from "@shared/types/frontend";
import { Badge } from "../ui/badge";

interface ISupersetProps {
  sets: (WorkoutSet & { exerciseName: string })[];
  index: number;
  inputchangeHandler: (setIndex: number, key: string, value: any) => void;
}

const setColors = {
  Drop: "bg-blue-600",
  Warmup: "bg-yellow-600",
  Myorep: "bg-red-600",
  Normal: "",
};

const Superset: React.FC<ISupersetProps> = ({
  sets,
  index,
  inputchangeHandler,
}) => {
  // Compute how many total rows this superset takes (for index cell)
  const totalRows = sets.reduce((acc, set) => {
    if (set.setType === "Drop" || set.setType === "Myorep") {
      return acc + (set as DropSet | MyorepSet).drops.length;
    }
    return acc + 1;
  }, 0);

  let renderedRows: React.ReactNode[] = [];
  let globalRowIndex = 0;

  sets.forEach((set, setIdx) => {
    const isDropSet = set.setType === "Drop" || set.setType === "Myorep";
    const drops = isDropSet
      ? (set as DropSet | MyorepSet).drops
      : [{ reps: (set as NormalSet | WarmupSet).reps, weight: (set as NormalSet | WarmupSet).weight }];

    drops.forEach((drop, dropIdx) => {
      renderedRows.push(
        <TableRow key={`${setIdx}-${dropIdx}`}>
          {/* Set Index column — only for the first total row */}
          {globalRowIndex === 0 && (
            <TableCell
              rowSpan={totalRows}
              className="font-bold text-xl md:text-2xl align-middle"
            >
              {index}
            </TableCell>
          )}

          {/* Exercise Name column — only on first row of that exercise */}
          {dropIdx === 0 && (
            <TableCell
              rowSpan={drops.length}
              className="font-semibold text-left relative"
            >
              {set.exerciseName}
              {set.setType !== "Normal" && (
                <Badge
                  className={`absolute top-0 left-0 ${setColors[set.setType]} w-fit`}
                  variant="custom"
                >
                  {set.setType}
                </Badge>
              )}
            </TableCell>
          )}

          {/* Lbs */}
          <TableCell>
            <InputCustom
              type="number"
              value={drop.weight}
              onChange={(e) =>
                inputchangeHandler(setIdx, isDropSet ? "drops" : "weight", {
                  ...(isDropSet && { dropIndex: dropIdx }),
                  key: "weight",
                  value: e.target.value,
                })
              }
            />
          </TableCell>

          {/* Reps */}
          <TableCell>
            <InputCustom
              type="number"
              value={drop.reps}
              onChange={(e) =>
                inputchangeHandler(setIdx, isDropSet ? "drops" : "reps", {
                  ...(isDropSet && { dropIndex: dropIdx }),
                  key: "reps",
                  value: e.target.value,
                })
              }
            />
          </TableCell>

          {/* Volume */}
          <TableCell className="text-right">
            {`${drop.reps * drop.weight} lbs`}
          </TableCell>
        </TableRow>
      );

      globalRowIndex++;
    });
  });

  return <>{renderedRows}</>;
};

export default Superset;

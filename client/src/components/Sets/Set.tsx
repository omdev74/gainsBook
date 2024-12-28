import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { WorkoutSet } from '@shared/types/workout';
import SetSelector from '../ui/SetSelector';
import { Checkbox } from '../ui/checkbox';



interface ISetProps {
  set: WorkoutSet;
  index: number;
  valuechangeHandler: (index: number, key: string, value: {}) => void;
}

const Set: React.FunctionComponent<ISetProps> = ({ set, index, valuechangeHandler }) => {
  const [setType, setSetType] = React.useState(set.setType);

  // Callback for SetSelector to update the setType state
  const selectorChange = (newType: "Myorep" | "Drop" | "Normal") => {
    setSetType(newType);
  };

  switch (setType) {
    case "Normal":
      return (
        <>
          <SetSelector
            setNumber={index + 1}
            setType={setType}
            selectorChange={selectorChange}
            rowSpan={1}

          />
          <TableCell className="text-xs md:text-sm" >Its a Normal</TableCell>
          <TableCell>
            <Input
              type="number"
              value={(set as { weight: number }).weight}
              onChange={(e) => valuechangeHandler(index, "weight", e.target.value)}
              className="w-12 md:w-16 text-xs md:text-sm"
            />
          </TableCell>
          <TableCell>
            <Input
              type="number"
              value={(set as { reps: number }).reps}
              onChange={(e) => valuechangeHandler(index, "reps", e.target.value)}
              className="w-12 md:w-16 text-xs md:text-sm"
            />
          </TableCell>
          <TableCell className="text-right">
            <Checkbox
              checked={set.completed}
            />
          </TableCell>
        </>
      );

      break;

    case "Drop":
      if (set.setType === "Drop") {
        return (
          <>
            <TableRow>
              {/* First spanning cell */}

              <SetSelector
                setNumber={index + 1}
                setType={set.setType}
                selectorChange={selectorChange}
                rowSpan={set.drops.length}
              />

              {/* First sub-row */}
              <TableCell >Drop #1</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={set.drops[0].weight}
                  onChange={(e) =>
                    valuechangeHandler(index, "drops", {
                      dropIndex: 0,
                      key: "weight",
                      value: e.target.value,
                    })
                  }
                  className="w-12 md:w-16 text-xs md:text-sm"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={set.drops[0].reps}
                  onChange={(e) =>
                    valuechangeHandler(index, "drops", {
                      dropIndex: 0,
                      key: "reps",
                      value: e.target.value,
                    })
                  }
                  className="w-12 md:w-16 text-xs md:text-sm"
                />
              </TableCell>
              <TableCell className="text-right">
                <Checkbox
                  checked={set.completed}
                  onCheckedChange={(checked) =>
                    valuechangeHandler(index, "completed", checked as boolean)
                  }
                />
              </TableCell></TableRow>


            {/* Remaining sub-rows */}
            {set.drops.slice(1).map((drop, dropIndex) => (
              <TableRow key={dropIndex + 1} >
                <TableCell>{`Drop #${dropIndex + 2}`}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={drop.weight}
                    onChange={(e) =>
                      valuechangeHandler(index, "drops", {
                        dropIndex: dropIndex + 1,
                        key: "weight",
                        value: e.target.value,
                      })
                    }
                    className="w-12 md:w-16 text-xs md:text-sm"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={drop.reps}
                    onChange={(e) =>
                      valuechangeHandler(index, "drops", {
                        dropIndex: dropIndex + 1,
                        key: "reps",
                        value: e.target.value,
                      })
                    }
                    className="w-12 md:w-16 text-xs md:text-sm"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Checkbox
                    checked={set.completed}
                    onCheckedChange={(checked) =>
                      valuechangeHandler(index, "completed", checked as boolean)
                    }
                  />
                </TableCell>

              </TableRow>
            ))}
          </>
        );
      }


      break;
    case "Myorep":
      if (set.setType === "Myorep") {
        return (
          <>
            <SetSelector
              setNumber={index + 1}
              setType={setType}
              selectorChange={selectorChange}
              rowSpan={set.drops.length}

            />
            <TableCell className="text-xs md:text-sm">Its a Myorep</TableCell>
            <TableCell>
              <Input
                type="number"
                onChange={(e) => valuechangeHandler(index, "weight", e.target.value)}
                className="w-12 md:w-16 text-xs md:text-sm"
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                onChange={(e) => valuechangeHandler(index, "reps", e.target.value)}
                className="w-12 md:w-16 text-xs md:text-sm"
              />
            </TableCell>
            <TableCell className="text-right">
              <Checkbox
                checked={set.completed}
              />
            </TableCell>
          </>
        );
      }

      break;

    default:
      return null;
  }
};

export default Set;



import * as React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { WorkoutSet, NormalSet, WarmupSet, DropSet, MyorepSet } from '@shared/types/workout';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { InputCustom } from '../ui/InputCustom';

interface ISetProps {
  set: WorkoutSet;
  index: number;
  inputchangeHandler: (index: number, key: string, value: any) => void;
}

const Set: React.FunctionComponent<ISetProps> = ({ set, index, inputchangeHandler }) => {
  const [setType, setSetType] = React.useState<WorkoutSet["setType"]>(set.setType);

  const renderDropRows = (drops: { reps: number; weight: number }[]) => (
    <>
      {drops.slice(1).map((drop, dropIndex) => (
        <TableRow key={dropIndex + 1} >
          <TableCell>{`Drop #${dropIndex + 2}`}</TableCell>
          <TableCell>
            <InputCustom
              type="number"
              value={drop.weight}
              onChange={(e) =>
                inputchangeHandler(index, "drops", {
                  dropIndex: dropIndex + 1,
                  key: "weight",
                  value: e.target.value,
                })
              }

            />
          </TableCell>
          <TableCell>
            <InputCustom
              type="number"
              value={drop.reps}
              onChange={(e) =>
                inputchangeHandler(index, "drops", {
                  dropIndex: dropIndex + 1,
                  key: "reps",
                  value: e.target.value,
                })
              }

            />
          </TableCell>
          <TableCell className="text-right">
            {`${drop.weight * drop.reps}lbs`}
          </TableCell>

        </TableRow>
      ))}
    </>
  );


  const options = {
    Drop: { shortText: "Drop", color: "border-transparent text-primary-foreground bg-blue-600" },
    Warmup: { shortText: "Warmup", color: "border-transparent text-primary-foreground bg-yellow-600" },
    Myorep: { shortText: "Myorep", color: "border-transparent text-primary-foreground bg-red-600" },
  };
  const renderContent = () => {
    switch (setType) {
      case "Normal":
      case "Warmup":
        return (
          <TableRow>
            <TableCell className="relative cursor-pointer text-2xl md:text-xl font-bold" rowSpan={1} >
              <span className="mr-2">{index + 1}</span>
              {setType !== "Normal" && (
                <Badge className={`absolute top-0 left-0 ${options.Warmup.color} w-fit`} variant={"custom"}>
                  {setType}
                </Badge>
              )}
            </TableCell>

            <TableCell>{setType === "Normal" ? "It's a Normal" : "It's a Warmup"}</TableCell>
            <TableCell>
              <InputCustom
                type="number"
                value={(set as NormalSet | WarmupSet).weight}
                onChange={(e) => inputchangeHandler(index, "weight", e.target.value)}

              />
            </TableCell>
            <TableCell>
              <InputCustom
                type="number"
                value={(set as NormalSet | WarmupSet).reps}
                onChange={(e) => inputchangeHandler(index, "reps", e.target.value)}

              />
            </TableCell>
            <TableCell className="text-right">
              {`${(set as NormalSet | WarmupSet).weight * (set as NormalSet | WarmupSet).reps}lbs`}
            </TableCell>
          </TableRow>
        );

      case "Drop":
      case "Myorep":
        const drops = (set as DropSet | MyorepSet).drops;
        return (
          <>
            <TableRow>
              {/* First spanning cell */}

              <TableCell className="relative cursor-pointer text-2xl md:text-xl font-bold" rowSpan={drops.length}>
                <span className="mr-2">{index + 1}</span>
                {setType === "Drop" && (
                  <Badge className={`absolute top-0 left-0 ${options.Drop.color} w-fit`} variant={"custom"}>
                    {setType}
                  </Badge>
                )}
                {setType === "Myorep" && (
                  <Badge className={`absolute top-0 left-0 ${options.Myorep.color} w-fit`} variant={"custom"}>
                    {setType}
                  </Badge>
                )}
              </TableCell>


              {/* First sub-row */}
              <TableCell >Drop #1</TableCell>
              <TableCell>
                <InputCustom
                  type="number"
                  value={drops[0].weight}
                  onChange={(e) =>
                    inputchangeHandler(index, "drops", {
                      dropIndex: 0,
                      key: "weight",
                      value: e.target.value,
                    })
                  }

                />
              </TableCell>
              <TableCell>
                <InputCustom
                  type="number"
                  value={drops[0].reps}
                  onChange={(e) =>
                    inputchangeHandler(index, "drops", {
                      dropIndex: 0,
                      key: "reps",
                      value: e.target.value,
                    })
                  }

                />
              </TableCell>
              <TableCell className="text-right">
                {`${drops[0].weight * drops[0].reps}lbs`}
              </TableCell></TableRow>
            {renderDropRows(drops)}
          </>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default Set;

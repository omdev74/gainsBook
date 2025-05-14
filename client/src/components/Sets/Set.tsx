import * as React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { InputCustom } from '../ui/InputCustom';
import { WorkoutSet, NormalSet, WarmupSet, DropSet, MyorepSet } from '@shared/types/frontend';
import { Badge } from '../ui/badge';

interface ISetProps {
  set: WorkoutSet; // The set object (this will contain data like reps, weight, etc.)
  index: number; // The index of the set within a specific exercise
  exerciseIndex: number; // The index of the exercise (useful if you need to access the right exercise)
  itemId: string; // The unique identifier for the workout item (e.g., _id)
  inputchangeHandler: (itemId: string, exerciseIndex: number, setIndex: number, field: "reps" | "weight", value: number, dropIndex?: number) => void;
}

const Set: React.FunctionComponent<ISetProps> = ({ set,
  index,
  exerciseIndex,
  itemId,
  inputchangeHandler, }) => {
  const handleInputChange = (key: "reps" | "weight", value: any, dropIndex?: number) => {
    // Assuming we're only changing reps or weight here
    inputchangeHandler(itemId, exerciseIndex, index, key, value, dropIndex);
  };
  const renderDropRows = (drops: { reps: number; weight: number }[]) => (
    <>
      {drops.slice(1).map((drop, dropIndex) => {
        const actualDropIndex = dropIndex + 1; // Because slice(1) removes the first drop
        return (
          <TableRow key={actualDropIndex}>
            <TableCell>{`Drop #${actualDropIndex + 1}`}</TableCell>
            <TableCell>
              <InputCustom
                type="number"
                value={drop.weight}
                onChange={(e) =>
                  handleInputChange("weight", e.target.value, actualDropIndex)
                }
              />
            </TableCell>
            <TableCell>
              <InputCustom
                type="number"
                value={drop.reps}
                onChange={(e) =>
                  handleInputChange("reps", e.target.value, actualDropIndex)
                }
              />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );

  const options = {
    Drop: { shortText: "Drop", color: "border-transparent text-primary-foreground bg-blue-600" },
    Warmup: { shortText: "Warmup", color: "border-transparent text-primary-foreground bg-yellow-600" },
    Myorep: { shortText: "Myorep", color: "border-transparent text-primary-foreground bg-red-600" },
  };

  const renderNormalWarmup = () => (
    <TableRow>
      <TableCell className="relative cursor-pointer text-2xl md:text-xl font-bold" rowSpan={1}>
        <span className="mr-2">{index}</span>
        {set.setType !== "Normal" && (
          <Badge className={`absolute top-0 left-0 ${options.Warmup.color} w-fit`} variant={"custom"}>
            {set.setType}
          </Badge>
        )}
      </TableCell>
      <TableCell>{set.setType === "Normal" ? "It's a Normal" : "It's a Warmup"}</TableCell>
      <TableCell>
        <InputCustom
          type="number"
          value={(set as NormalSet | WarmupSet).weight}
          onChange={(e) => handleInputChange("weight", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <InputCustom
          type="number"
          value={(set as NormalSet | WarmupSet).reps}
          onChange={(e) => handleInputChange("reps", e.target.value)}
        />
      </TableCell>
      <TableCell className="text-right">
        {`${(set as NormalSet | WarmupSet).weight * (set as NormalSet | WarmupSet).reps}lbs`}
      </TableCell>
    </TableRow>
  );

  const renderDropMyorep = () => {
    const drops = (set as DropSet | MyorepSet).drops;
    return (
      <>
        <TableRow>
          <TableCell className="relative cursor-pointer text-2xl md:text-xl font-bold" rowSpan={drops.length}>
            <span className="mr-2">{index}</span>
            {set.setType === "Drop" && (
              <Badge className={`absolute top-0 left-0 ${options.Drop.color} w-fit`} variant={"custom"}>
                {set.setType}
              </Badge>
            )}
            {set.setType === "Myorep" && (
              <Badge className={`absolute top-0 left-0 ${options.Myorep.color} w-fit`} variant={"custom"}>
                {set.setType}
              </Badge>
            )}
          </TableCell>
          <TableCell>Drop #1</TableCell>
          <TableCell>
            <InputCustom
              type="number"
              value={drops[0].weight}
              onChange={(e) => handleInputChange("weight", e.target.value, 0)
              }
            />
          </TableCell>
          <TableCell>
            <InputCustom
              type="number"
              value={drops[0].reps}
              onChange={(e) => handleInputChange("reps", e.target.value, 0)
              }
            />
          </TableCell>
          <TableCell className="text-right" rowSpan={drops.length}>
            {`${drops[0].weight * drops[0].reps}lbs`}
          </TableCell>
        </TableRow>
        {renderDropRows(drops)}
      </>
    );
  };

  const renderContent = () => {
    switch (set.setType) {
      case "Normal":
      case "Warmup":
        return renderNormalWarmup();
      case "Drop":
      case "Myorep":
        return renderDropMyorep();
      default:
        return null;
    }
  };

  return renderContent();
};

export default Set;

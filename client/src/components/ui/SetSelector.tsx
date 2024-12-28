import React, { useState } from "react";
import { Drawer, DrawerTitle, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ISetSelectorProps {
    setNumber: number;
    setType: "Myorep" | "Drop" | "Normal";
    selectorChange: (newType: "Myorep" | "Drop" | "Normal") => void; // Correct type for the callback
    rowSpan: number;
}

// function SetSelector(props: { setNumber: number; }) {
const SetSelector: React.FunctionComponent<ISetSelectorProps> = (props) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(props.setType);

    const options = [
        { value: "Normal", shortText: "R", color: "" },
        { value: "Drop", shortText: "Drop", color: "border-transparent text-primary-foreground bg-blue-600" },
        { value: "Warmup", shortText: "Warmup", color: "border-transparent text-primary-foreground bg-yellow-600" },
        { value: "Myorep", shortText: "Myorep", color: "border-transparent text-primary-foreground bg-red-600" },

    ];

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        // Call the selectorChange callback to update the parent state
        if (["Normal", "Drop", "Myorep"].includes(option)) {
            props.selectorChange(option as "Myorep" | "Drop" | "Normal");
        }
        toggleDrawer(); // Close the drawer after selection
    };

    const selectedOptionObj = options.find((opt) => opt.value === selectedOption);

    return (
        <>
            {/* Dropdown Trigger */}
            <TableCell className="relative cursor-pointer text-xs md:text-sm" onClick={toggleDrawer} rowSpan={props.rowSpan} >
                <span className="mr-2">{props.setNumber}</span>
                {selectedOptionObj && selectedOptionObj.value !== "Normal" && (
                    <Badge className={`absolute top-0 left-0 ${selectedOptionObj.color} w-fit`} variant={"custom"}>
                        {selectedOptionObj.shortText}
                    </Badge>
                )}
            </TableCell>

            {/* Drawer */}
            <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
                <DrawerContent className="sm:p-6 flex flex-col items-center justify-center">
                    <DrawerHeader>
                        <DrawerTitle>Select a Set Type</DrawerTitle>
                    </DrawerHeader>
                    <div className="w-full max-w-sm space-y-2">
                        {options.map((option) => (
                            <Button
                                key={option.value}
                                variant="outline"
                                className={`w-full justify-start h-14 ${selectedOption === option.value ? 'border-blue-500 border-2' : ''}`}
                                onClick={() => handleOptionSelect(option.value)}
                            >
                                <span className="flex-1 text-left">{option.value}</span>
                                {selectedOption === option.value && <Check className="h-4 w-4 text-blue-500" />}
                            </Button>
                        ))}
                    </div>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default SetSelector;

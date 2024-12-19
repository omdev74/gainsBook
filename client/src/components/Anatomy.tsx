import { useState } from "react";
import Svg from "./Svg";

const Anatomy = () => {
    const [selectedMuscles, setSelectedMuscles] = useState<Set<string>>(new Set());
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>();

    // Event handler for clicks
    const handleMuscleClick = (e: React.MouseEvent<SVGElement>) => {
        const target = e.target as SVGElement;
        const muscleId = target.id;
        const parentGroup = target.parentElement;

        if (muscleId) {
            setSelectedMuscles((prevSelected) => {
                const updatedSelection = new Set(prevSelected);
                if (updatedSelection.has(muscleId)) {
                    updatedSelection.delete(muscleId); // Unselect if already selected
                } else {
                    updatedSelection.add(muscleId); // Add to selection
                }
                return updatedSelection;
            });
        } else {
            console.log(parentGroup?.id ?? "No group ID found");
            setSelectedGroup(parentGroup?.id);
        }
    };

    const muscleGroupData = {
        chest: "red",
        abs: "#33ff57",
        forearms: "#3357ff",
        shoulders: "#ff5733",

    };

    return (
        <>
            <Svg

                onClick={handleMuscleClick}
                muscleGroupData={muscleGroupData}
            >
                <g id="back" fill="red"></g>
            </Svg>

            <h3 className="text-primary">{selectedGroup}</h3>


        </>
    );
};

export default Anatomy;

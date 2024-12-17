import { useState } from "react";
import Svg from "../assets/anatomy.svg?react"




const Anatomy = () => {

    const [selectedMuscles, setSelectedMuscles] = useState<Set<string>>(new Set());
    const [selectedGroup, setSelectedGroup] = useState<string>();

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
        }
        else {
            console.log(parentGroup?.id ?? "No group ID found")
            setSelectedGroup(parentGroup?.id)





            // console.log(Svg);

        }
    };



    return (
        <>
            <Svg
                className="interactive-svg "
                onClick={handleMuscleClick}
            />

            <h3 className="color-primary">{selectedGroup}</h3>
        </>
    )
}

export default Anatomy;
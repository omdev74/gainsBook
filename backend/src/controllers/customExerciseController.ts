import CustomExerciseModel from "../models/CustomExercise";
import { Request, Response, NextFunction } from 'express';
const getCustomExercisesByUserId = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = req.user as any; // Cast user to any if you're unsure of the type, otherwise define the correct type.

        if (!user || !user.id) {
            return res.status(401).json({ message: "Unauthorized: User not found in request." });
        }

        // Fetch workouts for the user
        const customExercises = await CustomExerciseModel.find({ userId: user.id }).populate({
            path: 'items.itemData.exercisesAndTheirSets.exerciseRef',
            select: 'name', // Specify fields to retrieve from the User model
        });



        if (!customExercises || customExercises.length === 0) {
            return res.status(200).json({ message: "No customExercises found for this user." });
        }

        res.json({
            message: "Fetched Custom exercises",
            customExercises: customExercises, // Send the fetched Custom exercises in the response
        });
    } catch (error) {
        console.error("Error fetching Custom exercises:", error);
        res.status(500).json({ message: "Error fetching Custom exercises" });
    }
};


export { getCustomExercisesByUserId };

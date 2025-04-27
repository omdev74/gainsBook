import express, { Request, Response } from 'express';
import { register, login} from '../controllers/authController';
import Workout from '../models/Workout';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {createSampleWorkout,getWorkoutsByUserId} from '../controllers/workoutController';
import{getCustomExercisesByUserId} from '../controllers/customExerciseController';
import DefaultExerciseModel from '../models/DefaultExercise';

const router = express.Router();


router.get('/', (req, res) => {
    console.log(req);
    res.json({ message: "Hello this is form the routes" });
});

router.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: "Hello welcome to Protected Route" });
});
// Auth routes

router.post('/register', register);
router.post('/login', login);



// create

// read

//upadte

//delete 

//other

// user
// create

// read

//upadte

//delete 

//other

// workout
// create


router.post("/createsampleworkout",isAuthenticated,createSampleWorkout)
// read

router.get("/workouts", isAuthenticated,getWorkoutsByUserId);


router.get("/customexercises", isAuthenticated,getCustomExercisesByUserId);
router.get('/defaultexercises', async (req, res) => {
    try {
        const exercises = await DefaultExerciseModel.find();  // Fetching all exercises
        res.json(exercises);  // Returning the fetched exercises
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exercises', error });
    }
});


router.get('/api/workout', async (req, res) => {
    try {
        const workouts = await Workout.find();  // Fetching all workouts
        res.json(workouts);  // Returning the fetched workouts
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workouts', error });
    }
});
//upadte

//delete 

//other

// exercises
// create

// read

//upadte

//delete 

//other


export default router;

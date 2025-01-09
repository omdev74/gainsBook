import express, { Request, Response } from 'express'; // Importing the correct types
import Workout from './models/Workout'; // Mongoose model
import validateWorkout from './validators/validation';


import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const dbUri = process.env.DB_URI as string;
const port = process.env.PORT
// mongoose setup
mongoose.connect(dbUri);
console.log('Connected to MongoDB');

const app = express();  // Initialize express app correctly
app.use(express.json()); // Middleware for parsing JSON bodies

// Define a route for GET requests to "/api/workout"
app.get('/api/workout', async (req, res) => {
  const workouts = await Workout.find();  // Fetching all workouts
  res.json(workouts);  // Returning the fetched workouts
});

app.get('/', (req, res) => {
  res.json({ message: "Hello" });
});
// Start the server on port 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

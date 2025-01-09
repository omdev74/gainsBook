import mongoose from 'mongoose';
import UserModel from './models/User';
import DefaultExerciseModel from './models/DefaultExercise';
import CustomExerciseModel from './models/CustomExercise';
import WorkoutModel from './models/Workout';



// Start Test
const runTest = async () => {
    try {
        // Connect to MongoDB (replace with your actual connection string)
        await mongoose.connect('mongodb+srv://Admin1:Admin100@development.nkhc0.mongodb.net/');
        console.log('Connected to MongoDB');

        // // STEP 1: Create Users
        // const user1 = new UserModel({
        //     name: 'John Doe',
        //     email: 'johndoe@example.com',
        //     password: 'securepassword123',
        // });

        // const user2 = new UserModel({
        //     name: 'Jane Smith',
        //     email: 'janesmith@example.com',
        //     password: 'anotherpassword456',
        // });

        // // // Save users
        // // await user1.save();
        // // await user2.save();
        // // console.log('Users created successfully');

        // // // STEP 2: Create Default Exercises
        // const defaultExercise1 = new DefaultExerciseModel({
        //     name: 'Push-Up',
        //     difficulty: 'Beginner',
        //     equipment: 'Bodyweight',
        //     instructions: 'Lower your body and push up.',
        //     muscle: 'Chest',
        //     type: 'Strength',
        // });

        // const defaultExercise2 = new DefaultExerciseModel({
        //     name: 'Squat',
        //     difficulty: 'Intermediate',
        //     equipment: 'Barbell',
        //     instructions: 'Stand with feet shoulder-width apart and squat.',
        //     muscle: 'Legs',
        //     type: 'Strength',
        // });

        // // // Save Default Exercises
        // // await defaultExercise1.save();
        // // await defaultExercise2.save();
        // // console.log('Default Exercises created successfully');

        // // // STEP 3: Create Custom Exercises
        // const customExercise1 = new CustomExerciseModel({
        //     name: 'Custom Deadlift',
        //     equipment: 'Dumbbells',
        //     muscle: 'Back',
        //     type: 'Strength',
        //     userId: user1._id, // Reference to user1
        // });

        // const customExercise2 = new CustomExerciseModel({
        //     name: 'Custom Lunges',
        //     equipment: 'Bodyweight',
        //     muscle: 'Legs',
        //     type: 'Strength',
        //     userId: user2._id, // Reference to user2
        // });

        // // Save Custom Exercises
        // await customExercise1.save();
        // await customExercise2.save();
        // console.log('Custom Exercises created successfully');

        // // STEP 4: Query and Log the created data
        // const users = await UserModel.find().exec();
        // const defaultExercises = await DefaultExerciseModel.find().exec();
        // const customExercises = await CustomExerciseModel.find().exec();

        // console.log('Users:', users);
        // console.log('Default Exercises:', defaultExercises);
        // console.log('Custom Exercises:', customExercises);




        // STEP 3: Create a Workout for user1
        // const workout = new WorkoutModel({
        //     userId: user1._id,  // Reference to user1
        //     date: new Date(),
        //     notes: 'Upper body workout focusing on chest and triceps.',
        //     items: [
        //         {
        //             itemType: 'Regular',
        //             itemData: {
        //                 exercisesAndThereSets: [
        //                     {
        //                         exerciseRef: defaultExercise1._id, // Reference to Push-Up exercise
        //                         exerciseType: 'DefaultExercise',
        //                         sets: [
        //                             {
        //                                 index: 1,
        //                                 setType: 'Normal',
        //                                 reps: 12,
        //                                 weight: 0,
        //                                 volume: 0,  // Volume can be calculated dynamically based on reps and weight
        //                             },
        //                         ],
        //                     },
        //                 ],
        //             },
        //         },
        //         {
        //             itemType: 'Superset',
        //             itemData: {
        //                 exercisesAndThereSets: [
        //                     {
        //                         exerciseRef: defaultExercise2._id, // Reference to Squat exercise
        //                         exerciseType: 'DefaultExercise',
        //                         sets: [
        //                             {
        //                                 index: 1,
        //                                 setType: 'Normal',
        //                                 reps: 10,
        //                                 weight: 50,
        //                                 volume: 500, // Volume example (reps * weight)
        //                             },
        //                         ],
        //                     },
        //                     {
        //                         exerciseRef: customExercise1._id, // Reference to Squat exercise
        //                         exerciseType: 'CustomExercise',
        //                         sets: [
        //                             {
        //                                 index: 1,
        //                                 setType: 'Normal',
        //                                 reps: 10,
        //                                 weight: 50,
        //                                 volume: 500, // Volume example (reps * weight)
        //                             },
        //                         ],
        //                     },
        //                 ],
        //             },
        //         },
        //     ],
        // });

        // // Save Workout
        // await workout.save();
        // console.log('Workout created successfully');
        const user1 = await UserModel.find({ name: "John Doe" })

        const display = await WorkoutModel.find({ userId: user1[0]._id });
        console.log(display);
        console.log(user1[0]._id); // Correctly access the _id of the first user in the array

    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        // Close the connection after the test
        mongoose.connection.close();
        console.log('Connection closed');
    }
};

// Run the test
runTest();

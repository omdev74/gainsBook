import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const dbUri = process.env.DB_URI; // Load DB URI from environment variables
        if (!dbUri) {
            throw new Error("DB_URI is not defined in the environment variables");
        }

        await mongoose.connect(dbUri, {
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        }
        else {
            console.error("Unknown error occurred:", error);
        }
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
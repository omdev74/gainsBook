


import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/routes';
import { a } from './sampeText';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';  // Import cors
dotenv.config();
import 'tsconfig-paths/register';

// Passport configuration must be imported before passport.initialize()
import './config/passportConfig';  // Ensure passport strategies are loaded before middleware setup
const app = express();

// Enable CORS for all routes
app.use(cors());


// Session middleware - Ensure this is configured before passport
app.use(
    session({
        secret: process.env.SECRET_KEY as string,
        resave: false,
        saveUninitialized: false,
    })
);

// Initialize Passport after session setup
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());  // Middleware for parsing JSON bodies
app.use("/", router);  // Use routes for all requests

console.log(a);

export default app;
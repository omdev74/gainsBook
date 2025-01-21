import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/routes';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
dotenv.config();
import 'tsconfig-paths/register';
import './config/passportConfig';

const app = express();

// Enable CORS for specific origin
app.use(
  cors({
    origin: 'https://gainsbook.netlify.app', // Allow only your Netlify frontend
    credentials: true, // Allow cookies and headers for authentication
  })
);

// Session middleware
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

// Middleware for parsing JSON bodies
app.use(express.json());

// Use routes for all requests
app.use("/", router);

export default app;

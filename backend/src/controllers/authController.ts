import { Request, Response } from 'express';
import UserModel from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';


// Controller for user registration
export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Controller for user login
export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: `Invalid email or password ${email}` });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Login error:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};



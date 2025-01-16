import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided.' });
    return; // Exit the middleware early
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Verify the token
    req.user = decoded; // Attach the decoded token payload to req.user for use in the route
    next();
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized: Invalid or expired token.' });
  }
};

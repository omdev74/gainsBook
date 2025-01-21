import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/User';

// Define a type for JWT payload
interface JwtPayload {
  id: string;
}

// JWT Strategy (for token verification)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string, // Ensure this is in your .env
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload: JwtPayload, done:any) => {
    try {
      // Find the user by ID in the JWT payload
      const user = await UserModel.findById(jwtPayload.id);
      if (user) {
        return done(null, user); // Token is valid, user found
      } else {
        return done(null, false); // Token is invalid or user no longer exists
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

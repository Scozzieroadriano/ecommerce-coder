import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";    
import UserService from "../services/user.services.js";
import 'dotenv/config';
const userService = new UserService();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

const strategyOptions = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    scope: ["profile", "email"],
    state: true,
}

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
try {

    const newUser = {
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        email: profile._json.email,
        password: profile.id,
        role: 'user'

    }
    const token = await userService.authGoogle(newUser);
    done(null, token);
} catch (error) {
    console.log(error);
}
}

passport.use('google', new GoogleStrategy(strategyOptions, registerOrLogin));

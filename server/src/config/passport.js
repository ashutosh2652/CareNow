import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { config } from "./env.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";

export default function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.CLIENT_ID,
                clientSecret: config.CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback",
                scope: [
                    "email",
                    "profile",
                    "openid",
                    "https://www.googleapis.com/auth/user.phonenumbers.read",
                ],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await User.findOne({ googleId: profile.id });
                    if (user) return done(null, user);
                    else {
                        const phone =
                            profile._json.phoneNumbers?.[0]?.value || "";
                        const NewUser = new User({
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            fullName: profile.displayName,
                            phone,
                            avatar: {
                                isFromCloudinary: false,
                                url: profile.photos[0].value,
                            },
                            role: "patient",
                            bio: "",
                            isEmailVerified: true,
                        });
                        await NewUser.save();
                        return done(null, NewUser);
                    }
                } catch (error) {
                    console.log(error);
                    done(error, null);
                }
            }
        )
    );
}
passport.serializeUser((user, done) => {
    done(null, user?._id ?? null);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select(
            "-password -__v  -resetPasswordExpiry -resetPasswordToken -emailVerificationExpiry -emailVerificationToken"
        );
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

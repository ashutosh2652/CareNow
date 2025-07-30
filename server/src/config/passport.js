import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { config } from "./env.js";
import { User } from "../models/User.models.js";

export default function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.CLIENT_ID,
                clientSecret: config.CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback",
                scope: ["email", "profile", "openid"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = User.findOne({ googleId: profile.id });
                    if (user) done(null, user);
                    else {
                        const NewUser = new User({
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            fullName: profile.displayName,
                            avatar: {
                                isFromCloudinary: false,
                                url: profile.photos[0].value,
                            },
                            role: "user",
                            bio: "",
                            isEmailVerified: true,
                        });
                        await NewUser.save();
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
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select("-password");
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

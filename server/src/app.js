import express from "express";
import cors from "cors";
import cors_option from "./config/cors.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";
import MongoStore from "connect-mongo";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import passportConfig from "./config/passport.js";
import { config } from "./config/env.js";
import VerifySession from "./middleware/VerifySession.middleware.js";
const app = express();
app.use(cors(cors_option));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
        "Too many requests from this IP, please try again after 10 minutes",
});
passportConfig(passport);
app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: config.NODE_ENV === "production",
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(VerifySession);
app.use("/api", limiter);
app.use("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        success: true,
        date: new Date.toISOString(),
        timezone: "IST",
    });
});

import Authroutes from "./routes/Auth.routes.js";
app.use("/api/auth", Authroutes);

app.use((req, res, next) => {
    res.status(400).json(
        new ApiError(400, `Route not found for ${req.originalUrl}`)
    );
});

app.use(globalErrorHandler);
export { app };

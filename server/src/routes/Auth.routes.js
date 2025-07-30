import express from "express";
import {
    googleAuth,
    googleAuthCallback,
    googleCallbackRedirect,
    getUser,
    RegisterUser,
    LoginUser,
    logoutUser,
} from "../controllers/Auth.controllers.js";
const router = express.Router();
router.route("/google").get(googleAuth);
router
    .route("/google/callback")
    .get(googleAuthCallback, googleCallbackRedirect);
router.route("/user").get(getUser);
router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(logoutUser);
export default router;

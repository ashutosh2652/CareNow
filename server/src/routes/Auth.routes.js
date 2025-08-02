import express from "express";
import {
    googleAuth,
    googleAuthCallback,
    googleCallbackRedirect,
    getUser,
    RegisterUser,
    LoginUser,
    logoutUser,
    verifyEmailId,
    regenerateVerificationEmailToken,
    generateVerificationPasswordToken,
    checkPasswordTokenAndUpdatePassword,
    updateProfilePicture,
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
router.route("/verify-email/:token").post(verifyEmailId);
router
    .route("/resend-verification-email-token")
    .post(regenerateVerificationEmailToken);
router
    .route("/resend-verification-password-token")
    .post(generateVerificationPasswordToken);
router
    .route("/change-password/:token")
    .patch(checkPasswordTokenAndUpdatePassword);
router.route("/update-profile-picture").patch(updateProfilePicture);
export default router;

import passport from "passport";
import { config } from "../config/env.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import SendEmail from "../services/email.js";
import { getpublicIdAndFileType } from "../utils/file_type.js";
import {
    deleteImageFromCloudinary,
    uploadImageToCloudinary,
} from "../services/fileStorage.services.js";

import crypto from "crypto";

function generateVerificationToken() {
    return crypto.randomBytes(32).toString("hex");
}
const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});
const googleAuthCallback = passport.authenticate("google", {
    failureRedirect: `${config.CLIENT_URL_PATIENT}/login/failed`,
    session: true,
});
const googleCallbackRedirect = (req, res) => {
    const role = req.user.role.toUpperCase();
    const successRedirectUrl = config[`CLIENT_URL_${role}`] + "/";
    res.redirect(successRedirectUrl);
};
const getUser = (req, res) => {
    if (req.user) {
        return res
            .status(200)
            .json(new ApiResponse(200, req.user, "User is authenticated!"));
    } else {
        res.status(401).json(new ApiError(401, "User is unauthenticated"));
    }
};
const RegisterUser = async (req, res, next) => {
    try {
        // console.log(req, "body!");

        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName)
            return next(new ApiError(400, "Please enter valid details!"));
        const user = await User.findOne({ email });
        console.log(user, "user");

        if (user)
            return next(
                new ApiError(400, "This email already exist.Try some new email")
            );
        const emailVerificationToken = generateVerificationToken();
        const emailVerificationExpiry = Date.now() + 60 * 60 * 1000;
        const newUser = await User.create({
            email,
            password,
            fullName,
            emailVerificationToken,
            emailVerificationExpiry,
        });
        SendEmail(email, fullName, emailVerificationToken, "verifyEmail");
        req.login(newUser, (err) => {
            if (err) return next(err);
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        newUser,
                        "User Account Created Successfully!"
                    )
                );
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json(
                    new ApiError(400, "Please provide valid email and password")
                );
        const user = await User.findOne({ email });
        if (!user)
            return next(
                new ApiError(400, "User doesn't exist with given email")
            );
        if (!user.password)
            return next(new ApiError(400, "Please login with google!"));
        if (!user.isPasswordCorrect(password))
            return next(new ApiError(400, "Please provide correct password!"));
        if (!user.isEmailVerified)
            return next(
                new ApiError(
                    400,
                    "Please verify your email first to login to account!"
                )
            );
        req.login(user, (err) => {
            if (err) return next(err);
            res.status(200).json(
                new ApiResponse(200, user, "Logged In successfully!")
            );
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
const verifyEmailId = async (req, res, next) => {
    try {
        const { email, token } = req.body;
        if (!email) return next(new ApiError(400, "Please provide emailId"));
        if (!token)
            return next(
                new ApiError(400, "Please provide verification code to verify!")
            );
        const currentDate = Date.now();
        const user = await User.findOne({ email });
        if (!user)
            return next(
                new ApiError(400, "User with provided email doesnot exist!")
            );
        if (token != user.emailVerificationToken)
            return next(
                new ApiError(400, "Wrong verification token provided!")
            );
        const difference = currentDate - user.emailVerificationExpiry;
        if (difference > 0) {
            return next(
                new ApiError(400, "Token is already expired! Please try again!")
            );
        }
        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationExpiry = null;
        await user.save();
        req.login(user, (err) => {
            if (err) return next(err);
        });
        res.status(200).json(
            new ApiResponse(200, user, "Email verified successfully!")
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};
const regenerateVerificationEmailToken = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return next(
                new ApiError(400, "No user exist with provided email!")
            );
        if (email.isEmailVerified)
            return next(new ApiError(400, "Email is already verified!"));

        const emailVerificationToken = generateVerificationToken();
        const emailVerificationExpiry = Date.now() + 60 * 60 * 1000;
        user = { ...user, emailVerificationExpiry, emailVerificationToken };
        await user.save();
        SendEmail(email, fullName, emailVerificationToken, "verifyEmail");
        res.status(200).json(
            new ApiResponse(
                200,
                user,
                "New verification code is sent to your email"
            )
        );
    } catch (error) {
        console.error(error);

        next(error);
    }
};
const generateVerificationPasswordToken = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return next(
                new ApiError(400, "No user exist with provided email!")
            );

        const resetPasswordToken = generateVerificationToken();
        const resetPasswordExpiry = Date.now() + 60 * 60 * 1000;
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiry = resetPasswordExpiry;
        user.resetPasswordVerified = false;
        await user.save();
        SendEmail(email, fullName, resetPasswordToken, "resetPassword");
        res.status(200).json(
            new ApiResponse(
                200,
                user,
                "New verification code is sent to your email"
            )
        );
    } catch (error) {
        console.error(error);

        next(error);
    }
};
const checkPasswordToken = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { email } = req.body;
        if (!token) return next(new ApiError(400, "Please provide Token"));
        if (!email) return next(new ApiError(400, "Please provide email!"));
        const user = await User.findOne({ email });
        if (!user)
            return next(new ApiError(400, "No user found with given email!"));
        if (token != user.resetPasswordToken)
            return next(new ApiError(400, "Wrong token entered"));
        if (Date.now() > user.resetPasswordExpiry)
            return next(
                new ApiError(400, "Reset password token is already expired!")
            );
        user.resetPasswordVerified = true;
        await user.save();
        res.status(200).json(
            new ApiResponse(
                200,
                user,
                "Reset password token verified successfully!"
            )
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
};
const changeCurrentPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword)
            return next(
                new ApiError(400, "Please provide valid email and password!")
            );
        const user = await User.findOne({ email, resetPasswordVerified: true });
        if (!user) return next(new ApiError(400, "User doesnot find!"));
        user.resetPasswordVerified = false;
        user.password = newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;
        await user.save();
        const { password, ...newUser } = user._doc;
        res.status(200).json(
            new ApiResponse(200, newUser, "Password Saved Successfully!")
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
};
const updateProfilePicture = async (req, res, next) => {
    const user = req.user;
    if (!user)
        return next(
            new ApiError(400, "Please login first to use this service!")
        );
    if (user.avatar.isFromCloudinary) {
        const { publicId, Type } = getpublicIdAndFileType(user.avatar.url);
        const response = await deleteImageFromCloudinary({ publicId, Type });
        if (!response)
            return next(
                new ApiError(
                    500,
                    "Some error occured while deleting image from cloudinary!"
                )
            );
    }
    const avatarlocalfilePath = req.file?.path;
    if (!avatarlocalfilePath) return next(new ApiError(400, "No image found!"));
    const response = await uploadImageToCloudinary(avatarlocalfilePath);
    if (!response || !response.url)
        return next(
            new ApiError(
                500,
                "Some error occured while uploading image from cloudinary!"
            )
        );
    const newUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                "avatar.url": response.url,
                "avatar.isFromCloudinary": true,
            },
        },
        {
            new: true,
            select: "-password -__v -resetPasswordVerified -resetPasswordExpiry -resetPasswordToken -emailVerificationExpiry -emailVerificationToken",
        }
    );
    if (!newUser)
        return next(
            new ApiError(
                500,
                "Some error occured while uploading image to cloudinary!"
            )
        );
    res.status(200).json(
        new ApiResponse(200, newUser, "User Avatar updated successfully!")
    );
};
const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy((err) => {
            if (err) return next(err);
            req.clearCookie("connect.sid");
            res.status(200).json(
                new ApiResponse(200, {}, "Logged out Successfully!")
            );
        });
    });
};
export {
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
    changeCurrentPassword,
    checkPasswordToken,
};

import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
            match: [/\S+\@+\S+\.\S+/, "invalid"],
        },
        password: {
            type: String,
            // required: [true, "Password is required"],
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            isFromCloudinary: {
                type: Boolean,
                default: false,
            },
            url: {
                type: String,
                default:
                    "data:image/png;base64,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",
            },
        },
        role: {
            type: String,
            enum: ["user", "admin", "doctor"],
            default: "user",
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 250,
            default: "",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpiry: {
            type: Date,
        },
        accountStatus: {
            type: String,
            enum: ["active", "banned"],
            default: "active",
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);

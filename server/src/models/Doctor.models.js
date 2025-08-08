import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["approved", "suspended"],
            default: "approved",
        },
        specializations: [{ type: String, required: true }],
        qualifications: [
            {
                degree: { type: String, required: true },
                institution: { type: String, required: true },
                year: { type: String, required: true },
            },
        ],
        experienceInYears: {
            type: Number,
            required: true,
            default: 0,
        },
        consultationFee: { type: Number, default: 0 },
        clinicInfo: {
            name: { type: String, required: true },
            address: { type: String, required: true },
            location: {
                type: { type: String, enum: ["Point"], default: "Point" },
                coordinates: { type: [Number], index: "2dsphere" },
            },
        },
        availability: [
            {
                dayOfWeek: {
                    type: String,
                    enum: [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thrusday",
                        "Friday",
                        "Saturday",
                    ],
                },
                IsAvailable: { type: Boolean, default: true },
                slots: {
                    startTime: { type: String },
                    endTime: { type: String },
                },
            },
        ],
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        totalRating: {
            type: Number,
            default: 0,
        },
        documents: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);
export const Doctor = mongoose.model("Doctor", DoctorSchema);

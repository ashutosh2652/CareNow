import mongoose from "mongoose";
const PatientSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            required: true,
            unique: true,
            index: true,
        },
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            required: true,
        },
        height: {
            value: Number,
            unit: { type: String, enum: ["cm", "inch"], default: "cm" },
            required: true,
        },
        weight: {
            value: Number,
            unit: { type: String, enum: ["kg", "lbs"], default: "kg" },
            required: true,
        },
        allergies: [{ type: String }],
        medicalHistory: [
            {
                condition: { type: String, required: true },
                doctor: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Doctor",
                    required: true,
                },
                diagnosedDate: { type: Date, default: Date.now },
                notes: String,
            },
        ],
        currentMedication: [
            {
                name: { type: String, required: true },
                dosage: String,
                frequency: String,
            },
        ],
        emergencyContact: {
            name: String,
            relation: String,
            phone: String,
            required: true,
        },
    },
    { timestamps: true }
);
export const Patient = mongoose.model("Patient", PatientSchema);

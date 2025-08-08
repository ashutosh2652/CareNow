import mongoose from "mongoose";
const PrescriptionSchema = new mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.ObjectId,
            ref: "Appointment",
            required: true,
        },
        medication: [
            {
                name: { type: String, required: true },
                dosage: { type: String, required: true },
                frequency: { type: String, required: true },
                duration: { type: String, required: true },
            },
        ],
        startDate: { type: Date, default: Date.now },
        isActive: { type: Boolean, default: true },
        doctorNotes: { type: String, select: false },
    },
    { timestamps: true }
);
export const Prescription = mongoose.model("Prescription", PrescriptionSchema);

import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.ObjectId,
            ref: "Doctor",
            required: true,
        },
        patient: {
            type: mongoose.Schema.ObjectId,
            ref: "Patient",
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        appointmentSlot: {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        },
        status: {
            type: String,
            enum: [
                "scheduled",
                "completed",
                "cancelled_by_patient",
                "cancelled_by_doctor",
            ],
            default: "scheduled",
        },
        meetingType: {
            type: String,
            enum: ["online", "in-person"],
            required: true,
        },
        symptoms: { type: String },
        previousMedicalRecords: [{ type: String }],
        paymentDetails: {
            transactionId: String,
            status: {
                type: String,
                enum: ["pending", "successfull", "failed"],
                default: "pending",
            },
            amount: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
);
export const Appointment = mongoose.model("Appointment", AppointmentSchema);

import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
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
    appointment: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
        required: true,
        unique: true,
    },
    comment: { type: String },
    rating: { type: Number, min: 0, max: 5, required: true },
});
export const Review = mongoose.model("Review", ReviewSchema);

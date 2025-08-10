import { Appointment } from "../models/Appointment.models.js";
import { Doctor } from "../models/Doctor.models.js";
import { Review } from "../models/Review.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addReview = async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const { rating, comment } = req.body;
        if (!appointmentId)
            return next(new ApiError(404, "AppointmentId not found!"));
        if (!req.user) return next(new ApiError(400, "Please login first!"));
        const appointment = await Appointment.findById(appointmentId).populate(
            "patient",
            "user"
        );
        if (!appointment)
            return next(
                new ApiError(
                    404,
                    "Appointment not found with the provided appointmentId"
                )
            );
        if (appointment.patient.user.toString() !== req.user._id) {
            return next(
                new ApiError(
                    403,
                    "Forbidden you are not allowed to write comment in this!"
                )
            );
        }
        const existingReview = await Review.findOne({
            appointment: appointmentId,
        });
        if (existingReview)
            return next(
                new ApiError(409, "You have already provided review for this!")
            );
        const review = await Review.create({
            doctor: appointment.doctor,
            patient: appointment.patient,
            appointment: appointmentId,
            comment,
            rating,
        });
        const doctor = await Doctor.findById(appointment.doctor).select(
            "totalRating averageRating"
        );
        const averageRating =
            (doctor.totalRating * doctor.averageRating + rating) /
            (doctor.totalRating + 1);
        await Doctor.findByIdAndUpdate(appointment.doctor, {
            averageRating,
            totalRating: doctor.totalRating + 1,
        });
        res.status(201).json(
            new ApiResponse(201, review, "Thank you for your Review!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(400, error.message));
    }
};

const getReviewOfDoctor = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId)
            return next(new ApiError(404, "Please provide doctorId"));
        const getAllReview = await Review.find({ doctor: doctorId }).select(
            "+comment +rating"
        );
        res.status(200).json(
            new ApiResponse(200, getAllReview, "Review fetched successfully!")
        );
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, error.message));
    }
};
export { addReview, getReviewOfDoctor };

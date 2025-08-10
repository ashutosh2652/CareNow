import { Appointment } from "../models/Appointment.models.js";
import { Patient } from "../models/Patient.models.js";
import { Prescription } from "../models/Prescription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const AddPresecription = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { medication, startDate, doctorNotes, condition, notes } =
            req.body;
        if (!req.user) return next(new ApiError(400, "Please login first!"));
        if (req.user.role !== "doctor")
            return next(
                new ApiError(400, "You are not allowed to give prescription!")
            );
        if (!id)
            return next(new ApiError(400, "Please provide Appointment id"));
        if (!condition || !notes)
            return next(
                new ApiError(400, "Please provide condition and notes!")
            );
        const doctorProfile = await Doctor.findOne({ user: req.user._id });
        if (!doctorProfile) {
            return next(new ApiError(404, "Doctor profile not found."));
        }
        const appointment = await Appointment.findOne({
            _id: id,
            doctor: doctorProfile._id,
        }).populate([
            { path: "patient", select: "user" },
            { path: "doctor", select: "user" },
        ]);
        if (!appointment)
            return next(
                new ApiError(
                    400,
                    "Either appointment is not found or you are not allowed to give presecription!"
                )
            );
        const History = {
            condition,
            doctor: doctorProfile._id,
            notes,
        };
        await Patient.findByIdAndUpdate(appointment.patient._id, {
            $push: { medicalHistory: History },
        });
        const prescriptiondetails = {};

        if (Array.isArray(medication) && medication.length > 0)
            prescriptiondetails.medication = medication;
        if (startDate) {
            const parsedDate = new Date(startDate);
            if (isNaN(parsedDate.getTime()))
                return next(
                    new ApiError("Please provide Date in valid format!")
                );
            prescriptiondetails.startDate = parsedDate;
        }
        if (doctorNotes) prescriptiondetails.doctorNotes = doctorNotes;
        const prescription = await Prescription.create({
            appointment: id,
            ...prescriptiondetails,
        });
        if (!prescription)
            return next(
                new ApiError(
                    500,
                    "Some error occured while creating prescription!"
                )
            );
        res.status(200).json(
            new ApiResponse(
                200,
                prescription,
                "Prescription added successfully!"
            )
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const getPrescription = async (req, res, next) => {
    try {
        const { id: appointmentId } = req.params;

        const appointment =
            await Appointment.findById(appointmentId).populate(
                "patient doctor"
            );
        if (!appointment) {
            return next(new ApiError(404, "Appointment not found."));
        }

        const isPatient =
            appointment.patient.user.toString() === req.user._id.toString();
        const isDoctor =
            appointment.doctor.user.toString() === req.user._id.toString();

        if (!isPatient && !isDoctor && req.user.role !== "admin") {
            return next(
                new ApiError(
                    403,
                    "Forbidden: You are not authorized to view this prescription."
                )
            );
        }
        let prescriptionQuery = Prescription.findOne({
            appointment: appointmentId,
        });

        if (isDoctor || req.user.role === "admin") {
            prescriptionQuery.select("+doctorNotes");
        }
        const prescription = await prescriptionQuery;
        if (!prescription) {
            return next(
                new ApiError(404, "No prescription found for this appointment.")
            );
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    prescription,
                    "Prescription fetched successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
export { AddPresecription, getPrescription };

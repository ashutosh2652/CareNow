import { Appointment } from "../models/Appointment.models.js";
import { Doctor } from "../models/Doctor.models.js";
import { Patient } from "../models/Patient.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const CreateNewAppointment = async (req, res, next) => {
    try {
        if (!req.user)
            return next(
                new ApiError(400, "Please login first to book appointment!")
            );
        const { id } = req.params;
        const {
            appointmentDate,
            appointmentSlot,
            meetingType,
            symptoms,
            previousMedicalRecords,
        } = req.body;
        const patient = await Patient.findOne({ user: req.user._id });
        if (!patient)
            return next(
                new ApiError(400, "Please fill patient details first!")
            );
        const parsedDate = new Date(appointmentDate);
        if (isNaN(parsedDate.getTime()))
            return next(
                new ApiError(400, "Please provide valid date of appointment!")
            );
        if (parsedDate < new Date())
            return next(new ApiError(400, "Cannot book appointment in past!"));
        const requiredfield = ["appointmentSlot", "meetingType", "symptoms"];
        const missingfield = requiredfield.filter(
            (field) =>
                req.body[field] === undefined ||
                req.body[field] === null ||
                req.body[field] === ""
        );
        if (missingfield.length > 0)
            return next(
                new ApiError(
                    400,
                    `Please fill all the fields, missing fields: ${missingfield.join(", ")}`
                )
            );
        if (!id) return next(new ApiError(400, "Please provide doctor id"));
        const daysofWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const requiredday = daysofWeek[parsedDate.getDay()];
        const availableDoctor = await Doctor.findOne({
            _id: id,
            status: "approved",
            availability: {
                $elemMatch: {
                    dayOfWeek: requiredday,
                    IsAvailable: true,
                    "slots.startTime": appointmentSlot.startTime,
                },
            },
        });
        if (!availableDoctor)
            return next(400, "Doctor is not available in that time!");
        const alreadyscheduledappointment = await Appointment.findOne({
            doctor: availableDoctor._id,
            appointmentDate: parsedDate,
            "appointmentSlot.startTime": appointmentSlot.startTime,
            status: { $nin: ["cancelled_by_patient", "cancelled_by_doctor"] },
        });
        if (alreadyscheduledappointment)
            return next(new ApiError(400, "This slot is already booked!"));
        const remainingfields = {};
        if (previousMedicalRecords && Array.isArray(previousMedicalRecords)) {
            remainingfields.previousMedicalRecords = previousMedicalRecords;
        }
        remainingfields.paymentDetails = {
            transactionId: "",
            status: "pending",
            amount: availableDoctor.consultationFee,
        };
        const appointment = await Appointment.create({
            doctor: id,
            patient: patient._id,
            appointmentDate: parsedDate,
            appointmentSlot,
            meetingType,
            symptoms,
            ...remainingfields,
        });
        res.status(201).json(
            new ApiResponse(
                201,
                appointment,
                "Appointment booked successfully!"
            )
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const cancelAppointmentByPatient = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!req.user) return next(new ApiError(400, "Please login first!"));
        if (!id)
            return next(new ApiError(400, "Please provide Appointment Id"));
        const appointment = await Appointment.findById(id).populate(
            "patient",
            "user"
        );
        if (!appointment)
            return next(new ApiError(400, "No such appointment exist!"));
        if (req.user._id.toString() != appointment.patient.user.toString())
            return next(
                new ApiError(
                    401,
                    "You are not authorized to cancel this appointment!"
                )
            );
        const currentDate = new Date();
        const appointmentappointmentDate = new Date(
            appointment.appointmentDate
        );
        const difference =
            (currentDate - appointmentappointmentDate) / (60 * 60 * 1000);
        if (difference < 24)
            return next(
                new ApiError(
                    400,
                    "Cannot cancel a appointment in less than 24 hour in advance!"
                )
            );
        if (appointment.status.split("-")[0] === "cancelled")
            return next(new ApiError(400, "Appointment is already cancelled!"));
        const cancelledappointment = await Appointment.findByIdAndUpdate(
            id,
            {
                status: "cancelled_by_patient",
            },
            { new: true }
        );
        if (!cancelledappointment)
            return next(
                new ApiError(400, "Error occured while cancelling appointment!")
            );
        res.status(200).json(
            new ApiResponse(200, cancelledappointment, "Appointment cancelled!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(400, error.message));
    }
};
const cancelAppointmentByDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!req.user) return next(new ApiError(400, "Please login first!"));
        if (!id)
            return next(new ApiError(404, "Please provide Appointment Id"));
        const appointment = await Appointment.findById(id).populate(
            "doctor",
            "user"
        );
        if (!appointment)
            return next(new ApiError(400, "No such appointment exist!"));
        if (req.user._id.toString() != appointment.doctor.user.toString())
            return next(
                new ApiError(
                    401,
                    "You are not authorized to cancel this appointment!"
                )
            );
        if (appointment.status.split("-")[0] === "cancelled")
            return next(new ApiError(400, "Appointment is already cancelled!"));
        const cancelledappointment = await Appointment.findByIdAndUpdate(
            id,
            {
                status: "cancelled_by_doctor",
            },
            { new: true }
        );
        if (!cancelledappointment)
            return next(
                new ApiError(400, "Error occured while cancelling appointment!")
            );
        res.status(200).json(
            new ApiResponse(200, cancelledappointment, "Appointment cancelled!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(400, error.message));
    }
};
const getAllApointment = async (req, res, next) => {
    try {
        if (!req.user) return next(new ApiError(400, "Please login first!"));
        const query = {};
        const { _id: userId, role } = req.user;
        if (role === "doctor") {
            const doctor = await Doctor.findOne({ user: userId });
            query.doctor = doctor._id;
        } else {
            const patient = await Patient.findOne({ user: userId });
            query.patient = patient._id;
        }
        const allAppointment = await Appointment.find(query)
            .populate("patient")
            .populate("doctor", "-documents -status");
        res.status(200).json(
            new ApiResponse(
                200,
                allAppointment,
                "All appointment fetched successfully!"
            )
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const completedFixedAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!req.user) return next(new ApiError(400, "Please login first!"));
        if (!id)
            return next(
                new ApiError(404, "Please provide appointment id to cancel!")
            );
        const appointment = await Appointment.findOneAndUpdate(
            { doctor: req.user._id, _id: id },
            { status: "completed" },
            { new: true, runValidators: false }
        );
        if (!appointment)
            return next(new ApiError(404, "No appointment found!"));
        res.status(200).json(
            new ApiResponse(
                200,
                appointment,
                "Appointment status updated successfully!"
            )
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, error.message));
    }
};
export {
    CreateNewAppointment,
    cancelAppointmentByPatient,
    cancelAppointmentByDoctor,
    getAllApointment,
    completedFixedAppointment,
};

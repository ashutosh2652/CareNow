import { Patient } from "../models/Patient.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPatientDetails = async (req, res, next) => {
    try {
        if (!req.user) return next(new ApiError(400, "Please login first!"));
        const currentPatient = await Patient.findOne({ user: req.user._id });
        if (currentPatient)
            return next(
                new ApiError(
                    400,
                    "Patient already exist with the current user!"
                )
            );
        const {
            bloodGroup,
            height,
            weight,
            allergies,
            gender,
            dob,
            currentMedication,
            emergencyContact,
        } = req.body;
        const requiredFields = [
            "bloodGroup",
            "height",
            "weight",
            "gender",
            "dob",
            "emergencyContact",
        ];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return next(
                    new ApiError(400, `Missing required field: ${field}`)
                );
            }
        }
        const requiredfields = {};
        if (allergies && Array.isArray(allergies)) {
            requiredfields.allergies = allergies;
        }
        if (currentMedication && Array.isArray(currentMedication)) {
            requiredfields.currentMedication = currentMedication;
        }
        const patient = await Patient.create({
            user: req.user._id,
            bloodGroup,
            height,
            weight,
            gender,
            dob,
            emergencyContact,
            ...requiredfields,
        });
        res.status(201).json(
            new ApiResponse(201, patient, "Patient details added successfully!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const updatePatientDetails = async (req, res, next) => {
    try {
        const {
            bloodGroup,
            height,
            weight,
            allergies,
            currentMedication,
            emergencyContact,
        } = req.body;
        if (!req.user) return next(new ApiError(400, "Please login first!"));

        const updatedDetails = {};
        if (bloodGroup) updatedDetails.bloodGroup = bloodGroup;
        if (height) updatedDetails.height = height;
        if (weight) updatedDetails.weight = weight;
        if (allergies) updatedDetails.allergies = allergies;
        if (emergencyContact)
            updatedDetails.emergencyContact = emergencyContact;
        if (currentMedication && Array.isArray(currentMedication))
            updatedDetails.currentMedication = currentMedication;
        const patient = await Patient.findOneAndUpdate(
            { user: req.user._id },
            { ...updatedDetails },
            { new: true }
        );
        if (!patient) return next(new ApiError(400, "No patient found!"));
        res.status(200).json(
            new ApiResponse(200, patient, "Details updated successfully!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const getPatientDetails = async (req, res, next) => {
    try {
        if (!req.user)
            return next(
                new ApiError(400, "You are not allowed to access this!")
            );
        const { _id: userId } = req.user;
        const patient = await Patient.findOne({ user: userId }).populate(
            "user",
            "email phone fullName avatar"
        );
        if (!patient) return next(new ApiError(400, "No such patient found!"));
        res.status(200).json(
            new ApiResponse(200, patient, "Patient info fetched successfully!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
export { createPatientDetails, updatePatientDetails, getPatientDetails };

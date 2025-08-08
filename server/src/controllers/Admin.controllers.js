import { Doctor } from "../models/Doctor.models.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getgeoencode from "../services/geoencoder-address-encoding.services.js";

const addNewDoctor = async (req, res, next) => {
    try {
        const {
            email,
            specializations,
            qualifications,
            experienceInYears,
            clinicInfo,
        } = req.body;
        if (!req.user || req.user !== "admin")
            return next(
                new ApiError(401, "You are not authorized to add new doctor!")
            );
        if (!email) return next(new ApiError(400, "Please Provide email!"));
        if (!specializations)
            return next(new ApiError(400, "Specialization not present!"));
        if (!qualifications)
            return next(new ApiError(400, "Please provide qualification"));
        if (!experienceInYears)
            return next(new ApiError(400, "Please provide experience!"));
        if (!clinicInfo)
            return next(new ApiError(400, "Please provide clinic Info!"));
        const user = await User.findOne({ email });
        if (!user) return next(new ApiError(400, "No such user exist!"));
        user.role = "doctor";
        await user.save({ validateBeforeSave: false });
        const existingProfile = await Doctor.findOne({ user: user._id });
        if (existingProfile)
            return next(
                new ApiError(409, "Doctor with this email already exists!")
            );
        const coordinates = await getgeoencode(clinicInfo?.address);
        clinicInfo.location = { type: "Point", coordinates };
        const doctor = await Doctor.create({
            user: user._id,
            specializations,
            qualifications,
            experienceInYears,
            clinicInfo,
        });
        return res
            .status(201)
            .json(new ApiResponse(201, doctor, "Doctor Added successfully!"));
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return next(
                new ApiError(
                    409,
                    "A doctor with this registration number already exists."
                )
            );
        }
        return next(new ApiError(500, error.message));
    }
};
const suspendDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!req.user || req.user.role !== "admin")
            return next(
                new ApiError(
                    401,
                    "You are not authorized to do this operation!"
                )
            );
        if (!id) return next(new ApiError(400, "Please provide userId"));
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            {
                status: "suspended",
            },
            {
                new: true,
            }
        );
        if (!doctor) return next(new ApiError(400, "No such doctor exist!"));
        res.status(200).json(
            new ApiResponse(200, {}, "Doctor account deactivated successfully!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const changeDoctorDetailsForAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            specializations,
            qualifications,
            experienceInYears,
            clinicInfo,
            status = "approved",
        } = req.body;
        if (!req.user || req.user.role !== "admin")
            return next(401, "You are not allowed to perform this operation!");
        if (!id) return next(new ApiError(400, "Please provide userId"));
        if (!specializations)
            return next(new ApiError(400, "Specialization not present!"));
        if (!qualifications)
            return next(new ApiError(400, "Please provide qualification"));
        if (!experienceInYears)
            return next(new ApiError(400, "Please provide experience!"));
        if (!clinicInfo)
            return next(new ApiError(400, "Please provide clinic Info!"));
        const coordinates = await getgeoencode(clinicInfo?.address);
        clinicInfo.location = { type: "Point", coordinates };
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            {
                specializations,
                qualifications,
                experienceInYears,
                clinicInfo,
                status,
            },
            { new: true, runValidators: true }
        );
        if (!doctor) return next(new ApiError(400, "No such doctor exist!"));
        res.status(200).json(
            new ApiResponse(200, doctor, "Doctor account updated successfully!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
export { addNewDoctor, suspendDoctor, changeDoctorDetailsForAdmin };

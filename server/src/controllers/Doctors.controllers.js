import { Doctor } from "../models/Doctor.models.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getgeoencode from "../services/geoencoder-address-encoding.services.js";
import { uploadImageToCloudinary } from "../services/fileStorage.services.js";

const changeDoctorDetailsForDoctor = async (req, res, next) => {
    try {
        const {
            consultationFee,
            availability,
            experienceInYears,
            clinicInfo,
            documents,
        } = req.body;
        if (!req.user || !req.user.role !== "doctor")
            return next(
                new ApiError(
                    401,
                    "You are not allowed to perform this operation!"
                )
            );
        if (!req.user?._id)
            return next(new ApiError(400, "Please provide userId"));
        const updateFields = {};
        if (consultationFee) updateFields.consultationFee = consultationFee;
        if (availability && Array.isArray(availability))
            updateFields.availability = availability;
        if (experienceInYears)
            updateFields.experienceInYears = experienceInYears;
        if (clinicInfo) {
            updateFields.clinicInfo = clinicInfo;
            const coordinates = await getgeoencode(clinicInfo?.address);
            updateFields.clinicInfo.location = { type: "Point", coordinates };
        }
        if (!Array.isArray(documents))
            return next(new ApiError(400, "Please provide documents!"));
        const doctorProfile = await Doctor.findOne({ user: req.user?._id });
        if (!doctorProfile)
            return next(new ApiError(400, "No doctor is present!"));
        const doctor = await Doctor.findByIdAndUpdate(
            doctorProfile._id,
            {
                ...updateFields,
                $addToSet: { documents: { $each: [...documents] } },
            },
            { new: true, runValidators: true }
        );
        res.status(200).json(
            new ApiResponse(
                200,
                doctor,
                "Your profile has been updated successfully!"
            )
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const getDoctorDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new ApiError(400, "Please provide Doctorid!"));
        let queryfilter;
        let usersfieldtoPopulate;
        let doctorsfieldtoselect;
        if (req.user && req.user.role === "admin") {
            queryfilter = { _id: id };
            usersfieldtoPopulate = "fullName avatar bio phone email";
            doctorsfieldtoselect = "";
        } else {
            queryfilter = { _id: id, status: "approved" };
            usersfieldtoPopulate = "fullName avatar bio email";
            doctorsfieldtoselect = "-documents";
        }
        const doctor = await Doctor.findOne(queryfilter)
            .populate("user", usersfieldtoPopulate)
            .select(doctorsfieldtoselect);
        if (!doctor)
            return next(
                new ApiError(
                    400,
                    "Doctor not found or you donnot have permission to view this profile!"
                )
            );
        res.status(200).json(
            new ApiResponse(200, doctor, "Doctor data fetched successfully!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const getAllDoctor = async (req, res, next) => {
    try {
        const { specialization, search } = req.query;
        let query;
        let userpopulatefield;
        let selectfield;
        if (req.user && req.user.role === "admin") {
            userpopulatefield = "fullName avatar bio phone email";
            selectfield = "";
            query = {};
        } else {
            userpopulatefield = "fullName avatar bio email";
            selectfield = "-documents -status";
            query = { status: "approved" };
        }
        if (specialization) {
            query.specializations = specialization;
        }
        if (search) {
            const searchregex = new RegExp(search, "i");
            const users = await User.find({ name: searchregex }).select("_id");
            const userIds = users.map((user) => user._id);
            query.user = { $in: userIds };
        }
        const AllDoctors = await Doctor.find(query)
            .populate("user", userpopulatefield)
            .select(selectfield);
        res.status(200).json(
            new ApiResponse(
                200,
                AllDoctors,
                "All doctors fetched successfully!"
            )
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const getNearByDoctors = async (req, res, next) => {
    try {
        const { lat, lon, radius = 10 } = req.query;
        if (!lat || !lon)
            return next(
                new ApiError(400, "Please provide latitute and longitute!")
            );
        const radiusInMeters = radius * 1000;
        const doctors = await Doctor.find({
            "clinicInfo.location": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lon), parseFloat(lat)],
                    },
                    $maxDistance: radiusInMeters,
                },
            },
            status: "approved",
        })
            .populate("user", "fullName avatar bio email")
            .select("-documents -status");
        res.status(200).json(
            new ApiResponse(200, doctors, "NearbyDoctors Fetched Successfully!")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
const uploadDocument = async (req, res, next) => {
    try {
        if (!req.file)
            return next(
                new ApiError(400, "Please provide document to upload image!")
            );
        const cloudinaryurl = await uploadImageToCloudinary(req.file?.path);
        if (!cloudinaryurl || !cloudinaryurl.url)
            return next(
                new ApiError(
                    400,
                    "Some error occured while uploading to cloudinary!"
                )
            );
        res.status(200).json(
            new ApiResponse(200, cloudinaryurl, "Document has been uploaded.")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
};
export {
    changeDoctorDetailsForDoctor,
    getDoctorDetails,
    getAllDoctor,
    getNearByDoctors,
    uploadDocument,
};

import express from "express";
import {
    changeDoctorDetailsForDoctor,
    getAllDoctor,
    getDoctorDetails,
    getNearByDoctors,
    uploadDocument,
} from "../controllers/Doctors.controllers.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

router.route("/doctor/change-details").patch(changeDoctorDetailsForDoctor);
router.route("/get-doctor/:id").get(getDoctorDetails);
router.route("/get").post(getAllDoctor);
router.route("/get-nearby-doctors").get(getNearByDoctors);
router
    .route("/upload-document")
    .post(upload.single("document"), uploadDocument);
export default router;

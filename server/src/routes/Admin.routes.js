import express from "express";
import {
    addNewDoctor,
    changeDoctorDetailsForAdmin,
    suspendDoctor,
} from "../controllers/Admin.controllers.js";
const router = express.Router();

router.route("/add-doctor").post(addNewDoctor);
router.route("/suspend/:id").patch(suspendDoctor);
router.route("/change-doctor-details/:id").patch(changeDoctorDetailsForAdmin);

export default router;

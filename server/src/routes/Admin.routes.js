import express from "express";
import {
    addNewDoctor,
    changeDoctorDetailsForAdmin,
    suspendDoctor,
    suspendUser,
} from "../controllers/Admin.controllers.js";
import VerifyAdmin from "../middleware/VerifyAdmin.middleware.js";
const router = express.Router();

router.route("/add-doctor").post(VerifyAdmin, addNewDoctor);
router.route("/suspend-doctor/:id").patch(VerifyAdmin, suspendDoctor);
router.route("/suspend-user/:id").patch(VerifyAdmin, suspendUser);
router
    .route("/change-doctor-details/:id")
    .patch(VerifyAdmin, changeDoctorDetailsForAdmin);

export default router;

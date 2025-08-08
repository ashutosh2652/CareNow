import express from "express";
import {
    createPatientDetails,
    updatePatientDetails,
    getPatientDetails,
} from "../controllers/Patient.controllers.js";
const router = express.Router();

router.route("/create-detail").post(createPatientDetails);
router.route("update-detail").patch(updatePatientDetails);
router.route("/get").get(getPatientDetails);

export default router;

import express from "express";
const router = express.Router();
import {
    CreateNewAppointment,
    cancelAppointmentByPatient,
    cancelAppointmentByDoctor,
    getAllApointment,
    completedFixedAppointment,
} from "../controllers/Appointment.controllers.js";

router.route("/create/:id").post(CreateNewAppointment);
router.route("/cancel/patient/:id").patch(cancelAppointmentByPatient);
router.route("/cancel/doctor/:id").patch(cancelAppointmentByDoctor);
router.route("/get").get(getAllApointment);
router.route("/completed/:id").patch(completedFixedAppointment);
export default router;

import express from "express";
import {
    AddPresecription,
    getPrescription,
} from "../controllers/Prescription.controllers.js";
const router = express.Router();

router.route("/add/:id").post(AddPresecription);
router.route("/get/:id").get(getPrescription);

export default router;

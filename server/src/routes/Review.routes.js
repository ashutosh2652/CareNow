import express from "express";
import {
    addReview,
    getReviewOfDoctor,
} from "../controllers/Review.controllers.js";
const router = express.Router();

router.route("/add/:appointmentId").post(addReview);
router.route("/get/:doctorId").get(getReviewOfDoctor);

export default router;

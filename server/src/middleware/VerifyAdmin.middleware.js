import { ApiError } from "../utils/ApiError.js";

export default function (req, _, next) {
    try {
        if (!req.user || req.user.role !== "admin")
            return next(
                new ApiError(400, "You are not allowed to access these routes!")
            );
        next();
    } catch (error) {
        console.log(error);
        return next(new ApiError(400, error.message));
    }
}

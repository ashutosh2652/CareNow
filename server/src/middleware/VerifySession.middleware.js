import { User } from "../models/User.models.js";

export default async function (req, res, next) {
    if (req.session.user_id) {
        try {
            req.user = await User.findById(req.session.user_id);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    next();
}

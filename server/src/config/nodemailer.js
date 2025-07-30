import nodemailer from "nodemailer";
import { config } from "./env.js";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.EMAIL_USERNAME,
        pass: config.EMAIL_PASSWORD,
    },
    pool: true,
    secure: true,
    tls: { rejectUnauthorized: false },
});
function checkTransporterConnection() {
    transporter.verify((err) => {
        if (err) return false;
        return true;
    });
}
export { transporter, checkTransporterConnection };

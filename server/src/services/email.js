import { config } from "../config/env.js";
import { transporter } from "../config/nodemailer.js";
import { emailTemplates } from "../utils/emailTemplate.js";
export default function (email, name, token, options) {
    if (!email) {
        console.log("Email is required!");
        throw new Error("Email is required to procceed!");
    }
    if (!name) {
        console.error("Name is required!");
        throw new Error("Name is required!");
    }
    if (!token) {
        console.error("Email is required!");
        throw new Error("Token is required to send email!");
    }
    const emailmessage = emailTemplates[options](name, token);
    const mailOptions = {
        from: `"CareNow" ${config.EMAIL_USERNAME}`,
        to: `"${name}" ${email}`,
        subject: emailmessage.subject,
        html: emailmessage.html,
    };
    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                throw new Error(err);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

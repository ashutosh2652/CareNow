import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const PORT = parseInt(process.env.PORT, 10); //base 10
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
const CORS_WHITELIST = process.env.CORS_WHITELIST;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_URL_PATIENT = process.env.CLIENT_URL_PATIENT;
const CLIENT_URL_DOCTOR = process.env.CLIENT_URL_DOCTOR;
const CLIENT_URL_ADMIN = process.env.CLIENT_URL_ADMIN;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const GEOCODER_PROVIDER = process.env.GEOCODER_PROVIDER;
const config = {
    NODE_ENV,
    PORT,
    CORS_WHITELIST,
    MONGODB_URI,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_URL_PATIENT,
    CLIENT_URL_DOCTOR,
    CLIENT_URL_ADMIN,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    SESSION_SECRET,
    GEOCODER_PROVIDER,
};
const isAllpresent = Object.values(config).every((item) => item !== null);
if (!isAllpresent) throw new Error(`Missing required file item`);
export { config };

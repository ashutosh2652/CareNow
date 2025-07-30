import { config } from "./env.js";

const WHITELIST_URL = new Set(
    (config.CORS_WHITELIST || "")
        .split(",")
        .map((whitelist_url) => whitelist_url.trim())
        .filter(Boolean)
);

const BASE_CORS = {
    Credential: true,
    allowedHeaders: [
        "Authorization",
        "Content-Type",
        "X-Requested-With",
        "Accept",
    ],
    exposedHeaders: ["Authorization", "Content-Length"],
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
    max_age: 86_400, //remember the max age that after which browser ask
    optionsSuccessStatus: 204,
};
function cors_option(req, cb) {
    const origin = req.get("Origin");
    if (!origin) return cb(null, { origin: true, ...BASE_CORS });
    const allowed =
        WHITELIST_URL.length === 0 || WHITELIST_URL.includes(origin);
    cb(null, allowed ? { origin: true, ...BASE_CORS } : { origin: false });
}
export default cors_option;

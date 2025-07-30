import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + "-" + Math.floor(Math.random() * 1e9);
        cb(null, uniquesuffix + "-" + file.originalname);
    },
});
const upload = multer({ storage });
export default upload;

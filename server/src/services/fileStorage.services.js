import cloudinary from "../config/cloudinary";
import fs from "fs";
const uploadImageToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("File has been uploaded to cloudinary!");
        return response;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        try {
            fs.unlinkSync(localFilePath);
        } catch (error) {
            console.log("Error deleting file from localstorage", error);
        }
    }
};
const deleteImageFromCloudinary = async ({ publicId, fileType }) => {
    try {
        if (!publicId || !fileType) return null;
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: fileType,
        });
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export { uploadImageToCloudinary, deleteImageFromCloudinary };

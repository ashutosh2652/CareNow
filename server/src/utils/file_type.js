const getFileType = (extensionType) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
    if (imageExtensions.includes(extensionType)) return "image";
    if (videoExtensions.includes(extensionType)) return "video";
    return "Invalid";
};
const getpublicIdAndFileType = (url) => {
    const urlsplitarray = url.split("/");
    const publicIdArray = urlsplitarray[urlsplitarray.length - 1].split(".");
    const publicId = publicIdArray[0];
    const formatType = publicIdArray[1];
    const Type = getFileType(formatType);
    return { publicId, Type };
};
export { getFileType, getpublicIdAndFileType };

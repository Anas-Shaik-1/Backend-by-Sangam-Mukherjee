const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (err) {
        console.error("Error While Uploading to Cloudinary");

        throw new Error("Error While Uploading to Cloudinary");
    }
};

module.exports = uploadToCloudinary;

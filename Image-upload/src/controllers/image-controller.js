const uploadToCloudinary = require("../helpers/cloudinary-helper");
const Image = require("../models/Image");

const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required. Please upload an image",
            });
        }
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        const imageUploadResult = await Image.create({
            url,
            publicId,
            uploadedBy: req.userInfo.userId,
        });
        console.log("uploaded to db");

        res.status(201).json({
            success: true,
            message: "Image Uploaded Successfully",
            image: imageUploadResult,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went Wrong. Pls! try again.",
        });
    }
};

module.exports = { uploadImageController };

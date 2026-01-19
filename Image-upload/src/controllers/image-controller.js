const uploadToCloudinary = require("../helpers/cloudinary-helper");
const Image = require("../models/Image");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
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
        fs.unlinkSync(req.file.path);

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

const getAllImages = async (req, res) => {
    try {
        const response = await Image.find();

        res.status(200).json({
            success: true,
            images: response,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message,
        });
    }
};

const deleteImage = async (req, res) => {
    try {
        const idOfImageToDelete = req.params.id;

        const image = await Image.findById(idOfImageToDelete);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not Found",
            });
        }
        // console.log(image.uploadedBy, req.userInfo.userId);
        // console.log(String(image.uploadedBy) !== req.userInfo.userId);

        if (String(image.uploadedBy) !== req.userInfo.userId) {
            return res.status(400).json({
                success: false,
                message: "Image can be deleted by the only one who uploaded.",
            });
        }
        await cloudinary.uploader.destroy(image.publicId);
        await image.deleteOne();

        res.status(200).json({
            success: true,
            message: "Image deleted Successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message,
        });
    }
};

module.exports = { uploadImageController, getAllImages, deleteImage };

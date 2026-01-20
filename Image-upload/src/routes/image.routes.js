const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const imageUploadMiddleware = require("../middleware/image-upload-middleware");
const {
    uploadImageController,
    getAllImages,
    deleteImage,
    fetchImageController,
} = require("../controllers/image-controller");

const imageRouter = express.Router();

imageRouter.post(
    "/",
    authMiddleware,
    adminMiddleware,
    imageUploadMiddleware.single("image"),
    uploadImageController,
);
imageRouter.get("/", authMiddleware, fetchImageController);

imageRouter.delete("/:id", authMiddleware, adminMiddleware, deleteImage);

module.exports = imageRouter;

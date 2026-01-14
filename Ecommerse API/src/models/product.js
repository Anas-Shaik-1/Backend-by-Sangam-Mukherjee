const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { original: { type: Number }, splPrice: Number },
        ratings: { type: Number, min: 0, max: 5 },
        brand: {
            brandName: String,
            brandLink: String,
        },
        specs: {
            brand: String,
            os: String,
            cpuModel: String,
            cpuSpeed: Number,
        },
        about: [String],
        images: [
            {
                imgURL: String,
                selected: { type: Boolean, default: false },
            },
        ],
        description: String,
        reviews: [
            {
                reviewImages: [String],
                reviewComment: String,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);

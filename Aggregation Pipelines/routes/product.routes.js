const express = require("express");
const Product = require("../models/Product");

const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"],
            },
            {
                name: "smartphone",
                category: "Electronics",
                price: 699,
                inStock: true,
                tags: ["mobile", "tech"],
            },
            {
                name: "Headphones",
                category: "Electronics",
                price: 199,
                inStock: false,
                tags: ["audio", "tech"],
            },
            {
                name: "Running Shoes",
                category: "Sports",
                price: 89,
                inStock: true,
                tags: ["footwear", "running"],
            },
        ];
        const result = await Product.insertMany(sampleProducts);

        res.status(200).json({
            success: true,
            message: `sample ${sampleProducts.length} products has successfully inserted`,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
});

productRouter.get("/stats", async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    inStock: true,
                    price: {
                        $gt: 200,
                    },
                },
            },
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            products: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
});

productRouter.get("/analysis", async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    category: "Electronics",
                },
            },
            {
                $group: {
                    _id: "$category",
                    totalRevenue: {
                        $sum: "$price",
                    },
                    minProductPrice: {
                        $min: "$price",
                    },
                    maxProductPrice: {
                        $max: "$price",
                    },
                    averagePrice: {
                        $avg: "$price",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"],
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            products: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
});

module.exports = productRouter;

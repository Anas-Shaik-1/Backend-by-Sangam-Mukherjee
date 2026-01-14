const express = require("express");
const product = require("../models/product");
const {
    getAllProducts,
    getAProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");
const { isValidObjectId } = require("mongoose");

const productRoutes = express.Router();

// Get all products
productRoutes.get("/", getAllProducts);

// Get a product
productRoutes.get("/:id", getAProduct);

// Create a product
productRoutes.post("/", createProduct);

// Delete a product
productRoutes.delete("/delete/:id", deleteProduct);

// Update a product
productRoutes.put("/update/:id", updateProduct);

module.exports = productRoutes;

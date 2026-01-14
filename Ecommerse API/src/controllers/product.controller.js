const { isValidObjectId } = require("mongoose");
const product = require("../models/product");

const getAllProducts = async (req, res) => {
    try {
        const data = await product.find();

        return res.send({
            status: true,
            products: data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server error",
            error: err.message,
        });
    }
};

const getAProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                product: null,
                msg: "Invalid Id",
            });
        }

        const result = await product.findById(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                product: null,
                msg: "Product not Found",
            });
        }

        return res.status(200).json({
            success: true,
            product: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server Error",
            error: err.message,
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            title,
            price,
            ratings,
            brand,
            specs,
            about,
            images,
            description,
            reviews,
        } = req.body;

        const response = product.create({
            title,
            price,
            ratings,
            brand,
            specs,
            about,
            images,
            description,
            reviews,
        });
        console.log(response);

        res.status(201).json({
            success: true,
            msg: "Product Created Successfully",
            response,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server Error",
            error: err.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(404).json({
                success: false,
                product: null,
                msg: "product not found",
            });
        }
        const data = req.body;
        const response = await product.findByIdAndUpdate(id, data, {
            new: true,
        });
        res.send({
            success: true,
            msg: "Data Updated Successfully",
            updatedData: response,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server Error",
            error: err.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await product.findByIdAndDelete(id);
        if (!response) {
            console.log(id);

            return res.status(404).json({
                success: false,
                product: null,
                msg: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            msg: "Product Deleted Successfully",
            response,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server Error",
            error: err.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getAProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};

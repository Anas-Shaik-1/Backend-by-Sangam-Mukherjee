const express = require("express");
const Book = require("../models/Book");
const Author = require("../models/Author");

const bookRouter = express.Router();
const authorRouter = express.Router();

bookRouter.post("/:author", async (req, res) => {
    try {
        const { title } = req.body;
        const { author } = req.params;

        const result = await Book.create({ title, author });

        res.status(200).json({
            success: true,
            result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
});
authorRouter.post("/", async (req, res) => {
    try {
        const { name } = req.body;

        const result = await Author.create({ name });

        res.status(200).json({
            success: true,
            result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
});

bookRouter.get("/:book", async (req, res) => {
    try {
        const { book } = req.params;

        const result = await Book.findById(book).populate("author");

        res.status(200).json({
            success: true,
            result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
});
module.exports = { authorRouter, bookRouter };

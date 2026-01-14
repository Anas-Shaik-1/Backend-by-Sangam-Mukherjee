const { isValidObjectId } = require("mongoose");
const book = require("../models/book");
const getAllTheBooks = async (req, res) => {
    try {
        const books = await book.find();
        res.send({ success: true, books });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error",
        });
    }
};

const getTheBook = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await book.findById(id);
        console.log(data);

        res.send({
            success: true,
            book: data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error",
        });
    }
};

const createABook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyAddedBookFromData = await book.create(newBookFormData);

        console.log(newBookFormData);
        console.log(newlyAddedBookFromData);

        if (newlyAddedBookFromData) {
            res.status(201).json({
                success: true,
                msg: "New Book Created",
                book: newlyAddedBookFromData,
            });
        } else {
            res.status(400).json({
                success: false,
                msg: "Something went Wrong",
                error: newlyAddedBookFromData,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error",
        });
    }
};

const updateTheBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, year } = req.body;
        const updatedBook = await book.findByIdAndUpdate(
            { _id: id },
            { title, author, year },
            { new: true }
        );

        if (!updatedBook) {
            return res
                .status(404)
                .json({ success: false, msg: "Book Not Found" });
        }

        return res.send(updatedBook);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error",
        });
    }
};

const deleteTheBook = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await book.findByIdAndDelete(id);

        if (!response) {
            return res
                .status(404)
                .json({ success: false, msg: "Book Not Found", response });
        }

        return res.send({
            success: true,
            response,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Server Error",
        });
    }
};

module.exports = {
    getAllTheBooks,
    getTheBook,
    createABook,
    updateTheBook,
    deleteTheBook,
};

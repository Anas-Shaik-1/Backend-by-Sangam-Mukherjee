const express = require("express");
const {
  createABook,
  getAllTheBooks,
  getTheBook,
  updateTheBook,
  deleteTheBook,
} = require("../controllers/book.controller");

const BooksRouter = express.Router();

// Create a book
BooksRouter.post("/", createABook);

// Get all the books
BooksRouter.get("/", getAllTheBooks);

// Get The Book
BooksRouter.get("/:id", getTheBook);

// Update the Book
BooksRouter.put("/update/:id", updateTheBook);

// Delete the Book
BooksRouter.delete("/delete/:id", deleteTheBook);

module.exports = BooksRouter;

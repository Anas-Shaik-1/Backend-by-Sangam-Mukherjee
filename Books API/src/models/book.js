const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book Title is Required"],
    trim: true,
    maxLength: [100, "Book title cannot be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author name is Required"],
  },
  year: {
    type: Number,
    required: [true, "Published year is Required"],
    min: [1000, "The book Published year cannot be less than 1000"],
    max: [new Date().getFullYear(), "The Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);

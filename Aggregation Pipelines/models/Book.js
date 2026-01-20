const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author: {
        ref: "Author",
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("Book", BookSchema);

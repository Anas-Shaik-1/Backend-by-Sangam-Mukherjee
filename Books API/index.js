const express = require("express");
const connectToDB = require("./database/db");
const BooksRouter = require("./src/routes/book.routes");
const book = require("./src/models/book");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/api/v1/books", BooksRouter);

app.listen(PORT, () => {
    console.log("Server running at http://127.0.0.1:" + PORT);
    connectToDB();
});

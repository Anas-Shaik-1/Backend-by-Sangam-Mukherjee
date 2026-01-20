const mongoose = require("mongoose");
const express = require("express");
const productRouter = require("./routes/product.routes");
const { bookRouter, authorRouter } = require("./routes/book.routes");

const PORT = 3030;
const DB_URL = "mongodb://localhost:27017/products";

const app = express();
app.use(express.json());
app.use("/api/products", productRouter);

app.use("/api/book", bookRouter);
app.use("/api/author", authorRouter);

app.listen(PORT, () => {
    console.log("server Running at port", PORT);
    mongoose
        .connect(DB_URL)
        .then(console.log("DB Connected"))
        .catch((err) => console.error("DB Connection failed\n", err.message));
});

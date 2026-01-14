const express = require("express");
const connectToDB = require("./src/db/db");
const productRoutes = require("./src/routes/product.routes");
require("dotenv").config({
    path: "../.env",
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/products/v1", productRoutes);

app.get("/", (req, res) => {
    res.send("Products API working Test...");
});

app.listen(PORT, async () => {
    await connectToDB();
    console.log("Server Running at Port:", PORT);
});

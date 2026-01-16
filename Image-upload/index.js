require("dotenv").config({ path: "../.env" });
const express = require("express");
const connectToDB = require("./src/db/db");
const authRouter = require("./src/routes/auth.route");
const homeRoutes = require("./src/routes/home.route");
const authMiddleware = require("./src/middleware/auth-middleware");
const adminRouter = require("./src/routes/admin.routes");
const imageRouter = require("./src/routes/image.routes");

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use("/api/user", authRouter);
app.use("/api/home", authMiddleware, homeRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(PORT, () => {
    console.log("Server Running at port", PORT);
    connectToDB();
});

const mongoose = require("mongoose");

const connectToDB = async () => {
    return mongoose
        .connect(process.env.DB_URI)
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.error("DB Connection Failed");
            process.exit(1);
        });
};

module.exports = connectToDB;

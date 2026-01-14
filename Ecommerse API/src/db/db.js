const mongoose = require("mongoose");

const connectToDB = () => {
    return mongoose
        .connect(process.env.DB_URI)
        .then(() => {
            console.log("Database Connected");
        })
        .catch((err) => {
            console.error("Failed To connect to Database");
            process.exit(1);
        });
};

module.exports = connectToDB;

const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        mongoose.connect(process.env.DB_URI);
        console.log("DB Connected");
    } catch (err) {
        console.error("DB Connection Failed");
        process.exit(1);
    }
};

module.exports = connectToDB;

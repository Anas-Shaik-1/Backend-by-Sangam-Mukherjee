const mongoose = require("mongoose");
require("dotenv").config();
const connectToDB = async () => {
  try {
    console.log("DB Connected Successfully");
    return await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.error("DB Connection Failed ");
    process.exit(1);
  }
};

module.exports = connectToDB;

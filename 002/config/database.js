const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/user-data")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err));
};
module.exports = { connectDB };

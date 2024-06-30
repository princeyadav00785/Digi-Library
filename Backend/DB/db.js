const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB IS CONNECTED");
    })
    .catch((err) => {
      console.log("Error connecting to db !!", err);
    });
};

module.exports = connectDB;

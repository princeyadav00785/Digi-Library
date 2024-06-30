const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin", "librarian"],
      default: "student",
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
      default: undefined,
    },
    refreshTokenExpiry: {
      type: String,
      default: undefined,
    },
    fine: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

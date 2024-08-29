const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    full_name: {
      type: String,
      required: false,
    },
    nickname: {
      type: String,
      required: false,
    },
    gender: {
      type: Number,
      required: false,
      enum: [0, 1],
    },
    oppositeGender: {
      type: Number,
      required: false,
      enum: [0, 1],
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Avatar',
    },
    star: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Star',
    },
    status: {
      type: Number,
      required: true,
    },
    provider: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Mongoose will automatically manage `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

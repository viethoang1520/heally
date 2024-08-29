const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
    },
    chatName: {
      type: String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

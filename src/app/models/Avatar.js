const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema(
  {
    link: {
      type: String,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AvatarType',
    },
  },
  {
    timestamps: true,
  }
);

const Avatar = mongoose.model('Avatar', avatarSchema);

module.exports = Avatar;

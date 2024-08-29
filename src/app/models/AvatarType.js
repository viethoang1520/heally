const mongoose = require('mongoose');

const avatarTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AvatarType = mongoose.model('AvatarType', avatarTypeSchema);

module.exports = AvatarType;

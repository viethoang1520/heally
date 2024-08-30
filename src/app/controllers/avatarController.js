const Avatar = require('../models/Avatar');
class AvatarController {
  // Tested
  async getAvatarsByType(req, res) {
    try {
      const { type } = req.query;
      if (!type) {
        return res.json({ "error_code": 1, "message": "Thiếu tham số type" });
      }
      const avatars = await Avatar.find({ type });
      if (avatars.length === 0) {
        return res.json({ "error_code": 2, "message": "Không tìm thấy avatar nào" });
      }
      return res.json({ "error_code": 0, "message": avatars });
    } catch (error) {
      res.json({ "error_code": 3, "message": error.message });
    }
  }

  async createAvatar(req, res) {
    try {
      const { link, type } = req.body;

      if (!link || !type) {
        return res.status(400).json({
          error_code: 400,
          message: 'Link and type are required fields.',
        });
      }

      const newAvatar = new Avatar({
        link,
        type,
      });

      const savedAvatar = await newAvatar.save();

      res.status(201).json({
        error_code: 0,
        message: 'Avatar created successfully!',
        avatar: savedAvatar,
      });
    } catch (error) {
      res.status(500).json({
        error_code: 500,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}

module.exports = new AvatarController();
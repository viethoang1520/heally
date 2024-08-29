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
}

module.exports = new AvatarController();
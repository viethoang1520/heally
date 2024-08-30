const User = require('../models/User');

class UserController {
  async getUserByID(req, res) {
    try {
      const { userID } = req.query;
      if (!userID) {
        return res.json({ "error_code": 1, "message": "Thiếu ID người dùng" });
      }
      const user = await User.findById(userID);
      if (!user) {
        return res.json({ "error_code": 2, "message": "Không tìm thấy người dùng" });
      }
      return res.json({ "error_code": 0, "message": user });
    } catch (error) {
      return res.json({ "error_code": 500, "message": error });
    }
  }
}

module.exports = new UserController();

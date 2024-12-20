const User = require('../models/User');
const jwt = require('jsonwebtoken')

class UserController {
  async getUserByID(req, res) {
    try {
      const { userID } = req.query;
      if (!userID) {
        return res.json({ "error_code": 1, "message": "Thiếu ID người dùng" });
      }
      const user = await User.findById(userID)
        .populate({
          path: 'avatar',
          select: 'link'
        })
        .populate({
          path: 'star',
          select: 'totalStars ratingCount'
        });
      if (!user) {
        return res.json({ "error_code": 2, "message": "Không tìm thấy người dùng" });
      }
      return res.json({ "error_code": 0, "message": user });
    } catch (error) {
      return res.json({ "error_code": 500, "message": error });
    }
  }

  //Tested
  async validUser(req, res) {
    try {
      // token includes id and username
      const id = req.id
      const token = req.token
      const validUser = await User.findById(id)
        .select('-password_hash')
        .populate({
        path: 'avatar',
        select: 'link'
      })
        .populate({
          path: 'star',
          select: 'totalStars ratingCount'
        })

      if (!validUser) {
        res.json({ "error_code": 1, message: 'User is not valid' });
      }
      res.json({ "error_code": 0, user: validUser, token })
    } catch (error) {
      console.log(error);
      res.json({ "error_code": 500, error });
    }
  }
}

module.exports = new UserController();

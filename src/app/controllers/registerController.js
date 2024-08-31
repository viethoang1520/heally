const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Star = require("../models/Star");

class RegisterController {
  // Tested
  async validate(req, res) {
    try {
      const checkExistUser = await User.findOne({ username: req.body.username });

      if (checkExistUser) {
        let msg = 'Tên người dùng đã tồn tại';
        return res.json({ "error_code": 1, "message": msg });
      }

      const errors = validationResult(req).array();

      if (errors.length === 0) {
        let { username, password, name } = req.body;
        let hashedPassword = (await bcrypt.hash(password, 10)).toString();
        const star = new Star()
        await star.save()

        const user = new User({
          username: username,
          password_hash: hashedPassword,
          full_name: name,
          star: star._id,
          status: 0
        });

        await user.save();

        return res.json({ "error_code": 0, "message": "Đăng ký người dùng thành công", user });
      } else {
        return res.json({ "error_code": 3, "message": errors });
      }
    } catch (error) {
      console.log(error)
      return res.json({ "error_code": 500, "message":  error });
    }
  }

  // Tested
  async addInformation(req, res) {
    try {
      const { userID, avatar, gender, nickname, oppositeGender } = req.body
      if (!userID || !avatar || !gender || !nickname || !oppositeGender) {
        return res.json({ "error_code": 4, "message": "Thiếu tham số" })
      }
      await User.findByIdAndUpdate(userID, {
        avatar,
        gender,
        nickname,
        oppositeGender,
        status: 1
      });

      return res.json({ "error_code": 0, "message": "Hoàn tất cập nhật thông tin" })

    } catch (error) {
      return res.json({ "error_code": 500, "message": error })
    }
  }
}

module.exports = new RegisterController();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginController {
  // Tested
  async validate(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username })
        .select('_id username password_hash')
        // .populate({
        //   path: 'avatar',
        //   select: 'link'
        // })
        // .populate({
        //   path: 'star',
        //   select: 'totalStars ratingCount'
        // })
        // ;
      if (!user) {
        let wrongUsernameMsg = "Tên người dùng hoặc mật khẩu không đúng";
        return res.json({ "error_code": 1, "message": wrongUsernameMsg });
      }
      const valid = await bcrypt.compare(password, user.password_hash);
      if (valid) {
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: '20d',
        });
        return res.json({ "error_code": 0, token });
      } else {
        let wrongPasswordMsg = "Mật khẩu không đúng";
        return res.json({ "error_code": 2, "message": wrongPasswordMsg });
      }
    } catch (err) {
      console.log(err)
      return res.json({ "error_code": 3, "message": err.message || err });
    }
  }
}

module.exports = new LoginController();

const User = require('../../models/User');
const Star = require('../../models/Star');

class RateController {
  // Tested
  async ratePartner(req, res) {
    try {
      let { partnerID, stars } = req.body;
      stars = Number(stars)
      if (!partnerID || stars == null) {
        return res.json({ "error_code": 1, "message": "Thiếu ID người đối diện hoặc số sao" });
      }

      if (typeof stars !== 'number' || stars < 1 || stars > 5) {
        return res.json({ "error_code": 2, "message": "Số sao phải là một số hợp lệ từ 1 đến 5" });
      }

      const user = await User.findById(partnerID);
      if (!user) {
        return res.json({ "error_code": 3, "message": "Không tìm thấy người dùng" });
      }

      const star = await Star.findById(user.star);
      if (!star) {
        return res.json({ "error_code": 4, "message": "Không tìm thấy thông tin sao" });
      }

      star.totalStars += Number(stars);
      star.ratingCount += 1;
      await star.save();

      user.star = star._id;
      await user.save();

      return res.json({ "error_code": 0, "message": "Đánh giá thành công" });
    } catch (error) {
      return res.json({ "error_code": 500, "message": error.message });
    }
  }

  //Tested
  async getUserStar(req, res) {
    try {
      const { userID } = req.query;

      if (!userID) {
        return res.status(400).json({ "error_code": 400, "message": "Thiếu ID người dùng" });
      }

      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ "error_code": 404, "message": "Không tìm thấy người dùng" });
      }

      const star = await Star.findById(user.star);
      if (!star) {
        return res.status(404).json({ "error_code": 404, "message": "Không tìm thấy đánh giá của người dùng" });
      }

      const { totalStars, ratingCount } = star;

      if (ratingCount === 0) {
        return res.status(200).json({ "error_code": 0, "message": 0 });
      }

      const userRate = Number(totalStars / ratingCount);

      return res.status(200).json({ "error_code": 0, "message": userRate });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "error_code": 500, "message": error.message });
    }
  }

}

module.exports = new RateController();

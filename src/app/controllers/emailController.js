const nodeMailer = require('nodemailer');
const mailConfig = require('../../config/email/mail.config');
const generateRandomCode = require('../../middleware/GenerateCode');
const User = require("../models/User");
require('dotenv/config');

class EmailController {
  index(req, res, next) {
    res.render("email");
  }

  sendEmail(req, res, next) {
    try {
      const { email } = req.body;
      const transporter = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
          user: mailConfig.USERNAME,
          pass: mailConfig.PASSWORD,
        }
      });

      let verifyCode = generateRandomCode();

      const info = transporter.sendMail({
        from: mailConfig.FROM_ADDRESS,
        to: email,
        subject: "Mã xác nhận email",
        html: `<div>Mã xác nhận email của bạn là: ${verifyCode}</div>`
      });

      req.session.verifyCode = verifyCode;
      req.session.email = email;
      res.redirect('/email/verify');

    } catch (err) {
      res.redirect('/');
    }
  }


  verify(req, res, next) {
    res.render("verify");
  }
  // verify code from email
  validate(req, res, next) {
    //Test snippet of code
    //=======================
    const { code } = req.body;
    const id = req.session.user.user_id;
    console.log(code);
    console.log(id);
    // return res.redirect('/');
    //=======================

    // console.log(code);
    // console.log(req.session.verifyCode);

    if (code == req.session.verifyCode) {

      // console.log("xác thực thành công");
      // res.redirect("/");
      User.update(
        { email: req.session.email },
        {
          where:
            { user_id: req.session.user.user_id }
        }
      ).then(() => {
        res.redirect('/');
      }).catch(() => {
        res.httpStatus(400);
      })
        

    } else {
      // console.log("xác thực thất bại");
      res.redirect("/");
    }
  }
}

module.exports = new EmailController();
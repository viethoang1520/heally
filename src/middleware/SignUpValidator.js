const { check, validationResult, body } = require("express-validator");

const validateForm = [
  // check("name", "Hãy nhập tên").notEmpty(),
  check("username", "Vui lòng điền tên đăng nhập").notEmpty(),
  check("username", "Tên đăng nhập tối thiểu 4 kí tự").isLength({
    min: 4,
  }),
  check("password", "Vui lòng nhập mật khẩu").notEmpty(),
  check("password", "Mật khẩu tối thiểu 4 kí tự").isLength({
    min: 4,
  }),
  check(
    "password",
    "Mật khẩu phải bao gồm 1 chữ cái"
  ).matches(/^[\w.]+/),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Mật khẩu xác nhận không khớp với mật khẩu");
    }
    return true;
  })
];

module.exports = {
  validateForm
};

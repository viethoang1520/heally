const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json());

// Danh sách từ và domain cấm
const bannedWords = new Set(['sex', 'cặc', 'lồn', 'địt', 'đụ', 'đĩ', 'vú', 'đít', 'bú', 'lỗ']);
const bannedDomains = new Set(['facebook.com', 'instagram.com', 'threads.com']);

// Middleware to filter messages
const messageFilter = [
  body('message').custom(( req ) => {
    const message = req.body.message
    // Lọc từ không chuẩn mực
    const sanitizedMessage = filterProfanity(message);

    // Kiểm tra và chặn đường link không phù hợp
    const resultMessage = filterURLs(sanitizedMessage);

    if (resultMessage === "Link không được phép!") {
      throw new Error('URL không được phép!');
    }

    // Save the sanitized message back to the request body
    req.body.message = sanitizedMessage;
    return true;
  }),
  (req, res, next, message) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    console.log(message)
    // next();
    return res.json("okkkk")
  }
];

// app.post('/message', filterMessageMiddleware, (req, res) => {
//   // Message has been filtered and validated at this point
//   res.status(200).json({ message: 'Tin nhắn hợp lệ và đã được gửi!', content: req.body.message });
// });

function filterProfanity(message) {
  let sanitizedMessage = message;
  bannedWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Precompiled regex
    sanitizedMessage = sanitizedMessage.replace(regex, '****');
  });
  return sanitizedMessage;
}

function filterURLs(message) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = message.match(urlRegex);
  const bannedDomainsRegex = new RegExp(`(${Array.from(bannedDomains).join('|')})`, 'i');

  if (urls) {
    for (let url of urls) {
      const domain = new URL(url).hostname;
      if (bannedDomainsRegex.test(domain)) {
        return "Link không được phép!";
      }
    }
  }
  return message;
}

module.exports = messageFilter


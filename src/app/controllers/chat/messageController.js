const Message = require('../../models/Message.js');
const User = require('../../models/User.js');
const Chat = require('../../models/Chat.js');

class MessageController {
  // Tested
  async sendMessage(req, res) {
    const { chatID, message, rootUserID } = req.body;
    try {
      let msg = await Message.create({ sender: rootUserID, message, chatID });
      msg = await (
        await msg.populate('sender', 'nickname avatar gender')
      ).populate({
        path: 'chatID',
        select: 'chatName users',
        model: 'Chat',
        populate: {
          path: 'users',
          select: 'full_name avatar nickname',
          model: 'User',
        },
      });
      await Chat.findByIdAndUpdate(chatID, {
        latestMessage: msg,
      });
      res.json({"error_code": 0, "message": msg})
    } catch (error) {
      console.log(error)
      res.json({"error_code": 500, "message": error})
    }
  }

  //Tested
  async getMessages(req, res) {
    const { chatID } = req.query;
    try {
      let messages = await Message.find({ chatID })
        .populate({
          path: 'sender',
          model: 'User',
          select: 'name avatar email',
        })
        .populate({
          path: 'chatID',
          model: 'Chat',
        });

      res.status(200).json(messages);
    } catch (error) {
      res.sendStatus(500).json({ error: error });
      console.log(error);
    }
  }
}

module.exports = new MessageController();
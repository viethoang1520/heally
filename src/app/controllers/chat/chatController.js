const Chat = require('../../models/Chat.js');
const User = require('../../models/User.js');

class ChatController {
  // Tested
  async accessChat(req, res) {
    try {
      const { userID, rootUserID } = req.body;
      if (!userID || !rootUserID) {
        return res.json({ "error_code": 1, "message": "Thiếu ID người dùng" });
      }
      let chatExists = await Chat.find({
        $and: [
          { users: { $elemMatch: { $eq: userID } } },
          { users: { $elemMatch: { $eq: rootUserID } } },
        ],
      })
        .populate('users', '-password_hash')
        .populate('latestMessage')
      chatExists = await User.populate(chatExists, {
        path: 'latestMessage.sender',
        select: 'full_name avatar nickname '
      })

      if (chatExists.length > 0) {
        res.status(200).send(chatExists[0])
      } else {
        const data = {
          chatName: 'sender',
          users: [userID, rootUserID],
        }
        const newChat = await Chat.create(data)
        const chat = await Chat.findById(newChat._id)
          .populate('users', '-password_hash')
        res.json({ "error_code": 0, "message": chat })
      }
    } catch (error) {
      res.json({ "error_code": 500, "message": error })
    }
  }

  // Tested
  async fetchAllChats(req, res) {
    try {
      const chats = await Chat.find({
        users: { $elemMatch: { $eq: req.query.rootUserID } }
      })
        .populate({
          path: 'users',
          select: 'star avatar nickname gender full_name',
          populate: [
            {
              path: 'star',
              model: 'Star'
            },
            {
              path: 'avatar',
              select: 'link',
              model: 'Avatar'
            }
          ]
        })
        .populate('latestMessage')
        .sort({ updatedAt: -1 });
      const finalChats = await User.populate(chats, {
        path: 'latestMessage.sender',
        select: 'nickname',
      })
      const transformedChats = finalChats.map(chat => {
        const oppositeUser = chat.users.find(user => user._id.toString() !== req.query.rootUserID);
        const totalStars = oppositeUser.star.totalStars
        const ratingCount = oppositeUser.star.ratingCount
        const userRating = ratingCount !== 0 ? Number(totalStars / ratingCount) : 0
        const chatAvatar = oppositeUser.avatar.link

        const { users, chatName, photo, ...otherPartOfChats } = chat._doc
        return {
          ...otherPartOfChats,
          oppositeUser,
          chatAvatar,
          userRating
        }
      });
      return res.json({ "error_code": 0, "message": transformedChats })
    } catch (error) {
      console.log(error)
      return res.json({ "error_code": 500, "message": error })
    }
  }
}
module.exports = new ChatController()
import { Chat} from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

export const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const user = req.user;
  console.log(id, message, user);
  try {
    let receiver = await User.findById(id);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    let sender = await User.findById(user._id);
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    if (sender._id.equals(receiver._id)) {
      return res.status(400).json({ message: "You cannot message yourself" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [sender._id, receiver._id] },
    });
    if (!chat) {
      chat = new Chat({
        participants: [sender._id, receiver._id],
        lastMessage: {
          message,
          sender: sender._id,
        },
      });

      await chat.save();
    }

    let newMessage = new Message({
      chatRef: chat._id,
      sender: sender._id,
      receiver: receiver._id,
      message,
    });
    await newMessage.save();

    await Chat.updateOne(
      { _id: chat._id },
      {
        lastMessage: {
          message,
          sender: sender._id,
        },
      }
    );

    return res.status(200).json({ message: "Message sent" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const reciver = await User.findById(id);
    if (!reciver) {
      res.status(404).json({ message: "user not found" });
    }
    const user = req.user;
    const sender = await User.findById(user._id);
    if (!sender) {
      res.status(404).json({ message: "sender not found" });
    }

    const chat = await Chat.findOne({
      participants: { $all: [sender._id, reciver._id] },
    });

    if (!chat) {
      res.status(404).json({ message: "chat not found" });
    }

    const messages = await Message.find({
      chatRef: chat._id,
    }).populate('sender');
    return res.status(200).json(messages);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


export const getChat = async (req, res) => {
  try {
    const currUser = req.user._id;

    const chats = await Chat.find({
      participants: { $all: [currUser] }
    })
      .sort({ updatedAt: -1 })
      .populate('participants', '-password')
      .populate('lastMessage.sender', 'name');

    const filteredChats = chats.map(chat => {
      return {
        ...chat.toObject(),
        participants: chat.participants.filter(
          participant => participant._id.toString() !== currUser.toString()
        )
      };
    });
    return res.status(200).json(filteredChats);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
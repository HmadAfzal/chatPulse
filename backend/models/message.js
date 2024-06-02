import mongoose from "mongoose";
import { User } from "./user.js";
import { Chat } from "./chat.js";
const messageSchema = new mongoose.Schema(
  { 
      chatRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Chat,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    reciver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },

  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

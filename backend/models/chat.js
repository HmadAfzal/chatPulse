import mongoose from 'mongoose';
import  { User }   from "./user.js";
const chatSchema= new mongoose.Schema({

    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }],
    lastMessage:{
        message:String,
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }

}, {timestamps:true})

export const Chat=mongoose.model("Chat", chatSchema);

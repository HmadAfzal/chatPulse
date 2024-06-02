import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   pfp:{
    type:String,
default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

   }
   
  },
  { timestamps: true }
);

 export const User = mongoose.model("User", userSchema);

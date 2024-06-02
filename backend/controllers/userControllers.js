import express from 'express'
import mongoose from 'mongoose';
import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import { genJwtToken } from '../utils/genToken.js';
export const signUp=async(req,res)=>{
   const {name, email, password}=req.body;
try {
    let user = await User.findOne({
        $or: [{ email: email }, { name:name }],
      });       if(!name || !email || !password){
        return res.status(500).json({message:'please fill all the required fields'})
       }
       if(password.length<6){
        return res.status(500).json({message:'min length for password is 6'})
       }
       if (user){
        return res.status(500).json({message:'user with this email or name already exists'})
       }
    let salt = await bcrypt.genSalt(10);
    const hashedPass=await bcrypt.hash(password, salt)
       let newUser= new User({
        name,
        email,
        password:hashedPass
       });
       await newUser.save();
       if (newUser){
        genJwtToken(newUser._id, res)
       }
       return res.status(201).json(newUser)
} catch (error) {
    return res.status(500).json({message:error.message})

}
}

export const loginUser = async(req,res)=>{
    let {email, password}=req.body;
try {
        let user = await User.findOne({email});
        if (!user){
            return res.status(404).json({message:'unable to find user with this email'})
        }
    
    const isPassCorrect=await bcrypt.compare(password, user.password);
    if(!isPassCorrect){
        return res.status(500).json({message:'incorrect password'})
    }
    genJwtToken(user._id, res);
    return res.status(201).json({user})
} catch (error) {
    return res.status(500).json({message:error.message})
}
}


export const logoutUser=(req,res)=>{
try {
    res.cookie("token", "", {maxAge:1});
    return res.status(201).json({message:'logged out successfully'});
} catch (error) {
    return res.status(500).json({message:error.message})
}
}


export const getUser = async (req, res) => {
    try {
      let { query } = req.params;
     
        let user = await User.findOne({ name: query })
          .select("-password")
          .select(".updatedAt");
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        } else {
          return res.status(200).json(user);
        }

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  };
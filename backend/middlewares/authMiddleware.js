import jwt from "jsonwebtoken";
import "dotenv/config";
import {User} from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "unauthorized" });
    }
    let decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedUser) {
      return res.status(400).json({ message: "user not found" });
    }

    let user = await User.findById(decodedUser.userId).select('-password');
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "error in authentication" });
  }
};

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const isExist = await User.findOne({ email });
    if (isExist) {
      //   return res.status(400).json({ message: "User Already exist" });
      return next(errorHandler(400, "User Already exist"));
    }
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return res
      .status(201)
      .json({ message: "User successfully created", user: newUser });
  } catch (error) {
    // return res.status(500).json(error.message)
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(400, "User Not exist"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signInWithGoogle = async (req,res,next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(user){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
    }else{
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(generatePassword,10);
      const newUser =new User({username: req.body.name, email: req.body.email, password: hashPassword, avatar: req.body.photo});
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
    }
  } catch (error) {
    next(error)
  }
}
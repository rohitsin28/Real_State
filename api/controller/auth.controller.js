import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
export const signUp = async (req,res,next) => {
    try {
        const { username, email, password} = req.body;
        const hashPassword = bcrypt.hashSync(password,10)
        const isExist = await User.findOne({email});
        if(isExist){
            return res.status(400).json({message:"User Already exist"})
        }
        const newUser = await User.create({username,email,password:hashPassword})
        return res.status(201).json({ message: "User successfully created", user: newUser });
    } catch (error) {
        // return res.status(500).json(error.message)
        next(error)
    }
}
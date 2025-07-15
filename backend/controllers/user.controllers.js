import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const register = async (req,res) => {
    if(!req.body.user || !req.body.password){
    return res.json({success : false , message : "Please Provide All Fields"})
}
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const user = {user : req.body.user.toLowerCase(), password : hashedPassword};

try{
    const newUser = new User(user);
    await newUser.save();
    res.json({success : true,message : "Successfully registered"});
}catch(err){
    console.log(" Can't Create A Account" , err.message);
    res.json({success : false , message : "Internal Server Error"})
}
};

export const logIn = async(req,res) => {
    const {user,password} = req.body;
    if(!user || !password){
        return res.json({success : false , message : "Please Provide All Field"})
    }

    const userName = user.toLowerCase();

    try{
        const user = await User.findOne({user : userName});
        console.log(user)
        if(!user){
            return res.json({success :false , message : "User Not Found"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({success : false,message : "Invalid Password"})
        }
        const token = jwt.sign({user : user.user},process.env.JWT_TOKEN);
        res.json({success : true, token : token, role : user.role,message : "Successful"})

    }catch(err){
        console.log(err)
        res.json({success : false, message : "Internal Server Error"})
    }
};

export const userData = async(req,res) => {
    res.json({
        user : {
            id : req.user.id,
            role : req.user.role
        }
    });
}


import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { register,logIn, userData } from '../controllers/user.controllers.js';

dotenv.config();
const router = express.Router();

router.post('/register',register);
router.post('/login' , logIn)
router.get('/userData',authenticate ,userData);

function authenticate (req,res,next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if(!authHeader){
        return res.status(401).json({message : "No Token Provided"});
    }
    try{
        jwt.verify(token,process.env.JWT_TOKEN, (err, user) => {
            if(err)return res.status(403);
            req.user = user;
            next(); 
        })
    }catch(err){
        res.json({message : "Invalid Token"})
    }
}
export default router;


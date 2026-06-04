import mongoose from "mongoose";
import vendorUser from "../models/vendorModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const verifyToken=async (req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({message:"Access Denied"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const vendor=await vendorUser.findById(decoded.vendorId);
        
        if(!vendor){
            return res.status(401).json({message:"Invalid Token"});
        }
        req.vendorId=vendor._id;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }

}

export default verifyToken;
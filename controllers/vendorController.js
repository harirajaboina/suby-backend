import vendorUser from "../models/vendorModel.js";
import bycrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const vendorRegister=async(req,res)=>{
     const {username,email,password}=req.body;
    try{
       const vendorEmail=await vendorUser.findOne({email:email});
       if(vendorEmail){
           return res.status(400).json({message:"Vendor with this email already exists"});
       }
       if(password.length <= 7){
              return res.status(400).json({message:"Password must be at least 7 characters long"});
       }

       const hashPassword=await bycrypt.hash(password,10);
       
       const newVendor=new vendorUser({
              username,
              email,
             password:hashPassword
       })
       await newVendor.save();
       return res.status(201).json({message:"Vendor registered successfully"});
       console.log("registered successfully");
    }

    catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const vendorEmail=await vendorUser.findOne({email:email});
        if(!vendorEmail){
            return res.status(400).json({message:"Invalid email"});
        }

        const isMatch=await bycrypt.compare(password,vendorEmail.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"});
        }

        const token = jwt.sign({vendorId:vendorEmail._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"}); 
        return res.status(200).json({message:"Vendor Login successful", token});     
        console.log("Login successful");

    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const getVendorDetails=async(req,res)=>{
    try{
        const vendor=await vendorUser.find().populate("firm");
        return res.status(200).json({vendor});
    }catch(error){
        return res.status(500).json({message:"internal server Error"});
    }
}

const getVendorDetailsById=async(req,res)=>{
    try{
        const vendor=await vendorUser.findById(req.params.id).populate("firm");
        if(!vendor){
            return res.status(404).json({message:"Vendor not found"});
        }
        return res.status(200).json({vendor});
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export default {vendorRegister,vendorLogin,getVendorDetails,getVendorDetailsById};
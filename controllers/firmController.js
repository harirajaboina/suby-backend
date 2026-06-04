import firmModel from "../models/firmModel.js";
import verifyToken from "../middleware/verifyToken.js";
import vendorUser from "../models/vendorModel.js";
import multer from "multer";


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
})

const uploads=multer({storage:storage});
const createFirm=async(req,res)=>{
    const {firmName,area,category,region,offer}=req.body;
    const image=req.file? req.file.filename:undefined;
    try{
        const vendor=await vendorUser.findById(req.vendorId);
        if(!vendor){
            return res.status(404).json({message:"Vendor not found"});
        }

        const firm=new firmModel({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor:vendor._id
        })
        const savedFirm = await firm.save();
        vendor.firm = savedFirm._id;
        await vendor.save();
        console.log("Firm created successfully");
        return res.status(201).json({message:"Firm created successfully"}); 
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
    
}

const deleteFirmById=async(req,res)=>{
    try{
        const firmId=req.params.firmId.trim();
        const deletedFirm=await firmModel.findByIdAndDelete(firmId);
        if(!deletedFirm){
            return res.status(404).json({message:"Firm not found"});
        }
        return res.status(200).json({message:"Firm deleted successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const updateFirmById=async(req,res)=>{
    const {firmName,area,category,region,offer}=req.body;
    const image=req.file? req.file.filename:undefined;
    try{
        const firmId=req.params.firmId.trim();
        const updatedFirm=await firmModel.findByIdAndUpdate(firmId,{firmName,area,category,region,offer,image},{new:true});
        if(!updatedFirm){
            return res.status(404).json({message:"Firm not found"});
        }
        return res.status(200).json({message:"Firm updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export default {createFirm:[verifyToken,uploads.single("image"),createFirm], deleteFirmById, updateFirmById};
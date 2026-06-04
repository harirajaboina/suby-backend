import productModel from "../models/productModel.js";
import firmModel from "../models/firmModel.js";
import multer from "multer";

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+path.extname(file.originalname));
    }
})

const uploads=multer({storage : storage});

const createProduct=async(req,res)=>{
    const {productName,price,category,bestSeller,description,firm}=req.body;
    const image=req.file ? req.file.filename : undefined;

    try{
        const firmId=req.params.firmId.trim();
        const firmData=await firmModel.findById(firmId);
        if(!firmData){
            return res.status(404).json({message:"Firm not found"});
        }

        const product=new productModel({
            productName,
            price,
            category,    
            bestSeller,
            description,
            image,
            firm:firmData._id
        })

            await product.save();
            firmData.products.push(product._id);
            await firmData.save();
            return res.status(201).json({message:"Product created successfully"});  
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }

}

const getProducts=async(req,res)=>{
    try{
        const firmId=req.params.firmId.trim();
        const firmData=await firmModel.findById(firmId).populate("products");
        if(!firmData){
            return res.status(404).json({message:"Firm not found"});
        }

        const resturantName=firmData.firmName;
        const products=await productModel.find({firm:firmId}).select("productName price category image bestSeller description");

        firmData.products=products;
        return res.status(200).json({resturantName,firmData});

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const productId=req.params.productId.trim();
        
        const deletedProduct=await productModel.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({message:"Product deleted successfully"});  

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const updateProduct=async(req,res)=>{
    try{
        const productId=req.params.productId.trim();
        const {productName,price,category,bestSeller,description}=req.body;
        const image=req.file ? req.file.filename : undefined;   
        const updatedProduct=await productModel.findByIdAndUpdate(productId,{productName,price,category,bestSeller,description,image},{new:true});
        if(!updatedProduct){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({message:"Product updated successfully"});  
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
export default {createProduct:[uploads.single("image"),createProduct], getProducts, deleteProduct, updateProduct};
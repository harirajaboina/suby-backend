import mongoose from "mongoose";


const productModel=mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg","both"],
                required:true,
            }
        ]
    },
    image:{
        type:String,
        required:false,
    },
    bestSeller:{
        type:Boolean,
        default:false,
    },
    description:{
        type:String,
        required:false,
    },
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"firm",
    }
})

const Product=mongoose.model("product",productModel);

export default Product;
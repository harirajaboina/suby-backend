import mongoose from "mongoose";

const firmSchema = new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true,
    },
    area:{
        type:String,
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
    region:{
        type:[
            {
                type:String,
                enum:["north","south","east","west","chineese"],
            }
        ]
    },
    offer:{
        type:String,
        required:true,
    },
    image:{
        type:String,
         required:false,  
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"vendor"
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
})

const firmModel=mongoose.model("firm",firmSchema);

export default firmModel;
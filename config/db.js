import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database successfully");
        console.log("Connected DB:", mongoose.connection.name);
    }catch(error){
        console.log("Error connecting to database:", error);
    }
}

export default connectDb;
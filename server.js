import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import vendorRouter from "./routes/vendorRoutes.js";
import firmRouter from "./routes/firmRoutes.js";
import productRouter from "./routes/productRoutes.js";
import path from "path";


const app=express();
const PORT= process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.use("/api/vendors",vendorRouter);
app.use("/api/firms",firmRouter);
app.use("/api/products",productRouter);
app.use("/uploads",express.static("uploads"));




connectDb();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use("/",(req,res)=>{
    res.sendFile("<h1>Hello World</h1>");
})
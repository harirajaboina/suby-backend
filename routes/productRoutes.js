import productController from "../controllers/productController.js";
import express from "express";
const router=express.Router();

router.post("/add-product/:firmId",productController.createProduct);
router.get("/:firmId/products",productController.getProducts);

router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    const imagePath=path.join(__dirname,"..","uploads",imageName);
    res.sendFile(imagePath);
})

router.delete("/delete-product/:productId",productController.deleteProduct);
router.put("/update-product/:productId",productController.updateProduct);

export default router;
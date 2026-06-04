import express from "express";
import firmController from "../controllers/firmController.js";
import verifyToken from "../middleware/verifyToken.js";

const router=express.Router();

router.post("/add-firm",firmController.createFirm);

router.get("/uploads/:imageName", (req,res)=>{
    const imageName=req.params.imageName;
    res.setHeader('Content-Type','image/jpeg');
    res.sendFile(path.join(_dirname,"..","uploads",imageName));

})

router.delete("/delete-firm/:firmId",firmController.deleteFirmById);
router.put("/update-firm/:firmId",firmController.updateFirmById);   

export default router;
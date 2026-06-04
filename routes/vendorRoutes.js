import vendorController from '../controllers/vendorController.js';
import express from 'express';
const router=express.Router();

router.post("/register", vendorController.vendorRegister);
router.post("/login", vendorController.vendorLogin);
router.get("/vendor-details",vendorController.getVendorDetails);
router.get("/vendor-details/:id",vendorController.getVendorDetailsById);


export default router;
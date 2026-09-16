import express from "express";
import * as employeeController from "./controller.js";
import upload from "../../config/multer.js";
import authRequired from "../../middleware/authRequired.js";
import validate from "../../middleware/validate.js";
import { registerationSchema, updateEmployeeSchema } from "./validation.js";

const router = express.Router();

router.use(authRequired);

router.post("/", 
    validate(registerationSchema),
    employeeController.registerEmployee);
router.get("/", 
    employeeController.getEmployees);
router.get("/:id", 
    employeeController.getEmployee);
router.patch("/:id", 
    validate(updateEmployeeSchema),
    employeeController.updateEmployee);
router.delete("/:id", 
    employeeController.deleteEmployee);

router.post("/:id/photo", 
    upload.single("photo"), 
    employeeController.uploadPhoto);
router.post("/:id/qrcode", 
    employeeController.generateNewQRcode);
router.get("/:id/attendances", 
    employeeController.getEmployeeAttendances);

export default router;

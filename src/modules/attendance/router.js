import * as attendanceController from "./controller.js";
import authRequired from "../../middleware/authRequired.js";
import express from "express";

const router = express.Router();

router.post("/scan", 
    attendanceController.scanAttendance);
router.get("/today", 
    authRequired,
    attendanceController.getTodayAttendance);
router.get("/", 
    authRequired,
    attendanceController.getAttendances);

export default router;



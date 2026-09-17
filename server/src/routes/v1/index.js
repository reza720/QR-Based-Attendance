import express from "express";
import employeeRouter from "../../modules/employee/v1/router.js";
import attendanceRouter from "../../modules/attendance/v1/router.js";
import authRouter from "../../modules/auth/v1/router.js";

const router = express.Router();

router.use("/employees", employeeRouter);
router.use("/attendances", attendanceRouter);
router.use("/auth", authRouter);

export default router;


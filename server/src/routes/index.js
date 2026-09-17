import express from "express";
import employeeRouter from "../modules/employee/router.js";
import attendanceRouter from "../modules/attendance/router.js";
import authRouter from "../modules/auth/router.js";
import requestLogger from "../middleware/requestLogger.js";

const router = express.Router();

router.use(requestLogger);

router.use("/employees", employeeRouter);
router.use("/attendances", attendanceRouter);
router.use("/auth", authRouter);

export default router;


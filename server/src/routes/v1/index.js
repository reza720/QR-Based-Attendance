import express from "express";
import employeeRouter from "../../modules/employee/router.v1.js";
import attendanceRouter from "../../modules/attendance/router.v1.js";

const router = express.Router();

router.use("/employees", employeeRouter);
router.use("/attendances", attendanceRouter);

export default router;


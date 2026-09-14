import Attendance from "./model.js";
import Employee from "../employee/model.js";
import throwError from "../../utils/throwError.js";
import crypto from "node:crypto";
import { Op } from "sequelize";

/**
 * Handle employee attendance check-in and check-out
 *
 * @param {string} token - QR code token
 * @returns {Promise<Object>} Employee name, attendance action, and time
 */

export const scanAttendance = async (token) => {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const employee = await Employee.findOne({
        where: {
            QRcodeTokenHash: tokenHash
        }
    });
    if (!employee) throwError("Employee not found", 400);
    if (employee.isActive === false) throwError("Employee is deactivated", 400);


    const currentDateTime = new Date();
    const today = currentDateTime.toISOString().split("T")[0];

    const todayAttendance = await Attendance.findOne({
        where: {
            employeeId: employee.id,
            date: today
        }
    });

    let attendance;
    let action;
    let time;

    if (!todayAttendance) {
        attendance = await Attendance.create({
            employeeId: employee.id,
            date: today,
            checkInTime: currentDateTime,
            checkOutTime: null
        });
        action = "checked-in";
        time = attendance.checkInTime;
    } else if (todayAttendance.checkOutTime === null) {
        attendance = await todayAttendance.update({
            checkOutTime: currentDateTime
        });
        action = "checked-out";
        time = attendance.checkOutTime;
    } else {
        throwError("Employee has already checked out today", 400);
    }

    return {
        fullName: `${employee.firstName} ${employee.lastName}`,
        action,
        time
    };
};

/**
 * Retrieve attendance history
 * 
 * @param {Object} options - Query parameters: page, limit, search 
 * @returns {Promise<Object>} Paginated attendance history
 */
export const getAttendances = async (options = {}) => {
    const {
        page = 1,
        limit = 20,
        search
    } = options;

    const offset = (page - 1) * limit;

    const where = search
        ? {
            [Op.or]: [
                {
                    "$Employee.firstName$": {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    "$Employee.lastName$": {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
        : {};

    const attendances = await Attendance.findAndCountAll({
        where,
        include: [
            {
                model: Employee,
                attributes: [
                    "id",
                    "firstName",
                    "lastName"
                ]
            }
        ],
        attributes: [
            "date",
            "checkInTime",
            "checkOutTime"
        ],
        limit: Number(limit),
        offset,
        order: [["date","DESC"]]
    });

    return {
        page: Number(page),
        limit: Number(limit),
        totalAttendances: attendances.count,
        totalPages: Math.ceil(attendances.count / limit),
        attendances: attendances.rows
    };
};

/**
 * Retrieve today's attendance records.
 *
 * @returns {Promise<Object>} Today's attendance records and employee counts.
 */
export const getTodayAttendance = async () => {
    const today = new Date().toISOString().split("T")[0];

    const totalActiveEmployees = await Employee.count({
        where: {
            isActive: true
        }
    });

    const todayAttendance = await Attendance.findAndCountAll({
        where: {
            date: today
        },
        include: [
            {
                model: Employee,
                attributes: [
                    "id",
                    "firstName",
                    "lastName"
                ]
            }
        ],
        attributes: [
            "date",
            "checkInTime",
            "checkOutTime"
        ]
    });

    return {
        totalActiveEmployees,
        totalPresentToday: todayAttendance.count,
        employees: todayAttendance.rows
    };
};









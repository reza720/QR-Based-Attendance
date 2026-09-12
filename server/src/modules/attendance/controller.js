import * as attendanceService from "./service.js";

// Scan controller
// req: token from body
// res: success, status, message, and data returned from service
export const scanAttendance = async (req, res)=> {
    const attendance = await attendanceService.scanAttendance(req.body.token);
    res.status(200).json({
        success: true,
        message: "Attendance marked",
        attendance
    });
}

// get All Attendace Controller
// req: Quary parameters
// as previous module
export const getAttendances = async (req, res) => {
    const attendances = await attendanceService.getAttendances({
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.search
    });
    res.status(200).json({
        success: true,
        message: "Attendances fetched",
        attendances
    });
};

// get to day attendace
// req: just call the service and store
// res: success, status, message, and data returned from service
export const getTodayAttendance = async (req, res) => {
    const todayAttendance = await attendanceService.getTodayAttendance();
    res.status(200).json({
        success: true,
        message: "Today's attendance records retrieved successfully",
        todayAttendance
    });
}




import * as attendanceService from "./service.js";

// Scan
export const scanAttendance = async (req, res)=> {
    const attendance = await attendanceService.scanAttendance(req.body.token);
    res.status(200).json({
        success: true,
        message: "Attendance marked",
        attendance
    });
}

// Retrieve list of attendances
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

// Retrieve today's attendances
export const getTodayAttendance = async (req, res) => {
    const todayAttendance = await attendanceService.getTodayAttendance();
    res.status(200).json({
        success: true,
        message: "Today's attendance records retrieved successfully",
        todayAttendance
    });
}




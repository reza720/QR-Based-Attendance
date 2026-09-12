import * as employeeService from "./service.js"


// register
// input: firstName and lastName from req.body
// output: success, status code, message, data
export const registerEmployee = async (req, res) => {
    const employee = await employeeService.registerEmployee(req.body);
    res.status(201).json({
        success: true,
        message: "Employee Registered",
        employee
    });
};
// Read all employees:
// Input: query parameters from req.query
// Output: success, status code, message, data
export const getEmployees = async (req, res) => {
    const employees = await employeeService.getEmployees({
        page: req.query.page,
        limit: req.query.limit,
        isActive: req.query.isActive,
        search: req.query.search
    });
    
    res.status(200).json({
        success: true,
        message: "Employees fetched",
        employees
    });
};
// read one emplyee:
// input: id from req.param
// output: success, status code, message, data
export const getEmployee = async (req, res) => {
    const employee = await employeeService.getEmployee(req.params.id);
    res.status(200).json({
        success: true,
        message: "Employee data fetched",
        employee
    });
};
// Photo upload: 
// input: id from req.param, file from req.file
// output: success, status code, message, file path
export const uploadPhoto = async (req, res) => {
    const photoPath = await employeeService.uploadPhoto(req.params.id, req.file);
    res.status(200).json({
        success: true,
        message: "Photo uploaded",
        photoPath
    });
};
// update employee:
// input: id from req.param, data(firstName, lastName, status)from req.body,  photo from req.file
// output: success, status code, message, data
export const updateEmployee = async (req, res) => {
    const employeeId = req.params.id;
    const data = req.body;
    const employeeUpdatedData = await employeeService.updateEmployee(employeeId, data);
    res.status(200).json({
        success: true,
        message: "Employee data updated",
        employeeUpdatedData
    });
};
// delete employee: 
// input: id from req.param
// output: success, status code, message
export const deleteEmployee = async (req, res) => {
    await employeeService.deleteEmployee(req.params.id);
    res.status(200).json({
        success: true,
        message: "Employee deleted"
    });
};
// geneate new QR
// input: id from req.param
// output: success, status code, message, qrcode path
export const generateNewQRcode = async (req, res) => {
    const QRcode = await employeeService.generateNewQRcode(req.params.id);
    res.status(200).json({
        success: true,
        message: "New QR code generated",
        QRcode
    });
};
// Get One Employee Attendances
// Input: employeeId from params
// Output: attendance record of employee with his basic info
export const getEmployeeAttendances = async (req, res) => {
    const attendances = await employeeService.getEmployeeAttendances(req.params.id);
    res.status(200).json({
        success: true,
        message: "Attendance of employee fetched",
        attendances
    });
}





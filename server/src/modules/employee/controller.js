import * as employeeService from "./service.js"

// Register employee
export const registerEmployee = async (req, res) => {
    const employeeData = await employeeService.registerEmployee(req.body);

    const relativePath = employeeData.QRcodePath.split("QRcodes")[1].replace(/\\/g, "/");
    const qrCodeUrl = `/qrcodes/${relativePath}`;

    res.status(201).location(`/api/v1/employees/${employeeData.id}`).json({
        success: true,
        message: "Employee Registered",
        employee:{
            ...employeeData,
            QRcodePath: qrCodeUrl
        }
    });
};

// Retrieve list of employee
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

// Retrieve a single employee
export const getEmployee = async (req, res) => {
    const employee = await employeeService.getEmployee(req.params.id);
    res.status(200).json({
        success: true,
        message: "Employee data fetched",
        employee
    });
};

// Upload photo
export const uploadPhoto = async (req, res) => {
    const photoPath = await employeeService.uploadPhoto(req.params.id, req.file);
    res.status(200).json({
        success: true,
        message: "Photo uploaded",
        photoPath
    });
};

// Update employee
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

// Delete employee 
export const deleteEmployee = async (req, res) => {
    await employeeService.deleteEmployee(req.params.id);
    res.status(200).json({
        success: true,
        message: "Employee deleted"
    });
};

// Regeneate QR code
export const generateNewQRcode = async (req, res) => {
    const QRcode = await employeeService.generateNewQRcode(req.params.id);
    res.status(200).json({
        success: true,
        message: "New QR code generated",
        QRcode
    });
};

// Retrieve attendance record of an employee
export const getEmployeeAttendances = async (req, res) => {
    const attendances = await employeeService.getEmployeeAttendances(req.params.id);
    res.status(200).json({
        success: true,
        message: "Attendance of employee fetched",
        attendances
    });
}





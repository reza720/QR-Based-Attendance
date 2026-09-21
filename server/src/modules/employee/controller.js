import * as employeeService from "./service.js"

// Register employee
export const registerEmployee = async (req, res) => {
    const employeeData = await employeeService.registerEmployee(req.body);

    const qrcodeRelativeUrl = employeeData.QRcodePath.split("QRcodes")[1].replace(/\\/g, "/");

    res.status(201).location(`/api/v1/employees/${employeeData.id}`).json({
        success: true,
        message: "Employee Registered",
        employee:{
            ...employeeData,
            QRcodePath: qrcodeRelativeUrl
        }
    });
};

// Retrieve list of employee
export const getEmployees = async (req, res) => {
    const result = await employeeService.getEmployees({
        page: req.query.page,
        limit: req.query.limit,
        isActive: req.query.isActive,
        search: req.query.search
    });

    const employees = result.employees.map((employee) => ({
        ...employee,
        photoPath: employee.photoPath 
        ? `${employee.photoPath.split("photos")[1].replace(/\\/g, "/")}`
        : null
    }));
    
    res.status(200).json({
        success: true,
        message: "Employees fetched",
            ...result,
        employees
    });
};

// Retrieve a single employee
export const getEmployee = async (req, res) => {
    const employeeData = await employeeService.getEmployee(req.params.id);
    
    const photoRelativeUrl = employeeData.photoPath 
        ? employeeData.photoPath.split("photos")[1].replace(/\\/g, "/")
        : null;
    const qrcodeRelativeUrl = employeeData.QRcodePath.split("QRcodes")[1].replace(/\\/g, "/");

    res.status(200).json({
        success: true,
        message: "Employee data fetched",
        employee: {
            ...employeeData,
            QRcodePath: qrcodeRelativeUrl,
            photoPath: photoRelativeUrl
        }
    });
};

// Upload photo
export const uploadPhoto = async (req, res) => {
    const photoPath = await employeeService.uploadPhoto(req.params.id, req.file);
    
    const photoRelativeUrl = photoPath 
        ? photoPath.split("photos")[1].replace(/\\/g, "/")
        : null;

    res.status(200).json({
        success: true,
        message: "Photo uploaded",
        photoRelativeUrl
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

// Regenerate QR code
export const generateNewQRcode = async (req, res) => {
    const employeeQRcode = await employeeService.generateNewQRcode(req.params.id);
    
    const qrcodeRelativeUrl = employeeQRcode.QRcodePath.split("QRcodes")[1].replace(/\\/g, "/");

    res.status(200).json({
        success: true,
        message: "New QR code generated",
        qrcodeRelativeUrl
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





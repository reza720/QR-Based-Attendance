import * as userService from "./service.js";

// Login
export const login = async (req, res) => {
    const user = await userService.login(req. body);
    req.session.userId = user.id;

    res.status(200).json({
        success: true,
        message: "Logged in",
        user
    });
};

// Logout
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return next(err);
        }
            
        res.status(200).json({
            success: true,
            message: "Logged out"
        });
    });
};

// User's update
export const updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req.body);
    res.status(200).json({
        success: true,
        message: "User Updated",
        updatedUser
    });
};

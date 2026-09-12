import * as userService from "./service.js";

// loging
// input: userName and password
// create session with user id
// res: status, success, message, user data
export const login = async (req, res) => {
    const user = await userService.login(req. body);
    req.session.userId = user.id;

    res.status(200).json({
        success: true,
        message: "Logged in",
        user
    });
};
// logout
// input: req 
// destroy the session
// res: status, success, message
export const logout = (req, res, next) => {
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

//update
// input: userId form session, data to update from req.body
// status, success, message, user data
export const updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req.body);
    res.status(200).json({
        success: true,
        message: "User Updated",
        updatedUser
    });
};

import User from "./model.js";
import bcrypt from "bcrypt";
import throwError from "../../utils/throwError.js";

// login
// input: userName, password
// Verify the password
// output: user id and userName
export const login = async ({userName, password}) => {
    const user = await User.findOne({
        where:{
            userName
        }
    });
    if(!user) throwError("User not found", 404);

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if(!isPasswordValid) throwError("Invalid password", 400);
    
    return {
        id: user.id,
        userName: user.userName
    }
};
// update (userName/password)
// input: userId, data that need to be updated
// output: updated data of user
export const updateUser = async ({userId, newUserName, newPassword}) => {
    const user = await User.findByPk(userId);
    if(!user) throwError("User not found", 404);

    const updatedData = {};
    if(newUserName !== undefined){
        updatedData.userName = newUserName
    };

    if(newPassword !== undefined){
        updatedData.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await user.update(updatedData);

    return {
        id: updatedUser.id,
        userName: updatedUser.userName
    }
};




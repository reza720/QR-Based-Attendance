import User from "./model.js";
import bcrypt from "bcrypt";
import throwError from "../../utils/throwError.js";

 /**
  * Authenticate a user with username and password
  *
  * @param {Object} credentials 
  * @returns {Promise<Object>} Logged in user data(id and username)
  */
export const login = async ({userName, password}) => {
    console.log("service starts")
    const user = await User.findOne({
        where:{
            userName
        }
    });
    console.log("user try to found")
    if(!user) throwError("Invalid password or username", 400);

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if(!isPasswordValid) throwError("Invalid password or username", 400);
    
    console.log("password checked")
    return {
        id: user.id,
        userName: user.userName
    }
};

/**
 * Update user's username and password
 * 
 * @param {Object} Credentials 
 * @returns {Promise<Object>} User id and username
 */
export const updateUser = async ({userId, oldPassword, newPassword, newUserName}) => {
    const user = await User.findByPk(userId);
    if (!user) throwError('User not found', 404);

    const isPassMatched = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isPassMatched) throwError('Password is not valid', 401);

    const updatedData = {};
    if (newUserName !== undefined) {
        updatedData.userName = newUserName;
    }
    if (newPassword !== undefined) {
        updatedData.passwordHash = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await user.update(updatedData);

    return {
        id: updatedUser.id,
        userName: updatedUser.userName,
    };
};




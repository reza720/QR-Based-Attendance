import User from "./model.js";
import bcrypt from "bcrypt";
import throwError from "../../utils/throwError.js";
import logger from "../../config/logger.js";

 /**
  * Authenticate a user with username and password
  *
  * @param {Object} credentials 
  * @returns {Promise<Object>} Logged in user data(id and username)
  */
export const login = async ({userName, password}) => {
    const user = await User.findOne({
        where:{
            userName
        }
    });
    if(!user) {
        logger.warn(`${userName} login failed`);
        throwError("Invalid password or username", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if(!isPasswordValid){
        logger.warn(`${userName} login failed`);
        throwError("Invalid password or username", 400);
    }

    logger.info(`User with ID ${user.id} logged in successfully`);
    
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
    logger.info(`User with ID ${userId} Updated`);

    return {
        id: updatedUser.id,
        userName: updatedUser.userName,
    };
};




import fs from "fs/promises";

/**
 * Delete a file from a path
 * 
 * @param {string} filePath 
 */
const deleteFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }
};

export default deleteFile;
/**
 * Create and throw an error with status code
 * 
 * @param {string} message 
 * @param {number} code 
 */
function throwError (message, code){
    const err = new Error(message);
    err.status = code;
    throw err;
};

export default throwError;
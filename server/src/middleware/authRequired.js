/**
 * Check if the user has a valid session.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const authRequired = (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }
    next();
}

export default authRequired;


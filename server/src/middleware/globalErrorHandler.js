import logger from "../config/logger.js";

/**
 * Handle API errors, log them, and send a standardized response.
 */
export const globalErrorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 500;

    logger.error(err, {
        method: req.method,
        path: req.originalUrl,
        statusCode,
        userId: req.user?.id,
        ip: req.ip
    });

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
};
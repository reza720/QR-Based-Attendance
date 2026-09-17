import logger from "../config/logger.js";

const requestLogger = (req, res, next) => {
    const reqStart = Date.now();

    res.on("finish", () => {
        const responseTime = Date.now() - reqStart;

        logger.info("HTTP request", {
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            responseTime,
            ip: req.ip,
            userAgent: req.get("user-agent"),
            userId: req.user?.id
        });
    });

    next();
};

export default requestLogger;
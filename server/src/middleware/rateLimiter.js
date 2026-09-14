import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
    windowMs: 30 * 1000,
    limit: 6,
    legacyHeaders: false,
    standardHeaders: "draft-8",
    message: {
        message: "Too many login attemps, please try latter"
    }
});


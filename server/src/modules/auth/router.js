import * as userController from "./controller.js";
import express from "express";
import authRequired from "../../middleware/authRequired.js";
import {loginRateLimiter} from "../../middleware/rateLimiter.js";

const router = express.Router();

router.post("/login", 
    loginRateLimiter,
    userController.login);
router.post("/logout", 
    authRequired, 
    userController.logout);
router.patch("/update", 
    authRequired, 
    userController.updateUser);

export default router;
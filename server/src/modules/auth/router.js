import * as userController from "./controller.js";
import express from "express";
import authRequired from "../../middleware/authRequired.js";
import {loginRateLimiter} from "../../middleware/rateLimiter.js";
import { updateUserSchema } from "./validation.js";
import validate from "../../middleware/validate.js";

const router = express.Router();

router.post("/login", 
    loginRateLimiter,
    userController.login);
router.post("/logout", 
    authRequired, 
    userController.logout);
router.patch("/update", 
    authRequired, 
    validate(updateUserSchema),
    userController.updateUser);

export default router;
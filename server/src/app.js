import express from "express";

import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cookieParser from "cookie-parser";

import sessionMiddleware from "./config/sessionMiddleware.js";
import v1Router from "./routes/v1/index.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";

const app = express();

app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.use("/api/v1", v1Router);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(globalErrorHandler);

export default app;


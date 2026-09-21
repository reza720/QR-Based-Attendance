import express from "express";

import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cookieParser from "cookie-parser";

import sessionMiddleware from "./config/sessionMiddleware.js";
import v1Router from "./routes/v1/index.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";

import path from "node:path";

const app = express();

app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.use("/api/v1", v1Router);
app.use('/api/v1/qrcodes', express.static(path.join(process.cwd(), 'storage/QRcodes')));
app.use('/api/v1/photos', express.static(path.join(process.cwd(), 'storage/photos')));

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(globalErrorHandler);

export default app;


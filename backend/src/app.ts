import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.handler";
import { requestLogger } from "./middlewares/request.logger";

const app: Express = express();

// Middleware
app.use(requestLogger);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error Handler (must be last)
app.use(errorHandler);

export default app;
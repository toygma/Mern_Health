import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.handler";
import { requestLogger } from "./middlewares/request.logger";

//ROUTES
import userRoute from "./routes/user.route";


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
app.use("/api/v1/auth",userRoute)

// Error Handler (must be last)
app.use(errorHandler);

export default app;
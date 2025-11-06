import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.handler";
import { requestLogger } from "./middlewares/request.logger";
import cookieParser from "cookie-parser";

//ROUTES
import userRoute from "./routes/user.route";
import adminRouter from "./routes/admin.route";
import reviewRouter from "./routes/review.route";
import appointmentRouter from "./routes/appointment.route";
import stripeRouter from "./routes/stripe.route";
import { handleStripeWebhook } from "./controllers/webhook.controller";

const app: Express = express();

//path deploy
import path from "path";
const __dirname = path.resolve();

//webhooks
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

// Middleware
app.use(requestLogger);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/payment", stripeRouter);

// Error Handler (must be last)
app.use(errorHandler);

//deploy
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    const indexPath = path.resolve(__dirname, "../frontend/dist/index.html");
    res.sendFile(indexPath);
  });
}

export default app;

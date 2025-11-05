import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";
import stripeController from "../controllers/stripe.controller";

const stripeRouter = express.Router();

stripeRouter.post(
  "/checkout-session/:doctorId/:appointmentId",
  isAuthenticatedUser,
  stripeController.getCheckoutSession
);




export default stripeRouter;

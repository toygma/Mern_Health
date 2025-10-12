import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";
import { createReview, getAllReviews } from "../controllers/review.controller";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get("/", isAuthenticatedUser, getAllReviews);

reviewRouter.post("/", isAuthenticatedUser, createReview);

export default reviewRouter;

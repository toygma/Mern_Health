import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";
import { createReview, deleteReview, getAllReviews } from "../controllers/review.controller";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get("/", isAuthenticatedUser, getAllReviews);

reviewRouter.post("/:id", isAuthenticatedUser, createReview);

reviewRouter.delete("/:id", isAuthenticatedUser, deleteReview);


export default reviewRouter;

import { Request, Response, NextFunction } from "express";
import Review from "../models/review.model";

// GET /reviews
const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "name email")
      .populate("doctor", "name speciality");

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error("Get All Reviews Error:", error);
    next(error);
  }
};

// POST /reviews
const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, comment } = req.body;
    const { id: doctorId } = req.params;

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "You must log in to review (User ID missing).",
      });
    }

    if (!doctorId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID, rating and comment are mandatory.",
      });
    }
    const existingReview = await Review.findOne({
      user: userId,
      doctor: doctorId,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already made an evaluation for this doctor.",
      });
    }

    const newReview = new Review({
      user: userId,
      doctor: doctorId,
      rating,
      comment,
    });
    const savedReview = await newReview.save();

    res.status(201).json({
      success: true,
      message: "Your review has been submitted successfully.",
      data: savedReview,
    });
  } catch (error) {
    console.error("Create Review Error:", error);
    next(error);
  }
};

export { getAllReviews, createReview };

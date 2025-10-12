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

//DELETE
const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id:reviewId } = req.params;
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "You must log in to delete a review.",
      });
    }

    if (!reviewId) {
      return res.status(400).json({
        success: false,
        message: "Review ID is required.",
      });
    }

    const review = await Review.findById(reviewId);
    console.log("🚀 ~ deleteReview ~ review:", review)

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    // Check if the user is the review owner
    if (review.user._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews.",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Review Error:", error);
    next(error);
  }
};

export { getAllReviews, createReview, deleteReview };
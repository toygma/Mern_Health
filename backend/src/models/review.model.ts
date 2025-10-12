import mongoose, { Schema, Document, Types, Query } from "mongoose";
import Doctor from "./doctor.model";

export interface IReview extends Document {
  user: Types.ObjectId;
  doctor: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IReviewModel extends mongoose.Model<IReview> {
  calcAverageRatings(id: Types.ObjectId): Promise<void>;
}

const reviewSchema = new Schema<IReview, IReviewModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-find hook to populate user data
reviewSchema.pre<Query<IReview[], IReview>>(/^find/, function (next) {
  this.populate([{ path: "user", select: "name images" }]);
  next();
});

// Define static method
reviewSchema.statics.calcAverageRatings = async function (id: Types.ObjectId) {
  try {
    const stats = await this.aggregate([
      { $match: { doctor: id } },
      {
        $group: {
          _id: "$doctor",
          numOfRating: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    // Check if stats array has data
    if (stats.length > 0) {
      await Doctor.findByIdAndUpdate(id, {
        totalRating: stats[0].numOfRating,
        averageRating: stats[0].avgRating,
      });
    } else {
      // If no reviews, reset ratings
      await Doctor.findByIdAndUpdate(id, {
        totalRating: 0,
        averageRating: 0,
      });
    }
  } catch (error) {
    console.error("Error calculating average ratings:", error);
  }
};

reviewSchema.post("save", async function () {
  (this.constructor as IReviewModel).calcAverageRatings(this.doctor);
  
  await Doctor.findByIdAndUpdate(
    this.doctor,
    { $push: { reviews: this._id } },
    { new: true }
  );
});

reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await (this.model as IReviewModel).calcAverageRatings(doc.doctor);
    
    await Doctor.findByIdAndUpdate(
      doc.doctor,
      { $pull: { reviews: doc._id } },
      { new: true }
    );
  }
});

const Review =
  (mongoose.models.Review as IReviewModel) ||
  mongoose.model<IReview, IReviewModel>("Review", reviewSchema);

export default Review;
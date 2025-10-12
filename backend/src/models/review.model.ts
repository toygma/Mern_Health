import mongoose, { Schema, Document, Types, Query } from "mongoose";

// Review interface
export interface IReview extends Document {
  user: Types.ObjectId;
  doctor: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
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

reviewSchema.pre<Query<IReview[], IReview>>(/^find/, function (next) {
  this.populate([
    { path: "user", select: "name images" },
  ]);
  next();
});


const Review =
  (mongoose.models.Review as mongoose.Model<IReview>) ||
  mongoose.model<IReview>("Review", reviewSchema);

export default Review;

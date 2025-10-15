import React, { useEffect, useState } from "react";
import { MessageCircle, User, Calendar, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  useCreateReviewsMutation,
  useDeleteReviewsMutation,
  useGetMeReviewsQuery,
} from "../../../redux/api/reviews-api";

interface Review {
  _id: string;
  user: {
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onChange,
  readOnly = false,
  size = 24,
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readOnly && onChange?.(star)}
          disabled={readOnly}
          type="button"
          className={`transition-transform ${
            !readOnly && "hover:scale-110 cursor-pointer"
          }`}
        >
          <Star
            size={size}
            className={`${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

interface ReviewsProps {
  id?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ id }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [createReviews, { isLoading, isSuccess, error }] =
    useCreateReviewsMutation();

  const [
    deleteReview,
    { isLoading: deleteLoading, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteReviewsMutation();

  const { data: reviewsData } = useGetMeReviewsQuery(id);

  // Type guard for reviews data
  const reviews: Review[] = reviewsData?.data ?? [];

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review created successfully!");
    } else if (error && "data" in error) {
      const errorMessage =
        (error as any)?.data?.message || "Failed to create review";
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Review deleted successfully!");
      setDeletingId(null);
    } else if (deleteError && "data" in deleteError) {
      const errorMessage =
        (deleteError as any)?.data?.message || "Failed to delete review";
      toast.error(errorMessage);
    }
  }, [deleteSuccess, deleteError]);

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }

    try {
      const newReview = {
        rating,
        comment,
      };

      await createReviews({ id, body: newReview });
      setRating(0);
      setComment("");
    } catch (error: any) {
      toast.error("Failed to submit review", error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setDeletingId(reviewId);
      try {
        await deleteReview({ id: reviewId });
      } catch (error: any) {
        toast.error("Failed to delete review", error);
      }
    }
  };

  const averageRating: string =
    reviews.length > 0
      ? (
          reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reviews Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-indigo-600" />
            Patient Reviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Rating Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">
                  {averageRating}
                </div>
                <div className="flex justify-center mb-3">
                  <StarRating
                    rating={Math.round(parseFloat(averageRating))}
                    readOnly
                  />
                </div>
                <p className="text-gray-600">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">
                Rating Distribution
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(
                    (r: Review) => r.rating === star
                  ).length;
                  const percentage =
                    reviews.length > 0
                      ? Math.round((count / reviews.length) * 100)
                      : 0;

                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-12">
                        {star} Star
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Write Review Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Share Your Experience
          </h3>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            {/* Rating Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                How would you rate your experience?
              </label>
              <div className="flex items-center gap-4">
                <StarRating rating={rating} onChange={setRating} size={32} />
                {rating > 0 && (
                  <span className="text-sm text-gray-600">
                    {
                      ["Poor", "Fair", "Good", "Very Good", "Excellent"][
                        rating - 1
                      ]
                    }
                  </span>
                )}
              </div>
            </div>

            {/* Comment Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Share your feedback (at least 10 characters)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell other patients about your experience with this doctor..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={5}
                maxLength={500}
              />
              <div className="mt-2 text-sm text-gray-500">
                {comment.length}/500 characters
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Patient Reviews ({reviews.length})
          </h3>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review: Review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      {review.user.image ? (
                        <img
                          src={review.user.image}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-indigo-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.user.name}
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(review.createdAt)}
                          </div>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            disabled={
                              deleteLoading && deletingId === review._id
                            }
                            className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete review"
                          >
                            {deleteLoading && deletingId === review._id ? (
                              <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <StarRating rating={review.rating} readOnly size={18} />
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

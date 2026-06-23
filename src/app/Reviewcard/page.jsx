"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, User, Calendar } from "lucide-react";

export default function ReviewCards({ propertyId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/reviews/${propertyId}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) fetchReviews();
  }, [propertyId]);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-slate-800/40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-green-800/60 flex items-center justify-center mb-3">
          <MessageSquare size={20} className="text-slate-600" />
        </div>
        <p className="text-slate-400 font-medium text-sm">No reviews yet</p>
        <p className="text-slate-600 text-xs mt-1">Be the first to review this property</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Summary Bar */}
      <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800/60 rounded-2xl px-5 py-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-white">{averageRating}</p>
          <div className="flex items-center gap-0.5 justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-600"
                }
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-1">{reviews.length} reviews</p>
        </div>

        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const percent = (count / reviews.length) * 100;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 w-2">{star}</span>
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 w-4">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Cards */}
      {reviews.map((review) => (
        <div
          key={review._id}
          className="group relative bg-slate-900/50 border border-slate-800/50 hover:border-slate-700/60 rounded-2xl p-5 transition-all duration-200"
        >
          {/* Top Row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-blue-400">
                  {review.tenantName?.charAt(0).toUpperCase()}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{review.tenantName}</p>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className={
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-slate-700"
                      }
                    />
                  ))}
                  <span className="text-[11px] text-slate-500 ml-1">{review.rating}.0</span>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5 text-slate-600 shrink-0">
              <Calendar size={11} />
              <span className="text-[11px]">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Comment */}
          <p className="text-sm text-slate-400 leading-relaxed pl-12">
            {review.comment}
          </p>

          {/* bottom accent line on hover */}
          <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}
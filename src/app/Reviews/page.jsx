"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Star, Send, User, MessageSquare } from "lucide-react";

export default function ReviewForm({ propertyId }) {
  const [form, setForm] = useState({ name: "", comment: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.comment) {
      toast.error("Please fill all fields");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          tenantName: form.name,
          comment: form.comment,
          rating,
          createdAt: new Date(),
        }),
      });

      if (res.ok) {
        toast.success("Review submitted!");
        setForm({ name: "", comment: "" });
        setRating(0);
      } else {
        toast.error("Failed to submit review");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="max-w-lg  mx-auto">
      <div className="relative py-5 rounded-2xl overflow-hidden">

        {/* border glow */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/30 via-slate-700/20 to-indigo-500/20 pointer-events-none" />

        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-7">

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MessageSquare size={14} className="text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Leave a Review</h2>
            </div>
            <p className="text-sm text-slate-500 ml-9">
              Share your experience about this property
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div className="relative group">
              <User
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors"
              />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Comment */}
            <div className="relative group">
              <MessageSquare
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors"
              />
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Write your experience..."
                rows={4}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 text-white text-sm outline-none transition-all resize-none placeholder:text-slate-600"
              />
            </div>

            {/* Star Rating */}
            <div className="bg-slate-800/40 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5">Your Rating</p>
                <p className={`text-sm font-semibold transition-colors ${
                  hover || rating ? "text-yellow-400" : "text-slate-600"
                }`}>
                  {ratingLabels[hover || rating] || "Select rating"}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <Star
                      key={i}
                      size={24}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                      className={`cursor-pointer transition-all duration-150 hover:scale-110 ${
                        starValue <= (hover || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-slate-600"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white
              bg-blue-600 hover:bg-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 flex items-center justify-center gap-2
              shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Submit Review
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
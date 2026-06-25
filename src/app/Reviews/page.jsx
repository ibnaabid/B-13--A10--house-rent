"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Send, Star, User } from "lucide-react";

export default function ReviewForm({ propertyId }) {
  const [form, setForm] = useState({ name: "", comment: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

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

  return (
    <div className="max-w-xl mt-5 px-5 mb-5 mx-auto">
      <div className="relative">
        
        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          
          {/* Top Gradient */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"></div>

          <div className="p-8">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-indigo-900/40">
                    Leave a Review
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Share your experience about this property
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div className="relative group">
                <User className="absolute left-4 top-4 text-slate-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-900/80 border border-slate-700 focus:border-blue-500 text-white outline-none transition"
                />
              </div>

              {/* Comment */}
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 text-slate-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your experience..."
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-900/80 border border-slate-700 focus:border-blue-500 text-white outline-none resize-none transition"
                />
              </div>

              {/* Rating */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-sm">Property Rating</p>
                    <h4 className="text-yellow-400 font-bold mt-1">
                      {ratingLabels[hover || rating] || "Select Rating"}
                    </h4>
                  </div>

                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => {
                      const starValue = i + 1;
                      return (
                        <Star
                          key={i}
                          size={30}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHover(starValue)}
                          onMouseLeave={() => setHover(null)}
                          className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
                            starValue <= (hover || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-600"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-blue-600/30 flex justify-center items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Review
                  </>
                )}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
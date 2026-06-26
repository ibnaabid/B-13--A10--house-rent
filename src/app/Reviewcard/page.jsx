"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`);
        const data = await res.json();
        setReviews(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="w-full px-6 py-16 bg-gradient-to-b from-sky-700/40 to-indigo-300">
      
      {/* TITLE */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          What Our Tenants Say
        </h2>
        <p className="text-slate-500 text-lg">
          Real experiences and stories from people who found their perfect home with us.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading reviews...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {reviews.map((review) => {
            const rating = review.rating || 5;
            const name = review.name || review.tenantName || "Anonymous User";
            const initial = name.charAt(0).toUpperCase();

            return (
              <div
                key={review._id}
                className="group relative bg-amber-500 rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Subtle top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-6">
                  {/* AVATAR */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-inner ring-1 ring-blue-500/10">
                    {initial}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">
                      {name}
                    </h3>
                    <p className="text-xs border-2 px-3 py-2 bg-yellow-100 text-center border-b-cyan-500 rounded-3xl text-red-900 font-medium">
                      {review.comment || "Verified Resident"}
                    </p>
                  </div>
                </div>

                {/* STARS */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-slate-100 text-slate-200"
                      }
                    />
                  ))}
                </div>

                {/* COMMENT */}
                <div className="relative flex-grow">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/10 rotate-180" />
                  <p className="text-slate-600 leading-relaxed text-[15px] relative z-10 pl-2">
                    "{review.comment || "Great experience living here. Highly recommended!"}"
                  </p>
                </div>

                {/* DATE */}
                <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xl  font-bold text-green-900 uppercase tracking-wider">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently added"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
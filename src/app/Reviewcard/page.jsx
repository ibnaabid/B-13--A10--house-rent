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
    <div className="w-full px-6 py-20 bg-gradient-to-b from-slate-50 to-slate-100">
      
      {/* TITLE */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          What Our Tenants Say
        </h2>
        <p className="text-slate-500 text-lg">
          Real experiences and stories from people who found their perfect home with us.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <div className="w-9 h-9 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Loading reviews...</p>
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
                className="group relative bg-white rounded-2xl p-8 border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full backdrop-blur-sm"
              >
                {/* Top decorative accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-6">
                  {/* AVATAR */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {initial}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-base leading-tight">
                      {name}
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-medium px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200/50">
                      Verified Resident
                    </span>
                  </div>
                </div>

                {/* STARS */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={
                        i < rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-200"
                      }
                    />
                  ))}
                </div>

                {/* COMMENT */}
                <div className="relative flex-grow">
                  <Quote className="absolute -top-3 -left-2 w-8 h-8 text-slate-200/70 rotate-180 -z-0" />
                  <p className="text-slate-600 leading-relaxed text-[14px] relative z-10 pl-3 italic">
                    "{review.comment || "Great experience living here. Highly recommended!"}"
                  </p>
                </div>

                {/* DATE */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
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
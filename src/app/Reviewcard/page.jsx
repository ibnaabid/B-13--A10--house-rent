"use client";

import { useEffect, useState } from "react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/reviews");
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
    <div className="w-full px-4 py-12 bg-gradient-to-b from-gray-50 to-white">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        ⭐ Customer Reviews
      </h2>

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-2xl p-5 border border-gray-200 
                         bg-gradient-to-br from-white to-blue-500
                         shadow-md hover:shadow-xl transition-all duration-300"
            >

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">
                
                {/* AVATAR */}
                <div className="w-11 h-11 rounded-full 
                                bg-gradient-to-r from-blue-500 to-purple-500
                                text-white flex items-center justify-center font-bold shadow">
                  {review.name?.charAt(0) || "U"}
                </div>

                <div>
                  <h3 className="font-semibold text-red-800">
                    {review.name}
                  </h3>
                  <p className="text-xs text-blue-500">
                    {review.email || "User"}
                  </p>
                </div>
              </div>

              {/* STARS */}
              <div className="text-yellow-500 mb-2 text-sm">
                {"⭐".repeat(review.rating || 5)}
              </div>

              {/* COMMENT */}
              <p className="text-gray-700 text-sm leading-relaxed bg-white/70 p-3 rounded-lg border">
                {review.comment || "No comment provided"}
              </p>

              {/* DATE */}
              <p className="text-xs text-green-900 font-bold mt-4">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : ""}
              </p>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function StatusColumn({ item }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const status = item?.status?.toLowerCase();

  useEffect(() => {
    const fetchFeedback = async () => {
      if (status !== "rejected") return;

      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/reject-feedback/${item._id}`
        );

        const data = await res.json();
        console.log(data)

        setFeedback(data?.feedback || "No feedback provided");
      } catch (error) {
        setFeedback("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [status, item._id]);

  return (
    <div className="space-y-2">

      {/* STATUS BADGE */}
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block
          ${
            status === "accepted"
              ? "bg-green-100 text-green-600"
              : status === "rejected"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
      >
        {item.status || "Pending"}
      </span>

      {/* FEEDBACK */}
      {status === "rejected" && (
        <div className="mt-2 p-3 rounded-lg border bg-red-50">
          <p className="text-sm font-semibold text-red-600 mb-1">
            Rejection Feedback
          </p>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : (
            <p className="text-gray-700 text-sm">
              {feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

export default function StatusColumn({ item }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const getFeedback = async () => {
    if (showFeedback) {
      setShowFeedback(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/reject-feedback/${item._id}`
      );

      const data = await res.json();

      console.log("d",data);

      setFeedback(data.feedback || "No feedback provided");
      setShowFeedback(true);
    } catch (error) {
      console.log(error);
      setFeedback("Failed to load feedback");
      setShowFeedback(true);
    } finally {
      setLoading(false);
    }
  };

  const status = item?.status?.toLowerCase();

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer
            ${
              status === "accepted"
                ? "bg-green-100 text-green-600"
                : status === "rejected"
                ? "bg-red-600 text-red-300"
                : "bg-yellow-100 text-yellow-600"
            }`}
          onClick={status === "rejected" ? getFeedback : undefined}
        >
          {item.status || "Pending"}
        </span>

        {status === "rejected" && (
          <button onClick={getFeedback}>
            <HelpCircle
              size={16}
              className="text-red-500 hover:text-red-700"
            />
          </button>
        )}
      </div>

      {showFeedback && (
        <div className="absolute left-0 top-10 w-72 bg-white border shadow-xl rounded-xl p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-red-500">
              Rejection Feedback
            </h3>

            <button
              onClick={() => setShowFeedback(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <p className="text-gray-700">{feedback}</p>
          )}
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { Eye, XCircle } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const ViewFeedbackModal = ({ item }) => {
  
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);

    try {

      const {data:token} = await authClient.token()


      const res = await fetch(
        `http://localhost:5000/reject-feedback/${item?._id}`,
        {
          headers:
          {
            authorization : `Bearer ${token.token}`
          }
        }
      );

      const data = await res.json();
      console.log(data,"feddback")

      setFeedback(data?.feedback || "No feedback found");
    } catch (error) {
      console.log(error);
      setFeedback("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-red-700 flex px-3 pb-2 gap-2 hover:bg-violet-700 text-white p-2 rounded-xl transition"
      >
        <Eye size={18} /> Reject
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-purple-700 p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Rejection Feedback
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-red-300"
              >
                <XCircle size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {loading ? (
                <div className="text-center text-slate-400">
                  Loading...
                </div>
              ) : (
                <>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
                    <p className="text-slate-300 leading-relaxed">
                      {feedback}
                    </p>
                  </div>

                  <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <p className="text-red-300 text-sm">
                      This property was rejected by the admin.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ViewFeedbackModal;
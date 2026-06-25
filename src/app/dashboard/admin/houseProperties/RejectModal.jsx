"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

const RejectModal = ({ home }) => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {

    const {data:token} = await authClient.token()


    if (!feedback) {
      return toast.error("Please write feedback");
    }

    try {
      setLoading(true);

      // Save feedback
      await fetch(
        `http://localhost:5000/reject-feedback/${home._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`
          },
          body: JSON.stringify({
            feedback,
            status: "Rejected",
          }),
        }
      );

      // Update property status
      const res = await fetch(
        `http://localhost:5000/allhome/${home._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token.token}`
          },
          body: JSON.stringify({
            status: "Rejected",
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Property Rejected");
        setOpen(false);
        setFeedback("");
      window.location.reload()
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
      >
        Reject
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 w-full max-w-md p-6 rounded-2xl border border-slate-700">

            <h2 className="text-2xl font-bold text-white mb-4">
              Reject Property
            </h2>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write rejection feedback..."
              className="w-full h-32 p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default RejectModal;
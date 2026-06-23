"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function Delete({ home, isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/allhome/${home._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Property deleted");
        onSuccess();
        onClose();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Trash2 size={18} className="text-red-500" />
          <h2 className="text-lg font-semibold">Delete Property</h2>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-500">
          এই property delete করতে চাও?
        </p>

        <p className="text-sm font-medium text-gray-800 mt-2">
          {home?.title}
        </p>

        <p className="text-xs text-red-500 mt-1">
          এই action undo করা যাবে না।
        </p>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}
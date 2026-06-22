"use client";

import toast from "react-hot-toast";

export default function DeleteModal({ home, close, refresh }) {

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/allhome/${home._id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Deleted successfully");
      refresh();
      close();
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[350px] text-center space-y-4">

        <h2 className="text-xl font-bold text-red-500">
          Delete Property?
        </h2>

        <p>{home.title}</p>

        <div className="flex justify-center gap-3">
          <button onClick={close}>
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
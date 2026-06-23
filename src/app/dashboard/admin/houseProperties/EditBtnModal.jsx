"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EditHome({ home, close, refresh }) {
  const [form, setForm] = useState({
    title: home.title,
    location: home.location,
    price: home.price,
  });

  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:5000/allhome/${home._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      toast.success("Updated successfully");
      refresh();
      close();
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">

        <h2 className="text-xl font-bold">Edit Property</h2>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="border p-2 w-full"
        />

        <div className="flex justify-end gap-2">
          <button onClick={close}>Cancel</button>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}
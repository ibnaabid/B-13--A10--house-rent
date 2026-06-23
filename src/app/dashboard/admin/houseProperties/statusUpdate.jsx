"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const StatusUpdate = ({ home }) => {
    const router = useRouter()
    console.log("home",home)

  const updateStatus = async (status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/allhome/${home._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        toast.success(`Property ${status}`);
router.refresh()
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-2">

      {/* ACCEPT */}
      <button
        onClick={() => updateStatus("accepted")}
        className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
      >
        <CheckCircle size={16} />
      </button>

      {/* REJECT */}
      <button
        onClick={() => updateStatus("rejected")}
        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
      >
        <XCircle size={16} />
      </button>

    </div>
  );
};

export default StatusUpdate;
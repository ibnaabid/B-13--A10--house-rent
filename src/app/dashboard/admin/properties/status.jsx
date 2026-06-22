"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StatusAdmin({ home }) {
       const router=  useRouter()
      
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

      const data = await res.json();

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
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => updateStatus("accepted")}
        title="Accept"
        className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition"
      >
        <CheckCircle size={14} />
      </button>

      <button
        onClick={() => updateStatus("rejected")}
        title="Reject"
        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
      >
        <XCircle size={14} />
      </button>
    </div>
  );
}
"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import RejectModal from "./RejectModal";
// import RejectModal from "./RejectModal";

const StatusUpdate = ({ home }) => {
  const router = useRouter();

  const [isRejectOpen, setIsRejectOpen] = useState(false);

  // ACCEPT (direct)
  const updateStatus = async (status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/allhome/${home?._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        toast.success(`Property ${status}`);
        router.refresh();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // open reject modal
  const handleRejectClick = () => {
    setIsRejectOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectOpen(false);
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

      {/* REJECT (opens modal) */}
      <button
        onClick={handleRejectClick}
        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
      >
        <XCircle size={16} />
      </button>

      {/* REJECT MODAL */}
      {isRejectOpen && (
        <RejectModal
          home={home}
          isOpen={isRejectOpen}
          onClose={closeRejectModal}
          onSuccess={() => {
            closeRejectModal();
            router.refresh();
          }}
        />
      )}
    </div>
  );
};

export default StatusUpdate;
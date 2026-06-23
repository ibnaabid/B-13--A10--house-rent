"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Home,
  MapPin,
  DollarSign,
  User,
  X,
  Send
} from "lucide-react";
import Deletework from "./Deletework";
import EditWork from "./Editwork";

export default function AllHomeTable() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [feedback, setFeedback] = useState("");

  const BASE_URL = "http://localhost:5000";

  const fetchHomes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/allhome`);
      const data = await res.json();
      setHomes(data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  const handleAccept = async (id, title) => {
    try {
      const res = await fetch(`${BASE_URL}/allhome/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }) // শুধু স্ট্যাটাস আপডেট হবে
      });

      if (res.ok) {
        toast.success(`Accepted "${title}" successfully!`);
        fetchHomes(); // টেবিলের ডাটা রিফ্রেশ হবে
      } else {
        toast.error("Failed to accept");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ৩. REJECT বোতামে চাপ দিলে মোডাল ওপেন করা
  const openRejectModal = (home) => {
    setSelectedHome(home);
    setFeedback(""); // আগের লেখা ক্লিয়ার করা
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return toast.error("Please write a reason for rejection");

    try {

      const statusRes = await fetch(`${BASE_URL}/allhome/${selectedHome._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" })
      });

      const feedbackRes = await fetch(`${BASE_URL}/reject-feedback/${selectedHome._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeId: selectedHome._id,
          title: selectedHome.title,
          feedback: feedback,
          rejectedAt: new Date()
        })
      });

      if (statusRes.ok && feedbackRes.ok) {
        toast.error(`Rejected "${selectedHome.title}" with feedback`);
        setIsRejectModalOpen(false); // মোডাল বন্ধ করা
        fetchHomes(); // টেবিল রিফ্রেশ করা
      } else {
        toast.error("Action failed");
      }
    } catch (error) {
      console.error(error);
      toast.success("Failed to submit rejection");
    }
  };

  // ডাইনামিক স্ট্যাটাস কালার হ্যান্ডলার
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted": return "bg-green-100 text-green-700 border border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Home className="text-indigo-600" />
            Premium Homes Dashboard
          </h1>
        </div>

        {/* TABLE CARD */}
        <div className="backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-6 bg-indigo-600 text-white px-6 py-4 text-sm font-semibold">
            <div>Title</div>
            <div>Location</div>
            <div>Price</div>
            <div>Owner</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>

          {/* BODY */}
          <div className="divide-y">
            {loading ? (
              <div className="p-10 text-center text-gray-500 font-medium">
                Loading premium data...
              </div>
            ) : homes.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No homes found
              </div>
            ) : (
              homes.map((home, i) => (
                <div key={home._id || i} className="grid grid-cols-6 items-center px-6 py-5 hover:bg-white transition group">

                  {/* TITLE */}
                  <div className="font-semibold text-gray-800 flex items-center gap-2 truncate pr-2">
                    <Home size={16} className="text-indigo-500 flex-shrink-0" />
                    <span className="truncate">{home.title}</span>
                  </div>

                  {/* LOCATION */}
                  <div className="text-gray-600 flex items-center gap-2 truncate pr-2">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span className="truncate">{home.location}</span>
                  </div>

                  {/* PRICE */}
                  <div className="text-green-600 font-bold flex items-center gap-2">
                    <DollarSign size={16} />
                    {home.price}
                  </div>

                  {/* OWNER */}
                  <div className="text-gray-600 flex items-center gap-2 truncate pr-2">
                    <User size={16} className="flex-shrink-0" />
                    <span className="truncate">{home.ownerName}</span>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${getStatusStyle(home.status)}`}>
                      {home.status || "Pending"}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-center gap-2">
                    {/* ACCEPT BUTTON */}
                    <button
                      onClick={() => handleAccept(home._id, home.title)}
                      className="p-2 rounded-xl bg-green-500 text-white hover:scale-110 transition shadow-md"
                      title="Accept"
                    >
                      <CheckCircle size={16} />
                    </button>

                    {/* REJECT BUTTON */}
                    <button
                      onClick={() => openRejectModal(home)}
                      className="p-2 rounded-xl bg-red-500 text-white hover:scale-110 transition shadow-md"
                      title="Reject with Feedback"
                    >
                      <XCircle size={16} />
                    </button>

                    <EditWork home={home}></EditWork>
                    <Deletework home={home}></Deletework>

                   

                    
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- REJECT MODAL --- */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-red-50 border-b border-red-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                <XCircle className="text-red-500" size={20} /> Reject Listing
              </h3>
              <button 
                onClick={() => setIsRejectModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-red-100 transition"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body / Form */}
            <form onSubmit={handleRejectSubmit} className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                You are rejecting <span className="font-semibold text-gray-800">"{selectedHome?.title}"</span>. Please provide a feedback reason for the owner.
              </p>
              
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Rejection Reason</label>
                <textarea
                  required
                  rows="4"
                  className="w-full rounded-2xl border text-red-900 font-bold border-gray-800 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none transition"
                  placeholder="Example: Low quality images, Incorrect location or Unrealistic pricing..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              
              {/* Modal Footer */}
              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition flex items-center gap-2 shadow-lg shadow-red-200"
                >
                  <Send size={14} /> Submit & Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
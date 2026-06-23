"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Calendar, DollarSign, User, Mail, Home, MapPin } from "lucide-react";

export default function BookPropertyPage({ property }) {
  // ডামি ডাটা (যদি প্রোপার্টি প্রপ্স হিসেবে না আসে)
  const currentProperty = property || {
    _id: "prop_123456",
    title: "Luxury Sky Apartment",
    location: "Gulshan-2, Dhaka",
    price: 25000,
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: "",
    tenantEmail: "",
    bookingDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingDetails = {
      propertyId: currentProperty._id,
      propertyTitle: currentProperty.title,
      propertyLocation: currentProperty.location,
      bookingAmount: currentProperty.price,
      ...formData,
      status: "Pending", // ডিফল্ট স্ট্যাটাস
    };

    try {
      const res = await fetch("http://localhost:5000/Bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      if (res.ok) {
        toast.success("Booking request sent successfully!");
        setFormData({ tenantName: "", tenantEmail: "", bookingDate: "" });
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Failed to submit booking request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] p-4 sm:p-8 flex items-center justify-center antialiased">
      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Book Property
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Confirm your interest by submitting a request
          </p>
        </div>

        {/* Property Mini Summary Card */}
        <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl mb-6 space-y-2">
          <div className="flex items-start gap-2.5">
            <Home className="text-blue-400 shrink-0 w-5 h-5 mt-0.5" />
            <h3 className="text-white text-sm sm:text-base font-semibold truncate">
              {currentProperty.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{currentProperty.location}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-bold text-base pt-1">
            <DollarSign className="w-4 h-4" />
            <span>{currentProperty.price?.toLocaleString()} / month</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleBooking} className="space-y-4 text-sm">
          
          {/* Name input */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium text-xs">Full Name</label>
            <div className="relative">
              <User className="absolute  mt-5 left-3 top-1.5/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                name="tenantName"
                required
                value={formData.tenantName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium text-xs">Email Address</label>
            <div className="relative">
              <Mail className="absolute mt-5 left-3 top-1.5/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="email"
                name="tenantEmail"
                required
                value={formData.tenantEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full  bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Date input */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium text-xs">Desired Move-in Date</label>
            <div className="relative">
              <Calendar className="absolute mt-5 left-3 top-1.5/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="date"
                name="bookingDate"
                required
                value={formData.bookingDate}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all py-3 rounded-xl text-white font-semibold shadow-lg disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Sending Request..." : "Confirm Booking Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
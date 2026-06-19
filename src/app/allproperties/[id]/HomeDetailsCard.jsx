"use client";

import { Heart, X, MapPin, Bed, Bath, DollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const HomeDetailsCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-white">

      {/* IMAGE */}
      <div className="relative w-full h-72">
        <Image
                     src={data.image || "https://via.placeholder.com/400"}
                     alt={data.title}
                     height={300}
                     width={300}
                     className="object-cover"
                   />

        <div className="absolute top-4 left-4 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">
          {data?.status || "Pending"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-3">

        <h1 className="text-2xl font-bold">{data?.title}</h1>

        <div className="flex items-center gap-2 text-slate-300">
          <MapPin size={16} />
          {data?.location}
        </div>

        <div className="flex gap-6 text-slate-300">
          <span className="flex items-center gap-1"><Bed size={16}/> {data?.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath size={16}/> {data?.bathrooms}</span>
          <span className="flex items-center gap-1 text-green-400 font-bold">
            <DollarSign size={16}/> {data?.price}
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">

          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold"
          >
            Book Now
          </button>

          <button
            onClick={() => setIsFav(!isFav)}
            className={`px-5 py-3 rounded-xl border ${
              isFav ? "bg-red-500/20 border-red-500 text-red-400" : "border-slate-700"
            }`}
          >
            <Heart className={isFav ? "fill-red-400" : ""} />
          </button>

        </div>
      </div>

      {/* BOOKING MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

          <div className="bg-slate-900 w-full max-w-md p-6 rounded-2xl border border-slate-700 relative">

            {/* CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Book This Property</h2>

            {/* FORM */}
            <form action="/api/checkout_sessions" method="POST" className="space-y-3">

              {/* hidden data */}
              <input type="hidden" name="propertyId" value={data?._id} />
              <input type="hidden" name="propertyName" value={data?.title} />
              <input type="hidden" name="amount" value={data?.price} />

              <input
                type="date"
                name="moveInDate"
                className="w-full p-3 rounded-lg bg-slate-800"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full p-3 rounded-lg bg-slate-800"
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-slate-800"
                required
              />

              <textarea
                name="notes"
                placeholder="Notes..."
                className="w-full p-3 rounded-lg bg-slate-800"
              />

              <button
                type="submit"
                className="w-full bg-green-600 py-3 rounded-xl font-bold"
              >
                Proceed to Payment
              </button>

            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default HomeDetailsCard;
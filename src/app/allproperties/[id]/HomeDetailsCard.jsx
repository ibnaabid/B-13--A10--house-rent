"use client";

import { Heart, X, MapPin, Bed, Bath, DollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FavBtn from "./FavBtn";

const HomeDetailsCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(data)


  return (
    <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-white">

      {/* IMAGE */}
      <div className="relative w-full h-72">
       <Image
          src={data?.image || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600"}
          alt={data?.title || "Property Image"}
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-4 left-4 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">
          {data?.status || "Pending"}
        </div>
      </div>

   <div className="p-6 space-y-4 bg-slate-900">
      
        <h1 className="text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
          {data?.title || "Exclusive Luxury Villa"}
        </h1>

        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <MapPin size={16} className="text-blue-500 flex-shrink-0" />
          <span className="line-clamp-1">{data?.location || "Dhaka, Bangladesh"}</span>
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
          <FavBtn data={data}></FavBtn>

         

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
"use client";

import { MapPin, Building2 } from "lucide-react";

export default function LocationsPage() {
  const locations = [
    { city: "Dhaka", areas: ["Gulshan", "Banani", "Dhanmondi", "Uttara"] },
    { city: "Chattogram", areas: ["Panchlaish", "GEC", "Agrabad"] },
    { city: "Sylhet", areas: ["Zindabazar", "Amberkhana", "Subidbazar"] },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-16">

      <h1 className="text-3xl font-black text-center mb-2">
        Explore Locations
      </h1>
      <p className="text-slate-400 text-center mb-10">
        Find rental properties in your favorite city
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {locations.map((loc, i) => (
          <div
            key={i}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="text-blue-500" />
              <h2 className="text-xl font-bold">{loc.city}</h2>
            </div>

            <div className="space-y-2">
              {loc.areas.map((area, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-slate-300 hover:text-blue-400 cursor-pointer"
                >
                  <MapPin size={16} />
                  {area}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { 
  Building2, 
  DollarSign, 
  MapPin, 
  Bed, 
  Bath, 
  FileText, 
  ImagePlus, 
  Loader2, 
  PlusCircle 
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function AddPropertyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    image: "", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(setIsSubmitting)

    try {

      const {data:token} = await authClient.token();
      console.log(token.token)


        const res = await fetch("http://localhost:5000/allhome", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    authorization : `Bearer ${token.token}`
  },
  body: JSON.stringify(formData),
});

const result = await res.json();
console.log(result);
     
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      
      toast.success("Property added successfully!");
     
      
      // ফর্ম রিসেট করা
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        image: "",
      });
      
    } catch (error) {
      toast.error("Failed to add property");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-6">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
        <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
          <Building2 size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Add New Property</h2>
          <p className="text-xs text-slate-400 mt-0.5">Fill in the details to list your property on RentSphere.</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* PROPERTY TITLE */}
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1.5 block">Property Title</label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Luxury 3BHK Apartment near Lakeview"
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
              required
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1.5 block">Description</label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property amenities, rules, and nearby facilities..."
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white resize-none"
              required
            />
          </div>
        </div>

        {/* PRICE & LOCATION (GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Rent Price (Monthly)</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 15000"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Location / Address</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Sector 11, Uttara, Dhaka"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* BEDROOMS & BATHROOMS (GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Total Bedrooms</label>
            <div className="relative">
              <Bed className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Total Bathrooms</label>
            <div className="relative">
              <Bath className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* IMAGE URL (আপাতত টেক্সট ইনপুট, পরবর্তীতে ফাইল আপলোড ইন্টিগ্রেট করতে পারবে) */}
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1.5 block">Property Image URL</label>
          <div className="relative">
            <ImagePlus className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
            <input
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/property-image.jpg"
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/10 mt-4 flex items-center justify-center gap-2 text-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Listing Property...
            </>
          ) : (
            <>
              <PlusCircle size={16} />
              Publish Property
            </>
          )}
        </button>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully 🏠");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-16">

      <h1 className="text-3xl font-black text-center mb-2">
        Contact Us
      </h1>
      <p className="text-slate-400 text-center mb-10">
        We are here to help you find your perfect home
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div className="space-y-6">

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <Phone className="text-blue-500" />
              <p>+880 123 456 789</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500" />
              <p>support@rentsphere.com</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-500" />
              <p>Gulshan, Dhaka, Bangladesh</p>
            </div>
          </div>

        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            Send Message <Send size={18} />
          </button>

        </form>

      </div>
    </div>
  );
}
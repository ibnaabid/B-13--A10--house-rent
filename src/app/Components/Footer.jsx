"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: FaFacebook, link: "#" },
    { icon: FaTwitter, link: "#" },
    { icon: FaInstagram, link: "#" },
    { icon: FaLinkedin, link: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">

      {/* glow effect */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-900">

          {/* BRAND */}
          <div className="space-y-4">
            <Link href="/">
              <h2 className="text-2xl font-black">
                Rent<span className="text-blue-600">Sphere</span>
              </h2>
            </Link>

            <p className="text-slate-400 text-sm">
              Premium rental platform for verified properties and smooth booking experience.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 pt-2">
              {socials.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={idx}
                    href={item.link}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-9 h-9 bg-slate-900 hover:bg-blue-600 border border-slate-800 text-slate-400 hover:text-white rounded-xl flex items-center justify-center transition"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-300 mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "Properties", path: "/all-properties" },
                { label: "Locations", path: "/locations" },
                { label: "Contact", path: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="text-slate-400 hover:text-blue-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-300 mb-5">
              Contact
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-2 items-start">
                <MapPin size={18} className="text-blue-500 mt-0.5" />
                Dhaka, Bangladesh
              </li>

              <li className="flex gap-2 items-center">
                <Mail size={18} className="text-blue-500" />
                support@rentsphere.com
              </li>

              <li className="flex gap-2 items-center">
                <Phone size={18} className="text-blue-500" />
                +880 123 456 789
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-300 mb-5">
              Newsletter
            </h3>

            <p className="text-xs text-slate-400 mb-3">
              Get updates of new properties instantly.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              />

              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-3">

          <p>© {currentYear} RentSphere. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition">
              Terms
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
// app/success/page.jsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Mail, Home, Calendar } from "lucide-react";
import { stripe } from "../lib/stripe";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  console.log(session_id, "session_id");

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, metadata, amount_total } = session;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    try {
      // ১. বুকিং ইতিমধ্যে ডাটাবেজে আছে কি না চেক করা (ক্যামেলকেস ফিক্স করা হয়েছে)
      const checkRes = await fetch(
        `http://localhost:5000/Bookings/${session_id}`, 
        { cache: "no-store" }
      );

      if (!checkRes.ok) {
        throw new Error("Failed to check existing booking");
      }

      const { exists } = await checkRes.json();

      if (!exists) {
        const bookingData = {
          sessionId:     session_id,
          propertyId:    metadata?.propertyId,
          propertyName:  metadata?.propertyName,
          amount:        Number(metadata?.amount || 0), 
          userEmail:     metadata?.userEmail || customer_details?.email,
          customerEmail: customer_details?.email,
          moveInDate:    metadata?.moveInDate,
          phone:         metadata?.phone,
          notes:         metadata?.notes || "",
          paymentStatus: "paid",
          status:        "Confirmed",
          createdAt:     new Date().toISOString(), 
        };

        const postRes = await fetch("http://localhost:5000/Bookings", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(bookingData),
        });

          const result = await postRes.json();
          console.log(result,"postbooking")

          if(result){
            
          console.log("Booking created successfully! Server Response:", result);

          }
        else {
          throw new Error("Failed to create a new booking");
        }
      } 
    } catch (error) {
      console.error("Error in booking process:", error.message);
    }


    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

            {/* Banner */}
            <div className="bg-gradient-to-br from-emerald-600 to-green-500 px-8 py-10 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white mb-1">
                Booking Confirmed!
              </h1>
              <p className="text-emerald-100 text-sm">
                Your property has been successfully booked.
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Property */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Home className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Property</p>
                  <p className="text-white text-sm font-medium">
                    {metadata?.propertyName || "N/A"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Confirmation sent to</p>
                  <p className="text-white text-sm font-medium">
                    {customer_details?.email}
                  </p>
                </div>
              </div>

              {/* Move-in date */}
              {metadata?.moveInDate && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Move-in Date</p>
                    <p className="text-white text-sm font-medium">
                      {metadata.moveInDate}
                    </p>
                  </div>
                </div>
              )}

              {/* Amount */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Total Paid</span>
                  <span className="text-amber-400 font-black text-lg">
                    ${(amount_total / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-slate-500 text-xs text-center">
                Questions? Email{" "}
                <a href="mailto:orders@example.com" className="text-amber-400">
                  orders@example.com
                </a>
              </p>

              <Link
                href="/bookings"
                className="flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm transition-all"
              >
                View My Bookings
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
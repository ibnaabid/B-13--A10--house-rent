import { redirect } from "next/navigation";
import { stripe } from "@/app/lib/stripe";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Invalid session id");
  }

  // Stripe session verify
  const session = await stripe.checkout.sessions.retrieve(session_id);

  const customerEmail = session?.customer_details?.email;
  const amount = session?.amount_total / 100;

  if (session.status === "open") {
    return redirect("/");
  }

  if (session.status === "complete") {
  
    await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: customerEmail,
        amount,
        paymentStatus: "paid",
        status: "Pending",
        sessionId: session_id,
        createdAt: new Date(),
      }),
    });

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4">
        
        <div className="max-w-md w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
          
          <div className="text-6xl mb-4">🎉</div>

          <h1 className="text-2xl font-bold text-green-400">
            Payment Successful!
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Thank you for your booking.
          </p>

          {/* DETAILS */}
          <div className="mt-6 bg-slate-800/50 rounded-xl p-4 text-left space-y-2 text-sm">
            <p>
              <span className="text-slate-400">Email:</span> {customerEmail}
            </p>
            <p>
              <span className="text-slate-400">Amount:</span> ${amount}
            </p>
            <p>
              <span className="text-slate-400">Status:</span>{" "}
              <span className="text-green-400">Paid</span>
            </p>
          </div>

          {/* BUTTON */}
          <Link
            href="/"
            className="mt-6 inline-block w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-xl font-semibold"
          >
            Go to Home
          </Link>

        </div>
      </div>
    );
  }
}
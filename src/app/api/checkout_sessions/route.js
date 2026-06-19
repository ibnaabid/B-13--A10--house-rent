import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { stripe } from "@/app/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const sessionData = await auth.api.getSession({
      headers: headersList,
    });

    const user = sessionData?.user;

    const formData = await req.formData();

    const propertyId = formData.get("propertyId");
    const propertyName = formData.get("propertyName");
    const amount = Number(formData.get("amount"));

    const moveInDate = formData.get("moveInDate");
    const phone = formData.get("phone");
    const notes = formData.get("notes");

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",

            unit_amount: amount * 100,

            product_data: {
              name: propertyName,
              description: "Property Booking Fee",
            },
          },

          quantity: 1,
        },
      ],

      metadata: {
        propertyId: propertyId || "",
        propertyName: propertyName || "",
        amount: String(amount),
        userEmail: user?.email || "",
        moveInDate: moveInDate || "",
        phone: phone || "",
        notes: notes || "",
      },

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.redirect(stripeSession.url, 303);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Arafat Rahman",
    role: "Tenant",
    comment:
      "RentSphere made finding a home super easy. Smooth process and trusted listings!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Nusrat Jahan",
    role: "Family Renter",
    comment:
      "Very clean platform. I found my apartment within 2 days. Highly recommended!",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Tanvir Hasan",
    role: "Business Owner",
    comment:
      "Great experience. The property listings are verified and accurate.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=8",
  },
];

const CustomerReview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900">
            Customer Reviews
          </h2>
          <p className="text-slate-500 mt-2">
            What our users say about RentSphere
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-slate-50 border rounded-2xl p-6 hover:shadow-lg transition"
            >
              {/* user */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-bold text-slate-900">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>

              {/* rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* comment */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
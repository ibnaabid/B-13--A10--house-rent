"use client";

import { useEffect, useState } from "react";
import { Heart } from "@gravity-ui/icons";
import toast from "react-hot-toast";

const FavBtn = ({ data, userId }) => {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  

  //  ADD FAVORITE
  const addFavorite = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/favorites/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          propertyId: data?._id,
          title:data?.title
        }),
      });

      const result = await res.json();
      

      if (res.ok) {
        setIsFav(true);
        toast.success("Added to favorite ❤️");
       
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

//   // ❌ REMOVE FAVORITE
//   const removeFavorite = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/favorites", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           propertyId: data?._id,
//         }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setIsFav(false);
//         toast.success("Removed from favorite ❌");
//       } else {
//         toast.error(result.message);
//       }
//     } catch (err) {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

  // 🔁 TOGGLE
  const toggleFavorite = () => {
  addFavorite()
}

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`flex items-center justify-center px-4 py-3 rounded-xl border transition-all duration-200 ${
        isFav
          ? "bg-red-500/20 border-red-500 text-red-400"
          : "border-slate-700 text-slate-300 hover:border-red-400 hover:text-red-400"
      }`}
    >
      <Heart
        className={`w-5 h-5 transition-all ${
          isFav ? "fill-red-400" : ""
        }`}
      />
    </button>
  );
};

export default FavBtn;
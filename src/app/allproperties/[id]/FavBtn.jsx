"use client";

import {  useState } from "react";
import { Heart } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

const FavBtn = ({ data }) => {

  const {data:session} = authClient.useSession()
  const userId = session?.user?.id;
  console.log(userId)

  const [loading, setLoading] = useState(false);


  const addFavorite = async () => {
      
    if (!userId) {
      return toast.error("Please login first!");
    }

    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/favorites/${userId}`,
         {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data?.title,
          name: data?.name,
        }),
      });

      const result = await res.json();
      console.log(result,"result")

      if (res.ok) {
        toast.success("Added to favorite ❤️");
      } else {
        toast.error(result.message || "Failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={addFavorite}
      disabled={loading}
      className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-red-400 hover:text-red-400"
    >
      <Heart className="w-5 h-5" />
    </button>
  );
};

export default FavBtn;
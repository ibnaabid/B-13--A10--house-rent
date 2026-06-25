"use client";

import { authClient } from "@/app/lib/auth-client";
import { HeartCrack } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DelteFav = ({ item }) => {
  const router = useRouter()
  const dishandler = async () => {
    try {

      const {data:token} = await authClient.token()


      const res = await fetch(
        `http://localhost:5000/favorites/${item._id}`
        ,
        {
          method: "DELETE",
          headers:
          {
            authorization : `Bearer ${token.token}`
          }
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("Removed from favorites");
        router.refresh()
      } else {
        toast.error("Failed to remove");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={dishandler}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
    >
      <HeartCrack size={18} />
      Dislike
    </button>
  );
};

export default DelteFav;